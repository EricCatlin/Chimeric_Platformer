#pragma strict
var traps :GameObject;
function Start () {
//traps = GameObject.Find("Traps");

}

function Update () {

}

function SwitchEventRecieved(other: GameObject){
	traps.SetActive(false);
	print("here");
}