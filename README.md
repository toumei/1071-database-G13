# 1071-database-G13

### 目前所做的功能：

* https server
* MVC
* 登入系統(email, pwd)：passport、JWT、bcrypt(加密密碼)

### 前端可操作之Table：
* products (以此為基礎修改，兼功能測試用)
* user

### 正在做的功能：
* API安全(攔截用戶API請求，驗證token是否有效)：passport-jwt、express-jwt
* 帳戶權限：ACL、BRAC

### 預期做的功能：
* 在DB權限下，可用web操控後端table
* 在admin權限下，可填寫報修單、維修單
* 在user權限下，可填寫報修單
* 在guest權限下，只能瀏覽index、login，不可進入此系統
