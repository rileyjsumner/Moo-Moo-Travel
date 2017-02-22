var canSearchFlights=false;
var globalState="findOrigin"; // Current action the user is running (findOrigin,findDestination,selectHotels)
var globalAction="";
var globalJumpState ="findOrigin"; // action the user was doing and could jump back to (Same as globalstate)
var today=new Date();

var originCode=""; // Three character code for the origin city
var originName=""; // Name of the origin city
var originCC=""; // Name of the origin Country Code
var originLat=0;
var originLng=0;
var originConfirm=false;

var isCreate=false;

var vac;// Map marker
var vacIsSet=false;
var isVacCustom=false;
var vacLat=0;
var vacLng=0;
var vacName="";
var vacConfirm=false;

var destinationCode=""; // Three character code for the destination city
var destinationName=""; // Name of the destination city
var destinationCC=""; // Name of the destination Country Code
var destinationLat=0;
var destinationLng=0;
var destinationConfirm=false;

var date="";
var date_return="";

var curMenu;

var time;
var time2;

var passengers_adults=0;
var passengers_children=0;
var passengers_seniors=0;
var passengers_infants_lap=0;
var passengers_infants_seat=0;

var selected_flight="";
var selected_hotel="";

var flights_trips;
var flights_carriers;
var flights_airplanes;

var pic_origin = 'pics/home-2.png';
var pic_destination = 'pics/default.png';
function getHotelPic(stars,selected){
	if(selected){return 'pics/lodging_'+stars+'stars_selected.png'}
	else{return 'pics/lodging_'+stars+'stars.png'}
}
var pic_restaurant = 'pics/restaurant.png';
var pic_restaurant_selected = 'pics/restaurant_selected.png';
var pic_airport = 'pics/airport.png';
var pic_car = 'pics/car.png';
var pic_car_selected = 'pics/car_selected.png';
var pic_entertainment_selected = 'pics/smiley_happy.png'

var pic_ent=['pics/themepark.png','pics/restaurant_fish.png','pics/artgallery.png','pics/bar_cocktail.png','pics/bowling.png',
	'pics/campfire-2.png','pics/casino-2.png','pics/library.png','pics/movierental.png','pics/congress.png','pics/party-2.png',
	'pics/riparianhabitat.png','pics/stadium.png','pics/zoo.png'];
var pic_park='pics/riparianhabitat.png';//park img
var httpRequest;
var eventdata=[];
var locationdata;
var iconMarkers=[];
var origin;
var destination;
var destinationSet=false;
var map;
var service;

var entTypes=['amusement_park','aquarium','art_gallery','bar','bowling_alley','campground','casino','library','movie_theater','museum','night_club','park','stadium','zoo'];
setButtonStateWaiting("vac_location");
//Slide all of them up instantly
$(".hh_inner").slideUp(0);
$(".hh_inner_sub").slideUp(0);

