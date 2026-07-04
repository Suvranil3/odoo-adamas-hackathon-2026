// Employee landing page JS: handles Check IN / Check OUT UI updates
document.addEventListener('DOMContentLoaded', function () {
    const checkInBtn = document.getElementById('check-in-btn');
    const checkOutBtn = document.getElementById('check-out-btn');
    const statusIndicator = document.getElementById('status-indicator');
    const statusText = document.getElementById('status-text');
    const statusSince = document.getElementById('status-since');

    function formatTime(date) {
        const h = date.getHours();
        const m = date.getMinutes();
        const ampm = h >= 12 ? 'PM' : 'AM';
        const hh = ((h + 11) % 12 + 1); // 12-hour format
        const mm = m.toString().padStart(2, '0');
        return `${hh}:${mm} ${ampm}`;
    }

    function setCheckedIn() {
        if (statusIndicator) {
            statusIndicator.classList.remove('bg-red-500');
            statusIndicator.classList.add('bg-green-500');
        }
        if (statusText) statusText.textContent = 'Checked In';
        if (statusSince) statusSince.textContent = 'Since ' + formatTime(new Date());
    }

    function setCheckedOut() {
        if (statusIndicator) {
            statusIndicator.classList.remove('bg-green-500');
            statusIndicator.classList.add('bg-red-500');
        }
        if (statusText) statusText.textContent = 'Checked Out';
        if (statusSince) statusSince.textContent = 'Since ' + formatTime(new Date());
    }

    if (checkInBtn) checkInBtn.addEventListener('click', function (e) {
        e.preventDefault();
        setCheckedIn();
    });

    if (checkOutBtn) checkOutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        setCheckedOut();
    });
});
