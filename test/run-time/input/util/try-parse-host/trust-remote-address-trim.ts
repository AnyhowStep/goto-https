import * as tape from "tape";
import {tryParseHost} from "../../../../../dist";

tape(__filename, (t) => {
    t.deepEqual(
        tryParseHost({
            app : {
                get : () => {
                    return () => true;
                },
            },
            connection : {
                remoteAddress : undefined,
            },
            headers : {},
        }),
        undefined
    );
    t.deepEqual(
        tryParseHost({
            app : {
                get : () => {
                    return () => true;
                },
            },
            connection : {
                remoteAddress : undefined,
            },
            headers : {
                "host" : " somehost  \n"
            },
        }),
        "somehost"
    );
    t.deepEqual(
        tryParseHost({
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
        }),
        undefined
    );
    t.deepEqual(
        tryParseHost({
            app : {
                get : () => {
                    return () => true;
                },
            },
            connection : {
                remoteAddress : undefined,
            },
            headers : {
                "x-forwarded-host" : "\tsomehost \n\n "
            },
        }),
        "somehost"
    );
    t.deepEqual(
        tryParseHost({
            app : {
                get : () => {
                    return () => true;
                },
            },
            connection : {
                remoteAddress : undefined,
            },
            headers : {
                "x-forwarded-host" : ["somehost"]
            },
        }),
        undefined
    );
    t.deepEqual(
        tryParseHost({
            app : {
                get : () => {
                    return () => true;
                },
            },
            connection : {
                remoteAddress : undefined,
            },
            headers : {
                "x-forwarded-host" : "\n\t  somehost\n\t",
                "host" : "otherhost",
            },
        }),
        "somehost"
    );
    t.deepEqual(
        tryParseHost({
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
                "host" : "  otherhost  ",
            },
        }),
        "otherhost"
    );
    t.deepEqual(
        tryParseHost({
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
                "host" : ["otherhost"],
            },
        }),
        undefined
    );
    t.deepEqual(
        tryParseHost({
            app : {
                get : () => {
                    return () => true;
                },
            },
            connection : {
                remoteAddress : undefined,
            },
            headers : {
                "x-forwarded-host" : "  \tsomehost\t",
                "host" : ["otherhost"],
            },
        }),
        "somehost"
    );

    t.end();
});