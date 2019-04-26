### `goto-https`

An `express` middleware that redirects requests to `https://`, if necessary.

### Installation

```
npm install --save goto-https
```

### Basic Usage

```ts
import * as express from "express";
import {gotoHttps} from "goto-https";

declare const trustProxy : boolean;

app = express();
/*
    Set to `true` if you are behind Nginx or some other proxy.
*/
app.set("trust proxy", trustProxy);
app.use(gotoHttps({
    enabled : true,
    /*
        You should not leave this empty.
        If your website is `example.com`,
        then you should put `example.com` in this array.
    */
    hostDomainWhitelist : [],
}));
```

See the type `GotoHttpsOptions` in `src/goto-https.ts` for more options.

### Features

+ Domain whitelisting
+ `RedirectDelegate` (See `src/goto-https.ts`) to control redirect behaviour

### Tests

See the `test/run-time/input` folder.

```
npm run test-run-time
```

### Implementation Details

+ `req.headers["host"]` and `req.headers["x-forwarded-host"]` may be used,
  depending on express' `trust proxy fn`.

+ The redirect URL is derived by `"https://" + parsedHost.host + req.originalUrl`.

+ If an invalid host is found, the middleware responds with status code `404`.

+ The default redirect status code is `302`.

+ A valid host is a `string` that is non-empty and not all whitespace.

### `hostDomainWhitelist`

+ Whitelisting `domain.com` will also whitelist all domains that end with the string `domain.com`.
  e.g. `subdomain1.domain.com`, `subdomain2.domain.com`, etc.

+ To whitelist specific subdomains, add each subdomain to the array individually.

  ```ts
  const hostDomainWhitelist = [
      `subdomain1.domain.com`,
      `subdomain4.domain.com`,
  ];
  //subdomain2.domain.com and subdomain3.domain.com are not whitelisted.
  //domain.com is also not whitelisted.
  ```