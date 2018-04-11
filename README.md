# vtsx

        創建一個支持Typescript語言和JSX語法的Vue.js應用程序 版本號: 1.0.0
                vtsx name [--less|--sass]
        其中: 
                name   表示應用程序名稱，其由字母和數字組成且首字符必須是字母
                --less 支持less樣式編譯器模式即默認選項
                --sass 支持sass樣式編譯器模式
        
        使用步驟:
        第一步: 全局安裝vtsx命令
                npm install -g vtsx
        第二步: 創建應用程序並進入其目錄
                mkdir test ## test是應用程序名稱 若目錄已存在則忽略
                cd test
        第三步: 創建應用程序源代碼
                vtsx test --less ## test是應用程序名稱 原則上同上述目錄名
        第四步: 安裝依賴並運行開發模式
                npm install
                npm run dev ## 打開 http://127.0.0.1:8000/ 
        第五步: 生成源代碼並打包至dist目錄
                npm run build
        特別說明: 由於在Windows環境下安裝node-sass較為繁瑣，故
                vtsx test --sass
        推薦在如Mac、Ubuntu、FreeBSD等類Unix環境下使用
