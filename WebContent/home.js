function makeRequest(url,function_name) {
	console.log("MADE REQ:"+url)
	$.getJSON(url,function_name)
}
function makePostRequest(url,data,function_name) {
	$.post(url,data).done(function_name);
}
function clearHotels(){
	selected_hotel="";
	$("#hotels_anchor").children().remove();
	if(iconMarkers["hotels"] != null){
		for(var i=0;i<iconMarkers["hotels"].length;i++){
			iconMarkers["hotels"][i].setMap(null);
		}
		eventdata["hotels"]=[];
		iconMarkers["hotels"]=[];
	}
}
function clearRestaurants(){
	$("#restaurants_anchor").children().remove();
	for(var i=0;i<iconMarkers["hotels"];i++){
		iconMarkers["restaurants"][i].setMap(null);
	}
}
function clearEnts(){
	$("#ents_anchor").children().remove();
	for(var i=0;i<iconMarkers["hotels"];i++){
		iconMarkers["ents"][i].setMap(null);
	}
}
function clearCars(){
	$("#cars_anchor").children().remove();
	for(var i=0;i<iconMarkers["hotels"];i++){
		iconMarkers["cars"][i].setMap(null);
	}
}
function hideSpecific(string){
	if(string=="hotel"){
		hideHotels();
	}
	else if(string=="car"){
		hideCars();
	}
	else if(string=="restaurant"){
		hideCars();
	}
	else if(string=="entertainment"){
		hideEnts();
	}
}
function showType(type){
	if(iconMarkers[type] != null){
		for(var i=0;i<iconMarkers[type].length;i++){
			iconMarkers[type][i].setMap(map);
		}
	}
}
function hideType(type,selected_elem){
	if(selected_elem ==="" || selected_elem === null){selected_elem= -1}
	if(iconMarkers[type] != null){
		for(var i=0;i<iconMarkers[type].length;i++){
			if(i != selected_elem){
				iconMarkers[type][i].setMap(null);
			}
		}
	}
}
function selectRestaurant(restaurant_number){
	$("#restaurants_anchor").children().each(function()
	{
		if($(this).attr("id")=="restaurant_"+restaurant_number)
		{
			// Select the hotel
			selected_restaurant=restaurant_number;
			selectRestaurantIcon(restaurant_number)
			$(this).addClass("elem_selected")
			$(this).removeClass("elem_selectable")
			// Slide down the details
			$(this).children(".detail_lower").slideDown(400);
		}
		else
		{
			//$(this).removeClass("elem_selected");
			$(this).addClass("elem_selectable")
			$(this).children(".detail_lower").slideUp(400);
		}
	});
}
function selectEntertainment(entertainment_number){
	$("#entertainments_anchor").children().each(function()
	{
		if($(this).attr("id")=="entertainment_"+entertainment_number)
		{
			// Select the hotel
			selected_entertainment=entertainment_number;
			selectEntertainmentIcon(entertainment_number)
			$(this).addClass("elem_selected")
			$(this).removeClass("elem_selectable")
			// Slide down the details
			$(this).children(".detail_lower").slideDown(400);
		}
		else
		{
			//$(this).removeClass("elem_selected");
			$(this).addClass("elem_selectable")
			$(this).children(".detail_lower").slideUp(400);
		}
	});
}
function selectCar(car_number){
	$("#cars_anchor").children().each(function()
	{
		if($(this).attr("id")=="cars_"+car_number)
		{
			// Select the hotel
			selected_car=car_number;
			selectIcon(car_number,"cars",pic_car_selected,pic_car)
			$(this).addClass("elem_selected")
			$(this).removeClass("elem_selectable")
			// Slide down the details
			$(this).children(".detail_lower").slideDown(400);
		}
		else
		{
			$(this).removeClass("elem_selected");
			$(this).addClass("elem_selectable")
			$(this).children(".detail_lower").slideUp(400);
		}
	});
}
function selectEntertainment(entertainment_number){
	$("#entertainments_anchor").children().each(function()
	{
		
		if($(this).attr("id")=="entertainments_"+entertainment_number)
		{
			// Select the hotel
			selected_entertainment=entertainment_number;
			selectEntertainmentIcon(entertainment_number)
			$(this).addClass("elem_selected")
			$(this).removeClass("elem_selectable")
			// Slide down the details
			$(this).children(".detail_lower").slideDown(400);
		}
		else
		{
			//$(this).removeClass("elem_selected");
			$(this).addClass("elem_selectable")
			$(this).children(".detail_lower").slideUp(400);
		}
	});
}
function selectEntertainmentIcon(number){
	if(iconMarkers["entertainment"] != null && iconMarkers["entertainment"].constructor === Array){
		if(number ==="" || number === null){number= -1}
		for(var i=0;i<iconMarkers["entertainment"].length;i++){
			var stars = Math.round(eventdata["entertainment"][i].rating||0)
			if(i==number){
				iconMarkers["entertainment"][i].setIcon(pic_entertainment_selected);
			}
			else{
				//iconMarkers["entertainment"][i].setIcon(getHotelPic(stars,false));
			}
		}
	}
}
function selectHotel(hotel_number){
	selectHotelIcon(hotel_number);
	$("#hotels_anchor").children().each(function()
	{
		if($(this).attr("id")=="hotel_"+hotel_number)
		{
			// Select the hotel
			selected_hotel=hotel_number;
			$(this).addClass("elem_selected")
			$(this).removeClass("elem_selectable")
			// Slide down the details
			$(this).children(".detail_lower").slideDown(400);
		}
		else
		{
			$(this).removeClass("elem_selected");
			$(this).addClass("elem_selectable")
			$(this).children(".detail_lower").slideUp(400);
		}
	});
}
function selectHotelIcon(number){
	if(iconMarkers["hotels"] != null && iconMarkers["hotels"].constructor === Array){
		if(number ==="" || number === null){number= -1}
		for(var i=0;i<iconMarkers["hotels"].length;i++){
			var stars = Math.round(eventdata["hotels"][i].rating||0)
			if(i==number){
				iconMarkers["hotels"][i].setIcon(getHotelPic(stars,true));
			}
			else{
				iconMarkers["hotels"][i].setIcon(getHotelPic(stars,false));
			}
		}
	}
}
function selectIcon(number,type,icon_sel,icon_desel){
	if(iconMarkers[type] != null && iconMarkers[type].constructor === Array){
		if(number ==="" || number === null){number= -1}
		for(var i=0;i<iconMarkers[type].length;i++){
			if(i==number){
				iconMarkers[type][i].setIcon(icon_sel);
			}
			else if(iconMarkers[type][i].icon != icon_desel){
				iconMarkers[type][i].setIcon(icon_desel);
			}
		}
	}
}
function selectRestaurantIcon(number){
	if(iconMarkers["restaurants"] != null && iconMarkers["restaurants"].constructor === Array){
		if(number ==="" || number === null){number= -1}
		for(var i=0;i<iconMarkers["restaurants"].length;i++){
			var stars = Math.round(eventdata["restaurants"][i].rating||0)
			if(i==number){
				iconMarkers["restaurants"][i].setIcon(pic_restaurant_selected);
			}
			else{
				//iconMarkers["restaurants"][i].setIcon(getHotelPic(stars,false));
			}
		}
	}
}
function selectEntertainmentIcon(number){
	if(iconMarkers["entertainment"] != null && iconMarkers["entertainment"].constructor === Array){
		if(number ==="" || number === null){number= -1}
		for(var i=0;i<iconMarkers["entertainment"].length;i++){
			var stars = Math.round(eventdata["entertainment"][i].rating||0)
			if(i==number){
				iconMarkers["entertainment"][i].setIcon(pic_entertainment_selected);
			}
			else{
				//iconMarkers["entertainment"][i].setIcon(getHotelPic(stars,false));
			}
		}
	}
}
function clearOthers(){
  	$("#hotels_search_waiting").removeClass("fa-refresh");
  	$("#hotels_search_notfound").removeClass("search_notfound");
	clearHotels()
	clearRestaurants()
	clearEnts()
	clearCars()
}
function setFlights(json){
	$("#flights_search_waiting").removeClass("fa-refresh");
	if(json.kind==="empty"){
		$("#flights_search_notfound").addClass("search_notfound");
		clearFlights();
		return;
	}
	flights_carriers=new Map();
	flights_airplanes=new Map();
	// Add carriers and airplanes to easy to access maps
	for(var i=0;i<json.trips.data.carrier.length;i++){
		flights_carriers.set(json.trips.data.carrier[i].code,json.trips.data.carrier[i].name);
	}
	for(var i=0;i<json.trips.data.aircraft.length;i++){
		flights_airplanes.set(json.trips.data.aircraft[i].code,json.trips.data.aircraft[i].name);
	}
	flights_trips = json.trips.tripOption;
	displayFlights();
}
function setRestaurants(string){
}
function setHotels(string){
	locationdata=(JSON.parse(string)).results;
}
function setOrigin(json){
	if(json["found"]=="1")
	{
		originLat=Number(json["lat"]);
		originLng=Number(json["lng"]);
		originCC=json["country"];
		originCode=json["code"];
		originSize=Number(json["size"]);
		originName=json["name"];
		origin.setMap(null);
	    origin = new google.maps.Marker({position: {lat: originLat, lng: originLng}, map: map,icon: pic_origin});
		$("#value_flight_origin").text(originName+", "+originCC+" ("+originCode+")");
		findNextGlobalState();
	}
	else{
		originLat=null;
		originLng=null;
		originCC=null;
		originCode=null;
		originSize=null;
		originName=null;
		findNextGlobalState();
	}
}
function setDestination(json){
	if(json["found"]=="1")
	{
		destinationLat=Number(json["lat"]);
		destinationLng=Number(json["lng"]);
		destinationCC=json["country"];
		destinationCode=json["code"];
		destinationSize=Number(json["size"]);
		destinationName=json["name"];
		if(destinationSet){
			destination.setMap(null);
		}
		destination = new google.maps.Marker({position: {lat: destinationLat, lng: destinationLng}, map: map,icon: pic_destination});
		destinationSet=true;
		$("#value_flight_destination").text(destinationName+", "+destinationCC+" ("+destinationCode+")");
		findNextGlobalState();
	}
	else{
		destinationLat=null;
		destinationLng=null;
		destinationCC=null;
		destinationCode=null;
		destinationSize=null;
		destinationName=null;
		findNextGlobalState();
	}
}
function updateVac(){
	clearOthers()
	if(vacLat != "" && vacLng != "" && vacName != "")
	{
		$("#value_vac_location").text(vacName);
		if(vacIsSet){
			vac.setMap(null);
		}
		vac = new google.maps.Marker({position: {lat: vacLat, lng: vacLng}, map: map,icon: pic_origin});
		vacIsSet=true;
	}
	else{
		$("#value_vac_location").text(vacName);
		if(vacIsSet){
			vac.setMap(null);
		}
	}
}
function setVac(json){
	vacConfirm=false;
	if(json.status=="ZERO_RESULTS")
	{
		vacName="unknown";
	}
	else
	{
		vacName="unknown";
		// Look for the Major city
		for(i=0;i<json.results.length;i++)
		{
			// We found the city!
			if(json.results[i].types[0]=="political")
			{
				vacName=json.results[i].formatted_address;
				break;
			}
		}
		// Keep searching if we haven't found it
		if(vacName=="unknown")
		{
			// Look for the County
			for(i=0;i<json.results.length;i++)
			{
				// We found the city!
				if(json.results[i].types[0]=="administrative_area_level_2")
				{
					vacName=json.results[i].formatted_address;
					break;
				}
			}
			// Keep searching
			if(vacName=="unknown")
			{
				// Look for the County
				for(i=0;i<json.results.length;i++)
				{
					// We found something!
					if(json.results[i].types[0]=="administrative_area_level_3")
					{
						vacName=json.results[i].formatted_address;
						break;
					}
				}
				if(vacName=="unknown")
				{
					// Look for the County
					for(i=0;i<json.results.length;i++)
					{
						// We found something!
						if(json.results[i].types[0]=="locality" || json.results[i].types[0]=="postal_code" || json.results[i].types[0]=="administrative_area_level_1")
						{
							vacName=json.results[i].formatted_address;
							break;
						}
					}
					if(vacName=="unknown")
					{
						// YIKES
						vacName=json.results[0].formatted_address;
					}
				}
			}
		}
	}
	updateVac();
	findNextGlobalState();
	/*
	if(json["status"]=="OK")
	{
		vacLat=Number(json["results"]["0"]["geometry"]["location"]["lat"]);
		vacLng=Number(json["results"]["0"]["geometry"]["location"]["lng"]);
		vacCC=json["results"]["0"]["address_components"]["2"]["long_name"];
		vacName=json["results"]["0"]["address_components"]["1"]["long_name"];
		
		if(vacIsSet) {
			vac.setMap(null);
		}
		vac = new google.maps.Marker({position: {lat: vacLat, lng: vacLng}, map: map,icon: pic_origin});
		
		vacIsSet=true;
		
		$("#value_vac_location").text(vacName+", "+vacCC);
		findNextGlobalState();
	}
	else{
		vacLat=null;
		vacLng=null;
		vacCC=null;
		vacCode=null;
		vacSize=null;
		vacName=null;
		findNextGlobalState();
	}
	*/
}
function findNextGlobalState(){
	var disableUntil_val="flight";
	canSearchFlights=false;
	canSearchOther=false;
	if(originName!=="" && originCC!=="" && originLat!==0 && originLng!==0)
	{
		if(originConfirm)
		{
			$("#flight_line_destination").slideDown();
			setButtonStateReject("flight_origin");
			if(destinationName!=="" && destinationCC!=="" && destinationLat!==0 && destinationLng!==0)
  		{
				if(destinationConfirm)
				{
					$("#flight_line_departure_date").slideDown();
					setButtonStateReject("flight_destination");
					if(date instanceof Date && date.getFullYear() <= today.getFullYear()+10 && date >= today)
					{
						$("#flight_line_return_date").slideDown();
						if(date_return instanceof Date  && date_return.getFullYear() <= today.getFullYear()+10 && date_return >= today && date_return>date)
						{
							// FLIGHTS
							disableUntil_val="vacation";
							$("#flight_line_passengers").slideDown();
							$("#flight_line_flights").slideDown();
							canSearchFlights=true;
							// VACATION LOCATION SELECTION IF WE ARE ON THE VACATION TAB
							if(isVacCustom){
								$("#vacation_line_location").slideDown();
								if(curMenu=="vacation_menu"){
									if(vacLat != "" && vacLng !="")
									{
										if(vacConfirm) {
											globalState="complete";
											disableUntil_val="entertainment";
											setButtonStateReject("vac_location");
										}
										else{
											globalState="confirmVac";
											setButtonStateConfirm("vac_location");
										}
									}
									// The Vac Loc isn't set
									else
									{
										globalState="needVacLocation";
										setButtonStateInput("vac_location");
									}
								}
								// If the vacLoc is set anyway
								else if(vacLat != "" && vacLng !="" && vacConfirm){
									globalState="complete";
									disableUntil_val="entertainment";
								}
								//They just haven't gotten to this yet
								else{
									globalState="waitingForHotelMenu";
								}
							}
							// They are just using the airport
							else{
								$("#vacation_line_location").slideUp();
								vacLat=destinationLat;
								vacLng=destinationLng;
								vacName=destinationName+", "+destinationCC;
								globalState="complete";
								disableUntil_val="entertainment";
							}
						}
						else
						{
							globalState="needReturnDate";
							disableUntil("flight");
							$("#flight_line_passengers").slideUp();
							$("#flight_line_flights").slideUp();
						}
					}
					else
					{
						globalState="needDate";
						$("#flight_line_return_date").slideUp();
						$("#flight_line_passengers").slideUp();
						$("#flight_line_flights").slideUp();
					}
				}
				else{
  				globalState="confirmDestination";
					$("#flight_line_return_date").slideUp();
					$("#flight_line_departure_date").slideUp();
					$("#flight_line_passengers").slideUp();
					$("#flight_line_flights").slideUp();
					setButtonStateConfirm("flight_destination");
				}
  		}
			else
			{
				globalState="needDestination";
				$("#flight_line_return_date").slideUp();
				$("#flight_line_departure_date").slideUp();
				$("#flight_line_passengers").slideUp();
				$("#flight_line_flights").slideUp();
				setButtonStateInput("flight_destination");
			}
		}
		else
		{
			globalState="confirmOrigin";
			$("#flight_line_destination").slideUp();
			$("#flight_line_return_date").slideUp();
			$("#flight_line_departure_date").slideUp();
			$("#flight_line_passengers").slideUp();
			$("#flight_line_flights").slideUp();
			setButtonStateConfirm("flight_origin");
		}
	}
	else
	{
		globalState="needOrigin";
		$("#flight_line_destination").slideUp();
		$("#flight_line_return_date").slideUp();
		$("#flight_line_departure_date").slideUp();
		$("#flight_line_passengers").slideUp();
		$("#flight_line_flights").slideUp();
		setButtonStateInput("flight_origin");
	} 
	disableUntil(disableUntil_val);
}
function alertContents(function_name) {
	if (httpRequest.readyState === XMLHttpRequest.DONE)
	{
		if (httpRequest.status === 200)
		{
			console.log("GOT : \""+httpRequest.responseText+"\"");
			var tempString= JSON.parse(httpRequest.responseText);
			function_name(tempString);
		}
		else
		{
  		alert('There was a problem with the request.');
		}
	}
}
function displayData(type){
	console.log("DisplayData:\""+type+"\"");
	var seticon;
	map.setCenter({lat:vacLat,lng:vacLng});
	if (type==="restaurants")
	{
		seticon=pic_restaurant;
		displayRestaurants();
	}
	else if (type==="hotels")
	{
		seticon=null;
		displayHotels();
	}
	else if (type==="cars") {
		seticon=pic_car;
		displayCars();
	}
	else{
		for(var i=0;i<entTypes.length;i++)
		{
			if (type==entTypes[i])
			{
				console.log("TYPE:: "+entTypes[i]);
				seticon=pic_ent[i];
				displayEnt();
				break;
			}
		}
	}
	
	
	
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
	var bounds = new google.maps.LatLngBounds();
	
	size = eventdata[type].length;
	for(var i=0;i<size;i++)
	{
		bounds.extend({lat:eventdata[type][i].geometry.location.lat(),lng:eventdata[type][i].geometry.location.lng()});
		iconMarkers[type].push(new google.maps.Marker({position: {lat: eventdata[type][i].geometry.location.lat(), lng: eventdata[type][i].geometry.location.lng()}, map: map, icon: seticon}));
		//Add the listeners
		if(type=="hotels"){
			(function (_id){
				iconMarkers["hotels"][_id].setIcon(getHotelPic(Math.round(eventdata["hotels"][i].rating || 0),false))
				iconMarkers["hotels"][_id].addListener('click', function() {
					selectHotel(_id);
					var elem_new = document.getElementById("hotel_"+_id)
					if(elem_new!=null){elem_new.scrollIntoView();}
				});
			})(i);
		} else if(type === "cars") {
			(function (_id){
				iconMarkers["cars"][_id].addListener('click', function() {
					selectCar(_id);
					var elem_new = document.getElementById("car_"+_id)
					if(elem_new!=null){elem_new.scrollIntoView();}
				});
			})(i);
		} else if(type === "restaurants") {
			(function (_id){
				iconMarkers["restaurants"][_id].addListener('click', function() {
					selectRestaurant(_id);
					var elem_new = document.getElementById("restaurant_"+_id)
					if(elem_new!=null){elem_new.scrollIntoView();}
				});
			})(i);
		} else if(type === "park") {
			(function (_id){
				iconMarkers["park"][_id].addListener('click', function() {
					selectEntertainment(_id);
					var elem_new = document.getElementById("entertainment_"+_id)
					if(elem_new!=null){elem_new.scrollIntoView();}
				});
			})(i);
		}  /*else
		{
			for(var i=0;i<entTypes.length;i++) {
				if (type==entTypes[i])
				{
					(function (_id){
						iconMarkers[entTypes[i]][_id].addListener('click', function() {
							selectEntertainment(_id);
							var elem_new = document.getElementById(entTypes[i]+_id)
							if(elem_new!=null){elem_new.scrollIntoView();}
						});
					})(i);
				}
			}
		}*/
	}
	
	map.fitBounds(bounds);
}
function initMap() {
    var anoka = {lat: 45.22458150431289, lng: -93.38194370269775};
    map = new google.maps.Map(document.getElementById('map'), {
    	zoom: 3,
    	center: anoka
    });
    origin = new google.maps.Marker({
  	position: anoka,
  	map: map,
  	icon: pic_origin
    });
    service = new google.maps.places.PlacesService(map);
    
    if (navigator.geolocation) {
  	setButtonStateWaiting("flight_origin");
  	navigator.geolocation.getCurrentPosition(function(position) {
      	var pos = {
        		lat: position.coords.latitude,
        		lng: position.coords.longitude
      	};
      	globalState="originCode";
      	makeRequest("Getdata?action=getairports&lat="+pos.lat+"&lng="+pos.lng,setOrigin);
        }, function()
        {
      	findNextGlobalState();
      	handleLocationError(true, infoWindow, map.getCenter());
        });
    } else
    {
  	findNextGlobalState();
    }
    google.maps.event.addListener(map,'click',function(event)
	{
  	console.log("Click @ "+event.latLng.lat()+","+event.latLng.lng());
		if(globalState==="needOrigin")
		{
			globalState="originCode";
			setButtonStateWaiting("flight_origin");
			makeRequest("Getdata?action=getairports&lat="+event.latLng.lat()+"&lng="+event.latLng.lng(),setOrigin);
		}
		else if(globalState==="needDestination")
		{
			globalState="destinationCode";
			setButtonStateWaiting("flight_destination");
			makeRequest("Getdata?action=getairports&lat="+event.latLng.lat()+"&lng="+event.latLng.lng(),setDestination);
		} else if(globalState==="needVacLocation") {
			vacConfirm=false;
			setButtonStateWaiting("vac_location");
			vacLat=event.latLng.lat();
			vacLng=event.latLng.lng();
			makeRequest("Getdata?action=getcity&lat="+event.latLng.lat()+"&lng="+event.latLng.lng(),setVac);
		}
	});
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {}
}
function callback_parks(results,status){
	console.log("Callback: PARKS");
	callback(results,status,"parks");
}
function callback_restaurants(results,status){
	console.log("Callback: RESTAURANTS");
	callback(results,status,"restaurants");
}
function callback_restaurant_detail(results,status,text){
	console.log("CALLBACK DETAILS: text="+text);
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		console.log(results);
	}
	console.log("STATUS: "+status);
}
function callback_hotels(results,status){
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		// Hotels found!
		eventdata["hotels"]=[];
		eventdata["hotels"]=results;
		$("#hotels_search_waiting").removeClass("fa-refresh");
		$("#hotels_search_notfound").removeClass("search_notfound");
		displayData("hotels");
	}
	else{
		// Hotels not found here
	  	$("#hotels_search_waiting").removeClass("fa-refresh");
	  	$("#hotels_search_notfound").addClass("search_notfound");
	}
}
function callback_cars(results,status){
	console.log("Callback: CARS");
	callback(results, status,"cars");
}
function callback_entertainment(type,results,status){
	console.log("Callback: ENTERTAINMENT");
	callback(results, status, "park");
}
function callback(results, status, type) {
	console.log("CALLBACK");
	console.log(type);
	console.log(results);
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		eventdata[type]=results;
		if(type === "restaurants") {
			displayData("restaurants");
		} else if(type === "cars") {
			displayData("cars");
		} else if(type === "park" ) {
			displayData("park");
		} else if(type==="park") {
			seticon=pic_park;
			displayEnt();
		}
		
	}
}
function wait(ms){
 	var start = new Date().getTime();
 	var end = start;
 	while(end < start + ms) {
   	end = new Date().getTime();
	}
}
//                                                                                              MENU MANIPULATION
function rotate(elem) {
	document.getElementById(elem).style.cssText = 'transform:rotate(90deg);'
}
function rotate_default(elem) {
	document.getElementById(elem).style.cssText = 'transform:rotate(0deg);'
}
function newRestaurant(text){ newElement(document.getElementById("restaurants_anchor"),text); }
function newFlight(text){newElement(document.getElementById("flights_anchor"),text);}
function newEntertainment(){ newElement(document.getElementById("entertainment_anchor"),text); }
function newCar(text){ newElement(document.getElementById("cars_anchor"),text); }
function newHotel(text){ newElement(document.getElementById("hotels_anchor"),text); }
function newElement(anchor,text){
	var newNumberListItem = document.createElement("li");
          //create new text node
    var numberListValue = document.createTextNode(text);
	//add text node to li element
    newNumberListItem.appendChild(numberListValue);
	
	newNumberListItem.className="latest_list_add";
	//add new list element built in previous steps to unordered list
    //called numberList
	anchor.appendChild(newNumberListItem);
	
    $("#"+anchor.id).children(".latest_list_add").slideUp(0).slideDown().removeClass("latest_list_add");
}
function expand_main_menu(clicked){
	var hh_inner;
	//Loop over every item on the main dropdown
	$("#dropdown_main_list").children(".hh_main_menu").each(function()
	{
		hh_inner=$(this).children(".hh_inner");
		
		//If this one was clicked
		if($(this).attr("id")==clicked)
		{
			if(hh_inner.hasClass("expanded"))
			{
				hh_inner.addClass("collapsed");
				hh_inner.removeClass("expanded");
				hh_inner.slideUp();
				rotate_default($(this).children(".hh_title").children(".careticon").attr("id"));
			}
			else
			{
				hh_inner.addClass("expanded");
				hh_inner.removeClass("collapsed");
				hh_inner.slideDown();
				rotate($(this).children(".hh_title").children(".careticon").attr("id"));
			}
		}
		else
		{
			hh_inner.addClass("collapsed");
			hh_inner.removeClass("expanded");
			hh_inner.slideUp();
			rotate_default($(this).children(".hh_title").children(".careticon").attr("id"));
		}
	});
}
function setButtonStateInput(id){
	makeButtonInvisible("confirm_"+id);
	makeButtonInput("reject_"+id);
}
function setButtonStateReject(id){
	makeButtonInvisible("confirm_"+id);
	makeButtonReject("reject_"+id);
}
function setButtonStateConfirm(id){
	makeButtonConfirm("confirm_"+id);
	makeButtonReject("reject_"+id);
}
function setButtonStateWaiting(id){
	makeButtonWaiting("confirm_"+id);
	makeButtonInvisible("reject_"+id);
}
function makeButtonInvisible(id){
	document.getElementById("button_icon_"+id).className="list_button_icon_invisible";
	document.getElementById("button_"+id).className="list_button_invisible";
}
function makeButtonWaiting(id){
	document.getElementById("button_icon_"+id).className="list_button_icon fa fa-refresh fa-spin";
	document.getElementById("button_"+id).className="list_button";
}
function makeButtonInput(id){
	document.getElementById("button_icon_"+id).className="list_button_icon fa fa-mouse-pointer";
	document.getElementById("button_"+id).className="list_button";
}
function makeButtonConfirm(id){
	document.getElementById("button_icon_"+id).className="list_button_icon icon_confirm fa fa-check";
	document.getElementById("button_"+id).className="list_button button_confirm";
}
function makeButtonReject(id){
	document.getElementById("button_icon_"+id).className="list_button_icon icon_reject fa fa-times";
	document.getElementById("button_"+id).className="list_button button_reject";
}
function expandFlights(){expand_main_menu("flight_menu");}
function expandHotels(){expand_main_menu("hotels_menu");}
function expandCars(){expand_main_menu("cars_menu");}
function expandEntertainment(){expand_main_menu("entertainment_menu");}
function expandRestaurants(){expand_main_menu("restaurants_menu");}
function collapseAll(){
	$("#dropdown_main_list").children(".hh_main_menu").children(".hh_inner").slideUp();
	$("#dropdown_main_list").children(".hh_main_menu").children(".hh_title").each(function(){
		rotate_default($(this).children(".careticon").attr("id"));
	});
}
function disableSidebar(){
	disableFlights();
	disableRestaurants();
	disableEntertainment();
	disableCars();
	disableHotels();
}
var sideBarInput=["flight","vacation","hotel","car","restaurant","entertainment"];
function disableTitle(titleId){
	hh_inner=$("#"+titleId+"_anchor");
	hh_inner.addClass("collapsed");
	hh_inner.removeClass("expanded");
	hh_inner.slideUp();
	rotate_default(titleId+"_icon");
	
	$("#"+titleId+"_title").removeClass("hh_title").addClass("hh_title_disabled");
	$("#"+titleId+"_title").children(".hh_sf").removeClass("hh_sf").addClass("hh_nf");
	$("#"+titleId+"_title").parent().removeClass("hh_main_menu").addClass("hh_disabled_menu");
	
	$("#"+titleId+"_title").children(".careticon").removeClass("fa-caret-right").addClass("fa-lock");
}
function enableTitle(titleId){
	$("#"+titleId+"_title").removeClass("hh_title_disabled").addClass("hh_title");
	$("#"+titleId+"_title").children(".hh_nf").removeClass("hh_nf").addClass("hh_sf");
	$("#"+titleId+"_title").parent().removeClass("hh_disabled_menu").addClass("hh_main_menu");
	$("#"+titleId+"_title").children(".careticon").removeClass("fa-lock").addClass("fa-caret-right");
}
function disableFlights(){disableTitle("flight");}
function disableRestaurants(){disableTitle("restaurants");}
function disableEntertainment(){disableTitle("entertainment");}
function disableCars(){disableTitle("cars");}
function disableHotels(){disableTitle("hotels");}

