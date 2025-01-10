# syntax=docker/dockerfile:1.4
FROM --platform=$BUILDPLATFORM golang:alpine3.20 AS builder
RUN echo "hello there"

ENV CGO_ENABLED 0
ENV GOPATH /go
ENV GOCACHE /go-build

COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod/cache \
    go mod download

COPY . .

RUN --mount=type=cache,target=/go/pkg/mod/cache \
    --mount=type=cache,target=/go-build \
    go build -o hut-finder-api ./cmd/server/main.go

FROM golang:alpine3.20 AS runtime
COPY . .
COPY --from=builder /go/hut-finder-api /usr/local/bin/
CMD ["/usr/local/bin/hut-finder-api"]

FROM builder as dev-envs
RUN <<EOF
apk update
apk add git
EOF

RUN <<EOF
addgroup -S docker
adduser -S --shell /bin/bash --ingroup docker vscode
EOF

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /