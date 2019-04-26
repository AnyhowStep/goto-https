import * as tape from "tape";
import {gotoHttps} from "../../../../dist";

tape(__filename, async (t) => {
    const middleware = gotoHttps({
        enabled : true,
        hostDomainWhitelist : [],
        onRedirect : () => {
            return false;
        },
    });
    await new Promise((resolve, reject) => {
        const rejectTimeout = setTimeout(() => {
            reject(new Error(`Waited too long for next() to be called`));
        }, 1000);
        middleware(
            {
                secure : false,
                headers : {
                    "host" : "example.com",
                },
                app : {
                    get : () => {
                        return () => true;
                    },
                },
                connection : {
                    remoteAddress : "127.0.0.1",
                },
                originalUrl : "",
            },
            {
                status : () => {
                    return {
                        end : () => {},
                    };
                },
                redirect : () => {},
            },
            () => {
                clearTimeout(rejectTimeout);
                t.pass("Next called");
                resolve();
            }
        );
    }).catch((err) => {
        t.fail(err.message);
    });

    t.end();
});