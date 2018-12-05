# 1071-database-G13

### 重要資訊：
* 2019年12月10日 (一) 第一次進度報告
* 2019年01月05日 (六) 繳交報告
* 2019年01月07日 (一) 口頭報告
* **package.json** 內的 code 改成 **"scripts": {"start": "nodemon ./bin/www"}**，
  > 下 **npm start** 指令後，ctrl+s後會自動重啟服務器
---

### 更新資訊
* 修正controllers變更path而產生的錯誤
* EJS 模組化(pages、partials)
* 修正narbar的index path問題
* 新增head的fontawesome link

---

### 基本需求：
1. 基於web的DB操作
1. 資料需求
1. ER model
1. 關聯模式
1. demo測試資料
---

### 命名相關
* 學生宿舍網路維修管理系統，簡稱 **ResNetCMMS**
  * residence network (ResNet)
  * computerized maintenance management system (CMMS)

### **SQL Table**
1. apply 申報(故障交換器)
1. sweep 清掃(機櫃)
1. malfunction 故障(報修單)
1. processing 處理過程(維修單)
1. switch 交換器
1. cabinet 機櫃
1. vendor 廠商
1. user 用戶(學生)
1. employee 工作人員(學生)
---

### 使用的套件
* mysql2
* passport
* passport-local
* passport-jwt
* jsonwebtoken
* axios
---

### 目前所做的部分：
* https server：https://localhost:port
* 將 三層架構 調整為 Model–view–controller (MVC)
* EJS 模組化(pages、partials)
* 登入系統(email, pwd)：使用passport(驗證帳密)、bcrypt(加密密碼)、JWT(回傳token)
![token機制](https://cdn-images-1.medium.com/max/1334/1*7T41R0dSLEzssIXPHpvimQ.png)

### 前端可操作之Table：
* product (課本教材，以此為基礎修改，兼功能測試用)
* user

### 正在做的部分：
* client端：Axios (具 promise 的js)，紀錄回傳token，若token失效則重新送login資訊
* API安全(攔截用戶API請求，驗證token是否有效)：passport-jwt、express-jwt
* 帳戶權限：ACL、RBAC
  * 登入時判斷身份為 一般使用者 、 工作人員 、 DB管理員，切換至不同的使用頁面。

### 預期做的部分：
* 在DB權限下，可用web操控後端table
* 在admin權限下，可填寫報修單、維修單
* 在user權限下，可填寫報修單
* 在guest權限下，只能瀏覽index、login，不可進入此系統
