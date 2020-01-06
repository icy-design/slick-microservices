FROM golang:1.13-alpine AS builder

RUN apk add --no-cache ca-certificates git && \
      wget -qO/go/bin/dep https://github.com/golang/dep/releases/download/v0.5.0/dep-linux-amd64 && \
      chmod +x /go/bin/dep

ENV GO111MODULE=on
ENV GOPROXY=https://goproxy.cn,direct

# Download the dlv (delve) debugger for go (you can comment this out if unused)
RUN go get -u -v github.com/go-delve/delve/cmd/dlv

WORKDIR /src/shippingservice

# Copy the go.mod and go.sum, download the dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy rest of the application source code
COPY . .

# Compile the application to /app/shippingservice.
RUN go build -o /app/shippingservice .

FROM alpine AS release
RUN apk add --no-cache ca-certificates
RUN GRPC_HEALTH_PROBE_VERSION=v0.2.0 && \
    wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
    chmod +x /bin/grpc_health_probe

WORKDIR /shippingservice
COPY --from=builder /app/shippingservice ./server
ENV APP_PORT=50051
EXPOSE 50051

# Start the "dlv debug" server on port 3000 of the container.
ENTRYPOINT ["dlv", "exec", "/shippingservice/sever", "--continue", "--accept-multiclient", "--api-version=2", "--headless", "--listen=:3000", "--log"]
# ENTRYPOINT ["/shippingservice/sever"]
