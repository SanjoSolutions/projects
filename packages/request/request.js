import http from "http";
import https from "https";
import { URL } from "url";
export function request(url, options = {}, data) {
    return new Promise((resolve, reject) => {
        const request = getRequestFunction(url)(url, options, (response) => {
            let body = "";
            response.setEncoding("utf-8");
            response.on("data", (chunk) => {
                body += chunk;
            });
            response.once("end", () => {
                response.body = body;
                resolve(response);
            });
        });
        request.once("error", reject);
        if (typeof data === "undefined") {
            request.end();
        }
        else {
            request.end(data);
        }
    });
}
function getRequestFunction(url) {
    const url_ = new URL(url);
    const protocol = url_.protocol;
    let requestFunction;
    switch (protocol) {
        case "http:":
            requestFunction = http.request;
            break;
        case "https:":
            requestFunction = https.request;
            break;
        default:
            throw new Error(`Unsupported protocol "${protocol}".`);
    }
    return requestFunction;
}
//# sourceMappingURL=request.js.map