const API_BASE_URL = 'http://localhost:3000';

// Modular script for employee_details_page.html
// Handles backend profile hydration and logout confirmation for the employee profile page.

document.addEventListener('DOMContentLoaded', function () {
    bindLogout();
    hydrateProfileFromQuery();
    loadProfileFromBackend();
});

function bindLogout() {
    const logoutButton = document.getElementById('logout-btn');
    if (!logoutButton) {
        return;
    }

    logoutButton.addEventListener('click', function (event) {
        event.preventDefault();
        const confirmed = window.confirm('Are you sure you want to logout?');
        if (confirmed) {
            window.localStorage.removeItem('hrms_token');
            window.localStorage.removeItem('hrms_user');
            window.location.href = 'loginpage.html';
        }
    });
}

function getQueryParam(key) {
    return new URLSearchParams(window.location.search).get(key) || '';
}

function hydrateProfileFromQuery() {
    const fields = {
        name: 'employee-name',
        role: 'employee-role',
        email: 'employee-email',
        mobile: 'employee-mobile',
        company: 'employee-company',
        department: 'employee-department',
        manager: 'employee-manager',
        location: 'employee-location'
    };

    Object.keys(fields).forEach(function (paramKey) {
        const elementId = fields[paramKey];
        const value = getQueryParam(paramKey);
        if (value) {
            const element = document.getElementById(elementId);
            if (element) {
                element.textContent = value;
            }
        }
    });
}

async function loadProfileFromBackend() {
    const token = window.localStorage.getItem('hrms_token');
    if (!token) {
        window.location.href = 'loginpage.html';
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/employees/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Unable to load profile data.');
        }

        const profile = await response.json();
        populateProfile(profile);
    } catch (error) {
        console.error(error);
    }
}

function populateProfile(profile) {
    if (!profile) return;

    const map = [
        ['employee-name', profile.full_name || profile.employee_name || ''],
        ['employee-role', profile.designation || profile.role || ''],
        ['employee-email', profile.email || ''],
        ['employee-mobile', profile.phone || ''],
        ['employee-company', 'Adamas Solutions'],
        ['employee-department', profile.department || ''],
        ['employee-manager', 'HR Team'],
        ['employee-location', 'Bengaluru, India']
    ];

    map.forEach(function ([elementId, value]) {
        const element = document.getElementById(elementId);
        if (element && value) {
            element.textContent = value;
        }
    });

    const loginElement = document.getElementById('employee-login');
    if (loginElement && profile.employee_code) {
        loginElement.textContent = profile.employee_code;
    }
}
