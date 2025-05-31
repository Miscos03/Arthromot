#include <WiFi.h>
#include <WebServer.h>
#include <WebSocketsServer.h>
#include <math.h>

// WiFi credentials
const char* ssid = "********";
const char* password = "********";

WebServer server(80);
WebSocketsServer webSocket = WebSocketsServer(82);

// L298N Motor Pins
const int IN1 = 18;
const int IN2 = 19;
const int IN3 = 21;
const int IN4 = 22;

// Arm radius and step config
const float radius = 200.0;
const int stepsPerRev = 200;
const int halfStepsPerRev = 400; // 8-step sequence = 400 half steps

// Half-step sequence
const int stepSequence[8][4] = {
  {1, 0, 0, 0},
  {1, 0, 1, 0},
  {0, 0, 1, 0},
  {0, 1, 1, 0},
  {0, 1, 0, 0},
  {0, 1, 0, 1},
  {0, 0, 0, 1},
  {1, 0, 0, 1}
};

int currentStep = 0;
int currentAngle = 90;

void setStep(int stepIndex) {
  digitalWrite(IN1, stepSequence[stepIndex][0]);
  digitalWrite(IN2, stepSequence[stepIndex][1]);
  digitalWrite(IN3, stepSequence[stepIndex][2]);
  digitalWrite(IN4, stepSequence[stepIndex][3]);
}

void moveToAngle(int targetAngle) {
  if (targetAngle == currentAngle) {
    Serial.println("[MOTOR] Already at target angle: " + String(targetAngle) + "°");
    return;
  }

  Serial.println("[MOTOR] Moving from " + String(currentAngle) + "° to " + String(targetAngle) + "°");
  
  int stepDirection = (targetAngle > currentAngle) ? 1 : -1;
  int stepCount = abs(targetAngle - currentAngle);
  int stepsToMove = map(stepCount, 0, 180, 0, halfStepsPerRev / 2);
  
  Serial.println("[MOTOR] Steps to move: " + String(stepsToMove) + " (direction: " + String(stepDirection) + ")");

  for (int i = 0; i < stepsToMove; i++) {
    currentStep += stepDirection;
    if (currentStep >= 8) currentStep = 0;
    if (currentStep < 0) currentStep = 7;
    setStep(currentStep);
    delay(3); // adjust for speed/smoothness
  }

  currentAngle = targetAngle;
  Serial.println("[MOTOR] Movement complete. Current angle: " + String(currentAngle) + "°");
}

void handleRoot() {
  Serial.println("[WEB] Root page requested from client: " + server.client().remoteIP().toString());
  
  server.send(200, "text/html", R"rawliteral(
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: sans-serif; text-align: center; padding: 2em; }
        input[type=range] { width: 80%; }
      </style>
    </head>
    <body>
      <h2>Stepper Arm Control</h2>
      <input type="range" min="0" max="180" value="90" id="angleSlider">
      <p>Angle: <span id="angleValue">90</span> Degrees</p>

      <script>
        var ws = new WebSocket('ws://' + location.hostname + ':82/');
        var slider = document.getElementById('angleSlider');
        var output = document.getElementById('angleValue');

        ws.onopen = function() {
          console.log('WebSocket connected');
        };

        ws.onclose = function() {
          console.log('WebSocket disconnected');
        };

        ws.onerror = function(error) {
          console.log('WebSocket error:', error);
        };

        slider.oninput = function() {
          output.innerHTML = this.value;
          ws.send(this.value);
        }
      </script>
    </body>
    </html>
  )rawliteral");
}

void onWebSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
  Serial.println("\n=== WebSocket Event ===");
  Serial.println("[WS] Client #" + String(num) + " - Event type: " + String(type));
  
  switch(type) {
    case WStype_DISCONNECTED:
      Serial.println("[WS] Client #" + String(num) + " disconnected");
      break;
      
    case WStype_CONNECTED:
      {
        IPAddress ip = webSocket.remoteIP(num);
        Serial.println("[WS] Client #" + String(num) + " connected from " + ip.toString());
      }
      break;
      
    case WStype_TEXT:
      {
        Serial.println("[WS] Received text data from client #" + String(num));
        Serial.println("[WS] Raw payload length: " + String(length) + " bytes");
        Serial.print("[WS] Raw payload (hex): ");
        for(size_t i = 0; i < length; i++) {
          Serial.printf("%02X ", payload[i]);
        }
        Serial.println();
        
        Serial.println("[WS] Raw payload (string): '" + String((char*)payload) + "'");
        
        // Process the angle command
        String receivedData = String((char*)payload);
        receivedData = receivedData.substring(0, length); // Ensure proper length
        int angle = receivedData.toInt();
        
        Serial.println("[WS] Processed angle value: " + String(angle));
        
        if (angle >= 0 && angle <= 180) {
          Serial.println("[WS] Valid angle received, moving motor...");
          moveToAngle(angle);
          
          // Send confirmation back to client
          String response = "OK:" + String(angle);
          webSocket.sendTXT(num, response);
          Serial.println("[WS] Sent confirmation: '" + response + "'");
        } else {
          Serial.println("[WS] ERROR: Invalid angle value: " + String(angle));
          webSocket.sendTXT(num, "ERROR:Invalid angle");
        }
      }
      break;
      
    case WStype_BIN:
      Serial.println("[WS] Received binary data from client #" + String(num));
      Serial.println("[WS] Binary payload length: " + String(length) + " bytes");
      Serial.print("[WS] Binary data (hex): ");
      for(size_t i = 0; i < length; i++) {
        Serial.printf("%02X ", payload[i]);
      }
      Serial.println();
      break;
      
    case WStype_PING:
      Serial.println("[WS] Received ping from client #" + String(num));
      break;
      
    case WStype_PONG:
      Serial.println("[WS] Received pong from client #" + String(num));
      break;
      
    default:
      Serial.println("[WS] Unknown event type: " + String(type));
      break;
  }
  Serial.println("======================\n");
}

void setup() {
  Serial.begin(115200);
  Serial.println("\n=== Stepper Motor WebSocket Controller ===");
  Serial.println("Starting system initialization...");

  // Motor pins
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  Serial.println("[SETUP] Motor pins configured");

  // WiFi
  WiFi.begin(ssid, password);
  Serial.print("[SETUP] Connecting to WiFi '" + String(ssid) + "'");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" connected!");
  Serial.println("[SETUP] IP Address: " + WiFi.localIP().toString());
  Serial.println("[SETUP] Access web interface at: http://" + WiFi.localIP().toString());

  // Web server
  server.on("/", handleRoot);
  server.begin();
  Serial.println("[SETUP] Web server started on port 80");

  // WebSocket server
  webSocket.begin();
  webSocket.onEvent(onWebSocketEvent);
  Serial.println("[SETUP] WebSocket server started on port 82");
  
  Serial.println("[SETUP] System ready!");
  Serial.println("===========================================\n");
}

void loop() {
  server.handleClient();
  webSocket.loop();
  
  static unsigned long lastStatusPrint = 0;
  if (millis() - lastStatusPrint > 30000) {
    Serial.println("[STATUS] System running - Connected clients: " + String(webSocket.connectedClients()));
    Serial.println("[STATUS] Current motor angle: " + String(currentAngle) + "°");
    Serial.println("[STATUS] Free heap: " + String(ESP.getFreeHeap()) + " bytes");
    lastStatusPrint = millis();
  }
}