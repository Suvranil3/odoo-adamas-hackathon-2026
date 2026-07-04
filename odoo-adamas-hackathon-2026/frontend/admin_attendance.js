// admin_attendance.js
// Modular admin attendance page logic.
// Handles logout, date navigation, search filtering, selected employee preview, and request navigation.

document.addEventListener('DOMContentLoaded', function () {
    bindLogout();
    bindDateNavigation();
    bindSearch();
    bindViewAllRequests();
    loadSelectedEmployeeFromQuery();
});

/**
 * Bind the logout button behavior with confirmation.
 */
function bindLogout() {
    const logoutButton = document.getElementById('logout-btn');
    if (!logoutButton) return;

    logoutButton.addEventListener('click', function (event) {
        event.preventDefault();
        const confirmed = window.confirm('Are you sure you want to logout?');
        if (confirmed) {
            window.location.href = 'loginpage.html';
        }
    });
}

let currentDate = new Date();

/**
 * Bind previous / next buttons for the date label.
 */
function bindDateNavigation() {
    const prevBtn = document.getElementById('prev-month-btn');
    const nextBtn = document.getElementById('next-month-btn');
    const dateLabel = document.getElementById('date-label');
    if (!prevBtn || !nextBtn || !dateLabel) return;

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    function updateDateLabel() {
        dateLabel.textContent = `${currentDate.getDate()} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }

    prevBtn.addEventListener('click', function () {
        currentDate.setDate(currentDate.getDate() - 1);
        updateDateLabel();
    });

    nextBtn.addEventListener('click', function () {
        currentDate.setDate(currentDate.getDate() + 1);
        updateDateLabel();
    });

    updateDateLabel();
}

/**
 * Bind search input to filter attendance table rows.
 */
function bindSearch() {
    const searchInput = document.getElementById('attendance-search-input');
    const tableBody = document.querySelector('tbody');
    if (!searchInput || !tableBody) return;

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim().toLowerCase();
        tableBody.querySelectorAll('tr').forEach(function (row) {
            const rowText = row.textContent.toLowerCase();
            row.style.display = rowText.includes(query) ? '' : 'none';
        });
    });
}

/**
 * Load the selected employee details from URL query parameters.
 */
function loadSelectedEmployeeFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    if (!name) return;

    setText('selected-employee-name', name);
    setText('selected-employee-role', params.get('role'));
    setText('selected-employee-email', params.get('email'));
    setText('selected-employee-mobile', params.get('mobile'));
    setText('selected-employee-company', params.get('company'));
    setText('selected-employee-department', params.get('department'));
    setText('selected-employee-manager', params.get('manager'));
    setText('selected-employee-location', params.get('location'));

    const selectedCard = document.getElementById('selected-employee-card');
    const emptyCard = document.getElementById('selected-employee-empty');
    if (selectedCard && emptyCard) {
        selectedCard.classList.remove('hidden');
        emptyCard.classList.add('hidden');
    }
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value || '';
    }
}

/**
 * Link the "View All" request button to the Time Off page.
 */
function bindViewAllRequests() {
    const viewAllButton = document.getElementById('view-all-requests-btn');
    if (!viewAllButton) return;

    viewAllButton.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = 'time_off_section.html';
    });
}
