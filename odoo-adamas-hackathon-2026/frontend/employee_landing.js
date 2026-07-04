// Employee landing page JS: handles navigation and Check IN / Check OUT UI updates

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

    // Navigate to a page using window.location
    function navigateTo(url) {
        window.location.href = url;
    }

    // Build a URL with query string parameters
    function buildUrlWithParams(baseUrl, params) {
        const searchParams = new URLSearchParams(params);
        return `${baseUrl}?${searchParams.toString()}`;
    }

    // Format current time to 12-hour display
    function formatTime(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const normalizedHour = ((hours + 11) % 12) + 1;
        return `${normalizedHour}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }

    // Update landing page attendance state to checked in
    function setCheckedIn() {
        if (statusIndicator) {
            statusIndicator.classList.remove('bg-red-500');
            statusIndicator.classList.add('bg-green-500');
        }
        if (statusText) statusText.textContent = 'Checked In';
        if (statusSince) statusSince.textContent = 'Since ' + formatTime(new Date());
    }

    // Update landing page attendance state to checked out
    function setCheckedOut() {
        if (statusIndicator) {
            statusIndicator.classList.remove('bg-green-500');
            statusIndicator.classList.add('bg-red-500');
        }
        if (statusText) statusText.textContent = 'Checked Out';
        if (statusSince) statusSince.textContent = 'Since ' + formatTime(new Date());
    }

    // Handle employee card click by passing profile data into the details page URL
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

    // Confirm logout before navigating back to the login page
    function handleLogoutClick(event) {
        const userConfirmed = window.confirm('Do you want to log out and return to the login page?');
        if (!userConfirmed) {
            event.preventDefault();
            return;
        }
        navigateTo('loginpage.html');
    }

    // Navigate from Add New button to employee details page
    function handleAddNewClick(event) {
        event.preventDefault();
        navigateTo('employee_details_page.html');
    }

    if (checkInBtn) {
        checkInBtn.addEventListener('click', function (event) {
            event.preventDefault();
            setCheckedIn();
        });
    }

    if (checkOutBtn) {
        checkOutBtn.addEventListener('click', function (event) {
            event.preventDefault();
            setCheckedOut();
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
            window.alert('Notifications are not available in the prototype.');
        });
    }

    if (helpBtn) {
        helpBtn.addEventListener('click', function (event) {
            event.preventDefault();
            window.alert('Help is not available in the prototype.');
        });
    }

    employeeCards.forEach(function (card) {
        card.addEventListener('click', handleEmployeeCardClick);
    });
});
