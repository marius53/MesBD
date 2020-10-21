var lock="free";
var counter="0";
const maxCounter=10000;
	var vid1 = "<video width=\"320\" height=\"240\" autoplay><source src=\"";
	var	vid2 = "\" type=\"video/mp4\"></video>";
	var img1="<img src=\"";
	var img2="\" class=\"thumb\">";

function counterplus() {
	var acc = document.getElementById("counter");
	counter++;
	acc.style.display = "block";
	acc.innerHTML= "Jobs en cours : " + counter ;
}
function countermoins() {
	var acc = document.getElementById("counter");
	counter--;
	if (counter === 0) {
				acc.style.display = "none";
			} else {
				acc.innerHTML= "Jobs en cours :  " + counter ;
				acc.style.display = "block";
			}
	acc.innerHTML= "Jobs en cours : " + counter ;

}


function InitAccord() {
	var acc = document.getElementsByClassName("accordion");
	var i;
	var panel;

	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function () {
			this.classList.toggle("active");
			panel = this.nextElementSibling;
			if (panel.style.display === "block") {
				panel.style.display = "none";
			} else {
				panel.style.display = "block";
			}
		});
	}
}

function closePanels() {
	var acc = document.getElementsByClassName("accordion");
	var i;
	var panel;

	for (i = 0; i < acc.length; i++) {
		panel = acc[i].nextElementSibling;
		panel.style.display = "none";
	}
}
function openAllPanels() {
	var acc = document.getElementsByClassName("accordion");
	var i;
	var panel;

	for (i = 0; i < acc.length; i++) {
		panel = acc[i].nextElementSibling;
		panel.style.display = "block";
	}
}
function openThisPanel(repere) {
	var panel;
	panel=document.getElementById("panel"+repere+"F");
		panel.style.display = "block";
	panel=document.getElementById("panel"+repere+"H");
		panel.style.display = "block";
	panel=document.getElementById("panel"+repere+"C");
		panel.style.display = "block";
	panel=document.getElementById("panel"+repere+"T");
		panel.style.display = "block";
}
function closeThisPanel(repere) {
	var panel;
	panel=document.getElementById("panel"+repere+"details");
		panel.style.display = "none";
}
function loadXMLDoc(filename) {
	if (window.ActiveXObject) {
		xhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} else {
		xhttp = new XMLHttpRequest();
	}
	xhttp.open("GET", filename, false);
	xhttp.send("");
	return xhttp.responseXML;
}


function playSound(s) {
	var e=document.createElement('audio');
	e.setAttribute('src',s);
	e.play();
}

class contexte {
	  constructor(doc , ref, duree) {
		  this.doc = doc;
		  this.ref = ref;
		  this.duree = duree;
		  this.newurl = "Qxref.php" + "?doc=" + this.doc + "&ref="+ this.ref +"&duree="+ this.duree  ;
			}
	send(){
			var xhttp = new XMLHttpRequest();
			document.getElementById(this.doc + this.ref).innerHTML = '<div class="tooltip">Running <span class="tooltiptext">(' + counter +')</span></div>';
			var self = this; // Set up something that survives into the closure
			xhttp.onreadystatechange =  function(){
				if (xhttp.readyState == 4) {
					countermoins();
					if (xhttp.status == 200) {
							 playSound("coq.mp3");
							document.getElementById(self.doc + self.ref).innerHTML = xhttp.responseText;
						} else {
							 playSound("bang.mp3");
							 var stringError= "<p>Err " +   xhttp.status + "</p>" ;
							document.getElementById(self.doc + self.ref).innerHTML = xhttp.responseText;
								}
					}
		}
	//			alert ( "GET sur l'URL:  "  + this.newurl );
			xhttp.open("GET", this.newurl, true);
			xhttp.send("");
		}

} 

function displayXref(doc,ref,duree) {

 if (lock !="free") {
		playSound("bang.mp3");
		alert(" travail en cours, réessaie!")
	}
	else {
		if (counter > maxCounter) {
		alert(" trops de jobs  en cours, réessaie!")
		}
		else	{
		lock="busy";
		counterplus();
		var ctxt=new contexte(doc,ref,duree);
		ctxt.send(self.doc + self.ref);
		playSound("ting.mp3");
		lock="free";
	 }
	}
}

function displayAllXref(doc,duree,...listrefs) {
			listrefs.forEach(function(ref){
		   displayXref(doc,ref,duree);
		});
}

