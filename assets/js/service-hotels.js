var hotels = null;

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

function getHotels() {
    var request = new XMLHttpRequest();
    var url = "http://localhost:8080/hotels";

    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        hotels = JSON.parse(this.responseText);
        printHotels(hotels);

        	/** LISTENER **/
			var filtered = null;
			document.getElementById("input-search").addEventListener("keyup", function() {
				var PATTERN = this.value;
				if (PATTERN) {
					filtered = hotels.filter(function(h) { 
					return h.address.streetAddress.indexOf(PATTERN) != '-1' 
							|| h.name.indexOf(PATTERN) != '-1' 
							|| h.phone.indexOf(PATTERN) != '-1'
							|| h.email.indexOf(PATTERN) != '-1'});
					
					printHotels(filtered);
				} else {
					printHotels(hotels);
				}
			});
      }
  };

  request.open('GET', url);
  request.send();

}


function printHotels(arr) {
	var i;
	var j;
	
	document.getElementById("inner_container_list_item").innerHTML = "";
	for(i = 0; i < arr.length; i++) {
		
		/** Box Preview **/
		var box_preview = document.createElement("div");
		box_preview.className = "box-preview";
		
		/** Box Header **/
		var box_preview_header = document.createElement("div");
		box_preview_header.className = "box-preview-header";
		box_preview_header_text = document.createTextNode(arr[i].name);
		box_preview_header.appendChild(box_preview_header_text);
		
		/** Box Body **/
		var box_preview_body = document.createElement("div");
		box_preview_body.className = "box-preview-body";
		
		/** Box Footer **/
		var box_preview_footer = document.createElement("div");
		box_preview_footer.className = "box-preview-footer";
		box_preview_footer.innerHTML = '<a href="#" class="button button1" onclick="viewHotel(\''+arr[i].id+'\')">View More</a>';
		
		/** Body First Row **/
		var firstrow = '<div class="row">';
        firstrow += '<div class="column-left"><p>Phone:<br><strong>'+arr[i].phone + '</strong></p></div>';
        firstrow += '<div class="column-right">';
		
        for(j = 0; j <+arr[i].stars; j++) {
			firstrow += '<img src="assets/img/star.png" class="star" alt=""/>'
        }
        
		firstrow += '</div>';
		firstrow += '</div>';
		
		/** Body Second row **/
		var secondrow = '<div class="row">';
		secondrow += '<div class="column-left"><p>Email:<br><strong>'+arr[i].email + '</strong></p></div>';
		secondrow += '<div class="column-right"></div>';
		secondrow += '</div>';
		
		/** Body Address **/
		var address = '<div>';
		address += '<address>Address:<br>';
		address += ''+arr[i].address.streetAddress+', ' +arr[i].address.city+', '+arr[i].address.country+' - '+arr[i].address.zipCode+ '</address>';
		address += '</div>';
		
		box_preview_body.insertAdjacentHTML('afterbegin', address);
		box_preview_body.insertAdjacentHTML('afterbegin', secondrow);
		box_preview_body.insertAdjacentHTML('afterbegin', firstrow);
		
		
		box_preview.appendChild(box_preview_header);
		box_preview.appendChild(box_preview_body);
		box_preview.appendChild(box_preview_footer);
		
		document.getElementById("inner_container_list_item").appendChild(box_preview);
		
	}
}


function viewHotel(id)
{ 
	var i = 0;
	var k = 0;
	var hotel = null;
	var dettaglio_titolo = "";
	var dettaglio_body = "";
	
	for(i = 0; i < hotels.length; i++)
		if (hotels[i].id == id) hotel = hotels[i]; 
    
    dettaglio_titolo  += '<div>' + hotel.name + ' ';
    
	for(k = 0; k <hotel.stars; k++) {
      dettaglio_titolo += '<img src="assets/img/star.png" class="star" alt=""/>'
    }
    dettaglio_titolo  += '</div>';
	
	document.getElementById("inner_container_list").style.display = "none";
	document.getElementById("inner_container_detail").style.display = "block";
	
	dettaglio_body += '<div>' + hotel.longDescription + '</div>';
	dettaglio_body += '<div class="box-container">';
	
	/** Aggiungo i box **/
	dettaglio_body += getHtmlHotelDetailBox('Number of rooms', 'assets/img/room.png', hotel.rooms, 'yellow');
	dettaglio_body += getHtmlHotelDetailBox('Phone', 'assets/img/phone.png', hotel.phone, 'orange');
	dettaglio_body += getHtmlHotelDetailBox('Email', 'assets/img/email.png', hotel.email, 'red');
	dettaglio_body += getHtmlHotelDetailBox('Website', 'assets/img/web.png', hotel.website, 'green');
	
	dettaglio_body += '</div>';

	dettaglio_body += '<div>';
	dettaglio_body += '<address>Address:<br>';
	dettaglio_body += ''+hotel.address.streetAddress+', ' +hotel.address.city+', '+hotel.address.country+' - '+hotel.address.zipCode+ '</address>';
	dettaglio_body += '</div>';

	document.getElementById("box-detail-title").innerHTML = dettaglio_titolo;
	document.getElementById("box-detail-body").innerHTML = dettaglio_body;
}

function getHtmlHotelDetailBox(title, img, info, color) {
	str_code = "";
	str_code += '<div class="hotel-detail-box '+color+'">';
	str_code += '<p><small>'+title+'</small><br><img src="'+img+'" class="star" alt=""/><br>';
	str_code += '<strong>'+info + '</strong></p>';
	str_code += '</div>';
	
	return str_code;
}

function goBack(){
	document.getElementById("inner_container_list").style.display = "block";
	document.getElementById("inner_container_detail").style.display = "none";
}
