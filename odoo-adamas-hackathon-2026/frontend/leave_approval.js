// leave_approval.js
// Modular leave approval page logic.
// Handles logout, search, filters, request actions, and details modal.

document.addEventListener('DOMContentLoaded', function () {
    bindLogout();
    bindSearch();
    bindFilters();
    bindRequestActions();
    bindDetailsModal();
});

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

function bindSearch() {
    const searchInput = document.getElementById('leave-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', applyFilters);
}

function bindFilters() {
    const departmentFilter = document.getElementById('leave-department-filter');
    const statusFilter = document.getElementById('leave-status-filter');

    if (departmentFilter) {
        departmentFilter.addEventListener('change', applyFilters);
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilters);
    }
}

function applyFilters() {
    const searchValue = document.getElementById('leave-search')?.value.trim().toLowerCase() || '';
    const departmentValue = document.getElementById('leave-department-filter')?.value || '';
    const statusValue = document.getElementById('leave-status-filter')?.value || '';
    const rows = document.querySelectorAll('#leave-requests-table tr');

    rows.forEach(function (row) {
        const name = row.dataset.name.toLowerCase();
        const department = row.dataset.department;
        const status = row.dataset.status;
        const rowText = row.textContent.toLowerCase();

        const matchesSearch = !searchValue || rowText.includes(searchValue) || name.includes(searchValue);
        const matchesDepartment = !departmentValue || department === departmentValue;
        const matchesStatus = !statusValue || status === statusValue;

        row.style.display = matchesSearch && matchesDepartment && matchesStatus ? '' : 'none';
    });
}

function bindRequestActions() {
    const table = document.getElementById('leave-requests-table');
    if (!table) return;

    table.addEventListener('click', function (event) {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;

        const row = target.closest('tr');
        if (!row) return;

        if (target.classList.contains('approve-btn')) {
            event.preventDefault();
            handleApproval(row, 'Approved');
            return;
        }

        if (target.classList.contains('reject-btn')) {
            event.preventDefault();
            handleApproval(row, 'Rejected');
            return;
        }

        if (target.classList.contains('details-btn')) {
            event.preventDefault();
            openDetailsModal(row);
            return;
        }
    });
}

function handleApproval(row, newStatus) {
    const employeeName = row.dataset.name;
    const confirmed = window.confirm(`Are you sure you want to mark ${employeeName} as ${newStatus}?`);
    if (!confirmed) return;

    row.dataset.status = newStatus;
    const badge = row.querySelector('td:nth-child(6) span');
    if (badge) {
        badge.textContent = newStatus;
        badge.className = badgeClassForStatus(newStatus);
    }
    applyFilters();
}

function badgeClassForStatus(status) {
    if (status === 'Approved') {
        return 'inline-flex items-center px-3 py-1 rounded-full bg-[#D1E9FF] text-[#0B4A8E] text-xs font-semibold';
    }
    if (status === 'Rejected') {
        return 'inline-flex items-center px-3 py-1 rounded-full bg-[#FDE8E8] text-[#8B1D1D] text-xs font-semibold';
    }
    return 'inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold';
}

function bindDetailsModal() {
    const modal = document.getElementById('leave-details-modal');
    const closeBtn = document.getElementById('close-leave-details');

    if (!modal || !closeBtn) return;

    closeBtn.addEventListener('click', function (event) {
        event.preventDefault();
        closeModal(modal);
    });

    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
}

function openDetailsModal(row) {
    const modal = document.getElementById('leave-details-modal');
    if (!modal) return;

    setText('modal-employee-name', row.children[0].textContent.trim());
    setText('modal-leave-type', row.children[1].textContent.trim());
    setText('modal-start-date', row.children[2].textContent.trim());
    setText('modal-end-date', row.children[3].textContent.trim());
    setText('modal-reason', row.children[4].textContent.trim());
    setText('modal-status', row.children[5].textContent.trim());

    modal.classList.remove('hidden');
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

function closeModal(modal) {
    modal.classList.add('hidden');
}
