import fs from 'fs';
import RestError from '../../errors/RestError';
import { INVALID } from '../../constants/ErrorCodes';

/**
 * Simulated nodb
 */
class JsonStore {
    constructor() {
        this.store = {};
        this.FILE_NAME = 'data.json';
    }

    /**
     * Get all user mapped data
     * @param {String} email
     * @returns {*}
     */
    getAllFeeds(email) {
        return this.store[email];
    }

    /**
     * Get all user mapped data
     * @param {Array<Object>} email
     * @returns {*}
     */
    setAllFeeds(feeds, email) {
        this.store[feeds] = feeds;
    }

    /**
     * Gets object of email with id
     * @param {String} email. Email of logged user.
     * @param {Number} id. Long representing the timestamp of creation.
     * @returns {*}
     */
    get(email, title) {
        const lookup = this.store[email][title];

        if (!lookup) {
            throw new RestError(INVALID, 'Invalid query. Object with id of email is not available.');
        }

        return lookup;
    }

    /**
     * Puts object for user into the store
     * @param {String} email.
     * @param {Object} object.
     */
    put(email, object) {
        this.store[email].push(object);
    }

    /**
     * Puts object for user into the store
     * @param {String} email.
     * @param {Object} object.
     */
    delete(email, title) {
        this.store[email] = this.store[email].filter(e => e.value !== title);
    }

    /**
     * Save to file method
     */
    saveData() {
        global.logger.info(`Write data to json: ${this.FILE_NAME}`);
        const data = JSON.stringify(this.store);

        fs.writeFileSync(this.FILE_NAME, data);// for the sake of simplicity
    }

    /**
     * Load from file method
     * @returns {Promise}
     */
    loadData() {
        global.logger.error('Loading data from ', this.FILE_NAME);
        return new Promise((resolve, reject) => {
            fs.readFile(this.FILE_NAME, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(JSON.parse(data));
            });
        });
    }

    async setupData() {
        this.store = await this.loadData();
    }
}

export default new JsonStore();
