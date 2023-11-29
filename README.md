# automation

## Before installation

### You must have installed on your machine :

- nodeJS version > 18

## How to run test ?

This test framework is based on **playwright**, to better understand all the project you can read the official documentation on https://playwright.dev/

## Install dependencies

```bash
npm install
npx playwright install --with-deps
```

## Run specific test

### By NPM script

```bash
npx playwright test --project binance --headed
```

```
Running 1 test using 1 worker

  ✓  1 [binance] › home.spec.ts:3:5 › has title (1.8s)

  1 passed (3.1s)

To open last HTML report run:

  pnpm exec playwright show-report
```

## Project configuration

There is a configuration file in the projet.

- **playwright.conf.ts**
