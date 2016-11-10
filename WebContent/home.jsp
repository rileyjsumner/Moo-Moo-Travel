<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- Search: AIzaSyDFnRgp5wG3WNEKiLZg8Cjk5vjSyvL86_8 
	 Map: AIzaSyCRjhH9N48NhWnwxBlX6Jii4a7DFp4NJ8o-->
<html>
    <head>
        <title>Home</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel = "stylesheet" href = "main.css">
        <script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src = "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    </head>
    <style>
	 #map {
	   margin-left: 2px;
	   width:100%;
	   height: 400px;
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
	    width: 49%;
	}
	</style>
    <body>
        ${data}
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
                <div class="col-1" style="width: 45%; margin-left: 35px; float: left;">
                	<div id="map"></div>
					<script type="text/javascript">
					(function() {
					  var httpRequest;
					
					  function makeRequest(url) {
					    httpRequest = new XMLHttpRequest();
						
					    if (!httpRequest) {
					      alert('Giving up :( Cannot create an XMLHTTP instance');
					      return false;
					    }
					    httpRequest.onreadystatechange = alertContents;
					    httpRequest.open('GET', url);
					    httpRequest.send();
					  }
					
					  function alertContents() {
					    if (httpRequest.readyState === XMLHttpRequest.DONE) {
					      if (httpRequest.status === 200) {
					        alert(httpRequest.responseText);
					      } else {
					        alert('There was a problem with the request.');
					      }
					    }
					  }
					})();
					</script>
					    <script>
					    var marker;
					      function initMap() {
					        var anoka = {lat: 45.22458150431289, lng: -93.38194370269775};
					        var map = new google.maps.Map(document.getElementById('map'), {
					          zoom: 4,
					          center: anoka
					        });
					        marker = new google.maps.Marker({
					          position: anoka,
					          map: map
					        });
					        if (navigator.geolocation) {
					            navigator.geolocation.getCurrentPosition(function(position) {
					              var pos = {
					                lat: position.coords.latitude,
					                lng: position.coords.longitude
					              };
					              marker.setMap(null);
				            	  marker = new google.maps.Marker({position: pos, map: map});
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
				            		marker = new google.maps.Marker({position: event.latLng, map: map});
				            		anoka=event.latLng;
				            		map.setCenter(anoka);
				            		makeRequest("Getdata?lat="+marker.getPosition().lat()+"&lng="+marker.getPosition().lng());
				            		console.log("Lattitude: "+marker.getPosition().lat()+", Longitude: "+marker.getPosition().lng());
				            		console.log($.get("Getdata?lat="+marker.getPosition().lat()+"&lng="+marker.getPosition().lng()));
				            		
				        		}
					        );
					        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
					         }
					      }
					    </script>
					    <script async defer
					    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCRjhH9N48NhWnwxBlX6Jii4a7DFp4NJ8o&callback=initMap">
					    </script>
					</div>
					    <div class="col-1" style="width: 45%; margin-left: 35px; float: left;">
					    	<p>kek</p>
					    </div>
					    </div>
                    <h2 style="font-size: 210%"></h2>
                    <p style="font-size: 150%"></p>
                    <p style="font-size: 150%">Map^^</p>
                    <p style="font-size: 110%">Moo Moo Travel was created by Team A: Sam Scheidecker and Riley Sumner</p>
                    <p style="font-size: 110%">Anoka's BPA Chapter Number 30-0005</p>
                </div>
            </div>
        </div>
        
    </body>
</html>