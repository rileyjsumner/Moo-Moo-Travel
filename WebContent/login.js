var userName="";
var userRole="";
var password="";
var useCookies=true;
function loadLoginFromCookies()
{
	userName=readCookie("userdata1");
	password=readCookie("userdata2");
	if(userName=="" || password=="" || userName==null || password == null){
		return false;
	}
	else{
		return true;
	}
}
function loadLoginFromJSON(json)
{
	if(json["result"]=="true"){
		userName=json["username"];
		password=json["password"];
		return true;
	}
	else{
		userName="";
		password="";
		return false;
	}
}
function loginFirst(){
	console.log("LOGINFIRST")
	if(loadLoginFromCookies())
	{
		console.log("COOKIES FOUND")
		// They have cookies
		testLogin("false","true",userName,password,function(json){
			if(loadLoginFromJSON(json))
			{
				updateLoginCookies();
			}
			else{
				// Update the cookies to have null values
				updateLoginCookies();
			}
			// Refresh the page with the new user data
			updateLoginPage();
		});
	}
	else{
		// they don't have cookies, just load the page with guest
		updateLoginPage();
	}
}
function testLogin(encode,decode,input_username,input_password,Callback_function)
{
	makeRequest("User?action=login&decode="+decode+"&encode="+encode+"&username="+input_username+"&password="+input_password,Callback_function);
}
function getRole(encode,input_username,input_password,Callback_function)
{
	makeRequest("User?action=getrole&encode="+encode+"&username="+input_username+"&password="+input_password,Callback_function);
}
function updateLoginCookies()
{
	console.log("CALLED UPDATE COOKIES")
	if(useCookies){
		testLogin("true","false",userName,password,function(json){
			console.log(json);
			console.log("RESULT:\""+json["result"]+"\"");
			if(json["result"]=="true"){
				console.log("VALID COOKIES")
				setCookie("userdata1",json["username"],100);
				setCookie("userdata2",json["password"],100);
			}
			else{
				console.log("NOT VALID?")
				setCookie("userdata1","",0);
				setCookie("userdata2","",0);
			}
		});
	}
}
function checkRole(){
	getRole("true",userName,password,function(json){
		if(json["role"]>1){$("#user_func_adminpanel").slideDown();}
		else{$("#user_func_adminpanel").slideUp();}
	});
}
function updateLoginPage()
{
	checkRole();
	if(userName=="" || userName == "Guest" || userName==null)
	{
		$("#user_menu_text").addClass("warning_hidden");
		$("#main_user_name").text("Not Logged in");
		$("#login_warn_icon").removeClass("warning_hidden");
		$("#login_warn_text").removeClass("warning_hidden");
		
		$("#user_username").val("");
		$("#user_password").val("");
		// Set the menu to be a login button
		$("#userBtn").text("Log in");
		$("#userBtn").removeClass("userOptions");
	}
	else{
		// Set the name, remove the warnings
		$("#main_user_name").text(userName);
		$("#user_menu_text").removeClass("warning_hidden");
		$("#login_warn_icon").addClass("warning_hidden");
		$("#login_warn_text").addClass("warning_hidden");
		// Change the menu
		$("#user_username").val(userName);
		$("#user_password").val(password);
		$("#userBtn").text("User Options");
		$("#userBtn").addClass("userOptions");
	}
	$("#main_user_name").text(userName);
}