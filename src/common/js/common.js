export function common() {

  const baseUrl = '/GOSSystem/';
  // const baseUrl = 'http://localhost:8080/static/html/jsontest/';

  const floorBase = [{ floor_name: '不限', floor_id: 0, area_list: [] }];
  const areaBase = [{ area_name: '不限', area_id: 0 }];

  return {
    url: {
      floorAreaList: baseUrl + 'getFloorAreaList',
      stopDailyLog: baseUrl + 'getStopDailyLog',
      carposRatioChart: baseUrl + 'getCarposRatioChart',
      lightManager: baseUrl + 'lightManager',
      lightDeviceList: baseUrl + 'lightDeviceList',
      environmentManager: baseUrl + 'environmentManager',
      environmentList: baseUrl + 'environmentList',
      getErrorLog: baseUrl + 'getErrorLog'
    },
    util: {
      floorAreaListAppendNull(list) {
        let resultList = floorBase.concat(list);
        for(let i in resultList) {
          let tempAreaList = areaBase.concat(resultList[i].area_list)
          resultList[i].area_list = tempAreaList;
        }
        return resultList;
      }
    },
    list: {
      carTypes: [
        {car_type_id: 0, car_type_name: '不限'},
        {car_type_id: 1, car_type_name: '正常'},
        {car_type_id: 2, car_type_name: '超时车'},
        {car_type_id: 3, car_type_name: '过夜车'},
        {car_type_id: 4, car_type_name: '违停车'}
      ],
      deviceTypes: [
        {dev_type_id: 0, dev_type_name: '全部'},
        {dev_type_id: 1, dev_type_name: '灯'},
        {dev_type_id: 2, dev_type_name: '照片摄像头'},
        {dev_type_id: 3, dev_type_name: 'wifi'},
        {dev_type_id: 4, dev_type_name: '蓝牙'},
        {dev_type_id: 5, dev_type_name: '2.4G'},
        {dev_type_id: 6, dev_type_name: '红绿灯'},
        {dev_type_id: 7, dev_type_name: '视频摄像头'},
        {dev_type_id: 8, dev_type_name: '引导屏'},
        {dev_type_id: 9, dev_type_name: '扩展坞'},
        {dev_type_id: 10, dev_type_name: '一氧化碳传感器'},
        {dev_type_id: 11, dev_type_name: '音响'}
      ],
      dates: [
        {text: '昨天', onClick: onClickOneDay},
        {text: '三天前', onClick: onClickThreeDay},
        {text: '一周前', onClick: onClickOneWeek},
        {text: '一个月前', onClick: onClickOneMonth},
        {text: '三个月前', onClick: onClickThreeMonth},
        {text: '半年前', onClick: onClickHalfYear},
        {text: '一年前', onClick: onClickOneYear}
      ],
      sheetHeaderTitles: [
        '停车类型',
        '进入车位时间',
        '驶出车位时间',
        '停放时长',
        '楼层',
        '车区',
        '车位',
        '车牌'
      ],
      sheetHeaderFields: [
        'car_type',
        'in_time',
        'out_time',
        'stop_time',
        'floor_name',
        'area_name',
        'carpos_name',
        'car_number'
      ],
      carposRatioSheetHeaderTitles: [
        '楼层',
        '区域',
        '入位车流',
        '出位车流',
        '车位数',
        '统计时间',
        '车位利用率'
      ],
      carposRatioSheetHeaderFields: [
        'floor_name',
        'area_name',
        'inCarpos',
        'outCarpos',
        'totalCarpos',
        'time',
        'value'
      ],
      auth: [
        { id: 0, label: '车辆状态图' },//1
        { id: 1, label: '车位利用率' },//2
        { id: 2, label: '黑白名单' },//4
        { id: 3, label: '停车日志' },//8
        { id: 4, label: '监控管理' },//16
        { id: 5, label: '照明系统' },//32
        { id: 6, label: '环境系统' },//64
        { id: 7, label: '引导屏管理' },//128
        { id: 8, label: '车位管理' },//256
        { id: 9, label: '寻车管理' },//512
        { id: 10, label: '故障日志' },//1024
        { id: 11, label: '系统管理', children: [//2048
          //以下对应smallRight，实际计算的时候，id要-1000
          { id: 1000, label: '通用设置' },
          { id: 1001, label: '部门信息管理' },
          { id: 1002, label: '角色管理与授权' },
          { id: 1003, label: '人员管理与授权' },
          { id: 1004, label: '敏感操作日志' },
          // { id: 1005, label: '车区管理' }
        ]}
      ]
    },
    config: {
      userId: '1',  //TODO
      pageItemSize: 10,
      smallPageItemSize: 5, //用于上下空间扁的表格
      tableExportName: '停车日志导出_',
      carposRatioTableExportName: '车位利用率导出_',
      tableDateFormat: 'yyyy-MM-dd hh:mm:ss', //用于数据传递或者比较
      tableExportDateFormat: 'yyyyMMddhhmmss',  //用于导出
      tableDisplayDateFormat: 'yyyy-MM-dd HH:mm', //用于html datepicker控件显示
      htmlDateFormat: 'yyyy-MM-dd HH:mm:SS',  //用于html datepicker控件数值
      coAverageMaxValue: 200
    }
  };
};

function onClickOneDay(picker) {
  const date = new Date();
  date.setTime(date.getTime() - 3600 * 1000 * 24);
  picker.$emit('pick', date);
}

function onClickThreeDay(picker) {
  const date = new Date();
  date.setTime(date.getTime() - 3600 * 1000 * 24 * 3);
  picker.$emit('pick', date);
}

function onClickOneWeek(picker) {
  const date = new Date();
  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
  picker.$emit('pick', date);
}

function onClickOneMonth(picker) {
  const date = new Date();
  date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
  picker.$emit('pick', date);
}

function onClickThreeMonth(picker) {
  const date = new Date();
  date.setTime(date.getTime() - 3600 * 1000 * 24 * 90);
  picker.$emit('pick', date);
}

function onClickHalfYear(picker) {
  const date = new Date();
  date.setTime(date.getTime() - 3600 * 1000 * 24 * 180);
  picker.$emit('pick', date);
}

function onClickOneYear(picker) {
  const date = new Date();
  date.setTime(date.getTime() - 3600 * 1000 * 24 * 365);
  picker.$emit('pick', date);
}
