let camposObrigatorios = [
    {id:"titulo", nome: "Destino"},
    {id:"hotel", nome:"Nome do Hotel"},
    {id:"novoenderecohotel", nome:"Endereço do Hotel"},
    {id:"qtdadultos", nome: "Quantidade de Adultos"},
    {id:"checkin", nome: "Data Checkin"},
    {id:"checkout", nome: "Data Checkout"}, 
    {id:"aeroporto", nome: "Aeroporto (ida)"},
    {id:"dataembarque", nome: "Data de Embarque(ida)"},
    {id:"horaembarque", nome: "Hora de Embarque (ida)"},
    {id:"classe", nome: "Classe (ida)"},
    {id:"numerovoo", nome: "Numero do Voo (ida)"},
    {id:"aeroporto-desembarque", nome: "Aeroporto Desembaque (ida)"}, 
    {id:"datadesembarque", nome: "Data de Desembarque (ida)"},
    {id:"horadesembarque", nome: "Hora de desembaque (ida)"},
    {id:"aeroporto-embarque-volta", nome: "Aeroporto de Embarque (Volta)"},
    {id:"dataembarque-volta", nome: "Data de Embarque (Volta)"},
    {id:"horaembarque-volta", nome: "Hora de Embarque (volta)"},
    {id:"classe-volta", nome: "Classe (volta)"},
    {id:"numerovoo-volta", nome: "Numero do Voo (volta)"},
    {id:"ciaaereavolta", nome: "Companhia Aerea (volta)"},
    {id:"aeroporto-desembarque-volta", nome: "Aeroporto de Desembarque (Volta)"},
    {id:"datadesembarque-volta", nome: "Data de Desembarque (Volta)"},
    {id:"horadesembarque-volta", nome: "Hora de Desembarque (volta)"},
      
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
alert("Preencha os seguintes campos obrigatórios:\n \n" + camposVazios.join("\n"));
return;
}