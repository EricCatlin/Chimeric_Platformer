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
var signal_sender : boolean;

private var timeAtSwitched : float;
var timedSwitchDelay : float;
var soundOnHit : AudioClip;
private var timeWarning : boolean = false;
public var InactiveColor :Color = Color.blue;
public var ActiveColor :Color = Color.green;
public var WarningColor :Color = Color.yellow;
public var transition_speed : float = 0.05f;
public var Recievers : List.<SwitchReciever> = new  List.<SwitchReciever>();


function Start () {
	
if(ReceivingScript!=null){
Recievers.Add(ReceivingScript);
}
}

function Update () {
	if(!messageSent){
			messageSent = true;

		SendMessageToReciever();
	}
	
	if(isTimedSwitch && ActiveState){
		if(soundLoopTime > 1){
    		audio.PlayOneShot(tickTock);
    		soundLoopTime = 0;
    	}else{
    		soundLoopTime += Time.deltaTime;
    	}
    	
    	

		if(Time.time - timeAtSwitched > timedSwitchDelay){
			SetInactive();
		}
		if(Time.time - timeAtSwitched > timedSwitchDelay*0.90 && !timeWarning){
			this.gameObject.renderer.material.color=WarningColor;
			timeWarning = true;
		}
	}
	
	if(this.renderer!=null){
	if(ActiveState){
				this.gameObject.renderer.material.color = Color.Lerp(this.gameObject.renderer.material.color,ActiveColor,transition_speed);
	}else{
				this.gameObject.renderer.material.color = Color.Lerp(this.gameObject.renderer.material.color,InactiveColor,transition_speed);

	}
	}

}
function SendMessageToReciever(){
	for(var i : int = 0 ; i < Recievers.Count; i++){
		Recievers[i].RecieveSwitchEvent(this.gameObject);
		print("Sending");
	}

}
function OnCollisionEnter(other: Collision){
	if(ActivatedByPlayerBullets && other.transform.root.name.Equals("PlayerBullet(Clone)")){
		SwitchHit();
		
	}
	if(ActivatedByPlayerContact && other.transform.root.name.Equals("Player")){
		SwitchHit();
	

	
	}

}
function OnTriggerEnter(other: Collider){
	
	if(ActivatedByPlayerContact && other.transform.root.name.Equals("Player")){
		SwitchHit();
		

	
	}
	if(ActivatedByPlayerBullets && other.transform.root.name.Equals("PlayerBullet(Clone)")){
		SwitchHit();
		
	}
	}
	function OnTriggerStay(other: Collider){
	
	if(ActivatedByPlayerContact && other.transform.root.name.Equals("Player")){
		SwitchHit();
	

	
	}
	if(ActivatedByPlayerBullets && other.transform.root.name.Equals("PlayerBullet(Clone)")){
		SwitchHit();
		
	}
	}
	
public function SetActive(){
	
	 	messageSent = false;
	 	AlreadyActivated = true;
	 	ActiveState = true;
	 	timeAtSwitched = Time.time;
	 	if(soundOnHit!=null)
	 		audio.PlayOneShot(soundOnHit);

	 

}

public function SetInactive(){
	
	ActiveState = false;
	

	
}
function INPUT( input : boolean){
	if(input && !ActiveState) SetActive();
	if(!input && ActiveState) SetInactive();
}


 public function SwitchHit(){
	if(signal_sender){
		messageSent = false;
		if(soundOnHit!=null) audio.PlayOneShot(soundOnHit);
		if(this.gameObject.renderer!=null){
			renderer.material.color = ActiveColor;
		}
	}
	if(ToggleAble){
		if(ActiveState) SetInactive();
		else SetActive();	
	}
	
	if(SingleUse && !AlreadyActivated){ 
		SetActive();
	}
	
	
	
	
}
function GetState(){
	return ActiveState;
}