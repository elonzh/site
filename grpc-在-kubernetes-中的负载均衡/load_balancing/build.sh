set -eux

go build -o output/echo_server ./server/main.go
go build -o output/load_balancing_client ./client/main.go

VERSION=latest
docker build -f ./Dockerfile --tag load_balancing_test:${VERSION} .
docker tag load_balancing_test:${VERSION} harbor.yzf.best:1180/test/load_balancing_test:${VERSION}
docker push harbor.yzf.best:1180/test/load_balancing_test

rm -rvf output

kubectl delete -f client/deploy.yaml -f server/deploy.yaml
kubectl apply -f server/deploy.yaml
kubectl rollout status --watch deploy/echo-server
kubectl apply -f client/deploy.yaml
kubectl rollout status --watch deploy/load-balancing-client
