/* assets/js/trade.js */
const coins = [{ name: 'BTC', price: 67845.32, change: 2.45 }, { name: 'ETH', price: 3567.21, change: 1.89 }, { name: 'BNB', price: 598.45, change: -0.78 }, { name: 'SOL', price: 142.78, change: 5.32 }, { name: 'ADA', price: 0.6234, change: -1.23 }, { name: 'XRP', price: 0.5234, change: 3.45 }, { name: 'DOGE', price: 0.1234, change: 8.90 }, { name: 'DOT', price: 7.89, change: -2.34 }, { name: 'AVAX', price: 34.56, change: 1.67 }, { name: 'MATIC', price: 0.89, change: -0.45 }, { name: 'LINK', price: 14.56, change: 4.56 }, { name: 'UNI', price: 7.23, change: 2.34 }, { name: 'ATOM', price: 9.78, change: -1.89 }, { name: 'LTC', price: 78.90, change: 0.67 }, { name: 'NEAR', price: 5.67, change: 12.34 }];
const tickerTrack = document.getElementById('tickerTrack');
if (tickerTrack) {
    coins.forEach(c => { const cl = c.change >= 0 ? 'positive' : 'negative'; const s = c.change >= 0 ? '+' : ''; tickerTrack.innerHTML += `<div class="ticker-item"><span class="ticker-pair">${c.name}/USDT</span><span class="ticker-price">$${c.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span><span class="ticker-change ${cl}">${s}${c.change}%</span></div>` });
    tickerTrack.innerHTML += tickerTrack.innerHTML;
}
function generateOrderBook() {
    const basePrice = 67845.32; const asks = []; const bids = [];
    for (let i = 0; i < 8; i++) { const offset = (i + 1) * 5 + Math.random() * 3; asks.push({ price: basePrice + offset, amount: (Math.random() * 2 + 0.1).toFixed(4) }); bids.push({ price: basePrice - offset, amount: (Math.random() * 2 + 0.1).toFixed(4) }) }
    const asksEl = document.getElementById('orderBookAsks'); const bidsEl = document.getElementById('orderBookBids');
    if (asksEl) { asksEl.innerHTML = asks.reverse().map(a => `<div class="ob-mini-row ask"><span class="text-danger">$${a.price.toFixed(2)}</span><span>${a.amount}</span><span>$${(a.price * a.amount).toFixed(2)}</span></div>`).join('') }
    if (bidsEl) { bidsEl.innerHTML = bids.map(b => `<div class="ob-mini-row bid"><span class="text-success">$${b.price.toFixed(2)}</span><span>${b.amount}</span><span>$${(b.price * b.amount).toFixed(2)}</span></div>`).join('') }
}
function generateRecentTrades() {
    const trades = []; const basePrice = 67845.32; const times = ['14:30:15', '14:30:12', '14:30:08', '14:29:55', '14:29:42', '14:29:30', '14:29:18', '14:29:05', '14:28:50', '14:28:38'];
    for (let i = 0; i < 10; i++) { const type = Math.random() > 0.5 ? 'buy' : 'sell'; const price = basePrice + (Math.random() - 0.5) * 10; trades.push({ type, price: price.toFixed(2), amount: (Math.random() * 0.5 + 0.01).toFixed(4), time: times[i] || '14:28:00' }) }
    const el = document.getElementById('recentTrades'); if (el) { el.innerHTML = trades.map(t => `<div class="recent-trade-item ${t.type}"><span>$${t.price}</span><span>${t.amount}</span><span>${t.time}</span></div>`).join('') }
}
function initChart() {
    const ctx = document.getElementById('tradeChart'); if (!ctx || typeof Chart === 'undefined') return;
    const data = []; const labels = []; let price = 67500;
    for (let i = 50; i >= 0; i--) { price += (Math.random() - 0.48) * 80; data.push(price); labels.push('') }
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 420);
    gradient.addColorStop(0, 'rgba(99,102,241,0.25)'); gradient.addColorStop(1, 'rgba(99,102,241,0)');
    new Chart(ctx, { type: 'line', data: { labels, datasets: [{ label: 'BTC/USDT', data, borderColor: '#818cf8', backgroundColor: gradient, borderWidth: 2, tension: 0.3, fill: true, pointRadius: 0, pointHoverRadius: 4, pointHoverBackgroundColor: '#818cf8' }] }, options: { responsive: true, maintainAspectRatio: false, interaction: { intersect: false, mode: 'index' }, plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(15,20,45,0.95)', titleColor: '#94a3b8', bodyColor: '#f1f5f9', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, padding: 10, displayColors: false, callbacks: { label: function (ctx) { return '$' + ctx.parsed.y.toFixed(2) } } } }, scales: { x: { display: false }, y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8', font: { size: 10 }, callback: function (v) { return '$' + v.toLocaleString() } } } } } })
}
function setOrderType(type) {
    document.querySelectorAll('.order-type-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.order-type-btn:contains('${type === 'limit' ? 'Limit' : type === 'market' ? 'Market' : 'Stop Limit'}')`)?.classList.add('active');
    document.querySelectorAll('.order-type-btn').forEach(b => { if (b.textContent.trim().toLowerCase().includes(type)) b.classList.add('active') });
    const limitFields = document.getElementById('limitFields'); if (limitFields) { limitFields.style.display = type === 'market' ? 'none' : 'block' }
}
function setAmountPercent(pct) { const total = 0.2345; const amountInput = document.getElementById('orderAmount'); if (amountInput) { amountInput.value = (total * pct / 100).toFixed(4); updateTotal() } }
function updateTotal() { const price = parseFloat(document.getElementById('orderPrice').value) || 67845.32; const amount = parseFloat(document.getElementById('orderAmount').value) || 0; document.getElementById('orderTotal').value = (price * amount).toFixed(2) }
function placeOrder(type) { const price = document.getElementById('orderPrice').value; const amount = document.getElementById('orderAmount').value; if (!amount || amount <= 0) { alert('Please enter an amount.'); return } const action = type === 'buy' ? 'Buy' : 'Sell'; alert(`${action} order placed!\n\nAmount: ${amount} BTC\nPrice: $${price || 'Market'}`) }
document.addEventListener('DOMContentLoaded', function () { generateOrderBook(); generateRecentTrades(); initChart(); document.getElementById('orderPrice')?.addEventListener('input', updateTotal); document.getElementById('orderAmount')?.addEventListener('input', updateTotal); setInterval(generateOrderBook, 5000); setInterval(generateRecentTrades, 3000) });