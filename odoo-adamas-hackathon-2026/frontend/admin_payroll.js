// admin_payroll.js
// Modular admin payroll page logic.
// Handles logout, search and filter, status updates, and export prototype.

document.addEventListener('DOMContentLoaded', function () {
    bindLogout();
    bindFilters();
    bindTableActions();
    bindExport();
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

function bindFilters() {
    const searchInput = document.getElementById('payroll-search');
    const departmentFilter = document.getElementById('payroll-department-filter');
    const monthFilter = document.getElementById('payroll-month-filter');
    const statusFilter = document.getElementById('payroll-status-filter');

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    if (departmentFilter) {
        departmentFilter.addEventListener('change', applyFilters);
    }
    if (monthFilter) {
        monthFilter.addEventListener('change', applyFilters);
    }
    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilters);
    }
}

function applyFilters() {
    const searchValue = document.getElementById('payroll-search')?.value.trim().toLowerCase() || '';
    const departmentValue = document.getElementById('payroll-department-filter')?.value || '';
    const monthValue = document.getElementById('payroll-month-filter')?.value || '';
    const statusValue = document.getElementById('payroll-status-filter')?.value || '';
    const rows = document.querySelectorAll('#admin-payroll-table tr');

    rows.forEach(function (row) {
        const name = row.dataset.name.toLowerCase();
        const department = row.dataset.department;
        const month = row.dataset.month;
        const status = row.dataset.status;
        const rowText = row.textContent.toLowerCase();

        const matchesSearch = !searchValue || rowText.includes(searchValue) || name.includes(searchValue);
        const matchesDepartment = !departmentValue || department === departmentValue;
        const matchesMonth = !monthValue || month === monthValue;
        const matchesStatus = !statusValue || status === statusValue;

        row.style.display = matchesSearch && matchesDepartment && matchesMonth && matchesStatus ? '' : 'none';
    });
}

function bindTableActions() {
    const table = document.getElementById('admin-payroll-table');
    if (!table) return;

    table.addEventListener('click', function (event) {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;

        const row = target.closest('tr');
        if (!row) return;

        if (target.classList.contains('view-payroll-btn')) {
            event.preventDefault();
            window.alert('View Payroll is a prototype action.');
            return;
        }

        if (target.classList.contains('mark-paid-btn')) {
            event.preventDefault();
            const confirmed = window.confirm(`Mark ${row.dataset.name} as paid?`);
            if (!confirmed) return;
            row.dataset.status = 'Paid';
            const badge = row.querySelector('td:nth-child(5) span');
            if (badge) {
                badge.textContent = 'Paid';
                badge.className = 'inline-flex items-center px-3 py-1 rounded-full bg-[#D1E9FF] text-[#0B4A8E] text-xs font-semibold';
            }
            applyFilters();
            return;
        }
    });
}

function bindExport() {
    const exportButton = document.getElementById('export-payroll-btn');
    if (!exportButton) return;

    exportButton.addEventListener('click', function () {
        window.alert('Payroll export is a prototype action.');
    });
}
