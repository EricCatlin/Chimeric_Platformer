#pragma strict
private var player : GameObject;
private var spring : SpringJoint;
var range : float;
var speed : float;
var wanderRange : float = 10;
var chaseZoneMultiplier : float = 2;
var chaseDistance : float = 10;
private var homeNest :GameObject;
private var startPos : Vector3;
private var homeNestScript : NestScript;
private var randomVector : Vector3 = Vector3(0,-1,0); 
private var canSeePlayer : boolean = false;
private var isNearNest : boolean = true;
private var isInChaseRange :boolean = false;
private var isInAttackMode :boolean= false;
private var isAfraid : boolean = false;
//private var distToDest : float ;
private var distanceToNest  : float ;
private var wanderMode:boolean = false;
private var	isReturningToNest :boolean= false;
private var	isFollowingPlayer :boolean= false;
private var layerMask : int ;
private var fearLevel : float = 0;
private var destination : Vector3;
private var myID : int ;
private var distToDest : float;
private var dirToDest : Vector3;

var nest : GameObject;


function Start () {
	layerMask =  1<<8;
	layerMask = ~layerMask;
	player = GameObject.Find("Player");
	startPos = transform.position;
	InvokeRepeating("setAction",1,1);
	
}


function FixedUpdate () {
 	
 	
 	distToDest = Vector3.Distance(transform.position,player.transform.position);
	dirToDest = (player.transform.position - transform.position).normalized;
	if(distToDest < chaseDistance){
			fearLevel = chaseDistance - (distToDest - chaseDistance);
			isAfraid = true;
		}else{
			isAfraid = false;
		}


 	attackStrategyOne();

}


function attackStrategyOne(){
	


	if(wanderMode){
		//renderer.material.color=Color.blue;
		//renderer.material.color=Color.Lerp(Color.blue,Color.green,(distanceToNest/wanderRange));

		if(!Physics.Linecast(transform.position,transform.position+(randomVector*10))){
			rigidbody.AddForce(randomVector,ForceMode.Impulse);
			if(Random.value < .05){
				randomVector = Vector3(-0.5+Random.value,-0.5+Random.value,0).normalized;

			}
		}else{
			rigidbody.AddForce(-rigidbody.velocity*.5,ForceMode.Impulse);
			randomVector = Vector3(-0.5+Random.value,-0.5+Random.value,0).normalized;
		}
	}else if(isInAttackMode){
		//renderer.material.color=Color.Lerp(Color.red,Color.yellow,(distToDest/chaseDistance));

		//rigidbody.AddForce((player.transform.position-transform.position).normalized * speed, ForceMode.Impulse);
					rigidbody.AddForce(dirToDest.normalized*(Mathf.Min(1,distToDest/20)),ForceMode.Impulse);


	}else if(isAfraid){
			//renderer.material.color=Color.magenta;
			//renderer.material.color=Color.Lerp(Color.red,Color.magenta,(distToDest/chaseDistance));

			rigidbody.AddForce((transform.position - player.transform.position).normalized*fearLevel,ForceMode.Impulse);
	}else if(isFollowingPlayer){
			//renderer.material.color=Color.yellow;
			//renderer.material.color=Color.Lerp(Color.red,Color.green,(distToDest/chaseDistance));

			rigidbody.AddForce((player.transform.position-transform.position).normalized * 0.5* speed, ForceMode.Impulse);
			//rigidbody.AddForce(dirToDest.normalized*(Mathf.Min(1,distToDest/20)),ForceMode.Impulse);

	}else if(isReturningToNest){
			//renderer.material.color=Color.blue;
			//renderer.material.color=Color.Lerp(Color.yellow,Color.green,(wanderRange/distanceToNest));

		if(!Physics.Linecast(transform.position,transform.position+rigidbody.velocity)){
			rigidbody.AddForce((startPos-transform.position).normalized,ForceMode.Impulse);
		}else{
			randomVector = Vector3(-0.5+Random.value,-0.5+Random.value,0).normalized;
			rigidbody.AddForce(-rigidbody.velocity*.5 + randomVector*3,ForceMode.Impulse);
		}
	}

}
//attack pattern is move randomly within a patrol range.  If enemy has a line of sight on player, enemy 

function setAction(){
	distToDest = Vector3.Distance(player.transform.position, transform.position);
	distanceToNest   = Vector3.Distance(transform.position,startPos);
	if(!Physics.Linecast(transform.position,player.transform.position,layerMask)){
		canSeePlayer = true;
		renderer.material.color=Color.yellow;

		if(distToDest < chaseDistance){
			fearLevel = chaseDistance - (distToDest - chaseDistance);
			isAfraid = true;
		}else{
			isAfraid = false;
		}
	}else{
		renderer.material.color=Color.blue;
		canSeePlayer = false;
	}
	if(Vector3.Distance(transform.position,homeNest.transform.position)<wanderRange){
		isNearNest=true;
		isInChaseRange=true;
		renderer.material.color=Color.red;

	}else if(Vector3.Distance(transform.position,homeNest.transform.position)<wanderRange*chaseZoneMultiplier){
		isInChaseRange = true;
		isNearNest=false;

	}else{
		isInChaseRange = false;
		isNearNest=false;
	}
	if(isNearNest){
		isReturningToNest = false;

		if(canSeePlayer){
			isInAttackMode = true;
			wanderMode = false;
		}else{
			isInAttackMode = false;
			wanderMode = true;
		}
	}else if(isInChaseRange){
			isInAttackMode = false;
			wanderMode = false;
		if(canSeePlayer  ){
			if(distToDest > chaseDistance){
				isFollowingPlayer = true;
				isReturningToNest = false;
			}else{
			isFollowingPlayer = false;
			isReturningToNest = true;
			
		}
		}
	}else{
		isInAttackMode = false;
		wanderMode = false;
		isReturningToNest = true;
		isFollowingPlayer = false;
	}
}

function OnCollisionEnter(hit:Collision){
	if(hit.gameObject.name.Equals("PlayerBullet(Clone)")){
		rigidbody.AddForce(-hit.contacts[0].normal*20,ForceMode.Impulse);
	}
}
function setUpDestination(){
	var distToDest = Vector3.Distance(transform.position,destination);
	var dirToDest = (destination - transform.position).normalized;
	if(distToDest>10){//its far away
		if(!Physics.Linecast(transform.position,destination)){//yoiu have clear line of sight
			//go towards it
			rigidbody.AddForce(dirToDest.normalized*(Mathf.Min(1,distToDest/20)),ForceMode.Impulse);
			Debug.DrawLine(transform.position,destination,Color.blue,.1);
		}else{//obstruction, 
		
			if(rigidbody.velocity.magnitude>1){
				rigidbody.AddForce(-rigidbody.velocity,ForceMode.Impulse);
			}else{
				rigidbody.AddForce(Vector3(Random.value-0.5,Random.value-0.5,0),ForceMode.Impulse);
			}
		}
	}
}
function setDestination(pos : Vector3){
	destination = pos;
}


function OnDestroy(){
	if(homeNestScript){
	homeNestScript.removeOne();
	}
}

function setNest(nest:GameObject){
	startPos = nest.transform.position;
	homeNest = nest;
	
	homeNestScript = homeNest.gameObject.GetComponent("NestScript");
	homeNestScript.addOne(this);
	wanderRange = homeNestScript.getRange();
}
function setUniqueId(id :int){
	myID = id;
}