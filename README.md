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