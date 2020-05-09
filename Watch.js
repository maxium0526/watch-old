import {Dial} from './Dial.js';
import {EventController} from './EventController.js';

class Watch{
	constructor(x, y, r){
		this.x = x;
		this.y = y;
		this.r = r;
		this.dial = new Dial(x,y,r);
		this.eventController = new EventController();
	}
	// setEventController(ec){
	// 	this.eventController = ec;
	// 	return this;
	// }
	setHand(hand, name){
		this.eventController.addHand("name")
	}
	

}