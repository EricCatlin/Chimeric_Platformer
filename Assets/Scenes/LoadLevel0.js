#pragma strict

public var Level_Name = "";
function Start () {

}

function Update () {

}
function OnTriggerEnter(hit : Collider){
	//print(hit);
	if(hit.gameObject.tag.Equals("Player")){
	
		Application.LoadLevel(Level_Name);
	}
}