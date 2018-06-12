const config = {};
const productionCfg = {};

const developmentCfg = {
    port: 3002,
};

config.load = function (environment) {
    if (environment === 'production' || environment === 'prod') {
        return productionCfg;
    }
    return developmentCfg;
};


module.exports = config;

