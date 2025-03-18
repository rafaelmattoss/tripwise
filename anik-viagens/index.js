$("#organizer, #organizer1").hide();

$("#vizudestin").click(()=>{
    $("#organizer").fadeToggle();
});

$("#vizuvoo").click(()=>{
    $("#organizer1").fadeToggle();
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
        $("#servico-hospedagem, #servico-aereo").hide();
        let servico = $(this).val();

        if (servico === "Hospedagem") {
            $("#servico-hospedagem").show();
        } else if (servico === "Aereo") {
            $("#servico-aereo").show();
        } else if (servico === "hospedagem e aereo") {
            $("#servico-hospedagem, #servico-aereo").show();
        }
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

    let camposObrigatorios = [
        {id:"titulo", nome: "Destino"},
        {id:"hotel", nome:"Nome do Hotel"},
        {id:"novoenderecohotel", nome:"Endereço do Hotel"},

    ]

    let camposVazios = []; // Alterei para camposVazios

    camposObrigatorios.forEach(campo => {
    let valor = $("#" + campo.id).val().trim();
    if (!valor) {
        camposVazios.push(campo.nome); // Certifique-se de usar a mesma variável
        $("#" + campo.id).css("border", "2px solid red"); // Destaca o campo
    } else {
        $("#" + campo.id).css("border", ""); // Remove o destaque se estiver preenchido
    }
    });

    if (camposVazios.length > 0) { // Mudei "erros" para "camposVazios"
    alert("Preencha os seguintes campos obrigatórios:\n" + camposVazios.join("\n"));
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
    
    
   
    let tituloatual = $("#tituloprincipal");
    let hotel = $("#nomehotel");
    let atualenderecohotel = $("#enderecohotel");
    let atualqtdadultos = $(".adultos");
    let atualcriancas = $(".atualqtdcriancas")
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
    let atualqtdbebes = $(".atualqtdbebes")
    let atualvalorhospedagem = $("#atualvalorhospedagem")
    let atualvalorvoo = $("#atualvalorvoo")
    



    tituloatual.text(titulo + ' ' + dias + ' dias ' + 'e ' + noites + ' noites');
    hotel.text(nomehotel);
    atualenderecohotel.text(novoenderecohotel);
    atualqtdadultos.text(qtdadultos + ' Adultos')
    atualcriancas.text(qtdcriancas )
    atualidosos.text(qtdidosos)
    atualdescri.text(drescriquarto)
    atualaeroporto.text(aeroembaqueida)
    atualhoraida.text(horaembarqueida)
    atualclasse.text(classeida)
    atualnumerovoo.text(numerovoo)
    atualcia.text(ciaida)
    atualaeroportodesembarque.text(aeroportodesembaqueida)
    atualhoradesembarque.text(horadesembarqueida)
    atualaeroportoembarquevolta.text(aeroembaquevolta)
    atualhoraembarquevolta.text(horaembarquevolta)
    atualaeroportodesembarquevolta.text(aeroportodesembaquevolta)
    atualhoradesembarquevolta.text(horadesembarquevolta)
    atualciavolta.text(ciavolta)
    atualnumerovoovolta.text(numerovoovolta)
    atualclassevolta.text(classevolta)
    atualqtdbebes.text(numerobebes)
    atualvalorhospedagem.text(valorhospedagem)
    atualvalorvoo.text(valorvoo)
    
    


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


    

  



    
    
});



