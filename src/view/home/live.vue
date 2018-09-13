<template>
  <div class="par-state main-padding">

    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"  @click.self="dialogMap('vOne')">

        <video-player v-loading="loading1"  class="vjs-custom-skin" id="videoPlayer" ref="videoPlayer" :playsinline="true" :options="playerOptions" @ready="onPlayerReadied"   @play="onPlayerPlay($event)"
                       @pause="onPlayerPause($event)"
                       @ended="onPlayerEnded($event)"
                       @err="playErr($event)"
                       @loadeddata="onPlayerLoadeddata($event,'vOne')"
                       @waiting="onPlayerWaiting($event)"
                       @playing="onPlayerPlaying($event)"
                       @timeupdate="onPlayerTimeupdate($event)"
                       @canplay="onPlayerCanplay($event)"
                       @canplaythrough="onPlayerCanplaythrough($event)"
                       @statechanged="playerStateChanged($event)">
        </video-player>
        <img @click.self.self="imgMap('vOne')" class="videoIcon" src="../../../static/img/rightVideo.png" alt="">
        <!--<img @click.self.self="fullScreen('vOne')" class="videoIconT" src="../../../static/img/fullScreen.png" alt="">-->
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">

        <video-player v-loading="loading2"  class="vjs-custom-skin" id="videoPlayer" ref="videoPlayer"
                      :options="playerOptionsT"
                      @loadeddata="onPlayerLoadeddata($event,'vTwo')"
                      @ready="onPlayerReadied"
                      @timeupdate="onTimeupdate">
        </video-player>
        <img @click.self.self="imgMap('vTwo')" class="videoIcon" src="../../../static/img/rightVideo.png" alt="">

      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">

        <video-player v-loading="loading3"  class="vjs-custom-skin" id="videoPlayer" ref="videoPlayer"
                      :options="playerOptionsTh"
                      @loadeddata="onPlayerLoadeddata($event,'vThree')"
                      @ready="onPlayerReadied"
                      @timeupdate="onTimeupdate">
        </video-player>
        <img @click.self.self="imgMap('vThree')" class="videoIcon" src="../../../static/img/rightVideo.png" alt="">

      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <video-player v-loading="loading4"  class="vjs-custom-skin" id="videoPlayer" ref="videoPlayer"
                      :options="playerOptionsF"
                      @loadeddata="onPlayerLoadeddata($event,'vFour')"
                      @ready="onPlayerReadied"
                      @timeupdate="onTimeupdate">
        </video-player>
        <img @click.self.self="imgMap('vFour')" class="videoIcon" src="../../../static/img/rightVideo.png" alt="">

      </el-col>
    </el-row>
     <!---->
    <!--弹出框-->
    <div class="dialog"  v-show="dialogVisible">


      <div class="dialogInfo" :xs="24" :sm="12" :md="12" :lg="12" :xl="12" :offset="6">
        <ul>
          <li>
            <ul>
              <li> 请修改要观看的位置</li>
              <li> <i class="el-icon-error" @click.stop="dialogHide()"></i> </li>
            </ul>
          </li>
          <li>
            <!---->

            <!---->
            <div id="map"  ref="mybox">


            </div>
            <!---->
            <img src="../../../static/img/up.png" alt="up" @click="upFloor()" class="up">
            <div id="floor">
              <ul id="floorUl" ref="floorUl">

              </ul>
            </div>
            <img src="../../../static/img/down.png" alt="down" @click="downFloor()" class="down">
            <!---->
          </li>
        </ul>
      </div>

    </div>
    <!---->







  </div>
</template>

