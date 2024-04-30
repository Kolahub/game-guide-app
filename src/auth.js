// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {
    getAuth, 
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword
} from 'firebase/auth'

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

// sign up user 
const signupForm = document.getElementById('signup-form')
signupForm.addEventListener('submit', function (e) {
    e.preventDefault()

    const email = signupForm['signup-email'].value
    const password = signupForm['signup-password'].value

    console.log(email, password)

    
    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log(cred.user)
    }).catch((error) => {
        console.log(`${error.message}`)
    })

     // close the signup modal & reset form
     const modal = document.querySelector('#modal-signup');
     M.Modal.getInstance(modal).close();
     signupForm.reset();
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