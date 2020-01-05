#!/bin/bash -eu

# Generate the C# code for .proto files
set -e

PROTODIR=../../pb

# enter this directory
CWD="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

protoc --csharp_out=$CWD/grpc_generated -I $PROTODIR $PROTODIR/demo.proto

