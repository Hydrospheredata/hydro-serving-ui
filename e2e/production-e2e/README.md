# E2E test for release process
E2E test with Playwright + Jest as test runner

### ENV's
* **URL** : string - defaul: http://localhost

### Argumets
* **LoadModel**: boolean - set true for upload census model from /models
* **Sever**: string - server url for cluster (needed for hs cli)

### Local run
```sh
npm install
docker build -t prod-e2e .
docker run --network=host --env URL=http://localhost prod-e2e true http://localhost
```