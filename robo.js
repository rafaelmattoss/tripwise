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

    await pagina.waitForSelector("#order-detail-trip-date-outbound",  { timeout: 60000 })
    await pagina.waitForSelector("span.latam-typography--paragraph-medium",  { timeout: 60000 })


    const dadosVoo ={
      datavoo : await pagina.$eval("#order-detail-trip-date-outbound", element => element.innerText),
      numeroVoo : await pagina.$eval("span.latam-typography--paragraph-medium", element => element.innerText),

    }
    

   console.log(dadosVoo)
    


    await navegador.close()
}

scrap()