<script>
// import Switcher from '@/components/Switcher'
import { module } from "../../../static/ol/findMapOOB"
// import { tunnel } from "../../../static/ol/shuidao"
import  tunnel from "../../../static/ol/shuidao"
var judge;
var videoOne,videoTwo,videoThree,videoFour;

  videoOne={
  overNative: false,
  autoplay: false,
    live: true,
  controls:true,
    /*controlBar: {
      timeDivider: false,// 时间分割线
      durationDisplay: false,// 总时间
      progressControl: false, // 进度条
      remainingTimeDisplay: false,
      fullscreenToggle: false  //全屏按钮
    },*/
    //fluid:true,
  techOrder: ['html5', 'flash'],
  sourceOrder: true,
  flash: {
    hls: { withCredentials: false },
    swf: '/static/media/video-js.swf'
  },

  html5: { hls: { withCredentials: false } },
  sources: [
    {
      type: 'rtmp/mp4',
      src:'',
      withCredentials: false
    },
    {
      withCredentials: false,
      type: 'application/x-mpegURL',
      src:
        ''
    }
  ],
  poster:'/static/img/video/camera.png',
    notSupportedMessage: '此视频暂无法播放，请稍后再试',
  //width: document.documentElement.clientWidth,
  height:document.documentElement.clientHeight*0.4
};
videoTwo={
  overNative: true,
  autoplay: false,
  controls: true,
  /*controlBar: {
    playProgressBar:true,//
    playToggle:true,//播放按钮

    volumePanel: {
      VolumeControl:false
    },
    //VolumePanel:false,//声音按钮
     LiveDisplay:false,
    TimeDivider: false,// 时间分割线
    DurationDisplay: false,// 总时间
    progressControl: false, // 进度条
    LoadingSpinner:true,
    SeekBar:false,
    AudioTrackButton:false,
    RemainingTimeDisplay: false,//是否显示视频中的剩余时间
    fullscreenToggle: true  //全屏按钮
  },*/
  //fluid:true,
  techOrder: ['html5', 'flash'],
  sourceOrder: true,
  flash: {
    hls: { withCredentials: false },
    swf: '/static/media/video-js.swf'
  },
  html5: { hls: { withCredentials: false } },
  sources: [
    {
      type: 'rtmp/mp4',
      src:''
    },
    {
      withCredentials: false,
      type: 'application/x-mpegURL',
      src:
        ''
    }
  ],
  live:true,
  poster:'/static/img/video/camera.png',
  notSupportedMessage: '此视频暂无法播放，请稍后再试',
  //width: document.documentElement.clientWidth,
  height:document.documentElement.clientHeight*0.4
};
videoThree={
  overNative: true,
  autoplay: false,
  muted: false,
  controls: true,
  //fluid:true,
  techOrder: ['flash', 'html5'],
  sourceOrder: true,
  preload: 'auto',//
  flash: {
    hls: { withCredentials: false },
    swf: '/static/media/video-js.swf'
  },
  html5: { hls: { withCredentials: false } },
  sources: [
    {
      type: 'rtmp/mp4',
      src:''
    },
    {
      withCredentials: false,
      type: 'application/x-mpegURL',
      src:
        ''
    }
  ],
  live:true,
  poster:'/static/img/video/camera.png',
  notSupportedMessage: '此视频暂无法播放，请稍后再试',
  //width: document.documentElement.clientWidth,
  height:document.documentElement.clientHeight*0.4
};
videoFour={
  overNative: true,
  autoplay: false,
  controls: true,
  //fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
  techOrder: ['flash', 'html5'],
  sourceOrder: true,
  flash: {
    hls: { withCredentials: false },
    swf: '/static/media/video-js.swf'
  },
  html5: { hls: { withCredentials: false } },
  sources: [
    {
      type: 'rtmp/mp4',
      src:''
    },
    {
      withCredentials: false,
      type: 'application/x-mpegURL',
      src: ''
    }
  ],
  live:true,
  poster:'/static/img/video/camera.png',
  notSupportedMessage: '此视频暂无法播放，请稍后再试',
  //width: document.documentElement.clientWidth,
  height:document.documentElement.clientHeight*0.4
};


