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

let camposParaVerificar = camposObrigatorios.filter(campo => {
    if (servicoSelecionado === "Hospedagem" && campo.tipo === "voo") {
        return false;
    } else if (servicoSelecionado === "Aereo" && campo.tipo === "hotel") {
        return false;
    }
    return true;
});

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