function enableFlights(){enableTitle("flight");}
function enableRestaurants(){enableTitle("restaurants");}
function enableEntertainment(){enableTitle("entertainment");}
function enableCars(){enableTitle("cars");}
function enableHotels(){enableTitle("hotels");}

function disableUntil(name){
	split=0;
	if(name=="flight"){split=0;}else if(name=="vacation"){split=1;}else if(name=="hotel"){split=2;} else if(name=="car"){split=3;}
	else if(name=="restaurant"){split=4;}else if(name=="entertainment"){split=5;}
	for(i=5;i>split;i--){
		disableTitle(sideBarInput[i]);
	}
	for(i=0;i<=split;i++){
		enableTitle(sideBarInput[i]);
	}
}
function clearFlights(){
	selected_flight="";
	$("#flights_anchor").children().remove();
	recalcFlights();
}
function destroyAllChildren(anchor){
	while (anchor.firstChild) {
		anchor.removeChild(anchor.firstChild);
	}
}
function recalcFlights(){
	$("#flights_anchor_outer").animate({
	    height: $("#flights_anchor_inner").height()
	},600);
}
function recalcFlightsInstant(){
	$("#flights_anchor_outer").height($("#flights_anchor_inner").height());
}
function formatAMPM(date) {
	  var hours = date.getHours();
	  var minutes = date.getMinutes();
	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var strTime = hours + ':' + minutes + ' ' + ampm;
	  return strTime;
	}
