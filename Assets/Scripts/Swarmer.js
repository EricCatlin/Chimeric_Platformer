#pragma strict
private var player : GameObject;
var range : float;
var speed : float;
var SwarmLocation : Vector3;


function Start () {
	player = GameObject.Find("Player");
	SwarmLocation = transform.position;
}

function FixedUpdate () {
var distanceToPlayer = Vector3.Distance(player.transform.position, transform.position);
var distanceToNest = Vector3.Distance(transform.position,SwarmLocation);
var layerMask = 1<<8;
layerMask = ~layerMask;
	if(tag.Contains("1DMG")){
	if(distanceToNest*.5 > distanceToPlayer || distanceToNest > 500){
		renderer.material.color = Color.magenta;
		rigidbody.AddForce((-(transform.position-SwarmLocation)) * speed* distanceToNest*Time.deltaTime, ForceMode.Impulse);
	}else if(distanceToPlayer < range && !Physics.Linecast(transform.position,player.transform.position,layerMask)){
		renderer.material.color = Color.red;
		rigidbody.AddForce((-(transform.position-player.transform.position)) * speed *(range/distanceToPlayer)*Time.deltaTime, ForceMode.Impulse);
		
	
		

	}
	}
	transform.LookAt(transform.position+ gameObject.rigidbody.velocity.normalized);

}
function OnCollisionEnter(hit:Collision){
	if(hit.gameObject.name.Equals("PlayerBullet(Clone)")){
		rigidbody.AddForce(-hit.contacts[0].normal*20,ForceMode.Impulse);
	}
}