function formatarData(dataStr) {
    if (!dataStr) return "";
    let data = new Date(dataStr + "T12:00:00"); // Força meio-dia para evitar problemas de fuso horário
    let dia = String(data.getDate()).padStart(2, "0");
    let mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro = 0, então +1
    let ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function irParaClientes(){
      let senha = '280419';
      let senhadigitada = $("#senhaparaseguir").val();

      if(senhadigitada === senha){
          sessionStorage.setItem("senhaDigitada", senhadigitada);
          window.location = "clientes.html";
      } else {
          alert("Senha incorreta");
      }

}

function formatarHora(horaStr) {
    if (!horaStr) return "";
    const [hora, minutos] = horaStr.split(":");
    return `${hora}h${minutos}`;
}

function sincronizarDatas(sourceSelector, targetSelector) {
    $(sourceSelector).on("change", function() {
      let sourceDate = $(this).val();
      let $target = $(targetSelector);
      $target.attr("min", sourceDate);
      if ($target.val() < sourceDate) {
        $target.val(sourceDate);
      }
    });
  }

  function capitalizarPalavras(str) {
  if (!str) return str;
  return str
    .split(/(\([^\)]*\))/g) // divide em blocos: fora e dentro dos parênteses
    .map(seg => {
      if (/^\([^\)]*\)$/.test(seg)) {
        return seg.toUpperCase(); // tudo dentro dos parênteses em caixa alta
      }
      // fora dos parênteses: só garante a primeira letra maiúscula
      return seg.replace(/\S+/g, word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      );
    })
    .join('');
}





  function formatarMoeda(input, hiddenInput) {
    let value = input.value.replace(/\D/g, ""); // Remove tudo que não for número
    if (value === "") value = "0"; // Evita erro ao apagar tudo

    let valorNumerico = parseInt(value) / 100; // Converte para centavos
    let valorFormatado = valorNumerico.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    input.value = valorFormatado; // Atualiza o input visível
    hiddenInput.value = valorNumerico; // Mantém o valor numérico puro no campo oculto

    atualizarTotal(); // Atualiza o total sempre que um input for alterado
}

function atualizarMalas() {
        let qtdmala10 = parseInt($("#qtdmala10").val()) || 0;
        let qtdmala23 = parseInt($("#qtdmala23").val()) || 0;

        // Atualiza mala de cabine
        if (qtdmala10 > 0) {
            $(".malacabine").text(qtdmala10 + " - Mala de cabine (10 kg)");
        } else {
            $(".malacabine").text("01 - Mala de cabine (10 kg)");
        }

        // Atualiza mala despachada
        if (qtdmala23 > 0) {
            $(".maladespachada").text(qtdmala23 + " - Mala despachada (23 kg)");
        } else {
            $(".maladespachada").text("00 - Mala despachada (23 kg)");
        }
    }

function atualizarTotal() {
    let valorHospedagem = parseFloat($("#valorhotel_real").val())    || 0;
    let valorVoo        = parseFloat($("#valorvoo_real").val())     || 0;
    let valorseguro     = parseFloat($("#valorseguro_real").val())  || 0; // CORRETO
    let valortransfer   = parseFloat($("#valortransfer_real").val())|| 0; // CORRETO


    let total = valorHospedagem + valorVoo + valorseguro + valortransfer;

    $("#atualtotal").text(
      total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    );


}


