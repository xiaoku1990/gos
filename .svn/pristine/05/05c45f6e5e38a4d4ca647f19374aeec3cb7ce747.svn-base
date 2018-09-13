<template>
  <div class="par-state main-padding">
    <div class="state-one">

        <div class="state-query">
            <el-form ref="userQuery" :model="userQuery" label-width="80px"  >
               <p>
                <el-col :span="8">
                  <el-select size="small"  v-model="userQuery.carArea" class="input-round">
                    <el-option v-for="itme in userQuery.carAreas" :label="itme.label" :value="itme.value"></el-option>
                  </el-select>
                </el-col>
                <el-col class="line" :span="1" style="text-align: center;">-</el-col>
                <el-col :span="8">
                  <el-select size="small" v-model="userQuery.area" class="input-round" placeholder="请选择活动区域">
                    <el-option v-for="itme in userQuery.areas" :label="itme.label" :value="itme.value"></el-option>
                  </el-select>
                </el-col>
               </p>
              <p>
                <el-col :span="11"  style="margin-right: 10px">
                  <el-input
                    placeholder="请输入分区车位"
                    v-model="userQuery.serch"
                    size="small"
                    clearable   class="input-round">
                  </el-input>
                </el-col>
                <el-col :span="11">
                  <el-button type="danger"  size="small" icon="el-icon-search"  round  @click="vehiceQueryClick('userQuery')">查询</el-button>
                  <el-button   size="small"   round  @click="newPark()">新增</el-button>
                </el-col>
            </p>
            </el-form>
          <!---->
        </div>
        <!--表格-->
        <div class="state-Using-from">
          <el-col :span="24">
            <el-table
              height="100%"
              :data="tableData"
              >
              <el-table-column
                label="分区"
                prop="partition"
                align="center"
                width="">
              </el-table-column>
              <el-table-column
                prop="parking"
                empty-text="暂无数据"
                label="区域"
                align="center"
                width="">
                <template slot-scope="scope">
                  <span  class="scope-span"  v-for="item in scope.row.parking" >{{item.name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="操作"
                width="">
                <template slot-scope="scope">
                  <el-button size="mini" type="info" round @click="backDelete(scope.row,$event)" style="color:#ff3559" icon="el-icon-delete"></el-button>
                  <el-button size="mini" type="info" round  icon="el-icon-setting" style="color: #43db77"></el-button>
                </template>
              </el-table-column>
            </el-table>

          </el-col>
        </div>


    </div>
    <div class="state-tor">
      <div class="map-bottm">
        放地图的位置
        <button  class="next-layer"  @click="openDialog" >下一层</button>
      </div>
    </div>
    <!--地图弹窗-->
    <el-dialog
      title="查看图片"
      :append-to-body='true' :lock-scroll="true" :modal="true"
      :close-on-click-modal="false"
      :visible.sync="mapVehicle"
      @close='mapDialog'
      top="35vh"
      width="30%"
    >
      <div class="map-img">
        <img src="~@/assets/images/logo.jpg">
      </div>

    </el-dialog>
    <!--新增-->
    <!--新增-->
    <el-dialog
      title="新增"
      :append-to-body='true' :lock-scroll="true" :modal="true"
      :close-on-click-modal="false"
      :visible.sync="newParking"
      width="30%"
      top="35vh"
      >
      <el-form ref="newFrom" :model="newFrom" label-width="80px">
        <el-col :span="12">
          <el-form-item label="区域">
            <el-input v-model="newFrom.partition"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12"><el-form-item label="车位">
          <el-input v-model="newFrom.parking.name"></el-input>
        </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newParking = false" type="text">取 消</el-button>
        <el-button type="primary" size="small" round @click="newParkingWhiteClick(newFrom)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "vehicle-using",
    data(){
      return{
        stateMsg:true,
        dialogVisible:false,
        mapVehicle:false,
        diaglogMsg:'警告',
        newParking:false,
        newFrom:{
          partition:'A区',
          parking:[
            {
              id:0,
              name:'A0N'
            },
          ]
        },
        userQuery:{
          serch:'',
          carArea:'0',
          carAreas:[
            {
              label:'不限',
              value:'0'
            },
            {
              label:'B1层',
              value:'1'
            },
            {
              label:'B2层',
              value:'2'
            }
          ],
          area:'0',
          areas:[
            {
              label:'不限',
              value:'0'
            },
            {
              label:'B区',
              value:'1'
            },
            {
              label:'C区',
              value:'2'
            }
          ],
        },
        //当前楼层名称
        floorName:"",
        //占用数，空余数，超时停车，黑名单，违规停车，特殊车辆显示数据
        stateData:[],
        //表格
        tableData: [{
          partition:'B1',
          parking: [
            {
              id:0,
              name:'A01'
            },
            {
              id:1,
              name:'A02'
            },
            {
              id:2,
              name:'A03'
            },{
              id:3,
              name:'A04'
            },{
              id:4,
              name:'A05'
            }
          ],
        },{
          partition:'B2',
          parking: [
            {
              id:0,
              name:'A01'
            },
            {
              id:1,
              name:'A02'
            },
            {
              id:2,
              name:'A03'
            },{
              id:3,
              name:'A04'
            },{
              id:4,
              name:'A05'
            }
          ],
        },{
          partition:'B3',
          parking: [
            {
              id:0,
              name:'A01'
            },
            {
              id:1,
              name:'A02'
            },
            {
              id:2,
              name:'A03'
            },{
              id:3,
              name:'A04'
            },{
              id:4,
              name:'A05'
            }
          ],
        },{
          partition:'B4',
          parking: [
            {
              id:0,
              name:'A01'
            },
            {
              id:1,
              name:'A02'
            },
            {
              id:2,
              name:'A03'
            },{
              id:3,
              name:'A04'
            },{
              id:4,
              name:'A05'
            }
          ],
        },{
          partition:'B5',
          parking: [
            {
              id:0,
              name:'A01'
            },
            {
              id:1,
              name:'A02'
            },
            {
              id:2,
              name:'A03'
            },{
              id:3,
              name:'A04'
            },{
              id:4,
              name:'A05'
            }
          ],
        },{
          partition:'B6',
          parking: [
            {
              id:0,
              name:'A01'
            },
            {
              id:1,
              name:'A02'
            },
            {
              id:2,
              name:'A03'
            },{
              id:3,
              name:'A04'
            },{
              id:4,
              name:'A05'
            }
          ],
        },{
          partition:'B7',
          parking: [
            {
              id:0,
              name:'A01'
            },
            {
              id:1,
              name:'A02'
            },
            {
              id:2,
              name:'A03'
            },{
              id:3,
              name:'A04'
            },{
              id:4,
              name:'A05'
            }
          ],
        },{
          partition:'B8',
          parking: [
            {
              id:0,
              name:'A01'
            },
            {
              id:1,
              name:'A02'
            },
            {
              id:2,
              name:'A03'
            },{
              id:3,
              name:'A04'
            },{
              id:4,
              name:'A05'
            }
          ],
        },{
          partition:'B9',
          parking: [
            {
              id:0,
              name:'A01'
            },
            {
              id:1,
              name:'A02'
            },
            {
              id:2,
              name:'A03'
            },{
              id:3,
              name:'A04'
            },{
              id:4,
              name:'A05'
            }
          ],
        }],
        filts:[

        ],
        currentPage: 1,
        theListOf:true
      }
    },
    created(){
      this.initParkinfo();
    },
    mounted(){

    },
    methods:{
      //地图弹窗
      mapDialog(){
        this.mapVehicle=false
      },
      //下一层
      openDialog(){
        console.log('我是下一层')
      },
      //新增
      newPark(){
        console.log('我新增')
        this.newParking=true
      },
      //关闭新增按钮
      newParkingWhiteClick(item){
        console.log(item,'我关闭新增')
        this.loading=true;
        setTimeout(()=>{
          this.loading=false;
          this.newParking=false;
          this.$notify({
            title: '成功',
            message: '已经完成修改',
            duration:1000,
            type: 'success'
          });
        },500)
      },
      //初始化查询出来的占用数，空余数，超时停车，黑名单，违规停车，特殊车辆显示数据
      initParkinfo(){
        this.floorName="B1"; //改变楼层
        this.stateData=[
          {
            min:'0%',
            max:'20%',
            numberSize:84,
            back:'9ade31'
          },
          {
            min:'21%',
            max:'40%',
            numberSize:84,
            back:'fbdc44'
          },
          {
            min:'41%',
            max:'60%',
            numberSize:84,
            back:'f8aa2e'
          },
          {
            min:'61%',
            max:'80%',
            back:'ff8350'
          },
          {
            min:'81%',
            max:'100%',
            back:'fd435a'
          },
        ]
      },
      nextFloor(){
        this.theListOf =!this.theListOf;
        console.log(this.theListOf)
      },
      //查询
      vehiceQueryClick(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('查询',this.userQuery)
          } else {
            return false;
          }
        })
      },
      //删除
      backDelete(item){
        console.log(item)
        if(item){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style scoped lang="scss">
  .par-state{
    position: absolute;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: stretch;
    height: calc(100% - 120px);
    width: calc(100% - 226px);
    .state-one{
      order: 3;
      flex: 3 0 auto;
      width: 30%;
      background: #fff;
      margin-right: 4px;
      border-radius: 3px;
      display: flex;
      flex-direction: column;

        .state-query{
          display: flex;
          padding: 15px 15px 0px 15px;
          p{
            float: left;
            width: 100%;
            padding: 0px 0px 10px 0px;
            margin: 0px;
          }
        }
      .state-Using-from{
        display: flex;
        overflow-y: auto;
      }
      .scope-span{
        padding: 0px 4px;
        border-radius: 25px;
        float: left;
        width: 31%;
        display: inline-block;
        margin:0px 1% 4px 1%;
        background: #ebeff2;
      }
    }
    .state-tor{
      order: 7;
      border-radius: 3px;
      background: #fff;
      flex: 7 0 auto;
      width: 70%;
      text-align: center;
      position: relative;
      .map-bottm{
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .state-top{
        flex: 5 0 auto;
        align-items: center;
        display: flex;
        align-self: center;
        flex-direction: row;
        position: absolute;
        margin-right: 4%;
        z-index:1;
        box-shadow: 2px 2px 5px #ccc;
        .state-round{
          text-align: center;
          line-height: 80px;
          color: #fff;
          font-size: 36px;
          background: linear-gradient(180deg, #fdada2 0px, #ff999d 100%) center center / cover;
          border-radius: 50%;
          width: 80px;
          height: 80px;
          margin: 20px 30px;
        }
        .state-box{
          height: 9px;
          border-radius: 10px;
          width: 77px;
          margin: 0 auto;
          -webkit-box-shadow: 0px 10px 10px #ffc4c8;
          box-shadow: 0px 17px 19px #ffc4c8;
          position: relative;
          top: -15px;
        }
      }

      .map-button{
        position: absolute;
        top: 45%;
        right: 0px;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        -webkit-transform: translate(-58%, -36%);
        transform: translate(47%, -12%);
        color: #745fea;
        background: #ecf0f3;
        -webkit-transition: ease-in-out 0.4s;
        transition: ease-in-out 0.4s;
        padding: 0px;
        line-height: 23px;
        border:2px solid #fcfcfc;
        box-shadow: 0px 0px 5px #aeaeae;
        &:hover{
          background: #ecf0f3;
          box-shadow: 0px 0px 5px #ecf0f3;
        }
      }
    }
  }
  .map-img{
    img{
      width: 100%;
    }
  }
  .next-layer {
    position: absolute;
    top: 50%;
    right: 0px;
    height: 58px;
    width: 58px;
    border-radius: 50%;
    transform: translate(-58%, -36%);
    color: #745fea;
    background: #ded8fe;
    border: 1px solid #745fea;
    transition: ease-in-out 0.4s;
    &:hover {
      background: #745fea;
      color: #fff;
      box-shadow: 0px 0px 5px #745fea;
    }
  }
</style>
