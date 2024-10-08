
class PeerService {
    constructor() {
        if (!this.peer) {
            this.peer = new RTCPeerConnection({
                iceServers: [{ urls: ["stun:stun.l.google.com:19302"] },],
            });
        }
    }

    async getAnswer(offer) {
        if (this.peer) {
            await this.peer.setRemoteDescription(offer);
            const ans = await this.peer.createAnswer();
            await this.peer.setLocalDescription(ans);
            return ans;
        }
    }

    async setDescription(ans) {
        if (this.peer) {
            await this.peer.setRemoteDescription(ans);
        }
    }


    async getOffer() {
        if (this.peer) {
            const offer = await this.peer.createOffer();
            await this.peer.setLocalDescription(offer);
            return offer;
        }
    }
}

export default new PeerService();