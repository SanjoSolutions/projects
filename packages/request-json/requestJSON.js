import request from '@sanjo/request';
export async function requestJSON(url, options = {}, data) {
    const body = data ? JSON.stringify(data) : undefined;
    if (!options.headers) {
        options.headers = {};
    }
    if (!options.headers['Content-Type']) {
        options.headers['Content-Type'] = 'application/json';
    }
    if (!options.headers['Accept']) {
        options.headers['Accept'] = 'application/json';
    }
    const response = await request(url, options, body);
    return JSON.parse(response.body);
}
//# sourceMappingURL=requestJSON.js.map