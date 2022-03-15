var places = null;

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function burger() {
    console.log("burger!");
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

function getPlaces() {
    var request = new XMLHttpRequest();
    var url = "http://localhost:8080/places";

    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        places = JSON.parse(this.responseText);
        printPlaces(places);
      }
  };

  request.open('GET', url);
  request.send();

}

function printPlaces(arr) {

}

function viewPlace(id)
{ 

}

function goBack()
{
	document.getElementById("inner_container_list").style.display = "block";
	document.getElementById("inner_container_detail").style.display = "none";
}
