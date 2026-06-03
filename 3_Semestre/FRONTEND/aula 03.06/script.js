import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    query, 
    orderBy, 
    onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBIYOz8jXUVec5S8I-eIsLOWyDEY-xdte8",
    authDomain: "pizzaria-87d85.firebaseapp.com",
    projectId: "pizzaria-87d85",
    storageBucket: "pizzaria-87d85.firebasestorage.app",
    messagingSenderId: "604448618852",
    appId: "1:604448618852:web:11bec5b3c021d44448e271"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

//Elementos visiuais

const authScreen = document.getElementById('auth-screen');
const dashBoardScreen = document.getElementById('dashboard-screen');
const pizzaGrid = document.getElementById('pizza-grid');

//Elementos Login

const inputEmail = document.getElementById('auth-email');
const inputSenha = document.getElementById('auth-senha');
const inputPreco = document.getElementById('auth-preco');
const inputImagem = document.getElementById('auth-imagem');

//Monitor de autenticação

onAuthStateChanged(auth,(user)=>{
    if(user){
        authScreen.classList.add('hidden');
        dashBoardScreen.classList.remove('hidden');
        document.getElementById('user-display-name').textContent = user.displayName || user.email;
        carregarCardapio();
    }else{
        authScreen.classList.remove('hidden');
        dashBoardScreen.classList.add('hidden');
        pizzaGrid.innerHTML = '';
    }
})

//Processos de Login/Cadastro

document.getElementById('btn-cadastro').addEventListener('click', async()=>{
    const email = inputEmail.value.trim();
    const senha = inputSenha.value.trim();
    if(!email || !senha) return alert('Preencha o email e senha!');
    try{
        await createUserWithEmailAndPassword(auth, email, senha);
        alert("Conta criada com sucesso!");
    }catch(e){
        alert(e.message);
    }
});

document.getElementById('btn-login').addEventListener('click', async()=>{
    const email = inputEmail.value.trim();
    const senha = inputSenha.value.trim();
    if(!email || !senha) return alert('Preencha o email e senha!');
    try{
        await createUserWithEmailAndPassword(auth, email, senha);
        alert("Conta criada com sucesso!");
    }catch(e){
        alert(e.message);
    }
});

document.getElementById('btn-logout').addEventListener('click', () => signOut(auth));