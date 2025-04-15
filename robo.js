const pup = require('puppeteer');

  
async function scrap() {
    const navegador = await pup.launch({ headless: false }) // "hadless" estava errado

    const pagina = await navegador.newPage()

    await pagina.goto("https://www.latamairlines.com/br/pt/minhas-viagens")

    await pagina.click("#cookies-politics-button", { timeout: 3000 })

    await pagina.waitForSelector("#code--text-field",  { timeout: 60000 })
    await pagina.waitForSelector("#lastname--text-field",  { timeout: 60000 })


    await pagina.type("#code--text-field", "Qgvgji")
    await pagina.type("#lastname--text-field", "Da Silva")

    await Promise.all([ // "Promisse" estava errado
        pagina.waitForNavigation(),
        pagina.click("#submit-search-code-mobile")
    ])

    await pagina.waitForSelector("#order-detail-trip-date-outbound", { timeout: 60000 });
    await pagina.waitForSelector('[data-testid="order-detail-flight-number-outbound"] span', { timeout: 60000 });
    await pagina.waitForSelector('#order-detail-city-origin-outbound', { timeout: 60000 });
    await pagina.waitForSelector('#order-detail-flight-duration-outbound', { timeout: 60000 });
    await pagina.waitForSelector('[data-testid="order-detail-departure-time-outbound"] span', { timeout: 60000 });
    await pagina.waitForSelector('[data-testid="order-detail-arrival-time-outbound"] span', { timeout: 60000 });
    await pagina.waitForSelector('#order-detail-city-destination-outbound', { timeout: 60000 });

// 2. Captura o modelo do avião ANTES de montar o objeto
    const containerModelo = await pagina.$('[data-testid="order-detail-flight-number-outbound"]');
    const spans = await containerModelo.$$('span');
    const modeloAeronaveRaw = await pagina.evaluate(el => el.innerText, spans[1]);
    const modeloAeronave = modeloAeronaveRaw.replace(' - Avião ', '').trim();

// 3. Usa o valor diretamente no objeto
    const dadosVoo = {
      datavoo: await pagina.$eval("#order-detail-trip-date-outbound", el => el.innerText.trim()),
      numeroVoo: await pagina.$eval('[data-testid="order-detail-flight-number-outbound"] span', el => el.innerText.trim()),
      origem: await pagina.$eval("#order-detail-city-origin-outbound", el => el.innerText.trim()),
      duracaoVoo: await pagina.$eval("#order-detail-flight-duration-outbound", el => el.innerText.trim()),
      horaembarque: await pagina.$eval('[data-testid="order-detail-departure-time-outbound"] span', el => el.innerText.trim()),
      horaDesembarque: await pagina.$eval("[data-testid='order-detail-arrival-time-outbound'] span", el => el.innerText.trim()),
      destino: await pagina.$eval("#order-detail-city-destination-outbound", el => el.innerText.trim()),
      modeloAeronave // aqui você já coloca a variável que foi definida acima
    };

    

   console.log(dadosVoo)
    


    await navegador.close()
}

scrap()


