// dc-haptics 
// version 2 (experimental)
// author:  Markku T. Hakkinen - Educational Testing Service  mhakkinen(at)ets.org
// date: 30 January 2014  revised: 21 December 2014
// copyright (c)2014-2015 by Educational Testing Service / DIAGRAM Center
//
// Change log:
// 2014-01-30 - Version 1: Extended from ets-haptics, simplified.
// 2013-05-24 - Version 2: Corrected bug with touch start, added styles. 
//
// Implements HapticCSS using vibrate property.  Support for CSS style notation using JSON for now.
// You can define vibration styles for:
//  elements
//  class
//  id 
//  
//  vibrate: dur-ms | [dur-ms,pause-ms[,dur-ms,pause-ms]...] | tick | buzz 
// 
//  Cascade? If multiple properties are determined for a single element, only one can be triggered. Precedence rule:
//
//       id > class > element
//
// Include this script file in your Web page header. Requires JSON.
// Define a variable for the JSON'ized Haptic CSS, as below:
//
//

var e;
  var estyle;
  var vibePat;
  var curVibe=0;
  var curID="a";
  var curX=0;
  var curY=0;
  var curTouching=0;
  var tmint;
  var vCSS;
  var xx;

//init Haptics must be called on document load to register touch handlers  
function initHaptics(s) {
  
  	vCSS = jsonParse(s);
  	document.body.addEventListener("touchstart", effectStart, false);
    document.body.addEventListener("touchmove", effectMove, false); 
    document.body.addEventListener("touchend", effectEnd, false);
    tmint=window.setInterval(effectTimer,150);    // Interval default is 150ms, requires experimentation
  }
//set vibration value based on current element vibrate property
  function effectTimer() {
  	if (curTouching==1) {
  		e=document.elementFromPoint(curX,curY);
  	  vibePat = getVibrateProperty(e);
  	  if (vibePat==curVibe) {	 
  	     navigator.vibrate(curVibe);}
  	    else
  	   	{
  	   		navigator.vibrate(vibePat);	
  	      curVibe=vibePat;
	      }
  	}
  }

function effectStart(event) {
		curTouching=1;
		e=document.elementFromPoint(event.touches.item(0).clientX, event.touches.item(0).clientY);
		curVibe=0;
		curID=e.ID;
		curX=event.touches.item(0).clientX;
		curY=event.touches.item(0).clientY;
 		vibePat = getVibrateProperty(e);
 	  navigator.vibrate(vibePat);	
	}

function effectMove(event) {
		curTouching=1;
		e=document.elementFromPoint(event.touches.item(0).clientX, event.touches.item(0).clientY);
		curVibe=0;
		curID=e.ID;
		curX=event.touches.item(0).clientX;
		curY=event.touches.item(0).clientY;
 		vibePat = getVibrateProperty(e);
 	  navigator.vibrate(vibePat);	
	}

  function effectEnd() {
	  curVibe=0; 
	  curTouching=0;
	}  

//get vibrate property value based on id, class,or element type
function getVibrateProperty(e) {
     var vb;
     var vb1=getTag(e);
     var vb2=getClassN(e);
     var vb3=getId(e);
       
     if (vb3!=0) {vb=vb3;}
     else if (vb2!=0) {vb=vb2;}
     	else if (vb1!=0) {vb=vb1;}
     		else vb=0;
     
     switch(vb)
     {		
     // default named vibration styles	
      case 'tick': vb=10; break;
      case 'ticktock': vb=[10,50,20,50]; break;
      case 'buzz': vb=[50,25,50,25,50,25]; break;
      case 'sonar': vb=[60,80,40]; break;
      case 'noise': vb=[5,10,8,5,12,8,10]; break;
      case 'rising': vb=[5,15,10,15,20,15,40,15,80,15]; break;
      case 'none': vb=0;
     }
     return vb; 
}
  
 

function getTag(e) {
	var vf=0;
	try {
    var v=vCSS[e.tagName.toLowerCase()].vibrate;
    vf=1;
  }
  catch (err) {vf=0; v=0;}
  if (vf==1) {return v} else {return 0;}
}


function getClassN(e) {
	var classList=e.className.split(' ');
  for (var i=0; i<classList.length; i++)
    {
      try {
          var v=vCSS["."+classList[i]].vibrate;
          vf=1;
         }
  catch (err) {vf=0; v=0;}}
  if (vf==1) {return v} else {return 0;}
}

function getId(e) { 
	    try {
       var v=vCSS["#"+e.id].vibrate;
       vf=1;
      }
      catch (err) {vf=0; v=0;}
  if (vf==1) {return v} else {return 0;}

} 

