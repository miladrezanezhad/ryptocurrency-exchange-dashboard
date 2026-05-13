/* assets/js/auth.js */
document.addEventListener('DOMContentLoaded', function () {
    const forgotForm = document.getElementById('forgotForm');
    if (forgotForm) {
        forgotForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const errorMsg = document.getElementById('errorMsg');
            const errorText = document.getElementById('errorText');
            const resetBtn = document.getElementById('resetBtn');
            const spinner = document.getElementById('spinner');
            errorMsg.style.display = 'none';
            if (!email) { errorText.textContent = 'Please enter your email address.'; errorMsg.style.display = 'flex'; return }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errorText.textContent = 'Please enter a valid email address.'; errorMsg.style.display = 'flex'; return }
            resetBtn.disabled = true; spinner.style.display = 'inline-block';
            setTimeout(function () {
                resetBtn.disabled = false; spinner.style.display = 'none';
                document.getElementById('formSection').style.display = 'none';
                document.getElementById('sentEmail').textContent = email;
                document.getElementById('successMsg').style.display = 'block';
            }, 1500);
        });
    }
    const tryAgainLink = document.getElementById('tryAgainLink');
    if (tryAgainLink) {
        tryAgainLink.addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('formSection').style.display = 'block';
            document.getElementById('successMsg').style.display = 'none';
            document.getElementById('email').value = '';
            document.getElementById('errorMsg').style.display = 'none';
        });
    }
});