class contextedelete {
	  constructor(doc , ref, duree) {
		  this.doc = doc;
		  this.ref = ref;
		  this.newurl = "delObjRef.php" + "?doc=" + this.doc + "&ref="+ this.ref   ;
			}
	send(){
			var xhttp = new XMLHttpRequest();
			document.getElementById(this.doc + this.ref).innerHTML = '<div class="tooltip">Deleting <span class="tooltiptext">(' + counter +')</span></div>';
			var self = this; // Set up something that survives into the closure
			xhttp.onreadystatechange =  function(){
				if (xhttp.readyState == 4) {
					countermoins();
					if (xhttp.status == 200) {
							 playSound("coq.mp3");
							document.getElementById(self.doc + self.ref).innerHTML = "<small>" + xhttp.responseText + "</small>";
						} else {
							 playSound("bang.mp3");
							 var stringError= "<p>Err " +   xhttp.status + "</p>" ;
							document.getElementById(self.doc + self.ref).innerHTML = xhttp.responseText;
								}
					}
		}
	//			alert ( "GET sur l'URL:  "  + this.newurl );
			xhttp.open("GET", this.newurl, true);
			xhttp.send("");
		}

} 
function delRef(doc,ref,target) {
		r = confirm("Tu veux vraiment supprimer " + ref  + " dans le theme  " + target + " de "  + doc + "?");
		 if (r == true) {
			 if (lock !="free") {
				playSound("bang.mp3");
				alert(" travail en cours, réessaie!")
			}
			else {
				if (counter > maxCounter) {
				alert(" trops de jobs  en cours, réessaie!")
				}
				else	{
				lock="busy";
				counterplus();
				var ctxt=new contextedelete(doc,ref);
				ctxt.send();
				playSound("ting.mp3");
				lock="free";
			 }
			}
		 }
}
function viewThumbVideo(id,target) {
	document.getElementById(id).innerHTML = vid1 + target + vid2;
}
function viewThumbImg(id,target) {
	document.getElementById(id).innerHTML = img1 + target + img2;
}
function setGenre(id,path) {
// http://fritz-home/m/MySetTag.php?file=essai%2Faudio%2FSonnette%2FSambre_et_meuse.mp3&artist=Arm%C3%A9e+Fran%C3%A7aise&title=Sambre+et+Meuse&album=On+les+aura&year=2001
	var btn = document.getElementById("setGenre" + id);
	var url = "/BD/MySetGenre.php";
	url += "?id=" +  id;
	url += "&path=" +  path;
	var mygenre = document.getElementById("genre" + id);
	var selectedIndex=mygenre.selectedIndex;
	var mygenretext = mygenre.options[mygenre.selectedIndex].text;
	var genre = mygenre.options[mygenre.selectedIndex].value;
	url += "&genre=" +  mygenretext;
		if (window.ActiveXObject) {
			xhttp = new ActiveXObject("Msxml2.XMLHTTP");
		} else {
			xhttp = new XMLHttpRequest();
		}
		xhttp.onreadystatechange = function () { //Call a function when the state changes.
			if (xhttp.readyState == 4) {
					if (xhttp.status == 200) {
							//  playSound("/m/coq.mp3");
							document.getElementById("genre" + id).selectedIndex = selectedIndex;
							makeAlbum(id,path);
						} else {
							 playSound("/m/bang.mp3");
							alert(xhttp.responseText + " Retour xhttp.status = " + xhttp.status);
								}
			}

		}
 //       alert ( "GET sur l'URL:  "  + url );
		xhttp.open("GET", url, true);
		xhttp.send("");
}

function makeAlbum(id,path) {
// http://fritz-home/m/MySetTag.php?file=essai%2Faudio%2FSonnette%2FSambre_et_meuse.mp3&artist=Arm%C3%A9e+Fran%C3%A7aise&title=Sambre+et+Meuse&album=On+les+aura&year=2001
	var btn = document.getElementById("setGenre" + id);
	var url = "/BD/makeAlbum.php";
	url += "?id=" +  id;
	url += "&path=" +  path;
		if (window.ActiveXObject) {
			xhttp = new ActiveXObject("Msxml2.XMLHTTP");
		} else {
			xhttp = new XMLHttpRequest();
		}
		xhttp.onreadystatechange = function () { //Call a function when the state changes.
			if (xhttp.readyState == 4) {
					if (xhttp.status == 200) {
							//  playSound("/m/coq.mp3");
							alert(xhttp.responseText + " Retour xhttp.status = " + xhttp.status);
						} else {
							 playSound("/m/bang.mp3");
							alert(xhttp.responseText + " Retour xhttp.status = " + xhttp.status);
								}
			}

		}
 //       alert ( "GET sur l'URL:  "  + url );
		xhttp.open("GET", url, true);
		xhttp.send("");
}
