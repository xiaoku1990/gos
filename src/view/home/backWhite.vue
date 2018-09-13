<template>
  <div>
    <p class="black-nav">
      车牌号  <el-input
      placeholder="请输入内容"
      v-model="searchFormData.car_number"
      size="small"
      @keyup.enter.native="search"
      clearable  style="width: 200px;margin-right: 20px;" class="input-round">
    </el-input>
      <el-button :loading="searchLoading" type="primary" size="small" round icon="el-icon-search" @click="search"></el-button>
    </p>
    <div class="main-padding par-state">
     <div class="bark-row">
       <div class="bark-one">
         <p class="black-title">
           <span><i></i>白名单</span>
           <el-button round icon="el-icon-plus" size="small" @click="newblackWhiteDialog('white')">新增记录</el-button>
           <el-button round icon="el-icon-download" size="small" type="danger" @click="blackWhiteExport('white')" :loading="whiteExportLoading">批量导出</el-button>
         </p>
         <el-table
           :data="whiteTableData"
           height="100%"
           style="width: 100%;">
           <!--<el-table-column-->
             <!--type="selection"-->
             <!--width="30">-->
           <!--</el-table-column>-->
           <!--下拉-->
           <el-table-column
             label="编号"
             prop="car_id"
             align="center"
             width="">
           </el-table-column>
           <el-table-column
             prop="car_number"
             empty-text="暂无数据"
             label="车牌号"
             align="center"
             width="">
           </el-table-column>
           <el-table-column
             align="center"
             label="操作"
             width="180px">
             <template slot-scope="scope">
               <el-button size="mini" round  @click="editDialog('white',scope.row,$event)" ><i class="black-i-bulr"></i>编辑</el-button>
               <el-button  size="mini" round @click="blackWhiteDelete('white',scope.row,$event)" type="info"><i class="black-i-red"></i>删除</el-button>
             </template>
           </el-table-column>
         </el-table>
         <div class="block">
           <el-pagination
             @current-change="whiteTablePageChange"
             :current-page.sync="whiteTableFormData.page"
             :page-count="whiteTablePageTotal"
             layout="prev, pager, next, slot, jumper">
             <span class="el-pagination__total page-count-padding">共{{whiteTablePageTotal}}页</span>
           </el-pagination>
         </div>
       </div>
       <div class="bark-one">
         <p class="black-title">
           <span><i></i>黑名单</span>
           <el-button round icon="el-icon-plus" size="small" @click="newblackWhiteDialog('black')">新增记录</el-button>
           <el-button round icon="el-icon-download" size="small" type="danger" @click="blackWhiteExport('black')" :loading="blackExportLoading">批量导出</el-button>
         </p>
         <el-table
           :data="blackTableData"
           height="100%"
           style="width: 100%;">
           <!--<el-table-column-->
             <!--type="selection"-->
             <!--width="30">-->
           <!--</el-table-column>-->
           <!--下拉-->
           <el-table-column
             label="编号"
             prop="car_id"
             align="center"
             width="">
           </el-table-column>
           <el-table-column
             prop="car_number"
             empty-text="暂无数据"
             label="车牌号"
             align="center"
             width="">
           </el-table-column>
           <el-table-column
             align="center"
             label="操作"
             width="180px">
             <template slot-scope="scope">
               <el-button size="mini" round  @click="editDialog('black',scope.row,$event)" ><i class="black-i-bulr"></i>编辑</el-button>
               <el-button  size="mini" round @click="blackWhiteDelete('black',scope.row,$event)" type="info"><i class="black-i-red"></i>删除</el-button>
             </template>
           </el-table-column>
         </el-table>
         <div class="block">
           <el-pagination
             @current-change="blackTablePageChange"
             :current-page.sync="blackTableFormData.page"
             :page-count="blackTablePageTotal"
             layout="prev, pager, next, slot, jumper">
             <span class="el-pagination__total page-count-padding">共{{blackTablePageTotal}}页</span>
           </el-pagination>
         </div>
       </div>
     </div>
    </div>

    <!-- 搜索弹框 -->
    <el-dialog
      title="查询"
      :append-to-body='true' :lock-scroll="true" :modal="true"
      :close-on-click-modal="false"
      :visible.sync="searchDialogVisible"
      width="30%"
      top="35vh">
      <el-form ref="searchData" :model="searchData" label-width="60px">
        <el-col :span="24">
          <el-form-item v-if="searchData.car_type == 'black'" label="黑名单"></el-form-item>
          <el-form-item v-if="searchData.car_type == 'white'" label="白名单"></el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="车牌号"><el-input readonly v-model="searchData.car_number"></el-input></el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="editLoading" @click="editDialog(searchData.car_type, searchData, $event)">编 辑</el-button>
        <el-button type="primary" :loading="editLoading" @click="blackWhiteDelete(searchData.car_type, searchData, $event)">删 除</el-button>
      </span>
    </el-dialog>

    <!-- 新增弹窗 -->
    <el-dialog
      :title="newDialogTitle"
      :append-to-body='true' :lock-scroll="true" :modal="true"
      :close-on-click-modal="false"
      :visible.sync="newblackWhiteDialogVisiable"
      width="30%"
      top="35vh">
      <p class="new-dialog-info">输入车牌：</p>
      <el-input v-model="newFormData.car_number" :placeholder="newDialogInfo" @keyup.enter.native="newblackWhiteClick"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newblackWhiteDialogVisiable = false" type="text">取 消</el-button>
        <el-button :loading="newLoading" type="primary" size="small" round @click="newblackWhiteClick">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog
      :title="editDialogTitle"
      :append-to-body='true' :lock-scroll="true" :modal="true"
      :close-on-click-modal="false"
      :visible.sync="editDialogVisible"
      width="30%"
      top="35vh">
      <el-form ref="editFormData" :model="editFormData" label-width="60px">
        <!--<el-col :span="24">-->
          <!--<el-form-item label="编号">-->
            <!--<el-input v-model="editFormData.car_id"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <el-col :span="24"><el-form-item label="车牌号">
          <el-input v-model="editFormData.car_number" @keyup.enter.native="editClick"></el-input>
        </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button right @click="editDialogVisible = false" type="text">取 消</el-button>
      <el-button type="primary" :loading="editLoading" @click="editClick">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
  import {formatDate} from '../../common/js/date.js'
  import {json2Xlsx} from '../../common/js/json2Xlsx.js'
  import {common} from '../../common/js/common.js'
  export default {
    name: "hoursers",
    data(){
      return{
        userId: 0,
        //搜索车牌
        searchDialogVisible: false,
        searchLoading: false,
        searchFormData: {
          user_id: 0,
          build_id: this.$BuildId,
          car_number: '',
        },
        searchData: {
          car_id: 0,
          car_number: '',
          car_type: '',
        },
        //白名单表
        whiteTableData: [],
        whiteTablePageTotal: 1,
        whiteTableFormData: {
          user_id: 0,
          build_id: this.$BuildId,
          list_type: 'white',
          page: 1
        },
        //黑名单表
        blackTableData: [],
        blackTablePageTotal: 1,
        blackTableFormData: {
          user_id: 0,
          build_id: this.$BuildId,
          list_type: 'black',
          page: 1
        },
        //新增
        newDialogTitle: '',
        newDialogInfo: '',
        newLoading: false,
        newblackWhiteDialogVisiable: false,
        newFormData: {
          user_id: 0,
          build_id: this.$BuildId,
          list_type: '',
          car_number: ''
        },
        //编辑
        editDialogTitle: '',
        editLoading: false,
        editDialogVisible: false,
        editFormData: {
          user_id: 0,
          build_id: this.$BuildId,
          list_type: '',
          car_id: 0,
          car_number: ''
        },
        //删除
        deleteFormData: {
          user_id: 0,
          build_id: this.$BuildId,
          list_type: '',
          car_number: '',
          car_id: ''
        },
        //导出
        blackExportLoading: false,
        whiteExportLoading: false,
        exportName: '',
        exportDateFormat: common().config.tableExportDateFormat,
        exportFiledArray: {
          sheetHeaderTitles: [
            '编号',
            '车牌号'
          ],
          sheetHeaderFields: [
            'car_id',
            'car_number'
          ]
        },
        exportFormData: {
          user_id: 0,
          build_id: this.$BuildId,
          list_type: '',
          page: 0
        }
      }
    },
    methods: {
      //车牌搜索
      search() {
        this.searchFormData.user_id = this.userId;
        this.searchLoading = true;
        this.$http({
          method: 'post',
          url: `${this.$Api}/GOSSystem/queryBlackWhiteCar`,
          params: this.searchFormData
        }).then(response => {
          this.searchLoading = false;
          if(response.data.result === 1) {
            this.searchData = response.data;
            this.searchDialogVisible = true;
          } else {
            this.$notify({
              title: '查询结果',
              message: response.data.msg,
              duration: 2000,
              type: 'info'
            });
          }
        }).catch((error) => {
          this.searchLoading = false;
          this.$notify({
            title: 'ERROR',
            message: `${error}`,
            duration: 2000,
            type: 'error'
          });
        });
      },
      //表格刷新
      whiteTableUpdate() {
        this.whiteTableFormData.user_id = this.userId;
        this.$http({
          method: 'post',
          url: `${this.$Api}/GOSSystem/getBlackWhiteList`,
          params: this.whiteTableFormData
        }).then(response => {
          if(response.data.result === 1) {
            this.whiteTableData = response.data.white_list;
            this.whiteTablePageTotal = response.data.total_page;
          }
        }).catch((error) => {
          this.$notify({
            title: 'ERROR',
            message: `${error}`,
            duration: 2000,
            type: 'error'
          });
        });
      },
      blackTableUpdate() {
        this.blackTableFormData.user_id = this.userId;
        this.$http({
          method: 'post',
          url: `${this.$Api}/GOSSystem/getBlackWhiteList`,
          params: this.blackTableFormData
        }).then(response => {
          if(response.data.result === 1) {
            this.blackTableData = response.data.black_list;
            this.blackTablePageTotal = response.data.total_page;
          }
        }).catch((error) => {
          this.$notify({
            title: 'ERROR',
            message: `${error}`,
            duration: 2000,
            type: 'error'
          });
        });
      },
      whiteTablePageChange(val) {
        // console.log(`当前页: ${val}`);
        this.whiteTableUpdate();
      },
      blackTablePageChange(val) {
        // console.log(`当前页: ${val}`);
        this.blackTableUpdate();
      },
      //新增
      newblackWhiteDialog(type){
        if(type == 'black') {
          this.newDialogTitle ='添加黑名单';
          this.newDialogInfo = '黑名单车辆进入车位会报警提示';
        } else if(type == 'white') {
          this.newDialogTitle ='添加白名单';
          this.newDialogInfo = '白名单车辆查询机隐私保护不可查询到';
        }
        this.newFormData.user_id = this.userId;
        this.newFormData.list_type = type;
        this.newFormData.car_number = '';
        this.newblackWhiteDialogVisiable = true;
      },
      newblackWhiteClick() {
        if(!this.newFormData.car_number) {
          this.$message({
            title: '注意',
            message: '车配不能为空',
            duration: 2000,
            type: 'warning'
          });
          return;
        }
        this.newLoading = true;
        this.$http({
          method: 'post',
          url: `${this.$Api}/GOSSystem/addCarToBlackWhiteList`,
          params: this.newFormData
        }).then(response => {
          this.newLoading = false;
          if(response.data.result === 1) {
            this.$notify({
              title: '成功',
              message: response.data.msg,
              duration: 2000,
              type: 'success'
            });
            this.newblackWhiteDialogVisiable = false;
            if(this.newFormData.list_type == 'white') {
              this.whiteTableUpdate();
            } else if(this.newFormData.list_type == 'black') {
              this.blackTableUpdate();
            }
          } else{
            this.$notify({
              title: '添加失败',
              message: response.data.msg,
              duration: 2000,
              type: 'error'
            });
          }
        }).catch((error) => {
          this.newLoading = false;
          this.$notify({
            title: 'ERROR',
            message: `${error}`,
            duration: 2000,
            type: 'error'
          });
        });
      },
      //编辑
      editDialog(type, row, event) {
        event.cancelBubble = true;
        if(type == 'black') {
          this.editDialogTitle ='编辑黑名单';
        } else if(type == 'white') {
          this.editDialogTitle ='编辑白名单';
        }
        this.editDialogVisible = true;
        this.editFormData.user_id = this.userId;
        this.editFormData.car_id = row.car_id;
        this.editFormData.car_number = row.car_number;
        this.editFormData.list_type = type;
      },
      //编辑确定
      editClick() {//导致row会全局引用
        if(!this.editFormData.car_number) {
          this.$message({
            message: '车牌号不能为空',
            duration: 2000,
            type: 'warning'
          });
          return;
        }
        this.editLoading = true;
        this.$http({
          method: 'post',
          url: `${this.$Api}/GOSSystem/editCarInBlackWhiteList`,
          params: this.editFormData
        }).then(response => {
          this.editLoading = false;
          if(response.data.result === 1) {
            this.$notify({
              title: '成功',
              message: response.data.msg,
              duration: 2000,
              type: 'success'
            });
            this.editDialogVisible = false;
            this.searchDialogVisible = false;
            if(this.editFormData.list_type == 'white') {
              this.whiteTableUpdate();
            } else if(this.editFormData.list_type == 'black') {
              this.blackTableUpdate();
            }
          } else {
            this.$notify({
              title: '编辑失败',
              message: response.data.msg,
              duration: 2000,
              type: 'error'
            });
          }
        }).catch((error) => {
          this.editLoading = false;
          this.$notify({
            title: 'ERROR',
            message: `${error}`,
            duration: 2000,
            type: 'error'
          });
        });
      },
      blackWhiteDelete(type, row, event) {
        event.cancelBubble = true;
        this.$confirm('此操作将永久删除该名单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteFormData.car_number = row.car_number;
          this.deleteFormData.car_id = row.car_id;
          this.deleteFormData.list_type = type;
          this.deleteFormData.user_id = this.userId;
          this.$http({
            method: 'post',
            url: `${this.$Api}/GOSSystem/deleteCarInBlackWhiteList`,
            params: this.deleteFormData
          }).then(response => {
            if (response.data.result === 1) {
              this.$notify({
                type: 'success',
                title: '成功',
                message: response.data.msg,
                duration: 2000
              });
              this.searchDialogVisible = false;
              if (this.deleteFormData.list_type == 'white') {
                this.whiteTableUpdate();
              } else if (this.deleteFormData.list_type == 'black') {
                this.blackTableUpdate();
              }
            } else {
              this.$notify({
                type: 'error',
                title: '删除失败',
                message: response.data.msg,
                duration: 2000
              });
            }
          }).catch((error) => {
            this.$notify({
              title: 'ERROR',
              message: `${error}`,
              duration: 2000,
              type: 'error'
            });
          });
        }).catch(() => {
          // console.log('取消删除');
        });
      },
      blackWhiteExport(type) {
        this.exportFormData.user_id = this.userId;
        this.exportFormData.list_type = type;
        if(type == 'black') {
          this.exportName = '黑名单导出_';
          this.blackExportLoading = true;
        } else if(type == 'white') {
          this.exportName = '白名单导出_';
          this.whiteExportLoading = true;
        }
        this.$http({
          method: 'post',
          url: `${this.$Api}/GOSSystem/getBlackWhiteList`,
          params: this.exportFormData
        }).then(response => {
          this.blackExportLoading = false;
          this.whiteExportLoading = false;
          if (response.status == 200) {
            let jsonData = response.data;
            if ((typeof(jsonData.result) !== 'undefined') && (jsonData.result == 1)) {
              let jsonResult = [];
              if(type == 'black') {
                jsonResult = jsonData.black_list;
              } else if(type == 'white') {
                jsonResult = jsonData.white_list;
              }
              // console.log(response);
              const xlsxName = this.exportName + formatDate(new Date, this.exportDateFormat);
              // console.log(`结果返回: ${ JSON.stringify(jsonData) }`);
              json2Xlsx(this, this.exportFiledArray.sheetHeaderTitles, this.exportFiledArray.sheetHeaderFields, jsonResult, xlsxName);
            } else {
              // console.log('导出失败：');
              // console.log(data.data);
            }
          } else {
            this.$message({
              message: `导出失败：${data.status}`,
              duration: 2000,
              type: 'error'
            });
          }
        }).catch((error) => {
          this.blackExportLoading = false;
          this.whiteExportLoading = false;
          this.$notify({
            title: 'ERROR',
            message: `${error}`,
            duration: 2000,
            type: 'error'
          });
        });
      }
    },
    mounted() {
      const _this = this;
      if(localStorage.getItem('userInfo')) {
        _this.userId = JSON.parse(localStorage.getItem('userInfo')).user_id;
      } else {
        console.log('[black-white]local storage 里面找不到登录信息userInfo');
      }
      eventbus.$on('onUserLogin', function(userInfo) {
        // console.log('[black-white]on user login');
        if(userInfo) {
          _this.userId = userInfo.user_id;
        } else {
          _this.userId = 0;
        }
        // console.log(`[black-white]user name: ${_this.adminName}`);
      });
      this.whiteTableUpdate();
      this.blackTableUpdate();
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/variables.scss";
  //弹性弹性
  .bark-row{
    display: flex;
    height: calc(100% - 120px);
    /*width: calc(100% - 226px);*/
    width: 100%;
    flex-direction: row;
    .bark-one{
      display: flex;
      flex: 5 0 auto;
      margin: 0px 1%;
      flex-direction: column;
      width: 48%;
      .black-title{
        float: left;
        text-align: right;
        line-height: 30px;
        width: 100%;
        flex: 1 0 auto;
        span{
          float: left;
          i{
            display: inline-block;
            height: 18px;
            float: left;
            background: #7362e4;
            width: 3px;
            margin-right: 6px;
            position: relative;
            top: 6px;
          }
        }
      }
      .el-table{
        flex: 6 0 auto;
      }
      .block{
        flex: 1 0 auto;
        text-align: center;
        margin: 20px 0px;
      }
    }
  }
  .black-nav {
    background: #fff;
    padding: 12px 20px;
    margin: 0px;
    margin-bottom: 20px;
  }
  .black-i-bulr{
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 25px;
    margin-right:6px;
    background: $green;
  }
  .black-i-red{
    display: inline-block;
    height: 10px;
    width: 10px;
    margin-right:6px;
    border-radius: 25px;
    background: $red;
  }
  .new-dialog-info {
    text-indent: .5em;
    font-size: 15px;
    line-height: 30px;
  }
</style>
