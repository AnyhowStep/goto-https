import * as tape from "tape";
import {parseHost} from "../../../../../dist";

tape(__filename, (t) => {
    t.deepEqual(
        parseHost(""),
        {
            host : "",
            hostname : "",
            port : undefined,
        }
    );
    t.deepEqual(
        parseHost("localhost"),
        {
            host : "localhost",
            hostname : "localhost",
            port : undefined,
        }
    );
    t.deepEqual(
        parseHost("localhost:1234"),
        {
            host : "localhost:1234",
            hostname : "localhost",
            port : 1234,
        }
    );
    t.deepEqual(
        parseHost("example.com"),
        {
            host : "example.com",
            hostname : "example.com",
            port : undefined,
        }
    );
    t.deepEqual(
        parseHost("example.com:123"),
        {
            host : "example.com:123",
            hostname : "example.com",
            port : 123,
        }
    );
    t.deepEqual(
        parseHost("subdomain.example.com"),
        {
            host : "subdomain.example.com",
            hostname : "subdomain.example.com",
            port : undefined,
        }
    );
    t.deepEqual(
        parseHost("subdomain.example.com:678"),
        {
            host : "subdomain.example.com:678",
            hostname : "subdomain.example.com",
            port : 678,
        }
    );
    t.deepEqual(
        parseHost("[123::576::]"),
        {
            host : "[123::576::]",
            hostname : "[123::576::]",
            port : undefined,
        }
    );
    t.deepEqual(
        parseHost("[123::576::]:888"),
        {
            host : "[123::576::]:888",
            hostname : "[123::576::]",
            port : 888,
        }
    );
    t.end();
});