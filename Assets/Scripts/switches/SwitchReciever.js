#pragma strict

function Start () {

}

function Update () {

}
function RecieveSwitchEvent(object: GameObject){
	print("switch hit" + object.name);
	SendMessage("SwitchEventRecieved",object);
}