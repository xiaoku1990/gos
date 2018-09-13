<template>
  <div id="app">
      <headers ></headers>
      <div class="appView">
        <sidebar></sidebar>
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
  import sidebar from '@/components/modules/sidebar'  /*header*/
  import headers from '@/components/header/headers'  /*header*/
export default {
  name: 'App',
  data(){
    return{

    }
  },
  methods: {

  },
  mounted() {

  },
  components:{headers,sidebar}
}
</script>

<style lang="scss">
  #app{
    /*display: flex;*/
    flex-flow: column nowrap;
    place-content: flex-end flex-start;
    align-items: flex-start;
    position: fixed;
    height: 100%;
    width: 100%;
    align-items: baseline;
    align-content: stretch;
    .appView{
      display: flex;
      width: 100%;
      min-height: 100%;
    }
  }
</style>
