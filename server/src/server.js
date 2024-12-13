const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const { Server } = require("socket.io");

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("A user connected");

    // Handle events here (e.g., 'note-update')
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
