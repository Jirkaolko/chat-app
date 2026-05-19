import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, addDoc, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "TVŮJ_KLÍČ",
  authDomain: "projekt.firebaseapp.com",
  projectId: "projekt-id",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// login
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await signInWithEmailAndPassword(auth, email, password);
  alert("přihlášeno");
};

// odeslání zprávy
window.send = async function () {
  const text = document.getElementById("msg").value;

  await addDoc(collection(db, "messages"), {
    text,
    from: auth.currentUser.email,
    time: Date.now()
  });
};

// realtime chat
onSnapshot(collection(db, "messages"), (snapshot) => {
  const chat = document.getElementById("chat");
  chat.innerHTML = "";

  snapshot.forEach(doc => {
    const m = doc.data();
    chat.innerHTML += `<p><b>${m.from}:</b> ${m.text}</p>`;
  });
});
