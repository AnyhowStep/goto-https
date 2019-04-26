"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
    A valid host is a non-empty string.
*/
function isValidHost(host) {
    return ((typeof host == "string") &&
        host != "");
}
exports.isValidHost = isValidHost;
/**
    If there is a port number specified,
    you will receive `${hostname}:${port}`
*/
function tryParseHost(req) {
    const trust = req.app.get("trust proxy fn");
    let host = trust(req.connection.remoteAddress, 0) ?
        req.headers["x-forwarded-host"] :
        undefined;
    if (!isValidHost(host)) {
        host = req.headers["host"];
    }
    if (!isValidHost(host)) {
        return undefined;
    }
    return host;
}
exports.tryParseHost = tryParseHost;
/**
    Extracts the hostname and port from a host.
*/
function parseHost(host) {
    //IPv6 literal support
    const offset = (host[0] == "[") ?
        host.indexOf("]") + 1 :
        0;
    const index = host.indexOf(":", offset);
    if (index >= 0) {
        return {
            host,
            hostname: host.substring(0, index),
            port: parseInt(host.substring(index + 1)),
        };
    }
    else {
        return {
            host,
            hostname: host,
            port: undefined,
        };
    }
}
exports.parseHost = parseHost;
/**
    Tells you if the domain of the host is whitelisted.
    An empty `domainWhitelist` means all hosts are whitelisted.

    ```ts
    isHostWhitelisted("example.com", [])
    > true
    isHostWhitelisted("example.com", ["example.com"])
    > true
    isHostWhitelisted("subdomain.example.com", ["example.com"])
    > true
    isHostWhitelisted("other.com", [])
    > true
    isHostWhitelisted("other.com", ["example.com"])
    > false
    isHostWhitelisted("subdomain.example.com", ["othersub.example.com"])
    > false
    ```
*/
function isHostWhitelisted(host, domainWhitelist) {
    if ((domainWhitelist == undefined) ||
        (domainWhitelist.length == 0)) {
        //Trust all host header values
        //Not recommended because of host header attacks
        return true;
    }
    const { hostname } = parseHost(host);
    return domainWhitelist.some(whitelisted => hostname.endsWith(whitelisted));
}
exports.isHostWhitelisted = isHostWhitelisted;
/**
    Tries to parse a whitelisted host from the request.
    Returns `undefined` if a host cannot be parsed,
    or if the parsed host is not whitelisted.
*/
function tryParseWhitelistedHost(req, domainWhitelist) {
    //console.log("headers for request", req.headers);
    const host = tryParseHost(req);
    if (typeof host == "string" && isHostWhitelisted(host, domainWhitelist)) {
        return parseHost(host);
    }
    else {
        return undefined;
    }
}
exports.tryParseWhitelistedHost = tryParseWhitelistedHost;
//# sourceMappingURL=util.js.map