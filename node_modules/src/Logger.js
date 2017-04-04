class Logger {
    constructor (prefix) {
        this.prefix           = prefix;
        this.firedDebugNotice = false;
        this.fireDebugNotice();
    }

    fireDebugNotice () {
        if(!this.firedDebugNotice) {
            this.debug('You are running Rapid in debug mode. All requests will be mimicked.');

            this.firedDebugNotice = true;
        }
    }

    debug (message) {
        console.info(`[${this.prefix}]: ${message}`);
    }

    log (message) {
        console.log(`[${this.prefix}]:`, message);
    }

    warn (message) {
        console.warn(`[${this.prefix} warn]:`, message);
    }

}

export default new Logger('rapid js');
