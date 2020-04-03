# E2E test for release process
E2E test with Playwright + Jest as test runner

### ENV's
* **URL** : string

### Local run
```sh
npm install
docker build -t prod-e2e:${package.json.version} .
docker run --network=host --env URL=${url} prod-e2e:${package.json.version}
```