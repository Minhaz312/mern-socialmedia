import {io} from 'socket.io-client'
import { SERVER_DOMAIN } from './constants';

class SocketManager {
    constructor(){
        if(!this.socket){
            this.socket = io(SERVER_DOMAIN); // ws://localhost:8080
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