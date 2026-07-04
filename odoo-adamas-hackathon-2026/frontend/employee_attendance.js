const API_BASE_URL = 'http://localhost:3000';

// Modular script for employee_attendance_section.html
// Handles logout, tab switching, search filtering, month navigation, and live attendance data.

document.addEventListener('DOMContentLoaded', function () {
    bindLogout();
    bindTabs();
    bindMonthNavigation();
    bindRequestModalButtons();
    bindSearchFilter();
    initializeActiveTab();
    loadAttendanceRecords();
});

function bindLogout() {
    const logoutButton = document.getElementById('logout-btn');
    if (!logoutButton) return;

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

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(function (tab) {
        tab.classList.toggle('active', tab.id === 'tab-' + tabId);
    });

    updateTabButtonStyles(tabId);
}

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

function initializeActiveTab() {
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
        const activeId = activeTab.id.replace('tab-', '');
        updateTabButtonStyles(activeId);
    } else {
        switchTab('attendance');
    }
}

function getAuthHeaders() {
    const token = window.localStorage.getItem('hrms_token');
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    };
}

async function loadAttendanceRecords() {
    const token = window.localStorage.getItem('hrms_token');
    if (!token) {
        window.location.href = 'loginpage.html';
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/attendance/me`, {
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Unable to load attendance records.');
        }

        const records = await response.json();
        renderAttendanceRecords(records || []);
    } catch (error) {
        console.error(error);
        window.alert(error.message || 'Unable to load attendance records.');
    }
}

function renderAttendanceRecords(records) {
    const tableBody = document.querySelector('#tab-attendance tbody');
    const monthSelect = document.getElementById('month-select');
    const summaryPresent = document.querySelector('#tab-attendance .bg-surface-container-low.border.border-outline-variant.min-w-\[120px\]:nth-child(1) .text-title-md');
    const summaryLeaves = document.querySelector('#tab-attendance .bg-surface-container-low.border.border-outline-variant.min-w-\[120px\]:nth-child(2) .text-title-md');
    const summaryWorking = document.querySelector('#tab-attendance .bg-surface-container-low.border.border-outline-variant.min-w-\[120px\]:nth-child(3) .text-title-md');

    if (!tableBody) return;

    tableBody.innerHTML = '';

    const months = [...new Set(records.map(function (record) {
        return formatMonthLabel(record.date);
    }))];

    if (monthSelect) {
        monthSelect.innerHTML = '';
        months.forEach(function (month) {
            const option = document.createElement('option');
            option.value = month;
            option.textContent = month;
            monthSelect.appendChild(option);
        });

        if (!months.length) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No records';
            monthSelect.appendChild(option);
        }
    }

    if (summaryPresent) {
        summaryPresent.textContent = String(records.filter(function (record) {
            return record.status === 'present' || (record.check_in && record.check_out);
        }).length);
    }

    if (summaryLeaves) {
        summaryLeaves.textContent = String(records.filter(function (record) {
            return record.status !== 'present' && record.status !== 'late';
        }).length);
    }

    if (summaryWorking) {
        summaryWorking.textContent = String(records.length || 0);
    }

    if (!records.length) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td class="p-4" colspan="5">No attendance records yet.</td>';
        tableBody.appendChild(emptyRow);
        return;
    }

    records.forEach(function (record) {
        const row = document.createElement('tr');
        row.dataset.month = formatMonthLabel(record.date);
        row.className = 'border-b border-outline-variant hover:bg-surface-container-lowest transition-colors';
        row.innerHTML = `
            <td class="p-4 font-medium">${formatDisplayDate(record.date)}</td>
            <td class="p-4">${formatTimeValue(record.check_in) || 'Missed'}</td>
            <td class="p-4">${formatTimeValue(record.check_out) || 'Missed'}</td>
            <td class="p-4">${calculateWorkHours(record.check_in, record.check_out)}</td>
            <td class="p-4 text-on-surface-variant">${calculateExtraHours(record.check_in, record.check_out)}</td>
        `;
        tableBody.appendChild(row);
    });

    applyMonthFilter();
}

function formatMonthLabel(dateValue) {
    if (!dateValue) return '';
    const date = new Date(dateValue);
    return `${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`;
}

function formatDisplayDate(dateValue) {
    if (!dateValue) return '';
    const date = new Date(dateValue);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
}

function formatTimeValue(timeValue) {
    if (!timeValue) return '';
    if (timeValue.includes(':')) {
        const [hours, minutes] = timeValue.split(':');
        return `${hours}:${minutes}`;
    }
    return timeValue;
}

function calculateWorkHours(checkIn, checkOut) {
    if (!checkIn || !checkOut) return '-';
    const [startHours, startMinutes] = checkIn.split(':').map(Number);
    const [endHours, endMinutes] = checkOut.split(':').map(Number);
    const startTotal = startHours * 60 + startMinutes;
    const endTotal = endHours * 60 + endMinutes;
    const diff = Math.max(0, endTotal - startTotal);
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function calculateExtraHours(checkIn, checkOut) {
    if (!checkIn || !checkOut) return '-';
    const [startHours] = checkIn.split(':').map(Number);
    const [endHours] = checkOut.split(':').map(Number);
    const diff = Math.max(0, endHours - startHours);
    if (diff <= 8) {
        return '00:00';
    }
    return `${String(diff - 8).padStart(2, '0')}:00`;
}

function bindMonthNavigation() {
    const prevBtn = document.getElementById('prev-month-btn');
    const nextBtn = document.getElementById('next-month-btn');
    const monthSelect = document.getElementById('month-select');

    if (!monthSelect) return;

    const months = Array.from(monthSelect.options).map(function (option) {
        return option.value;
    });
    let currentIndex = monthSelect.selectedIndex;

    function setMonth(index) {
        if (index < 0 || index >= months.length) return;
        currentIndex = index;
        monthSelect.selectedIndex = currentIndex;
        applyMonthFilter();
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
        applyMonthFilter();
    });
}

function applyMonthFilter() {
    const monthSelect = document.getElementById('month-select');
    if (!monthSelect) return;

    const selectedMonth = monthSelect.value;
    const rows = document.querySelectorAll('#tab-attendance tbody tr');
    rows.forEach(function (row) {
        if (!selectedMonth) {
            row.style.display = '';
            return;
        }
        row.style.display = row.dataset.month === selectedMonth ? '' : 'none';
    });
}

function bindSearchFilter() {
    const searchInput = document.querySelector('input[type="text"][placeholder="Search Employee"]');
    const table = document.querySelector('#tab-attendance tbody');
    if (!searchInput || !table) return;

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim().toLowerCase();
        table.querySelectorAll('tr').forEach(function (row) {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(query) ? '' : 'none';
        });
    });
}

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