FROM ubuntu:bionic
WORKDIR /app
ADD ghz-linux-x86_64.tar.gz .
COPY grpcbin.proto .
RUN chown -Rv root:root .
ENTRYPOINT [ "./ghz" ]
