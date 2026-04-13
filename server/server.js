
const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const path = require('path');


const PORT = process.env.PORT || 3000;
const NOTIFICATION_INTERVAL = 10000;

const app = express();
const server = http.createServer(app);


app.use(express.static(path.join(__dirname, '..', 'client')));

const wss = new WebSocketServer({ server });


let nextClientId = 1;
const clients = new Map();

function broadcast(data) {
    const message = JSON.stringify(data);
    clients.forEach((ws, id) => {
        if (ws.readyState === ws.OPEN) {
            ws.send(message);
        }
    });
}

function sendToClient(ws, data) {
    if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify(data));
    }
}


function getActiveCount() {
    return clients.size;
}


wss.on('connection', (ws) => {

    const clientId = nextClientId++;
    clients.set(clientId, ws);

    const activeCount = getActiveCount();
    console.log(`✅ Client #${clientId} connected | Active clients: ${activeCount}`);

    sendToClient(ws, {
        type: 'welcome',
        message: `Welcome! You are client #${clientId}`,
        clientId: clientId,
        activeClients: activeCount,
    });

    broadcast({
        type: 'client-count',
        activeClients: activeCount,
    });

    ws.on('close', () => {
        clients.delete(clientId);
        const updatedCount = getActiveCount();
        console.log(`❌ Client #${clientId} disconnected | Active clients: ${updatedCount}`);

        broadcast({
            type: 'client-count',
            activeClients: updatedCount,
        });
    });

    ws.on('error', (error) => {
        console.error(`⚠️  Error on client #${clientId}:`, error.message);
        clients.delete(clientId);
    });
});


let notificationCount = 0;

setInterval(() => {
    if (getActiveCount() > 0) {
        notificationCount++;
        const data = {
            type: 'notification',
            message: `🔔 New update from server (#${notificationCount})`,
            timestamp: new Date().toISOString(),
        };

        broadcast(data);
        console.log(`📢 Notification #${notificationCount} sent to ${getActiveCount()} client(s)`);
    }
}, NOTIFICATION_INTERVAL);

app.get('/api/status', (req, res) => {
    res.json({
        status: 'running',
        activeClients: getActiveCount(),
        totalNotificationsSent: notificationCount,
        uptime: process.uptime(),
    });
});

server.listen(PORT, () => {
    console.log('  Real-Time Notification Server is running');
    console.log(`  http://localhost:${PORT}`);
    console.log('  WebSocket server is ready for connections');
    console.log('  Notifications will be sent every 10 seconds');
});
