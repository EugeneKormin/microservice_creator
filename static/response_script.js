document.addEventListener('DOMContentLoaded', function() {

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const programIdeaForm = document.getElementById('programIdeaForm');
    const ideaDescription = document.getElementById('ideaDescription');
    const generatedCodeContainer = document.getElementById('generatedCodeContainer');
    const gmailLoginButton = document.getElementById('gmailLoginButton');
    const loginContainer = document.getElementById('loginContainer');
    const registerContainer = document.getElementById('registerContainer');
    const userGreetingContainer = document.getElementById('userGreetingContainer');
    const userName = document.getElementById('userName');
    const userRole = document.getElementById('userRole');
    const logoutButton = document.getElementById('logoutButton');
    const viewHistoryButton = document.getElementById('viewHistoryButton');

    let userRoleGlobal = null;

    function updateUIBasedOnRole(role) {
        userRoleGlobal = role;
        const adminFeatures = document.querySelectorAll('.admin-only');
        const vipFeatures = document.querySelectorAll('.vip-only');
        const trialFeatures = document.querySelectorAll('.trial-only');

        switch(role) {
            case 'admin':
                adminFeatures.forEach(el => el.style.display = 'block');
                vipFeatures.forEach(el => el.style.display = 'block');
                trialFeatures.forEach(el => el.style.display = 'block');
                viewHistoryButton.style.display = 'block';
                break;
            case 'vip':
                adminFeatures.forEach(el => el.style.display = 'none');
                vipFeatures.forEach(el => el.style.display = 'block');
                trialFeatures.forEach(el => el.style.display = 'block');
                viewHistoryButton.style.display = 'block';
                break;
            case 'trial':
                adminFeatures.forEach(el => el.style.display = 'none');
                vipFeatures.forEach(el => el.style.display = 'none');
                trialFeatures.forEach(el => el.style.display = 'block');
                viewHistoryButton.style.display = 'none';
                break;
            default:
                adminFeatures.forEach(el => el.style.display = 'none');
                vipFeatures.forEach(el => el.style.display = 'none');
                trialFeatures.forEach(el => el.style.display = 'none');
                viewHistoryButton.style.display = 'none';
        }
    }

    function fetchUserInfo() {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log('User info:', data);
                userName.textContent = data.username;
                userRole.textContent = data.role;
                updateUIBasedOnRole(data.role);
                loginContainer.style.display = 'none';
                registerContainer.style.display = 'none';
                userGreetingContainer.style.display = 'block';
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
                localStorage.removeItem('token');
            });
        }
    }

    // Check if user is logged in on page load
    fetchUserInfo();

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('registerUsername').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const role = document.getElementById('registerRole').value;

            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                    role: role
                }),
            })
            .then(response => {
                console.log('response:', response);
                response.json();
            })
            .then(data => {
                console.log('Registration successful:', data);
                alert('Registration successful! Please log in.');
                registerForm.reset();
            })
            .catch(error => {
                console.error('Registration error:', error);
                alert('Registration failed. Please try again.');
            });
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'username': username,
                    'password': password,
                })
            })
            .then(response => {
                console.log('response:', response);
                response.json()
            })
            .then(data => {
                console.log('Login successful:', data);
                localStorage.setItem('token', data.access_token);
                fetchUserInfo();
            })
            .catch(error => {
                console.error('Login error:', error);
                alert('Login failed. Please check your credentials and try again.');
            });
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('token');
            userGreetingContainer.style.display = 'none';
            loginContainer.style.display = 'block';
            registerContainer.style.display = 'block';
            updateUIBasedOnRole(null);
        });
    }

    if (gmailLoginButton) {
        gmailLoginButton.addEventListener('click', function() {
            window.location.href = 'https://accounts.google.com/signup';
        });
    }

    if (programIdeaForm) {
        programIdeaForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if (!ideaDescription) {
                console.error('Idea description input not found');
                return;
            }

            const ideaDescriptionValue = ideaDescription.value;
            const token = localStorage.getItem('token');

            fetch('/critiq/api/generate-reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ideaDescription: ideaDescriptionValue
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Generated reply:', data);
                if (generatedCodeContainer) {
                    generatedCodeContainer.textContent = data.generatedCode;
                    generatedCodeContainer.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error generating reply:', error);
                alert('Failed to generate reply. Please try again.');
            });
        });
    }
});

