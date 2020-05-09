class HandController{
	constructor(hand){
		this.hand = hand;
		
		this.actions = [];
		this.currentAction = null;
		this.div = null;
		this.limit = 10;
	}

	setDiv(div){
		this.div = div;
		return this;
	}

	setActionsLimit(limit){
		this.limit = limit;
		return this;
	}

	pushAction(action){//{type:0,degree:123,age:180}
		if(this.limit!=null&&this.actions.length<this.limit){
			this.actions.push(action);
			this.showActions();
		}
	}
	
	clearActions(){
		this.currentAction = null;
		while(this.action.length>0){
			this.actions.pop();
		}
	}

	do(action){
		if(this.currentAction){
			this.actions.unshift(this.currentAction);
		}
		this.currentAction = action;
	}

	ticktack(){
		if(this.currentAction!=null){

			if(Math.abs(this.hand.degree-this.currentAction.degree)>=this.currentAction.step){//若未到目標
				var cdegree = this.hand.degree<this.currentAction.degree?this.hand.degree+360:this.hand.degree;
				if(cdegree-this.currentAction.degree>=180){
					this.hand.rotate(this.currentAction.step);//逆
				}else{
					this.hand.rotate(-this.currentAction.step);//順
				}
			}else{
				this.hand.degree = this.currentAction.degree;//直跳目標

				this.currentAction.age--;
			}
			
			if(this.currentAction.age==0){//期限已到
				if(this.currentAction.callback){
					this.currentAction.callback();
				}
				this.currentAction=null;

			}
		}
		if(this.currentAction==null){//若沒有動作
			if(this.actions.length>0){
				var t = this.actions.shift();
				if(t.type==1){
					t.degree = (this.hand.degree + t.degree+360)%360;
					t.type = 0;
					if(t.degree<0){
						t=null;
					}
				}
				this.currentAction = t;
				this.showActions();
				//this.currentAction = this.actions.shift();

			}else{
				this.currentAction = null;
			}
		}
	}


	showActions(){
		if(this.div!=null){
			this.div.empty();
			this.div.append($('<h2>').text('Actions:'));
			if(this.currentAction){
				this.div.append($('<p>').html(this.currentAction.toString()).css('color','red'));
			}
			for(let action of this.actions){
				this.div.append($('<p>').html(action.toString()));
			}
		}
	}
}

export{HandController};