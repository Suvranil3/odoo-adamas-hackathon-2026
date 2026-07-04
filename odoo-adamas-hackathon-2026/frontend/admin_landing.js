// admin_landing.js
// Handles navigation and admin landing page interactions.

document.addEventListener('DOMContentLoaded', function () {
    bindLogoutLinks();
    bindEmployeeCards();
    bindDashboardButtons();
    bindProfileDropdown();
});

/**
 * Bind logout button and logout dropdown link.
 * Removes default navigation until confirmation is accepted.
 */
function bindLogoutLinks() {
    const logoutButton = document.getElementById('logout-btn');
    const logoutLink = document.getElementById('dropdown-logout-link');

    [logoutButton, logoutLink].forEach(function (element) {
        if (!element) return;

        element.addEventListener('click', function (event) {
            event.preventDefault();
            const confirmed = window.confirm('Are you sure you want to logout?');
            if (confirmed) {
                window.location.href = 'loginpage.html';
            }
        });
    });
}

/**
 * Ensure each employee card navigates to the correct details page.
 */
function bindEmployeeCards() {
    document.querySelectorAll('a[data-name]').forEach(function (anchor) {
        anchor.setAttribute('href', 'employee_details_page.html');
    });
}

/**
 * Bind dashboard call-to-action buttons to correct pages.
 */
function bindDashboardButtons() {
    const addNewButton = document.querySelector('a[href="employee_details_page.html"].inline-flex');
    if (addNewButton) {
        addNewButton.addEventListener('click', function () {
            window.location.href = 'employee_details_page.html';
        });
    }
}

/**
 * Replace profile dropdown links with employee flow and logout confirmation.
 */
function bindProfileDropdown() {
    const profileLink = document.querySelector('.group a[href="employee_details_page.html"]');
    if (profileLink) {
        profileLink.setAttribute('href', 'employee_details_page.html');
    }
}