function Validacao(){
let servicoSelecionado = $("#servicos").val();

if (servicoSelecionado === "Aereo") {
    $("#destino-soaereo").show()
    let destinoaero = $("#aero-destino").val()
    $("#destino-soaereo").text(destinoaero);
    $("#valorhospedagem").hide();
    $("#valorhotel").hide()

     // Esconde a hospedagem
} else if(servicoSelecionado === "somente um trecho aereo"){
     $("#destino-soaereo").show()
    let destinoaero = $("#aero-destino").val()
    $("#destino-soaereo").text(destinoaero);
    $("#valorhospedagem").hide();
    $("#valorhotel").hide()

}else{
    let dias = $("#dias").val();
    let noites = $("#noites").val();
    let titulo = $("#titulo").val()
   $("#destinotit").text(`${titulo} (${dias} dias e ${noites} noites)`);
}

// Define os campos obrigatórios com uma propriedade 'tipo'
let camposObrigatorios = [
    {id:"titulo", nome: "Destino", tipo: "hotel"},
    {id:"hotel", nome:"Nome do Hotel", tipo: "hotel"},
    {id:"qtdadultos", nome: "Quantidade de Adultos", tipo: "hotel"},
    {id:"checkin", nome: "Data Checkin", tipo: "hotel"},
    {id:"checkout", nome: "Data Checkout", tipo: "hotel"},
    {id:"aeroporto", nome: "Aeroporto (ida)", tipo: "voo"},
    {id:"dataembarque", nome: "Data de Embarque (ida)", tipo: "voo"},
    {id:"horaembarque", nome: "Hora de Embarque (ida)", tipo: "voo"},
    {id:"classe", nome: "Classe (ida)", tipo: "voo"},
    {id:"aeroporto-desembarque", nome: "Aeroporto Desembarque (ida)", tipo: "voo"},
    {id:"datadesembarque", nome: "Data de Desembarque (ida)", tipo: "voo"},
    {id:"horadesembarque", nome: "Hora de Desembarque (ida)", tipo: "voo"},
    {id:"aeroporto-embarque-volta", nome: "Aeroporto de Embarque (Volta)", tipo: "voo"},
    {id:"dataembarque-volta", nome: "Data de Embarque (Volta)", tipo: "voo"},
    {id:"horaembarque-volta", nome: "Hora de Embarque (Volta)", tipo: "voo"},
    {id:"classe-volta", nome: "Classe (Volta)", tipo: "voo"},
    {id:"ciaaereavolta", nome: "Companhia Aérea (Volta)", tipo: "voo"},
    {id:"aeroporto-desembarque-volta", nome: "Aeroporto de Desembarque (Volta)", tipo: "voo"},
    {id:"datadesembarque-volta", nome: "Data de Desembarque (Volta)", tipo: "voo"},
    {id:"horadesembarque-volta", nome: "Hora de Desembarque (Volta)", tipo: "voo"},
    {id: "valorhotel", nome: "Valor Hospedagem", tipo: "hotel"},
    {id: "valorvoo", nome: "Valor Aereo", tipo: "voo"},
];

// Cria um array para armazenar os campos vazios
let camposVazios = [];

// Filtra os campos obrigatórios conforme a opção selecionada
// Se for apenas "Hospedagem", não valida os campos do tipo "voo"
// Se for apenas "Aereo", não valida os campos do tipo "hotel"
let camposParaVerificar = camposObrigatorios.filter(campo => {
    if (servicoSelecionado === "Hospedagem" && campo.tipo === "voo") {
        return false;
    } else if (servicoSelecionado === "Aereo" && campo.tipo === "hotel") {

        return false;
    }
    if (servicoSelecionado === "somente um trecho aereo") {
    $("#container, #botao-pdf").show();
    return;
}
    return;
    return true;
});

// Verifica os campos filtrados
camposParaVerificar.forEach(campo => {
    let valor = $("#" + campo.id).val().trim();
    if (!valor) {
        camposVazios.push(campo.nome);
        $("#" + campo.id).css("border", "2px solid red"); // Destaca o campo
    } else {
        $("#" + campo.id).css("border", ""); // Remove o destaque se preenchido
    }
});

// Se houver campos vazios, exibe alerta e interrompe a execução
if (camposVazios.length > 0) {
    alert("Preencha os seguintes campos obrigatórios:\n\n" + camposVazios.join("\n"));

    return;
} else{
    $("#container, #botao-pdf").show()
}


}



$("#organizer, #organizer1, #dados-conect, #dados-conect-volta, #orcar, #valoresfinais, #aereo-adulto, #aereo-bebe, #aereo-crianca, #conexao,#conexao-volta, #aviao-conect-volta, #aviao-conect,#botao-pdf, #inf-transfer, #inf-seguro, #proximo1, #proximocel1, #proximocel2, #proximocel,#proximocel3,#proximocel4, #camposenha, #aero-destino, #destino-soaereo ").hide();


