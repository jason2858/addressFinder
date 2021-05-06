# addressFinder
## Working Environment
* [Node.js v13.14.0](https://nodejs.org/en/download/)

## API
[request](https://www.npmjs.com/package/request) 
[cheerio](https://www.npmjs.com/package/cheerio) 
[chromedriver] 使用頁面本身功能去爬蟲

## How to run 
### Install dependencies and run
```
npm install
node index.js 
```

## 說明

爬蟲時，chromdriver開啟網頁，並將資料輸入指定位置，onclick輸入，
網頁會自己進行原本的功能，避免有時網頁有隱藏的Header或302多次跳轉無法抓取正確POST/GET內容。
