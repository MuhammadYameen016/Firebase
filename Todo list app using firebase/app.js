import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, Timestamp, getDocs, query,
    orderBy, doc, deleteDoc, updateDoc, deleteField } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyANOTiaFHvnzlKF3uQ7ja8r2ffMEoOEotA",
    authDomain: "database-8381a.firebaseapp.com",
    projectId: "database-8381a",
    storageBucket: "database-8381a.firebasestorage.app",
    messagingSenderId: "602755786692",
    appId: "1:602755786692:web:0038aaf0e840e2cbf82691",
    measurementId: "G-2EJY7BENB0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


let getInput = document.getElementById('inp')
let callUi = document.getElementById('getUl')

window.add = add
async function add() {
    try {
        const docRef = await addDoc(collection(db, "todos"), {
            value: getInput.value,
            time: Timestamp.now()
        });
        callUi.textContent = ""
        getInput.value = ""
        addDat()
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function addDat() {
callUi.innerHTML = ""
const q = query(collection(db, "todos"), orderBy("time", "asc"))
const querySnapshot = await getDocs(q)
querySnapshot.forEach((doc) => {
    callUi.innerHTML += `<li>${doc.data().value}</li>
    <button onclick="edit('${doc.id}')">Edit</button>
    <button onclick="del('${doc.id}')">Delete</button>`
})
}
addDat()

async function edit(e){
    callUi.innerHTML = ""
    let data = prompt('enter updated data: ')   
    const cityRef = doc(db, 'todos', e);
    await updateDoc(cityRef, {
       value: data    
    });
    addDat()
}
window.edit = edit

async function del(e){
    callUi.innerHTML = ""   
    const cityRef = doc(db, 'todos', e);
    await deleteDoc(cityRef, {
       value : deleteField()
    });

    addDat()
}
window.del = del