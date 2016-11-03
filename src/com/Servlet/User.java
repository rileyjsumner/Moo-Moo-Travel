package com.Servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Enumeration;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.*;

import com.dbutil.dbutil;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class User extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    public User() {
        super();
    }
    /**
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String forward="/login-failed.html";
        String action = request.getParameter("action");
        
        if (action!=null){
            System.out.println("Get action is: " + action);
        }
        if("home".equals(action)){
            forward = "/home.jsp";
        }
        else{
            forward = "/home.jsp";
        }
        forward = "/home.jsp";
        RequestDispatcher view = request.getRequestDispatcher(forward);
        view.forward(request, response);
    }
    /**
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Cookie[] cookies = request.getCookies();
        
        Enumeration<String> test = request.getParameterNames();
        String h="";
        
        while (test.hasMoreElements()){
            h= test.nextElement();
            System.out.println("PARAMETER: "+h+" : "+request.getParameter(h));
        }
        
    	String action = request.getParameter("action");
    	System.out.println("Post action is: " + action);
        
        String forward="/home.jsp";
        
        //LOGIC HERE
        
        if(action.equals("Home")){
            forward="/home.jsp";
    	}
    	RequestDispatcher view = request.getRequestDispatcher(forward);
        view.forward(request, response);
    }
}