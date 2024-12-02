const { SerialPort } = require("serialport");
const WebSocket = require("ws");

// 아두이노 포트 연결
const arduinoPort = new SerialPort({
  path: "COM6", // 아두이노가 연결된 포트 확인 후 수정
  baudRate: 9600,
});

const wss = new WebSocket.Server({ port: 8081 });

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  // 아두이노 데이터 수신
  arduinoPort.on("data", (data) => {
    const message = data.toString().trim();
    console.log(`Received from Arduino: ${message}`); // 디버깅용

    // WebSocket 클라이언트로 데이터 전송
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message); // 클라이언트로 데이터 전송
      }
    });
  });

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

console.log("WebSocket server running on ws://localhost:8081");
