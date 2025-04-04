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
    return str.replace(/\b\w/g, letra => letra.toUpperCase());
}


$("#organizer, #organizer1, #dados-conect, #dados-conect-volta, #orcar, #valoresfinais, #aereo-adulto, #aereo-bebe, #aereo-crianca").hide();


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

// ⬇️ Aqui os eventos são adicionados apenas uma vez, fora da função atualizarTotal()
$(document).ready(function () {
    $("#valorhotel").on("input", function () {
        formatarMoeda(this, document.getElementById("valorhotel_real"));
    });

    $("#valorvoo").on("input", function () {
        formatarMoeda(this, document.getElementById("valorvoo_real"));
    });

    $("#servicos").change(function () {
        $("#servico-hospedagem, #servico-aereo").hide(); // Esconde os dois por padrão
        $("#voo, #info-hotel").show(); // Garante que ambas as sections sejam mostradas inicialmente
    
        let servico = $(this).val();
    
        if (servico === "Hospedagem") {
            $("#servico-hospedagem").show();
            $("#voo").hide(); // Esconde a section de voo
            $("#separar3").hide()
            $("#valorvoo").hide()

        } else if (servico === "Aereo") {
            $("#servico-aereo").show();
            $("#valorhospedagem").hide()
            $("#organizer").hide();
            $("#organizer1").show();
            $("#separar1").hide()
            $("#info-hotel").hide(); 
            $("#aereo-adulto, #aereo-bebe, #aereo-crianca").show();

        } else if (servico === "hospedagem e aereo") {
            $("#servico-hospedagem, #servico-aereo").show();
            $("#voo, #info-hotel").show(); // Mostra ambas as sections
            $("#valorvoo").show()
            $("#valorhospedagem").show()
        }
    });

    
      sincronizarDatas("#checkin", "#checkout");
      sincronizarDatas("#dataembarque", "#datadesembarque");
      sincronizarDatas("dataembarque-volta", "datadesembarque-volta")
      
      

    
    $("#situacaoreserva").change(function(){
        let situacao = $(this).val();
            
        $("#atualreserva").text(situacao).css("color", situacao === "Reservas Finalizadas" ? "green" : "red");
     });

    
    $("input").on("input", function() {
        let textoFormatado = capitalizarPalavras($(this).val());
        $(this).val(textoFormatado);
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

    // Recupera o serviço selecionado



    let titulo = $("#titulo").val();
    let dias = $("#dias").val();
    let noites = $("#noites").val();
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
    //dados somente voo
    let numeroaeroadultos = $("#aereo-adulto").val().trim();
    let numeroaerobebes = $("#aereo-bebe").val().trim();
    let numeroaerocrianca = $("#aereo-crianca").val().trim();


    
   
    let tituloatual = $("#tituloprincipal");
    let hotel = $("#nomehotel");
    let atualenderecohotel = $("#enderecohotel");
    let atualdescri = $("#atualdescri")
    let atualcheckin = $("#atualcheckin")
    let atualcheckout = $("#atualcheckout")
    let atualaeroporto = $("#embarque-aero-ida")
    let atualdataida = $("#data-aero-ida")
    let atualhoraida  = $("#hora-aero-ida")
    let atualclasse = $("#atualclasse")
    let atualnumerovoo = $("#atual-numero-voo")
    let atualcia = $("#atual-cia")
    let atualaeroportodesembarque = $("#desembarque-aero-ida")
    let atualhoradesembarque = $("#hora-desembarque-ida")
    let atualdatadesembarque = $("#data-desembarque-aero-ida")
    let atualaeroportoembarquevolta = $("#atual-aeroporto-embarque-volta")
    let atualhoraembarquevolta= $("#atual-hora-embarque-volta")
    let atualdataembarquevolta = $("#atual-data-embarque-volta")
    let atualaeroportodesembarquevolta = $("#atual-aeroporto-desembarque-volta")
    let atualhoradesembarquevolta= $("#atual-hora-desembarque-volta")
    let atualdatadesembarquevolta = $("#atual-data-desembarque-volta")
    let atualciavolta = $("#atual-cia-volta")
    let atualnumerovoovolta = $("#atual-numero-voo-volta")
    let atualclassevolta = $("#atual-classe-volta")
    let atualvalorhospedagem = $("#atualvalorhospedagem")
    let atualvalorvoo = $("#atualvalorvoo")


    tituloatual.text(titulo + ' ' + dias + ' dias ' + 'e ' + noites + ' noites');
    hotel.text(nomehotel);
    atualenderecohotel.text(novoenderecohotel);
    atualdescri.text(drescriquarto)
    atualaeroporto.text(aeroembaqueida)
    atualhoraida.text(horaembarqueida)
    atualclasse.text("Classe: " + classeida)
    atualnumerovoo.text("Numero do Voo: " + numerovoo)
    atualcia.text(ciaida)
    atualaeroportodesembarque.text(aeroportodesembaqueida)
    atualhoradesembarque.text(horadesembarqueida)
    atualaeroportoembarquevolta.text(aeroembaquevolta)
    atualhoraembarquevolta.text(horaembarquevolta)
    atualaeroportodesembarquevolta.text(aeroportodesembaquevolta)
    atualhoradesembarquevolta.text(horadesembarquevolta)
    atualciavolta.text(ciavolta)
    atualnumerovoovolta.text("Numero do Voo: " + numerovoovolta)
    atualclassevolta.text("Classe: " + classevolta)
    atualvalorhospedagem.text(valorhospedagem)
    atualvalorvoo.text(valorvoo)

    

    if (!aeroportoconectida && !dataconectida && !horaconectida && !numeroconectida) {
        $("#conexao").hide(); // Esconde a div se nenhum campo for preenchido
    
    } else {
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

    if (!aeroportovolta && !datavolta && !horavolta && !numerovolta) {
        $("#conexao-volta").hide(); // Esconde a div se nenhum campo for preenchido
        
    } else {
        $("#aviao-conect-volta").show()
        $("#conexao-volta").show(); // Mostra a div se pelo menos um campo estiver preenchido
        $("#aero-conect-volta").text(aeroportovolta);
        $("#data-conexao-volta").text(datavolta);
        $("#hora-conexao-volta").text(horavolta);
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


    
    if ($("#data-aero-conexao-volta").val()) {
        let dataFormatada = formatarData($("#data-aero-conexao-volta").val());
        $("#data-conexao-volta").text(dataFormatada);
    }
    
    if (checkin) {
        atualcheckin.text(formatarData(checkin));
    }
    
    if (checkout) {
        atualcheckout.text(formatarData(checkout));
    }
    
    if (dataembarqueida) {
        atualdataida.text(formatarData(dataembarqueida));
    }
    
    if (datadesembarqueida) {
        atualdatadesembarque.text(formatarData(datadesembarqueida));
    }
    
    if (dataembarquevolta) {
        atualdataembarquevolta.text(formatarData(dataembarquevolta));
    }
    
    if (datadesembarquevolta) {
        atualdatadesembarquevolta.text(formatarData(datadesembarquevolta));
    }
    

    $("#container, #botao-pdf").show()
    
    
});



