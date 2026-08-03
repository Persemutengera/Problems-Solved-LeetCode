class EventEmitter {
    constructor() {
        this.events = new Map();
    }
    
    /**
     * @param {string} eventName
     * @param {Function} callback
     * @return {Object}
     */
    subscribe(eventName, callback) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }

        const listeners = this.events.get(eventName);
        listeners.push(callback);
        
        return {
            unsubscribe: () => {
                const updated = this.events
                    .get(eventName)
                    .filter(cb => cb !== callback);

                this.events.set(eventName, updated);
                
            }
        };
    }
    
    /**
     * @param {string} eventName
     * @param {Array} args
     * @return {Array}
     */
    emit(eventName, args = []) {
        if (!this.events.has(eventName)) {
            return [];
        }

        const listeners = this.events.get(eventName);

        return listeners.map(cb => cb(...args));
    }
        
 }
