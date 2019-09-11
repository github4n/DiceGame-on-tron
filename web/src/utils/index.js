import { log } from "core-js";

/**
 * Created by kevne on 2018/07/20.
 */

var timestamp = '';
var md5Str = '';
var deviceId = '';
var nonceStr = '';

const utility = {


  /* 检查是否是手机号 */
  isPhoneNum: function (str) {
    let rg = new RegExp(/1[0-9]{10}/);
    return rg.test(str);
  },

  /* 转换秒数为时间格式 */
  translateTime: function (second) {
    if (!second) {
      return '未知';
    }
    let totalSecond = parseInt(second);// 秒
    let minute = 0;// 分
    let hour = 0;// 小时
    if (totalSecond > 60) {
      minute = parseInt(totalSecond / 60);
      totalSecond = parseInt(totalSecond % 60);
      if (minute > 60) {
        hour = parseInt(minute / 60);
        minute = parseInt(minute % 60);
      }
    }
    let hourTxt = hour > 9 ? hour.toString() : '0' + hour;
    let minuteTxt = minute > 9 ? minute.toString() : '0' + minute;
    let secondTxt = totalSecond > 9 ? totalSecond.toString() : '0' + totalSecond;
    let result = `${hourTxt}:${minuteTxt}:${secondTxt}`;
    return result;
  },
  
  /* 转换秒数为时间格式  天 shif20190416*/
  translateTimeDate1: function (second) {
    if (!second) {
      return '00';
    }
    let day = Math.floor( second/ (24*3600) ); // Math.floor()向下取整 
    let hour = Math.floor( (second - day*24*3600) / 3600); 
    let minute = Math.floor( (second - day*24*3600 - hour*3600) /60 ); 
    let second1 = second - day*24*3600 - hour*3600 - minute*60;  
    if(day.toString().length==1){
      let result =  '0'+ day
      return result;
    }else{
      let result =  day ; 
      return result;
    }
  },
  /* 转换秒数为时间格式  时 shif20190416*/
  translateTimeDate2: function (second) {
    if (!second) {
      return '00';
    }
    let day = Math.floor( second/ (24*3600) ); // Math.floor()向下取整 
    let hour = Math.floor( (second - day*24*3600) / 3600); 
    let minute = Math.floor( (second - day*24*3600 - hour*3600) /60 ); 
    let second1 = second - day*24*3600 - hour*3600 - minute*60; 
    if(hour.toString().length==1){
      let result =  '0'+ hour
      return result;
    }else{
      let result =  hour ; 
      return result;
    }
  },
  /* 转换秒数为时间格式  分 shif20190416*/
  translateTimeDate3: function (second) {
    if (!second) {
      return '00';
    }
    let day = Math.floor( second/ (24*3600) ); // Math.floor()向下取整 
    let hour = Math.floor( (second - day*24*3600) / 3600); 
    let minute = Math.floor( (second - day*24*3600 - hour*3600) /60 ); 
    let second1 = second - day*24*3600 - hour*3600 - minute*60; 
   
    if(minute.toString().length==1){
      let result =  '0'+ minute
      return result;
    }else{
      let result =  minute ; 
      return result;
    }
  },
  /* 转换秒数为时间格式 秒 shif20190416*/
  translateTimeDate4: function (second) {
    if (!second) {
      return '00';
    }
    let day = Math.floor( second/ (24*3600) ); // Math.floor()向下取整 
    let hour = Math.floor( (second - day*24*3600) / 3600); 
    let minute = Math.floor( (second - day*24*3600 - hour*3600) /60 ); 
    let second1 = second - day*24*3600 - hour*3600 - minute*60; 
    if(second1.toString().length==1){
      let result =  '0'+ second1
      return result;
    }else{
      let result =  second1 ; 
      return result;
    }
  },

  /* 获取当前时间转换成unix时间戳（秒） */
  getSecondsTimestamp: function () {
    let ts = (Date.parse(new Date().toUTCString())).valueOf();
    let timeStamp = (ts / 1000) + '';
    return timeStamp;
  },


  /* 获取随机颜色值 #000000 */
  getRandomColor: function () {
    return '#' + (function (h) {
      return new Array(7 - h.length).join('"0"') + h
    })((Math.random() * 0x1000000 << 0).toString(16))
  },

  /* 获取随机颜色值 rgb() */
  getRandomColorToRgb: function() {
    let randomNum = Math.floor(Math.random() * 256); // 获取0到255之间的随机数
    return 'rgb(' + randomNum + ', ' + randomNum + ', ' + randomNum + ')'
  },

  // 获取服务端所传过来的参数
  getParames: function () {
    var url = decodeURIComponent(window.location.href); // 获取服务端url
    var paramString;
    if(url.indexOf('#')) {
      paramString = url.slice(url.indexOf('"?"') + 1, url.length);
    }else{
      paramString = window.location.search.substring(1);
    }
    var sub = paramString.split('&');
    var res = {};
    if(sub.length) {
      for(let i = 0; i < sub.length; i++) {
        var param = sub[i].split('=');
        res[param[0]] = param[1];
      }
    }
    if(sub.length) {
      return res;
    }
    return null;
  },

  // 检查邮箱是否正确
  checkMail: function (mail) {
    var filter = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
    if (filter.test(mail)) {
      return true;
    }else{
      return false;
    }
  },

  /* 创建随机数 */
  createNonceString: function () {
    nonceStr = Math.random().toString(36).substr(2);
    console.log('nonceStr =' + nonceStr);
    return nonceStr;
  },

  /* 获取当前时间戳 */
  createTimestamp: function () {
    timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    return timestamp;
  },

  /* 通过身份证号获取身份证信息 */
  getIdCardInfo: function(cardNo) {
    if(!cardNo) {
      return false;
    }
    var info = {
      isTrue: false,
      year: null,
      month: null,
      day: null,
      isMale: false,
      isFemale: false
    };
    if (!cardNo && cardNo.length !== 15 && cardNo.length !== 18) {
      info.isTrue = false;
      return info;
    }
    if (cardNo.length === 15) {
      let year = cardNo.substring(6, 8);
      let month = cardNo.substring(8, 10);
      let day = cardNo.substring(10, 12);
      let p = cardNo.substring(14, 15); // gender
      let birthday = new Date(year, parseFloat(month) - 1, parseFloat(day));
      if (birthday.getYear() !== parseFloat(year) ||
      birthday.getMonth() !== parseFloat(month) - 1 ||
      birthday.getDate() !== parseFloat(day)) {
        info.isTrue = false;
      } else {
        info.isTrue = true;
        info.year = birthday.getFullYear();
        info.month = birthday.getMonth() + 1;
        info.day = birthday.getDate();
        if (p % 2 === 0) {
          info.isFemale = true;
          info.isMale = false;
        } else {
          info.isFemale = false;
          info.isMale = true
        }
      }
      return info;
    }
    if (cardNo.length === 18) {
      let year = cardNo.substring(6, 10);
      let month = cardNo.substring(10, 12);
      let day = cardNo.substring(12, 14);
      let p = cardNo.substring(14, 17)
      let birthday = new Date(year, parseFloat(month) - 1, parseFloat(day));

      if (birthday.getFullYear() !== parseFloat(year) ||
      birthday.getMonth() !== parseFloat(month) - 1 ||
      birthday.getDate() !== parseFloat(day)) {
        info.isTrue = false;
        return info;
      }
      var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];
      var Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];

      var sum = 0;
      var _cardNo = cardNo.split('');
      if (_cardNo[17].toLowerCase() === 'x') {
        _cardNo[17] = 10;
      }
      for (let i = 0; i < 17; i++) {
        sum += Wi[i] * _cardNo[i];
      }
      var i = sum % 11;
      if (_cardNo[17] !== Y[i]) {
        info.isTrue = false;
        return;
      }

      info.isTrue = true;
      info.year = birthday.getFullYear();
      info.month = birthday.getMonth() + 1;
      info.day = birthday.getDate();
      if (p % 2 === 0) {
        info.isFemale = true;
        info.isMale = false;
      } else {
        info.isFemale = false;
        info.isMale = true
      }
      return info;
    }
    return info;
  },

  getDeviceType: function() {
    let sUserAgent = navigator.userAgent.toLowerCase();
    let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    let bIsMidp = sUserAgent.match(/midp/i) == "midp";
    let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    let bIsAndroid = sUserAgent.match(/android/i) == "android";
    let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
      return false;
    }else {
      return true;
    }
  }
}

export default utility;
