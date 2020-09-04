"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const url_1 = require("url");
function request(url, options = {}, data) {
    return new Promise((resolve, reject) => {
        const request = getRequestFunction(url)(url, options, (response) => {
            let body = '';
            response.setEncoding('utf-8');
            response.on('data', (chunk) => {
                body += chunk;
            });
            response.once('end', () => {
                const customResponse = {
                    status: response.statusCode,
                    contentType: response.headers['content-type'],
                    body,
                };
                resolve(customResponse);
            });
        });
        request.once('error', reject);
        if (typeof data === 'undefined') {
            request.end();
        }
        else {
            request.end(data);
        }
    });
}
exports.request = request;
function getRequestFunction(url) {
    const url_ = new url_1.URL(url);
    const protocol = url_.protocol;
    let requestFunction;
    switch (protocol) {
        case 'http:':
            requestFunction = http_1.default.request;
            break;
        case 'https:':
            requestFunction = https_1.default.request;
            break;
        default:
            throw new Error(`Unsupported protocol "${protocol}".`);
    }
    return requestFunction;
}
//# sourceMappingURL=request.js.map