//Handle clicking collapsing sidebars
$("#dropdown_main_list").on("click",".hh_title",function ()
{
	//Get the id of the clicked element
	var clicked=$(this).parent().attr("id");
	var id=clicked.split('_')[0];
	
	if($(this).parent().children(".hh_inner").hasClass("expanded")){
		hideType("hotels",selected_hotel);
	}
	else{
		if(id!="hotel"){hideType("hotels",selected_hotel)}
		else{showType("hotels")}
	}
	curMenu=clicked;
	findNextGlobalState();
	expand_main_menu(clicked);
});
// Handle Searching
$(".list_button, .list_search").click(function()
{
	var id=$(this).attr("id");
	if(id==="button_search_flights" && canSearchFlights)
	{
		// SEARCH FOR FLIGHTS
		$("#flights_search_waiting").addClass("fa-refresh");
		$("#flights_search_notfound").removeClass("search_notfound");
		clearFlights();
		makeRequest("Getdata?action=flights&adults="+document.getElementById("value_flight_adults").value+
				"&children="+document.getElementById("value_flight_children").value+
				"&seniors="+document.getElementById("value_flight_seniors").value+
				"&infantseat="+document.getElementById("value_flight_infants_in_seat").value+
				"&infantlap="+document.getElementById("value_flight_infants_in_lap").value+
				"&origin="+originCode+
				"&destination="+destinationCode+
				"&date="+date.toISOString().substr(0,10)+
				"&date2="+date_return.toISOString().substr(0,10)+
				"&time="+document.getElementById("value_flight_departure_time").value+
				"&time2="+document.getElementById("value_flight_return_time").value,setFlights);
	}
	else if(id==="button_search_hotels" && canSearchFlights)
	{
		$("#hotels_search_waiting").addClass("fa-refresh");
		$("#hotels_search_notfound").removeClass("search_notfound");
		clearHotels();
		var request = {location: {lat: vacLat, lng: vacLng},radius: '7500',type: 'lodging'};
		service.nearbySearch(request, callback_hotels);
	}
	else if(id==="button_search_restaurants" && canSearchFlights)
	{
		var request = {location: {lat: vacLat, lng: vacLng},radius: '7500',type: 'restaurant'};
		service.nearbySearch(request, callback_restaurants);
	}
	else if(id==="button_search_cars" && canSearchFlights)
	{
		var request = {location: {lat: vacLat, lng: vacLng},radius: '7500',type: 'car_rental'};
		service.nearbySearch(request, callback_cars);
	} else if(id==="button_search_entertainment" && canSearchFlights)
	{
		/*{
		//entTypes = ['amusement_park','aquarium','art_gallery','bar','bowling_alley','campground','casino','library','movie_theater','museum','night_club','park','stadium','zoo']
		//for(var q=0; q<entTypes.length;q++) {
			//console.log("REQUESTING::" + entTypes[q]);
			var request = {location: {lat: vacLat, lng: vacLng},radius: '7500',type: 'park'};}
			service.nearbySearch(request, function(results,status){callback_entertainment('park',results,status);});
		}
	//}*/
	
		var request = {location: {lat: vacLat, lng: vacLng},radius: '7500',type: 'park'};
		service.nearbySearch(request, function(results,status){ callback_entertainment('park',results,status);});
	
	}
});
// Handle clicking on / selecting flights
$("#flights_anchor").on("click","div.handle_main",function()
{
	var clicked = $(this).attr("id");
	$("#flights_anchor").children().each(function()
	{
		if($(this).attr("id")==clicked)
		{
			// Select the flight
			selected_flight=$(this).attr("id").substr(7)
			$(this).addClass("elem_selected")
			$(this).removeClass("elem_selectable")
			// Slide down the details
			$(this).children(".detail_lower").slideDown({duration:400,step:recalcFlightsInstant});
		}
		else
		{
			selected_flight="";
			$(this).removeClass("elem_selected");
			$(this).addClass("elem_selectable")
			$(this).children(".detail_lower").slideUp({duration:400,step:recalcFlightsInstant});
		}
	});
});
//Handle clicking on / selecting hotels
$("#hotels_anchor").on("click","div.handle_main",function()
{
	selectHotel($(this).attr("id").substr(6));
});
$("#cars_anchor").on("click","div.handle_main",function()
{
	selectCar($(this).attr("id").substr(5));
});
$("#restaurants_anchor").on("click","div.handle_main",function()
{
	selectRestaurant($(this).attr("id").substr(11));
});
$("#entertainments_anchor").on("click","div.handle_main",function()
{
	selectEntertainment($(this).attr("id").substr(15));
});
//Handle clicking the confirm / reject buttons
$(".hh_inner").on("click","div.list_button",function()
{
	var clicked=$(this).attr("id");
	var pos=clicked.indexOf("confirm");
	var confirm=(pos!==-1);
	
	var type;
	
	if(confirm){
		type=clicked.substr(15);
	}
	else{
		type=clicked.substr(14);
	}
	if(globalState=="confirmOrigin" && type == "flight_origin" && confirm)
	{
		originConfirm=true;
		findNextGlobalState();
	}
	else if(type === "flight_origin" && !confirm)
	{
		$("#flights_search_waiting").removeClass("fa-refresh");
	  	$("#flights_search_notfound").removeClass("search_notfound");
	  	clearFlights();
		origin.setMap(null);
		originCode="";
		originName="";
		originCC="";
		originLat=0;
		originLng=0;
		originConfirm=false;
		findNextGlobalState();
	}
	else if(globalState=="confirmDestination" && type == "flight_destination" && confirm)
	{
		destinationConfirm=true;
		clearOthers()
		findNextGlobalState();
	}
	else if(type === "flight_destination" && !confirm)
	{
		$("#flights_search_waiting").removeClass("fa-refresh");
	  	$("#flights_search_notfound").removeClass("search_notfound");
	  	clearFlights();
		destination.setMap(null);
		destinationCode="";
		destinationName="";
		destinationCC="";
		destinationLat=0;
		destinationLng=0;
		destinationConfirm=false;
		clearOthers()
		findNextGlobalState();
	} else if(globalState==="confirmVac" && type==="vac_location" && confirm) {
		vacConfirm=true;
		findNextGlobalState();
	} else if(type === "vac_location" && !confirm) {
		$("#button_text_search_hotels").removeClass("fa-refresh");
	  	$("#button_icon_search_notfound").removeClass("search_notfound");
		vacName="";
		vacLat="";
		vacLng="";
		$("#value_vac_location").text("");
		vac.setMap(null);
		vacConfirm=false;
		findNextGlobalState();
	}
});
// Handle the dates changing
$(".list_date").change(function()
{
	clearFlights();
	var tempdate= new Date($(this).val());
	if($(this).attr("id")=="value_flight_departure_date")
	{
		if ( isNaN( tempdate.getTime() ) || tempdate.getFullYear() > today.getFullYear()+10 || tempdate <= today)
		{
			date="";
		}
		else
		{
			date= new Date(tempdate);
			tempdate.setDate(tempdate.getDate()+1);
			// If the return date isn't set by the user yet, set it to this + 1 day
			if(date_return=="" || (date_return instanceof Date && date >= date_return))
			{
				$("#value_flight_return_date").val(tempdate.toISOString().substr(0,10));
				date_return=new Date(tempdate);
			}
		}
	}
	else if($(this).attr("id")=="value_flight_return_date")
	{
		if ( isNaN( tempdate.getTime() ) || tempdate.getFullYear() > today.getFullYear()+10 || tempdate <= today)
		{
			date_return="";
		}
		else
		{
			date_return= new Date(tempdate);
			if(date=="" || tempdate <= date){
				tempdate.setDate(tempdate.getDate()-1);
				$("#value_flight_departure_date").val(tempdate.toISOString().substr(0,10));
				date=new Date(tempdate);
			}
		}
	}
	findNextGlobalState();
});
//Handle submenu clicked collapsables
$(".hh_subtitle").click(function()
{
	if($(this).next(".hh_inner_sub").hasClass("collapsed"))
	{
		$(this).next(".hh_inner_sub").removeClass("collapsed").addClass("expanded").slideDown();
		rotate($(this).children(".subcareticon").attr("id"));
	}
	else
	{
		$(this).next(".hh_inner_sub").removeClass("expanded").addClass("collapsed").slideUp();
		rotate_default($(this).children(".subcareticon").attr("id"));
	}
});
//handle vacation options changing
$("#value_vacation_custom").change(function()
{
	if($(this).val()=="0"){isVacCustom=false;}
	else{isVacCustom=true;}
	vacLat="";vacLng="";vacName="";vacConfirm=false;
	$("#value_vac_location").text("");
	if(vacIsSet){
		vac.setMap(null);
	}
	clearOthers()
	findNextGlobalState()
});
function openSaveWindow()
{
	$("#save_window_background").fadeIn(400,function(){
		$("#save_input").val("");
		$("#save_failed").slideUp();
	});
}
function closeSaveWindow(){
	$("#save_window_background").fadeOut(400,function(){
		modalSave.style.display="none";
		$("#save_input").val("");
		$("#save_failed").slideUp();
	});
}
function openLoginWindow()
{
	$("#login_window_background").fadeIn(400,function(){
		$("#login_input_username").val("");
		$("#login_input_password").val("");
		$("#login_failed").slideUp();
	});
}
function closeLoginWindow(){
	$("#login_window_background").fadeOut(400,function(){
		modal.style.display="none";
		$("#login_input_username").val("");
		$("#login_input_password").val("");
		$("#login_failed").slideUp();
		
		// Go back to log in
		isCreate=false;
		$("#login_maintext").text("Log in")
		$("#login_button").slideDown();
		$("#login_input_email").slideUp();
		$("#login_input_lastname").slideUp();
		$("#login_input_firstname").slideUp();
		$("#login_input_email").val("");
		$("#login_input_lastname").val("");
		$("#login_input_firstname").val("");
	});
}
//log in function
function submitLogin(){
	testLogin("true","true",$("#login_input_username").val(),$("#login_input_password").val(),function(json)
	{
		if(loadLoginFromJSON(json)){
			//Animating the success on the login window goes here
			closeLoginWindow();
		}
		else{
			$("#login_failed").slideDown();
		}
		console.log("UPDATING COOKIES");
		updateLoginCookies();
		updateLoginPage();
	});
}
// Save the vacation
$("#save_button").click(function(){
	var hotel_id=""
	if(eventdata["hotels"]!=undefined && eventdata["hotels"]!=null){
		if(eventdata["hotels"][selected_hotel]!=undefined){
			hotel_id=eventdata["hotels"][selected_hotel];
		}
	}
	var send_data={"action":"savevac"
	,"username":userName
	,"password":password
	,"name":$("#save_input").val()
	,"origin":originCode
	,"destination":destinationCode
	,"date":(!(date instanceof Date))?"":date.toISOString().substr(0,10)
	,"date_return":(!(date_return instanceof Date))?"":date_return.toISOString().substr(0,10)
	,"vaccustom":isVacCustom?1:0
	,"vaclat":vacLat
	,"vaclng":vacLng
	,"adults":document.getElementById("value_flight_adults").value
	,"seniors":document.getElementById("value_flight_seniors").value
	,"children":document.getElementById("value_flight_children").value
	,"infants":document.getElementById("value_flight_infants_in_seat").value
	,"infants_lap":document.getElementById("value_flight_infants_in_lap").value
	,"hotel":hotel_id
	,"flight":password
	,"car":password};
	console.log(send_data);
	makePostRequest("Getdata",send_data,function(json){console.log(json);});
});

