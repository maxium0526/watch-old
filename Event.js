import {Action} from './Action.js';

class TimeEvent{
	constructor(hourController, minController, secondController){
		this.hour = hourController;
		this.min = minController;
		this.second = secondController;

	}
	required(){
		return ["hour", "min", "second"];
	}

	time(){
		return 1000;
	}

	do(callback){
		var date = new Date();
		var datesecond = date.getSeconds();
		var datemin = date.getMinutes();
		var datehour = date.getHours();
		
		this.second.pushAction(new Action(0,(360+90-6*(datesecond))%360,1,1.5));
		this.min.pushAction(new Action(0,(360+90-6*(datemin)-(datesecond/60)*6)%360,1,0.1));
		this.hour.pushAction(new Action(0,(360+90-30*(datehour%12)-(datemin/60)*30)%360,1,0.01));

		callback();
	}

}

class Event1{
	constructor(secondController){
		this.second = secondController;
	}
	required(){
		return ["second"];
	}
	time(){
		return null;
	}
	do(callback){
		for(let i=0;i<5;i++){
			this.second.pushAction(new Action(0,90,50,1));
			this.second.pushAction(new Action(0,60,50,1));

		}
		this.second.pushAction(new Action(0,60,50,1).setCallback(callback));

		// setTimeout(callback,5000);
		
	}
}
export {TimeEvent, Event1};