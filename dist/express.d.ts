/**
    An `express` request object.
    Must handle `"trust proxy"` settings properly.
*/
export interface Req {
    secure: boolean;
    /**
        With express 4, `req.host` and `req.hostname` do not include the port...
        Seems like this is a bug but will be fixed in express 5.

        Because express 4 has this bug, we'll need to have our own `host` implementation.
        Just copy+paste their implementation and fix the bug.

        We use `headers` to parse the host
    */
    headers: {
        [k: string]: string | (string[]) | undefined;
    };
    app: {
        get: (key: "trust proxy fn") => ((remoteAddress: string | undefined, index: number) => boolean);
    };
    connection: {
        remoteAddress?: string | undefined;
    };
    /**
        Should be `${path}` or `${path}?${query}`.

        e.g. `/some/path`, `/path/to/resource?key=value&key2=value2`
    */
    originalUrl: string;
}
/**
    An `express` response object.
*/
export interface Res {
    status(status: number): {
        end(): void;
    };
    redirect(status: number, url: string): void;
}
/**
    Middleware function that works with express
*/
export declare type Middleware = (req: Req, res: Res, next: () => void) => void;
//# sourceMappingURL=express.d.ts.map