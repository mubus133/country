document.addEventListener('DOMContentLoaded', () => {
    // Signup  variables
    const firstPasswordInput = document.querySelector('.password');
    const confirmPasswordInput = document.querySelector('.confirm');
    const signupButton = document.querySelector('#me');
    const form = document.querySelector('.form');
    const errormessage = document.querySelector('#error');
    const firstname = document.querySelector('.fullname');
    const surname = document.querySelector('.surname');
    const email = document.querySelector('.email');

    // Login variables
    const loginButton = document.querySelector('#login');
    const loginForm = document.querySelector('.lg-form');
    const loginEmail = document.querySelector('.login-email');
    const loginPassword = document.querySelector('.login-password');
    const loginError = document.querySelector('.loginerror');

    
    const inputsToClearErrors = [firstname, surname, email, firstPasswordInput, confirmPasswordInput];

    inputsToClearErrors.forEach(input => {
        if (input) { 
            input.addEventListener('input', () => {
                firstname.style.borderColor = '';
                surname.style.borderColor = '';
                email.style.borderColor = '';
                firstPasswordInput.style.borderColor = '';
                confirmPasswordInput.style.borderColor = '';
            });
        }
    });

    
   


    // Set item to localStorage on form submit
    
try {

    // Signup event listener for checking first password and second password
    signupButton.addEventListener('click', (e) => {
    e.preventDefault(); 

    const password = firstPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Reset border colors
    firstname.style.borderColor = '';
    surname.style.borderColor = '';
    email.style.borderColor = '';
    firstPasswordInput.style.borderColor = '';
    confirmPasswordInput.style.borderColor = '';

    // Check if all fields if they are filled with input
    if (password === '' || confirmPassword === '' || !firstname.value || !surname.value || !email.value) {
        if (firstname.value === '') {
            firstname.style.borderColor = 'red'; 
        }
        if (surname.value === '') {
            surname.style.borderColor = 'red'; 
        }
        if (email.value === '') {
            email.style.borderColor = 'red'; 
        }
        if (password === '') {
            firstPasswordInput.style.borderColor = 'red'; 
        }
        if (confirmPassword === '') {
            confirmPasswordInput.style.borderColor = 'red'; 
        }
    } else if (password !== confirmPassword) {
        // Check if passwords match
        firstPasswordInput.style.borderColor = 'red'; 
        confirmPasswordInput.style.borderColor = 'red'; 
    } else if (!validateEmail(email.value)) {
        // Check if email is valid
        email.style.borderColor = 'red'; 
    } else {
        
        form.dispatchEvent(new Event('submit'));
    }
});
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formdata = {
            name: firstname.value,
            surname: surname.value,
            email: email.value,
            password: firstPasswordInput.value
        };

        localStorage.setItem('userdata', JSON.stringify(formdata));
        
        // Clear the input fields
        firstname.value = "";
        surname.value = "";
        email.value = "";
        firstPasswordInput.value = "";
        confirmPasswordInput.value = "";

        alert('signup successful');
        window.location = 'loginform.html'
    });
} catch (error){
    console.log(error.message)

} 


   
    // Login event listener
    console.log(loginButton);
    let userdata = "";

    if(loginButton){

    loginButton.addEventListener('click', (e) => {
        
        e.preventDefault();
        let userdata = JSON.parse(localStorage.getItem('userdata'));
        
        // Reset borderColor
        loginEmail.style.borderColor = ""
        loginPassword.style.borderColor = ""

        if (!userdata) {
            alert('Please sign up first');
            return;
        }
        if (loginEmail.value === '' || loginPassword.value === '') {
            loginEmail.style.borderColor = 'red'
            loginPassword.style.borderColor = 'red'
        } else if (loginEmail.value !== userdata.email || loginPassword.value !== userdata.password) {
            loginPassword.style.borderColor = 'red'
        } else {
            alert("Login Successful!");
            window.location = 'dashboard.html';
        }
    });
}

function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

});
