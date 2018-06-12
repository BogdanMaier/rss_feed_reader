import Config from '../../conf/config';
import RestError from '../errors/RestError';
import {
    INVALID,
} from '../constants/ErrorCodes';

const { logger } = global;

class Authentication {
    constructor() {
        this.config = Config.load(process.env.NODE_ENV);
    }

    /**
     * @param email
     * @param password
     * @returns {Promise.<{
     *      user: Object,
     *      token: String,
     * }>}
     */
    async authenticateEmail({ email, password }, ctx) {
        if (email === 'test@email.com' && password === '1234567') {
            logger.info(`[login successful] ${email}`);

            return {
                user: {
                    email,
                },
            };
        }

        logger.info(`[invalid credentials] User ${email} attempted to login unsuccessfully`);
        throw new RestError(INVALID, 'Invalid credentials', 401);
    }
}

export default new Authentication();
