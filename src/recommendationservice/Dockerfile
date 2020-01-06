FROM python:2.7-slim AS base

FROM base as builder

RUN apt-get update -qqy && \
	apt-get -qqy install wget g++ && \
	rm -rf /var/lib/apt/lists/*

# copy the requirements file used for dependencies
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Install ptvsd for debugging
RUN pip install ptvsd

FROM base as final
# Enable unbuffered logging
ENV PYTHONUNBUFFERED=0

RUN apt-get -qq update \
    && apt-get install -y --no-install-recommends \
        wget

# download the grpc health probe
RUN GRPC_HEALTH_PROBE_VERSION=v0.2.0 && \
    wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
    chmod +x /bin/grpc_health_probe

# get packages
WORKDIR /recommendationservice

# Grab packages from builder
COPY --from=builder /usr/local/lib/python2.7/ /usr/local/lib/python2.7/

# Add the application
COPY . .

# set listen port
ENV PORT "8080"
EXPOSE 8080

# Run recommendation_server.py when the container launches
ENTRYPOINT ["python", "-m", "ptvsd", "--port", "3000", "--host", "0.0.0.0", "recommendation_server.py"]
