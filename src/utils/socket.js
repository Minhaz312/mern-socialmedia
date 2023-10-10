import {io} from 'socket.io-client'

class SocketManager {
    constructor(){
        if(!this.socket){
            this.socket = io("https://tubebook.onrender.com"); // ws://localhost:8080
        }
    }
    getSocket() {
        return this.socket;
    }
    connected(cb) {
        this.socket.on("connect",()=>{
            cb(this.socket)
        })
    }
}

const socket = new SocketManager();

export default socket;