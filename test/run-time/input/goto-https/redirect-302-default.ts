import * as tape from "tape";
import {gotoHttps} from "../../../../dist";

tape(__filename, async (t) => {
    const middleware = gotoHttps({
        enabled : true,
        hostDomainWhitelist : [
            "example.com"
        ],
        onRedirect : () => {
            return true;
        },
    });
    await new Promise((resolve, reject) => {
        const rejectTimeout = setTimeout(() => {
            reject(new Error(`Waited too long for redirect() to be called`));
        }, 1000);
        middleware(
            {
                secure : false,
                headers : {
                    "host" : "subdomain.example.com",
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
                status : () => {
                    return {
                        end : () => {
                        },
                    };
                },
                redirect : (status, url) => {
                    clearTimeout(rejectTimeout);
                    t.deepEqual(status, 302);
                    t.deepEqual(url, "https://subdomain.example.com/some/path?key=value&key2=value2");
                    resolve();
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