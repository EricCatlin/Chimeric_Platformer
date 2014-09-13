#pragma strict

//var target : Transform;
var damping : float = 3;
private var target : Transform;



function Start () {
	if(GameObject.Find("End")){
		target = GameObject.Find("End").transform;
	}
}

function Update () {
	if(target){
	lookAt();
	}
}

function lookAt (){
	if(target){
    	transform.LookAt(Vector3(target.position.x, target.position.y, 0));
    	
    	}

}