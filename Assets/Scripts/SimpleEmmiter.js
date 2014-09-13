#pragma strict
private var player : GameObject;
var distanceFromPlayer : float = 300;
var fasterWhenNearPlayer:boolean;
var ifFasterThanAtWhatRate : float = 1;
var emit : Transform;
var frequency : float = 5;
var offset : float = 0;
private var baseOffset : float;
var power : float = 500;
var setRandomizePower:boolean=false;
var setRandomizeSize: boolean = false;
var setRandomizeFrequency:boolean = false;
var randomizePower : float = 0;
var sizeVariance : float = 0;
var randomizeEveryFire : boolean = false;
var objectWeightBySize:boolean=true;
private var timeAtStart : float;
private var baseTime : float;
private var basePower : float;
private var baseSize:Vector3;
private var baseVariance:float;
//var offset : float = 0;


function Start () {
	baseSize = transform.localScale;
	basePower = power;
	baseTime = frequency;
	baseOffset = offset;
	baseVariance = sizeVariance;
	player = GameObject.Find("Player");
	if(setRandomizePower){
		power = basePower + Random.Range(-randomizePower,randomizePower);
	}
	if(setRandomizeFrequency){
		offset = Random.Range(0,frequency*2);
	}
	if(setRandomizeSize){
		sizeVariance = Random.Range(1/baseVariance,baseVariance);
	}
	frequency = baseTime + offset;
	
	timeAtStart = Time.time;
	
}

function Update () {

	if(Vector3.Distance(player.transform.position, transform.position) < distanceFromPlayer){
	if(emit){
		
		if(Time.time - timeAtStart > frequency){
		
			

			var projectile : Transform;
			projectile = Instantiate(emit, transform.position,Quaternion.identity);
			if(transform.parent){
				Physics.IgnoreCollision(transform.parent.collider, projectile.collider,true);
				Physics.IgnoreCollision(transform.parent.collider, projectile.rigidbody.collider,true);

			}
			
			projectile.transform.localScale *= sizeVariance;
			if(objectWeightBySize){
				projectile.rigidbody.mass = Mathf.Max(2,projectile.transform.localScale.magnitude);
			}
			var trail : TrailRenderer = projectile.GetComponent(TrailRenderer);
			trail.startWidth=projectile.localScale.x;
			projectile.rigidbody.AddForce(transform.forward * power *projectile.rigidbody.mass);
			timeAtStart = Time.time;
		 	Destroy(projectile.gameObject,5);
		 	audio.Play();
		 	if(randomizeEveryFire){
				if(setRandomizePower){
		power = basePower + Random.Range(-randomizePower,randomizePower);
	}
	if(setRandomizeFrequency){
		offset = Random.Range(0,frequency*2);
	}
	if(setRandomizeSize){
		sizeVariance = Random.Range(1/baseVariance,baseVariance);
	}
	frequency = baseTime + offset;
	
	timeAtStart = Time.time;

		}

		 }else if(Time.time - timeAtStart > frequency/5 && transform.parent&& projectile){
		 	Physics.IgnoreCollision(transform.parent.collider, projectile.collider,false);

		 }

	
	}
	}
}