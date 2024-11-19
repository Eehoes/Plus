int buttonPin = 4;
int buttonState = HIGH;       // 현재 버튼 상태
int lastButtonState = HIGH;   // 이전 버튼 상태
int pressCount = 0;           // 버튼이 눌린 횟수

void setup() {
  pinMode(buttonPin, INPUT_PULLUP); // 내부 풀업 저항 사용
  Serial.begin(9600);
}

void loop() {
  buttonState = digitalRead(buttonPin); // 버튼의 현재 상태를 읽음
  
  // 버튼 상태가 LOW로 변경되는 순간 (버튼이 눌리는 순간) 감지
  if (buttonState == LOW && lastButtonState == HIGH) {
    pressCount++; // 눌린 횟수를 증가
    Serial.print("Button Pressed Count: ");
    Serial.println(pressCount); // 눌린 횟수 출력
    delay(50); // 디바운스 방지용 지연
  }
  
  lastButtonState = buttonState; // 현재 상태를 이전 상태로 업데이트
}
