#pragma strict
var NewMusic: AudioClip; //Pick an audio track to play.
var volume : float;
function Awake () {
     var go = GameObject.Find("GameMusic"); //Finds the game object called Game Music.
     if(go && !(PlayerPrefs.GetInt("NoMusic",0) == 1)){
     if (go.audio.clip != NewMusic) { 
         go.audio.clip = NewMusic; //Replaces the old audio with the new one set in the inspector.
         go.audio.Play(); //Plays the audio.
         go.audio.volume = volume;
     }
     }
}