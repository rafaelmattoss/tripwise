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