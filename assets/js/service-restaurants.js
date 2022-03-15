var restaurants = null;

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

function getRestaurants() {
    var request = new XMLHttpRequest();
    var url = "http://localhost:8080/restaurants";

    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        restaurants = JSON.parse(this.responseText);
        printRestaurants(restaurants);
      }
  };

  request.open('GET', url);
  request.send();

}

function printRestaurants(arr) {

}

function viewRestaurant(id)
{ 

}

function goBack()
{
	document.getElementById("inner_container_list").style.display = "block";
	document.getElementById("inner_container_detail").style.display = "none";
}
