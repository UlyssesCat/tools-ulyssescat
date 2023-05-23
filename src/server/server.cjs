const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 存储房间信息和连接
const rooms = new Map();

// WebSocket 连接建立时的处理
wss.on('connection', (socket) => {
    socket.on('message', (data) => {
        const message = JSON.parse(data);
        console.log('message.action:', message.action);
        if (message.action === 'join') {
            const room = message.room;
            socket.room = room;
            console.log('User joined room:', room);

            // 将连接存储在 rooms 中
            if (!rooms.has(room)) {
                rooms.set(room, new Set());
            }
            rooms.get(room).add(socket);
            console.log('join rooms:', rooms);
        } else if (message.action === 'offer' || message.action === 'answer' || message.action === 'stop') {
            const roomSet = rooms.get(message.room);
            if (roomSet) {
                // 房间存在，广播给房间中的其他用户
                roomSet.forEach((client) => {
                    if (client !== socket) {
                        client.send(data);
                    }
                });
            } else {
                console.log('Room does not exist:', message.room);
            }
        }
    });

    socket.on('close', () => {
        // 从 rooms 中移除连接
        const room = socket.room;
        if (rooms.has(room)) {
            rooms.get(room).delete(socket);
            if (rooms.get(room).size === 0) {
                rooms.delete(room);
            }
        }
    });

    console.log('A new WebSocket connection has been established');
});

// 其他后端路由和逻辑...

// 启动服务器
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
