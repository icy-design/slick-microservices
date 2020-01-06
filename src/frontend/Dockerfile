FROM golang:1.13-alpine as builder

RUN apk add --no-cache ca-certificates git && \
      wget -qO/go/bin/dep https://github.com/golang/dep/releases/download/v0.5.0/dep-linux-amd64 && \
      chmod +x /go/bin/dep

ENV GO111MODULE=on
ENV GOPROXY=https://goproxy.cn,direct

# Download the dlv (delve) debugger for go (you can comment this out if unused)
RUN go get -u -v github.com/go-delve/delve/cmd/dlv

WORKDIR /src/frontend

# Copy the go.mod and go.sum, download the dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy rest of the application source code
COPY . .

# Compile the application to /app/frontend.
RUN go build -o /app/frontend .

FROM alpine as release
RUN apk add --no-cache ca-certificates \
    busybox-extras net-tools bind-tools
WORKDIR /frontend
COPY --from=builder /app/frontend ./server
COPY ./templates ./templates
COPY ./static ./static
EXPOSE 8080

# Start the "dlv debug" server on port 3000 of the container.
ENTRYPOINT ["dlv", "exec", "/frontend/sever", "--continue", "--accept-multiclient", "--api-version=2", "--headless", "--listen=:3000", "--log"]
# ENTRYPOINT ["/frontend/sever"]
