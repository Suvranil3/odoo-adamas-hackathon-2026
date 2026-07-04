const API_BASE_URL = 'http://localhost:3000';

// Employee landing page JS: handles navigation and live attendance updates

document.addEventListener('DOMContentLoaded', function () {
    const checkInBtn = document.getElementById('check-in-btn');
    const checkOutBtn = document.getElementById('check-out-btn');
    const statusIndicator = document.getElementById('status-indicator');
    const statusText = document.getElementById('status-text');
    const statusSince = document.getElementById('status-since');
    const addNewBtn = document.getElementById('add-new-btn');
    const logoutLink = document.getElementById('dropdown-logout');
    const notificationsBtn = document.querySelector('button[title="Notifications"]');
    const helpBtn = document.querySelector('button[title="Help"]');
    const employeeCards = document.querySelectorAll('.employee-card');

    const token = window.localStorage.getItem('hrms_token');
    if (!token) {
        window.location.href = 'loginpage.html';
        return;
    }

    function navigateTo(url) {
        window.location.href = url;
    }

    function buildUrlWithParams(baseUrl, params) {
        const searchParams = new URLSearchParams(params);
        return `${baseUrl}?${searchParams.toString()}`;
    }

    function formatTime(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const normalizedHour = ((hours + 11) % 12) + 1;
        return `${normalizedHour}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }

    function setCheckedIn(sinceLabel) {
        if (statusIndicator) {
            statusIndicator.classList.remove('bg-red-500');
            statusIndicator.classList.add('bg-green-500');
        }
        if (statusText) statusText.textContent = 'Checked In';
        if (statusSince) statusSince.textContent = 'Since ' + (sinceLabel || formatTime(new Date()));
    }

    function setCheckedOut() {
        if (statusIndicator) {
            statusIndicator.classList.remove('bg-green-500');
            statusIndicator.classList.add('bg-red-500');
        }
        if (statusText) statusText.textContent = 'Checked Out';
        if (statusSince) statusSince.textContent = 'Since ' + formatTime(new Date());
    }

    function getAuthHeaders() {
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        };
    }

    async function loadAttendanceState() {
        try {
            const response = await fetch(`${API_BASE_URL}/attendance/me`, {
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error('Unable to load attendance state.');
            }

            const records = await response.json();
            const today = new Date();
            const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
            const todayRecord = Array.isArray(records) ? records.find(function (record) {
                return record.date === todayKey;
            }) : null;

            if (todayRecord && todayRecord.check_in && !todayRecord.check_out) {
                setCheckedIn(todayRecord.check_in);
                return;
            }

            setCheckedOut();
        } catch (error) {
            console.error(error);
        }
    }

    async function submitAttendance(endpoint) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: getAuthHeaders()
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Attendance update failed.');
            }

            if (endpoint.includes('checkin')) {
                setCheckedIn(data.attendance?.check_in || formatTime(new Date()));
            } else {
                setCheckedOut();
            }
        } catch (error) {
            window.alert(error.message || 'Attendance update failed.');
        }
    }

    function handleEmployeeCardClick(event) {
        event.preventDefault();
        const card = event.currentTarget;
        const params = {
            name: card.dataset.name || '',
            role: card.dataset.role || '',
            email: card.dataset.email || '',
            mobile: card.dataset.mobile || '',
            company: card.dataset.company || '',
            department: card.dataset.department || '',
            manager: card.dataset.manager || '',
            location: card.dataset.location || ''
        };
        const detailsUrl = buildUrlWithParams('employee_details_page.html', params);
        navigateTo(detailsUrl);
    }

    function handleLogoutClick(event) {
        const userConfirmed = window.confirm('Do you want to log out and return to the login page?');
        if (!userConfirmed) {
            event.preventDefault();
            return;
        }
        window.localStorage.removeItem('hrms_token');
        window.localStorage.removeItem('hrms_user');
        navigateTo('loginpage.html');
    }

    function handleAddNewClick(event) {
        event.preventDefault();
        navigateTo('employee_details_page.html');
    }

    if (checkInBtn) {
        checkInBtn.addEventListener('click', function (event) {
            event.preventDefault();
            submitAttendance('/attendance/checkin');
        });
    }

    if (checkOutBtn) {
        checkOutBtn.addEventListener('click', function (event) {
            event.preventDefault();
            submitAttendance('/attendance/checkout');
        });
    }

    if (addNewBtn) {
        addNewBtn.addEventListener('click', handleAddNewClick);
    }

    if (logoutLink) {
        logoutLink.addEventListener('click', handleLogoutClick);
    }

    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', function (event) {
            event.preventDefault();
            window.alert('Notifications are synced with the backend when available.');
        });
    }

    if (helpBtn) {
        helpBtn.addEventListener('click', function (event) {
            event.preventDefault();
            window.alert('Help is currently available through the HR portal.');
        });
    }

    employeeCards.forEach(function (card) {
        card.addEventListener('click', handleEmployeeCardClick);
    });

    loadAttendanceState();
});
