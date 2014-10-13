#pragma strict

private var movement : PlayerMovement;


function Start () {
movement = GameObject.Find("Player").GetComponent.<PlayerMovement>();
}


function OnTriggerEnter(other:Collider){
	//if(other.tag.Equals("1DMG")){
	//	Destroy(this.gameObject);
	//}
}
function OnDestroy(){
	//movement.setCheckpoint(Vector3.zero,false);
}