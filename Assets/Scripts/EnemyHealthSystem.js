#pragma strict
var maxHealth : float = 5;
var hitSound : AudioClip;
var destroyedSound : AudioClip;
var DissapearWhenDead : boolean = false;
var dissapearDelay: int = 5;
var nested:boolean=false;
var ColorFade_WhenDead:boolean=true;

private var soundSource : AudioSource;
private var SmokeSystem : ParticleSystem;
var fallWhenDead:boolean = false;
var detachFromParent : boolean = false;
var passKillToChildren : boolean = true;
private var parentAtStart : GameObject;
var passKillToParent: boolean = false;



function Start () {
	soundSource = gameObject.AddComponent(AudioSource);
	soundSource.rolloffMode = AudioRolloffMode.Linear;
	SmokeSystem = GetComponentInChildren(ParticleSystem);
	if(transform.parent){
		parentAtStart = transform.parent.gameObject;
	}
}
function sendKillSignal(){
	if(nested)
		SendMessage("ObjectDead",1);

	if(passKillToParent){

		if( parentAtStart&&transform.parent){
			if(parentAtStart.GetComponent("EnemyHealthSystem")){

				var parentHealthScript : EnemyHealthSystem = parentAtStart.GetComponent("EnemyHealthSystem");
				parentHealthScript.informOfKillSignal();
			}
		}
	}
	if(passKillToChildren){
		//print("I have " + transform.childCount + " Children");
		for (var child : Transform in transform) {
		//print(child.name + " am a child of "+ name);
			if(child.GetComponent("EnemyHealthSystem")){
				var childScript : EnemyHealthSystem = child.GetComponent("EnemyHealthSystem");
				childScript.informOfKillSignal();
				//print("sent to " +childScript.gameObject.name);
			}
		}
	}
}
function informOfKillSignal(){
	maxHealth = -1;
}
function Update () {
	//print(SmokeSystem.isPlaying.ToString);
	if(maxHealth <= 0 && this.tag != "DissabledEnemy"){
	print("I am Dead" + name);
	if(gameObject.GetComponent("MagnetMineScript")){
		Destroy(gameObject.GetComponent("MagnetMineScript"));
	}
	if(gameObject.GetComponent("MovingPlatformWaypoint")){
		Destroy(gameObject.GetComponent("MovingPlatformWaypoint"));
	}	
	if(gameObject.GetComponent("NestSwarmer")){
		Destroy(gameObject.GetComponent("NestSwarmer"));
	}
	
	
	
	
	sendKillSignal();
	if(fallWhenDead){
		collider.isTrigger=false;
		if(!rigidbody){
			gameObject.AddComponent(Rigidbody);
			rigidbody.mass=gameObject.transform.localScale.magnitude;		 
		}
		if(!gameObject.GetComponent("MovingPlatformPhysicsHack")){
			//gameObject.AddComponent("MovingPlatformPhysicsHack");
		}
		rigidbody.useGravity = true;
		rigidbody.isKinematic=false;	
	} 	
	if(soundSource){
		soundSource.PlayOneShot(destroyedSound);
		if(SmokeSystem){
			SmokeSystem.Play();
			//print("hedre");
		}
	}
	this.tag = "DissabledEnemy";
	if(detachFromParent){
		if(transform.parent != null){
			transform.parent = null;
		}
	}
	if(DissapearWhenDead){
		Destroy(this.gameObject,dissapearDelay);
	}


	}
	if(ColorFade_WhenDead)
		if(maxHealth<=0){
			if(gameObject.renderer){
				gameObject.renderer.material.color = Color.Lerp(renderer.material.color,Color.gray,0.01);
			}
		
		}
}

function OnTriggerEnter(other:Collider){
	if(other.tag.Equals("PlayerWeapon1DMG") && this.tag != "DissabledEnemy"){
		if(soundSource){
			soundSource.PlayOneShot(hitSound);
		}
		Destroy(other.gameObject);
		maxHealth--;
	}
}
function OnCollisionEnter(other:Collision){
	if(other.gameObject.tag.Equals("PlayerWeapon1DMG") && this.tag != "DissabledEnemy"){
		if(soundSource){
			soundSource.PlayOneShot(hitSound);
		}
		Destroy(other.gameObject);
		maxHealth--;
	}
}