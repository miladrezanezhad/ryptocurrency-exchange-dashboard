//index page
const coins = [{ name: 'BTC', price: 67845.32, change: 2.45 }, { name: 'ETH', price: 3567.21, change: 1.89 }, { name: 'BNB', price: 598.45, change: -0.78 }, { name: 'SOL', price: 142.78, change: 5.32 }, { name: 'ADA', price: 0.6234, change: -1.23 }, { name: 'XRP', price: 0.5234, change: 3.45 }, { name: 'DOGE', price: 0.1234, change: 8.90 }, { name: 'DOT', price: 7.89, change: -2.34 }, { name: 'AVAX', price: 34.56, change: 1.67 }, { name: 'MATIC', price: 0.89, change: -0.45 }, { name: 'LINK', price: 14.56, change: 4.56 }, { name: 'UNI', price: 7.23, change: 2.34 }, { name: 'ATOM', price: 9.78, change: -1.89 }, { name: 'LTC', price: 78.90, change: 0.67 }, { name: 'NEAR', price: 5.67, change: 12.34 }];
const track = document.getElementById('tickerTrack');
coins.forEach(c => { const cl = c.change >= 0 ? 'positive' : 'negative'; const s = c.change >= 0 ? '+' : ''; track.innerHTML += `<div class="ticker-item"><span class="ticker-pair">${c.name}/USDT</span><span class="ticker-price">$${c.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span><span class="ticker-change ${cl}">${s}${c.change}%</span></div>` });
track.innerHTML += track.innerHTML;
const ctx = document.getElementById('mainChart');
if (ctx) { const data = []; const labels = []; let price = 67000; for (let i = 30; i >= 0; i--) { price += (Math.random() - 0.5) * 500; data.push(price); labels.push(`${i}d ago`) } const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 350); gradient.addColorStop(0, 'rgba(99,102,241,0.3)'); gradient.addColorStop(1, 'rgba(99,102,241,0)'); new Chart(ctx, { type: 'line', data: { labels, datasets: [{ label: 'BTC/USDT', data, borderColor: '#818cf8', backgroundColor: gradient, borderWidth: 2, tension: 0.4, fill: true, pointRadius: 0, pointHoverRadius: 6, pointHoverBackgroundColor: '#818cf8', pointHoverBorderColor: '#fff', pointHoverBorderWidth: 2 }] }, options: { responsive: true, maintainAspectRatio: false, interaction: { intersect: false, mode: 'index' }, plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(15,20,45,0.95)', titleColor: '#94a3b8', bodyColor: '#f1f5f9', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, padding: 12, displayColors: false, callbacks: { label: function (ctx) { return '$' + ctx.parsed.y.toFixed(2) } } } }, scales: { x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8', font: { size: 10 }, maxTicksLimit: 8 } }, y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8', font: { size: 10 }, callback: function (v) { return '$' + v.toLocaleString() } } } } } }) }

//login page
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!email || !password) { alert('Please fill in all fields.'); return }
    if (password.length < 8) { alert('Password must be at least 8 characters.'); return }
    alert('Login successful! Welcome back, Trader.');
    window.location.href = 'index.html';
}

//register page
function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const bar = document.getElementById('strengthBar');
    const text = document.getElementById('strengthText');
    bar.className = 'strength-bar';
    if (password.length === 0) { bar.style.width = '0%'; text.textContent = 'Min 8 characters'; text.style.color = '#94a3b8'; return }
    if (password.length < 6) { bar.classList.add('weak'); text.textContent = 'Weak - Add more characters'; text.style.color = '#ef4444' }
    else if (password.length < 8 || !(/[A-Z]/.test(password) && /[0-9]/.test(password))) { bar.classList.add('medium'); text.textContent = 'Medium - Add uppercase & numbers'; text.style.color = '#f59e0b' }
    else { bar.classList.add('strong'); text.textContent = 'Strong password!'; text.style.color = '#10b981' }
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (confirmPassword) checkPasswordMatch();
}
function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    const matchText = document.getElementById('matchText');
    if (confirm && password !== confirm) { matchText.style.display = 'block' }
    else { matchText.style.display = 'none' }
}
document.getElementById('confirmPassword').addEventListener('input', checkPasswordMatch);
function handleRegister(e) {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('termsCheck');
    const errors = [];
    if (!firstName) errors.push('First Name is required.');
    if (!lastName) errors.push('Last Name is required.');
    if (!email) { errors.push('Email is required.') }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Invalid email format.');
    if (!username) errors.push('Username is required.');
    else if (username.length < 3) errors.push('Username must be at least 3 characters.');
    if (!password) errors.push('Password is required.');
    else if (password.length < 8) errors.push('Password must be at least 8 characters.');
    if (password !== confirmPassword) errors.push('Passwords do not match.');
    if (!terms.checked) errors.push('You must accept the Terms of Service.');
    if (errors.length > 0) { alert(errors.join('\n')); return }
    alert('Account created successfully!\n\nWelcome to CryptoExchange, ' + firstName + '!');
    window.location.href = 'index.html';
}