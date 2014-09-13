#pragma strict

var timeToDie:float = 10;
private var timeAtSpawn: float;
private var smoke : GameObject;

function Start () {
	if(gameObject.GetComponentInChildren(ParticleSystem)){

	smoke = gameObject.GetComponentInChildren(ParticleSystem).gameObject;
	}
	timeAtSpawn = Time.time;
	
}

function Update () {
	if(transform.position.z != 0 ){
		transform.position.z=0;
	}
	if(Time.time - timeAtSpawn > timeToDie){
		Destroy(gameObject);
	}
}

function OnCollisionEnter(other : Collision){
	if(other.gameObject.tag.Contains("Turret")|| other.gameObject.name.Equals("FireBall(Clone)")||other.gameObject.name.Equals("Bullet(Clone)")  ){
	
	}else{	
		gameObject.tag = "Untagged";
		Destroy(gameObject,1);	
	}
}

function OnDestroy(){
	if(smoke){
	smoke.transform.parent=null;
	smoke.particleSystem.Stop();
	Destroy(smoke.gameObject,5);
	}
}