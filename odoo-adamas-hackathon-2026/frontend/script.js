const API_BASE_URL = 'http://localhost:3000';

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const visibilityIcon = document.getElementById('visibility-icon');

    if (!passwordInput || !visibilityIcon) return;

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        visibilityIcon.textContent = 'visibility_off';
    } else {
        passwordInput.type = 'password';
        visibilityIcon.textContent = 'visibility';
    }
}

function setStoredAuth(data) {
    window.localStorage.setItem('hrms_token', data.token);
    window.localStorage.setItem('hrms_user', JSON.stringify({
        employeeId: data.employeeId,
        employeeName: data.employeeName,
        role: data.role
    }));
}

function clearStoredAuth() {
    window.localStorage.removeItem('hrms_token');
    window.localStorage.removeItem('hrms_user');
}

function getLoginIdentifier(form) {
    const candidate = form.querySelector('input[name="employeeId"], input[name="email"], input[id="email"], input[id="employeeId"]');
    return candidate ? candidate.value.trim() : '';
}

function getPassword(form) {
    const passwordInput = form.querySelector('input[type="password"]');
    return passwordInput ? passwordInput.value : '';
}

function redirectAfterLogin(role, fallbackTarget) {
    const target = role === 'admin' ? 'admin_landing_page.html' : fallbackTarget || 'employee_landing_page.html';
    window.location.href = target;
}

// Submit login forms to the live authentication endpoint.
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('form[data-redirect]').forEach(function (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const target = form.getAttribute('data-redirect') || 'employee_landing_page.html';
            const employeeId = getLoginIdentifier(form);
            const password = getPassword(form);

            if (!employeeId || !password) {
                window.alert('Please enter your employee ID and password.');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        employeeId,
                        password
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Unable to sign in right now.');
                }

                setStoredAuth(data);
                redirectAfterLogin(data.role, target);
            } catch (error) {
                console.error(error);
                window.alert(error.message || 'Unable to sign in right now.');
            }
        });
    });
});