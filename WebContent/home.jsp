<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
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
                <h1>Moo-Moo Math</h1>
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
                    <h2 style="font-size: 210%">Welcome to Moo Moo Math!</h2>
                    <p style="font-size: 150%">Select your grade, and the lesson you would like to work on!</p>
                    <p style="font-size: 150%">We will run you through a short lesson on how to do the math, and quiz you on your abilities</p>
                    <img src="pics/pig.png" alt="Oink!"/>
                    <p style="font-size: 110%">Moo Moo Math was created by Team A: Sam Scheidecker and Riley Sumner</p>
                    <p style="font-size: 110%">Anoka's BPA Chapter Number 30-0005</p>
                </div>
            </div>
        </div>
        
    </body>
</html>