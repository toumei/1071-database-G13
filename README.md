# 1071-database-G13

### 重要資訊：
* 2019年12月10日 (一) 第一次進度報告
* 2019年01月05日 (六) 繳交報告
* 2019年01月07日 (一) 口頭報告
* **有任何參考資料請放上來，這樣比較好協助了解程式碼和報告**
* **安裝擴充插件，以便於後續編程**
* 請更新server/config/database.js
* **package.json** 內的 code 改成 **"scripts": {"start": "nodemon ./bin/www"}**，
  > 下 **npm start** 指令後，ctrl+s後會自動重啟服務器
* server http-port：http://localhost:3000
* server https-port：https://localhost:8000
* client http-port：http://localhost:3001
---

### 更新資訊：
* EJS 模組化(pages、partials)
* 新增sql指令：describe: 'DESCRIBE table'，取得column_name
* 將list、add、edit改成通用模式
---

### WIKI：
* [簡介](https://github.com/toumei/1071-database-G13/wiki/Home)
* [VS code 快捷鍵 & 擴充插件](https://github.com/toumei/1071-database-G13/wiki/VS-code)
* [npm 擴充插件](https://github.com/toumei/1071-database-G13/wiki/npm-Extensions)
* [git指令](https://github.com/toumei/1071-database-G13/wiki/git-command)
* [SQL Table](https://github.com/toumei/1071-database-G13/wiki/SQL-Table)
* [參考資料](https://github.com/toumei/1071-database-G13/wiki/Reference)
---

### 已經做的部分：
* server
  * https server：https://localhost:port
  * 將 三層架構 調整為 Model–view–controller (MVC)
  * EJS 模組化(pages、partials)
  * 登入系統(email, pwd)：使用passport(驗證帳密)、bcrypt(加密密碼)、JWT(回傳token)
![token機制](https://cdn-images-1.medium.com/max/1334/1*7T41R0dSLEzssIXPHpvimQ.png)

* client (express)

* client (react)
  * router 規劃與設計

### 正在做的部分：
* sever
  * client端：Axios (具 promise 的js)，紀錄回傳token，若token失效則重新送login資訊
  * API安全(攔截用戶API請求，驗證token是否有效)：passport-jwt、express-jwt
  * 帳戶權限：ACL、RBAC
    * 登入時判斷身份為 一般使用者 、 工作人員 、 DB管理員，切換至不同的使用頁面。

* client (express)

* client (react)
  * db 介面操作

### 尚未做的部分：
* server

* client (express)
  * malfunction
  * processing

* client (react)
  * malfunction (express->react)
  * processing (express->react)
  * db CRUD
  * db 分析
---

### 預期做的部分：
* server
  * 在DB權限下，可用web操控後端table
  * 在admin權限下，可填寫報修單、維修單
  * 在user權限下，可填寫報修單
  * 在guest權限下，只能瀏覽index、login，不可進入此系統

* client (express)
  * 顯示那個用戶登入
  * 顯示更動的資料
  * 顯示哪個用戶填了報修單或維修單
  * 顯示CRUD的操作
 
* client (react)
  * MVC (能實現的話)
  * https server (配合server)
  * Axios (配合server)
  * ACL、RBAC (配合server)
  * 即時顯示新資訊 (學生填報修單通知工作人員，工作人員報修完畢通知學生)
  * 多國語言
  * 支援手機排版 (全部非部分)

### 前端可操作之Table：
* product (課本教材，以此為基礎修改，兼功能測試用)
* DB ctrl
* malfunction
* processing
* user
