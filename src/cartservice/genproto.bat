@rem Generate the C# code for .proto files

setlocal

@rem enter this directory
cd /d %~dp0

set NUGET_PATH=%UserProfile%\.nuget\packages
set TOOLS_PATH=%NUGET_PATH%\Grpc.Tools\1.12.0\tools\windows_x64

%TOOLS_PATH%\protoc.exe -I%~dp0/../../pb;%NUGET_PATH%\google.protobuf.tools\3.5.1\tools\ --csharp_out %~dp0\grpc_generated %~dp0\..\..\pb\demo.proto --grpc_out %~dp0\grpc_generated --plugin=protoc-gen-grpc=%TOOLS_PATH%\grpc_csharp_plugin.exe

endlocal
