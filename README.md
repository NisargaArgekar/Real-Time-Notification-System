# 🔔 Real-Time Notification System

A full-stack real-time notification system built using **Node.js, Express, and WebSockets (ws)** that pushes live updates to all connected clients without requiring a page refresh.

---

## 📸 Demo

💡 Open multiple tabs to see real-time updates in action  

🌐 **Local Demo:** http://localhost:3000

---

## 🎯 Purpose

This project was built to understand and implement **real-time communication systems**, where the server pushes instant updates to multiple clients simultaneously using WebSockets.

---

## 🚀 Features

- ⚡ Real-time notifications (every 10 seconds)
- 🔌 WebSocket connection handling
- 👥 Live active client tracking
- 🔄 Auto-reconnect with exponential backoff
- 🔔 Toast notification system
- 📋 Notification history panel
- ❌ Clear history functionality
- 🟢 Live connection status indicator
- 🎨 Modern dark UI with animations (glassmorphism)

---

## 🛠️ Tech Stack

| Layer        | Technology                     |
|-------------|------------------------------|
| Backend     | Node.js, Express, WebSocket (ws) |
| Frontend    | HTML, CSS, JavaScript        |
| Communication | WebSockets                  |

---

## 📁 Project Structure

Notification/
├── server/
│ └── server.js
├── client/
│ ├── index.html
│ ├── style.css
│ └── app.js
├── package.json
└── README.md


---

## ⚙️ How It Works

### 🔗 Client Connection
When the page loads, the client establishes a WebSocket connection:
const ws = new WebSocket(wsUrl);

👥 Client Management
Server assigns a unique ID to each client
Stores active connections using a Map
const clients = new Map();

🔔 Real-Time Notifications
Server broadcasts a notification to all connected clients every 10 seconds:

setInterval(() => {
  broadcast({
    type: 'notification',
    message: 'New update',
    timestamp: new Date().toISOString()
  });
}, 10000);

📩 Message Types
Type	Description
welcome	Sent when a client connects
notification	Periodic server updates
client-count	Updates active users count

💻 Frontend Behavior
Displays toast notifications
Maintains notification history
Updates client count in real-time
Automatically reconnects on disconnection

🔄 Auto-Reconnect Strategy
Implemented exponential backoff to prevent server overload:
const delay = Math.min(1000 * Math.pow(2, reconnectAttempts - 1), 30000);
⏱ Reconnect Delays:
1s → 2s → 4s → 8s → ... → max 30s
📡 API Endpoint
GET /api/status
Returns current server status:

{
  "status": "running",
  "activeClients": 2,
  "totalNotificationsSent": 5,
  "uptime": 120.5
}

▶️ How to Run
📌 Prerequisites
Node.js installed

🚀 Steps
# Install dependencies
npm install

# Run the server
node server/server.js
👉 Open your browser:
http://localhost:3000

⚠️ Limitations
No authentication
No database
Not scalable

🚀 Future Improvements
JWT Authentication
MongoDB / Firebase
Private notifications
Redis Pub/Sub
Testing

📄 License
This project is licensed under the MIT License.