$("#login_button").click(submitLogin);
$('.submitsLogin').on('keypress', function (e) {
	if(e.which === 13){
		//Disable textbox to prevent multiple submit
		//$(this).attr("disabled", "disabled");
		submitLogin();
	}
});
// Initial animation to set the first height of it
$("#flights_anchor_outer").animate({
	height: $("#flights_anchor_inner").height()
},60);
//INIT COMMANDS
disableUntil("flight");
$("#flight_line_destination").slideUp();
$("#flight_line_departure_date").slideUp();
$("#flight_line_return_date").slideUp();
$("#flight_line_passengers").slideUp();
$("#flight_line_flights").slideUp();
expandFlights();

$(".restaurants_anchor").click(function(){
	makeRequest("Getdata?action=restaurants", setRestaurants);
	
});
// Open the create account
$("#newaccount_button").click(function(){
	if(isCreate){
		// Submit it
		makeRequest("Getdata?action=newuser" +
				"&username="+$("#login_input_username").val()+
				"&password="+$("#login_input_password").val()+
				"&email="+$("#login_input_email").val()+
				"&firstname="+$("#login_input_firstname").val()+
				"&lastname="+$("#login_input_lastname").val(),function(){
		});
		closeLoginWindow();
	}
	else{
		// Morph
		isCreate=true;
		$("#login_maintext").text("Create Account")
		$("#login_button").slideUp();
		$("#login_input_email").slideDown();
		$("#login_input_firstname").slideDown();
		$("#login_input_lastname").slideDown();
		$("#login_failed").slideUp();
	}
});
// Get the modal
var modal = document.getElementById('login_window_background');
var modalSave = document.getElementById('save_window_background');
// Get the button that opens the modal
var btn = document.getElementById("userBtn");
// Get the close Login window btn
var closeBtn = document.getElementsByClassName("close")[0];
var closeSaveBtn = document.getElementById("closeSave");

