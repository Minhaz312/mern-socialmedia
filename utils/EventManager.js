import { EventEmitter } from 'node:events'

class EventManager{
    constructor(){
        if(!this.instance){
            this.instance = new EventEmitter()
        }
    }
    getInstance() {
        return this.instance
    }
}

const eventManager = new EventManager().getInstance()
export default eventManager;