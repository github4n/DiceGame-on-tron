<template>
  <div class='banner-box'>
    <a name="myTicket"></a>
    <div>
      <div>
        <div class='my-reward'>
          <span style="margin-left:45px;">{{$t('betting.MyTicket')}} ( {{TicketList.length}} )</span>
          <el-input class="input" style="width:240px;margin-left: 400px;" placeholder="" v-model="search" clearable></el-input>
          <!-- &nbsp;<i style='cursor:pointer;font-size: 22px;' class="el-icon-search"> </i>-->&nbsp;&nbsp;
          <i style='cursor:pointer;' v-show="down" @mousedown="tabChange('1')" class="el-icon-arrow-down"></i>
          <i style='cursor:pointer;' v-show="up" @mousedown="tabChange('2')" class="el-icon-arrow-up"></i>
        </div>
      </div>
      <div v-show="showTab">
      <!-- tableData.pagination(pageNo,pageSize)   :data="tableData.filter(data => !search || data.date.toLowerCase().includes(search.toLowerCase()))" -->
        <el-table :show-header="showHeader" 
          :data="TicketList.filter(data => !search || data.ticketNum.toLowerCase().includes(search.toLowerCase())) | pagination(pageNo,pageSize)">
          <el-table-column align="center" label="Date" prop="ticketNum"></el-table-column>
          <el-table-column align="center" label="Name" prop="time"></el-table-column>
          </el-table>
        <el-pagination id="span" align="right" @size-change="handleSizeChange" @current-change="handleCurrentChange"  
          :current-page="pageNo"  :page-size="pageSize"  :total="TicketList.length">
        </el-pagination>
      </div>
    </div>
    
</div>
</template>

<script>
import { getLotteryTicketDetails } from '@/service/api';

export default {
  data(){
    return {
      showHeader:false,
      pageNo: 1,
      pageSize:10,
      TicketList:[],
      showTab:false,
      down:true,
      up:false,
      search:'',
    }
  },
  computed:{
     'getToken':function(){
         return this.$store.getters.GET_TOKEN;
      },
      'langularType': function(){
      return this.$store.getters.GET_LANGUAR_TYPE;
    }
  },
  filters:{
    pagination(array,pageNo,pageSize){
      let offset = (pageNo - 1) * pageSize;
      let data=(offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
      return data
    }
  },
  methods:{
   handleSizeChange(val) {
        this.pageSize=val;
      },
      handleCurrentChange(val) {
        this.pageNo = val;
      },
    getLotteryTicketList(){
      let params = {'pAddr': this.getToken};
      /*getLotteryTicketDetails(params).then(res =>{
        //let list =[{"ticketNum":"00001","time":1554974350299},{"ticketNum":"00002","time":1554975840689}];
        let dataList = [];
        let _this = this;
        var b = res.map(function(obj){
          let date = new Date(parseInt(obj.time));
          let oYear = date.getFullYear();
          let oMonth = date.getMonth()+1;
          let oDay = date.getDate();
          let oHour = date.getHours();
          let oMin = date.getMinutes();
          let oSen = date.getSeconds();
          let oTime = oYear +'-'+ _this.addZero(oMonth) +'-'+ _this.addZero(oDay) +' '+ _this.addZero(oHour) +':'+ _this.addZero(oMin) +':'+ _this.addZero(oSen)
          let object = {"ticketNum":obj.ticketNum,"time":oTime}
          dataList.push(object)
        })
        this.TicketList = dataList;
        //console.log("this.TicketList:===>",this.TicketList)
      })*/
    },
    tabChange(type){
      if(type=='1'){
        this.getLotteryTicketList();
        this.down = false;
        this.up = true;
        this.showTab = true
      }else if(type=='2'){
        this.up = false;
        this.down = true;
        this.showTab = false
      }
    },
    addZero(num){
      if(parseInt(num) < 10){
          num = '0'+num;
      }
      return num;
    }
  },
  mounted(){
    this.getLotteryTicketList();
    if(this.langularType=='ch'){

    }else if(this.langularType=='en'){
      $(".el-pagination__jump").remove();
      $(".el-pagination__total").remove();
      $(".el-table__empty-text").text("No Data");

    }
      
    
  }
}
</script>

<style lang='less' >
    .banner-box{
      width: 920px;
      margin: 20px auto;
      margin-bottom: 20px;
      .reward{
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
      }
    }
    .my-reward{
      width: 920px;
      line-height: 46px;
      font-size: 16px;
      background: #2cb89c;
      // border-radius: 4px;
      color:#fff;
      text-align: left;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    .tab{
      width: 920px;
      border-radius: 4px;
      background:#054a3d;
    }
    .tab td{
      line-height: 30px;
      color:#fff;
    }
    .input .el-input__inner{
      height: 32px;
      background-color: rgb(39, 160, 136) !important;
      border: 1px solid rgb(39, 160, 136) !important;
      color:#ffffff;
    }
    .el-input .el-input__clear {
      color: #ffffff;
      font-size: 18px;
      line-height: 16px;
    }
    .el-input .el-input__clear:hover {
      color: #15f5cd;
      font-size: 18px;
    }
    .el-table th, .el-table tr {
    /* background-color: #4eb98d; */
      border-radius: 4px;
      background: #054a3d;
    }
    .el-table--enable-row-hover .el-table__body tr:hover>td {
        background-color: #0f756c;
    }
    .el-table{
      color: #ffffff;
    }
    .el-pager li  {
      margin: 0 6px
    }
    .el-pagination button:disabled {
      margin: 0 6px
    }
    .el-pagination .btn-next, .el-pagination .btn-prev{
      margin: 0 6px
    }
    .el-pagination button, .el-pagination span:not([class*=suffix]) {
      color: #ffffffad;
    }
    .el-table td, .el-table th.is-leaf {
      border-bottom: none;
    }
    .el-table__empty-block {
        background: #0f756c;
    }
    .el-table__empty-text {
      color: #fff;
    }
    .el-table::before {
      height: 0px;
    }
    .el-pagination {
      padding: 6px 5px;
    }

</style>

