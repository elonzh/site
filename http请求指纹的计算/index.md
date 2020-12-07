# HTTP请求指纹的计算


## 背景

最近在用Go语言做舆情监测相关的毕设，在做数据抓取模块时需要一个HTTP请求和响应存储的中间件，需要对请求和响应进行存储和去重，用到了请求指纹的计算。

## 请求指纹算法

什么是请求指纹呢？请求指纹指的是一个能唯一确定一个HTTP请求的哈希值，对于哈希值的计算我们有很多现成的算法，这里我们所需要关注的问题是如何确定一个请求的唯一性。

我们知道，一个HTTP请求，主要包括了请求方式，请求链接，请求头部和请求体几个部分组成，首先可以确定的是，当请求方式不同时请求肯定是不相同的，而对于请求链接，请求参数和请求体三个部分情况则需要具体讨论。

首先对于请求链接，RFC定义的链接基本形式如下:

`scheme://[userinfo@]host/path[?query][#fragment]`

`scheme`，`userinfo`，`host`，`path`，`query`是服务器决定其响应的部分，`fragment`是本地浏览器的标记，因此这一部分对我们的请求是不产生任何影响的，计算指纹时需将其去除。

对于`query`查询字段，我们知道，查询参数的顺序是不会影响请求的结果的，而且如果没有参数时是否带上`?`也不影响，也就是说`http://www.example.com/query?`和`http://www.example.com/query`这两个链接是相同的，`http://www.example.com/query?id=111&cat=222`和`http://www.example.com/query?cat=222&id=111`也是相同的。在计算请求指纹时我们需要先将请求的地址标准化（去掉`fragment`部分，强制添加`?`，对查询参数进行排序）。

接着是请求头部，一般来说，我们在发送请求时的头部是固定的，请求头部可能影响我们的响应也有可能不影响，而且服务器也会影响到我们的头部，如设置Cookie，因此这一部分的计算是否包含在内要视情况而定，因此在计算时作为可选部分。当计算头部时，由于头部的顺序是无关紧要的，计算时我们也需要对头部进行排序编码后进行计算

最后是请求体，最容易想到的是最常见提交表单请求，其内容和查询参数一样也是与顺序无关的查询字符串，那么请求体也需要对其处理吗？答案是否定的，尽管提交表单确实顺序无关的，但实际上协议并未对请求体内容做强制定义，比如我们可以带上二进制数据或者base64编码的数据等等。而且实际使用时请求体内容完全是由我们自己决定的。那么当请求体不同时，我们完全可以认为它是一个不同的请求了。

最终的请求指纹计算算法，用的是sha1哈希算法，sha1算法是安全散列标准（Secure Hash Standard）的第一个正式标准，后面还有第二三个版本的标准。目前sha1算法已经被破解，但对我们来说，我们的使用场景决定了我们并不关心使用sha1是否会被破解，因为我们并未用于加密数据。sha1相对于MD5算法碰撞概率已极大降低，而相对于后续版本的sha算法有着更快的计算速度，因此我们使用sha1算法作为我们计算请求指纹的哈希算法。

核心代码如下:

```Go
import (
    "bytes"
    "crypto/sha1"
    "io"
    "io/ioutil"
    "net/http"
    "net/url"
    "sort"
    "strings"
)

// 规范化Url
// 协议和域名部分不分大小写, 路径部分是否区分大小写则不一定, 要看具体网站后台是如何实现
// https://github.com/PuerkitoBio/purell 实现了更多的URL规范化规则
// See Python Package: w3lib.url.canonicalize_url
func CanonicalizeUrl(u url.URL, keepFragment bool) url.URL {
    // 将query排序后重新保存
    u.RawQuery = u.Query().Encode()
    // 确保即使没有RawQuery时的一致性
    u.ForceQuery = true
    if !keepFragment {
        u.Fragment = ""
    }
    return u
}

// 计算请求指纹
func RequestFingerprint(r *http.Request, withHeader bool) []byte {
    sha := sha1.New()
    io.WriteString(sha, r.Method)
    u := CanonicalizeUrl(*r.URL, false)
    io.WriteString(sha, u.String())
    if r.Body != nil {
        body, _ := r.GetBody()
        defer body.Close()
        b, _ := ioutil.ReadAll(body)
        sha.Write(b)
    }
    if withHeader {
        io.WriteString(sha, EncodeHeader(r.Header))
    }
    return sha.Sum(nil)
}

// 对Header进行格式化, 可以用于输出Header和计算哈希
// https://tools.ietf.org/html/rfc2616#section-4.2
// The order in which header fields with differing field names are
// received is not significant. However, it is "good practice" to send
// general-header fields first, followed by request-header or response-
// header fields, and ending with the entity-header fields.
func EncodeHeader(h http.Header) string {
    if h == nil {
        return ""
    }
    var buf bytes.Buffer
    keys := make([]string, 0, len(h))
    for k := range h {
        keys = append(keys, k)
    }
    // 对Header的键进行排序
    sort.Strings(keys)
    for _, k := range keys {
        // 对值进行排序
        buf.WriteString(k + ":" + strings.Join(h[k], ";") + "\n")
    }
    return buf.String()
}
```

实现上参考了Python中很出名的爬虫库`Scrapy`源码和它引用的`w3lib`库源码，有兴趣的可以通过下面的链接去查阅源码。

[scrapy/utils/request.py#L19](https://github.com/scrapy/scrapy/blob/129421c7e31b89b9b0f9c5f7d8ae59e47df36091/scrapy/utils/request.py#L19)

[w3lib/url.py#L425](https://github.com/scrapy/w3lib/blob/f46b4c4140dfd0081d34327d91f496f7a221bed7/w3lib/url.py#L425)

