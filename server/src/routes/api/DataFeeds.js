import DataFeedService from '../../services/DataFeed';

const PATH_GET_SOURCES = '/sources';
const PATH_FEED = '/feed';

const fetchFeeds = async (ctx) => {
    const data = await DataFeedService.fetchFeeds();
    ctx.response.status = 200;
    ctx.response.body = { data };
};

const registerFeed = async (ctx) => {
    const data = await DataFeedService.registerFeed(ctx.request.body, ctx);
    ctx.response.status = 200;
    ctx.response.body = { data };
};


const deleteFeed = async (ctx) => {
    const data = await DataFeedService.deleteFeed(ctx.request.body, ctx);
    ctx.response.status = 204;
    ctx.response.body = { data };
};

const getData = async (ctx, next) => {
    const data = await DataFeedService.getData(ctx.query, ctx);
    ctx.response.status = 200;
    ctx.response.body = { data };
};

export default (router) => {
    router.get(PATH_GET_SOURCES, fetchFeeds);
    router.get(PATH_FEED, getData);
    router.post(PATH_FEED, registerFeed);
    router.delete(PATH_FEED, deleteFeed);
};
