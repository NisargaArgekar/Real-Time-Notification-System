
const connectionStatus = document.getElementById('connection-status');
const statusText = connectionStatus.querySelector('.status-text');
const clientCountEl = document.getElementById('client-count');
const toastContainer = document.getElementById('toast-container');
const historyList = document.getElementById('history-list');
const emptyState = document.getElementById('empty-state');
const clearBtn = document.getElementById('clear-history');

let ws = null;
let reconnectAttempts = 0;
let reconnectTimer = null;
let notificationHistory = [];


function connect() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;

    ws = new WebSocket(wsUrl);


    ws.onopen = () => {
        console.log('WebSocket connected');
        reconnectAttempts = 0;
        setConnectionStatus('connected', 'Connected');
    };

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            handleMessage(data);
        } catch (error) {
            console.error('Failed to parse message:', error);
        }
    };


    ws.onclose = () => {
        console.log('WebSocket disconnected');
        setConnectionStatus('disconnected', 'Disconnected');
        scheduleReconnect();
    };


    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
}

function handleMessage(data) {
    switch (data.type) {
        case 'welcome':
            showToast('Welcome!', data.message, '👋', 'toast-welcome');
            updateClientCount(data.activeClients);
            break;

        case 'notification':
            showToast('Server Notification', data.message, '🔔', '');
            addToHistory(data.message, data.timestamp);
            break;

        case 'client-count':
            updateClientCount(data.activeClients);
            break;

        default:
            console.log('Unknown message type:', data.type);
    }
}

function showToast(title, message, icon, extraClass) {
    const toast = document.createElement('div');
    toast.className = `toast ${extraClass}`;

    toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" title="Dismiss">&times;</button>
  `;

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => dismissToast(toast));


    toastContainer.appendChild(toast);

    setTimeout(() => dismissToast(toast), 5000);
}


function dismissToast(toast) {
    if (!toast || !toast.parentElement) return;
    toast.classList.add('toast-exit');
    setTimeout(() => {
        if (toast.parentElement) {
            toast.parentElement.removeChild(toast);
        }
    }, 300);
}


function addToHistory(message, timestamp) {
    if (emptyState) {
        emptyState.style.display = 'none';
    }

    const time = new Date(timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });


    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
    <span class="notif-icon">🔔</span>
    <div class="notif-content">
      <div class="notif-message">${message}</div>
      <div class="notif-time">${time}</div>
    </div>
  `;


    historyList.insertBefore(item, historyList.firstChild);
    notificationHistory.unshift({ message, timestamp, time });
}


function clearHistory() {

    const items = historyList.querySelectorAll('.history-item');
    items.forEach((item) => item.remove());

    notificationHistory = [];

    if (emptyState) {
        emptyState.style.display = 'flex';
    }
}


function setConnectionStatus(status, text) {
    connectionStatus.className = `status-badge ${status}`;
    statusText.textContent = text;
}


function updateClientCount(count) {
    clientCountEl.textContent = count;
}

function scheduleReconnect() {
    if (reconnectTimer) return;

    reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts - 1), 30000);

    console.log(`🔄 Reconnecting in ${delay / 1000}s (attempt #${reconnectAttempts})`);
    setConnectionStatus('disconnected', `Reconnecting in ${Math.round(delay / 1000)}s…`);

    reconnectTimer = setTimeout(() => {
        reconnectTimer = null;
        connect();
    }, delay);
}


clearBtn.addEventListener('click', clearHistory);
connect();
