package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/balancer/roundrobin"
	ecpb "google.golang.org/grpc/examples/features/proto/echo"
)

func main() {
	target := os.Getenv("ECHO_SERVER")
	if target == ""
		// 使用 dns 解析器
		target = "dns:///echo-server:9000"
	}
	log.Println("target:", target)

	// 建立连接
	ctx, _ := context.WithTimeout(context.Background(), 3*time.Second)
	conn, err := grpc.DialContext(
		ctx,
		target,
		grpc.WithBlock(),
		grpc.WithInsecure(),
		// 负载均衡策略
		grpc.WithBalancerName(roundrobin.Name),
	)
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}

	client := ecpb.NewEchoClient(conn)
	// 1 秒请求一次
	messageID := 0
	for range time.Tick(1*time.Second){
		messageID++
		ctx, _ := context.WithTimeout(context.Background(), 3*time.Second)
		response, err := client.UnaryEcho(ctx, &ecpb.EchoRequest{Message: fmt.Sprintf("message %d", messageID)})
		if err != nil {
			log.Fatalf("could not send request: %v", err)
		}
		log.Println(response.Message)
	}
}