export default {
  name: 'live',
  data() {
    return {
      initialized: false,
      currentTech: '',
      dialogVisible:false,
      clickVideo:'',
      inNet: false, // 默认是用外网
      tunnel:false,//隧道是否建立/关闭成功
      sPeerID:'',//隧道新ID标识
      sClientAddr:'',//隧道的通用引用设备地址
      sClientAddr1:'',//隧道1
      sClientAddr2:'',//隧道2
      sClientAddr3:'',//隧道3
      sClientAddr4:'',//隧道4
      tunnel1:false,//隧道1的标识
      tunnel2:false,//隧道2的标识
      tunnel3:false,//隧道3的标识
      tunnel4:false,//隧道4的标识
      loading1:false,//加载1动画
      loading2:false,//加载2动画
      loading3:false,//加载3动画
      loading4:false,//加载4动画
      oldsPeerID1:'',//隧道oldID1标识
      oldsPeerID2:'',//隧道oldID2标识
      oldsPeerID3:'',//隧道oldID3标识
      oldsPeerID4:'',//隧道oldID4标识
      feature:'',//点击后获取的要素
      live:true,
      liveMap:'',
      streams: {
        rtmp: '',
        hls: ''
      },
      playerOptions: videoOne,
      playerOptionsT: videoTwo,
      playerOptionsTh: videoThree,
      playerOptionsF: videoFour
    }
  },
  computed: {


    player() {
      return this.$refs.videoPlayer.player
    },
    currentStream() {
      return this.currentTech === 'Flash' ? 'RTMP' : 'HLS'
    }
  },
  mounted(){

    console.log(this.playerOptions);
    //this.inNet = localStorage.getItem('OnToInNet') === 'true';
     //console.log('this.oldsPeerID1='+this.oldsPeerID1+'; this.oldsPeerID2='+this.oldsPeerID2+'; this.oldsPeerID3='+this.oldsPeerID3+'; this.oldsPeerID4='+this.oldsPeerID4);

    //--------------------
    var diaThis=this;

        diaThis.streams.rtmp="";//清楚视频源
    //
    var live_Map=new module.BeefindMap({
      "target": diaThis.$refs.mybox,
      "floorUl":diaThis.$refs.floorUl,
      "city_id":this.$CityId,//城市ID
      "build_id":this.$BuildId,//項目ID
      'urlLocal':this.$Api,
      "floor_id" :"",//樓層ID
      "floorBarVisible":true,//楼层控件
      "carLayerVisible":true,//车位层是否显示(默认显示)
      "carPortLayerVisible":true,//车位号层是否显示(默认显示)
      "interLayerVisible":true,//兴趣点层是否显示(默认显示)
      "deviceLayerVisible":true//设备层是否显示(默认不显示)
    });
    //var feature;
    diaThis.liveMap=live_Map;
    //var mapClick=localStorage.getItem('mapClick');
    //console.log(mapClick);
   // if(mapClick){
      diaThis.liveMap.on('singleclick',function (event) {
        var videoClick=localStorage.getItem('clickMap');
        var feature = diaThis.liveMap.forEachFeatureAtPixel(event.pixel, function (feature) {
          return feature;
        });
        if (feature) {
          //------------------
          if(videoClick=='2'){
            console.log(feature);
            if(feature.type=='camera'){
              diaThis.feature=feature;
              /*
              *
              *
              *
              *
              * */
              // 远程直播
             /* eventbus.$on('OnToInNet',function (date) {
                if (date) {
                  diaThis.outLine();
                }else{
                  diaThis.lineLive();
                }
              });*/
              if(localStorage.getItem('OnToInNet') === 'true'){
                diaThis.outLine();
              }else {
                diaThis.lineLive();
              };
             //

           };//if(carmera)
        };//
        //--------------------------

      };//edit
    });


  //};//

  //mapClick=localStorage.getItem('mapClick');
  localStorage.setItem('clickMap','2');
 //------------------------
  //p2ptest
  /*let sPeerID = 'b000300400072';
  let sType = 0;
  let sEncrypt=0;
  let sListenAddr='127.0.0.0.1:1935';//
  //直播的端口:1935(RTMP)
  let sClientAddr='127.0.0.1:9006';

  let pep=tunnel.pgConnectAdd(sPeerID,sType,sEncrypt,sListenAddr,sClientAddr, this.back);
  console.log(pep);

  setTimeout(function () {
    tunnel.pgConnectDelete(sPeerID,sType,sEncrypt,sListenAddr,sClientAddr);
  },15000);*/

    //
  },
  beforeUpdate(){
    //const BF=9;
    //console.log(BF);
  },
  updated(){
    //---------------
  },
  oldUse() {


  },
  beforeDestroy(){
    let sType = 0;
    let sEncrypt=0;
    let sListenAddr='127.0.0.1:1935';//
   const mapThis=this;
         mapThis.liveMap.removeEventListener('singleclick');
         let oldsPeerID1=localStorage.getItem('oldsPeerID1');
         let oldsPeerID2=localStorage.getItem('oldsPeerID2');
         let oldsPeerID3=localStorage.getItem('oldsPeerID3');
         let oldsPeerID4=localStorage.getItem('oldsPeerID4');
         //---------------------------------------------------
            //this.streams.rtmp="";

            if(oldsPeerID1){

              tunnel.pgConnectDelete(oldsPeerID1,sType,sEncrypt,sListenAddr,this.sClientAddr1,this.deleteAll);
              this.playerOptions.sources[0].src="";
              this.playerOptions.autoplay = false;
              //this.streams.rtmp=""
            };
            if(oldsPeerID2){
              tunnel.pgConnectDelete(oldsPeerID2,sType,sEncrypt,sListenAddr,this.sClientAddr2,this.deleteAll);
              this.playerOptionsT.sources[0].src="";
              this.playerOptionsT.autoplay = false;
            };
            if(oldsPeerID3){
               tunnel.pgConnectDelete(oldsPeerID3,sType,sEncrypt,sListenAddr,this.sClientAddr3,this.deleteAll);
               this.playerOptionsTh.sources[0].src="";
               this.playerOptionsTh.autoplay = false;
            };
            if(oldsPeerID4){
               tunnel.pgConnectDelete(oldsPeerID4,sType,sEncrypt,sListenAddr,this.sClientAddr4,this.deleteAll);
               this.playerOptionsF.sources[0].src="";
               this.playerOptionsF.autoplay = false;
            };
           /* tunnel.pgConnectDelete(oldsPeerID2,sType,sEncrypt,sListenAddr,sClientAddr,this.delete);
            tunnel.pgConnectDelete(oldsPeerID3,sType,sEncrypt,sListenAddr,sClientAddr,this.delete);
            tunnel.pgConnectDelete(oldsPeerID4,sType,sEncrypt,sListenAddr,sClientAddr,this.delete);*/

  },
  methods: {
    onPlayerReadied() {
      if (!this.initialized) {
        this.initialized = true
        this.currentTech = this.player.techName_
      }
    },
    // record current time
    onTimeupdate(e) {
      //console.log('currentTime', e.cache_.currentTime)
    },
    enterStream(date,index) {
      //date.sources[1].src = this.streams.hls
      date.sources[0].src="";
      date.sources[0].src = this.streams.rtmp;
      date.autoplay = true;



     /* this.playerOptions.sources[1].src = this.streams.hls
      this.playerOptions.sources[0].src = this.streams.rtmp
      console.log(this.playerOptions.sources);
      this.playerOptions.autoplay = true*/

    },
    queryback(a,b) { // 端口隧道查询回调
      console.log('a==>'+a+';  b==> '+b);
      b=b.substring(5);
      b=JSON.parse(b);
      console.log(b);
      let sType = 0;
      let sEncrypt=0;
      let sListenAddr='127.0.0.1:1935';//
      this.dialogHide();
      if(b.result=='18'){
        // 资源不存在(之前没有隧道)
          //添加  直接添加
          tunnel.pgConnectAdd(this.sPeerID,sType,sEncrypt,sListenAddr,this.sClientAddr, this.back);

      }else if(b.result=='0'){
        // 资源存在(之前有隧道)
        // 先删除后添加
        tunnel.pgConnectDelete(b.peerid,b.type,b.encrypt,b.listenaddr,b.clientaddr,this.delete);
      }

    },
    back(a, b) {
      //console.log('back!!');
      b=JSON.parse(b);
      this.dialogHide();
      //let localUrl='http://192.168.0.100:8421';
      if(b.result=='0'){
        this.tunnel=true;//隧道建立成功!
        //const cameraDate = module.getVideoUrl(localUrl, this.feature.param.fmn, this.feature.param.rannum);
        //console.log('clickVideo'+this.clickVideo);
         if(this.clickVideo=='vOne'){
              this.tunnel1=true;
         }else if(this.clickVideo=='vTwo'){
              this.tunnel2=true;
         }else if(this.clickVideo=='vThree'){
              this.tunnel3=true;
         }else{
               this.tunnel4=true;
         };//

        const cameraUrl = 'rtmp://' + b.clientaddr + '/live/live';
        //console.log(cameraUrl);
        //const cameraUrl = 'rtmp://127.0.0.1:12345/live/live';

        //this.videoSrc = cameraUrl;
        //console.log(this.clickVideo);
        this.streams.rtmp=cameraUrl;
         if(this.clickVideo=='vOne'){
           this.enterStream(this.playerOptions,this.clickVideo);
         }else if(this.clickVideo=='vTwo'){
           this.enterStream(this.playerOptionsT,this.clickVideo);
         }else if(this.clickVideo=='vThree'){
           this.enterStream(this.playerOptionsTh,this.clickVideo);
         }else if(this.clickVideo=='vFour'){
           this.enterStream(this.playerOptionsF,this.clickVideo);
         }else{

         };
       //

      }else{
        if(this.clickVideo=='vOne'){
          this.loading1=false;
        }else if(this.clickVideo=='vTwo'){
          this.loading2=false;
        }else if(this.clickVideo=='vThree'){
          this.loading3=false;
        }else{
          this.loading4=false;
        };
        //
        this.warnP2p();
        this.tunnel=false;
        //穿透失敗!
      };

      //return result;
    },
    deleteAll(a,b){
      let rt=b.substring(3);
      rt=JSON.parse(rt);
      //console.log('deleteAll');
    },
    delete(a, b){
      let rt=b.substring(3);
      console.log('delete==>'+rt);
      rt=JSON.parse(rt);
      console.log('delete==>'+rt);

      let sType = 0;
      let sEncrypt=0;
      let sListenAddr='127.0.0.1:1935';//
       if(rt.result=='18'||rt.result=='0'){
         tunnel.pgConnectAdd(this.sPeerID,sType,sEncrypt,sListenAddr,this.sClientAddr, this.back);
       };//
       this.dialogHide();
    },
    changeTech() {
      if (this.currentTech === 'Html5') {
        this.playerOptions.techOrder = ['html5']
      } else if (this.currentTech === 'Flash') {
        this.playerOptions.techOrder = ['flash']
      }
      this.playerOptions.autoplay = true
    },
    dialogHide(){
      this.dialogVisible=false;
      this.liveMap.target(null);
    },
    imgMap(date){
      //console.log(date);
      judge=date;
      this.clickVideo=date;

     // console.log(this.clickVideo);

      this.dialogVisible=true;
      this.liveMap.target(null);

      var me=this;
      //console.log(date);
      //
      setTimeout(function(){
        if(me.dialogVisible){
          me.liveMap.target(me.$refs.mybox);
        }
      },100)
    },
    fullScreen(date){
      console.log(date);
      this.player.requestFullscreen(true);
    },
    play(){
      this.player.play();
    },
    open(){
      this.$message({
        message: '该设备无直播视频源!',
        type: 'warning',
        center:true
      });
    },
    warnP2p(){
      this.$message({
        message: 'p2p连接失败!',
        type: 'warning',
        center:true
      });
    },
    upFloor(){
      var self=this;
      module.upFloor(clickSuccess);
      function clickSuccess(evevt){

      };
    },
    downFloor(){
      var self=this;
      module.downFloor(clickSuccess);
      function clickSuccess(event){

      };
    },
    outLine () {

      var localUrl = 'http://192.168.0.100:8421';
      let diaThis = this;
      let feature = diaThis.feature;
      console.log(feature);
      var cameraDate = module.getVideoUrl(localUrl, feature.param.fmn, feature.param.rannum,feature.floor_id);

      console.log('clickVideo'+diaThis.clickVideo);
      console.log(cameraDate.ip);
      if(cameraDate.ip=='192.168.0.0'||cameraDate.ip==undefined||cameraDate.ip==null||cameraDate.ip==''){


        diaThis.streams.rtmp='';



        if(diaThis.clickVideo=='vOne'){
          diaThis.enterStream(diaThis.playerOptions);
        }else if(diaThis.clickVideo=='vTwo'){
          diaThis.enterStream(diaThis.playerOptionsT);
        }else if(diaThis.clickVideo=='vThree'){
          diaThis.enterStream(diaThis.playerOptionsTh);
        }else if(diaThis.clickVideo=='vFour'){
          diaThis.enterStream(diaThis.playerOptionsF);
        }else{

        };
        diaThis.open();
        diaThis.dialogVisible = false;

      }else {
        //-------------
        var cameraUrl = 'rtmp://' + cameraDate.ip + ':1935/live/live';
        //this.videoSrc = cameraUrl;
        console.log(diaThis.clickVideo);
        diaThis.streams.rtmp=cameraUrl;
        if(diaThis.clickVideo=='vOne'){
          diaThis.enterStream(diaThis.playerOptions);
        }else if(diaThis.clickVideo=='vTwo'){
          diaThis.enterStream(diaThis.playerOptionsT);
        }else if(diaThis.clickVideo=='vThree'){
          diaThis.enterStream(diaThis.playerOptionsTh);
        }else if(diaThis.clickVideo=='vFour'){
          diaThis.enterStream(diaThis.playerOptionsF);
        }else{

        };

        diaThis.dialogVisible = false;
        //
      };//else
    },
    lineLive() {
      let fmn;//用于拼接的设备ID(5位)前面补0
      let rannum;//用于拼接的分区ID(3位)前面补0
      let buID;//用于拼接的项目ID(首字符小写)
      let feature = this.feature;
      let diaThis = this;
      if(feature.param.fmn>=10000){
        fmn=feature.param.fmn;
      }else if(feature.param.fmn>=1000){
        fmn='0'+feature.param.fmn;
      }else if(feature.param.fmn>=100){
        fmn='00'+feature.param.fmn;
      }else if(feature.param.fmn>=10){
        fmn='000'+feature.param.fmn;
      }else{
        fmn='0000'+feature.param.fmn;
      };//
      //-------------------------
      if(feature.param.rannum>=100){
        rannum=feature.param.rannum;
      }else if(feature.param.rannum>=10){
        rannum='0'+feature.param.rannum;
      }else {
        rannum = '00' + feature.param.rannum;
      };
      //-------------------------
      buID= diaThis.$BuildId.substring(0,1).toLocaleUpperCase()+ diaThis.$BuildId.substring(1);
      let sPeerID=buID+rannum+fmn;//新的ID
      let sType = 0;
      let sEncrypt=0;
      let sListenAddr='127.0.0.1:1935';//
      //直播的端口:1935(RTMP)
      let sClientAddr;//(要用的url)

      if(diaThis.clickVideo=='vOne'){
        if(diaThis.tunnel1){
          diaThis.tunnel=true;
        }else {
          diaThis.tunnel = false;
        };
        sClientAddr='127.0.0.1:12345';
        diaThis.sClientAddr1=sClientAddr;

      }else if(diaThis.clickVideo=='vTwo'){
        if(diaThis.tunnel2){
          diaThis.tunnel=true;
        }else{
          diaThis.tunnel=false;
        };
        sClientAddr='127.0.0.1:12322';
        diaThis.sClientAddr2=sClientAddr;
      }else if(diaThis.clickVideo=='vThree'){
        if(diaThis.tunnel3){
          diaThis.tunnel=true;
        }else{
          diaThis.tunnel=false;
        };
        sClientAddr='127.0.0.1:13331';
        diaThis.sClientAddr3=sClientAddr;
      }else{
        if(diaThis.tunnel4){
          diaThis.tunnel=true;
        }else{
          diaThis.tunnel=false;
        };
        sClientAddr='127.0.0.1:12341';
        diaThis.sClientAddr4=sClientAddr;
      };//


      //删除隧道，删除的是上一个的ID;

      diaThis.sClientAddr=sClientAddr;
      //console.log(diaThis.tunnel);
      diaThis.sPeerID=sPeerID;
      //-------------------
      // if(diaThis.tunnel){
      //   tunnel.pgConnectDelete(diaThis.oldsPeerIDsPeerID,sType,sEncrypt,sListenAddr,sClientAddr,diaThis.delete);
      // }else{
      //   tunnel.pgConnectAdd(diaThis.sPeerID,sType,sEncrypt,sListenAddr,diaThis.sClientAddr, diaThis.back);
      // };
      //-------
      if(diaThis.clickVideo=='vOne'){
        diaThis.loading1=true;
        diaThis.oldsPeerID1=localStorage.getItem('oldsPeerID1');
        /*
        * 逻辑调整
        * 1.0查询端口所创建的隧道的信息()
        * */
        tunnel.pgConnectQuery(sClientAddr,diaThis.queryback);
        //
        //unnel.pgConnectDelete(diaThis.oldsPeerID1,sType,sEncrypt,sListenAddr,sClientAddr,diaThis.delete);
        localStorage.setItem('oldsPeerID1',diaThis.sPeerID);
        diaThis.oldsPeerID1=sPeerID;

      }else if(diaThis.clickVideo=='vTwo'){
        diaThis.loading2=true;
        diaThis.oldsPeerID2=localStorage.getItem('oldsPeerID2');
        tunnel.pgConnectDelete(diaThis.oldsPeerID2,sType,sEncrypt,sListenAddr,sClientAddr,diaThis.delete);
        localStorage.setItem('oldsPeerID2',diaThis.sPeerID);
        diaThis.oldsPeerID2=sPeerID;
      }else if(diaThis.clickVideo=='vThree'){
        diaThis.loading3=true;
        diaThis.oldsPeerID3=localStorage.getItem('oldsPeerID3');
        tunnel.pgConnectDelete(diaThis.oldsPeerID3,sType,sEncrypt,sListenAddr,sClientAddr,diaThis.delete);
        localStorage.setItem('oldsPeerID3',diaThis.sPeerID);
        diaThis.oldsPeerID3=sPeerID;
      }else{
        diaThis.loading4=true;
        diaThis.oldsPeerID4=localStorage.getItem('oldsPeerID4');
        tunnel.pgConnectDelete(diaThis.oldsPeerID4,sType,sEncrypt,sListenAddr,sClientAddr,diaThis.delete);
        localStorage.setItem('oldsPeerID4',diaThis.sPeerID);
        diaThis.oldsPeerID4=sPeerID;
      };//

    },
    // listen event
    playErr(player){
      //console.log(player);
    },
    onPlayerPlay(player) {
       //console.log('player play!', player)
    },
    onPlayerPause(player) {
       //console.log('player pause!', player)
    },
    onPlayerEnded(player) {
      //console.log('player ended!', player)
    },
    onPlayerLoadeddata(player,index) {
        if(index=='vOne'){
          this.loading1=false;
        }else if(index=='vTwo'){
          this.loading2=false;
        }else if(index=='vThree'){
          this.loading3=false;
        }else{
          this.loading4=false;
        };//
       //console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
      // console.log('player Playing!', player)
    },
    onPlayerTimeupdate(player) {

      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
       //console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
      // console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied(player) {
      // seek to 10s
      //console.log('example player 1 readied', player);
      player.currentTime(10)
      // console.log('example 01: the player is readied', player)
    }

  }
}
</script>

