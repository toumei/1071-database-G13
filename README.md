# 1071-database-G13
### 日程：
* 108.05.20(一) 期末報告驗收
1. 必須選一個 bootstrap template (以代號A表示)來實作前端應用
1. 上學期所做管理後臺資料之程式(以代號B表示)必須要跟上 A 結合，並可以由A切換B，由B切換A
1. 在A中必須要有頁面存取資料庫中的資料，在後端code中，A和B的code不能在同目錄內。A存取資料庫的動作，一律不准交php，老師上課時已經有提過。
1. 資料庫中的測試資料必須要匯出，以組號來命名，如 G01.sql, G02.sql ~ G13.sql。
1. 所有文件資料必須放在doc目錄中，doc下面分兩個目錄，client, admin，其中client 放A的資料，admin放B的資料。
1. B中資料要有上學期期末的所有說明資料，包含系統需求，ER model, Relational model, Gxx.sql (測試資料)，上學期報告的PPT檔，及其他相關資料。
1. A中要有本學期期末報告的PPT檔，及本學期會用到的 Relational model, Gxx.sql (測試資料)(可能和上學期的不同)
1. 如果是本學期才修資料庫的同學，B可以考試用的blogen來替代，如有新的實作B，會給加分。
1. 所有程式除了在E213你們自行選用的電腦外，還必須能安裝到老師上課的電腦上，老師必須統一整理並能帶走。請提早到E213安裝。
---
# [寫 code & 上傳 github 注意事項](https://github.com/toumei/1071-database-G13/wiki/Advance-preparation)
* **有任何參考資料請放上來，這樣比較好協助了解程式碼和報告**
* **安裝擴充插件，以便於後續編程**
---
### 公告：
* **更新資訊後面請補上更新日期，之後不定期清理不必要資訊**
* **express用ES5語法，react用ES6語法，少用var(型態可變，值可變)改用let(型態不可變，值可變)、const(型態不可變，值不可變)**
---
### 更新歷程：
* 新增 url 訪問日誌，依據日期分檔紀錄
* 新增 API 安全機制，新增參數(timestamp、nonce、sign)，防止API被他人竄改
* 新增 DB debug日誌
* 採取 https connections，並修復連線 error
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
  * morgan：將訪問日誌儲存在log檔
  * log4js：自訂日誌，用於debug
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
  * 將 API的接口(admin、client)調整完畢
  * 判斷IP、身分、cookie
  * API 加解密
  * 優化帳戶系統 (RBAC要調整的部分太多 先暫緩)
* client
  * 即時顯示新資訊 (學生填報修單通知工作人員，工作人員報修完畢通知學生)
  * 多國語言
  * 參考市面上免費模板
  * 將登入後介面分成客戶端跟管理端，並隨身分切換至不同頁面
  * 登入者可修改個人帳戶資料(如密碼)
  * 新增首頁
