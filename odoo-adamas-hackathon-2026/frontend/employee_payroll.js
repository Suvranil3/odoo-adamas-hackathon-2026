// employee_payroll.js
// Modular employee payroll page logic.
// Handles logout, month filtering, and payslip actions.

document.addEventListener('DOMContentLoaded', function () {
    bindLogout();
    bindPayslipActions();
    bindMonthFilter();
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

function bindPayslipActions() {
    const downloadButton = document.getElementById('download-payslip-btn');
    const viewButton = document.getElementById('view-payslip-btn');

    if (downloadButton) {
        downloadButton.addEventListener('click', function () {
            window.alert('Payslip download is a prototype action.');
        });
    }

    if (viewButton) {
        viewButton.addEventListener('click', function () {
            window.alert('View Payslip is a prototype action.');
        });
    }
}

function bindMonthFilter() {
    const monthFilter = document.getElementById('payroll-month-filter');
    if (!monthFilter) return;

    monthFilter.addEventListener('change', function () {
        const selectedMonth = monthFilter.value;
        const rows = document.querySelectorAll('#salary-history-body tr');
        rows.forEach(function (row) {
            row.style.display = row.dataset.month === selectedMonth ? '' : 'none';
        });
    });
}
