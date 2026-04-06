// node.js標準モジュールの読み込み
const http = require("http");
const fs = require("fs");
const path = require("path");

/**
 * 指定された拡張子に応じて、Content-Typeを返す
 */
function getContentType(filePath) {
    const ext = path.extname(filePath);
    let contentType = "";

    if (ext === ".html") {
        contentType = "text/html; charset=utf-8";
    }
    else if (ext === ".css") {
        contentType = "text/css; charset=utf-8";
    }
    
    return contentType;
}

/** 
 * HTTPサーバを作成する。
 * @param {http.IncomingMessage} req - クライアントからのリクエスト情報
 * @param {http.ServerResponse} res - クライアントへ返却するレスポンス
 */
const server = http.createServer((req, res) => {
    // 受け付けたリクエストの詳細を表示
    console.log("[request]method:" + req.method + "  uri:" + req.url);

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
    else if (req.url === "/style.css") {
        filePath = path.join(__dirname, "public", "style.css");
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
        
        /**
         * 指定されたリクエストに応じて、Content-Typeを取得する
         */
        const contentType = getContentType(filePath);

        res.writeHead(200, {"Content-Type": contentType});
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
