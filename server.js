// node.js標準モジュールの読み込み
const http = require("http");
const fs = require("fs");
const path = require("path");


/** 
 * HTTPサーバを作成する。
 * @param {http.IncomingMessage} req - クライアントからのリクエスト情報
 * @param {http.ServerResponse} res - クライアントへ返却するレスポンス
 */
const server = http.createServer((req, res) => {
    // 受け付けたリクエストの詳細を表示
    console.log("リクエストを受け付けました。");
    console.log("method: ", req.method);
    console.log("url: ", req.url);
    console.log("==============================");

    /**
     * リクエストURLに応じて返却対象のHTMLファイルを決定する
     * 条件に一致した場合のみファイルパスを設定する
     */
    let filePath = "";

    /**
     * 各リクエストごとの処理
     * 定義していないリクエストに関しては、404エラーを返す
     */
    if (req.url === "/") {
        filePath = path.join(__dirname, "public", "index.html");
    }
    else if (req.url === "/about") {
        filePath = path.join(__dirname, "public", "about.html");
    }
    else {
        res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
        res.end("<h1>404 Not Found</h1>");
        return;
    }

    /**
     * 対象のHTMLを読み込み、レスポンスとして返却する
     */
    fs.readFile(filePath, "utf-8", (err, data) => {
        // HTMLの読み込み失敗時は500エラーを返す
        if (err) {
            res.writeHead(500, {"Content-type": "text/plain; charset=utf-8"});
            res.end("500 Internal Server Error");
            return;
        }

        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.end(data);
    });
});

/**
 * 3000番ポートで待ち受けを開始する。
 * listen 実行後、ブラウザから http://localhost:3000 でアクセス可能になる。
 */
server.listen(3000, () => {
    console.log("Server start");
    console.log("Server running: http://localhost:3000");
})
