import * as tape from "tape";
import {tryParseWhitelistedHost} from "../../../../../dist";

tape(__filename, (t) => {
    t.deepEqual(
        tryParseWhitelistedHost(
            {
                app : {
                    get : () => {
                        return () => true;
                    },
                },
                connection : {
                    remoteAddress : undefined,
                },
                headers : {},
            },
            []
        ),
        undefined
    );
    t.deepEqual(
        tryParseWhitelistedHost(
            {
                app : {
                    get : () => {
                        return () => true;
                    },
                },
                connection : {
                    remoteAddress : undefined,
                },
                headers : {
                    "host" : "somehost"
                },
            },
            []
        ),
        {
            host : "somehost",
            hostname : "somehost",
            port : undefined,
        }
    );
    t.deepEqual(
        tryParseWhitelistedHost(
            {
                app : {
                    get : () => {
                        return () => true;
                    },
                },
                connection : {
                    remoteAddress : undefined,
                },
                headers : {
                    "host" : "somehost"
                },
            },
            [
                "otherhost"
            ]
        ),
        undefined
    );
    t.deepEqual(
        tryParseWhitelistedHost(
            {
                app : {
                    get : () => {
                        return () => true;
                    },
                },
                connection : {
                    remoteAddress : undefined,
                },
                headers : {
                    "host" : "somehost"
                },
            },
            [
                "otherhost",
                "somehost",
            ]
        ),
        {
            host : "somehost",
            hostname : "somehost",
            port : undefined,
        }
    );
    t.deepEqual(
        tryParseWhitelistedHost(
            {
                app : {
                    get : () => {
                        return () => true;
                    },
                },
                connection : {
                    remoteAddress : undefined,
                },
                headers : {
                    "host" : ["somehost"]
                },
            },
            [
                "somehost"
            ]
        ),
        undefined
    );
    t.deepEqual(
        tryParseWhitelistedHost(
            {
                app : {
                    get : () => {
                        return () => true;
                    },
                },
                connection : {
                    remoteAddress : undefined,
                },
                headers : {
                    "x-forwarded-host" : "somehost"
                },
            },
            [
                "somehost"
            ]
        ),
        {
            host : "somehost",
            hostname : "somehost",
            port : undefined,
        }
    );
    t.deepEqual(
        tryParseWhitelistedHost(
            {
                app : {
                    get : () => {
                        return () => true;
                    },
                },
                connection : {
                    remoteAddress : undefined,
                },
                headers : {
                    "x-forwarded-host" : "somehost"
                },
            },
            [
                "otherhost"
            ]
        ),
        undefined
    );
    t.deepEqual(
        tryParseWhitelistedHost(
            {
                app : {
                    get : () => {
                        return () => true;
                    },
                },
                connection : {
                    remoteAddress : undefined,
                },
                headers : {
                    "x-forwarded-host" : "somehost"
                },
            },
            []
        ),
        {
            host : "somehost",
            hostname : "somehost",
            port : undefined,
        }
    );
    t.deepEqual(
        tryParseWhitelistedHost(
            {
                app : {
                    get : () => {
                        return () => true;
                    },
                },
                connection : {
                    remoteAddress : undefined,
                },
                headers : {
                    "x-forwarded-host" : "somehost",
                    "host" : "otherhost"
                },
            },
            [
                "somehost"
            ]
        ),
        {
            host : "somehost",
            hostname : "somehost",
            port : undefined,
        }
    );
    t.deepEqual(
        tryParseWhitelistedHost(
            {
                app : {
                    get : () => {
                        return () => true;
                    },
                },
                connection : {
                    remoteAddress : undefined,
                },
                headers : {
                    "x-forwarded-host" : "somehost",
                    "host" : "otherhost"
                },
            },
            [
                "otherhost"
            ]
        ),
        undefined
    );
    t.deepEqual(
        tryParseWhitelistedHost(
            {
                app : {
                    get : () => {
                        return () => true;
                    },
                },
                connection : {
                    remoteAddress : undefined,
                },
                headers : {
                    "x-forwarded-host" : "somehost",
                    "host" : "otherhost"
                },
            },
            []
        ),
        {
            host : "somehost",
            hostname : "somehost",
            port : undefined,
        }
    );
    t.deepEqual(
        tryParseWhitelistedHost(
            {
                app : {
                    get : () => {
                        return () => true;
                    },
                },
                connection : {
                    remoteAddress : undefined,
                },
                headers : {
                    "x-forwarded-host" : ["somehost"],
                    "host" : "otherhost"
                },
            },
            [
                "otherhost"
            ]
        ),
        {
            host : "otherhost",
            hostname : "otherhost",
            port : undefined,
        }
    );
    t.deepEqual(
        tryParseWhitelistedHost(
            {
                app : {
                    get : () => {
                        return () => true;
                    },
                },
                connection : {
                    remoteAddress : undefined,
                },
                headers : {
                    "x-forwarded-host" : ["somehost"],
                    "host" : "otherhost"
                },
            },
            [
                "somehost"
            ]
        ),
        undefined
    );
    t.deepEqual(
        tryParseWhitelistedHost(
            {
                app : {
                    get : () => {
                        return () => true;
                    },
                },
                connection : {
                    remoteAddress : undefined,
                },
                headers : {
                    "x-forwarded-host" : ["somehost"],
                    "host" : "otherhost"
                },
            },
            []
        ),
        {
            host : "otherhost",
            hostname : "otherhost",
            port : undefined,
        }
    );
    t.deepEqual(
        tryParseWhitelistedHost(
            {
                app : {
                    get : () => {
                        return () => true;
                    },
                },
                connection : {
                    remoteAddress : undefined,
                },
                headers : {
                    "x-forwarded-host" : ["somehost"],
                    "host" : ["otherhost"]
                },
            },
            []
        ),
        undefined
    );

    t.end();
});