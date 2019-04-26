import { Middleware } from "./express";
import { ParsedHost } from "./util";
/**
    + Return `false` to not redirect.
    + Return `true` to redirect with status `302`.
    + Return `{ status : number }` to redirect with specified status.
*/
export declare type RedirectDelegate = ((parsedHost: ParsedHost) => (boolean | {
    status: number;
}));
/**
    Config options for the middleware
*/
export interface GotoHttpsOptions {
    /**
        If `true`, http requests will be redirected to https.
        If `false`, http requests will not be redirected.
    */
    enabled: boolean;
    /**
        Should not be empty.
        Will log a warning if empty unless `logWarnings` is set to `false`.
    */
    hostDomainWhitelist: string[];
    /**
        Defaults to `() => true`.
        Controls redirect behaviour.
    */
    onRedirect?: RedirectDelegate;
    /**
        Defaults to `true`.
        Controls whether warnings are logged.
    */
    logWarnings?: boolean;
}
/**
    Factory function that returns a middleware function
    that redirects requests to `https`, if necessary.
*/
export declare function gotoHttps({ enabled, hostDomainWhitelist, onRedirect: rawOnRedirect, logWarnings: rawLogWarnings, }: GotoHttpsOptions): Middleware;
//# sourceMappingURL=goto-https.d.ts.map