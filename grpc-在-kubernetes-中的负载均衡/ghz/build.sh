set -eux
VERSION=latest
docker build -f ./Dockerfile --tag ghz:${VERSION} .
docker tag ghz:${VERSION} harbor.yzf.best:1180/test/ghz:${VERSION}
docker push harbor.yzf.best:1180/test/ghz
