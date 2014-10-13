#pragma strict
import System.Collections.Generic;

var broadcast : boolean = true;
var Destroyer : List.<GameObject> = new  List.<GameObject>();
var Enable : List.<GameObject> = new  List.<GameObject>();
var Activate : List.<SwitchBehavior> = new  List.<SwitchBehavior>();
var BlowOffScreen  : List.<GameObject> = new  List.<GameObject>();

var Disable : List.<GameObject> = new  List.<GameObject>();


function Start () {

}

function Update () {

}
function RecieveSwitchEvent(object: GameObject){
if(broadcast){
	print("switch hit" + object.name);
	SendMessage("SwitchEventRecieved",object);
	}
	{
	if(Destroyer.Count>0){
		for(var i : int = 0; i<Destroyer.Count;i++){
			Destroy(Destroyer[i]);
	}
	}
	}
	if(Enable.Count>0){
		for(var j : int = 0; j<Enable.Count;j++){
			Enable[j].SetActive(true);
	}
	}
	if(Disable.Count>0){
		for(var k : int = 0; k<Disable.Count;k++){
			Disable[k].SetActive(false);
	}
	}
	if(Activate.Count>0){
		for(var m : int = 0; m<Activate.Count;m++){
			Activate[m].SetActive();
	}
	}
	if(BlowOffScreen.Count>0){
		for(var n : int = 0; n<BlowOffScreen.Count;n++){
			if(BlowOffScreen[n].rigidbody==null){
				var rigid : Rigidbody = BlowOffScreen[n].AddComponent(Rigidbody);
				rigid.useGravity=true;
				rigid.mass=1000;
				rigid.AddForce(-(Vector3.forward + Random.onUnitSphere/10)*rigid.mass*5000 );
				
			}
	}
	for(var q : int = 0; q<BlowOffScreen.Count;q++){
			
				Destroy(BlowOffScreen[q],5);
			
	}
	}
}