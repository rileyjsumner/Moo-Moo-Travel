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
	   width: 100%;
	   height: 400px;
	   background-color: grey;
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
                <div class ="text-center">
                	
                	<div id="map"></div>
					    <script>
					    var marker;
					      function initMap() {
					        var anoka = {lat: 0, lng: 0};
					        var map = new google.maps.Map(document.getElementById('map'), {
					          zoom: 4,
					          center: anoka
					        });
					        marker = new google.maps.Marker({
					          position: anoka,
					          map: map
					        });
					        
					        google.maps.event.addListener(map, 'click', function(event) {
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
				            		console.log("Lattitude: "+marker.getPosition().lat()+", Longitude: "+marker.getPosition().lng());
				        		}
					        );
					      }
					    </script>
					    <script async defer
					    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCRjhH9N48NhWnwxBlX6Jii4a7DFp4NJ8o&callback=initMap">
					    </script>
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