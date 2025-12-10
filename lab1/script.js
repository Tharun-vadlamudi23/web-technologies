// script.js

// Wait until DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const passwordIcon = togglePassword ? togglePassword.querySelector('i') : null;
    const formSummaryError = document.getElementById('formSummaryError');

    // Helper: set error for a field
    function setError(inputId, message) {
        const input = document.getElementById(inputId);
        const errorElement = document.getElementById(inputId + 'Error');

        if (input) {
            input.classList.add('error');
        }
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    // Helper: clear error for a field
    function clearError(inputId) {
        const input = document.getElementById(inputId);
        const errorElement = document.getElementById(inputId + 'Error');

        if (input) {
            input.classList.remove('error');
        }
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    // Helper: clear all errors
    function clearAllErrors() {
        const fields = ['fullName', 'email', 'phone', 'password', 'confirmPassword'];
        fields.forEach(id => clearError(id));

        const termsError = document.getElementById('termsError');
        if (termsError) {
            termsError.textContent = '';
        }

        if (formSummaryError) {
            formSummaryError.style.display = 'none';
            formSummaryError.textContent = '';
        }
    }

    // Password eye toggle
    if (togglePassword && passwordInput && passwordIcon) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            if (type === 'text') {
                passwordIcon.classList.remove('fa-eye');
                passwordIcon.classList.add('fa-eye-slash');
            } else {
                passwordIcon.classList.remove('fa-eye-slash');
                passwordIcon.classList.add('fa-eye');
            }
        });
    }

    // Form validation
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (e) {
            e.preventDefault(); // stop actual submit

            clearAllErrors();

            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;

            let isValid = true;
            const errorList = [];

            // Full name
            if (fullName === '') {
                isValid = false;
                setError('fullName', 'Full name is required.');
                errorList.push('Full name is required.');
            }

            // Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                isValid = false;
                setError('email', 'Email address is required.');
                errorList.push('Email address is required.');
            } else if (!emailRegex.test(email)) {
                isValid = false;
                setError('email', 'Please enter a valid email address.');
                errorList.push('Please enter a valid email address.');
            }

            // Phone
            const digitsOnly = phone.replace(/\D/g, '');
            const phoneRegex = /^[0-9]{10}$/;
            if (digitsOnly === '') {
                isValid = false;
                setError('phone', 'Phone number is required.');
                errorList.push('Phone number is required.');
            } else if (!phoneRegex.test(digitsOnly)) {
                isValid = false;
                setError('phone', 'Please enter a valid 10-digit phone number.');
                errorList.push('Please enter a valid 10-digit phone number.');
            }

            // Password
            if (password === '') {
                isValid = false;
                setError('password', 'Password is required.');
                errorList.push('Password is required.');
            } else if (password.length < 6) {
                isValid = false;
                setError('password', 'Password must be at least 6 characters long.');
                errorList.push('Password must be at least 6 characters long.');
            }

            // Confirm password
            if (confirmPassword === '') {
                isValid = false;
                setError('confirmPassword', 'Please confirm your password.');
                errorList.push('Please confirm your password.');
            } else if (password !== '' && confirmPassword !== password) {
                isValid = false;
                setError('confirmPassword', 'Passwords do not match.');
                errorList.push('Passwords do not match.');
            }

            // Terms
            if (!agreeTerms) {
                isValid = false;
                const termsError = document.getElementById('termsError');
                if (termsError) {
                    termsError.textContent = 'You must agree to the Terms and Privacy Policy.';
                }
                errorList.push('You must agree to the Terms and Privacy Policy.');
            }

            // If there are errors, show all of them in summary box
            if (!isValid) {
                if (formSummaryError) {
                    formSummaryError.style.display = 'block';
                    formSummaryError.innerHTML = 'Please fix the following errors:<br>• ' + errorList.join('<br>• ');
                }
                // Focus first invalid field
                const firstErrorField = document.querySelector('.form-control.error');
                if (firstErrorField) {
                    firstErrorField.focus();
                }
                return;
            }

            // If everything is valid: go to Thank You page
            window.location.href = 'thankyou.html';
        });
    }
});
