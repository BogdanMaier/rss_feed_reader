import Parser from 'rss-parser';
import RestError from '../errors/RestError';
import {
    INVALID,
} from '../constants/ErrorCodes';


class DataFeed {
    constructor() {
        this.parser = new Parser();
        this.store = global.store;
        this.email = 'test@email.com';
    }

    fetchFeeds() {
        return global.store.getAllFeeds('test@email.com');
    }

    async getData({ source, email }) {
        let switchUrl = '';
        const data = this.store.getAllFeeds(this.email);

        switchUrl = data.find(e => e.key === source).url;

        if (!switchUrl) {
            throw new RestError(INVALID, `[Error] Source ${source} is not supported`);
        } else {
            return this.parser.parseURL(switchUrl);
        }
    }

    async deleteFeed({ title }, ctx) {
        this.store.delete(this.email, title);
    }

    async registerFeed({ value, url, key }, ctx) {
        this.store.put(this.email, { value, url, key });
        return { value, url, key };
    }
}

export default new DataFeed();
