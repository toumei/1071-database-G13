# 1071-database-G13
# [寫 code & 上傳 github 注意事項](https://github.com/toumei/1071-database-G13/wiki/Advance-preparation)
* **有任何參考資料請放上來，這樣比較好協助了解程式碼和報告**
* **安裝擴充插件，以便於後續編程**
* **express用ES5語法，react用ES6語法，少用var(型態可變，值可變)改用let(型態不可變，值可變)、const(型態不可變，值不可變)**
---
### 日程：
* 2019年01月04日 (五) 繳交報告，請每組組長代表繳交至 iClass
* 2019年01月07日 (一) 口頭報告 (20:00~21:00 -- G13~G18，每組時間10分鐘，要準備 PPT，報告5分鐘，老師詢問5分鐘)
### 檔案：
a. PPT 檔，檔名 Gxx-題目.ppt

b. 所有程式碼壓縮成一個檔，
　* Gxx_source.zip，裡面要包含測試資料 Gxx.sql 可以匯入，
  * Gxx_setup.txt 說明原始檔如何安裝並且可以執行的方法，尤其是資料庫的設定。

c. Github repository URL, Github contribution圖片 及分工說明

d. 總結報告，請剪輯 PPT 重要圖片及文字說明如下

1. 題目
2. 組員及分工
3. 系統需求
4. ER model (根據3之系統需求產生)
5. Relational Model
6. Testing data (展示有多少筆)
7. 前端頁面，能針對後端資料庫資料做 CRUD
8. 自評完成度
---
### 重要資訊：
* **更新資訊後面請補上更新日期，之後不定期清理不必要資訊**
* **有Git忽略文件(.gitignore)，就不用擔心上傳到 node_modules**
* **package.json** 內的 code 改成 **"scripts": {"start": "nodemon ./bin/www"}**，
  > 下 **npm start** 指令後，ctrl+s後會自動重啟服務器
---
### port setting
* server http-port：http://localhost:5000
* server https-port：https://localhost:8000
* client http-port：http://localhost:5000
---
### 更新資訊：
* EJS 模組化(pages、partials)
* 新增sql指令：describe: 'DESCRIBE table'，取得column_name
* 登入後會將token記錄在本地端 Local Storage
* 使用http攔截器，攔截請求，若header無token，則setHeader(Local Storage的token資料)
* [react練習/測試檔](https://github.com/toumei/107-01-database-4B/tree/master/example-create-react-app-express) - 12/10
* ORM
* RESTful API
* ACL
* 前端CRUD、分析、匯入CSV、欄位選擇控制、編輯驗證
---

### WIKI：
* [簡介](https://github.com/toumei/1071-database-G13/wiki/Home)
* [VS code 快捷鍵 & 擴充插件](https://github.com/toumei/1071-database-G13/wiki/VS-code)
* [npm 擴充插件](https://github.com/toumei/1071-database-G13/wiki/npm-Extensions)
* [git指令](https://github.com/toumei/1071-database-G13/wiki/git-command)
* [SQL Table](https://github.com/toumei/1071-database-G13/wiki/SQL-Table)
* [API接口](https://github.com/toumei/1071-database-G13/wiki/API-%E6%8E%A5%E5%8F%A3)
* [參考資料](https://github.com/toumei/1071-database-G13/wiki/Reference)
---

### 已經做的部分：
* server
  * https server：https://localhost:port
  * 將 三層架構 調整為 Model–view–controller (MVC)
  * EJS 模組化(pages、partials)
  * Object Relational Mapping(ORM)框架：使用 sequelize orm 開發，不熟研究中
  * epilogue：架構具有 RESTful 風的 CRUD API server
  * 登入系統(id, pwd)：使用passport(驗證帳密)、bcrypt(加密密碼)、JWT(回傳token)、express-jwt(管理router的驗證token)
  * 帳戶權限系統：express-acl，[流程](https://segmentfault.com/a/1190000004627946)
    * 登入時判斷身份為 user、worker、admin、DB_admin，切換至不同的使用頁面。
![token機制](https://cdn-images-1.medium.com/max/1334/1*7T41R0dSLEzssIXPHpvimQ.png)

* client (react)
  * router 配置
  * MVC 配置
  * axios攔截器
  * server-client 傳輸資料加解密(aes-256-cbc)
  * CRUD 基本架構
  * 快速編輯模式
  * 資料庫分析
  * 將資料匯出成csv檔
  * 欄位選擇控制 (text、checkbox、select、textarea、date、datetime)
  * 編輯驗證 (主鍵、email、電話、身分證)

### 正在做的部分：
* sever
  
* client (express)

### 尚未做的部分：
* server

* client (express)
  * malfunction
  * processing

* client (react)
  * malfunction (express->react)
  * processing (express->react)
  * 編輯驗證 (外鍵)
---

### 預期做的部分：

* client (express)
  * 顯示那個用戶登入
  * 顯示更動的資料
  * 顯示哪個用戶填了報修單或維修單
  * 顯示CRUD的操作
 
* client (react)
  * https server (配合server)
  * ACL、RBAC (配合server)
  * 即時顯示新資訊 (學生填報修單通知工作人員，工作人員報修完畢通知學生)
  * 多國語言
  * bootstrap table 改成 remote 模式

### 前端可操作之Table：
* product (課本教材，以此為基礎修改，兼功能測試用)
* database CRUD
* malfunction
* processing
