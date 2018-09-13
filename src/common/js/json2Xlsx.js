const export_type_xlsx = {bookType: 'xlsx', bookSST: false, type: 'binary'};
const export_type_csv = {bookType: 'csv', bookSST: false, type: 'binary'};
const export_type_ods = {bookType: 'ods', bookSST: false, type: 'binary'};
const export_type_xlsb = {bookType: 'xlsb', bookSST: false, type: 'binary'};
const export_type_fods = {bookType: 'fods', bookSST: false, type: 'binary'};
const export_type_xls = {bookType: 'biff2', bookSST: false, type: 'binary'};  //xls无法显示中文

const export_type_default = export_type_xlsx;
const export_name_default = 'ExportTable';

export function json2Xlsx(vue, sheetHeaderTitleArray, sheetHeaderFieldArray, jsonData, xlsxName) {
  const sheetOption = {
    header: sheetHeaderFieldArray,
    skipHeader: true,
    origin: "A2"
  };
  downloadExl(vue, sheetHeaderTitleArray, jsonData, sheetOption, xlsxName);
};

function downloadExl(vue, sheetHeader, jsonData, sheetOption, export_name, export_type) {
  if (!export_name) export_name = export_name_default;
  if (!export_type) export_type = export_type_default;
  let ws = vue.XLSX.utils.json_to_sheet([], {header: sheetHeader});
  let wb = {SheetNames: [export_name], Sheets: sheetHeader, Props: {}};

  vue.XLSX.utils.sheet_add_json(ws, jsonData, sheetOption);
  wb.Sheets[export_name] = ws;

  vue.fileSaver.saveAs(
    new Blob(
      [s2ab(vue.XLSX.write(wb, export_type))],
      {type: 'application/octet-stream'}),
    export_name + '.' + (export_type.bookType == "biff2" ? 'xls' : export_type.bookType));
}

function s2ab(s) {
  if (typeof ArrayBuffer !== 'undefined') {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  } else {
    let buf = new Array(s.length);
    for (let i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
}
