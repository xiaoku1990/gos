<template>
  <div>
    <!--<p class="back-nav">-->
    <div class="the-car-query">
      <div class="state-from" style="display: flex">
        <el-form ref="userQuery" :model="userQuery" label-width="80px">

          <el-form-item label="停车类型" style="width:200px;float:left">
            <el-col :span="20">
              <el-select size="small" v-model="userQuery.car_type" class="input-round">
                <el-option v-for="itme in tableFieldList.carTypes" :label="itme.car_type_name"
                           :value="itme.car_type_id"></el-option>
              </el-select>
            </el-col>
          </el-form-item>

          <el-form-item label="停车时间" class="data-item" style="width:450px;float:left">
            <el-col :span="11">
              <el-date-picker :editable="false" size="small" class="input-round" type="datetime" placeholder="开始时间"
                              :format="tableDisplayDateFormat" :value-format="htmlDateFormat"
                              :picker-options="dataTimePickerOptions1"
                              v-model="startTime" prefix-icon="el-icon-date"
                              :clearable="false"
                              style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center;">-</el-col>
            <el-col :span="11">
              <el-date-picker :disabled="endTimeDisable" :editable="false" size="small" class="input-round"
                              type="datetime" placeholder="结束时间"
                              :format="tableDisplayDateFormat" :value-format="htmlDateFormat"
                              :picker-options="dataTimePickerOptions2"
                              v-model="endTime" prefix-icon="el-icon-date"
                              :clearable="false"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="车区" class="data-item" style="float:left">
            <el-col :span="8">
              <el-select size="small" v-model="floorSelect" class="input-round" style="border-radius:25px"
                         placeholder="请选择楼层">
                <el-option v-for="(itme, index) in tableFieldList.floorAreas" :label="itme.floor_name"
                           :value="index"></el-option>
              </el-select>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center;">-</el-col>
            <el-col :span="8">
              <el-select size="small" v-model="areaSelect" class="input-round" placeholder="请选择区域">
                <el-option v-for="(itme, index) in tableFieldList.floorAreas[floorSelectedIndex].area_list"
                           :label="itme.area_name"
                           :value="index"></el-option>
              </el-select>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="small" icon="el-icon-search" round
                       @click="search('userQuery')"></el-button>
            <el-button type="danger" size="small" round @click="exports">导出</el-button>
          </el-form-item>
          <!--<el-form-item >-->
          <!--<el-button type="primary"  size="small" icon="el-icon-search"  round  @click="export()">导出</el-button>-->
          <!--</el-form-item>-->
        </el-form>
      </div>
    </div>
    <div class="main-car-padding">
      <el-table :data="tableData" height="100%" style="width: 100%;">
        <el-table-column
          align="center"
          label="停车类型"
          width="">
          <template slot-scope="scope">
            <span v-if="scope.row.car_type == 1">正常</span>
            <span v-else-if="scope.row.car_type == 2" style="color: red">超时车</span>
            <span v-else-if="scope.row.car_type == 3" style="color: red">过夜车</span>
            <span v-else-if="scope.row.car_type == 4" style="color: red">违停车</span>
          </template>
        </el-table-column>
        <el-table-column
          label="进入车辆时间"
          align="center"
          width="">
          <template slot-scope="scope">
            <span class="time-cell-span">{{ formatTime(scope.row.in_time, 0) }}</span>
            <span class="time-cell-span">{{ formatTime(scope.row.in_time, 1) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="驶出车辆时间"
          align="center"
          width="">
          <template slot-scope="scope">
            <span class="time-cell-span">{{ formatTime(scope.row.out_time, 0) }}</span>
            <span class="time-cell-span">{{ formatTime(scope.row.out_time, 1) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :formatter="formatMinute"
          prop="stop_time"
          label="停放时长"
          align="center"
          width="">
        </el-table-column>
        <el-table-column
          prop="floor_name"
          label="楼层"
          align="center"
          width="">
        </el-table-column>
        <el-table-column
          prop="area_name"
          label="车区"
          align="center"
          width="">
        </el-table-column>
        <el-table-column
          prop="carpos_name"
          label="车位"
          align="center"
          width="">
        </el-table-column>
        <el-table-column
          prop="car_number"
          label="车牌号"
          align="center"
          width="">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="userQuery.page"
          :page-size="tablePageSize"
          :page-count="tablePageTotal"
          layout="prev, pager, next, slot, jumper">
          <span class="el-pagination__total page-count-padding">共{{tablePageTotal}}页</span>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from '../../common/js/date.js'
  import {json2Xlsx} from '../../common/js/json2Xlsx.js'
  import {common} from '../../common/js/common.js'

  export default {
    name: "the-car-log",
    data() {
      return {
        tableData: [],  //待加载
        dataTimePickerOptions1: {
          disabledDate: (time) => {
            let timeInvalid = false;
            if (this.userQuery.end_time) {
              timeInvalid = time.getTime() > new Date(this.userQuery.end_time);
            }
            return (timeInvalid || (time.getTime() > new Date));
          },
          // shortcuts: common().list.dates
        },
        dataTimePickerOptions2: {
          disabledDate: (time) => {
            let timeInvalid = false;
            if (this.userQuery.start_time) {
              timeInvalid = time.getTime() < new Date(this.userQuery.start_time);
            }
            return (timeInvalid || (time.getTime() > new Date));
          },
          // shortcuts: common().list.dates
        },
        userQuery: {
          build_id: this.$BuildId,
          car_type: 0,
          floor_id: 0,
          area_id: 0,
          start_time: 0,
          end_time: 0,
          page: 1
        },
        floorAreasQuery: {
          build_id: this.$BuildId,
        },
        startTime: null,
        endTime: null,
        endTimeDisable: false,
        floorSelectedIndex: 0,
        areaSelectedIndex: 0,
        tablePageTotal: 0,
        tablePageSize: common().config.pageItemSize,
        tableExportName: common().config.tableExportName,
        tableDateFormat: common().config.tableDateFormat,
        tableExportDateFormat: common().config.tableExportDateFormat,
        tableDisplayDateFormat: common().config.tableDisplayDateFormat,
        htmlDateFormat: common().config.htmlDateFormat,
        tableFieldList: {
          carTypes: common().list.carTypes,
          floorAreas: [{floor_name: '不限', area_list: [{area_name: '不限'}]}]  //先初始化一个默认值，再加载数据覆盖
        },
        tableFiledArray: {
          sheetHeaderTitles: common().list.sheetHeaderTitles,
          sheetHeaderFields: common().list.sheetHeaderFields
        },
        requestUrl: {
          tableDataUrl: common().url.stopDailyLog,
          floorAreaListUrl: common().url.floorAreaList
        }
      };
    },
    created() {
      let today = new Date;
      let now = new Date;
      today.setMilliseconds(0);
      today.setSeconds(0);
      today.setMinutes(0);
      today.setHours(0);
      this.startTime = formatDate(today, this.tableDateFormat);
      this.endTime = formatDate(now, this.tableDateFormat);
      this.getFloorAreaList();
    },
    mounted() {
      // this.queryData();  //不能在这里调用，一定要等获取到floorAreaList
    },
    watch: {
      startTime(val) {
        // this.userQuery.start_time = (val ? val : 0);
        // this.endTimeDisable = !val;
        // if (!val) {
        //   this.endTime = null;
        //   this.userQuery.end_time = 0;
        // } else {
        //   this.userQuery.end_time = formatDate(new Date, this.tableDateFormat);
        // }
        this.userQuery.start_time = val;
      },
      endTime(val) {
        // this.userQuery.end_time = (val ? val : formatDate(new Date, this.tableDateFormat));
        this.userQuery.end_time = val;
      }
    },
    computed: {
      floorSelect: {
        get() {
          return this.floorSelectedIndex;
        },
        set(val) {
          if (val != this.floorSelectedIndex) {
            this.userQuery.floor_id = this.tableFieldList.floorAreas[val].floor_id;
            this.floorSelectedIndex = val;

            //联动刷新
            this.areaSelectedIndex = 0;
            this.userQuery.area_id = this.tableFieldList.floorAreas[val].area_list[0].area_id;
          }
        }
      },
      areaSelect: {
        get() {
          return this.areaSelectedIndex;
        },
        set(val) {
          if (val != this.areaSelectedIndex) {
            this.userQuery.area_id = this.tableFieldList.floorAreas[this.floorSelectedIndex].area_list[val].area_id;
            this.areaSelectedIndex = val;
          }
        }
      }
    },
    methods: {
      search(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.queryData();
          } else {
            return false;
          }
        });
      },
      exports() {
        let formData = new FormData();
        this.userQuery.page = 0;
        for (let i in this.userQuery) {
          formData.append(i, this.userQuery[i]);
        }
        // console.log(`导出，查询字段: ${ JSON.stringify(this.userQuery) }`);
        this.$http.post(this.$Api + this.requestUrl.tableDataUrl, formData, {dataType: 'json'})
          .then(data => {
            if (data.status == 200) {
              let jsonData = data.data;
              if ((typeof(jsonData.result) !== 'undefined') && (jsonData.result == 1)) {
                let jsonResult = jsonData.record_list;
                let dataExport = [];
                const xlsxName = this.tableExportName + formatDate(new Date, this.tableExportDateFormat);
                // console.log(`结果返回: ${ JSON.stringify(jsonData) }`);
                for (let i in jsonResult) {
                  dataExport[i] = {
                    car_type: this.tableFieldList.carTypes[jsonResult[i].car_type].car_type_name,
                    in_time: formatDate(jsonResult[i].in_time, this.tableDateFormat),
                    out_time: formatDate(jsonResult[i].out_time, this.tableDateFormat),
                    stop_time: this.secondTimeConvert(jsonResult[i].stop_time),
                    floor_name: jsonResult[i].floor_name,
                    area_name: jsonResult[i].area_name,
                    carpos_name: jsonResult[i].carpos_name,
                    car_number: jsonResult[i].car_number
                  };
                }
                json2Xlsx(this, this.tableFiledArray.sheetHeaderTitles, this.tableFiledArray.sheetHeaderFields, dataExport, xlsxName);
              } else {
                // console.log('导出getStopDailyLog失败：');
                // console.log(data.data);
              }
            }
            else {
              this.$message({
                message: `导出getStopDailyLog失败：${data.status}`,
                duration: 2000,
                type: 'error'
              });
            }
          })
          .catch((error) => {
            this.$notify({
              title: 'ERROR',
              message: `${error}`,
              duration: 2000,
              type: 'error'
            });
          });
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.queryData();
      },
      secondTimeConvert(secondInput) {
        let hour = Math.floor(secondInput / 3600);
        let min = Math.floor(secondInput % 3600 / 60);
        let sec = secondInput % 3600 % 60;
        hour = ((hour < 10) ? '0' + hour : hour);
        min = ((min < 10) ? '0' + min : min);
        sec = ((sec < 10) ? '0' + sec : sec);
        return `${hour}:${min}:${sec}`;
      },
      formatTime(val, index) {
        let valueArray = formatDate(val, this.tableDateFormat).split(' ');
        return valueArray[index];
      },
      formatMinute(row, column, cellValue) {
        return this.secondTimeConvert(cellValue);
      },
      getFloorAreaList() {
        let formData = new FormData();
        for (let i in this.floorAreasQuery) {
          formData.append(i, this.floorAreasQuery[i]);
        }
        this.$http.post(this.$Api + this.requestUrl.floorAreaListUrl, formData, {dataType: 'json'})
          .then(data => {
            if (data.status == 200) {
              let jsonData = data.data;
              if ((typeof(jsonData.result) !== 'undefined') && (jsonData.result == 1)) {
                let floorAreaList = common().util.floorAreaListAppendNull(jsonData.floor_list);
                this.tableFieldList.floorAreas = floorAreaList;
                this.userQuery.floor_id = floorAreaList[0].floor_id;
                this.userQuery.area_id = floorAreaList[0].area_list[0].area_id;
                this.queryData();
              } else {
                // console.log('获取floorAreaList失败：');
                // console.log(data.data);
              }
            }
            else {
              this.$message({
                message: `获取floorAreaList失败：${data.status}`,
                duration: 2000,
                type: 'error'
              });
            }
          })
          .catch((error) => {
            this.$notify({
              title: 'ERROR',
              message: `${error}`,
              duration: 2000,
              type: 'error'
            });
          });
      },
      queryData() {
        let formData = new FormData();
        for (let i in this.userQuery) {
          formData.append(i, this.userQuery[i]);
        }
        this.tableData = [];
        // console.log(`查询字段: ${ JSON.stringify(this.userQuery) }`);
        this.$http.post(this.$Api + this.requestUrl.tableDataUrl, formData, {dataType: 'json'})
          .then(data => {
            if (data.status == 200) {
              let jsonData = data.data;
              if ((typeof(jsonData.result) !== 'undefined') && (jsonData.result == 1)) {
                // console.log(`结果返回: ${ JSON.stringify(jsonData) }`);
                this.tableData = jsonData.record_list;
                this.tablePageTotal = jsonData.total_page;
              } else {
                // console.log('获取getStopDailyLog失败：');
                // console.log(data.data);
              }
            }
            else {
              this.$message({
                message: `获取getStopDailyLog失败：${data.status}`,
                duration: 2000,
                type: 'error'
              });
            }
          })
          .catch((error) => {
            this.$notify({
              title: 'ERROR',
              message: `${error}`,
              duration: 2000,
              type: 'error'
            });
          });
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/variables.scss";

  .back-nav {
    background: #fff;
    padding: 12px 20px;
    margin: 0px;
    margin-bottom: 20px;
  }

  .back-title {
    float: left;
    text-align: right;
    line-height: 30px;
    width: 100%;
    span {
      float: left;
      i {
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

  .block {
    text-align: center;
    margin: 20px 0px;
  }

  .back-i-bulr {
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 25px;
    margin-right: 6px;
    background: $green;
  }

  .back-i-red {
    display: inline-block;
    height: 10px;
    width: 10px;
    margin-right: 6px;
    border-radius: 25px;
    background: $red;
  }

  //弹性布局
  .the-car-query {
    background: #fff;
    margin-bottom: 20px;
    display: flex;
    min-width: 1200px;
    .state-from {
      display: flex;
      height: 60px;
      padding: 10px 5px 10px 0px;
      float: left;
      background: #fff;
      width: 100%;
      border-radius: 3px;
      .data-item {
        float: left;
        width: 33%;
      }
    }
  }

  .page-count-padding {
    padding-left: 24px;
  }

  .time-cell-span {
    display: inline-block;
    width: 80px;
  }
</style>
