function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!email || !password) { alert('Please fill in all fields.'); return }
    if (password.length < 8) { alert('Password must be at least 8 characters.'); return }
    alert('Login successful! Welcome back, Trader.');
    window.location.href = 'index.html';
}