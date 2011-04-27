// This file was generated by Dashcode from Apple Inc.
// You may edit this file to customize your Dashboard widget.

var gname = "";
var KIBO = "http://www.kibotzer.com/";

function load() {
    restoregname();
	document.getElementById("graphName").value=gname;
	setupParts();
}

function checkNewName(event) {
   if (event.type == "mouseout" || 
       event.keyCode == 13 || event.keyCode == 9) {
       var newg = document.getElementById("graphName").value;
       if (newg != gname) {
         gname = newg;
         show();
       }
   }
}

function savegname() {
	var preferenceKey = "graph_name";
	var preferenceValue = gname;
	widget.setPreferenceForKey(preferenceValue, widget.identifier + "-" + preferenceKey);
}
function restoregname() {
	var preferenceForKey = "graph_name";	
    gname = widget.preferenceForKey(widget.identifier + "-" + preferenceForKey);
	if ( !gname ) {
		gname = "djob";
	}
}

function remove() {
    // Stop any timers to prevent CPU usage
    // Remove any preferences as needed
    // widget.setPreferenceForKey(null, createInstancePreferenceKey("your-key"));
}
function hide() {
    // Stop any timers to prevent CPU usage
    savegname(gname);
}

function show() {
	document.getElementById("graph").src = fetchGraph();
	var data = getRecent();
	var scroll = document.getElementById("dataScroll");	

	scroll.object.content.innerHTML = data.replace(/\n/g,"<br>");
	scroll.object.refresh();
	document.getElementById("recentData").innerText = data;
}

function fetchGraph() {
	var now = new Date().getTime();
	return KIBO+"data/"+gname+".png?"+now;
}

function sync() {
    restoregname();
}

if (window.widget) {
    widget.onremove = remove;
    widget.onhide = hide;
    widget.onshow = show;
    widget.onsync = sync;
}

function getRecent() {
	var data = makeRequest(KIBO+"data/"+gname+".kib.2");
	data = data.split("\n");
	var recent = data.pop();
	while (recent == "") {
      recent = data.pop();
    }
	return recent;
}

function makeRequest(url){
	var req = new XMLHttpRequest();
	req.open("GET",url,false);
	req.send(null);
	return req.responseText;
}

function esc(s) {
   s=escape(s);
   s=s.replace(/\+/g, "%2B");
   s=s.replace(/%20/g, "+");
   s=s.replace(/\\/g, "%2F");
   return s;
}

function launchPersonal(event) {
	var websiteURL = KIBO+gname;
	widget.openURL(websiteURL);
}
function launchKibo(event) {
	widget.openURL(KIBO);
}









function highlightMe(event) {
	var l = document.getElementById('viewtxt');
	//l.style.color = "rgb(255, 102, 102)";
	//l.style.setProperty("background-color","rgb(255, 255, 102)");
	//var pp = l.style.getPropertyValue("text-decoration");
	l.style.setProperty("text-decoration","underline");
}


function unhighlightMe(event) {
	var l = document.getElementById('viewtxt');
	//l.style.color = "";
	//l.style.setProperty("background-color","");
	l.style.setProperty("text-decoration","");
}


function showAllData(event) {
document.getElementById('dataScroll').style.display="block";
document.getElementById('recentData').style.display="none";
/*
var dat = document.getElementById('recentData').style;
dat.setProperty("background-color","rgb(255, 255, 102)");
dat.setProperty("height","200px");
dat.setProperty("color","black");
dat.setProperty("top","350px");
dat.setProperty("padding","3px");

dat.removeProperty("text-overflow");
dat.removeProperty("white-space");
dat.removeProperty("overflow");
*/
}


function hideAllData(event) {
document.getElementById('dataScroll').style.display="none";
document.getElementById('recentData').style.display="block";
/*
var dat = document.getElementById('recentData').style;
dat.removeProperty("background-color");
dat.removeProperty("padding");

dat.setProperty("top","407px");
dat.setProperty("height","15px");
dat.setProperty("color","white");
dat.setProperty("text-overflow","ellipsis");
dat.setProperty("white-space","nowrap");
dat.setProperty("overflow","hidden");
*/
}

