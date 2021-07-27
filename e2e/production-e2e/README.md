# E2E test for release process
E2E test with Playwright + Jest as test runner

### ENV's
* **URL** : string - defaul: http://localhost
* **LOAD_MODEL**: boolean - set true for upload census model from /models

### Local run
```sh
docker build -t prod-e2e .
docker run --network=host -e URL=http://localhost -e LOAD_MODEL=true prod-e2e
```