/**
 * 对话框（基于element-ui）
 * @author chenwen
 * @version 1.0.0.2
 */
import Vue from 'vue'

// 私有方法的符号对象
const _parse = Symbol('#parse' + new Date().getTime())

// DOM id前缀
const PREFIX = '_DLG_'
// 默认对话框页脚配置
, DEFAULT_FLOOR = { cancelTxt: '取消', okTxt: '确定', class: 'dialog-footer'}

// DOM编号（自增）
let ID = 0

// 为内容组件预置的接口方法名称，分别对应确定或取消
// 内容组件内部按照约定义好方法后，对话框对象在收到确定或取消指令后调用组件方法（单击确定或按钮）
export const CANCEL_SYM = 'cancel$dialog'
, OK_SYM = 'ok$dialog'
// 用于取消关闭时的返回标志，由用户钩子方法（确定或取消）返回
// 为了确定该标志的唯一性，使用符号类型来定义
, CANCEL_CLOSE = Symbol('_CANCEL_CLOSE_')

/**
 * 打开对话框（私有方法）
 * 检查由构造器传入的配置选项中是否存在对应的钩子方法，存在则调用并传入对话框对象（this）
 */
function onOpen() {
  const {onOpen: _open} = this.options
  _open && _open(this)
}

/**
 * 关闭对话框
 */
function onClose() {
  const {onClose: _close} = this.options
  _close && _close(this)
}
/**
 * 打开对话框动画完成之后
 */
function onOpened() {
  const {onOpened: _opened} = this.options
  _opened && _opened(this)
}

/**
 * 关闭对话框动画完成之后
 * 执行分为：
 * 1. 调用自定义钩子方法并传入对话框对象
 *    由调用方决定是否要使用返回结果，this中包含两个数据，this.data, this.getContent().$data
 * 2. 检查是否为异步调用，否，直接销毁对象，是，则传入结果数据，发送异步调用消息通知调用方接收 this.done(...)
 *    确定或取消时，会指定结果到this.response中，例如{ok: ...}或{cancel: ...}
 *    如果确定或取消钩子方法未定义则写入{close: ...}，返回结果优先取钩子方法返回的结果，否则为内容组件的data属性
 *    这种情况通常出现在自定义或取消了对话框页脚的情况下，
 *    而页脚中按钮会预置确认和取消的单击事件，这个时候需要在自定义渲染页脚的同时绑定内置的事件方法
 */
function onClosed() {
  const {onClosed: _closed} = this.options
  _closed && _closed(this)
  if(!this.done) {
    this.destory()
  }else{
    if(!this.response) {
      this.response = {close: { contentData: this.getContent.$data, dialogData: this.data } }
    }
    this.done(this.response)
  }
}

/**
 * 内置的取消方法
 * 执行分为
 * 1. 调用自定义钩子方法，分为两种，内容组件内部定义或配置选项中定义
 *    注意：会在钩子方法中传入CANCEL_CLOSE，可在钩子方法内部需要取消关闭时返回
 * 2. 如果钩子方法返回的是一个约定（Promise），则在响应之后将接收结果写入response，否则直接写入
 * 3. 关闭对话框（关闭之后会触发两个事件，close和closed）
 */
function onCancel() {
  // 已配置参数传入的钩子方法必须是箭头函数
  const {onCancel: _cancel} = this.options
  , content = this.getContent()
  , outHandler = _cancel
  , innerHandler = content[CANCEL_SYM] && (() => content[CANCEL_SYM](CANCEL_CLOSE))
  , handler = outHandler || innerHandler
  , result = handler && handler()

  this.response = { cancel: { contentData: content.$data, dialogData: this.data } }
  if(result !== CANCEL_CLOSE) {
    if(result instanceof Promise) {
      result.then(data => {
        this.response.cancel.data = data
        this.close()
      })
    }else{
      this.response.cancel.data = result
      this.close()
    }
  }
}

/**
 * 内置的确定方法
 * 执行逻辑同上
 */
function onOk() {
  const {onOk: _ok} = this.options
  , content = this.getContent()
  , outHandler = _ok
  , innerHandler = content[OK_SYM] && (() => content[OK_SYM](CANCEL_CLOSE))
  , handler = outHandler || innerHandler
  , result = handler && handler()

  this.response = { ok: { contentData: content.$data, dialogData: this.data } }
  if(result !== CANCEL_CLOSE) {
    if(result instanceof Promise) {
      result.then(data => {
        this.response.ok.data = data
        this.close()
      })
    }else{
      this.response.ok.data = result
      this.close()
    }
  }
}

class Dialog {
  /**
   * 对话框构造器
   * @param { Object } options 配置选项
   * @param { Promise<T> } resolve 异步通知
   */
  constructor(options = {}, resolve) {
    // 为了使对话框对象跳出复杂的嵌套对象链，成为独立的vue实例
    // 创建之前，会在body的底部插入一个拥有惟一标识的div，使其成对话框实例渲染的父容器
    // 每个对话框实例都有独立的数据和视图空间
    this.domId = PREFIX + (ID ++)
    document.body.appendChild(document.createElement('div')).id = this.domId
    // 用于控制对话框的显示
    this.data = { visible: false }
    this.options = options
    // 构建vue实例并挂载到对应的DOM容器上
    this.vm = new Vue(this[_parse](options)).$mount(`#${this.domId}`)
    // 如果是异步调用，则生成一个完成后的通知方法，并最终执行销毁方法
    if(resolve) {
      this.done = (data) => Promise.resolve(resolve(data)).finally(this.destory()) 
    }
  }

