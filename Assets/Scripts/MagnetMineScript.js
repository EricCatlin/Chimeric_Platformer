#pragma strict
private var player : GameObject;
private var spring : SpringJoint;
var range : float;
var speed : float;
var wanderRange : float = 10;
private var homeNest :GameObject;
private var startPos : Vector3;
private var homeNestScript : NestScript;
private var randomVector : Vector3 = Vector3(0,-1,0); 

var nest : GameObject;


function Start () {
	player = GameObject.Find("Player");
	startPos = transform.position;
}

function OnDestroy(){
	if(homeNestScript){
	homeNestScript.removeOne();
	}
}



function FixedUpdate () {
var distance = Vector3.Distance(player.transform.position, transform.position);
var layerMask = 1<<8;
layerMask = ~layerMask;
	if(distance < range && !Physics.Linecast(transform.position,player.transform.position,layerMask)){
		renderer.material.color=Color.red;
		rigidbody.AddForce((-(transform.position-player.transform.position).normalized) * speed *(range/distance)*Time.deltaTime, ForceMode.Impulse);
	}else{
		distance = Vector3.Distance(transform.position,startPos);
		
		if(distance < wanderRange){
			renderer.material.color=Color.blue;
			if(!Physics.Linecast(transform.position,transform.position+rigidbody.velocity)){
				rigidbody.AddForce(randomVector,ForceMode.Impulse);
			}else{
				rigidbody.AddForce(-rigidbody.velocity*.5,ForceMode.Impulse);
				randomVector = Vector3(-0.5+Random.value,-0.5+Random.value,0).normalized;

			}

		}else{
			if(!Physics.Linecast(transform.position,transform.position+rigidbody.velocity)){
				rigidbody.AddForce((startPos-transform.position).normalized,ForceMode.Impulse);
				

			}else{
				randomVector = Vector3(-0.5+Random.value,-0.5+Random.value,0).normalized;

				rigidbody.AddForce(-rigidbody.velocity*.5 + randomVector*3,ForceMode.Impulse);
			}
			renderer.material.color=Color.yellow;
		}
	}
}

function OnCollisionEnter(hit:Collision){
	if(hit.gameObject.name.Equals("PlayerBullet(Clone)")){
		rigidbody.AddForce(-hit.contacts[0].normal*20,ForceMode.Impulse);
	}
}