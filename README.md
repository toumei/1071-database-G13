# 1071-database-G13

### 重要資訊：
* 2019年01月05日 (六) 繳交報告
* 2019年01月07日 (一) 口頭報告
* "scripts": {"start": "nodemon ./bin/www"} 可用 npm start 自動重啟服務器


### 檔案移動：
* Express\dbdemo_product.sql -> sql\dbdemo_product.sql

### 可刪除的檔案：
* Express\views\productsSearch.ejs -> 用products.ejs代替

### 目前所做的功能：
* https server
* 將 三層架構 調整為 MVC
* 登入系統(email, pwd)：passport、JWT、bcrypt(加密密碼)

### 前端可操作之Table：
* product (課本教材，以此為基礎修改，兼功能測試用)
* user

### 正在做的功能：
* client端：Axios (具 promise 的js)，紀錄回傳token，若token失效則重新送login資訊
* API安全(攔截用戶API請求，驗證token是否有效)：passport-jwt、express-jwt
* 帳戶權限：ACL、BRAC

### 預期做的功能：
* 在DB權限下，可用web操控後端table
* 在admin權限下，可填寫報修單、維修單
* 在user權限下，可填寫報修單
* 在guest權限下，只能瀏覽index、login，不可進入此系統
