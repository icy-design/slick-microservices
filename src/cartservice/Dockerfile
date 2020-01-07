FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS builder
WORKDIR /src/cartservice
COPY . .
RUN dotnet restore && \
    dotnet build && \
    dotnet publish -c Debug -r linux-musl-x64 -o /app/cartservice

# cartservice
FROM alpine:3.8

RUN GRPC_HEALTH_PROBE_VERSION=v0.2.0 && \
    wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
    chmod +x /bin/grpc_health_probe

# Dependencies for runtime
# busybox-extras => telnet
RUN apk add --no-cache \
    bash \
    busybox-extras \
    curl \
    libc6-compat \
    libunwind \
    libuuid \
    libgcc \
    libstdc++ \
    libintl \
    icu
WORKDIR /cartservice
COPY --from=builder /app/cartservice .

# Installing vsdbg on the container to enable debugging of .NET Core
RUN apk add --no-cache unzip procps \
    && rm -rf /var/lib/apt/lists/* \
    && curl -sSL https://aka.ms/getvsdbgsh | bash /dev/stdin -v latest -l /vsdbg

ENTRYPOINT ["/cartservice/cartservice", "start"]
