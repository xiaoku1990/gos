<template>
  <div class="defectCenter">
    <div class="defectCenter-container">
      <div class="defectCenter-One">
        <!--swipe-->
        <div class="prev">
          <img src="../../../static/img/img/err/1@2x.png" alt="">
        </div>
        <div class="swipe">
          <ul>
            <li v-for="item in err_list" :key="item.index">
              <ul v-cloak>
                <li>
                  <img :src="item.errImgSrc" alt="">
                </li>
                <li>{{item.errMessage}}</li>
                <li>故障数 <span style="color: red;">{{item.err_sum}}</span></li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="next">
          <img src="../../../static/img/img/err/1@2x.png" alt="">
        </div>
      </div>
      <div class="defectCenter-Two">
        <ul>
          <li>
            <!--status-->
          </li>
          <li>
            <!--olMap-->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "defectCenter",
        data () {
          return {
              src : '../../../static/img/img/err/信息@2x.png',//测试
              err_list : [
                {
                  dev_type : '1',
                  err_sum : 20,
                  index : 0
                },
                {
                  dev_type : '2',
                  err_sum : 20
                },
                {
                  dev_type : '3',
                  err_sum : 20
                },
                {
                  dev_type : '4',
                  err_sum : 20
                },
                {
                  dev_type : '5',
                  err_sum : 20
                },
                {
                  dev_type : '6',
                  err_sum : 20
                },
                {
                  dev_type : '7',
                  err_sum : 20
                },
                {
                  dev_type : '8',
                  err_sum : 20
                },
                {
                  dev_type : '9',
                  err_sum : 20
                },
                {
                  dev_type : '10',
                  err_sum : 20
                },
                {
                  dev_type : '11',
                  err_sum : 20
                }
              ]
          }
        },
        methods :{
          prev() { //前滑

          },
          next(){ //后滑

          },
          getErrList () { //获取err_list(故障列表)
            /*
            * 逻辑
            * 1.0在created()钩子函数中执行;
            * 1.1对结果进行处理
            * 1.2;获取结果(true);
            * 1.2.1(过滤返回的数据)
            * 1.2.2赋值(that.err_list=response.result.error_list)
            * */

          },
          filterErr (date) { //过滤获取的err_list(故障列表)
            let that = this
            //date
            that.err_list.forEach(function (val,index,arr) {
              val.index = index
              val.errImgSrc='../../../static/img/img/err/'+(index+1)+'@2x.png'
              //val.errImgSrc='../../../static/img/img/err/5@2x.png'
              if(val.dev_type=='1'){
                   val.errMessage = '灯'
                }else if(val.dev_type=='2'){
                   val.errMessage = '照片摄像头'
                }else if(val.dev_type=='3'){
                   val.errMessage = 'wifi'
                }else if(val.dev_type=='4'){
                   val.errMessage = '蓝牙'
                }else if(val.dev_type=='5'){
                   val.errMessage = '2.4G'
                }else if(val.dev_type=='6'){
                   val.errMessage = '红绿灯'
                }else if(val.dev_type=='7'){
                   val.errMessage = '视频摄像头'
                }else if(val.dev_type=='8'){
                   val.errMessage = '引导屏'
                }else if(val.dev_type=='9'){
                  val.errMessage = '扩展坞'
                }else if(val.dev_type=='10'){
                  val.errMessage = '一氧化碳传感器'
                }else if(val.dev_type=='11'){
                  val.errMessage = '音响'
                }else{
                  val.errMessage = '其他设备'
                }
            })
            return that.err_list
          }
        },
        created () {
          this.err_list = this.filterErr()
          console.log(this.err_list);
        }
    }
</script>

<style scoped lang="scss">
  .defectCenter {
    position: absolute;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: stretch;
    height: calc(100% - 120px);
    width: calc(100% - 226px);
    border: 1px solid #00FF00;
    .defectCenter-container{
      width: 100%;
      border: 1px solid #FF0000;
      .defectCenter-One{
        display: flex;
        display: -webkit-flex;
        background: white;
        flex-direction: row;
        -webkit-flex-direction: row;
        align-items: center;
        height:25%;
        min-height: 130px;
        border: 1px solid #0000FF;
        .prev{
          width:5%;
          margin-left: 5%;
          float: left;
          border: 1px solid #FF0000;
        }
        .next{
          width:5%;
          float: left;
          border: 1px solid #FF0000;
        }
        .swipe{
          //display: flex;
          width:80%;
          /*margin: auto;*/
          height: 100%;
          border: 5px solid #FF0000;
          overflow-x: hidden;
          overflow-y: hidden;
          ul{
            width: 100%;
            height: 100%;
            /*border: 1px solid #0000FF;*/
            li{
              width: 16.66%;
              height: 100%;
              text-align: center;
              float: left;
              //border: 1px solid #FF0000;
              ul{
                width: 100%;
                height: 100%;
                li{
                  width: 100%;
                  height: 30%;
                  float: none;
                }
                li:nth-child(1){
                  height: 50%;
                  line-height: 50%;
                  img{
                    margin-top: 8%;
                    width: 20%;
                  }
                }
                li:nth-child(2){
                  height: 20%;
                }
              }
            }
          }
        }
      }
      .defectCenter-Two{
        height:75%;
        min-height: 400px;
        border: 1px solid #0000FF;
        ul{
          width: 100%;
          height: 100%;
          border: 1px solid #ffcc66;
          list-style: none;
          li:nth-child(1){
            width: 35%;
            height: 100%;
            border: 1px solid pink;
            float: left;
          }
          li:nth-child(2){
            width: 65%;
            height: 100%;
            border: 1px solid pink;
            float: left;
          }
        }
      }
    }
  }
</style>
