<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- Search: AIzaSyDFnRgp5wG3WNEKiLZg8Cjk5vjSyvL86_8 
	 Map: AIzaSyCRjhH9N48NhWnwxBlX6Jii4a7DFp4NJ8o-->
<html>
    <head>
        <title>Home</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel = "stylesheet" href = "dropdown.css" type = "text/css">
        <script src = "cookies.js"></script>
        <!--<script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>-->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
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
						var pic_park = 'pics/forestgump.png'
					  	var httpRequest;
						var eventdata=[];
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
					  	
					  	function displayData(type)
					  	{
					  		console.log("displayData("+type+")");
					  		var seticon;
					  		if (type==="restaurants")
					  		{
					  			seticon=pic_restaurant;
					  		}
					  		else if (type==="hotels")
					  		{
					  			seticon=pic_hotel;
					  		}
					  		else if (type==="parks")
					  		{
					  			seticon=pic_park;
					  		}
					  		else{
					  			console.log("TYPE NOT FOUND! TYPE NOT FOUND! TYPE=\""+type+"\".")
					  		}
					  		console.log("ICON=\""+seticon+"\"");
					  		if(iconMarkers[type]==null){
					  			iconMarkers[type]=[];
					  		}
						  	var size=iconMarkers[type].length;
						  	for(var i=0;i<size;i++)
						  	{
							  	iconMarkers[type][i].setMap(null);
						  	}
						  	iconMarkers[type]=[];
						  	if(eventdata[type]==null)
						  	{
						  		eventdata[type]=[];
					  		}
						  	size = eventdata[type].length;
						  	for(var i=0;i<size;i++)
						  	{
						  		console.log("ICON: type="+type);
								iconMarkers[type].push(new google.maps.Marker({position: {lat: eventdata[type][i].geometry.location.lat(), lng: eventdata[type][i].geometry.location.lng()}, map: map, icon: seticon}));
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
				            		makeRequest("Getdata?action=city&lat="+marker.getPosition().lat()+"&lng="+marker.getPosition().lng(),setCity);
				            		var request = {location: event.latLng,radius: '1500',type: 'restaurant'};
				            		console.log("Called Restaurants");
				            		service.radarSearch(request, callback_restaurants);
				            		request = {location: event.latLng,radius: '1500',type: 'lodging'};
				            		console.log("Called Lodging");
				            		service.radarSearch(request, callback_hotels);
				            		request = {location: event.latLng,radius: '1500',type: 'park'};
				            		console.log("Called Parks");
				            		service.radarSearch(request, callback_parks);
				            		
				            		console.log("Lattitude: "+marker.getPosition().lat()+", Longitude: "+marker.getPosition().lng());
				        		}
					        );
					        function handleLocationError(browserHasGeolocation, infoWindow, pos) {}
					    }
					    
					    function callback_parks(results,status)
					    {
					    	console.log("Callback: PARKS");
					    	callback(results,status,"parks");
					    }
					    function callback_restaurants(results,status)
					    {
					    	console.log("Callback: RESTAURANTS");
					    	callback(results,status,"restaurants");
					    }
					    function callback_hotels(results,status)
					    {
					    	console.log("Callback: HOTELS");
					    	callback(results,status,"hotels");
					    }
					    
						function callback(results, status, type) {
							console.log("CALLBACK")
					    	console.log(type);
					    	console.log(results);
					    	if (status == google.maps.places.PlacesServiceStatus.OK) {
				    			eventdata[type]=results;
				    			displayData(type);
					    	}
						}
					    </script>
					</div>
				    <div class="col-1" style="width: 20%; margin-left: 35px; float: left;">

				    <script>
				 // Dropdown Menu
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
				    };</script>
				    <div class="container">
						  <h1 class="title">Dropdown Menu</h1>
						  <ul>
						    <li class="dropdown">
						      <a href="#" data-toggle="dropdown">First Menu <i class="icon-arrow"></i></a>
						      <ul class="dropdown-menu">
						        <li><a href="#">Home</a></li>
						        <li><a href="#">About Us</a></li>
						        <li><a href="#">Services</a></li>
						        <li><a href="#">Contact</a></li>
								</ul>
							</ul>
				    <div class="hh_drop_down">
						<ul class="hh_main">
						
						   <li class="hh_main_menu">
						    <a href="javascript:void(0);" class="hh_sf">Flights</a>
						     <ul class="hh_inner">
						        <li><a href="#">MSP -> CHG</a></li>
						    </ul>
						  </li>
						
						  <li  class="hh_main_menu" >
						    <a class="hh_sf" href="#">Hotels</a>
						      <ul class="hh_inner">
						        <li><a href="#">Sheraton Hotel</a></li>
						     </ul>
						
						  </li>
						
						   <li  class="hh_main_menu" >
						     <a class="hh_sf" href="#">Rental Cars</a>
						      <ul class="hh_inner">
						          <li><a href="#">Enterprise</a></li>
						      </ul>
						   </li>
						   <li  class="hh_main_menu" >
						     <a class="hh_sf" href="#">Restaurants</a>
						      <ul class="hh_inner">
						          <li><a href="#">Trump Steaks</a></li>
						      </ul>
						   </li>
						   <li  class="hh_main_menu" >
						     <a class="hh_sf" href="#">Entertainment</a>
						      <ul class="hh_inner">
						          <li><a href="#">Parks</a></li>
						      </ul>
						   </li>
						
						</ul>
					</div>
			<script>
			$(".hh_sf").next().addClass("collapsed").slideUp();
			
			$(".hh_main").on('click', '.hh_sf', function (event) {
			            event.preventDefault();
			            var currentClass = $(this).next().prop('class');
			            if (currentClass == "hh_inner expanded") {
			                $(this).next().removeClass("expanded");
			                $(this).next().addClass("collapsed");
			                $(this).next().slideUp();
			            } else {
			                $(".expanded").slideUp().addClass("collapsed").removeClass("expanded");
			
			                $(this).next().removeClass("collapsed");
			                $(this).next().addClass("expanded");
			                $(this).next().slideDown();
			            }
			
			        });
			</script>
			<p id="city_id"></p>    
			</div>
			</div>
			<div class="row">
				<div class="col-1" style="width: 90%; margin-left: 35px;">
                <h2 style="font-size: 210%"></h2>
                <p style="font-size: 110%">Moo Moo Travel was created by Team A: Sam Scheidecker and Riley Sumner</p>
                <p style="font-size: 110%">Anoka's BPA Chapter Number 30-0005</p>
             </div>
         </div>
         </div>
    	</div>
    	</div>
    </body>
</html>