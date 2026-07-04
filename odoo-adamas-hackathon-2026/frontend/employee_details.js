// Modular script for employee_details_page.html
// Handles query param hydration and logout confirmation for the employee profile page.

document.addEventListener('DOMContentLoaded', function () {
    bindLogout();
    hydrateProfileFromQuery();
});

/**
 * Bind logout button click behavior.
 * Shows a confirmation dialog and navigates to loginpage.html if confirmed.
 */
function bindLogout() {
    const logoutButton = document.getElementById('logout-btn');
    if (!logoutButton) {
        return;
    }

    logoutButton.addEventListener('click', function (event) {
        event.preventDefault();
        const confirmed = window.confirm('Are you sure you want to logout?');
        if (confirmed) {
            window.location.href = 'loginpage.html';
        }
    });
}

/**
 * Read a query parameter by key from the current URL.
 * @param {string} key
 * @returns {string}
 */
function getQueryParam(key) {
    return new URLSearchParams(window.location.search).get(key) || '';
}

/**
 * Update profile fields on the page from query params if present.
 */
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
