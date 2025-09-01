import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAVKuGyWPNjoTV_q7LkMm9pSHiPVw8Lxc4",
  authDomain: "trip-wise-96e01.firebaseapp.com",
  databaseURL: "https://trip-wise-96e01-default-rtdb.firebaseio.com",
  projectId: "trip-wise-96e01",
  storageBucket: "trip-wise-96e01.firebasestorage.app",
  messagingSenderId: "856663137324",
  appId: "1:856663137324:web:a8546158656e90e1950589"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("entrar").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    alert("Login realizado!");
    window.location.href = "sistema.html"; // redireciona para sua tela principal
  } catch (e) {
    alert("Erro no login: " + e.message);
  }
});

