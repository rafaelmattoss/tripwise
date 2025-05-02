function formatarData(dataStr) {
    if (!dataStr) return "";
    let data = new Date(dataStr + "T12:00:00"); // Força meio-dia para evitar problemas de fuso horário
    let dia = String(data.getDate()).padStart(2, "0");
    let mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro = 0, então +1
    let ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
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
    return str
      .split(' ')
      .map(palavra => {
        if (palavra.startsWith('(') && palavra.endsWith(')')) {
          return palavra.toUpperCase(); // Mantém siglas dentro de parênteses 100% maiúsculas
        } else {
          return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
        }
      })
      .join(' ');
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

function atualizarTotal() {
    let valorHospedagem = parseFloat($("#valorhotel_real").val()) || 0;
    let valorVoo = parseFloat($("#valorvoo_real").val()) || 0;
    let total = valorHospedagem + valorVoo;

    $("#atualtotal").text(total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    }));
}

function Validacao(){
let servicoSelecionado = $("#servicos").val();

if (servicoSelecionado === "Aereo") {
    $("#tituloprincipal").text("");  // Deixa o título vazio
    $("#valorhospedagem").hide();
    $("#valorhotel").hide() 
     // Esconde a hospedagem
} else{
    let dias = $("#dias").val();
    let noites = $("#noites").val();
    let titulo = $("#titulo").val()
    $("#tituloprincipal").text(titulo + ' ' + dias + ' dias ' + 'e ' + noites + ' noites');
}

// Define os campos obrigatórios com uma propriedade 'tipo'
let camposObrigatorios = [
    {id:"titulo", nome: "Destino", tipo: "hotel"},
    {id:"hotel", nome:"Nome do Hotel", tipo: "hotel"},
    {id:"novoenderecohotel", nome:"Endereço do Hotel", tipo: "hotel"},
    {id:"qtdadultos", nome: "Quantidade de Adultos", tipo: "hotel"},
    {id:"checkin", nome: "Data Checkin", tipo: "hotel"},
    {id:"checkout", nome: "Data Checkout", tipo: "hotel"},
    {id:"aeroporto", nome: "Aeroporto (ida)", tipo: "voo"},
    {id:"dataembarque", nome: "Data de Embarque (ida)", tipo: "voo"},
    {id:"horaembarque", nome: "Hora de Embarque (ida)", tipo: "voo"},
    {id:"classe", nome: "Classe (ida)", tipo: "voo"},
    {id:"numerovoo", nome: "Número do Voo (ida)", tipo: "voo"},
    {id:"aeroporto-desembarque", nome: "Aeroporto Desembarque (ida)", tipo: "voo"},
    {id:"datadesembarque", nome: "Data de Desembarque (ida)", tipo: "voo"},
    {id:"horadesembarque", nome: "Hora de Desembarque (ida)", tipo: "voo"},
    {id:"aeroporto-embarque-volta", nome: "Aeroporto de Embarque (Volta)", tipo: "voo"},
    {id:"dataembarque-volta", nome: "Data de Embarque (Volta)", tipo: "voo"},
    {id:"horaembarque-volta", nome: "Hora de Embarque (Volta)", tipo: "voo"},
    {id:"classe-volta", nome: "Classe (Volta)", tipo: "voo"},
    {id:"numerovoo-volta", nome: "Número do Voo (Volta)", tipo: "voo"},
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
  


$("#organizer, #organizer1, #dados-conect, #dados-conect-volta, #orcar, #valoresfinais, #aereo-adulto, #aereo-bebe, #aereo-crianca, #conexao,#conexao-volta, #aviao-conect-volta, #aviao-conect, #container,  #botao-pdf").hide();


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


// ⬇️ Aqui os eventos são adicionados apenas uma vez, fora da função atualizarTotal()
$(document).ready(function () {
    $("#valorhotel").on("input", function () {
        formatarMoeda(this, document.getElementById("valorhotel_real"));
    });

    $("#valorvoo").on("input", function () {
        formatarMoeda(this, document.getElementById("valorvoo_real"));
    });

    $("#servicos").change(function () {
        let servico = $(this).val();
    
        // Esconde tudo primeiro
        $("#servico-hospedagem, #servico-aereo, #voo, #info-hotel").hide();
        $("#valorhospedagem, #valorvoo").hide();
        $("#organizer, #organizer1").hide();
        $("#separar1, #separar3").hide();
        $("#aereo-adulto, #aereo-bebe, #aereo-crianca").hide();
       
    
        if (servico === "Hospedagem") {
            $("#servico-hospedagem").show();
            $("#info-hotel").show();
            $("#valorhospedagem").show();
            $("#voo-inf").hide()
            
        } else if (servico === "Aereo") {
            $("#servico-aereo").show();
            $("#voo").show();
            $("#organizer1").show();
            $("#aereo-adulto, #aereo-bebe, #aereo-crianca, #voo-inf, #valorvoo").show();
            $("#hotel-inf").hide();
            
            
    
        } else if (servico === "hospedagem e aereo") {
            $("#servico-hospedagem, #servico-aereo").show();
            $("#voo, #info-hotel").show();
            $("#voo-inf, #valorhospedagem, #organizer, #hotel-inf, #valorvoo").show();
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
  
    // Captura do elemento como um único canvas
    const elemento = document.getElementById("container");
    const originalCanvas = await html2canvas(elemento, { scale: 3 });
  
    // Dimensões em mm (A4 retrato)
    const pdfWidth = 210; 
    const pdfHeight = 297;
  
    // Margem superior, se desejar
    const marginTop = 10; 
    // Se quiser margem lateral, ajuste também x e a largura do addImage.
  
    // Calcula o fator de escala para a largura completa em 210mm
    const scaleFactor = pdfWidth / originalCanvas.width;
  
    // Altura útil na página em mm (descontando a margem superior)
    const usablePageHeightMm = pdfHeight - marginTop;
  
    // Converte essa altura útil de mm para pixels, considerando o mesmo fator de escala
    const usablePageHeightPx = usablePageHeightMm / scaleFactor;
  
    // Função que extrai uma “fatia” (sub-canvas) do canvas original
    function cropCanvas(sourceCanvas, startPx, endPx) {
      const newCanvas = document.createElement("canvas");
      newCanvas.width = sourceCanvas.width;
      newCanvas.height = endPx - startPx;
  
      const ctx = newCanvas.getContext("2d");
      // Desenha a parte do canvas original (startPx -> endPx)
      ctx.drawImage(sourceCanvas, 0, -startPx);
  
      return newCanvas;
    }
  
    let position = 0;
    let pageCount = 0;
    const totalHeight = originalCanvas.height;
  
    // Enquanto ainda houver canvas para “fatiar”
    while (position < totalHeight) {
      // Define o tamanho da fatia que cabe na página
      const sliceHeightPx = Math.min(usablePageHeightPx, totalHeight - position);
  
      // Cria sub-canvas só com a parte necessária
      const canvasSlice = cropCanvas(originalCanvas, position, position + sliceHeightPx);
      const sliceData = canvasSlice.toDataURL("image/png");
  
      // Calcula a altura que essa fatia terá no PDF (em mm)
      const sliceHeightMm = sliceHeightPx * scaleFactor;
  
      // Caso não seja a primeira página, adiciona uma nova
      if (pageCount > 0) {
        pdf.addPage();
      }
  
      // Adiciona a imagem (fatia) na página, com ou sem margem superior
      pdf.addImage(sliceData, "PNG", 0, pageCount > 0 ? marginTop : 0, pdfWidth, sliceHeightMm);
  
      position += sliceHeightPx;
      pageCount++;
    }
  
    pdf.save("orcamento_viagem.pdf");
});





$("#alterar").click(() => {

    Validacao()
    $("#atual-regime").text("Regime: " +$("#modalidade-pensao").val())
    let nomehotel = $("#hotel").val();
    let novoenderecohotel = $("#novoenderecohotel").val(); // Captura do input
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
    let numerovoo = $("#numerovoo").val();
    let classeida = $("#classe").val();
    let aeroportodesembaqueida =  $("#aeroporto-desembarque").val();
    let horadesembarqueida = $("#horadesembarque").val();
    let datadesembarqueida = $("#datadesembarque").val();
    //dados voo volta
    let aeroembaquevolta = $("#aeroporto-embarque-volta").val();
    let dataembarquevolta = $("#dataembarque-volta").val();
    let horaembarquevolta = $("#horaembarque-volta").val();
    let ciavolta = $("#ciaaereavolta").val();
    let numerovoovolta = $("#numerovoo-volta").val();
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
    let numeroconectida = $("#number-conect").val().trim();
    let aeroportovolta = $("#aeroporto-conect-volta").val().trim();
    let datavolta = $("#data-aero-conexao-volta").val().trim();
    let horavolta = $("#hora-aero-conexao-volta").val().trim();
    let numerovolta = $("#number-conect-volta").val().trim();
    let datadesembarqueConect =$("#datadesembarque-conect").val().trim();
    let horadesembarqueConect =$("#horadesembarque-conect").val().trim();
    let dataDesembarqueConectVolta = $("#datadesembarque-conect-volta").val();
    let horaDesembarqueConectVolta = $("#horadesembarque-conect-volta").val();
    //dados somente voo
    let numeroaeroadultos = $("#aereo-adulto").val().trim();
    let numeroaerobebes = $("#aereo-bebe").val().trim();
    let numeroaerocrianca = $("#aereo-crianca").val().trim();


    
   
    
    let hotel = $("#nomehotel");
    let atualenderecohotel = $("#enderecohotel");
    let atualdescri = $("#atualdescri")
    let atualcheckin = $("#atualcheckin")
    let atualcheckout = $("#atualcheckout")
    let atualaeroporto = $("#embarque-aero-ida")
    let atualdataida = $("#data-aero-ida")
    let atualclasse = $("#atualclasse")
    let atualnumerovoo = $("#atual-numero-voo")
    let atualcia = $("#atual-cia")
    let atualaeroportodesembarque = $("#desembarque-aero-ida")
    let atualdatadesembarque = $("#data-desembarque-aero-ida")
    let atualaeroportoembarquevolta = $("#atual-aeroporto-embarque-volta")
    let atualhoraembarquevolta= $("#atual-hora-embarque-volta")
    let atualdataembarquevolta = $("#atual-data-embarque-volta")
    let atualaeroportodesembarquevolta = $("#atual-aeroporto-desembarque-volta")
    let atualdatadesembarquevolta = $("#atual-data-desembarque-volta")
    let atualciavolta = $("#atual-cia-volta")
    let atualnumerovoovolta = $("#atual-numero-voo-volta")
    let atualclassevolta = $("#atual-classe-volta")
    let atualvalorhospedagem = $("#atualvalorhospedagem")
    let atualvalorvoo = $("#atualvalorvoo")
   


    
    hotel.text(nomehotel);
    atualenderecohotel.text(novoenderecohotel);
    atualdescri.text(drescriquarto)
    atualaeroporto.text(aeroembaqueida)
    atualclasse.text("Classe: " + classeida)
    atualnumerovoo.text("Numero do Voo: " + numerovoo)
    atualcia.text(ciaida)
    atualaeroportodesembarque.text(aeroportodesembaqueida)
    atualaeroportoembarquevolta.text(aeroembaquevolta)
    atualhoraembarquevolta.text((horaembarquevolta))
    atualaeroportodesembarquevolta.text(aeroportodesembaquevolta)
    atualciavolta.text(ciavolta)
    atualnumerovoovolta.text("Numero do Voo: " + numerovoovolta)
    atualclassevolta.text("Classe: " + classevolta)
    atualvalorhospedagem.text(valorhospedagem)
    atualvalorvoo.text(valorvoo)
     //altera conexão ida
    atualdataida.text("Embarque: " + formatarData(dataembarqueida) + " - " + formatarHora(horaembarqueida));
    atualdatadesembarque.text("Desembarque: " + formatarData(datadesembarqueida) + " - " + formatarHora(horadesembarqueida))

    //altera conexão volta
    $("#data-desembarque-conect-volta").text("Desembarque: " + formatarData(dataDesembarqueConectVolta) + " - " + formatarHora(horaDesembarqueConectVolta));
    $("#data-conexao-volta").text("Embarque: "+formatarData(datavolta)+" - "+ formatarHora(horavolta));

    //altera embarque volta
    atualdataembarquevolta.text("Embarque: " + formatarData(dataembarquevolta)+ " - "+ formatarHora(horaembarquevolta))
    atualdatadesembarquevolta.text("Desembarque: " + formatarData(datadesembarquevolta) + " - "+ formatarHora(horadesembarquevolta))

    

    if (aeroportoconectida && dataconectida && horaconectida && numeroconectida) {
        $("#aviao-conect").show()
        $("#conexao").show(); // Mostra a div se pelo menos um campo estiver preenchido
        $("#aeroporto-conect").text(aeroportoconectida);

        $("#numero-aero-conexao-ida").text("Numero Voo: " + numeroconectida);
        if ($("#data-conect").val() && horaconectida) {
            let dataFormatada = formatarData($("#data-conect").val());
            let horaFormatada = formatarHora(horaconectida);
            $("#data-aero-conexao-ida").text(`Embarque: ${dataFormatada} - ${horaFormatada}`);
        }

    
    }

    if (aeroportovolta && datavolta && horavolta && numerovolta) {
        $("#aviao-conect-volta").show()
        $("#conexao-volta").show(); // Mostra a div se pelo menos um campo estiver preenchido
        $("#aero-conect-volta").text(aeroportovolta);
        $("#numero-aero-conexao-volta").text("Numero Voo: " + numerovolta);
        
    } 
    
    

    if (horadesembarqueConect) {
        const horaFormatada = formatarHora(horadesembarqueConect);
        if (datadesembarqueConect) {
            const dataFormatada = formatarData(datadesembarqueConect);
            $("#data-chegada-conect").text(`Desembarque: ${dataFormatada} - ${horaFormatada}`);
        }
    }



        

    
    if(qtdadultos > 0){
        $(".adultos").text(qtdadultos + " Adultos")
    } else if(qtdadultos==="" && numeroaeroadultos >0){
        $(".adultos").text(numeroaeroadultos + " Adultos")
    }


    if(numerobebes > 0){
        $(".atualqtdbebes").text(numerobebes + " Bebes")
    } else if(numerobebes === "" && numeroaerobebes>0){
        $(".atualqtdbebes").text(numeroaerobebes + " Bebes")

    } else{
        $(".atualqtdbebes").hide
    }

    if(qtdcriancas > 0){
        $(".atualqtdcriancas").text(qtdcriancas + " Crianças")
        $(".atualqtdcriancass").text(qtdcriancas)  
    } else if(qtdcriancas === "" && numeroaerocrianca >0){
        $(".atualqtdcriancas").text(numeroaerocrianca + " Crianças")
    }

    
    if (checkin) {
        atualcheckin.text(formatarData(checkin));
    }
    
    if (checkout) {
        atualcheckout.text(formatarData(checkout));
    }


    
    
    
});



