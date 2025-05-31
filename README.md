The purpose of the project is for study purposes.<br>
It's supposed to be a final project for a university course.
<br>
<br>

Before running the app, please follow the instructions below.<br>
<br>
<br>
<b>PART 1</b><br>

Setup the hardware bits:
1. Startup Arduino IDE and replace the <b/>SSID and Password</b> wiith your Wi-Fi/Hotspot credentials.
2. Upload the code to the relevant ESP32 and Camera.<br>
<br>

<b>PART 2</b><br>

Now it's time for the React Native changes:
1. Find the ```config.ts``` file and update the IPs with the ones provided by the ESP32 server and camera.
2. In the Terminal of your IDE of choice input the following line: ```npx expo run:android``` for android developers / ```npx expo run:ios``` for ios developers. This should take roughly about 5 minutes time to fully deploy.<br>

<br>

<b>Note:</b>
- This assumes you've got either a simulator/emulator or a physical device connected to your machine before following the RN instructions.
