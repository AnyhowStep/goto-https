import {Middleware} from "./express";
import {ParsedHost, isValidHost, tryParseWhitelistedHost} from "./util";

/**
    + Return `false` to not redirect.
    + Return `true` to redirect with status `302`.
    + Return `{ status : number }` to redirect with specified status.
*/
export type RedirectDelegate = (
    (
        parsedHost : ParsedHost
    ) => (
        boolean |
        { status : number }
    )
);

/**
    Config options for the middleware
*/
export interface GotoHttpsOptions {
    /**
        If `true`, http requests will be redirected to https.
        If `false`, http requests will not be redirected.
    */
    enabled : boolean,
    /**
        Should not be empty.
        Will log a warning if empty unless `logWarnings` is set to `false`.
    */
    hostDomainWhitelist : string[],
    /**
        Defaults to `() => true`.
        Controls redirect behaviour.
    */
    onRedirect? : RedirectDelegate,

    /**
        Defaults to `true`.
        Controls whether warnings are logged.
    */
    logWarnings? : boolean,
}

/**
    Factory function that returns a middleware function
    that redirects requests to `https`, if necessary.
*/
export function gotoHttps (
    {
        enabled,
        hostDomainWhitelist,
        onRedirect : rawOnRedirect,
        logWarnings : rawLogWarnings,
    } :
    GotoHttpsOptions
) : Middleware {
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
        .filter(isValidHost);
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

        const parsedHost = tryParseWhitelistedHost(req, hostDomainWhitelist);
        if (parsedHost == undefined) {
            res.status(404).end();
        } else {
            const redirectResult = onRedirect(parsedHost);
            if (redirectResult === false) {
                //No redirect
                next();
            } else {
                const status = (redirectResult === true) ?
                    302 :
                    redirectResult.status;
                const url = "https://" + parsedHost.host + req.originalUrl;
                res.redirect(status, url);
            }
        }
    };
}