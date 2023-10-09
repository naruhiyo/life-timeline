# life-timeline
## Getting Started

1. Create network

```console
$ docker network create lifetimeline_default
```

2. Build docker image

```console
$ docker compose build
```

3. Run the development server

```consle
$ docker compose up
```

4. Open [http://localhost:3000](http://localhost:3000)

## Run Test

1. Run the container

```console
$ docker compose up -d
```

2. Run test

```console
$ docker compose exec app npm run test
```

3. Stop the container

```console
$ docker compose down
```

## For Developpers
- Node.js: 18.16.0
- npm: 9.8.1
