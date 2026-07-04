function togglePasswordVisibility() {

    const passwordInput = document.getElementById("password");
    const visibilityIcon = document.getElementById("visibility-icon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        visibilityIcon.textContent = "visibility_off";
    } else {
        passwordInput.type = "password";
        visibilityIcon.textContent = "visibility";
    }

}

// Redirect forms with `data-redirect` attribute to target page after submit (mock login)
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('form[data-redirect]').forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const target = form.getAttribute('data-redirect');
            if (target) window.location.href = target;
        });
    });
});