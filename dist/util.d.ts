import { Req } from "./express";
export interface ParsedHost {
    /**
        May be `${hostname}` or `${hostname}:${port}`
    */
    host: string;
    /**
         The name of the host without the port
    */
    hostname: string;
    /**
         If undefined, no port was explicitly specified
    */
    port: number | undefined;
}
/**
    A valid host is a non-empty string.
*/
export declare function isValidHost(host: string | (string[]) | undefined): host is string;
/**
    If there is a port number specified,
    you will receive `${hostname}:${port}`
*/
export declare function tryParseHost(req: Pick<Req, "app" | "headers" | "connection">): string | undefined;
/**
    Extracts the hostname and port from a host.
*/
export declare function parseHost(host: string): ParsedHost;
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
export declare function isHostWhitelisted(host: string, domainWhitelist: string[] | undefined): boolean;
/**
    Tries to parse a whitelisted host from the request.
    Returns `undefined` if a host cannot be parsed,
    or if the parsed host is not whitelisted.
*/
export declare function tryParseWhitelistedHost(req: Pick<Req, "app" | "headers" | "connection">, domainWhitelist: string[] | undefined): ParsedHost | undefined;
//# sourceMappingURL=util.d.ts.map