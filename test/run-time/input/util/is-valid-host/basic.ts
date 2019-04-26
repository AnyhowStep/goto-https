import * as tape from "tape";
import {isValidHost} from "../../../../../dist";

tape(__filename, (t) => {
    t.false(isValidHost(""));
    t.true(isValidHost("non-empty-string"));
    t.true(isValidHost("localhost"));
    t.true(isValidHost("example.com"));
    t.true(isValidHost("subdomain.example.com"));

    t.false(isValidHost(undefined));
    t.false(isValidHost(["localhost"]));
    t.false(isValidHost(["localhost", "localhost"]));

    t.end();
});