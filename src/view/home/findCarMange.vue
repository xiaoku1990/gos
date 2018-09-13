<template>
  <div class="find-state main-padding">
    <div class="find-Top">
      <div class="find-Top-One" v-show="carKerboard">
        <ul>
          <li>
            <el-button class="topBt" type="primary" size="medium" round @click="noPlateLook">无牌车查询</el-button>
          </li>
          <li>
            <el-button class="topBt" type="primary" size="medium" round @click="lateralLook">侧方车查询</el-button>
          </li>
        </ul>
      </div>
      <div class="find-Top-Two">
        <!--keyboard-->
        <find-car v-on:plate-number="setPlateNumber" v-show="carKerboard"></find-car>
        <!--back-->
        <el-button class="back" type="primary" v-show="!carKerboard" @click="carKerboard=!carKerboard"  round>&nbsp;&nbsp;返回&nbsp;&nbsp;</el-button>
        <!--swipe-->
        <div class="swipe" v-show="!carKerboard">
          <!---->
          <el-carousel :interval="4000" type="card" height="400px" :autoplay="false">
            <el-carousel-item v-for="item in carParams" :key="item.index" style="border-radius: 5px;">
              <img :src="item.imgUrl" style="width: 100%;height: auto;" alt="">
              <!--<h3>{{ item.carnum }}</h3>-->
              <div class="carInfo">
                楼层 : {{ item.floorName }}&nbsp;&nbsp;&nbsp;&nbsp;
                车位号 : {{ item.carpos }}&nbsp;&nbsp;&nbsp;&nbsp;
                车牌号 : {{ item.carnum }}
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!---->
      </div>
    </div>
  </div>
</template>
<script>
    import findCar from './findCar/findCar'
    export default {
        name: "findCarMange",
        data(){
          return {
            carKerboard : true, //车牌输入部分
            carNum: '', //输入的车牌
            carParams:[]
          }
        },
        methods:{
          setPlateNumber: function (arr) { //输入车牌
            //alert(arr.join(''))
            /*
            *输入车牌后逻辑;
            * 1.验证输入的的车牌;(是否支持模糊查询)
            * 2.与服务器通信(获取车牌图片以及相关信息);
            * 3.点击图片规划路径;
            * */
            console.log(arr.join(''))
            //this.carKerboard =!this.carKerboard //(模拟成功后操作)获取车牌成功后进入车牌展示界面
            this.carNum = arr.join('');
            this.searchCar() //1.0
          },
          noPlateLook() { // 无牌车查询
             // let message = '该功能暂未开放，敬请期待!';
             // this.warn(message);
             this.nullSearchCar()
          },
          lateralLook() { // 侧方车查询
              // let message = '该功能暂未开放，敬请期待!';
              // this.warn(message);
              this.lateralSearceCar()
          },
          warn (date) {  //提示信息函数
            this.$message({
              showClose: true,
              message: date,
              type: 'warning',
              center: true
            })
          },
          searchCar () {
            var params = new URLSearchParams();
            let searchCarUrl=this.$Api+'/GOSSystem/searchCar';
            let postDate={
              user_id : "beefind001",
              build_id : this.$BuildId,
              carnum : this.carNum
            };
            for(let i in postDate){
              params.append(i,postDate[i]);
            };
            //
            //console.log(params);
            this.$http.post(
              searchCarUrl,
              params,
              {
                timeout:2000,
                headers:{
                  'Content-Type':'application/x-www-form-urlencoded'
                }

              }).then((response) => {
              console.log(response);
              //车牌图片列表之后逻辑处理
              //response.data;
              //true?进入车牌展示界面:消息提示(获取数据失败)
              //true:
              /*
              * 1.0获取的车牌列表进行赋值;
              * 1.1判断车牌是否在当前项目
              * 1.2车牌展示界面;
              * */
              if(response.data.result==1){
                if (response.data.findresult=='1') {
                  //在此建筑
                  this.carParams = this.fliterImgUrl(response.data.param)
                  this.carKerboard =!this.carKerboard //获取车牌成功后进入车牌展示界面
                }else{
                 //不在此建筑
                  this.warn('该车牌不在此建筑!');
                };
              }else{
                this.warn('查询车牌失败!');
              }
            }).catch((error) => {
              //console.log(error);
              this.$notify({
                title: 'ERROR',
                message: `${error}`,
                duration: 2000,
                type: 'error'
              });
            });
          },
          nullSearchCar () { // 无牌车查询
            var params = new URLSearchParams();
            let searchCarUrl=this.$Api+'/GOSSystem/noPlateList';
            let postDate={
              user_id : "beefind001",
              build_id : this.$BuildId
            };
            for(let i in postDate){
              params.append(i,postDate[i]);
            };
            //
            //console.log(params);
            this.$http.post(
              searchCarUrl,
              params,
              {
                timeout:2000,
                headers:{
                  'Content-Type':'application/x-www-form-urlencoded'
                }

              }).then((response) => {
              console.log(response);
              //车牌图片列表之后逻辑处理
              //response.data;
              //true?进入车牌展示界面:消息提示(获取数据失败)
              //true:
              /*
              * 1.0获取的车牌列表进行赋值;
              * 1.1判断车牌是否在当前项目
              * 1.2车牌展示界面;
              * */
              if(response.data.result==1){
                  if(response.data.param.length==0){
                    this.warn('无车牌列表为空!');
                  }else{
                    //console.log(this.fliterImgUrl(response.data.param))
                    this.carParams = this.fliterImgUrl(response.data.param)
                    this.carKerboard =!this.carKerboard //获取车牌成功后进入车牌展示界面
                  };

              }else{
                this.warn('查询无车牌失败!');
              }
            }).catch((error) => {
              //console.log(error);
              this.$notify({
                title: 'ERROR',
                message: `${error}`,
                duration: 2000,
                type: 'error'
              });
            });
          },
          lateralSearceCar () { // 侧方停车查询
            var params = new URLSearchParams();
            let searchCarUrl=this.$Api+'/GOSSystem/sideCarList';
            let postDate={
              user_id : "beefind001",
              build_id : this.$BuildId
            };
            for(let i in postDate){
              params.append(i,postDate[i]);
            };
            //
            //console.log(params);
            this.$http.post(
              searchCarUrl,
              params,
              {
                timeout:2000,
                headers:{
                  'Content-Type':'application/x-www-form-urlencoded'
                }

              }).then((response) => {
              console.log(response);
              //车牌图片列表之后逻辑处理
              //response.data;
              //true?进入车牌展示界面:消息提示(获取数据失败)
              //true:
              /*
              * 1.0获取的车牌列表进行赋值;
              * 1.1判断车牌是否在当前项目
              * 1.2车牌展示界面;
              * */
              if(response.data.result==1){
                if(response.data.param.length==0){
                  this.warn('侧方车列表为空!');
                }else{
                  this.carParams = this.fliterImgUrl(response.data.param)
                  this.carKerboard =!this.carKerboard //获取车牌成功后进入车牌展示界面
                };
              }else{
                this.warn('侧方车查询失败!');
              }
            }).catch((error) => {
              //console.log(error);
              this.$notify({
                title: 'ERROR',
                message: `${error}`,
                duration: 2000,
                type: 'error'
              });
            });
          },
          fliterImgUrl (date) { // 过滤图片路径
            const that = this;
            date.forEach(function (val,index,arr) {
                val.imgUrl = that.$Api+val.imgUrl.substr(25)
            });
            return date;
          }

        },
        created(){},
        components: {
          findCar
        }
    }
