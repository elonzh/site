package main

import (
	"context"
	"flag"
	"fmt"
	"io/ioutil"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/mux"
	"github.com/rancher/remotedialer"
	"github.com/sirupsen/logrus"
)

var (
	clients = map[string]*http.Client{}
	l       sync.Mutex
)

func getClient(server *remotedialer.Server, clientKey string, timeout time.Duration) *http.Client {
	l.Lock()
	defer l.Unlock()

	key := fmt.Sprintf("%s/%s", clientKey, timeout)
	client := clients[key]
	if client != nil {
		return client
	}

	dialer := server.Dialer(clientKey, 15*time.Second)
	client = &http.Client{
		Transport: &http.Transport{
			Dial: dialer,
		},
		Timeout: timeout,
	}
	clients[key] = client
	return client
}

func checkHTTPError(resp *http.Response, event string) error {
	if resp == nil {
		return nil
	}
	if resp.StatusCode < http.StatusOK || resp.StatusCode >= http.StatusBadRequest {
		data, _ := ioutil.ReadAll(resp.Body)
		return fmt.Errorf("%s got %d: %s", event, resp.StatusCode, string(data))
	}
	return nil
}

func sendRequest(client *http.Client) {
	// url := "http://jenkins.p-p4ls4-pipeline.172.24.28.2.xip.io/job/pipeline_p-wdg7z-25/lastBuild/wfapi/"
	url := "http://jenkins.p-p4ls4-pipeline.172.24.28.2.xip.io/job/pipeline_p-wdg7z-25/lastBuild/execution/node/51/wfapi"
	req, _ := http.NewRequest(http.MethodGet, url, nil)
	req.SetBasicAuth("admin", "gw9qpzz492ggqwbbgbffht9z2dqt9n9dwj6frkwv2fs22g74rf8m6r")
	for range time.Tick(time.Second) {
		fmt.Println("================================================\n\n")
		resp, err := client.Do(req)
		if err != nil {
			logrus.Println(err)
			continue
		}
		err = checkHTTPError(resp, "response error")
		if err != nil {
			logrus.Println(err)
		} else {
			logrus.Println("normal response")
			b, _ := ioutil.ReadAll(resp.Body)
			logrus.Println(string(b))
		}
	}
}

func main() {
	var (
		addr string
		id   string
	)
	flag.StringVar(&addr, "listen", ":8123", "Listen address")
	flag.StringVar(&id, "id", "test-peer", "")
	flag.Parse()

	logrus.SetLevel(logrus.DebugLevel)
	remotedialer.PrintTunnelData = true

	authorizer := func(req *http.Request) (string, bool, error) {
		id := req.Header.Get("x-tunnel-id")
		return id, id != "", nil
	}
	server := remotedialer.New(authorizer, remotedialer.DefaultErrorWriter)

	go func() {
		router := mux.NewRouter()
		router.Handle("/connect", server)
		fmt.Println("Listening on ", addr)
		err := http.ListenAndServe(addr, router)
		if err != nil {
			logrus.Fatalln(err)
		}
	}()

	time.Sleep(time.Second)
	go func() {
		headers := http.Header{
			"X-Tunnel-ID": []string{id},
		}
		remotedialer.ClientConnect(context.Background(), "ws://localhost:8123/connect", headers, nil, func(string, string) bool { return true }, nil)
	}()

	time.Sleep(3 * time.Second)
	client := getClient(server, id, time.Second)
	sendRequest(client)
}
