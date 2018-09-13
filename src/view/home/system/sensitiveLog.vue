<template>
  <div>
    <div class="the-car-query">
      <div class="state-from" style="display: flex">
        <el-form ref="userQuery" :model="userQuery" label-width="100px" style="width: 100%">
          <el-form-item label="搜索关键字" style="width: 30%;float: left">
            <el-col :span="20">
              <el-input
                placeholder="关键字"
                prefix-icon="el-icon-search"
                v-model="userQuery.keyword"
                size="small"
                clearable
                @keyup.enter.native="updateTable"
                class="input-round">
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="日期筛选" class="data-item" >
            <el-col :span="8">
              <el-date-picker :picker-options="dataPickerOptions1" :editable="false" :clearable="false" value-format="yyyy-MM-dd" size="small" class="input-round" type="date" v-model="userQuery.start_time" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center;">-</el-col>
            <el-col :span="8">
              <el-date-picker :picker-options="dataPickerOptions2" :editable="false" :clearable="false" value-format="yyyy-MM-dd" size="small" class="input-round" type="date" v-model="userQuery.end_time" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" size="small" icon="el-icon-search" round @click="updateTable" :loading="queryLoading"></el-button>
            <el-button type="danger" size="small" round @click="exports" :loading="exportLoading">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="main-car-padding stor-var">
      <div class="sensitive-row">
        <el-table
          :data="tableData"
          height="100%"
          style="width: 100%;">
          <el-table-column
            prop="user_name"
            empty-text="暂无数据"
            label="姓名"
            align="center"
            width="">
          </el-table-column>
          <el-table-column
            prop="user_department"
            empty-text="暂无数据"
            label="部门"
            align="center"
            width="">
          </el-table-column>
          <el-table-column
            :formatter="formatTableDate"
            prop="record_time"
            empty-text="暂无数据"
            label="时间"
            align="center"
            width="">
          </el-table-column>
          <el-table-column
            prop="summary"
            empty-text="暂无数据"
            label="详情"
            align="center"
            width="">
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @current-change="tablePageChange"
            :current-page.sync="userQuery.page"
            :page-count="tablePageTotal"
            layout="prev, pager, next, slot, jumper">
            <span class="el-pagination__total page-count-padding">共{{tablePageTotal}}页</span>
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from '../../../common/js/date.js'
  import {json2Xlsx} from '../../../common/js/json2Xlsx.js'
  import {common} from '../../../common/js/common.js'
  export default {
    name: "sensitive-log",
    data() {
      let today = new Date;
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);
      let last7Day = new Date(today.getTime() - 1000 * 3600 * 24 * 7);
      return{
        //表格数据获取
        queryLoading: false,
        userQuery: {
          user_id: 0,
          build_id: this.$BuildId,
          keyword: '',
          start_time: formatDate(last7Day, 'yyyy-MM-dd'),
          end_time: formatDate(today, 'yyyy-MM-dd'),
          page: 1
        },
        tableData: [],
        tablePageTotal: 1,
        //导出
        exportLoading: false,
        exportFormData: {
          user_id: 0,
          build_id: this.$BuildId,
          keyword: '',
          start_time: 0,
          end_time: 0,
          page: 0
        },
        exportDateFormat: common().config.tableExportDateFormat,
        exportFiledArray: {
          sheetHeaderTitles: [
            '姓名',
            '部门',
            '时间',
            '详情'
          ],
          sheetHeaderFields: [
            'user_name',
            'user_department',
            'record_time',
            'summary'
          ]
        },
        //日期组件选项
        dataPickerOptions1: {
          disabledDate: (time) => {
            let timeInvalid = false;
            if (this.userQuery.end_time) {
              timeInvalid = time.getTime() > new Date(this.userQuery.end_time);
            }
            return (timeInvalid || (time.getTime() > new Date));
          }
        },
        dataPickerOptions2: {
          disabledDate: (time) => {
            let timeInvalid = false;
            if (this.userQuery.start_time) {
              timeInvalid = time.getTime() < new Date(this.userQuery.start_time);
            }
            return (timeInvalid || (time.getTime() > new Date));
          }
        }
      }
    },
    methods: {
      tablePageChange(page) {
        this.updateTable();
      },
      updateTable() {
        this.queryLoading = true;
        this.$http({
          method: 'post',
          url: `${this.$Api}/GOSSystem/getSensitivityLog`,
          params: this.userQuery
        }).then(response => {
          this.queryLoading = false;
          if(response.data.result === 1) {
            this.tableData = response.data.log_list;
            this.tablePageTotal = response.data.total_page;
          }
        }).catch((error) => {
          this.queryLoading = false;
          this.$notify({
            title: 'ERROR',
            message: `${error}`,
            duration: 2000,
            type: 'error'
          });
        });
      },
      formatTableDate(row, column, cellValue) {
        let data = new Date(cellValue);
        return formatDate(data, 'yyyy-MM-dd');
      },
      exports() {
        this.exportLoading = true;
        this.$http({
          method: 'post',
          url: `${this.$Api}/GOSSystem/getSensitivityLog`,
          params: this.exportFormData
        }).then(response => {
          this.exportLoading = false;
          if (response.status == 200) {
            let jsonData = response.data;
            let dataExport = [];
            if ((typeof(jsonData.result) !== 'undefined') && (jsonData.result == 1)) {
              let jsonResult = jsonData.log_list;
              let dataExport = [];
              // console.log(response);
              const xlsxName = '敏感操作日志导出_' + formatDate(new Date, this.exportDateFormat);
              // console.log(`结果返回: ${ JSON.stringify(jsonData) }`);
              for (let i in jsonResult) {
                dataExport[i] = {
                  user_name: jsonResult[i].user_name,
                  user_department: jsonResult[i].user_department,
                  record_time: formatDate(new Date(jsonResult[i].record_time), 'yyyy-MM-dd'),
                  summary: jsonResult[i].summary
                };
              }
              json2Xlsx(this, this.exportFiledArray.sheetHeaderTitles, this.exportFiledArray.sheetHeaderFields, dataExport, xlsxName);
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
          this.exportLoading = false;
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
      this.updateTable();
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../style/variables.scss";
  .back-nav {
    background: #fff;
    padding: 12px 20px;
    margin: 0px;
    margin-bottom: 20px;
  }
  .sensitive-row{
    display: flex;
    height: calc(100% - 120px);
    /*width: calc(100% - 226px);*/
    width: 100%;
    flex-direction: column;
    .el-table{
      flex: 6 0 auto;
    }
    .back-title{
      flex: 1 0 auto;
      float: left;
      text-align: right;
      line-height: 30px;
      width: 100%;
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
    .block{
      flex: 1 0 auto;
      text-align: center;
      margin: 20px 0px;
    }
  }

  .back-i-bulr{
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 25px;
    margin-right:6px;
    background: $green;
  }
  .back-i-red{
    display: inline-block;
    height: 10px;
    width: 10px;
    margin-right:6px;
    border-radius: 25px;
    background: $red;
  }
  .back-i-blue{
    display: inline-block;
    height: 10px;
    width: 10px;
    margin-right:6px;
    border-radius: 25px;
    background: $blue;
  }
  //弹性布局
  .the-car-query{
    background: #fff;
    margin-bottom: 20px;
    display: flex;
    .state-from{
      display: flex;
      height: 60px;
      padding: 10px 5px 10px 0px;
      float: left;
      background: #fff;
      width: 100%;
      border-radius: 3px;
      .data-item{
        float: left;
        width: 50%;
      }
    }
  }
</style>
