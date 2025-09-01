import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

import { getFirestore, collection, getDocs, addDoc  } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";



    // Configuração do Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyAVKuGyWPNjoTV_q7LkMm9pSHiPVw8Lxc4",
      authDomain: "trip-wise-96e01.firebaseapp.com",
      databaseURL: "https://trip-wise-96e01-default-rtdb.firebaseio.com",
      projectId: "trip-wise-96e01",
      storageBucket: "trip-wise-96e01.firebasestorage.app",
      messagingSenderId: "856663137324",
      appId: "1:856663137324:web:a8546158656e90e1950589"
    };

    // Inicializa Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);


function renderCliente(cliente) {
  const clienteDiv = $(`
    <div class="cliente">
      <p class="nome">${cliente.nome}</p>
      <p class="cpf"> CPF: ${cliente.cpf}</p>
      <p class="rg"> RG: ${cliente.rg}</p>
    </div>
  `);
  $("#clientesgerais").append(clienteDiv);
}



// 3️⃣ Buscar clientes do Firestore ao carregar
async function carregarClientes() {
  const querySnapshot = await getDocs(collection(db, "pessoas"));
  querySnapshot.forEach(doc => {
    renderCliente(doc.data());
  });
}



// 4️⃣ Adicionar cliente com jQuery e salvar no Firestore
$("#addcliente").click(async () => {
  const nome = $("#nomecliente").val();
  const cpf = $("#cpfcliente").val();
  const rg = $("#rgcliente").val();

  if (!nome || !cpf || !rg) {
    alert("Preencha todos os campos!");
    return;
  }

  const cliente = { nome, cpf, rg, criadoEm: new Date() };

  renderCliente(cliente);

  $("#nomecliente").val("");
  $("#cpfcliente").val("");
  $("#rgcliente").val("");

  try {
    await addDoc(collection(db, "pessoas"), cliente);
    console.log("Cliente salvo com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar cliente:", error);
  }
});

$("#filtro").on("input", function() {
    const termo = $(this).val().toLowerCase();

    $(".cliente").each(function() {
        const nome = $(this).find(".nome").text().toLowerCase();
        if (nome.includes(termo)) {
            $(this).show(); // Mostra cliente
        } else {
            $(this).hide(); // Esconde cliente
        }
    });
});

$("#voltarhome").click(()=>{
    window.location.href = "sistema.html"
})

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Redireciona para login se não estiver logado
    window.location.href = "index.html";
  } else {
    // Carrega os clientes somente se o usuário estiver logado
    carregarClientes();
  }
});