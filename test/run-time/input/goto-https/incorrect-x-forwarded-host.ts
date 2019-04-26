import * as tape from "tape";
import {gotoHttps} from "../../../../dist";

tape(__filename, async (t) => {
    const middleware = gotoHttps({
        enabled : true,
        hostDomainWhitelist : [
            "other.com"
        ],
    });
    await new Promise((resolve, reject) => {
        const rejectTimeout = setTimeout(() => {
            reject(new Error(`Waited too long for redirect() to be called`));
        }, 1000);
        middleware(
            {
                secure : false,
                headers : {
                    "x-forwarded-host" : "example.com",
                    "host" : "other.com",
                },
                app : {
                    get : () => {
                        return () => true;
                    },
                },
                connection : {
                    remoteAddress : "127.0.0.1",
                },
                originalUrl : "/some/path?key=value&key2=value2",
            },
            {
                status : (status) => {
                    t.deepEqual(status, 404);
                    return {
                        end : () => {
                            clearTimeout(rejectTimeout);
                            resolve();
                        },
                    };
                },
                redirect : () => {
                },
            },
            () => {
            }
        );
    }).catch((err) => {
        t.fail(err.message);
    });

    t.end();
});