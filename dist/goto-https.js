"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
/**
    Factory function that returns a middleware function
    that redirects requests to `https`, if necessary.
*/
function gotoHttps({ enabled, hostDomainWhitelist, onRedirect: rawOnRedirect, logWarnings: rawLogWarnings, }) {
    if (!enabled) {
        return (_req, _res, next) => {
            next();
        };
    }
    const onRedirect = (rawOnRedirect == undefined) ?
        (() => true) :
        rawOnRedirect;
    const logWarnings = (rawLogWarnings == undefined) ?
        true :
        rawLogWarnings;
    hostDomainWhitelist = hostDomainWhitelist
        .map(s => s.trim())
        .filter(util_1.isValidHost);
    if (hostDomainWhitelist.length == 0) {
        if (logWarnings) {
            console.warn("hostDomainWhitelist should not be empty, or contain only empty strings; leaves you vulnerable to host header attacks");
        }
    }
    return (req, res, next) => {
        if (req.secure) {
            next();
            return;
        }
        const parsedHost = util_1.tryParseWhitelistedHost(req, hostDomainWhitelist);
        if (parsedHost == undefined) {
            res.status(404).end();
        }
        else {
            const redirectResult = onRedirect(parsedHost);
            if (redirectResult === false) {
                //No redirect
                next();
            }
            else {
                const status = (redirectResult === true) ?
                    302 :
                    redirectResult.status;
                const url = "https://" + parsedHost.host + req.originalUrl;
                res.redirect(status, url);
            }
        }
    };
}
exports.gotoHttps = gotoHttps;
//# sourceMappingURL=goto-https.js.map