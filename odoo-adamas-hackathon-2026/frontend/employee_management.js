// employee_management.js
// Modular employee management page logic.
// Handles logout, search, filters, row actions, and add employee modal.

document.addEventListener('DOMContentLoaded', function () {
    bindLogout();
    bindSearch();
    bindFilters();
    bindRowActions();
    bindAddEmployeeModal();
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
    const searchInput = document.getElementById('employee-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', applyFilters);
}

function bindFilters() {
    const departmentFilter = document.getElementById('department-filter');
    const statusFilter = document.getElementById('status-filter');

    if (departmentFilter) {
        departmentFilter.addEventListener('change', applyFilters);
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilters);
    }
}

function applyFilters() {
    const searchValue = document.getElementById('employee-search')?.value.trim().toLowerCase() || '';
    const departmentValue = document.getElementById('department-filter')?.value || '';
    const statusValue = document.getElementById('status-filter')?.value || '';
    const rows = document.querySelectorAll('#employee-table-body tr');

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

function bindRowActions() {
    const tableBody = document.getElementById('employee-table-body');
    if (!tableBody) return;

    tableBody.addEventListener('click', function (event) {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;

        const row = target.closest('tr');
        if (!row) return;

        if (target.classList.contains('view-btn')) {
            event.preventDefault();
            window.location.href = 'employee_details_page.html';
            return;
        }

        if (target.classList.contains('edit-btn')) {
            event.preventDefault();
            window.alert('Edit employee is a prototype action.');
            return;
        }

        if (target.classList.contains('delete-btn')) {
            event.preventDefault();
            const confirmed = window.confirm(`Delete ${row.dataset.name}? This action cannot be undone.`);
            if (confirmed) {
                row.remove();
            }
            return;
        }
    });
}

function bindAddEmployeeModal() {
    const openButton = document.getElementById('open-add-employee-btn');
    const modal = document.getElementById('add-employee-modal');
    const closeButton = document.getElementById('close-add-employee-modal');
    const cancelButton = document.getElementById('cancel-add-employee');
    const form = document.getElementById('add-employee-form');

    if (!modal || !openButton || !closeButton || !cancelButton || !form) return;

    openButton.addEventListener('click', function () {
        modal.classList.remove('hidden');
    });

    [closeButton, cancelButton].forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            closeModal(modal);
        });
    });

    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nameInput = document.getElementById('employee-name');
        const emailInput = document.getElementById('employee-email');
        const departmentInput = document.getElementById('employee-department');
        const statusInput = document.getElementById('employee-status');
        const roleInput = document.getElementById('employee-role');
        const managerInput = document.getElementById('employee-manager');

        if (!nameInput || !emailInput || !departmentInput || !statusInput || !roleInput) return;

        const employeeName = nameInput.value.trim();
        const employeeDepartment = departmentInput.value;
        const employeeStatus = statusInput.value;
        const employeeRole = roleInput.value.trim();

        if (!employeeName || !employeeRole) {
            window.alert('Please enter a name and role for the employee.');
            return;
        }

        const tableBody = document.getElementById('employee-table-body');
        if (tableBody) {
            const row = document.createElement('tr');
            row.dataset.name = employeeName;
            row.dataset.department = employeeDepartment;
            row.dataset.status = employeeStatus;
            row.innerHTML = `
                <td class="py-3 px-4">${employeeName}</td>
                <td class="py-3 px-4">${employeeDepartment}</td>
                <td class="py-3 px-4">${employeeRole}</td>
                <td class="py-3 px-4">${employeeStatus}</td>
                <td class="py-3 px-4 text-right space-x-2">
                    <button class="view-btn bg-surface-white border border-outline-variant text-on-surface hover:bg-surface-container-low px-3 py-1 rounded text-sm">View</button>
                    <button class="edit-btn bg-primary text-on-primary hover:bg-[#121E2F] px-3 py-1 rounded text-sm">Edit</button>
                    <button class="delete-btn bg-error text-on-error hover:bg-[#9f1d1d] px-3 py-1 rounded text-sm">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
            applyFilters();
        }

        form.reset();
        closeModal(modal);
        window.alert('Employee added to the table in prototype mode.');
    });
}

function closeModal(modal) {
    modal.classList.add('hidden');
}
