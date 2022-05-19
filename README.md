## 製作WEB3網頁
教學來源: https://www.youtube.com/watch?v=7HoHkRz0Odc&ab_channel=%E8%80%81%E9%97%86%2C%E4%BE%86%E9%BB%9E%E5%AF%87%E6%B1%80%E5%90%A7%E3%80%82Boss%2CCODINGplease.
成品影片: https://drive.google.com/file/d/1PYOFa4WmfoT_Dc8joEFvNQkxhNDNJo9w/view?usp=sharing

### 建立一個React專案

### 取得ABI
智能合約初始化
1. 合約地址: ABI的網址
2. 合約ABI: 資料型別跟資料

取得JSON
1. 到 [Remix IDE](http://remix.ethereum.org/#optimize=true&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js)
2. 把Auto compile跟Enable optimization打勾，執行Compile1_Storage.sol
3. 點到COPY ABI

![](https://i.imgur.com/D2Lo24K.png)


### 到METAMASK創建錢包
用CONSOLE可輸入window.ethereum取得資訊

### 錢包連到本地的VSCODE
安裝remixed
npm install @remix-project/remixd
文件:https://remix-ide.readthedocs.io/en/latest/remixd.html

輸入 remixd -s $(echo $PWD) --remix-ide https://remix.ethereum.org ，會是在現在的資料夾底下開啟同步到https://remix.ethereum.org，一個共享storage的概念。
OR
輸入 remixd -s D:\GitHub\react_demo -u http://remix.ethereum.org 連到本地位置

### 先去把小狐狸進行測試充值
用測試的方式進行存錢
參考文件: https://bigbenthings.com/smart-contract-solidity-nft/


### 安裝hardhat
參考文件: https://medium.com/my-blockchain-development-daily-journey/%E5%AE%8C%E6%95%B4%E7%9A%84hardhat%E5%AF%A6%E8%B8%90%E6%95%99%E7%A8%8B-a9b005aa4c12
輸入 npm i hardhat
做區塊鏈開發的一個框架，可以快速編譯智能合約跟寫智能合約測試
有許多plugin可以使用

執行greet()會回傳一個String
進行編譯，勾Enable optimization就可以。
![](https://i.imgur.com/4CEa9k2.png)
進行部屬，選取Injected Web3，在Deploy，成功後會出現在左下角可以複製，按右邊的view on etherscan
![](https://i.imgur.com/YYBuT09.png)


### 智能合約
點選 Contract 的路徑
![](https://i.imgur.com/NuN0YGt.png)

先點到Contact內有 Verify and Publish點進去
![](https://i.imgur.com/mE5v0w9.png)

在第二個選項選 Solidity(Single file)，要對應到0.8.0跟Unlicense，點選continue。
![](https://i.imgur.com/syqEQLn.png)

到這個頁面在Optimization選yes，複製remix的Greeter.sol的內容放到Enter the Solidity Contract Code below *的輸入區內，點選Verify and Publish，如果不能放上去直接複製0xcdc6fc93d3910c0d1581fc129bd7658d2deac575。
![](https://i.imgur.com/RR975Po.png)

### 另一個取得智能合約的方式
1. 到hardhat-tutorial的資料夾下，輸入npx hardhat compile
2. 編譯完後，會在/contracts/artifacts/Greet.json
3. 可以找到abi的資訊，會有setGreeting()。
![](https://i.imgur.com/LuqD6MA.png)
4. 到remix
可以用setGreeting 把內容字取代掉
