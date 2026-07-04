const API_BASE_URL = 'http://localhost:3000';

// time_off.js
// External page logic for time_off_section.html.
// Handles employee flow, navigation, filters, modal, and logout.

let currentMonth = new Date();

document.addEventListener('DOMContentLoaded', function () {
    bindLogout();
    bindMonthNavigation();
    bindLeaveFilters();
    bindRequestModal();
    initializeMonthLabel();
    loadLeaveRequests();
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

function initializeMonthLabel() {
    const monthLabel = document.getElementById('month-label');
    if (!monthLabel) return;

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentText = monthLabel.textContent.trim();
    const parts = currentText.split(' ');
    if (parts.length === 2) {
        const monthIndex = monthNames.indexOf(parts[0]);
        const year = parseInt(parts[1], 10);
        if (!Number.isNaN(monthIndex) && !Number.isNaN(year)) {
            currentMonth = new Date(year, monthIndex, 1);
            return;
        }
    }
    currentMonth = new Date();
    monthLabel.textContent = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
}

let currentMonth = new Date();

function bindMonthNavigation() {
    const prevBtn = document.getElementById('prev-month-btn');
    const nextBtn = document.getElementById('next-month-btn');
    const todayBtn = document.getElementById('today-btn');
    const monthLabel = document.getElementById('month-label');
    if (!prevBtn || !nextBtn || !todayBtn || !monthLabel) return;

    prevBtn.addEventListener('click', function () {
        currentMonth.setMonth(currentMonth.getMonth() - 1);
        updateMonthLabel();
    });

    nextBtn.addEventListener('click', function () {
        currentMonth.setMonth(currentMonth.getMonth() + 1);
        updateMonthLabel();
    });

    todayBtn.addEventListener('click', function () {
        currentMonth = new Date();
        updateMonthLabel();
    });
}

function updateMonthLabel() {
    const monthLabel = document.getElementById('month-label');
    if (!monthLabel) return;
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    monthLabel.textContent = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
}

function bindLeaveFilters() {
    const searchInput = document.getElementById('search-input');
    const departmentFilter = document.getElementById('department-filter');
    const statusFilter = document.getElementById('status-filter');
    if (!searchInput || !departmentFilter || !statusFilter) return;

    searchInput.addEventListener('input', applyLeaveFilters);
    departmentFilter.addEventListener('change', applyLeaveFilters);
    statusFilter.addEventListener('change', applyLeaveFilters);
}

function applyLeaveFilters() {
    const searchInput = document.getElementById('search-input');
    const departmentFilter = document.getElementById('department-filter');
    const statusFilter = document.getElementById('status-filter');
    const leaveCards = document.querySelectorAll('[data-leave-card]');
    if (!leaveCards.length || !searchInput || !departmentFilter || !statusFilter) return;

    const query = searchInput.value.trim().toLowerCase();
    const department = departmentFilter.value;
    const status = statusFilter.value;

    leaveCards.forEach(function (card) {
        const employee = (card.dataset.employee || '').toLowerCase();
        const description = (card.dataset.description || '').toLowerCase();
        const cardDepartment = card.dataset.department || '';
        const cardStatus = card.dataset.status || '';

        const matchesQuery = !query || employee.includes(query) || description.includes(query);
        const matchesDepartment = !department || cardDepartment === department;
        const matchesStatus = !status || cardStatus === status;

        card.style.display = matchesQuery && matchesDepartment && matchesStatus ? '' : 'none';
    });
}

function bindRequestModal() {
    const openButton = document.getElementById('open-request-modal-btn');
    const closeButton = document.getElementById('close-request-modal-btn');
    const cancelButton = document.getElementById('cancel-request-btn');
    const modal = document.getElementById('timeoff-modal');
    const form = document.getElementById('timeoff-form');

    if (!modal || !form) return;

    if (openButton) {
        openButton.addEventListener('click', function () {
            modal.classList.remove('hidden');
        });
    }

    [closeButton, cancelButton].forEach(function (element) {
        if (element) {
            element.addEventListener('click', function () {
                closeModal(modal);
            });
        }
    });

    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    });

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const typeInput = document.getElementById('timeoff-type');
        const fromDateInput = document.getElementById('from-date');
        const toDateInput = document.getElementById('to-date');
        const reasonInput = document.getElementById('request-reason');

        if (!typeInput || !fromDateInput || !toDateInput || !reasonInput) return;

        const fromDate = new Date(fromDateInput.value);
        const toDate = new Date(toDateInput.value);
        const reason = reasonInput.value.trim();
        const leaveType = typeInput.value;
        const days = Math.max(1, Math.round((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1);

        if (fromDate.toString() === 'Invalid Date' || toDate.toString() === 'Invalid Date') {
            window.alert('Please select valid dates for your request.');
            return;
        }

        if (fromDate > toDate) {
            window.alert('The start date cannot be later than the end date.');
            return;
        }

        if (!reason) {
            window.alert('Please add a reason for your time off request.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/leaves`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${window.localStorage.getItem('hrms_token')}`
                },
                body: JSON.stringify({
                    leaveType,
                    startDate: fromDateInput.value,
                    endDate: toDateInput.value,
                    days,
                    reason
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Unable to submit leave request.');
            }

            window.alert('Your time off request has been submitted.');
            closeModal(modal);
            form.reset();
            loadLeaveRequests();
        } catch (error) {
            window.alert(error.message || 'Unable to submit leave request.');
        }
    });
}

async function loadLeaveRequests() {
    const token = window.localStorage.getItem('hrms_token');
    if (!token) {
        window.location.href = 'loginpage.html';
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/leaves/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Unable to load leave requests.');
        }

        const leaves = await response.json();
        renderLeaveRequests(leaves || []);
    } catch (error) {
        console.error(error);
    }
}

function renderLeaveRequests(leaves) {
    const container = document.getElementById('leave-request-list');
    if (!container) return;

    container.innerHTML = '';

    if (!leaves.length) {
        container.innerHTML = '<div class="text-sm text-on-surface-variant">No leave requests yet.</div>';
        return;
    }

    leaves.forEach(function (leave) {
        const card = document.createElement('div');
        card.className = 'rounded-lg border border-outline-variant p-4 bg-surface-white';
        card.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <div class="font-semibold text-primary">${leave.leave_type || 'Leave'}</div>
                <span class="px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(leave.status)}">${capitalize(leave.status || 'pending')}</span>
            </div>
            <div class="text-sm text-on-surface-variant">${leave.reason || 'No reason provided'}</div>
            <div class="text-sm text-on-surface-variant mt-1">${leave.start_date} to ${leave.end_date} • ${leave.days} days</div>
        `;
        container.appendChild(card);
    });
}

function getStatusClass(status) {
    if (!status) return 'bg-surface-container-low text-on-surface-variant';
    if (status === 'approved') return 'bg-secondary-container text-on-secondary-container';
    if (status === 'rejected') return 'bg-error-container text-error';
    return 'bg-surface-container-low text-on-surface-variant';
}

function capitalize(text) {
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
}

function closeModal(modal) {
    modal.classList.add('hidden');
}
