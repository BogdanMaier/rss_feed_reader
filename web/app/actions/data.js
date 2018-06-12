import DFServ from '../services/DataFeedService';
import {
    DATA_BY_SOURCE,
    DATA_SOURCES,
    DATA_FEED_ADD,
    DATA_FEED_REMOVE
} from '../constants/types';
import {
    errorNotification,
} from './notification';


export function getSources() {
    return dispatch => {
        dispatch({ type: DATA_SOURCES.DATA_SOURCES_REQUEST });

        DFServ.getSources()
            .then(
                data => {
                    dispatch({type: DATA_SOURCES.DATA_SOURCES_SUCCESS, data});
                },
                error => {
                    dispatch({ type: DATA_SOURCES.DATA_SOURCES_FAILURE, data: error.response.data  });
                    dispatch(errorNotification(error.response.data));
                }
            );
    };
}


export function getData(filter) {
    return dispatch => {
        dispatch({ type: DATA_BY_SOURCE.DATA_BY_SOURCE_REQUEST });

        DFServ.getData(filter)
            .then(
                data => {
                    dispatch({type: DATA_BY_SOURCE.DATA_BY_SOURCE_SUCCESS, data});
                },
                error => {
                    dispatch({ type: DATA_BY_SOURCE.DATA_BY_SOURCE_FAILURE, data: error.response.data  });
                    dispatch(errorNotification(error.response.data));
                }
            );
    };
}

export function deleteFeed(filter) {
    return dispatch => {
        dispatch({ type: DATA_FEED_REMOVE.DATA_FEED_REMOVE_REQUEST });

        const filt = filter;
        DFServ.delete(filter)
            .then(
                data => {
                    dispatch({type: DATA_FEED_REMOVE.DATA_FEED_REMOVE_SUCCESS, data: filt });
                },
                error => {
                    dispatch({ type: DATA_FEED_REMOVE.DATA_FEED_REMOVE_FAILURE, data: error.response.data  });
                    dispatch(errorNotification(error.response.data));
                }
            );
    };
}

export function addFeed(feed) {
    return dispatch => {
        dispatch({ type: DATA_FEED_ADD.DATA_FEED_ADD_REQUEST });

        DFServ.add(feed)
            .then(
                data => {
                    dispatch({type: DATA_FEED_ADD.DATA_FEED_ADD_SUCCESS, data});
                },
                error => {
                    dispatch({ type: DATA_FEED_ADD.DATA_FEED_ADD_FAILURE, data: error.response.data  });
                    dispatch(errorNotification(error.response.data));
                }
            );
    };
}
