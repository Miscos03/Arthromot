This project is for study purposes.<br>
It's supposed to be a final project for a university course.
<br>
<br>
Before running the app, please follow the instructions below.<br>
<br>
<br>
<b>PART 1</b><br>

Setup the hardware bits:
1. Take the folders from the ```/arduino/``` directory out.
2. Open Arduino IDE, then go to ```File > Open...```. Now you have to open the file ```ESP32WebServer.ino``` from the directory sharing the same name.
3. Replace the SSID and Password with your Wi-Fi/Hotstop credentials.
4. Open the Serial Monitor.
5. Upload the code.
6. Repeat steps 2 to 5 but this time with the ```CameraWebServer.ino```.
   Alternatively, you can find the code in ```File > Examples > ESP32 > Camera > CameraWebServer```.
<br>
<br>

<b>PART 2</b><br>

Now it's time for the React Native changes:
1. Find the ```config.ts``` file and update the IPs with the ones provided by the ESP32 server and camera. You can find them in the serial monitor of the Arduino IDE.
2. In the Terminal of your IDE of choice for React Native development input the following line: ```npm install``` to install all the dependencies needed.
3. Next you should input in the terminal the line ```npx expo run:android``` for android developers / ```npx expo run:ios``` for ios developers. This should take roughly about 5 minutes time to fully deploy the native build.
4. If you have deployed it on a physical device, you can freely disconnect it from your machine and take the app wherever.
<br>
<br>

<b>Note:</b>
- This assumes you've got either a simulator/emulator or a physical device connected to your machine before following the RN instructions.
- Please read the ```README.md``` in the ```/arduino/``` directory, too.
