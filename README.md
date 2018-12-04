# 1071-database-G13

### 重要資訊：
* 2019年01月05日 (六) 繳交報告
* 2019年01月07日 (一) 口頭報告
* **package.json** 內的 code 改成 **"scripts": {"start": "nodemon ./bin/www"}**，下 **npm start** 指令後，ctrl+s後會自動重啟服務器
---

### 命名相關
#### 學生宿舍網路維修管理系統，大概就簡稱ResNetCMMS
* residence network (ResNet)
* computerized maintenance management system (CMMS)
---

### 使用的套件
* mysql2
* passport
* passport-local
* passport-jwt
* jsonwebtoken
---

### 目前所做的部分：
* https server：https://localhost:port
* 將 三層架構 調整為 Model–view–controller (MVC)
* 登入系統(email, pwd)：使用passport(驗證帳密)、bcrypt(加密密碼)、JWT(回傳token)
![token機制](https://cdn-images-1.medium.com/max/1334/1*7T41R0dSLEzssIXPHpvimQ.png)

### 前端可操作之Table：
* product (課本教材，以此為基礎修改，兼功能測試用)
* user

### 正在做的部分：
* client端：Axios (具 promise 的js)，紀錄回傳token，若token失效則重新送login資訊
* API安全(攔截用戶API請求，驗證token是否有效)：passport-jwt、express-jwt
* 帳戶權限：ACL、BRAC

### 預期做的部分：
* 在DB權限下，可用web操控後端table
* 在admin權限下，可填寫報修單、維修單
* 在user權限下，可填寫報修單
* 在guest權限下，只能瀏覽index、login，不可進入此系統
