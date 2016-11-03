<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- T1RLAQJGdnCDOQ6OmZYAizflLVy/B6i0KBDMC0qIgK2vnkmdnTfIVxGrAADA+DdEb1g4H7HhAF8j82stC6bWzRDhWTes630/GDGtjQ6A+vCwtN13i2qn+xVWdhb1EfLmot3x+qLHhR11wmkWsWk7TKF0dO+Ij0C0C0FBmOngNgpwmxrhUDpjc0FGtUNjIKRlEVOC0RHiwXOxKQ7iUm/Wb+DFxkSWGXViw8+S+eepec7829RQVtpzkUIh06ZLdtAdtypqIIS4RJ1IdsKjXXQMNXiyfooJ/GUbrPyukFb25wqpYuT7mGR3b4mnLD4i -->
<html>
    <head>
        <title>Home</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel = "stylesheet" href = "main.css">
        <script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src = "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    </head>
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
                <div class ="text-center">
                    <h2 style="font-size: 210%"></h2>
                    <p style="font-size: 150%"></p>
                    <p style="font-size: 150%"></p>
                    <p style="font-size: 110%">Moo Moo Travel was created by Team A: Sam Scheidecker and Riley Sumner</p>
                    <p style="font-size: 110%">Anoka's BPA Chapter Number 30-0005</p>
                </div>
            </div>
        </div>
        
    </body>
</html>