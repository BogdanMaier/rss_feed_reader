export const handleResponse = function(response) {
    if (response.data.code) {
        return Promise.reject(response.statusText);
    }
    return response.data;
};
