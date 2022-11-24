const puppeteer = require('puppeteer');

console.log("Iniciando bot...");

robo();

async function robo() {
    var verdade = true;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1800 })
    await page.goto("https://panel.placemarket.com.br/");
    await page.waitForTimeout(8000);
    await page.click('[type="email"]');
    await page.keyboard.type(email)
    await page.click('[type="password"]');
    await page.keyboard.type(senha);
    await page.click('[type="submit"]');
    await page.waitForTimeout(8000);
    console.log("\nLogin realizado com Sucesso!\n");
    while(verdade){
    var numero = 1; 
    await page.goto("https://panel.placemarket.com.br/#/ecommerce/oneeg/products");
    await page.screenshot({path: 'buddy-screenshot.png'});
    await page.waitForSelector('select.form-select');
    await page.select('select.form-select', "waiting");
    await page.click('[type="submit"]');
    await page.waitForTimeout(9999);
    const resultado1 = await page.evaluate(() => {
      return document.querySelector('span.badge.badge--default').textContent;
    });
     console.log(resultado1);
    console.log("\nIniciando Sincronização\n");
    await page.screenshot({path: 'buddy-screenshot.png'});
    await page.waitForTimeout(9999);
    const paginas = await page.$$('a.c-pagination__item');
    await paginas[4].click();
    await page.waitForTimeout(9999);
    //await page.screenshot({path: 'buddy-screenshot.png'});
    const produtos = await page.$$('button.btn');
    for(let i = 10; i<25; i++){
    await produtos[i].click();
    await page.waitForTimeout(500);
     const resultado = await page.evaluate((numero) => {
      return document.querySelector('#app > div > div > div > div > main > div:nth-child(2) > div > div.l-row.vertical-flex > div:nth-child(' + numero +') > section > header > div:nth-child(1) > h2 > div').textContent;
    }, numero++);
     console.log(resultado);
  }
    console.log("\nCarregar Próxima Página...\n");
    await page.waitForTimeout(500);
    }
 }

