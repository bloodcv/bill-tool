import React from "react";
import axios from "axios";
import { DownloadOutlined, InboxOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import "antd/dist/reset.css";
import "./App.css";

const App = () => {
  const { Dragger } = Upload;
  const [messageApi] = message.useMessage();

  const downFile = (file, type) => {
    axios({
      method: "post",
      url: "/api/getFile",
      responseType: "blob",
      data: {
        file: {
          content: file.response,
          name: file.name,
          type,
        },
      },
    })
      .then((res) => {
        const { buffer, name } = res.data
        const url = URL.createObjectURL(buffer);
        const aTag = document.createElement("a");
        aTag.setAttribute("download", `${name}.xlsx`);
        aTag.href = url;
        aTag.click();
      })
      .catch(function (error) {
        console.log(error);
        messageApi.open({
          type: 'error',
          content: '下载出错请看控制台',
        });
      })
  }
  const wxProps = {
    name: "file",
    multiple: true,
    action: "/api/wxUploadFile",
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: <DownloadOutlined />,
    },
    onDownload: (file) => {
      console.log(file);
      downFile(file, '支付宝')
    },
  };
  const zfbProps = {
    name: "file",
    multiple: true,
    action: "/api/zfbUploadFile",
    /* onChange(info) {
      if (info.file.percent === 100 && info.file.status === "done") {
        console.log("----");
        console.log(info);
      }
    }, */
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: <DownloadOutlined />,
    },
    onDownload: (file) => {
      console.log(file);
      downFile(file, '支付宝')
    },
  };

  return (
    <div className="App">
      <div className="dragWrap">
        <div className="itemWrap leftWrap">
          <Dragger {...wxProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">(微信)点击或者拖拽上传</p>
          </Dragger>
        </div>
        <div className="itemWrap rightWrap">
          <Dragger {...zfbProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">(支付宝)点击或者拖拽上传</p>
          </Dragger>
        </div>
      </div>
    </div>
  );
};

export default App;
