import * as tape from "tape";
import {isHostWhitelisted} from "../../../../../dist";

tape(__filename, (t) => {
    t.true(isHostWhitelisted("example.com", []));
    t.true(isHostWhitelisted("example.com", ["", " ", "   ", "\t", "\t \t "]));
    t.true(isHostWhitelisted("example.com", ["example.com"]));
    t.true(isHostWhitelisted("subdomain.example.com", ["example.com"]));
    t.true(isHostWhitelisted("subdomain.example.com", ["subdomain.example.com"]));

    t.true(isHostWhitelisted("other.com", []));
    t.false(isHostWhitelisted("other.com", ["example.com"]));
    t.false(isHostWhitelisted("subdomain.example.com", ["othersub.example.com"]));

    t.true(isHostWhitelisted(
        "subdomain.example.com",
        [
            "a.com",
            "b.com",
            "othersub.example.com",
            "subdomain.example.com",
            "c.com",
        ]
    ));
    t.true(isHostWhitelisted(
        "subdomain.example.com",
        [
            "a.com",
            "b.com",
            "othersub.example.com",
            "example.com",
            "c.com",
        ]
    ));

    t.true(isHostWhitelisted("localhost", ["localhost"]));
    t.true(isHostWhitelisted("sub.localhost", ["localhost"]));
    t.true(isHostWhitelisted("sub.localhost", ["sub.localhost"]));
    t.false(isHostWhitelisted("sub.localhost", ["other.localhost"]));

    t.end();
});