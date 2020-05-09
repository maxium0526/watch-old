import {Hand} from './Hand.js';
import {HandController} from './HandController.js';
import {Action} from './Action.js';
import {TimeEvent, Event1} from './Event.js'
import {EventController} from './EventController.js';

const x = 200, y = 200;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var second = new HandController(new Hand(x,y,100,90)).setDiv($('#second-actions')).setActionsLimit(30);
var min = new HandController(new Hand(x,y,80,90)).setDiv($('#min-actions'));
var hour = new HandController(new Hand(x,y,55,90)).setDiv($('#hour-actions'));
var hand1 = new HandController(new Hand(x,y-60,40,90));

var eventController = new EventController(["hour","min","second"]).setDefaultEvent(new TimeEvent(hour,min,second)).addEvent(new Event1(second));

$('button#event1').on('click',(e)=>{
	eventController.do("Event1");
});

setInterval(nxt, 10);
init();


function nxt(){
	ctx.clearRect(0,0,canvas.width, canvas.height);

	ctx.beginPath();
	ctx.arc(x, y, 120,0,2*Math.PI);
	ctx.stroke();

	second.ticktack();
	min.ticktack();
	hour.ticktack();
	hand1.ticktack();

	second.hand.draw(ctx);
	min.hand.draw(ctx);
	hour.hand.draw(ctx);
	hand1.hand.draw(ctx);
}

function init(){
	var date = new Date();
	var datesecond = date.getSeconds();
	var datemin = date.getMinutes();
	var datehour = date.getHours();

	second.pushAction(new Action(0,(360+90-6*(datesecond))%360,1,1));
	min.pushAction(new Action(0,(360+90-6*(datemin)-(datesecond/60)*6)%360,1,1));
	hour.pushAction(new Action(0,(360+90-30*(datehour%12)-(datemin/60)*30)%360,1,1));

	eventController.doDefaultEvent();
	//setInterval(move,1000);
	//setInterval(doDefaultEvent,eventController.defaultEvent.time());
}

function move(){
	// var date = new Date();
	// var datesecond = date.getSeconds();
	// var datemin = date.getMinutes();
	// var datehour = date.getHours();

	// second.pushAction(new Action(0,(360+90-6*(datesecond))%360,1,1.5));
	// min.pushAction(new Action(0,(360+90-6*(datemin)-(datesecond/60)*6)%360,1,0.1));
	// hour.pushAction(new Action(0,(360+90-30*(datehour%12)-(datemin/60)*30)%360,1,0.01));



}
function doDefaultEvent(){
	eventController.doDefaultEvent();
}