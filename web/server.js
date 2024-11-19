const WebSocket = require("ws");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const PORT = 3002; // 웹소켓 포트 번호 설정

// 웹소켓 서버 설정
const wss = new WebSocket.Server({ port: PORT });
console.log(`WebSocket server is running on ws://localhost:${PORT}`); // 서버 포트 표시

const port = new SerialPort({ path: "COM3", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  parser.on("data", (data) => {
    console.log("Received from Arduino:", data.trim());

    const match = data.match(/\d+/); // 데이터에서 숫자 부분만 추출
    if (match) {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(match[0]); // 숫자 부분만 전송
        }
      });
    }
  });

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});
