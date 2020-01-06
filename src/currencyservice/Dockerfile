FROM node:10-alpine as base

FROM base as builder

# Some packages (e.g. @google-cloud/profiler) require additional
# deps for post-install scripts
RUN apk add --update --no-cache \
    python \
    make \
    g++

WORKDIR /src/currencyservice

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --only=production

FROM base

RUN GRPC_HEALTH_PROBE_VERSION=v0.2.0 && \
    wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
    chmod +x /bin/grpc_health_probe

WORKDIR /currencyservice

COPY --from=builder /src/currencyservice/node_modules ./node_modules

# Copy rest of the application csource code
COPY . .

EXPOSE 7000

# Run app.js with debugging port when container launches
ENTRYPOINT ["node", "--inspect=9229", "server.js"]
# ENTRYPOINT [ "node", "server.js" ]
