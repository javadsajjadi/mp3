function callBackground(){
	
	var treshould=20;
	
	var num = Math.floor(Math.random() * treshould);
	$.backstretch(["wallpapers/"+num+".jpg"],{duration: 5000, fade: 3000});
	
	settitle(); 
}

function settitle(){
	
	//document.title= player1._d.playlist_ar[player1.getTrackId()].title+ " - موزیک بی کلام";
	document.title= player1.getTrackTitle()+ " - موزیک بی کلام";
}

function nextalbum(){
	
	var next=player1.catId +1; //find next album id
	var total= player1._d.cats_ar.length; // total albums count
	
	if(next==total) next=0;
	player1.loadPlaylist(next);
	
	player1._d.autoPlay_bl = true;
			
}

function backalbum(){
	
	var back=player1.catId -1; //find previous album id
	var total= player1._d.cats_ar.length; // total albums count
	
	if(back<0) back=total;
	player1.loadPlaylist(back);
	
	player1._d.autoPlay_bl = true;
			
}

function closeme(handler) {
	
	if ('undefined' == typeof window.jQuery) {// jQuery not present
	
		let el = document.getElementById(handler);
		el.style.display = "none";
    
	} else {
		// jQuery present
		jQuery("."+handler).fadeOut(500);	 
	}

	   
}

function requestFullScreen() {
	
	var element = document.body; // Make the body go full screen.
	
	if (document.fullscreenElement) { //we are in full screen mode already!
		
		document.getElementById("fullscreenimage").src = "images/fullscreen.png";
		closeFullscreen();
		return ;
	}

    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
	
	document.getElementById("fullscreenimage").src = "images/normalscreen.png";

}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

function extraListener() {
	
	//to change bg base on track
	player1.addListener(FWDRAP.START, callBackground);
			
	//to add pause key to the player
	document.body.onkeyup = function(e){
				
		switch(e.keyCode) {
			
			case 49://1
			player1.playPrev();
			break;
			
			case 50://2
			player1.playNext();
			break;
			
			case 80://p
			player1.play();
			break;
			
			case 83://s
			player1.stop();
			break;
			
			case 65://a
			player1.showCategories();
			break;
			
			case 27://esc
			player1.hideCategories();
			break;
			
			case 66://b
			backalbum();
			break;
			
			case 78://n
			nextalbum();
			break;
			
			case 70://f
			requestFullScreen();
			break;
			
			case 122:
			    //e.preventDefault();
	
			break;
			
			default:
			// code block
		}

	}
}