// handle clicking on userBtn 
btn.onclick = function() {
	if($("#userBtn").hasClass("userOptions"))
	{
		// If it's a menu, not a login btn
		document.getElementById("user_dropdown_content").classList.toggle("user_show");
	}
	else
	{
		openLoginWindow()
	}
}
// When the user clicks on <span> (x), close the login window
closeBtn.onclick = function() {
	closeLoginWindow()
}
closeSaveBtn.onclick = function() {
	closeSaveWindow()
}
window.onclick = function(event)
{
	// Close the Login window if the user clicks outside of it
	if (event.target == modal) {
		closeLoginWindow();
	}
	// Close the Save window if the user clicks outside of it
	if (event.target == modalSave) {
		closeSaveWindow();
	}
	// Close the User options menu if the user clicks outside of it
	if (!event.target.matches('.user_dropbtn'))
	{
    	document.getElementById("user_dropdown_content").classList.remove('user_show');
	}
}
$(".user_dropdown_option").click(function(){
	var id = $(this).attr("id");
	if(id=="user_func_logout"){
		userName="";
		password="";
		updateLoginCookies();
		updateLoginPage();
	}
	else if(id=="user_func_editaccount")
	{
		
	}
	else if(id=="user_func_adminpanel")
	{
		
	}
	else if(id=="user_func_viewvacs")
	{
		
	}
	else if(id=="user_func_savevac")
	{
		//load the past vacations
		$("#save_past_table").children().remove();
		makeRequest("Getdata?action=pastvacations&username="+userName+"&password="+password,function(json){
			if(json["empty"]=="false")
			{
				//They have past vacations
				for(var i=0;i<json["results"].length;i++){
					// Go through each past vacation
					var past_vac_row=document.createElement("TR");
					past_vac_row.className="save_past_row";
					
					var past_vac_name=document.createElement("TD");
					past_vac_name.className="save_past_name";
					past_vac_name.innerHTML=json["results"][i]["name"];
					
					var past_vac_place=document.createElement("TD");
					past_vac_place.className="save_past_place";
					past_vac_place.innerHTML=json["results"][i]["origin"]+" to "+json["results"][i]["destination"];
					
					var past_vac_date=document.createElement("TD");
					past_vac_date.className="save_past_date";
					past_vac_date.innerHTML=json["results"][i]["date"] + " to "+json["results"][i]["date_return"];
					past_vac_row.appendChild(past_vac_name);
					past_vac_row.appendChild(past_vac_place);
					past_vac_row.appendChild(past_vac_date);
					document.getElementById("save_past_table").appendChild(past_vac_row);
				}
			}
			else{
				
			}
			openSaveWindow();
		});
	}
});
// Log the user in if they have cookies set / Refresh login stuff
loginFirst();