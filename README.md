# 1071-database-G13
# [寫 code & 上傳 github 注意事項](https://github.com/toumei/1071-database-G13/wiki/Advance-preparation)
* **有任何參考資料請放上來，這樣比較好協助了解程式碼和報告**
* **安裝擴充插件，以便於後續編程**
---
### 日程：本學期結束，暫無行程。
### G13 為 報告文件(含安裝文件)
### G13_source 為程式碼及sql
### 備用連結：
 * [程式碼載點01](https://drive.google.com/file/d/1x9wwBtMrHf9wap1tYzPw2toBK_o5Oh3p/view?usp=sharing)
 * [程式碼載點02](https://drive.google.com/open?id=1TqUmDavop8C1p3INWbTHH24-u51YxSzi)

---
### 重要資訊：
* **更新資訊後面請補上更新日期，之後不定期清理不必要資訊**
* **有Git忽略文件(.gitignore)，就不用擔心上傳到 node_modules**
* **package.json** 內的 code 改成 **"scripts": {"start": "nodemon ./bin/www"}**，
  > 下 **npm start** 指令後，ctrl+s後會自動重啟服務器
* **express用ES5語法，react用ES6語法，少用var(型態可變，值可變)改用let(型態不可變，值可變)、const(型態不可變，值不可變)**
---
---
### 更新資訊：暫無更新。
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
* server (express)
  * http  server：https://localhost:5000
  * https server：https://localhost:8000
  
  * 將 三層架構 調整為 Model–view–controller (MVC)
  * sequelize： 使用 Object Relational Mapping(ORM) 框架開發
  * epilogue： 架構具有 RESTful 風的 CRUD API server
  * account system (id, pwd)： 使用passport(驗證帳密)、bcrypt(加密密碼)、JWT(回傳token)、express-jwt(管理router的驗證token)
  * 帳戶權限系統：express-acl，[流程](https://segmentfault.com/a/1190000004627946)
    * 登入時判斷身份為 user、worker、admin、DB_admin，切換至不同的使用頁面。

* client (react)
  * router 配置
  * MVC 架構
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
* client

### 尚未做的部分：
* server
* client

### 預期做的部分：
* server
* client
  * https server (配合server)
  * 即時顯示新資訊 (學生填報修單通知工作人員，工作人員報修完畢通知學生)
  * 多國語言
