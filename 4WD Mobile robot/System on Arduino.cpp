#include AFMotor.h
AF_DCMotor Motor1(1);  Forward right
AF_DCMotor Motor2(2);  Forward left
AF_DCMotor Motor3(3);  Rear left
AF_DCMotor Motor4(4);  Rear right
int speed = 255 ;  Defines the base speed of the Rover
float P = 0.6 ;  Proportion of rotation
void setup()
{
pinMode(49, OUTPUT);  Through this pin we drive the bluetooth module
digitalWrite(49, HIGH);
Serial1.begin(9600);  Default speed in HC-05 modules
Serial1.println(Connection Successful!);
}
void loop()
{
if (Serial1.available()){
char c;
c = Serial1.read();
analyzeString(c);
}
}
void analyzeString(char c){
String s=;
s += c;
if(s.startsWith(1)){
Serial1.println(Forward);
Forward();
}
else if(s.startsWith(2)){
70
Serial1.println(ForwardLeft);
ForwardLeft();
}
else if(s.startsWith(3)){
Serial1.println(Left);
TurnLeft();
}
else if(s.startsWith(4)){
Serial1.println(DownLeft);
ReverseLeft();
}
else if(s.startsWith(5)){
Serial1.println(Down);
Reverse();
}
else if(s.startsWith(6)){
Serial1.println(DownRight);
ReverseRight();
}
else if(s.startsWith(7)){
Serial1.println(Right);
TurnRight();
}
else if(s.startsWith(8)){
Serial1.println(UpRight);
ForwardRight();
}
else if(s.startsWith(0)){
Serial1.println(Stop);
Stop();
}
}
void SetSpeed(int v1, int v2, int v3, int v4)
{
71
Motor1.setSpeed(v1);
Motor2.setSpeed(v2);
Motor3.setSpeed(v3);
Motor4.setSpeed(v4);
}
void Forward()
{
SetSpeed(speed,speed,speed,speed);
Motor1.run(FORWARD) ;
Motor2.run(FORWARD);
Motor3.run(FORWARD);
Motor4.run(FORWARD);
}
void ForwardLeft()
{ int s = speed  P ;
(speed, s, s, speed);
Motor1.run(FORWARD) ;
Motor2.run(FORWARD);
Motor3.run(FORWARD);
Motor4.run(FORWARD);
}
void Reverse()
{
SetSpeed(speed,speed,speed,speed);
Motor1.run(BACKWARD) ;
Motor2.run(BACKWARD);
Motor3.run(BACKWARD);
Motor4.run(BACKWARD);
}
void ReverseLeft()
{ int s = speed  P ;
SetSpeed( s, speed,speed, s);
Motor1.run(BACKWARD) ;
72
Motor2.run(BACKWARD);
Motor3.run(BACKWARD);
Motor4.run(BACKWARD);
}
void Stop()
{
Motor1.run(RELEASE);
Motor2.run(RELEASE);
Motor3.run(RELEASE);
Motor4.run(RELEASE);
}
void TurnLeft()
{
SetSpeed( 0, speed,speed, 0) ;
Motor1.run(FORWARD) ;
Motor2.run(FORWARD);
Motor3.run(FORWARD);
Motor4.run(FORWARD);
}
void ReverseRight()
{
int s = speed  P ;
SetSpeed(speed, s, s, speed) ;
Motor1.run(BACKWARD) ;
Motor2.run(BACKWARD);
Motor3.run(BACKWARD);
Motor4.run(BACKWARD);
}
void TurnRight()
{
SetSpeed(speed, 0, 0, speed) ;
73
Motor1.run(FORWARD) ;
Motor2.run(FORWARD);
Motor3.run(FORWARD);
Motor4.run(FORWARD);
}
void ForwardRight()
{
int s = speed  P ;
SetSpeed(speed, s, s, speed) ;
Motor1.run(FORWARD) ;
Motor2.run(FORWARD);
Motor3.run(FORWARD);
Motor4.run(FORWARD);
}