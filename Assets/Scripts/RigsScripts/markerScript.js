#pragma strict


private var lighte : Light;
private var time : float;
function Start () {
	lighte = GetComponent(Light);
	time = Time.time;
}

function Update () {
	if(time + 0.5 < Time.time){
		lighte.enabled = false;
		
	}if(time + 1 < Time.time){
		lighte.enabled = true;
		time = Time.time;
	}
	
}