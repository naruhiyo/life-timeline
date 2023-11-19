# life-timeline

## Getting Started

1. Build docker image

```console
$ docker compose build
```

2. Run the development server

```consle
$ docker compose up -d web
```

3. Open [http://localhost:3000](http://localhost:3000)

## Run Test

1. Run the container

```console
$ docker compose up -d
```

2. Run test

```console
# Unit Test
$ docker compose exec web npm run test

# E2E
$ docker compose run --rm e2e
```

3. Stop the container

```console
$ docker compose down
```

## For Developpers

- Node.js: 18.16.0
- npm: 9.8.1