$("#vizuorcar").click(()=>{
    $("#orcar").fadeToggle();
});


$("#vizudestin").click(()=>{
    $("#valoresfinais").hide();
    $("#organizer1").hide();
    $("#organizer").fadeToggle();
});

$("#vizuvoo, #proximo").click(()=>{
    $("#organizer").hide();
    $("#valoresfinais").hide();
    $("#organizer1").fadeToggle();
});

$("#vizuvalores, #proximo1").click(()=>{
    $("#organizer").hide();
    $("#organizer1").hide();
    $("#valoresfinais").fadeToggle();
});




$("#add-conection").click(()=>{
    $("#dados-conect").fadeToggle();

});

$("#add-conection-volta").click(()=>{
    $("#dados-conect-volta").fadeToggle();
});

$("#vizuclientes").click(()=>{
    $("#camposenha").toggle()
})

$("#avacar").click(irParaClientes)


// ⬇️ Aqui os eventos são adicionados apenas uma vez, fora da função atualizarTotal()
$(document).ready(function () {
    $("#valorhotel").on("input", function () {
        formatarMoeda(this, document.getElementById("valorhotel_real"));
    });

    $("#valorvoo").on("input", function () {
        formatarMoeda(this, document.getElementById("valorvoo_real"));
    });

    $("#valor-seguro").on("input", function () {
        formatarMoeda(this, document.getElementById("valorseguro_real"));
    });

    $("#valor-transfer").on("input", function () {
        formatarMoeda(this, document.getElementById("valortransfer_real"));
    });

    $("#servicos").change(function () {
        let servico = $(this).val();

        // Esconde tudo primeiro
        $("#servico-hospedagem, #servico-aereo, #voo, #info-hotel").hide();
        $("#valorhospedagem, #valorvoo").hide();
        $("#organizer, #organizer1").hide();
        $("#separar1, #separar3").hide();
        $("#aereo-adulto, #aereo-bebe, #aereo-crianca, #aero-destino").hide();


        if (servico === "Hospedagem") {
            $("#organizer, #servico-hospedagem, #info-hotel, #valorhospedagem").show();
            $("#voo-inf, #valortransfer, #valorseguro, #servico-transfer, #servico-seguro").hide();

        } else if (servico === "Aereo") {
            $("#servico-aereo, #voo, #organizer1, #aereo-adulto, #aereo-bebe, #aereo-crianca, #voo-inf, #valorvoo, #aero-destino").show();
            $("#hotel-inf, #valortransfer, #valorseguro, #servico-seguro, #servico-transfer ").hide();

        } else if (servico === "hospedagem e aereo") {
           $("#servico-hospedagem, #servico-aereo, #voo, #info-hotel, #voo-inf, #valorhospedagem, #organizer, #hotel-inf, #valorvoo").show();

           $("#servico-seguro, #servico-transfer, #valortransfer, #valorseguro").hide();


        } else if(servico === "somente um trecho aereo"){
            $("#servico-aereo, #voo, #organizer1, #aereo-adulto, #aereo-bebe, #aereo-crianca, #voo-inf, #valorvoo, #aero-destino").show();
            $("#hotel-inf, #valortransfer, #valorseguro, #servico-seguro, #servico-transfer, #voovolta, #datasvolta ").hide();

        }else if( servico === "hospedagem, aereo e transfer" ){

            $("#servico-hospedagem, #servico-aereo, #voo, #info-hotel, #voo-inf, #valorhospedagem, #organizer, #hotel-inf, #valorvoo, #inf-transfer, #valortransfer, #servico-transfer").show();

            $("#valorseguro, #servico-seguro").hide()

        }else if(servico === "hospedagem, aereo, transfer e seguro viagem" ){
            $("#inf-seguro, #voo-inf, #hotel-inf, #inf-transfer, #valorvoo, #valorseguro, #servico-seguro, #servico-transfer, #servico-aereo, #servico-hospedagem, #organizer, #valorhospedagem").show()
        }


    });


      sincronizarDatas("#checkin", "#checkout");
      sincronizarDatas("#dataembarque", "#datadesembarque");
      sincronizarDatas("#dataembarque-volta", "#datadesembarque-volta")
      sincronizarDatas("#datadesembarque-conect", "#data-conect")
      sincronizarDatas("#datadesembarque-conect-volta", "#data-aero-conexao-volta")




    $("#situacaoreserva").change(function(){
        let situacao = $(this).val();

        $("#atualreserva").text(situacao).css("color", situacao === "Reservas Finalizadas" ? "green" : "red");
     });


     $("input").on("input", function() {
        let textoFormatado = capitalizarPalavras($(this).val());
        $(this).val(textoFormatado);
      });



    $(".inputAeroporto").on("input", function () {
        const termo = $(this).val();
        const inputAtual = $(this);
        const selectRelacionado = inputAtual.next(".selectAeroporto");

        buscarAeroportos(termo, selectRelacionado);
    });


});




