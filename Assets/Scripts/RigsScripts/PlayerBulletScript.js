#pragma strict

var timeToDie:float = 5;
var hits:int = 0;
var maxHits : int = 3;
private var timeAtSpawn: float;
private var rigid : Rigidbody;
private var marker : GameObject;

function Start () {
	timeAtSpawn = Time.time;
	rigid = this.rigidbody;
	
	if(GameObject.Find("markerObject(Clone)")){
		marker = GameObject.Find("markerObject(Clone)");
		rigid.useGravity = false;
		Destroy(GetComponent(ConstantForce));
	}

}

function FixedUpdate () {
	
	if(Time.time - timeAtSpawn > timeToDie){
		Destroy(gameObject);
	}
	
	if(marker && Time.time-timeAtSpawn > 0.2){
		
		rigid.AddForce(((marker.transform.position-transform.position).normalized* 100 - 0.9*rigid.velocity)*0.2, ForceMode.Impulse);


	}

	//this.rigidbody.constantForce.force = Vector3(0,-1,0);
}

function OnCollisionEnter(other: Collision){
	
	

	Destroy(gameObject,0.1);
	
}


