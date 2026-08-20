// =====================================================
// AIFSA WORLDWIDE
// REAL FIREBASE REGISTRATION
// =====================================================

import {
    createUserWithEmailAndPassword,
    updateProfile
} from
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase.js";


// =====================================================
// DOM ELEMENTS
// =====================================================

const form =
    document.getElementById("registrationForm");

const password =
    document.getElementById("password");

const passwordToggle =
    document.getElementById("passwordToggle");

const submitButton =
    document.getElementById("submitButton");

const submitText =
    document.getElementById("submitText");

const formStatus =
    document.getElementById("formStatus");


// =====================================================
// SHOW / HIDE PASSWORD
// =====================================================

if (passwordToggle) {

    passwordToggle.addEventListener(
        "click",
        function () {

            if (password.type === "password") {

                password.type = "text";

                passwordToggle.textContent =
                    "Hide";

            } else {

                password.type = "password";

                passwordToggle.textContent =
                    "Show";
            }

        }
    );

}


// =====================================================
// ERROR FUNCTIONS
// =====================================================

/**
 * Display an error message for a specific form field.
 * @param {string} field
 * @param {string} message
 */
function showError(field, message) {
  
    const input =
        document.getElementById(field);

    const error =
        document.getElementById(field + "Error");

    if (!input || !error) return;

    const group =
        input.closest(".form-group");

    if (group) {

        group.classList.add("has-error");

    }

    error.textContent = message;
}


function clearErrors() {

    document
        .querySelectorAll(".form-group")
        .forEach(function (group) {

            group.classList.remove("has-error");

        });


    document
        .querySelectorAll(".error-message")
        .forEach(function (error) {

            error.textContent = "";

        });


    if (formStatus) {

        formStatus.className =
            "form-status";

        formStatus.textContent = "";

    }

}


// =====================================================
// VALIDATE FORM
// =====================================================

function validateForm() {

    clearErrors();

    let valid = true;


    const fullName =
        document
            .getElementById("fullName")
            .value
            .trim();


    const email =
        document
            .getElementById("email")
            .value
            .trim();


    const phone =
        document
            .getElementById("phone")
            .value
            .trim();


    const institution =
        document
            .getElementById("institution")
            .value
            .trim();


    const department =
        document
            .getElementById("department")
            .value
            .trim();


    const level =
        document
            .getElementById("level")
            .value;


    const location =
        document
            .getElementById("location")
            .value
            .trim();


    const passwordValue =
        password.value;


    const terms =
        document
            .getElementById("terms")
            .checked;


    // Full name

    if (fullName.length < 3) {

        showError(
            "fullName",
            "Please enter your full name."
        );

        valid = false;
    }


    // Email

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        showError(
            "email",
            "Please enter a valid email address."
        );

        valid = false;
    }


    // Phone

    const phonePattern =
        /^[0-9+\s()-]{10,15}$/;

    if (!phonePattern.test(phone)) {

        showError(
            "phone",
            "Please enter a valid phone number."
        );

        valid = false;
    }


    // Institution

    if (institution.length < 2) {

        showError(
            "institution",
            "Please enter your institution."
        );

        valid = false;
    }


    // Department

    if (department.length < 2) {

        showError(
            "department",
            "Please enter your department."
        );

        valid = false;
    }


    // Level

    if (!level) {

        showError(
            "level",
            "Please select your level."
        );

        valid = false;
    }


    // Location

    if (location.length < 2) {

        showError(
            "location",
            "Please enter your location."
        );

        valid = false;
    }


    // Password

    if (passwordValue.length < 8) {

        showError(
            "password",
            "Password must contain at least 8 characters."
        );

        valid = false;
    }


    // Terms

    if (!terms) {

        const termsError =
            document.getElementById("termsError");

        if (termsError) {

            termsError.textContent =
                "Please accept the membership terms.";

        }

        valid = false;
    }


    return valid;
}


// =====================================================
// FIREBASE ERROR TRANSLATION
// =====================================================

/**
 * Convert Firebase authentication errors into user-friendly messages.
 * @param {any} error
 * @returns {string}
 */
function getFirebaseErrorMessage(error) {
  
    switch (error.code) {

        case "auth/email-already-in-use":

            return "An account with this email already exists. Please log in instead.";

        case "auth/invalid-email":

            return "The email address is not valid.";

        case "auth/weak-password":

            return "Your password is too weak. Please use at least 8 characters.";

        case "auth/network-request-failed":

            return "Network error. Please check your internet connection.";

        case "auth/operation-not-allowed":

            return "Email/password registration is not enabled in Firebase Authentication.";

        default:

            return error.message ||
                "Something went wrong. Please try again.";
    }
}


// =====================================================
// REGISTRATION
// =====================================================

if (form) {

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // Validate

            if (!validateForm()) {

                return;

            }


            // Collect data

            const fullName =
                document
                    .getElementById("fullName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const institution =
                document
                    .getElementById("institution")
                    .value
                    .trim();


            const department =
                document
                    .getElementById("department")
                    .value
                    .trim();


            const level =
                document
                    .getElementById("level")
                    .value;


            const location =
                document
                    .getElementById("location")
                    .value
                    .trim();


            const passwordValue =
                password.value;


            // Loading state

            submitButton.classList.add("loading");

            submitText.textContent =
                "Creating your account...";


            try {

                // =================================================
                // STEP 1
                // CREATE FIREBASE AUTH ACCOUNT
                // =================================================

                const userCredential =
                    await createUserWithEmailAndPassword(
                        auth,
                        email,
                        passwordValue
                    );


                const user =
                    userCredential.user;


                // =================================================
                // STEP 2
                // ADD NAME TO AUTH PROFILE
                // =================================================

                await updateProfile(
                    user,
                    {
                        displayName: fullName
                    }
                );


                // =================================================
                // STEP 3
                // CREATE FIRESTORE PROFILE
                // =================================================

                await setDoc(
                    doc(db, "users", user.uid),
                    {

                        uid: user.uid,

                        fullName: fullName,

                        email: email,

                        phone: phone,

                        institution: institution,

                        department: department,

                        level: level,

                        location: location,

                        role: "member",

                        association:
                            "AIFSA Worldwide",

                        status: "active",

                        createdAt:
                            serverTimestamp()

                    }
                );


                // =================================================
                // SUCCESS
                // =================================================

                submitButton.classList.remove(
                    "loading"
                );

                submitText.textContent =
                    "Account Created ✓";


                formStatus.className =
                    "form-status success";


                formStatus.textContent =
                    "Welcome to AIFSA Worldwide! Your account has been created successfully.";


                // =================================================
                // REDIRECT
                // =================================================

                setTimeout(
                    function () {

                        window.location.href =
                            "dashboard.html";

                    },
                    1500
                );


            } catch (error) {

                console.error(
                    "AIFSA Registration Error:",
                    error
                );


                submitButton.classList.remove(
                    "loading"
                );


                submitText.textContent =
                    "Create AIFSA Account";


                formStatus.className =
                    "form-status error";


                formStatus.textContent =
                    getFirebaseErrorMessage(error);

            }

        }
    );

}