#pragma strict



private static var instance: GameMusicScript;
public static function GetInstance() : GameMusicScript  {
return instance;
}


function Awake() {
    if (instance != null && instance != this) {
        Destroy(this.gameObject);
        return;
    } else {
        instance = this;
    }
    DontDestroyOnLoad(this.gameObject);
}
