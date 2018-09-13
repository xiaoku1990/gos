<template>
  <div class="license-plate noselect">
    <!--车牌展示区域-->
    <div class="cph-wrap cph-wrap-shadow">
      <span><strong style="opacity: 0">苏</strong></span>
      <span class=""></span>
      <span class=""></span>
      <span class=""></span>
      <span class=""></span>
      <span class=""></span>
      <span></span>
    </div>

    <div class="cph-wrap" style="z-index: 2" @click="cphInputClick">
      <span :class="{active: (choseIndex-1)==index}" v-for="(item,index) in cph" :key="item.index" @click="checkActive(index,item)">{{item}}</span>
    </div>
    <!--键盘区域-->
    <transition name="slide">
      <div class="keyboard-wrap" @click="clickBoard" v-show="show_keyboard">
        <div class="keyboard" style="justify-content: flex-end;" v-if="activeIndex>=5">
          <span class="k-done" v-on:>完成</span>
        </div>
        <div v-if="proviceShow">
          <div class="keyboard">
            <span v-for="item in provice.slice(0,10)" :key="item.index">{{ item }}</span>
          </div>
          <div class="keyboard">
            <span v-for="item in provice.slice(10,19)" :key="item">{{ item }}</span>
          </div>
          <div class="keyboard">
            <span v-for="item in provice.slice(19,26)" :key="item">{{ item }}</span>
          </div>
          <div class="keyboard">
            <span v-for="item in provice.slice(26)" :key="item">{{ item }}</span>
            <span class="k-del"></span>
          </div>
        </div>
        <div v-else>
          <div class="keyboard" v-if="activeIndex > 1">
            <span v-for="item in numbers" :key="item">{{ item }}</span>
          </div>
          <div class="keyboard">
            <span v-for="item in letters.slice(0,10)" :key="item">{{ item }}</span>
          </div>
          <div class="keyboard" >
            <span v-for="item in letters.slice(10,19)" :key="item">{{ item }}</span>
          </div>
          <div class="keyboard">
            <span v-for="item in letters.slice(19)" :key="item">{{ item }}</span>
            <span v-if="activeIndex>=6" style="position: absolute; left: 2px;">挂</span>
            <span class="k-del"></span>

          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'findCar',
  data: function () {
    return {
      'provice': ['京', '津', '沪', '渝', '翼', '豫', '云', '辽', '黑', '湘', '皖', '鲁', '新', '苏', '浙', '赣', '鄂', '桂', '甘', '晋', '蒙', '陕', '吉', '闽', '贵', '粤', '青', '藏', '川', '宁', '琼'],
      'numbers': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      'letters': ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'],
      'cph': [],
      'show_keyboard': true, //键盘的默认显示
      'addTrue': true,  //是否在数组后面添加
      'changeIndex': '', //要更改的车牌号在数组的索引
      'proviceShow':true, // 省份是否显示
      choseIndex :'' // 点击了车牌的哪个位置
    }
  },
  methods: {
    clickBoard: function (e) {
      console.log(e);
      if (e.target.tagName.toLowerCase() == 'span') {
        if (e.target.className.indexOf('k') == -1 && this.cph.length < 7) {
          if(this.addTrue){
            this.cph.push(e.target.textContent)
          }else{
            //替换对应位置的车牌号
            this.cph.splice(this.changeIndex,1,e.target.textContent)
          };

        }else{
          if(!this.addTrue){
            //替换对应位置的车牌号
            this.cph.splice(this.changeIndex,1,e.target.textContent)
          };
        }

        if (e.target.className == 'k-del') {
          this.cph.pop()
        }

        if (e.target.className === 'k-done') {
          // this.setPlateNumber(this.cph)
          //this.cphInputClick()
          this.$emit('plate-number', this.cph)
        }
      }
    },
    cphInputClick: function () {

      // this.show_keyboard = !this.show_keyboard
    },
    checkActive(index,item) { //更改对应位置的车牌号码
     //console.log(index);
     //console.log(item);
     this.choseIndex=index+1;
     this.changeIndex = index;
     //console.log(this.cph);
     if(index==0) {
       this.proviceShow=true
     }else{
       this.proviceShow=false
     }
       //if((item+1)==this.cph.length){
       //  console.log('true')
       //  this.addTrue = true
       //}else{
         //console.log('false')
         this.addTrue = false

       //};//

    }
  },
  computed: {
    activeIndex: function () {
      //console.log(this.cph)
        if(this.cph.length==0){
          this.proviceShow=true
        }else{
          this.proviceShow=false
          this.addTrue = true
        };
       this.choseIndex = this.cph.length;
      return this.cph.length
    }
  }
}
</script>
<style scoped>
  @import '../../../../lib/css/cph.css'
</style>
