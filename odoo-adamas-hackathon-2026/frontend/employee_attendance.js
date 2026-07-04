// Modular script for employee_attendance_section.html
// Handles logout, tab switching, search filtering, month navigation, and modal controls.

document.addEventListener('DOMContentLoaded', function () {
    bindLogout();
    bindTabs();
    bindMonthNavigation();
    bindRequestModalButtons();
    bindSearchFilter();
    initializeActiveTab();
});

/**
 * Bind logout button click behavior.
 * Shows confirmation and redirects to loginpage.html when confirmed.
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

/**
 * Setup tab buttons to toggle visible content sections.
 */
function bindTabs() {
    const attendanceTab = document.getElementById('tab-btn-attendance');
    const timeOffTab = document.getElementById('tab-btn-timeoff');

    if (attendanceTab) {
        attendanceTab.addEventListener('click', function () {
            switchTab('attendance');
        });
    }

    if (timeOffTab) {
        timeOffTab.addEventListener('click', function () {
            switchTab('timeoff');
        });
    }
}

/**
 * Show the requested tab and update active button styles.
 * @param {string} tabId
 */
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(function (tab) {
        tab.classList.toggle('active', tab.id === 'tab-' + tabId);
    });

    updateTabButtonStyles(tabId);
}

/**
 * Update tab button style to indicate the active tab.
 * @param {string} activeTabId
 */
function updateTabButtonStyles(activeTabId) {
    const attendanceTab = document.getElementById('tab-btn-attendance');
    const timeOffTab = document.getElementById('tab-btn-timeoff');

    if (attendanceTab) {
        attendanceTab.className = activeTabId === 'attendance'
            ? 'px-4 py-2 text-label-md font-label-md text-primary font-bold border-b-2 border-secondary-container transition-colors'
            : 'px-4 py-2 text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors';
    }

    if (timeOffTab) {
        timeOffTab.className = activeTabId === 'timeoff'
            ? 'px-4 py-2 text-label-md font-label-md text-primary font-bold border-b-2 border-secondary-container transition-colors'
            : 'px-4 py-2 text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors';
    }
}

/**
 * Ensure the default tab is active on page load.
 */
function initializeActiveTab() {
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
        const activeId = activeTab.id.replace('tab-', '');
        updateTabButtonStyles(activeId);
    } else {
        switchTab('attendance');
    }
}

/**
 * Bind previous/next month button behavior and month select changes.
 */
function bindMonthNavigation() {
    const prevBtn = document.getElementById('prev-month-btn');
    const nextBtn = document.getElementById('next-month-btn');
    const monthSelect = document.getElementById('month-select');

    if (!monthSelect) return;

    const months = Array.from(monthSelect.options).map(option => option.value);
    let currentIndex = monthSelect.selectedIndex;

    function setMonth(index) {
        if (index < 0 || index >= months.length) return;
        currentIndex = index;
        monthSelect.selectedIndex = currentIndex;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            setMonth(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            setMonth(currentIndex + 1);
        });
    }

    monthSelect.addEventListener('change', function () {
        currentIndex = monthSelect.selectedIndex;
    });
}

/**
 * Filter attendance table rows based on the search input value.
 */
function bindSearchFilter() {
    const searchInput = document.querySelector('input[type="text"][placeholder="Search Employee"]');
    const table = document.querySelector('tbody');
    if (!searchInput || !table) return;

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim().toLowerCase();
        table.querySelectorAll('tr').forEach(function (row) {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(query) ? '' : 'none';
        });
    });
}

/**
 * Bind time off request modal button behavior.
 */
function bindRequestModalButtons() {
    const openBtn = document.getElementById('open-request-modal-btn');
    const closeBtn = document.getElementById('close-request-modal-btn');
    const discardBtn = document.getElementById('discard-request-btn');
    const modal = document.getElementById('request-modal');

    if (!modal) return;

    if (openBtn) {
        openBtn.addEventListener('click', function () {
            modal.classList.remove('hidden');
        });
    }

    [closeBtn, discardBtn].forEach(function (button) {
        if (button) {
            button.addEventListener('click', function () {
                modal.classList.add('hidden');
            });
        }
    });
}