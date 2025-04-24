const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');


async function login() {
  // Inicia o navegador em modo não headless para fazer o login manualmente.
  const navegador = await puppeteer.launch({ 
    headless: false, 
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const pagina = await navegador.newPage();

  
  await pagina.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
  );

  await pagina.goto("https://www.latamairlines.com/br/pt/minhas-viagens", { waitUntil: 'networkidle2' });
  console.log("Fui até a página de login");

 
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  try {
    await pagina.waitForSelector("#cookies-politics-button", { timeout: 60000 });
    await pagina.click("#cookies-politics-button", { timeout: 3000 });
    console.log("Cookie banner clicado");
  } catch (error) {
    console.log("Cookie banner não encontrado ou já fechado.");
  }

 

  // Aguarda os campos de login e preenche os dados
  await pagina.waitForSelector("#code--text-field", { timeout: 60000 });
  await pagina.waitForSelector("#lastname--text-field", { timeout: 60000 });

  await delay(2000)
  
try{
  await pagina.type("#code--text-field", "Qgvgji", { delay: 100 });
  await pagina.type("#lastname--text-field", "Da Silva", { delay: 100 });

  // Clica no botão de login e espera a navegação.
  await Promise.all([
    pagina.waitForNavigation({ waitUntil: 'networkidle2' }),
    pagina.click("#submit-search-code-mobile")
  ]);
  console.log("Loguei com sucesso");

}catch{
  console.log("erro ao consultar a reserva")
  navegador.close()
}



  try{
    await pagina.waitForSelector("#order-detail-trip-date-outbound", { timeout: 30000 });
    await pagina.waitForSelector('[data-testid="order-detail-flight-number-outbound"] span', { timeout: 30000 });
    await pagina.waitForSelector('#order-detail-city-origin-outbound', { timeout: 30000 });
    await pagina.waitForSelector('#order-detail-flight-duration-outbound', { timeout: 30000 });
    await pagina.waitForSelector('[data-testid="order-detail-departure-time-outbound"] span', { timeout: 30000 });
    await pagina.waitForSelector('[data-testid="order-detail-arrival-time-outbound"] span', { timeout: 30000 });
    await pagina.waitForSelector('[data-testid="order-detail-city-destination-outbound"]', { timeout: 30000 });
    await pagina.waitForSelector('[data-testid="order-detail-iata-origin-outbound"]', { timeout: 30000 });

    
    // Captura o modelo do avião
    const containerModelo = await pagina.$('[data-testid="order-detail-flight-number-outbound"]');
    const spans = await containerModelo.$$('span');
    const modeloAeronaveRaw = await pagina.evaluate(el => el.innerText, spans[1]);
    const modeloAeronave = modeloAeronaveRaw.replace(' - Avião ', '').trim();

    // Monta o objeto com os dados extraídos
    const dadosVoo = {
      datavoo: await pagina.$eval("#order-detail-trip-date-outbound", el => el.innerText.trim()),
      numeroVoo: await pagina.$eval('[data-testid="order-detail-flight-number-outbound"] span', el => el.innerText.trim()),
      origem: await pagina.$eval("#order-detail-city-origin-outbound", el => el.innerText.trim()),
      duracaoVoo: await pagina.$eval("#order-detail-flight-duration-outbound", el => el.innerText.trim()),
      aeroportoEmbarque: await pagina.$eval('[data-testid="order-detail-iata-origin-outbound"]', el => el.innerText.trim()),
      horaembarque: await pagina.$eval('[data-testid="order-detail-departure-time-outbound"] span', el => el.innerText.trim()),
      horaDesembarque: await pagina.$eval("[data-testid='order-detail-arrival-time-outbound'] span", el => el.innerText.trim()),
      destino: await pagina.$eval("#order-detail-city-destination-outbound", el => el.innerText.trim()),
      

      modeloAeronave
    };
    

    console.log("Dados do voo:", dadosVoo);
    await navegador.close();// Fecha a página

  }catch{
    console.log("erro ao buscar passagens")
    navegador.close()
  }
  
  navegador.close()
  
}

login()


async function azul() {
  // Inicia o navegador em modo não headless para fazer o login manualmente.
  const navegador = await puppeteer.launch({ 
    headless: false, 
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const pagina = await navegador.newPage();

  
  await pagina.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
  );

  await pagina.goto("https://www.voeazul.com.br/br/pt/home/reservas.html", { waitUntil: 'networkidle2' });
  console.log("Fui até a página azul");

  try {
    await pagina.waitForSelector("#onetrust-accept-btn-handler", { timeout: 60000 });
    await pagina.click("#onetrust-accept-btn-handler", { timeout: 3000 });
    console.log("Cookie banner clicado");
  } catch (error) {
    console.log("Cookie banner não encontrado ou já fechado.");
  }
  

 
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));



 

  // Aguarda os campos de login e preenche os dados
  await pagina.waitForSelector("#recordLocator", { timeout: 60000 });
  await pagina.waitForSelector("#origin-id", { timeout: 60000 });

  await delay(2000)
  
try{
  await pagina.type("#recordLocator", "xmwryg", { delay: 100 });
  await pagina.type("#origin-id", "vcp", { delay: 100 });

  await pagina.waitForSelector('[role="listbox"] li', { visible: true });

  // Clica na primeira sugestão da lista
  await pagina.click('[role="listbox"] li:first-child');

  // Clica no botão de login e espera a navegação.
  await Promise.all([
    pagina.waitForNavigation({ waitUntil: 'networkidle2' }),
    pagina.click('button[data-testid="search-box-hotel-date-picker-primary-button"]')
  ]);
  console.log("Loguei com sucesso");

}catch{
  console.log("erro ao consultar a reserva")
  navegador.close()
}


  
  navegador.close()
  
}



