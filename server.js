// node.jsのhttpモジュールを読み込む
const http = require("http");


// サーバオブジェクトの作成をしている
const server = http.createServer((req, res) => {
    // 受け付けたリクエストの詳細を表示
    console.log("リクエストを受け付けました。");
    console.log("method: ", req.method);
    console.log("url: ", req.url);
    console.log("==============================");

    //========================================
    // 各リクエストごとの処理
    //========================================
    if (req.url === "/") {
        res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
        res.end("<h1>トップページ</h1>");
        return;
    }

    if (req.url === "/about") {
        res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
        res.end("<h1>Aboutページ</h1>");
        return;
    }

    if (req.url === "/api/message") {
        res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
        res.end(JSON.stringify({ message: "こんにちは" }));
        return;
    }

    // 想定外のリクエストが来たとき
    res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    res.end("<h1>404 Not Found</h1>");
});

// node.jsがこの行を読み込むと、3000番ポートでアクセス待ちをする
server.listen(3000, () => {
    console.log("Server start");
    console.log("Server running: http://localhost:3000");
})
