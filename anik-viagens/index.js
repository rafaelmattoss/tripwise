$("#organizer, #organizer1, #dados-conect, #dados-conect-volta, #orcar, #valoresfinais, #aereo-adulto, #aereo-bebe, #aereo-crianca, #container, #botao-pdf").hide();


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

    
    $("#situacaoreserva").change(function(){
        let situacao = $(this).val();
            
        $("#atualreserva").text(situacao).css("color", situacao === "Reservas Finalizadas" ? "green" : "red");
     });
        
        

      
});




document.getElementById("botao-pdf").addEventListener("click", async function () {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const elemento = document.getElementById("container");

    html2canvas(elemento, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 210; // Largura A4
        const pageHeight = 297; // Altura A4
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Mantém proporção
        let heightLeft = imgHeight;
        let position = 0; // Primeira página sem margem

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight + 10; // Apenas páginas novas terão margem de 10px no topo
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save("orcamento_viagem.pdf");
    });
});









$("#alterar").click(() => {

    // Recupera o serviço selecionado
let servicoSelecionado = $("#servicos").val();

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
    {id:"horadesembarque-volta", nome: "Hora de Desembarque (Volta)", tipo: "voo"}
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
}


    let titulo = $("#titulo").val();
    let dias = $("#dias").val();
    let noites = $("#noites").val();
    let nomehotel = $("#hotel").val();
    let novoenderecohotel = $("#novoenderecohotel").val(); // Captura do input
    let qtdadultos = $("#qtdadultos").val();
    let qtdcriancas = $("#qtdcriancas").val();
    let qtdidosos = $("#qtdidosos").val();
    let drescriquarto =  $("#descriquarto").val();
    let checkin = $("#checkin").val();
    let checkout = $("#checkout").val();
    let aeroembaqueida = $("#aeroporto").val();
    let dataembarqueida = $("#dataembarque").val();
    let horaembarqueida = $("#horaembarque").val();
    let ciaida = $("#ciaaereaida").val();
    let numerovoo = $("#numerovoo").val();
    let classeida = $("#classe").val();
    let aeroportodesembaqueida =  $("#aeroporto-desembarque").val();
    let horadesembarqueida = $("#horadesembarque").val();
    let datadesembarqueida = $("#datadesembarque").val();
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
    let valorhospedagem = $("#valorhotel").val();
    let valorvoo = $("#valorvoo").val();
    let aeroportoconectida = $("#aero-conect").val().trim();
    let dataconectida = $("#data-conect").val().trim();
    let horaconectida = $("#hora-conect").val().trim();
    let numeroconectida = $("#number-conect").val().trim();
    let aeroportovolta = $("#aeroporto-conect-volta").val().trim();
    let datavolta = $("#data-aero-conexao-volta").val().trim();
    let horavolta = $("#hora-aero-conexao-volta").val().trim();
    let numerovolta = $("#number-conect-volta").val().trim();


    
   
    let tituloatual = $("#tituloprincipal");
    let hotel = $("#nomehotel");
    let atualenderecohotel = $("#enderecohotel");
    let atualqtdadultos = $(".adultos");
    let atualidosos = $(".atualqtdidosos")
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
    atualqtdadultos.text(qtdadultos + ' Adultos')
    atualidosos.text(qtdidosos)
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
        $(".icone-aviao-direita").hide()
        $("#conexao-ida").show(); // Mostra a div se pelo menos um campo estiver preenchido
        $("#aeroporto-conect").text(aeroportoconectida);
        $("#data-aero-conexao-ida").text(dataconectida);
        $("#hora-aero-conexao-ida").text(horaconectida);
        $("#numero-aero-conexao-ida").text("Numero Voo: " + numeroconectida);
    }

    if (!aeroportovolta && !datavolta && !horavolta && !numerovolta) {
        $("#conexao-volta").hide(); // Esconde a div se nenhum campo for preenchido
        
    } else {
        $(".icone-aviao-esquerda").hide()
        $("#conexao-volta").show(); // Mostra a div se pelo menos um campo estiver preenchido
        $("#aero-conect-volta").text(aeroportovolta);
        $("#data-conexao-volta").text(datavolta);
        $("#hora-conexao-volta").text(horavolta);
        $("#numero-aero-conexao-volta").text("Numero Voo: " + numerovolta);
    }

        
    if ( $("#data-conect").val()) {
        let data = new Date( $("#data-conect").val() + "T12:00:00"); // Força meio-dia para evitar problemas de fuso horário
        let dia = String(data.getDate()).padStart(2, "0");
        let mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro = 0, então +1
        let ano = data.getFullYear();
        let dataFormatada = `${dia}/${mes}/${ano}`;
            
        $("#data-aero-conexao-ida").text(dataFormatada);
    } 
    
    if ( $("#data-aero-conexao-volta").val()) {
        let data = new Date( $("#data-aero-conexao-volta").val() + "T12:00:00"); // Força meio-dia para evitar problemas de fuso horário
        let dia = String(data.getDate()).padStart(2, "0");
        let mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro = 0, então +1
        let ano = data.getFullYear();
        let dataFormatada = `${dia}/${mes}/${ano}`;
            
        $("#data-conexao-volta").text(dataFormatada);
    } 

    


    if(numerobebes > 0){
        $(".atualqtdbebes").text(numerobebes + " Bebes")
    }

    if(qtdcriancas > 0){
        $(".atualqtdcriancas").text(qtdcriancas + " Crianças")
    }

    
    if (checkin) {
        let data = new Date(checkin + "T12:00:00"); // Força meio-dia para evitar problemas de fuso horário
        let dia = String(data.getDate()).padStart(2, "0");
        let mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro = 0, então +1
        let ano = data.getFullYear();
        let dataFormatada = `${dia}/${mes}/${ano}`;
        atualcheckin.text(dataFormatada);
    } 

    if (checkout) {
        let data = new Date(checkout + "T12:00:00"); // Força meio-dia para evitar problemas de fuso horário
        let dia = String(data.getDate()).padStart(2, "0");
        let mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro = 0, então +1
        let ano = data.getFullYear();
        let dataFormatada = `${dia}/${mes}/${ano}`;
        atualcheckout.text(dataFormatada);
    } 

    if ( dataembarqueida) {
        let data = new Date( dataembarqueida + "T12:00:00"); // Força meio-dia para evitar problemas de fuso horário
        let dia = String(data.getDate()).padStart(2, "0");
        let mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro = 0, então +1
        let ano = data.getFullYear();
        let dataFormatada = `${dia}/${mes}/${ano}`;
        atualdataida.text(dataFormatada);
    } 

    if (datadesembarqueida) {
        let data = new Date( datadesembarqueida + "T12:00:00"); // Força meio-dia para evitar problemas de fuso horário
        let dia = String(data.getDate()).padStart(2, "0");
        let mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro = 0, então +1
        let ano = data.getFullYear();
        let dataFormatada = `${dia}/${mes}/${ano}`;
        atualdatadesembarque.text(dataFormatada);
    } 


    if ( dataembarquevolta) {
        let data = new Date(  dataembarquevolta + "T12:00:00"); // Força meio-dia para evitar problemas de fuso horário
        let dia = String(data.getDate()).padStart(2, "0");
        let mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro = 0, então +1
        let ano = data.getFullYear();
        let dataFormatada = `${dia}/${mes}/${ano}`;
        atualdataembarquevolta.text(dataFormatada);
    } 

    if ( datadesembarquevolta) {
        let data = new Date( datadesembarquevolta + "T12:00:00"); // Força meio-dia para evitar problemas de fuso horário
        let dia = String(data.getDate()).padStart(2, "0");
        let mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro = 0, então +1
        let ano = data.getFullYear();
        let dataFormatada = `${dia}/${mes}/${ano}`;
        atualdatadesembarquevolta.text(dataFormatada);
    } 

    $("#container, #botao-pdf").show()



    



    
    
});



