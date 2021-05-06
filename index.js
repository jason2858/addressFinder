require('dotenv').config();     //載入.env環境檔

const fs = require('fs');
const fileContent = fs.readFileSync("./地址.tsv", "utf8");
const addresses = fileContent.split('\n');

const webdriver = require('selenium-webdriver')     // 加入虛擬網頁套件'

By = webdriver.By;
until = webdriver.until;

async function openCrawlerWeb(add) {

    if (add.charAt(8) == "里") {

        console.log(add);

        fs.appendFileSync("./new地址.tsv", `${add}\n`, "utf8");

    } else {

        // 建立這個browser的類型
        let driver = await new webdriver.Builder().forBrowser("chrome").build();
        const web = 'https://twzipcode.com/zipcode';  //填寫你想要前往的網站
        driver.get(web) //透國這個driver打開網頁

        try {

            const selectAddress = await driver.
                wait(until.elementLocated(By.xpath(`//*[@id="Search_C_T"]`)));   //找出填寫的元件

            selectAddress.sendKeys(add)

            const sendAddress = await driver.
                wait(until.elementLocated(By.xpath(`//*[@id="submit"]`)));

            sendAddress.click()

            await driver.sleep(1000);

            const newTable = await driver.
                wait(driver.findElements(By.className(`table`)));

            const tableEle = await newTable[1]
                .findElement(By.tagName(`tr`));

            const newAddress = await tableEle.findElements(By.tagName(`td`));
            const result = await newAddress[1].getText();

            result1 = result.substr(7);
            result2 = result1.slice(0, result1.length - 2);

            console.log(result2);

            fs.appendFileSync("./new地址.tsv", `${result2}\n`, "utf8");

        } catch (err) {
            console.log(`擷取地址失敗：${err}`)

            fs.appendFileSync("./new地址.tsv", `${err}\n`, "utf8");

        }

        await driver.sleep(1000);

        driver.quit();
        await sleep(500);
    }
}

function sleep(ms) {
    return new Promise(reslove => setTimeout(reslove, ms));
}

const findAddress = async function () {
    for (i = 52000; i < addresses.length; i++) {
        let address = await addresses[i];
        await openCrawlerWeb(address);          //打開爬蟲網頁
    }
}

findAddress();









