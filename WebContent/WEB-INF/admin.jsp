<html>
	<head>
		<title>Admin Panel</title>
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
		<meta charset="UTF-8">
		<link rel = "stylesheet" href = "adminstyle.css" type="text/css">
		<link rel = "stylesheet" href = "main.css" type="text/css">
		<link rel = "stylesheet" href = "dropdown.css" type = "text/css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<script src="https://code.jquery.com/jquery-3.1.1.js"></script>
	</head>
	<body>
	   	<div class = "jumbotron">
			<h1 class="jumbotron_text">Moo-Moo Travel Admin Panel</h1>
			<div id = "user_menu">
				<p id = "user_menu_text">Logged in as</p><p id = "main_user_name">${username}</p>
			</div>
			<!-- The Help / Warning Window -->
			<div id="help_window_background" class="modal">
				<!-- Modal content -->
				<div id="help_window" class="modal-content">
					<span id="closeHelp" class="close">&times;</span>
					<p class="login_maintext" id="help_window_text"></p>
					<p class="login_button" id="help_button_1"></p>
					<p class="login_button" id="help_button_2"></p>
				</div>
			</div>
			<!-- The User Window -->
			<div id="user_window_background" class="modal">
				<!-- Modal content -->
				<div id="user_window" class="modal-content">
					<span id="closeUser" class="close">&times;</span>
					<p class="login_maintext" id="user_window_text">Edit User</p>
					<p class="login_desctext">User Name</p>
					<input id="user_input_id" type="hidden"/>
					<input id="user_input_username" class="login_input" placeholder="User name" type="text"/>
					<p class="login_desctext">Password</p>
					<input id="user_input_password" class="login_input" placeholder="Password" type="text"/>
					<p class="login_desctext">First Name</p>
					<input id="user_input_firstname" class="login_input" placeholder="First name" type="text"/>
					<p class="login_desctext">Last Name</p>
					<input id="user_input_lastname" class="login_input" placeholder="Last name" type="text"/>
					<p class="login_desctext">Email</p>
					<input id="user_input_email" class="login_input" placeholder="Email" type="text"/>
					<p class="login_button" id="user_submit">Edit User</p>
					<p class="login_button" style="display:none;" id="user_new">New User</p>
					<p class="login_button" id="user_cancel">Cancel</p>
				</div>
			</div>
		</div>
		<div class = "content">
			<table id = "admin_user_table">
			</table>
			<p id="new_user_btn">New User</p>
		</div>
		<script>
			function openUserWindow()
			{
				$("#user_failed").slideUp(0);
				$("#user_window_background").fadeIn();
			}
			function closeUserWindow(){
				$("#user_window_background").fadeOut(400,function(){
					modal.style.display="none";
					$("#user_input_username").val("");
					$("#user_input_password").val("");
					$("#user_input_firstname").val("");
					$("#user_input_lastname").val("");
					$("#user_input_email").val("");
					$("#user_failed").slideUp(0);
				});
			}
			function refreshUsers()
			{
				$.post("Admin",{"action":"getusers","username":"${username}","password":"${password}"}).done(function(string){
					var json = JSON.parse(string);
					console.log(json);
					$("#admin_user_table").children().remove();
					var newRow=document.createElement("TR");
					newRow.className="admin_user_row";
					
					var username = document.createElement("TH");
					username.className="admin_header";
					username.innerHTML="User Name";
					newRow.appendChild(username);
					
					var password = document.createElement("TH");
					password.className="admin_header";
					password.innerHTML="Password";
					newRow.appendChild(password);
					
					var firstname = document.createElement("TH");
					firstname.className="admin_header";
					firstname.innerHTML="First Name";
					newRow.appendChild(firstname);
					
					var lastname = document.createElement("TH");
					lastname.className="admin_header";
					lastname.innerHTML="Last Name";
					newRow.appendChild(lastname);
					
					var email = document.createElement("TH");
					email.className="admin_header";
					email.innerHTML="Email";
					newRow.appendChild(email);
					
					var edit = document.createElement("TH");
					edit.className="admin_header";
					edit.innerHTML="Edit Account";
					newRow.appendChild(edit);
					
					var deleteuser = document.createElement("TH");
					deleteuser.className="admin_header";
					deleteuser.innerHTML="Remove Account";
					newRow.appendChild(deleteuser);
					
					document.getElementById("admin_user_table").appendChild(newRow);
					for(var i=0;i<json.length;i++){
						var newRow=document.createElement("TR");
						newRow.className="admin_user_row";
						
						var username = document.createElement("TD");
						username.className="admin_val";
						username.innerHTML=json[i]["username"];
						newRow.appendChild(username);
						
						var password = document.createElement("TD");
						password.className="admin_val";
						password.innerHTML=json[i]["password"];
						newRow.appendChild(password);
						
						var firstname = document.createElement("TD");
						firstname.className="admin_val";
						firstname.innerHTML=json[i]["firstname"];
						newRow.appendChild(firstname);
						
						var lastname = document.createElement("TD");
						lastname.className="admin_val";
						lastname.innerHTML=json[i]["lastname"];
						newRow.appendChild(lastname);
						
						var email = document.createElement("TD");
						email.className="admin_val";
						email.innerHTML=json[i]["email"];
						newRow.appendChild(email);
						
						var edit = document.createElement("TD");
						edit.className="admin_val admin_id";
						edit.innerHTML="Edit user"
						edit.id=json[i]["id"];
						newRow.appendChild(edit);
						
						var deleteuser = document.createElement("TD");
						deleteuser.className="admin_val admin_id_remove";
						deleteuser.innerHTML="Remove user";
						deleteuser.id=json[i]["id"];
						newRow.appendChild(deleteuser);
						
						document.getElementById("admin_user_table").appendChild(newRow);
					}
				});
			}
			function editUserDialog(user_id)
			{
				$.post("Admin",{"action":"getuser","id":user_id,"username":"${username}","password":"${password}"}).done(function(string){
					console.log(string);
					var json = JSON.parse(string);
					openUserWindow();
					$("#user_input_username").val(json["username"]);
					$("#user_input_password").val(json["password"]);
					$("#user_input_firstname").val(json["firstname"]);
					$("#user_input_lastname").val(json["lastname"]);
					$("#user_input_email").val(json["email"]);
					$("#user_input_id").val(json["id"]);
					$("#user_submit").slideDown(0);
					$("#user_new").slideUp(0);
					$("#user_window_text").text("Edit User")
				});
				
			}
			function newUser(username,password,email,firstname,lastname,done_func)
			{
				$.post("Admin",{"action":"newuser","username":"${username}","password":"${password}","edit_username":username,"edit_password":password,"edit_email":email,"edit_firstname":firstname,"edit_lastname":lastname}).done(done_func);
			}
			function editUser(id,username,password,email,firstname,lastname,done_func)
			{
				$.post("Admin",{"action":"edituser","username":"${username}","password":"${password}","edit_username":username,"edit_id":id,"edit_password":password,"edit_email":email,"edit_firstname":firstname,"edit_lastname":lastname}).done(done_func);
			}
			$("#admin_user_table").on("click",".admin_id",function(){
				var id = $(this).attr("id");
				editUserDialog(id);
			});
			$("#admin_user_table").on("click",".admin_id_remove",function(){
				var id = $(this).attr("id");
				$.post("Admin",{"action":"deleteuser","username":"${username}","password":"${password}","id":id}).done(function(){
					refreshUsers();
				});
			});
			var modal = document.getElementById('user_window_background');
			var modalSave = document.getElementById('help_window_background');
			// Get the close Login window btn
			var closeHelpBtn = document.getElementById("closeHelp");
			var closeUserBtn = document.getElementById("closeUser");

			// When the user clicks on <span> (x), close the login window
			closeHelpBtn.onclick = function() {
				//closeLoginWindow()
			}
			$("#new_user_btn").click(function(){
				openUserWindow();
				$("#user_new").slideDown(0);
				$("#user_submit").slideUp(0);
				$("#user_window_text").text("New User")
			});
			$('#user_cancel').click(function(){
				closeUserWindow()
			});
			$('#user_new').click(function(){
				newUser($("#user_input_username").val(),$("#user_input_password").val(),$("#user_input_email").val(),$("#user_input_firstname").val(),$("#user_input_lastname").val(),function(){
					refreshUsers();
					closeUserWindow();
				});
			});
			$('#user_submit').click(function(){
				editUser($("#user_input_id").val(),$("#user_input_username").val(),$("#user_input_password").val(),$("#user_input_email").val(),$("#user_input_firstname").val(),$("#user_input_lastname").val(),function(){
					refreshUsers();
					closeUserWindow();
				});
			});
			closeUserBtn.onclick = function() {
				closeUserWindow()
			}
			window.onclick = function(event)
			{
				// Close the Login window if the user clicks outside of it
				if (event.target == modal) {
					closeUserWindow();
				}
				// Close the Save window if the user clicks outside of it
				if (event.target == modalSave) {
					//closeSaveWindow();
				}
			}
			refreshUsers();
		</script>
		
	</body>
</html>