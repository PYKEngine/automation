# automation

## Before installation

### You must have installed on your machine :

- nodeJS version > 18

## How to run test ?

This test framework is based on **playwright**, to better understand all the project you can read the official documentation on https://playwright.dev/

## Install dependencies

```bash
pnpm install
npx playwright install --with-deps
```

## Run project test

### By NPM script

```bash
npx playwright test --project binance --headed
```

You should see the following logs in your terminal

```
Running 4 tests using 3 workers

  ✓  1 [binance-setup] › binance.setup.ts:11:8 › Setup scenario for BNBBTC (1.5s)
Setup complete
     2 [binance] › binance\perf.spec.ts:4:7 › Performances › Get performance metrics
     3 [binance] › binance\perf.spec.ts:26:7 › Performances › Capture performance traces by marking actions using Performance API
     4 [binance] › binance\stream.spec.ts:13:9 › Stream › Check buffer for BTC_USDT
```

### Show report

Once tests are done, report will automaticaly display if there had at least one failure during tests.
Otherwise, you can run the script to show them anytime.

```bash
pnpm exec playwright show-report
```

## Project configuration

There is a configuration file in the projet.

- **playwright.conf.ts**

See related doc: https://playwright.dev/docs/test-configuration
