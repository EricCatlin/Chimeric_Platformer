#pragma strict
public var baseColor : Color;
var hitColor : Color;
function Start () {

}

function FixedUpdate () {
	gameObject.renderer.material.color = Color.Lerp(gameObject.renderer.material.color,baseColor,0.1f);
}

function OnCollisionEnter(c : Collision){
  gameObject.renderer.material.color = hitColor;
}