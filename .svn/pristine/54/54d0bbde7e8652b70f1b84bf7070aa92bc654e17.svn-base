<template>
  <div class="line-chart" v-model="charResize" ref="myEchart"></div>
</template>

<script>
  import store from '../../../store/index'

  export default {
    name: "line-chart",
    props: {
      dataArray: Array,
      xField: String|Number,
      yField: String|Number,
      xName: String,
      yName: String,
      xFormatter: String|Function,
      yFormatter: String|Function,
      valueMax: String|Number
    },
    watch: {
      dataArray: function (val) {
        this.chartOption.dataset.source = val;
        this.updateChart();
      }
    },
    data() {
      return {
        chart: null,
        chartTrue: false,
        chartOption: {
          // backgroundColor: "#2c343c",
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#8c7cde',
                formatter: (params) => {
                  let formatterStr = (params.seriesData.length? 'xFormatter' : 'yFormatter');
                  if(typeof(this[formatterStr]) === 'undefined') return Math.floor(params.value * 100) / 100;  //无formatter就原封不动返回value

                  let formatter = this[formatterStr];
                  if(typeof(formatter) === 'string') {
                    formatter = formatter.replace('{value}', Math.floor(params.value * 100) / 100);
                    return formatter;
                  } else if(typeof(formatter) === 'function') {
                    return formatter(params.value, params.seriesData[0].dataIndex);
                  }
                }
              }
            },
            formatter: (params) => {
              let yValue = params[0].value[this.yField];
              if(typeof(this.yFormatter) !== 'undefined') {
                let yformatter = this.yFormatter;
                if(typeof(yformatter) === 'string') {
                  yValue = yformatter.replace('{value}', Math.floor(yValue * 100) / 100);
                } else if(typeof(yformatter) === 'function') {
                  yValue = yformatter(yValue, params[0].dataIndex);
                }
              }
              return params[0].marker + params[0].axisValueLabel + ': ' + yValue;
            }
          },
          dataset: {
            source: this.dataArray
          },
          xAxis: {
            name: this.xName,
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              formatter: this.xFormatter,
              color: '#666',
              fontSize: 12
            },
            //data: ['11:11', '11:12', '11:13', '11:14', '11:15', '11:16', '11:17','11:18','11:17','11:18','11:19','11:20','11:21','11:22']
          },
          yAxis: {
            name: this.yName,
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            },
            nameTextStyle: {
              color: '#666',
              fontSize: 12
            },
            min: 0,
            max: this.valueMax,
            axisLabel: {
              formatter: this.yFormatter,
              color: '#666',
              fontSize: 12
            }
          },
          series: [{
            //data: [30, 40, 50, 40, 45, 60, 70,82,83,92,94,95,100],
            encode: {
              x: this.xField,
              y: this.yField
            },
            type: 'line',
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1, [{
                    offset: 0,
                    color: '#c6b9ff'
                  },
                    {
                      offset: 1,
                      color: '#e4dffd'
                    }
                  ]
                )
              }
            },
            // itemStyle: {
            //   opacity: 0.2
            // },
            lineStyle: {
              normal: {
                // color: 'e4dffd'
                color: 'transparent'
              }
            },
            emphasis: {
              itemStyle: {
                color: '#c6b9ff',
                // borderColor: '#fff',
                // borderWidth: 11,
                // borderType: 'solid',
                // opacity: 1
              },
            }
          }]
        }
      }
    },
    mounted() {
      this.initChart();
    },
    computed: {
      charResize() {
        if (this.chartTrue) {
          this.chart.resize();
        }
        return store.state.vuexWidth
      }
    },
    methods: {
      //表格加载
      initChart() {
        this.chart = this.$echarts.init(this.$refs.myEchart);
        // 把配置和数据放这里
        this.chart.setOption(this.chartOption);
        this.chartTrue = true
      },
      updateChart() {
        // console.log('更新 line chart: ');
        this.chart.setOption({ dataset: { source: this.dataArray } });
      }
    }
  }
</script>

<style scoped lang="scss">
  .line-chart {
    position: absolute;
    height: 100%;
    width: 100%;
  }
</style>
