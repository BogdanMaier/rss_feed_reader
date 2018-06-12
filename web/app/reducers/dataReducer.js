import { Map, List } from 'immutable';
import {
    DATA_SOURCES,
    DATA_BY_SOURCE,
    DATA_FEED_REMOVE,
    DATA_FEED_ADD,
} from '../constants/types';

const initalState = Map({
    isLoading: false,
    sources: [],
    data: {},
});

export default (state = initalState, action) => {
    let sources;

    switch (action.type) {
        // sources
        case DATA_SOURCES.DATA_SOURCES_REQUEST:
            return state.merge({
                isLoading: true,
            });
        case DATA_SOURCES.DATA_SOURCES_SUCCESS:
            return state.merge({
                isLoading: false,
                sources: List(action.data.data),
            });
        case DATA_SOURCES.DATA_SOURCES_FAILURE:
            return state.merge({
                isLoading: false,
                sources: List(),
            });

        // data for source
        case DATA_BY_SOURCE.DATA_BY_SOURCE_REQUEST:
            return state.merge({
                isLoading: true,
                data: List(),
            });
        case DATA_BY_SOURCE.DATA_BY_SOURCE_SUCCESS:
            return state.merge({
                isLoading: false,
                data: action.data.data,
            });
        case DATA_BY_SOURCE.DATA_BY_SOURCE_FAILURE:
            return state.merge({
                isLoading: false,
                data: List(),
            });

        case DATA_FEED_ADD.DATA_FEED_ADD_REQUEST:
            return state.merge({
                loading: true,
            });
        case DATA_FEED_ADD.DATA_FEED_ADD_FAILURE:
            return state.merge({
                loading: false,
                error: action.error,
            });
        case DATA_FEED_ADD.DATA_FEED_ADD_SUCCESS:
            sources = state.get('sources');
            sources = sources.push(action.data.data);
            return state
                .set('sources', sources)
                .set('loading', false);


        case DATA_FEED_REMOVE.DATA_FEED_REMOVE_REQUEST:
            return state.merge({
                loading: true,
            });
        case DATA_FEED_REMOVE.DATA_FEED_REMOVE_FAILURE:
            return state.merge({
                loading: false,
                error: action.error,
            });
        case DATA_FEED_REMOVE.DATA_FEED_REMOVE_SUCCESS:
            sources = state.get('sources');
            const indexToRemove = sources.findIndex((e) => {
                return e.value === action.data.title;
            });
            sources = sources.remove(indexToRemove);

            return state
                .set('sources', sources)
                .set('loading', false);

        default:
            return state;
    }
};

