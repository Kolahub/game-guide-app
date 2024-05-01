// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, 
    collection, onSnapshot, addDoc,
    query, orderBy, serverTimestamp,
    doc, setDoc, getDoc
 } from 'firebase/firestore'
import {
    getAuth, 
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword, onAuthStateChanged
} from 'firebase/auth'

import { setupGuide, setupUI } from './index.js'

const firebaseConfig = {
  apiKey: "AIzaSyDmup3y0sFLhJ3yloQzQQTFyFiNlmcORdo",
  authDomain: "game-guides-website-dcdf0.firebaseapp.com",
  projectId: "game-guides-website-dcdf0",
  storageBucket: "game-guides-website-dcdf0.appspot.com",
  messagingSenderId: "785330496098",
  appId: "1:785330496098:web:6caf068762aff8a35ba73b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore()
const auth = getAuth()

const colRef = collection(db, 'guides')

const q = query(colRef, orderBy('createdAt'))

onAuthStateChanged(auth, (user) => {
    if (user) {
        onSnapshot(q, (snapshot) => {
            let guides = []
            snapshot.docs.forEach((doc) => {
                guides.push(doc.data())
            })
            console.log(guides)
            setupGuide(guides)
        }, err => console.log(err.message))
        setupUI(user, doc, db, getDoc)
    } else {
        setupUI()
        setupGuide([])
    }
})

// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addDoc(colRef, {
    title: createForm.title.value,
    content: createForm.content.value,
    createdAt: serverTimestamp()
  }).then(() => {
    // close the create modal & reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  });
});

// sign up user 
const signupForm = document.getElementById('signup-form')
signupForm.addEventListener('submit', function (e) {
    e.preventDefault()

    const email = signupForm['signup-email'].value
    const password = signupForm['signup-password'].value

    console.log(email, password)

    
    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        const userRef = doc(db, 'user', cred.user.uid)
        return setDoc(userRef, {
            bio: signupForm['signup-bio'].value
        })
    }).then (() => {
    // close the signup modal & reset form
     const modal = document.querySelector('#modal-signup');
     M.Modal.getInstance(modal).close();
     signupForm.reset();
    })
    .catch((error) => {
        console.log(`${error.message}`)
    })
})

//logging out 
const logout = document.getElementById('logout')
logout.addEventListener('click', function () {
    signOut(auth).then(() => {
        console.log('User signed out')
    })
})

//logging in 
const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', function () {
    const email = loginForm['login-email'].value
    const password = loginForm['login-password'].value
    signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log(cred.user)
    })
    .catch((err) => {
        console.log(err.message)
    })

         // close the login modal & reset form
         const modal = document.querySelector('#modal-login');
         M.Modal.getInstance(modal).close();
         loginForm.reset();
})