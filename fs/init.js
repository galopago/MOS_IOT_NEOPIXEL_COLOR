
load('api_timer.js');
load('api_neopixel.js');
load('api_mqtt.js');


let iopin = 13, numPixels = 3, colorOrder = NeoPixel.GRB, i = 0;

let strip = NeoPixel.create(iopin, numPixels, colorOrder);

let FRAME_TICK_MS=5000;


let Rcode=0;
let Gcode=0;
let Bcode=0;

let topicR = '/mosiotneopixelcolor/R';
let topicG = '/mosiotneopixelcolor/G';
let topicB = '/mosiotneopixelcolor/B';


strip.clear();
strip.clear();



// ************************************************
// listen to MQTT server topic to change color palette
// ************************************************

MQTT.sub(topic,function(conn,topic,msg){
	print('Topic:', topicR, 'message:', msg);
	Rcode=JSON.parse(msg);
},null);

MQTT.sub(topic,function(conn,topic,msg){
	print('Topic:', topicG, 'message:', msg);
	Gcode=JSON.parse(msg);
},null);

MQTT.sub(topic,function(conn,topic,msg){
	print('Topic:', topicB, 'message:', msg);
	Bcode=JSON.parse(msg);
},null);


// ************************************************
// change strip colors every  FRAME_TICK_MS seconds
// ************************************************

Timer.set(FRAME_TICK_MS, Timer.REPEAT, function() {


	print("start filling strip");
	for(i=0; i<numPixels ;i++)
	{
		strip.setPixel(i, Gcode , Rcode, Bcode );	
	}	
	print("finished filling strip");
	strip.show();	
		

}, null);
