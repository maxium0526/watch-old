class EventController{
	constructor(handNames){
		this.events = [];
		this.available = {};
		for(let handName of handNames){
			this.available[handName] = true;
		}
	}
	addHand(handName){
		this.available[handName]=true;
	}
	addEvent(event){
		this.events.push(event);

		return this;
	}
	setDefaultEvent(event){
		this.defaultEvent = event;
		return this;
	}
	doDefaultEvent(){
		var _this = this;
		this.defaultTimer = setInterval(()=>{
			if(_this.checkAvailable(_this.defaultEvent.required())){
			_this.lock(_this.defaultEvent.required());
			_this.defaultEvent.do(()=>{
				this.unlock(this.defaultEvent.required());
			});
		}
		},1000);
		
	}
	stopDefaultEvent(){
		clearInterval(this.defaultTimer);
	}
	do(eventName){
		event = this.events.filter((event)=>{return event.constructor.name === eventName});
		if(event.length>0){
			event = event[0];
		} else{
			event = null;
		}
		if(this.checkAvailable(event.required())){
			this.lock(event.required());
			event.do(()=>{
				this.unlock(this.defaultEvent.required());
			});
		}
	}

	checkAvailable(handNames){
		for(let handName of handNames){
			if(this.available[handName] != true){
				return false;
			}
		}
		return true;
	}

	lock(handNames){
		for(let handName of handNames){
			this.available[handName]=false;
		}
	}
	unlock(handNames){
		for(let handName of handNames){
			this.available[handName]=true;
		}
	}

}

export{EventController};
