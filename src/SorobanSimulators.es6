export default class {
    constructor (config) {
        this.config = config;
    }

    log (data) {
        if (this.config.debug || null) {
            console.log(data)
        }
    }
}