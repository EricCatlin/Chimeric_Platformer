#pragma strict


var ReceivingScript : SwitchReciever;
var ActivatedByPlayerBullets : boolean;
var ActivatedByPlayerContact : boolean;
var tickTock : AudioClip;
var ToggleAble : boolean;
var SingleUse : boolean;
var ActiveState : boolean;
var TakesInput : boolean;
private var soundLoopTime : float = 0;
private var AlreadyActivated : boolean;
private var messageSent : boolean = true;
var isTimedSwitch : boolean;
private var timeAtSwitched : float;
var timedSwitchDelay : float;
var soundOnHit : AudioClip;
private var timeWarning : boolean = false;
public var InactiveColor :Color = Color.blue;
public var ActiveColor :Color = Color.green;
public var WarningColor :Color = Color.yellow;
public var transition_speed : float = 0.05f;


function Start () {
	

}

function Update () {
	if(!messageSent){
		SendMessageToReciever();
		messageSent = true;
	}
	
	if(isTimedSwitch && ActiveState){
		if(soundLoopTime > 1){
    		audio.PlayOneShot(tickTock);
    		soundLoopTime = 0;
    	}else{
    		soundLoopTime += Time.deltaTime;
    	}
    	
    	

		if(Time.time - timeAtSwitched > timedSwitchDelay){
			AlreadyActivated = false;
			SwitchHit();
			AlreadyActivated = false;
		}
		if(Time.time - timeAtSwitched > timedSwitchDelay*0.90 && !timeWarning){
			this.gameObject.renderer.material.color=WarningColor;
			timeWarning = true;
		}
	}
	
	if(ActiveState){
				this.gameObject.renderer.material.color = Color.Lerp(this.gameObject.renderer.material.color,ActiveColor,transition_speed);
	}else{
				this.gameObject.renderer.material.color = Color.Lerp(this.gameObject.renderer.material.color,InactiveColor,transition_speed);

	}

}
function SendMessageToReciever(){
	ReceivingScript.RecieveSwitchEvent(this.gameObject);
	print("Sending");

}
function OnCollisionEnter(other: Collision){
	if(ActivatedByPlayerBullets && other.transform.root.name.Equals("PlayerBullet(Clone)")){
		SwitchHit();
		if(isTimedSwitch){
			timeAtSwitched  = Time.time;
		}
	}
	if(ActivatedByPlayerContact && other.transform.root.name.Equals("Player")){
		SwitchHit();
		if(isTimedSwitch){
			timeAtSwitched  = Time.time;
		}

	
	}

}
function OnTriggerEnter(other: Collider){
	
	if(ActivatedByPlayerContact && other.transform.root.name.Equals("Player")){
		SwitchHit();
		if(isTimedSwitch){
			timeAtSwitched  = Time.time;
		}

	
	}
	if(ActivatedByPlayerBullets && other.transform.root.name.Equals("PlayerBullet(Clone)")){
		SwitchHit();
		if(isTimedSwitch){
			timeAtSwitched  = Time.time;
		}
	}
	}
	
function SetActive(){
	
	ActiveState = true;
	if(!AlreadyActivated && SingleUse) messageSent = false;
	
	AlreadyActivated = true;
	

}

function SetInactive(){
	
	ActiveState = false;
	
}
function INPUT( input : boolean){
	if(input && !ActiveState) SetActive();
	if(!input && ActiveState) SetInactive();
}


function SwitchHit(){
	

	if(ToggleAble){
		if(ActiveState) SetInactive();
		else SetActive();
		
		if(soundOnHit && ActiveState){
			audio.Play();
		}

		messageSent = false;
		print(ActiveState);
	}else{
		if(!AlreadyActivated){
			if(ActiveState) SetInactive();
			else SetActive();
			if(soundOnHit && ActiveState){
			audio.Play();
		}

			AlreadyActivated = true;
			messageSent = false;

		}
		
	}
	if(ActiveState){
		if(SingleUse){
           
			timeWarning = false;
		}
	}else{
		
		timeWarning = true;

	}
	
}
function GetState(){
	return ActiveState;
}