  /**
   * 解析配置选项（私有方法）
   * @param {Object} param0 配置选项
   * 格式说明：
   * {
   *   // 包含一个或多个需要内部注册组件，渲染函数将可能使用这些组件
   *   // 也可以是对话框内容区域的文本内容
   *   components?: { [name: string]: Component } | string;
   *   // 自定义渲染方法 建议采用JSX输出
   *   render?: (h, dialog) => [VNode, ...];
   *   // 对话框属性
   *   props?: { [name: string]: any };
   *   // 当对话框内容为动态渲染时（未使用预定义的内容组件），此属性对应动态内容组件的data部分
   *   data?: { [name: string]: any };
   *   // 对话框的class样式
   *   class?: { [className: string]: Boolean } | string;
   *   // 对话框页脚
   *   floor?: Boolean | 
   *           {
   *              cancelTxt?: string; // 取消按钮标题 默认“取消”
   *              okTxt?: string;     // 确定按钮标题 默认“确定”
   *              class?: string;     // class样式 默认“dialog-footer”
   *              // 自定义页脚渲染方法，defaultButton将在被调用时传入，
   *              // 其中包含两个默认按钮（确定或取消）的渲染方法，由自定义方法选择性调用，
   *              // 默认的渲染方法会绑定内置的单击事件方法（onOk和onCancel）
   *              render?: (h, defaultButton) => [VNode, ...]
   *           }
   * }
   */
  [_parse]({ components = {}, data = {}, render, props = {}, class: clazz, floor }) {
    const __this = this

    this.data = Object.assign(this.data, data)

    if(floor !== false) {
      if(floor instanceof Object) {
        floor = Object.assign({}, DEFAULT_FLOOR, floor)
      } else {
        floor = Object.assign({}, DEFAULT_FLOOR)
      }
    }

    const _data = {
      class: clazz,
      props,
      on:{
        'update:visible': value => this.data.visible = value,
        close: _ => onClose.call(this),
        open: _ => onOpen.call(this),
        closed: _ => onClosed.call(this),
        opened: _ => onOpened.call(this)
      },
      attrs: { id: this.domId }
    }
    , defaultBotton = {
      okHandler: _ => onOk.call(this),
      cancelHandler: _ => onCancel.call(this),
      // 对于渲染方法来说，必须传入createElement方法（h）
      // 因为vue loader 会将jsx部分翻译成使用createElement渲染组件
      // 虽然字面上h形参并没有用，但是编译后的代码会调用h(...)来执行渲染
      // 如果调用此类渲染方法没有定义并传入createElement，那么会抛出h方法未定义错误
      cancelBtn: h => (
        <el-button {...{on: { click: _ => onCancel.call(this) }}} >{floor.cancelTxt}</el-button>
      ),
      okBtn: h => (
        <el-button type="primary" {...{on: { click: _ => onOk.call(this) }}} >{floor.okTxt}</el-button>
      )
    }

    return {
      components,
      data() {
        return __this.data
      },
      render: h => {
        return (
        <el-dialog { ..._data } visible={ this.data.visible } >
          { render(h, this.data, this) }
          { 
            floor !== false ?
            floor.render ? 
            <span slot="footer" class={ floor.class }>
              { floor.render(h, defaultBotton) }
            </span> :
            <span slot="footer" class={ floor.class }>
              <el-button {...{on: { click: _ => onCancel.call(this) }}} >{floor.cancelTxt}</el-button>
              <el-button type="primary" {...{on: { click: _ => onOk.call(this) }}} >{floor.okTxt}</el-button>
            </span>
            : undefined
          }
        </el-dialog>
        )
      }
    }
  }
  /** 获取内容组件 */ 
  getContent() {
    // 默认插槽对应的组件实例即为内容组件
    return this.vm.$children[0].$slots.default[0].componentInstance || {}
  }
  /** 显示对话框 */ 
  show() {
    this.data.visible = true
  }
  /** 关闭对话框 */ 
  close() {
    this.data.visible = false
  }
  /** 销毁对话框 */ 
  destory() {
    this.vm.$destroy()
    document.body.removeChild(document.body.querySelector(`#${this.domId}`))
  }

}
// 导出对话框（class类型）
export { Dialog }

// 组件名称应为帕斯卡或驼峰命名，除字母数字外不能包含其他字符
export const pascal2Kebab = (name) => {
  name = name.charAt(0).toUpperCase() + name.substr(1)
  return name.match(/[A-Z][a-z0-9]*/g)
    .reduce((r, v, i) => i === 0 ? v : r + '-' + v)
    .toLowerCase()
}

/**
 * 对话框调用方法
 * @param { Object } options 配置选项
 * @param { Boolean } async 是否异步调用 默认值true
 */
export const showDialog = (options, async = true) => {
  const {components = {}, render} = options

  // 当渲染方法未定义时
  if(!render) {
    // 如果组件参数为字符内容时直接输出
    if(typeof components === 'string') {
      options.components = {}
      options.render = () => { 
        return (components)
      }
    // 如果components包含组件对象，则直接输出对应组件标签名的JSX内容
    }else if(components instanceof Object){
      let tag = Object.keys(components)[0]
      if(tag) {
        // 将帕斯卡命名转换为短横线命名
        tag = pascal2Kebab(tag)
        options.render = h => {
          return (<tag/>)
        }
      }
    }
  }
  if(async) {
    // 异步调用对话框，接收数据使用then(resp => ...)
    return new Promise((resolve) => {
      new Dialog(options, resolve).show()
    })
  }
  // 一般调用
  new Dialog(options).show()
}