document.getElementById("botao-pdf").addEventListener("click", async function () {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");

  const elemento = document.getElementById("container");
  const originalCanvas = await html2canvas(elemento, { scale: 1.5 });

  // Dimensões do PDF em mm
  const pdfWidth = 210;
  const pdfHeight = 297;

  // Converte o canvas para imagem
  const imgData = originalCanvas.toDataURL("image/png");

  // Dimensões originais do canvas
  const canvasWidth = originalCanvas.width;
  const canvasHeight = originalCanvas.height;

  // Escala baseada na largura total
  let imgWidth = pdfWidth;
  let imgHeight = (canvasHeight * pdfWidth) / canvasWidth;

  // Se a altura calculada for maior que a página, reduz proporcionalmente
  if (imgHeight > pdfHeight) {
    imgHeight = pdfHeight;
    imgWidth = (canvasWidth * pdfHeight) / canvasHeight;
  }

  // Centraliza horizontalmente (se sobrar margem nas laterais)
  const x = (pdfWidth - imgWidth) / 2;
  // Centraliza verticalmente (se sobrar margem no topo/rodapé)
  const y = (pdfHeight - imgHeight) / 2;

  pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

  pdf.save("orcamento_viagem.pdf");
});





$("#alterar").click(() => {

    Validacao()
    $("#atual-regime").text("Regime: " +$("#modalidade-pensao").val())
    let nomehotel = $("#hotel").val();
    let qtdadultos = $("#qtdadultos").val();
    let qtdcriancas = $("#qtdcriancas").val();
    let drescriquarto =  $("#descriquarto").val();
    let checkin = $("#checkin").val();
    let checkout = $("#checkout").val();
    //dados voo ida
    let aeroembaqueida = $("#aeroporto").val();
    let dataembarqueida = $("#dataembarque").val();
    let horaembarqueida = $("#horaembarque").val();
    let ciaida = $("#ciaaereaida").val();
    let classeida = $("#classe").val();
    let aeroportodesembaqueida =  $("#aeroporto-desembarque").val();
    let horadesembarqueida = $("#horadesembarque").val();
    let datadesembarqueida = $("#datadesembarque").val();
    //dados voo volta
    let aeroembaquevolta = $("#aeroporto-embarque-volta").val();
    let dataembarquevolta = $("#dataembarque-volta").val();
    let horaembarquevolta = $("#horaembarque-volta").val();
    let ciavolta = $("#ciaaereavolta").val();
    let classevolta = $("#classe-volta").val();
    let aeroportodesembaquevolta =  $("#aeroporto-desembarque-volta").val();
    let horadesembarquevolta = $("#horadesembarque-volta").val();
    let datadesembarquevolta = $("#datadesembarque-volta").val();
    let numerobebes = $("#qtdbebes").val();
    //valores
    let valorhospedagem = $("#valorhotel").val();
    let valorvoo = $("#valorvoo").val();
    //dados conexão
    let aeroportoconectida = $("#aero-conect").val().trim();
    let dataconectida = $("#data-conect").val().trim();
    let horaconectida = $("#hora-conect").val().trim();
    let aeroportovolta = $("#aeroporto-conect-volta").val().trim();
    let datavolta = $("#data-aero-conexao-volta").val().trim();
    let horavolta = $("#hora-aero-conexao-volta").val().trim();
    let datadesembarqueConect =$("#datadesembarque-conect").val().trim();
    let horadesembarqueConect =$("#horadesembarque-conect").val().trim();
    let dataDesembarqueConectVolta = $("#datadesembarque-conect-volta").val();
    let horaDesembarqueConectVolta = $("#horadesembarque-conect-volta").val();
    //dados somente voo
    let numeroaeroadultos = $("#aereo-adulto").val().trim();
    let numeroaerobebes = $("#aereo-bebe").val().trim();
    let numeroaerocrianca = $("#aereo-crianca").val().trim();
    let valortransfer = $("#valor-transfer").val()
    let valorseguro = $("#valor-seguro").val()









    let hotel = $("#nomehotel");
    let atualdescri = $("#atualdescri")
    let atualcheckin = $("#atualcheckin")
    let atualcheckout = $("#atualcheckout")
    let atualaeroporto = $("#embarque-aero-ida")
    let atualdataida = $("#data-aero-ida")
    let atualclasse = $("#atualclasse")
    let atualcia = $("#atual-cia")
    let atualaeroportodesembarque = $("#desembarque-aero-ida")
    let atualdatadesembarque = $("#data-desembarque-aero-ida")
    let atualaeroportoembarquevolta = $("#atual-aeroporto-embarque-volta")
    let atualhoraembarquevolta= $("#atual-hora-embarque-volta")
    let atualdataembarquevolta = $("#atual-data-embarque-volta")
    let atualaeroportodesembarquevolta = $("#atual-aeroporto-desembarque-volta")
    let atualdatadesembarquevolta = $("#atual-data-desembarque-volta")
    let atualciavolta = $("#atual-cia-volta")
    let atualclassevolta = $("#atual-classe-volta")
    let atualvalorhospedagem = $("#atualvalorhospedagem")
    let atualvalorvoo = $("#atualvalorvoo")
    let atualseguro = $("#atualvalorseguro")
    let atualtransfer = $("#atualvalortransfer")



    hotel.text("Hotel " + nomehotel);
    atualdescri.text(drescriquarto)
    atualaeroporto.text(aeroembaqueida)
    atualclasse.text("Classe: " + classeida)
    atualcia.text(ciaida)
    atualaeroportodesembarque.text(aeroportodesembaqueida)
    atualaeroportoembarquevolta.text(aeroembaquevolta)
    atualhoraembarquevolta.text((horaembarquevolta))
    atualaeroportodesembarquevolta.text(aeroportodesembaquevolta)
    atualciavolta.text(ciavolta)
    atualclassevolta.text("Classe: " + classevolta)
    atualvalorhospedagem.text(valorhospedagem)
    atualvalorvoo.text(valorvoo)
    atualtransfer.text(valortransfer)
    atualseguro.text(valorseguro)
    atualdataida.text("Embarque: " + formatarData(dataembarqueida) + " - " + formatarHora(horaembarqueida));
    atualdatadesembarque.text("Desembarque: " + formatarData(datadesembarqueida) + " - " + formatarHora(horadesembarqueida))

    //altera conexão volta
    $("#data-desembarque-conect-volta").text("Desembarque: " + formatarData(dataDesembarqueConectVolta) + " - " + formatarHora(horaDesembarqueConectVolta));
    $("#data-conexao-volta").text("Embarque: "+formatarData(datavolta)+" - "+ formatarHora(horavolta));

    //altera embarque volta
    atualdataembarquevolta.text("Embarque: " + formatarData(dataembarquevolta)+ " - "+ formatarHora(horaembarquevolta))
    atualdatadesembarquevolta.text("Desembarque: " + formatarData(datadesembarquevolta) + " - "+ formatarHora(horadesembarquevolta))

    atualizarMalas()



    if (aeroportoconectida && dataconectida && horaconectida) {
        $("#aviao-conect").show()
        $("#conexao").show(); // Mostra a div se pelo menos um campo estiver preenchido
        $("#aeroporto-conect").text(aeroportoconectida);

        if ($("#data-conect").val() && horaconectida) {
            let dataFormatada = formatarData($("#data-conect").val());
            let horaFormatada = formatarHora(horaconectida);
            $("#data-aero-conexao-ida").text(`Embarque: ${dataFormatada} - ${horaFormatada}`);
        }


    }



    if (aeroportovolta && datavolta && horavolta) {
        $("#aviao-conect-volta").show()
        $("#conexao-volta").show(); // Mostra a div se pelo menos um campo estiver preenchido
        $("#aero-conect-volta").text(aeroportovolta);


    }


    if (horadesembarqueConect) {
        const horaFormatada = formatarHora(horadesembarqueConect);
        if (datadesembarqueConect) {
            const dataFormatada = formatarData(datadesembarqueConect);
            $("#data-chegada-conect").text(`Desembarque: ${dataFormatada} - ${horaFormatada}`);
        }
    }






    if(qtdadultos > 0){
        $(".adultos").text(    qtdadultos + " Adultos")
    }else if (numeroaeroadultos>0){
        $(".adultos").text(numeroaeroadultos + " Adultos")
    }


    if (numerobebes && numerobebes > 0) {
        $(".atualqtdbebes").text(numerobebes + " Bebes");
        $(".bebeshotel").text("Bebes: " + numerobebes).show();
    } else if (numeroaerobebes && numeroaerobebes > 0) {
        $(".atualqtdbebes").text(numeroaerobebes + " Bebes").show();
        $(".bebeshotel").hide();
    } else {
        $(".bebeshotel").hide();
        $(".atualqtdbebes").hide();
    }


    if (qtdcriancas > 0) {
        $(".atualqtdcriancas").text(qtdcriancas + " Crianças").show();
        $(".atualqtdcriancass").text("Crianças: " + qtdcriancas).show();
    } else if (numeroaerocrianca > 0) {
        $(".atualqtdcriancas").text(numeroaerocrianca + " Crianças").show();
        $(".atualqtdcriancass").text(numeroaerocrianca).show();
    } else {
        $(".atualqtdcriancas").hide();
        $(".atualqtdcriancass").hide();
    }



    if (checkin) {
        atualcheckin.text(formatarData(checkin));
    }

    if (checkout) {
        atualcheckout.text(formatarData(checkout));
    }





});


