#pragma strict

function Start () {

}

function Update () {

}
function OnTriggerEnter(hit : Collider){
	//print(hit);
	if(hit.gameObject.tag.Equals("Player")){
	
		Application.LoadLevel("Tutorial2");
	}
}