<style scoped lang="scss">
  .par-state {
    position: absolute;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: stretch;
    height: calc(100% - 120px);
    width: calc(100% - 226px);
    /*border:1px solid #ff0000;*/
  }
  .el-row{
    width: 100%;
  }
  .el-col {
    border-radius: 4px;
    height: 40vh;
    margin: 3px auto;
    /*border:1px solid #0000;*/
    display: inline-block;
    position: relative;
  }
  #videoPlayer{
    width: 100%;
    height: 100%;
    object-fit: cover;
    /*border: 2px solid #FF0000;*/
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .videoIcon{
    position: absolute;
    top: 20px;
    width: 20px;
    right: 20px;
    /*border: 1px solid #ff0000;*/
    /*z-index: 2011;*/
  }
  .videoIconT{
    position: absolute;
    bottom: 20px;
    width: 20px;
    right: 20px;
    /*border: 1px solid #ff0000;*/
    /*z-index: 2011;*/
  }

/*map*/
  /**/
  .dialog{
    width: 100%;
    height: 100%;
    /*border:1px solid #ff0000;*/
    border-radius: 3px;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 2010;
    background: rgba(0,0,0,0.4);
    text-align: center;
    display: block;
  }
  .dialogInfo{
    width: 46vw;
    height: 58vh;
    /*min-width: 400px;*/
    min-height: 450px;
    /*border:1px solid #ff0000;*/
    border-radius: 3px;
    position: relative;
    top: 12vh;
    left: 20%;
    background: white;
    /*z-index: 2001;*/
  }
  .dialogInfo>ul{
    width: 46vw;
    height: 58vh;
    //min-height: 400px;
    /*min-width: 400px;*/
    /*border:1px solid #ff0000;*/
  }
  .dialogInfo>ul>li:nth-child(1){
    height: 8vh;
    min-height: 50px;
    line-height: 50px;
    text-align: right;
    /*border: 1px solid #00FF00;*/
    border-bottom: 1px solid #cccccc;
  }
  .dialogInfo>ul>li:nth-child(1)>ul{
    width: 46vw;

  }
  .dialogInfo>ul>li:nth-child(1)>ul>li:nth-child(1){
    width: 41vw;
    /*border: 1px solid #00FF00;*/
    float: left;
    text-align: center;
  }
  .dialogInfo>ul>li:nth-child(1)>ul>li:nth-child(2){
    width: 5vw;
    /*border: 1px solid #00FF00;*/
    float: left;
    text-align: center;
  }
  .dialogInfo>ul>li:nth-child(2){
    height: 50vh;
    min-height: 400px;
    /*border:1px solid #FF0000;*/
  }
/**/
  #map{
    width: 41vw;
    height: 50vh;
    /*min-width: 400px;*/
    min-height: 400px;
    /*border:2px solid #0000FF;*/
    position: absolute;
    /*z-index: 2001;*/
  }
  #floor{
    /*border: 1px solid #ff0000;*/
    width: 35px;
    height: 35px;
    display: block;

  }
  .up{
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    /*border:1px solid red;*/
    position: absolute;
    right: 20px;
    bottom:205px;
    z-index: 2010;
  }
  .down{
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    /*border:1px solid red;*/
    position: absolute;
    right: 20px;
    bottom:135px;
    z-index: 2010;
  }

/**/
.liveView {
  position: relative;
  width: 50vw;
  height: 50vh;
  /*border:1px solid #ff0000;*/
}

.selectWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  line-height: 30px;
  margin: 20px;
  vertical-align: baseline;
}

.inputWrapper {
  width: 500px;
  margin: 0 auto;
}

.buttonWrapper {
  text-align: center;
}
  /*
  *live
  */
  .video-js .vjs-big-play-button{
    /*
     播放按钮换成圆形
    */
    height: 2em;
    width: 2em;
    line-height: 2em;
    border-radius: 1em;
  }
</style>