function displayFlights(){
	$("#flights_anchor").children().each(function()
	{
		$(this).remove();
	});
	var flights_anchor = document.getElementById("flights_anchor");
	for(var i=0;i<flights_trips.length;i++)
	{
		
		//Main DIV for everything
		var handle_main = document.createElement("DIV");
		handle_main.className="handle_main elem_selectable";
		handle_main.id="flight_"+i;
		{
			// Table for holding all of the main / preview stuff
			var search_upper_table = document.createElement("TABLE");
			search_upper_table.className="search_upper_table";
			var flight_upper_row = document.createElement("TR");
			{
				// Main segment of the main container holding names / times
				var handle_main_td = document.createElement("TD");
				handle_main_td.className="elem_data";
				{
					// Find the name of the carrier
					var flight_carrier = document.createElement("P");
					var carrier=flights_trips[i].slice[0].segment[0].flight.carrier;
					var isSameCarrier=true;
					// Iterate over every slice
					for(var slice=0;slice<2;slice++)
					{
						// Iterate over every segment
						for(var s=0;s<flights_trips[i].slice[slice].segment.length;s++)
						{
							if(carrier != flights_trips[i].slice[slice].segment[s].flight.carrier)
							{
								isSameCarrier=false;
								break;
							}
						}
					}
					if(isSameCarrier){
						flight_carrier.innerHTML=flights_carriers.get(carrier);
					}
					else{
						flight_carrier.innerHTML="Multiple Airlines";
					}
					flight_carrier.className="elem1";
					handle_main_td.appendChild(flight_carrier);
					
					// Find the data for the departure flight
					var flight_outbound = document.createElement("P");
					flight_outbound.className="flight_outbound";
					var flight_outbound_departure = new Date(flights_trips[i].slice[0].segment[0].leg[0].departureTime);
					var flight_outbound_arrival = new Date(flights_trips[i].slice[0].segment[
						flights_trips[i].slice[0].segment.length-1].leg[
							flights_trips[i].slice[0].segment[
								flights_trips[i].slice[0].segment.length-1].leg.length-1].arrivalTime);
					flight_outbound.innerHTML="Outbound: "+formatAMPM(flight_outbound_departure) + "<i class=\"fa fa-arrow-right flight_arrow\"></i>"+formatAMPM(flight_outbound_arrival)+"</p>";
					handle_main_td.appendChild(flight_outbound);
					
					// Find the data for the return flight
					var flight_return = document.createElement("P");
					flight_return.className="flight_return";
					var flight_return_departure = new Date (flights_trips[i].slice[1].segment[0].leg[0].departureTime);
					var flight_return_arrival = new Date(flights_trips[i].slice[1].segment[
						flights_trips[i].slice[1].segment.length-1].leg[
							flights_trips[i].slice[1].segment[
								flights_trips[i].slice[1].segment.length-1].leg.length-1].arrivalTime);
					flight_return.innerHTML="Return: "+formatAMPM(flight_return_departure) + "<i class=\"fa fa-arrow-right flight_arrow\"></i>"+formatAMPM(flight_return_arrival)+"</p>";
					handle_main_td.appendChild(flight_return);
				}
				// Legs segment of the main container holding the legs
				var elem3_td = document.createElement("TD");
				elem3_td.className="elem_data";
				{
					// Find the amount of legs
					var elem3 = document.createElement("P");
					var segments = flights_trips[i].slice[0].segment.length;
					var legs=0;
					for (var s =0;s<segments;s++){
						legs+=flights_trips[i].slice[0].segment[s].leg.length;
					}
					if(legs==1){
						elem3.innerHTML="Nonstop";
					}
					else if(legs==2){
						elem3.innerHTML="1 Stop";
					}
					else{
						elem3.innerHTML=(legs-1)+" Stops";
					}
					elem3.className="elem3";
					elem3_td.appendChild(elem3);
				}
				// Cost segment of the main container holding the cost
				var elem2_td = document.createElement("TD");
				elem2_td.className="elem_data elem_data_cost";
				{
					// Find the flight cost
					var elem2 = document.createElement("P");
					elem2.innerHTML = "$"+flights_trips[i].saleTotal.substring(3);
					elem2.className="elem2";
					elem2_td.appendChild(elem2);
				}
			}
			//https://www.cheapoair.com/fpnext/Air/RemoteSearch/?tabid=1832&ad=1&ch=0&sr=0&is=0&il=0&pos=US&dispr=1448.56&ulang=en&FpAffiliate=GOOG_GFS_712&tt=RoundTrip&Slice1=1,2&Slice2=3&cbn1=Economy&carr1=SY&dd1=20170307&og1=MSP&dt1=JFK&fbc1=Q&fnum1=243&cbn2=Economy&carr2=FI&dd2=20170307&og2=EWR&dt2=KEF&fbc2=Q&fnum2=622&cbn3=Economy&carr3=FI&dd3=20170311&og3=KEF&dt3=MSP&fbc3=Q&fnum3=657
			// Container for holding all of the detail stuff
			var flight_detail_div = document.createElement("DIV");
			flight_detail_div.className="detail_lower";
			{
				var dateString=date.toISOString();//substr(0,4) YEAR, substr(5,2) MONTH substr (8,2) DAY
				var dateReturnString=date_return.toISOString();
				var flight_detail_cheapoflights = document.createElement("A");
				flight_detail_cheapoflights.href="https://www.expedia.com/Flights-Search?mode=search&paandi=true&leg1=from:"+originCode+",to:"+destinationCode+",departure:"+dateString.substr(5,2)+"/"+dateString.substr(8,2)+"/"+dateString.substr(0,4)+"TANYT&passengers=" +
						"children:"+(+document.getElementById("value_flight_children").value + +document.getElementById("value_flight_infants_in_seat").value)+"," +
						"adults:"+document.getElementById("value_flight_adults").value+"," +
						"seniors:"+document.getElementById("value_flight_seniors").value+"," +
						"infantinlap:"+document.getElementById("value_flight_infants_in_lap").value+
						"&trip=Roundtrip&leg2=from:"+destinationCode+",to:"+originCode+",departure:"+dateReturnString.substr(5,2)+"/"+dateReturnString.substr(8,2)+"/"+dateReturnString.substr(0,4)+"TANYT&options=cabinclass:economy,sortby:price";
				flight_detail_cheapoflights.target="_blank";
				flight_detail_cheapoflights.className="book_flight";
				flight_detail_cheapoflights.innerHTML="Book flight in Expedia";
				flight_detail_div.appendChild(flight_detail_cheapoflights);
				
				var flight_detail_orbitz = document.createElement("A");
				flight_detail_orbitz.href="https://www.orbitz.com/Flights-Search?trip=RoundTrip&leg1=from:"+originCode+",frCode:"+originCode+",to:"+destinationCode+",toCode:"+destinationCode+
				",departure:"+dateString.substr(5,2)+"/"+dateString.substr(8,2)+"/"+dateString.substr(0,4)+"Tnull&leg2=from:"+destinationCode+",frCode:"+destinationCode+",to:"+originCode+",toCode:"+originCode+",departure:"+dateReturnString.substr(5,2)+"/"+dateReturnString.substr(8,2)+"/"+dateReturnString.substr(0,4)+"Tnull&" +
						"passengers=children:"+(+document.getElementById("value_flight_children").value + +document.getElementById("value_flight_infants_in_seat").value)+
						",adults:"+document.getElementById("value_flight_adults").value+
						",seniors:"+document.getElementById("value_flight_seniors").value+
						",infantinlap:"+document.getElementById("value_flight_infants_in_lap").value+
						"&options=cabinclass:coach,nopenalty:N,sortby:price&mode=search";
				flight_detail_orbitz.target="_blank";
				flight_detail_orbitz.className="book_flight";
				flight_detail_orbitz.innerHTML="Book flight in Orbitz";
				flight_detail_div.appendChild(flight_detail_orbitz);
			}
		}
		// Attach content Cells to the Upper Row
		flight_upper_row.appendChild(handle_main_td);
		flight_upper_row.appendChild(elem3_td);
		flight_upper_row.appendChild(elem2_td);
		
		//Assemble Upper table
		search_upper_table.appendChild(flight_upper_row);
		
		// Attach Upper + Detail divs to the Main Div
		handle_main.appendChild(search_upper_table);
		handle_main.appendChild(flight_detail_div);
		
		// Attach The Row to the flight anchor
		flights_anchor.appendChild(handle_main);
	}
	recalcFlights();
}
function displayHotels(){
	$("#hotels_anchor").children().each(function()
	{
		$(this).remove();
	});
	var hotels_anchor = document.getElementById("hotels_anchor");
	for(var i=0;i<eventdata["hotels"].length;i++)
	{
		//Main DIV for everything
		var handle_main = document.createElement("DIV");
		handle_main.className="handle_main elem_selectable";
		handle_main.id="hotel_"+i;
		{
			// Table for holding all of the main / preview stuff
			var search_upper_table = document.createElement("TABLE");
			search_upper_table.className="search_upper_table";
			var hotel_upper_row = document.createElement("TR");
			{
				// Main segment of the main container holding names / times
				var handle_main_td = document.createElement("TD");
				handle_main_td.className="elem_data hotels_elem_data";
				{
					// Find the name of the hotel
					var elem1 = document.createElement("P");
					elem1.innerHTML=eventdata["hotels"][i].name;
					elem1.className="elem1";
					handle_main_td.appendChild(elem1);
					
					// Find the address
					var elem2 = document.createElement("P");
					elem2.className="hotel_add";
					elem2.innerHTML=eventdata["hotels"][i].vicinity;
					handle_main_td.appendChild(elem2);
				}
				var elem3_td = document.createElement("TD");
				elem3_td.className="elem3_td elem_stars";
				{

					var rating = eventdata["hotels"][i].rating;
					// Find the data for the return flight
					var main_stars_conatainer = document.createElement("DIV");
					main_stars_conatainer.className="stars_container";
					{
						if(rating!=undefined){
							var main_stars_back1 = document.createElement("P");
							main_stars_back1.className="stars_back1";
							main_stars_conatainer.appendChild(main_stars_back1);
							
							var main_stars_back = document.createElement("P");
							main_stars_back.className="stars_back";
							main_stars_conatainer.appendChild(main_stars_back);
							
							var main_stars_front = document.createElement("P");
							main_stars_front.className="stars_front";
							main_stars_front.style.width=((rating||0)*17.464)+"px";//The magic number
							main_stars_conatainer.appendChild(main_stars_front);
							}
						else{
							var main_stars_norating = document.createElement("P");
							main_stars_norating.className="stars_undefined";
							main_stars_conatainer.appendChild(main_stars_norating);
						}
					}
					elem3_td.appendChild(main_stars_conatainer);
				}
				
				
			}
			// Container for holding all of the detail stuff
			var hotel_detail_div = document.createElement("DIV");
			{
				
			}
		}
		// Attach content Cells to the Upper Row
		hotel_upper_row.appendChild(handle_main_td);
		hotel_upper_row.appendChild(elem3_td);
		
		//Assemble Upper table
		search_upper_table.appendChild(hotel_upper_row);
		
		// Attach Upper + Detail divs to the Main Div
		handle_main.appendChild(search_upper_table);
		handle_main.appendChild(hotel_detail_div);
		
		// Attach The Row to the flight anchor
		hotels_anchor.appendChild(handle_main);
	}
}
function displayRestaurants(){
	$("#restaurants_anchor").children().each(function()
	{
		$(this).remove();
	});
	for(var i=0;i<eventdata["restaurants"].length;i++)
	{
		var restaurant_anchor = document.getElementById("restaurants_anchor");
		{
			//Main DIV for everything
			var handle_main = document.createElement("DIV");
			handle_main.className="handle_main elem_selectable";
			handle_main.id="restaurant_"+i;
			{
				// Table for holding all of the main / preview stuff
				var search_upper_table = document.createElement("TABLE");
				search_upper_table.className="search_upper_table";
				var restaurant_upper_row = document.createElement("TR");
				{
					// Main segment of the main container holding names / times
					var handle_main_td = document.createElement("TD");
					handle_main_td.className="elem_data restaurants_elem_data";
					{
						// Find the name of the hotel
						var elem1 = document.createElement("P");
						elem1.innerHTML=eventdata["restaurants"][i].name;
						elem1.className="elem1";
						handle_main_td.appendChild(elem1);
						
						// Find the address
						var elem2 = document.createElement("P");
						elem2.className="restaurant_add";
						elem2.innerHTML=eventdata["restaurants"][i].vicinity;
						handle_main_td.appendChild(elem2);
					}
					var elem3_td = document.createElement("TD");
					elem3_td.className="elem3_td elem_stars";
					{

						var rating = eventdata["restaurants"][i].rating;
						// Find the data for the return flight
						var main_stars_conatainer = document.createElement("DIV");
						main_stars_conatainer.className="stars_container";
						{
							if(rating!=undefined){
								var main_stars_back1 = document.createElement("P");
								main_stars_back1.className="stars_back1";
								main_stars_conatainer.appendChild(main_stars_back1);
								
								var main_stars_back = document.createElement("P");
								main_stars_back.className="stars_back";
								main_stars_conatainer.appendChild(main_stars_back);
								
								var main_stars_front = document.createElement("P");
								main_stars_front.className="stars_front";
								main_stars_front.style.width=((rating||0)*17.464)+"px";//The magic number
								main_stars_conatainer.appendChild(main_stars_front);
								}
							else{
								var main_stars_norating = document.createElement("P");
								main_stars_norating.className="stars_undefined";
								main_stars_conatainer.appendChild(main_stars_norating);
							}
						}
						elem3_td.appendChild(main_stars_conatainer);
					}
					
					
				}
				// Container for holding all of the detail stuff
				var restaurant_detail_div = document.createElement("DIV");
				{
					
				}
			}
			// Attach content Cells to the Upper Row
			restaurant_upper_row.appendChild(handle_main_td);
			restaurant_upper_row.appendChild(elem3_td);
			
			//Assemble Upper table
			search_upper_table.appendChild(restaurant_upper_row);
			
			// Attach Upper + Detail divs to the Main Div
			handle_main.appendChild(search_upper_table);
			handle_main.appendChild(restaurant_detail_div);
			
			// Attach The Row to the flight anchor
			restaurant_anchor.appendChild(handle_main);
		}
	}
}
function displayCars(){
	$("#cars_anchor").children().each(function()
			{
				$(this).remove();
			});
			var cars_anchor = document.getElementById("cars_anchor");
			for(var i=0;i<eventdata["cars"].length;i++)
			{
				//Main DIV for everything
				var handle_main = document.createElement("DIV");
				handle_main.className="handle_main elem_selectable";
				handle_main.id="cars_"+i;
				{
					// Table for holding all of the main / preview stuff
					var search_upper_table = document.createElement("TABLE");
					search_upper_table.className="search_upper_table";
					var cars_upper_row = document.createElement("TR");
					{
						// Main segment of the main container holding names / times
						var handle_main_td = document.createElement("TD");
						handle_main_td.className="elem_data cars_elem_data";
						{
							// Find the name of the hotel
							var elem1 = document.createElement("P");
							elem1.innerHTML=eventdata["cars"][i].name;
							elem1.className="elem1";
							handle_main_td.appendChild(elem1);
							
							// Find the address
							var elem2 = document.createElement("P");
							elem2.className="cars_add";
							elem2.innerHTML=eventdata["cars"][i].vicinity;
							handle_main_td.appendChild(elem2);
						}
						var elem3_td = document.createElement("TD");
						elem3_td.className="elem3_td elem_stars";
						{

							var rating = eventdata["cars"][i].rating;
							// Find the data for the return flight
							var main_stars_conatainer = document.createElement("DIV");
							main_stars_conatainer.className="stars_container";
							{
								if(rating!=undefined){
									var main_stars_back1 = document.createElement("P");
									main_stars_back1.className="stars_back1";
									main_stars_conatainer.appendChild(main_stars_back1);
									
									var main_stars_back = document.createElement("P");
									main_stars_back.className="stars_back";
									main_stars_conatainer.appendChild(main_stars_back);
									
									var main_stars_front = document.createElement("P");
									main_stars_front.className="stars_front";
									main_stars_front.style.width=((rating||0)*17.464)+"px";//The magic number
									main_stars_conatainer.appendChild(main_stars_front);
									}
								else{
									var main_stars_norating = document.createElement("P");
									main_stars_norating.className="stars_undefined";
									main_stars_conatainer.appendChild(main_stars_norating);
								}
							}
							elem3_td.appendChild(main_stars_conatainer);
						}
						
						
					}
					// Container for holding all of the detail stuff
					var cars_detail_div = document.createElement("DIV");
					{
						
					}
				}
				// Attach content Cells to the Upper Row
				cars_upper_row.appendChild(handle_main_td);
				cars_upper_row.appendChild(elem3_td);
				
				//Assemble Upper table
				search_upper_table.appendChild(cars_upper_row);
				
				// Attach Upper + Detail divs to the Main Div
				handle_main.appendChild(search_upper_table);
				handle_main.appendChild(cars_detail_div);
				
				// Attach The Row to the flight anchor
				cars_anchor.appendChild(handle_main);
			}
}
function displayEnt(type) {
	$("#entertainments_anchor").children().each(function()
			{
				$(this).remove();
			});
		var entertainment_anchor = document.getElementById("entertainments_anchor");
		for(var i=0;i<eventdata["park"].length;i++)
		{   //uh oh
			console.log("make Table");
			//Main DIV for everything
			var handle_main = document.createElement("DIV");
			handle_main.className="handle_main elem_selectable";
			handle_main.id="entertainments_"+i;
			{
				// Table for holding all of the main / preview stuff
				var search_upper_table = document.createElement("TABLE");
				search_upper_table.className="search_upper_table";
				var entertainment_upper_row = document.createElement("TR");
				{
					// Main segment of the main container holding names / times
					var handle_main_td = document.createElement("TD");
					handle_main_td.className="elem_data entertainments_elem_data";
					{
						// Find the name of the hotel
						var elem1 = document.createElement("P");
						elem1.innerHTML=eventdata["park"][i].name;
						elem1.className="elem1";
						handle_main_td.appendChild(elem1);
						
						// Find the address
						var elem2 = document.createElement("P");
						elem2.className="entertainment_add";
						elem2.innerHTML=eventdata["park"][i].vicinity;
						handle_main_td.appendChild(elem2);
					}
					var elem3_td = document.createElement("TD");
					elem3_td.className="elem3_td elem_stars";
					{
	
						var rating = eventdata["park"][i].rating;
						// Find the data for the return flight
						var main_stars_conatainer = document.createElement("DIV");
						main_stars_conatainer.className="stars_container";
						{
							if(rating!=undefined){
								var main_stars_back1 = document.createElement("P");
								main_stars_back1.className="stars_back1";
								main_stars_conatainer.appendChild(main_stars_back1);
								
								var main_stars_back = document.createElement("P");
								main_stars_back.className="stars_back";
								main_stars_conatainer.appendChild(main_stars_back);
								
								var main_stars_front = document.createElement("P");
								main_stars_front.className="stars_front";
								main_stars_front.style.width=((rating||0)*17.464)+"px";//The magic number
								main_stars_conatainer.appendChild(main_stars_front);
								}
							else{
								var main_stars_norating = document.createElement("P");
								main_stars_norating.className="stars_undefined";
								main_stars_conatainer.appendChild(main_stars_norating);
							}
						}
						elem3_td.appendChild(main_stars_conatainer);
					}
					
					
				}
				// Container for holding all of the detail stuff
				var entertainment_detail_div = document.createElement("DIV");
				{
					
				}
			}
			// Attach content Cells to the Upper Row
			entertainment_upper_row.appendChild(handle_main_td);
			entertainment_upper_row.appendChild(elem3_td);
			
			//Assemble Upper table
			search_upper_table.appendChild(entertainment_upper_row);
			
			// Attach Upper + Detail divs to the Main Div
			handle_main.appendChild(search_upper_table);
			handle_main.appendChild(entertainment_detail_div);
			
			// Attach The Row to the flight anchor
			entertainment_anchor.appendChild(handle_main);
		}
}
//End File