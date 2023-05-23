<template>
    <div>
        <video ref="remoteVideo" autoPlay></video>
    </div>
</template>

<script>
export default {
    data() {
        return {
            remoteStream: null,
            pc: null,
            room: 'your-room-id',
            socket: null
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            try {
                // 初始化 RTCPeerConnection
                this.pc = new RTCPeerConnection();

                // 监听远程视频流
                this.pc.ontrack = (event) => {
                    this.remoteStream = event.streams[0];
                    this.$refs.remoteVideo.srcObject = this.remoteStream;
                };

                // 建立 WebSocket 连接
                this.socket = new WebSocket('ws://localhost:3000');

                this.socket.onopen = () => {
                    // WebSocket 连接已建立，发送加入房间的信号给服务器
                    this.joinRoom();
                };

                this.socket.onmessage = (event) => {
                    const message = JSON.parse(event.data);
                    if (message.action === 'offer') {
                        this.handleOffer(message.offer);
                    } else if (message.action === 'answer') {
                        this.handleAnswer(message.answer);
                    } else if (message.action === 'stop') {
                        this.stopScreenShare();
                    }
                };
            } catch (error) {
                console.error('初始化屏幕观看失败：', error);
            }
        },
        joinRoom() {
            // 发送加入房间的信号给服务器
            const joinSignal = {
                room: this.room,
                action: 'join'
            };
            this.socket.send(JSON.stringify(joinSignal));
        },
        handleOffer(offer) {
            try {
                // 设置远程描述
                this.pc.setRemoteDescription(new RTCSessionDescription(offer))
                    .then(() => {
                        // 创建 answer
                        return this.pc.createAnswer();
                    })
                    .then((answer) => {
                        // 设置本地描述
                        return this.pc.setLocalDescription(answer);
                    })
                    .then(() => {
                        // 发送 answer 给服务器
                        const answerSignal = {
                            room: this.room,
                            action: 'answer',
                            answer: this.pc.localDescription
                        };
                        this.socket.send(JSON.stringify(answerSignal));
                    })
                    .catch((error) => {
                        console.error('处理 offer 失败：', error);
                    });
            } catch (error) {
                console.error('处理 offer 失败：', error);
            }
        },
        handleAnswer(answer) {
            try {
                // 设置远程描述
                this.pc.setRemoteDescription(new RTCSessionDescription(answer))
                    .catch((error) => {
                        console.error('处理 answer 失败：', error);
                    });
            } catch (error) {
                console.error('处理 answer 失败：', error);
            }
        },
        stopScreenShare() {
            // 停止屏幕分享
            this.remoteStream = null;
            this.$refs.remoteVideo.srcObject = null;
            this.pc.close();
        }
    }
};
</script>

<style>
video {
    width: 100%;
    max-width: 400px;
}
</style>
