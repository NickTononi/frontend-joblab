var techs;

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

function getTechs() {
    var request = new XMLHttpRequest();
    var url = "https://joblab-backend-2022.herokuapp.com/techs";
    //var url = "http://localhost:8080/techs";

    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        techs = JSON.parse(this.responseText);
        addTechsToPage();
      }
  };

  request.open('GET', url);
  request.send();

}

function addTechsToPage(){
  var htmlToAppend = '<table>';
  for (var i = 0; i < techs.length; i+=3) {
    var tech = techs[i];
    var tech2 = techs[i+1];
    var tech3 = techs[i+2];
    var cell = '<td class="tech-cell"><h4>'+tech.name+'</h4><img class="tech-img" src="'+tech.image+'"><p>Price: '+tech.price+'</p><button onclick="openDetails(\''+tech.id+'\')">Details</button></td>';
    var cell2 = '<td class="tech-cell"><h4>'+tech2.name+'</h4><img class="tech-img" src="'+tech2.image+'"><p>Price: '+tech2.price+'</p><button onclick="openDetails(\''+tech2.id+'\')">Details</button></td>';
    var cell3 = '<td class="tech-cell"><h4>'+tech3.name+'</h4><img class="tech-img" src="'+tech3.image+'"><p>Price: '+tech3.price+'</p><button onclick="openDetails(\''+tech3.id+'\')">Details</button></td>';
    htmlToAppend+='<tr>'+cell+cell2+cell3+'</tr>';  
  }
  htmlToAppend+='</table>';
  document.querySelector("#my-content").innerHTML = htmlToAppend;
}

function openDetails(id){
  for (var i = 0; i < techs.length; i++) {
    if(techs[i].id === id){
      //TODO populate and show vanilla "modal" with details
    }
  }
}

function goBack()
{
	document.getElementById("inner_container_list").style.display = "block";
	document.getElementById("inner_container_detail").style.display = "none";
}
