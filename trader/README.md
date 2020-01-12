# Trader app

## Setup

```
npm i
npm run build-deps
```

The `build-deps` script is only used to build unpublished npm package from github.

Create `config.json` conforming to `IConfig` interface in root dir.
Add `service-account-key.json` file with GCP service account key to trader root dir.

## Development

```
npm run dev
```

## Production

```
npm start
```
