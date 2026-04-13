# 🚀 Real-Time Notification System

A full-stack real-time notification system built using Node.js, Express, and WebSockets (ws) that enables instant communication between server and clients
without page refresh.


📌 Overview

This project demonstrates how modern applications deliver live updates such as:

- Notifications
- Messages
- Real-time events

Using WebSockets, the server pushes updates to all connected clients instantly, ensuring low latency and high responsiveness — a core concept in modern web apps.


⚡Features
- Real-time notifications (no refresh required)
- WebSocket-based communication
- Broadcast messages to all connected clients
- Lightweight and beginner-friendly architecture
- Multiple client support (open multiple tabs)
- Clean and modular project structure


🛠️ Tech Stack

| Technology       | Purpose                 |
| ---------------- | ----------------------- |
| Node.js          | Backend runtime         |
| Express.js       | Server framework        |
| WebSocket (`ws`) | Real-time communication |
| HTML/CSS/JS      | Frontend UI             |


📂 Project Structure

```
Real-Time-Notification-System/
│── server/
│   └── server.js        # WebSocket + Express server
│── public/
│   ├── index.html      # UI
│   ├── script.js       # Client-side WebSocket logic
│   └── style.css       # Styling
│── package.json
│── README.md
```

🔄 How It Works
1. Client connects to the server via WebSocket
2. Server maintains active connections
3. When an event occurs:
   -> Server sends message → all clients
4. Clients receive updates instantly

   | Client ⇄ WebSocket Server ⇄ Multiple Clients |

## 🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/NisargaArgekar/Real-Time-Notification-System.git

cd Real-Time-Notification-System

2️⃣ Install Dependencies
npm install

3️⃣ Run the Server
npm start

4️⃣ Open in Browser
http://localhost:3000

🧪 Example Use Cases

- Social media notifications
- Chat applications
- Live dashboards
- E-commerce order updates
- Admin alert systems

📸 Demo Idea

🔮 Future Improvements

- User authentication
- Database integration (MongoDB / Firebase)
- Notification persistence
- Custom notification types
- Deployment (Render / Vercel backend)


📚 Key Learning Outcomes

- WebSocket fundamentals
- Real-time system design
- Client-server communication
- Event-driven architecture


📜 License

This project is open-source and available under the MIT License.

