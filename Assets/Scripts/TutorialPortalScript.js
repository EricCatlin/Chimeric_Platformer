#pragma strict
private var movement : PlayerMovement;
private var cam : Camera;
private var camScript : CameraFollowBetter;

private var timeAtFrame : float;
private var timeAtPreviousFrame : float;

private var T1H : boolean = false;
private var T2H : boolean = false;
private var T3H : boolean = false;
private var T4H : boolean = false;
private var T5H : boolean = false;
private var T6H : boolean = false;
private var T7H : boolean = false;
private var T8H : boolean = false;
private var GUIMessage : int = 0;
private var thisRect : Rect;

function Start () {
thisRect = Rect(Screen.width/6,Screen.height-Screen.height*.3	,Screen.width-Screen.width/3,Screen.height*.1);
	movement = GameObject.Find("Player").GetComponent("PlayerMovement");
	cam = GameObject.FindObjectOfType(Camera);

}


function SwitchEventRecieved(object: GameObject){
	print(object.name + " hit switch: "+ this.gameObject.name);
	if(object.name.Equals("T1")){
		T1H = true;
		GUIMessage = 1;
	}if(object.name.Equals("T2")){
		T2H = true;
		GUIMessage = 2;
	}if(object.name.Equals("T3")){
		T3H = true;
		GUIMessage = 3;
	}if(object.name.Equals("T4")){
		T4H = true;
		GUIMessage = 4;
	}if(object.name.Equals("T5")){
		T5H = true;
		GUIMessage = 5;
	}if(object.name.Equals("T6")){
		T6H = true;
		GUIMessage = 6;
	}if(object.name.Equals("T7")){
		T7H = true;
		GUIMessage = 7;
	}if(object.name.Equals("T8")){
		T8H = true;
		GUIMessage = 8;
	}
}
function OnGUI(){
if(Screen.currentResolution.width > 1000){
		GUI.skin.label.fontSize = 24;
		GUI.contentColor = Color.green;
		GUI.Box(thisRect,"");

	}else{
		GUI.skin.label.fontSize = 14;
GUI.contentColor = Color.green;
GUI.Box(thisRect,"");


		}



if(GUIMessage == 0){
	GUI.Label(thisRect, "");
}else if(GUIMessage == 1){
	GUI.Label(thisRect, "EQUIP PORTHOLS from the MENU. LEFT and RIGHT CLICK to place RED and BLUE PORTHOLS");

}else if(GUIMessage == 2){
GUI.Label(thisRect, "Moving-Platforms do not affect PORTHOLS");
}else if(GUIMessage == 3){
GUI.Label(thisRect, "PORTHOLS do not stick to RED");
}else if(GUIMessage == 4){
GUI.Label(thisRect, "Gosh, dang, how are you going to get up this tube?");
}else if(GUIMessage == 5){
GUI.Label(thisRect, "You beat it! The whole game. Good job. You can turn it off now! No need to launch yourself over that wall");
}else if(GUIMessage == 6){
GUI.Label(thisRect, "So there is more stuff over here... It doesnt mean I like you.");
}else if(GUIMessage == 7){
GUI.Label(thisRect, "In fact, I dont like you. Clearly this needs to be harder");
}else if(GUIMessage == 8){
GUI.Label(thisRect, "");
}else if(GUIMessage == 9){
GUI.Label(thisRect, "");}
}