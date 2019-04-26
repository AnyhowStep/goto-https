import * as tape from "tape";
import {tryParseHost} from "../../../../../dist";

tape(__filename, (t) => {
    t.deepEqual(
        tryParseHost({
            app : {
                get : () => {
                    return () => false;
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
                    return () => false;
                },
            },
            connection : {
                remoteAddress : undefined,
            },
            headers : {
                "host" : "somehost"
            },
        }),
        "somehost"
    );
    t.deepEqual(
        tryParseHost({
            app : {
                get : () => {
                    return () => false;
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
                    return () => false;
                },
            },
            connection : {
                remoteAddress : undefined,
            },
            headers : {
                "x-forwarded-host" : "somehost"
            },
        }),
        undefined
    );
    t.deepEqual(
        tryParseHost({
            app : {
                get : () => {
                    return () => false;
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
                    return () => false;
                },
            },
            connection : {
                remoteAddress : undefined,
            },
            headers : {
                "x-forwarded-host" : "somehost",
                "host" : "otherhost",
            },
        }),
        "otherhost"
    );
    t.deepEqual(
        tryParseHost({
            app : {
                get : () => {
                    return () => false;
                },
            },
            connection : {
                remoteAddress : undefined,
            },
            headers : {
                "x-forwarded-host" : ["somehost"],
                "host" : "otherhost",
            },
        }),
        "otherhost"
    );
    t.deepEqual(
        tryParseHost({
            app : {
                get : () => {
                    return () => false;
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
                    return () => false;
                },
            },
            connection : {
                remoteAddress : undefined,
            },
            headers : {
                "x-forwarded-host" : "somehost",
                "host" : ["otherhost"],
            },
        }),
        undefined
    );

    t.end();
});