const mediaQuery = window.matchMedia("(max-width: 780px)");

function setupMobileView() {
  // Esconder todos os blocos no início
  $("#dadopassageiros, #dadoshospedagem, #proximo1, #proximo").hide();


  $("#vizudestin").click(()=>{
    $("#destino, #proximocel ").show()
    $("#proximocel1, #proximocel2, #proximocel3, #proximocel4, #proximo").hide()
 })

  // Primeiro botão
  $("#proximocel").off("click").on("click", () => {
    toggleSections({
      show: ["#dadopassageiros", "#proximocel1"],
      hide: ["#destino", "#proximocel", "#proximo"]
    });
  });

  // Segundo botão
  $("#proximocel1").off("click").on("click", () => {
    toggleSections({
      show: ["#dadoshospedagem", "#proximocel2"],
      hide: ["#destino", "#proximocel1", "#dadopassageiros"]
    });
  });

  // Terceiro botão (voo de ida)
 $("#proximocel2").off("click").on("click", () => {
    toggleSections({
        show: ["#organizer1", "#info-voo-ida", "#proximocel3"],
        hide: ["#destino", "#proximocel2", "#dadopassageiros", "#dadoshospedagem", "#proximocel"]
    });
});

$("#proximocel3").off("click").on("click", () => {
    toggleSections({
        show: ["#valoresfinais", "#proximocel4"],
        hide: ["#destino", "#proximocel3", "#dadopassageiros", "#dadoshospedagem", "#info-voo-ida, #organizer1", "#proximocel"]
    });
});

}


function toggleSections({ show = [], hide = [] }) {
  show.forEach(selector => $(selector).show());
  hide.forEach(selector => $(selector).hide());
}

function executarFuncionalidade(e) {
  if (e.matches) {
    setupMobileView();
  }
}

// Executa no carregamento
executarFuncionalidade(mediaQuery);

// Escuta mudanças no tamanho da tela
mediaQuery.addEventListener("change", executarFuncionalidade);



