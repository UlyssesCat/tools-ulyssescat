<template>
    <div>
        <button v-if="!isSharing" @click="startScreenShare">开始屏幕分享</button>
        <button v-else @click="stopScreenShare">停止屏幕分享</button>
        <video ref="localVideo" autoplay></video>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isSharing: false,
            localStream: null,
            pc: null,
            room: 'your-room-id',
            socket: null
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            try {
                // 初始化 RTCPeerConnection
                this.pc = new RTCPeerConnection();

                // 获取本地屏幕分享的视频流
                this.localStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                this.localStream.getTracks().forEach((track) => {
                    this.pc.addTrack(track, this.localStream);
                });
                this.$refs.localVideo.srcObject = this.localStream;

                // 建立 WebSocket 连接
                this.socket = new WebSocket('ws://localhost:3000');

                this.socket.onmessage = (event) => {
                    const message = JSON.parse(event.data);
                    if (message.type === 'offer') {
                        this.handleOffer(message.offer);
                    }
                };
            } catch (error) {
                console.error('初始化屏幕分享失败：', error);
            }
        },
        async startScreenShare() {
            try {
                // 发送屏幕分享开始信号给服务器
                const startSignal = {
                    room: this.room,
                    action: 'start',
                    type: 'offer'
                };
                this.socket.send(JSON.stringify(startSignal));

                // 更新 UI
                this.isSharing = true;
            } catch (error) {
                console.error('开始屏幕分享失败：', error);
            }
        },
        async stopScreenShare() {
            try {
                // 发送屏幕分享停止信号给服务器
                const stopSignal = {
                    room: this.room,
                    action: 'stop'
                };
                this.socket.send(JSON.stringify(stopSignal));

                // 停止本地视频流并更新 UI
                this.localStream.getTracks().forEach((track) => {
                    track.stop();
                });
                this.$refs.localVideo.srcObject = null;
                this.isSharing = false;
            } catch (error) {
                console.error('停止屏幕分享失败：', error);
            }
        },
        async handleOffer(offer) {
            try {
                // 设置远程描述
                await this.pc.setRemoteDescription(new RTCSessionDescription(offer));

                // 创建 answer
                const answer = await this.pc.createAnswer();

                // 设置本地描述
                await this.pc.setLocalDescription(answer);

                // 发送 answer 给服务器
                const answerSignal = {
                    room: this.room,
                    action: 'answer',
                    answer: this.pc.localDescription
                };
                this.socket.send(JSON.stringify(answerSignal));
            } catch (error) {
                console.error('处理 offer 失败：', error);
            }
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
