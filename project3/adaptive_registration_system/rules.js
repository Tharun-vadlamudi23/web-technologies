const form = document.getElementById('registrationForm');
const roleSelect = document.getElementById('role');
const passwordInput = document.getElementById('password');

// Dynamic Rule Configuration
const roleRules = {
    Student: { minAge: 13, pswdRegex: /.{6,}/, pswdMsg: "At least 6 characters." },
    Teacher: { minAge: 21, pswdRegex: /^(?=.*[A-Z]).{8,}$/, pswdMsg: "8+ chars, 1 uppercase." },
    Admin: { minAge: 18, pswdRegex: /^(?=.*[A-Z])(?=.*[!@#$&*]).{10,}$/, pswdMsg: "10+ chars, uppercase, and symbol." }
};

// 1. DOM Manipulation: Show/Hide based on role
roleSelect.addEventListener('change', () => {
    const skillsSection = document.getElementById('skillsSection');
    // Hide skills for Admins, show for others
    skillsSection.style.display = roleSelect.value === 'Admin' ? 'none' : 'block';
    validateForm(); // Re-validate when rules change
});

// 2. Email Domain Validation
const isValidEmail = (email) => {
    const domainRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return domainRegex.test(email);
};

// 3. Dynamic Validation Feedback
const showError = (inputEl, message) => {
    const errorSpan = document.getElementById(`${inputEl.id}Error`);
    if (message) {
        inputEl.classList.add('invalid');
        errorSpan.textContent = message;
    } else {
        inputEl.classList.remove('invalid');
        errorSpan.textContent = "";
    }
};

// 4. Real-time Validation Function
const validateForm = () => {
    const role = roleSelect.value;
    const rules = roleRules[role];
    let isValid = true;

    // Age Check
    const age = document.getElementById('age').value;
    if (age < rules.minAge) {
        showError(document.getElementById('age'), `Min age for ${role} is ${rules.minAge}`);
        isValid = false;
    } else {
        showError(document.getElementById('age'), "");
    }

    // Password Strength Check
    if (!rules.pswdRegex.test(passwordInput.value)) {
        showError(passwordInput, rules.pswdMsg);
        isValid = false;
    } else {
        showError(passwordInput, "");
    }

    // Confirm Password
    const confirm = document.getElementById('confirmPassword');
    if (confirm.value !== passwordInput.value) {
        showError(confirm, "Passwords do not match");
        isValid = false;
    } else {
        showError(confirm, "");
    }

    return isValid;
};

// 5. Prevent Submission
form.addEventListener('submit', (e) => {
    if (!validateForm() || !isValidEmail(document.getElementById('email').value)) {
        e.preventDefault();
        alert("Please correct the errors before submitting.");
    } else {
        alert("Registration Successful!");
    }
});

// Real-time listeners for instant feedback
[passwordInput, document.getElementById('confirmPassword'), document.getElementById('age')].forEach(input => {
    input.addEventListener('input', validateForm);
});