// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// Firebase Configuration (Make sure this matches your Firebase Console settings)
const firebaseConfig = {
    apiKey: "AIzaSyCnuCovuylWwBrUuR-I2WjK1LOWAPajW8w",
    authDomain: "allergyscanner-61f43.firebaseapp.com",
    projectId: "allergyscanner-61f43",
    storageBucket: "allergyscanner-61f43.appspot.com",  // Fixed incorrect storageBucket
    messagingSenderId: "537468369556",
    appId: "1:537468369556:web:3f19921bdb06f6e8cad281"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Debugging - Check if Firebase is initialized correctly
console.log("✅ Firebase Initialized:", app);

// Function to show error messages properly
function handleError(error) {
    console.error("❌ Error:", error.code, error.message);

    // Custom error messages for better user experience
    switch (error.code) {
        case "auth/email-already-in-use":
            alert("⚠️ This email is already registered. Try logging in instead.");
            break;
        case "auth/invalid-email":
            alert("⚠️ Invalid email format. Please enter a valid email address.");
            break;
        case "auth/weak-password":
            alert("⚠️ Password must be at least 6 characters long.");
            break;
        case "auth/wrong-password":
            alert("⚠️ Incorrect password. Please try again.");
            break;
        case "auth/user-not-found":
            alert("⚠️ No account found with this email. Please register first.");
            break;
        case "auth/invalid-credential":
            alert("⚠️ Invalid credentials. Double-check your email and password.");
            break;
        default:
            alert("⚠️ An unknown error occurred: " + error.message);
    }
}

// Register User
document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("reg-email").value;
            const password = document.getElementById("reg-password").value;

            console.log("🔹 Register Attempt:", email);

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log("✅ User Registered:", userCredential.user);
                    alert("🎉 Registration Successful! Redirecting to login...");
                    window.location.href = "login.html";
                })
                .catch(handleError);
        });
    }

    // Login User
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            console.log("🔹 Login Attempt:", email);

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log("✅ User Logged In:", userCredential.user);
                    alert("🎉 Login Successful! Redirecting to profile...");
                    window.location.href = "profile.html";
                })
                .catch(handleError);
        });
    }
});
