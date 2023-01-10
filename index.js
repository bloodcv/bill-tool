var express = require("express");
var app = express();
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const xlsxs = require("node-xlsx");
const xlsx = require("xlsx");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // 上传文件使用缓存策略
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//  主页输出 "Hello World"
app.get("/", function (req, res) {
  console.log("主页 GET 请求");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.send({
    message: "hello",
  });
});

// 上传excel
app.route("/wxUploadFile").post(upload.any(), (req, res) => {
  console.log(req);
  if (!req.files || req.files.length === 0) {
    return res.json({ text: "请选择文件上传" });
  }

  const { originalname, buffer } = req.files[0];
  if (!originalname.endsWith("xls") && !originalname.endsWith("xlsx")) {
    return res.json({ text: "请上传xls或xlsx格式的文件" });
  }
  // 解析excel文件
  const workbook = xlsx.read(buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]]; // 选择第一个工作簿

  const result = xlsx.utils.sheet_to_json(sheet);
  const head = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
  result.forEach((c) => {
    for (const val of head) {
      c[val] = c[val] === undefined ? "" : c[val];
    }
  });
  return res.json(result);
});

// 上传excel
app.route("/zfbUploadFile").post(upload.any(), (req, res) => {
  console.log(req);
  if (!req.files || req.files.length === 0) {
    return res.json({ text: "请选择文件上传" });
  }

  const { originalname, buffer } = req.files[0];
  if (!originalname.endsWith("xls") && !originalname.endsWith("xlsx")) {
    return res.json({ text: "请上传xls或xlsx格式的文件" });
  }
  // 解析excel文件
  const workbook = xlsx.read(buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]]; // 选择第一个工作簿

  const result = xlsx.utils.sheet_to_json(sheet);
  const head = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
  result.forEach((c) => {
    for (const val of head) {
      c[val] = c[val] === undefined ? "" : c[val];
    }
  });
  return res.json(result);
});

// 下载excel
app.post("/getFile", (req, res) => {
  console.log(req);

  //   let reserve = await this.service.enterprise.getReserve({ enterprise: _id });//获取当前时间同样信息预定记录
  var data = [];
  var title = [
    "序号",
    "单位",
    "体检人姓名",
    "体检人工牌号",
    "预约日期",
    "联系方式",
  ];
  data.push(title);
  //再把每一行数据加进去
  /* for (let f = 0; f < reserve.length; f++) {
      let text = reserve[f];
      let arr = [];
      arr.push(f + 1);
      arr.push(text.enterDataName);
      arr.push(text.username);
      arr.push(text.badge);
      arr.push(text.reserveTime);
      arr.push(text.phone);
      data.push(arr);
  } */
  //由于各列数据长度不同，可以设置一下列宽
  const options = {
    sheetOptions: {
      "!cols": [
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
      ],
    },
  };
  // const options = {};
  //生成表格
  var buffer = xlsxs.build([{ name: "sheet1", data: data }], options);

  res.send({
   buffer,
   name: `${res.body.file.type}-${new Date().getTime()}`
  });
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