</script>

<style scoped lang="scss">
  * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin: 0;
    padding: 0;
  }

  html, body {
    margin: 0 auto;
    padding: 0 auto;
    height: 100%;
    -webkit-text-size-adjust: 100%;
  }

  div#single-keyboard-box, div#mixed-keyboard-box {
    width: 75vw;
    height: 60%;
    /*height: 80%;*/
    border: 1px solid #ff00ff;
  }
  //
  .find-state {
    position: absolute;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    background: white;
    justify-content: stretch;
    height: calc(100% - 120px);
    width: calc(100% - 226px);
    /*border: 1px solid #00FF00;*/
    .find-Top{
      width: 100vw;
      /*height: 20vh;*/
      flex: 10;
      /*border: 1px solid #0000FF;*/
      .find-Top-One{
        height: 20%;
        /*border: 1px solid #FF0000;*/
        ul{
          list-style: none;
          width: 80%;
          min-width: 900px;
          height: 100%;
          margin: auto;
          /*border: 1px solid #00ff00;*/
          li{
            width: 50%;
            height: 100%;
            line-height: 100%;
            float: left;
            text-align: center;
            /*border: 1px solid #FF0000;*/
            .topBt{
              margin-top: 5%;
              width: 30%;
              height: 45px;
              font-size: 20px;
            }
          }
        }
      }
      .find-Top-Two{
        height: 80%;
        /*border: 1px solid #FF0000;*/
        position: relative;
      }
    }
  }
  /*swipe*/
  .swipe{
    padding-top: 8%;
    width: 75%;
    height: auto;
    margin: auto;
    /*border: 3px solid #000000;*/
  }
  .back{
    position: absolute;
    top: 20px;
    right:50px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    text-align: center;
    /*line-height: 400px;*/
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .carInfo{
    width: 100%;
    padding: 5px;
    position: absolute;
    bottom: 20px;
    color: white;
    text-align: center;
    border:1px solid #7360ed;
    background: #000000;
    opacity: 0.5;
  }
</style>
