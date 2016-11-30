<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- Search: AIzaSyDFnRgp5wG3WNEKiLZg8Cjk5vjSyvL86_8 
	 Map: AIzaSyCRjhH9N48NhWnwxBlX6Jii4a7DFp4NJ8o-->
<html>
    <head>
        <title>Home</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel = "stylesheet" href = "main.css">
        <script src = "cookies.js"></script>
        <script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src = "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDFnRgp5wG3WNEKiLZg8Cjk5vjSyvL86_8&libraries=places&callback=initMap"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    
    <style>
	#map {
	   margin-left: 2px;
	   width:100%;
	   height: 600px;
	   background-color: grey;
	}
 	.row {
	    z-index: -1;
	    margin-left: -15px;
	    margin-right: -15px;
	    color: black;
	    font-family: 'fantasy', serif; 
	    font: Papyrus, book antiqua;
	    text-align: center;
	}
	.row:before, .row:after{
	    content: " ";
	    display: table;
	}
	.row:after {
	    clear: both;
	}
	.col-1 {
	    z-index: 0;
	    position: relative;
	    min-height: 1px;
	    float: none;
	    text-align: center;
	}
	</style>
    <body>
        <div class = "jumbotron">
            <div class = "text-right">
                <div class = "col-xs-pull-1">
                    <div class = "dropdown">
                        <button class = "btn btn-default dropdown-toggle" type = "button" data-toggle = "dropdown" style = "background-color:#81C6C9; border: 4px solid #489194"><strong>Options</strong>
                        <img src="pics/gear.png" alt=""/><span class = "caret"></span></button>
                        <ul class = "dropdown-menu pull-right">
                            <li><a href = "User?action=logout">Log Out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class = "text-center">
                <h1>Moo-Moo Travel</h1>
            </div>
        </div>
        <div class = "content">
            <div class = "text-center">
                <div id = "GradeButtonContainer" class = "col-md-12">
                    <p></p>
                    <input type = "button" style = "background-color:#81C6C9; border: 4px solid #489194" onclick = "document.location.href = 'Home.jsp'" value = "Home"/>
                    <p></p>
                </div>
            </div>
            <div class = "text-center">
                <div id = "LessonButtonContainer">
                    
                </div>
            </div>
            <div class = "content">
                <div class ="row">
                <div class="col-1" style="width: 70%; margin-left: 35px; float: left;">
                	<div id="map"></div>
					<script type="text/javascript">
						var city="";
						var pic_default = 'pics/default.png';
					    var pic_hotel = 'pics/lodging_0star.png';
					    var pic_restaurant = 'pics/restaurant.png';
					  	var httpRequest;
						var locationdata;
						var iconMarkers=[];
					  	function makeRequest(url,function_name) {
					    	httpRequest = new XMLHttpRequest();
					    	if (!httpRequest) {
					      		alert('Giving up :( Cannot create an XMLHTTP instance');
					      		return false;
					    	}
					    	httpRequest.onreadystatechange = function () { alertContents(function_name); };
					    	httpRequest.open('GET', url);
					    	httpRequest.send();
					  	}
					  	function setHotels(string){
						  	locationdata=(JSON.parse(string)).results;
						  	displayData();
					  	}
					  	function setCity(string){
						  	locationdata=(JSON.parse(string)).results;
				    	  	console.log(locationdata);
				    	  	var size = locationdata.length;
						  	for(var i=0;i<size;i++)
						  	{
								  
							  	if(locationdata[i].types[0]==="locality")
							  	{
								  	city=locationdata[i].formatted_address;
								  	console.log("CITY: "+city);
								  	document.getElementById("city_id").innerHTML="";
								  	document.getElementById("city_id").innerHTML+="City: "+city+"<br>";
								  	
								  	
							  	}
						  	}
					  	}
					  	function alertContents(function_name) {
					    	if (httpRequest.readyState === XMLHttpRequest.DONE) {
					      		if (httpRequest.status === 200) {
					    	  		function_name(httpRequest.responseText);
					      		} else {
					        		alert('There was a problem with the request.');
					      		}
					    	}
					  	}
					  	
					  	function displayData()
					  	{
						  	var size=iconMarkers.length;
						  	for(var i=0;i<size;i++)
						  	{
							  	iconMarkers[i].setMap(null);
						  	}
						  	iconMarkers=[];
						  	var size = locationdata.length;
						  	for(var i=0;i<size;i++)
						  	{
							  	var size2 = locationdata[i].types.length;
							  	for(var s=0;s<size2;s++)
							  	{
								  	if(locationdata[i].types[s]==="lodging")
								  	{
									  	iconMarkers.push(new google.maps.Marker({position: {lat: locationdata[i].geometry.location.lat, lng: locationdata[i].geometry.location.lng}, map: map, icon: pic_hotel}));
								  	}
								  	else if(locationdata[i].types[s]==="restaurant" || locationdata[i].types[s]==="bakery" || locationdata[i].types[s]==="bar" || locationdata[i].types[s]==="cafe" || locationdata[i].types[s]==="food")
								  	{
									  	iconMarkers.push(new google.maps.Marker({position: {lat: locationdata[i].geometry.location.lat, lng: locationdata[i].geometry.location.lng}, map: map, icon: pic_restaurant}));
								  	}
							  	}
						  	}
							//document.getElementById("kek").innerHTML="";
						  	//document.getElementById("kek").innerHTML+="Type: "+(i+1)+": "+hotels[i].types[s]+"<br>";
					  	}
					  	function displayData()
					  	{
						  	var size=iconMarkers.length;
						  	for(var i=0;i<size;i++)
						  	{
								iconMarkers[i].setMap(null);
						  	}
						 	iconMarkers=[];
						 	var size = locationdata.length;
						 	for(var i=0;i<size;i++)
						  	{
							  	var size2 = locationdata[i].types.length;
							  	for(var s=0;s<size2;s++)
							  	{
								  	if(locationdata[i].types[s]==="lodging")
								  	{
									  	iconMarkers.push(new google.maps.Marker({position: {lat: locationdata[i].geometry.location.lat(), lng: locationdata[i].geometry.location.lng()}, map: map, icon: pic_hotel}));
								  	}
								  	else if(locationdata[i].types[s]==="restaurant" || locationdata[i].types[s]==="bakery" || locationdata[i].types[s]==="bar" || locationdata[i].types[s]==="cafe" || locationdata[i].types[s]==="food")
								  	{
									  	iconMarkers.push(new google.maps.Marker({position: {lat: locationdata[i].geometry.location.lat(), lng: locationdata[i].geometry.location.lng()}, map: map, icon: pic_restaurant}));
								    }
							    }
						    }
					    }
					    var marker;
					    var map;
					    var service;
					      function initMap() {
					        var anoka = {lat: 45.22458150431289, lng: -93.38194370269775};
					        map = new google.maps.Map(document.getElementById('map'), {
					          zoom: 4,
					          center: anoka
					        });
					        marker = new google.maps.Marker({
				            	position: anoka,
				            	map: map,
				            	icon: pic_default
					        });
					        service = new google.maps.places.PlacesService(map);
					        
					        if (navigator.geolocation) {
					        	navigator.geolocation.getCurrentPosition(function(position) {
					            	var pos = {
					              		lat: position.coords.latitude,
					              		lng: position.coords.longitude
					            	};
					                marker.setMap(null);
				            	    marker = new google.maps.Marker({position: pos, map: map,icon: pic_default});
					                map.setCenter(pos);
					            }, function() {
					            	handleLocationError(true, infoWindow, map.getCenter());
					            });
					        } else {
					            // Browser doesn't support Geolocation
					        	handleLocationError(false, infoWindow, map.getCenter());
					        }
					        google.maps.event.addListener(map, 'click', function(event) {
					            //marker = new google.maps.Marker({position: event.latLng, map: map});
					        });
					        google.maps.event.addListener(
				        		map,
				        		'click',
				        		function(event)
				        		{
				        			marker.setMap(null);
				            		marker = new google.maps.Marker({position: event.latLng, map: map, icon: pic_default});
				            		anoka=event.latLng;
				            		map.setCenter(anoka);
				            		makeRequest("https://maps.googleapis.com/maps/api/geocode/json?latlng="+marker.getPosition().lat()+","+marker.getPosition().lng()+"&key=AIzaSyDFnRgp5wG3WNEKiLZg8Cjk5vjSyvL86_8",setCity);
				            		var request = {
				            			    location: event.latLng,
				            			    radius: '500',
				            			    query: 'restaurant'
				            			  };
				            		service.textSearch(request, callback);
				            		console.log("Lattitude: "+marker.getPosition().lat()+", Longitude: "+marker.getPosition().lng());
				        		}
					        );
					        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
					        }
					    }
					      function callback(results, status) {
					    	  console.log(results);
					    	  if (status == google.maps.places.PlacesServiceStatus.OK) {
					    	    for (var i = 0; i < results.length; i++) {
					    	      var place = results[i];
					    	      locationdata=results;
					    	      displayData();
					    	    }
					    	  }
					    	}
					    </script>
					</div>
				    <div class="col-1" style="width: 20%; margin-left: 35px; float: left;">
				    <div class="container">
				    	<ul>
						    <li class="dropdown">
						      	<a href="#" data-toggle="dropdown">Location<i class="icon-arrow"></i></a>
						      	<ul class="dropdown-menu">
						        	<li><a href="#">Home</a></li>
						        	<li><a href="#">About Us</a></li>
						        	<li><a href="#">Services</a></li>
						        	<li><a href="#">Contact</a></li>
						      	</ul>
						    </li>
						    <li class="dropdown">
						      	<a href="#" data-toggle="dropdown">Flight<i class="icon-arrow"></i></a>
						      	<ul class="dropdown-menu">
							        <li><a href="#">Home</a></li>
							        <li><a href="#">About Us</a></li>
							        <li><a href="#">Services</a></li>
							        <li><a href="#">Contact</a></li>
						      	</ul>
						    </li>
						    <li class="dropdown">
						      	<a href="#" data-toggle="dropdown">Hotel<i class="icon-arrow"></i></a>
						      	<ul class="dropdown-menu">
							        <li><a href="#">Home</a></li>
							        <li><a href="#">About Us</a></li>
							        <li><a href="#">Services</a></li>
							        <li><a href="#">Contact</a></li>
						      	</ul>
						    </li>
						    <li class="dropdown">
						      	<a href="#" data-toggle="dropdown">Rental Car<i class="icon-arrow"></i></a>
						      	<ul class="dropdown-menu">
							        <li><a href="#">Home</a></li>
							        <li><a href="#">About Us</a></li>
							        <li><a href="#">Services</a></li>
							        <li><a href="#">Contact</a></li>
						      	</ul>
						    </li>
						    <li class="dropdown">
						      	<a href="#" data-toggle="dropdown">Restaurants<i class="icon-arrow"></i></a>
						      	<ul class="dropdown-menu">
							        <li><a href="#">Home</a></li>
							        <li><a href="#">About Us</a></li>
							        <li><a href="#">Services</a></li>
							        <li><a href="#">Contact</a></li>
						      	</ul>
						    </li>
						    <li class="dropdown">
						      	<a href="#" data-toggle="dropdown">Entertainment<i class="icon-arrow"></i></a>
						      	<ul class="dropdown-menu">
							        <li><a href="#">Home</a></li>
							        <li><a href="#">About Us</a></li>
							        <li><a href="#">Services</a></li>
							        <li><a href="#">Contact</a></li>
						      	</ul>
						    </li>
					  	</ul>
				    	<p id ="city_id"></p>
				    	</div>
				    </div>
				    <script>
					    var dropdown = document.querySelectorAll('.dropdown');
					    var dropdownArray = Array.prototype.slice.call(dropdown,0);
					    dropdownArray.forEach(function(el){
					    	var button = el.querySelector('a[data-toggle="dropdown"]'),
					    			menu = el.querySelector('.dropdown-menu'),
					    			arrow = button.querySelector('i.icon-arrow');
					
					    	button.onclick = function(event) {
					    		if(!menu.hasClass('show')) {
					    			menu.classList.add('show');
					    			menu.classList.remove('hide');
					    			arrow.classList.add('open');
					    			arrow.classList.remove('close');
					    			event.preventDefault();
					    		}
					    		else {
					    			menu.classList.remove('show');
					    			menu.classList.add('hide');
					    			arrow.classList.remove('open');
					    			arrow.classList.add('close');
					    			event.preventDefault();
					    		}
					    	};
					    })
					
					    Element.prototype.hasClass = function(className) {
					        return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
					    };
				    </script>
			    </div>
                <h2 style="font-size: 210%"></h2>
                <p style="font-size: 150%"></p>
                <p style="font-size: 150%">Map^^</p>
                <p style="font-size: 110%">Moo Moo Travel was created by Team A: Sam Scheidecker and Riley Sumner</p>
                <p style="font-size: 110%">Anoka's BPA Chapter Number 30-0005</p>
             </div>
         </div>
    </body>
</html>