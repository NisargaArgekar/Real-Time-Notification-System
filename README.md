🔔 Real-Time Notification System

A full-stack real-time notification system built using Node.js, Express, and WebSockets (ws) that pushes live updates to all connected clients without page refresh.

📸 Demo

💡 Open multiple tabs to see real-time updates in action

🌐 Local Demo:
http://localhost:3000

🎯 Purpose
This project was built to understand and implement real-time communication systems where the server pushes instant updates to multiple clients simultaneously using WebSockets.

🚀 Features
⚡ Real-time notifications (every 10 seconds)
🔌 WebSocket connection handling
👥 Live active client tracking
🔄 Auto-reconnect with exponential backoff
🔔 Toast notification system
📋 Notification history panel
❌ Clear history functionality
🟢 Live connection status indicator
🎨 Modern dark UI with animations (glassmorphism)


🛠️ Tech Stack
Layer	Technology
Backend	Node.js, Express, WebSocket (ws)
Frontend	HTML, CSS, JavaScript
Communication	WebSockets
📁 Project Structure
Notification/
├── server/
│   └── server.js        # Backend (Express + WebSocket server)
├── client/
│   ├── index.html       # UI structure
│   ├── style.css        # Styling (dark UI + animations)
│   └── app.js           # WebSocket client logic
├── package.json
└── README.md


⚙️ How It Works

1. Client Connection
When the page loads, the client establishes a WebSocket connection:
const ws = new WebSocket(wsUrl);

2. Client Management
Server assigns a unique ID to each client
Stores connections using a Map
const clients = new Map();

3. Real-Time Notifications
Server sends a notification to all connected clients every 10 seconds:
setInterval(() => {
    broadcast({
        type: 'notification',
        message: `New update`,
        timestamp: new Date().toISOString()
    });
}, 10000);

4. Message Types
Type	Description
welcome	Sent when a client connects
notification	Periodic server updates
client-count	Updates active users

5. Frontend Behavior
Displays toast notifications
Maintains notification history
Updates client count in real-time
Automatically reconnects on disconnection

🔄 Auto-Reconnect Strategy

Implemented exponential backoff to prevent server overload:

const delay = Math.min(1000 * Math.pow(2, reconnectAttempts - 1), 30000);

Reconnect delays:

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

Prerequisites:
Node.js installed

Steps:
# Install dependencies
npm install

# Run the server
node server/server.js

Open browser:
http://localhost:3000

💡 What I Learned
Implemented real-time communication using WebSockets
Managed multiple clients efficiently using Map
Designed auto-reconnect logic using exponential backoff
Built dynamic UI with real-time DOM updates
Structured event-based messaging between client and server

⚠️ Limitations
No authentication (anonymous users)
No database (data not persistent)
Single-server setup (not scalable)

🚀 Future Improvements
🔐 User authentication (JWT)
🗄️ Database integration (MongoDB / Firebase)
📩 Private/user-specific notifications
⚡ Redis Pub/Sub for scaling
🔊 Sound notifications
🧪 Unit & integration testing


📄 License
MIT License