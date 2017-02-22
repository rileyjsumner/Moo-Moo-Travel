package com.Servlet;

import com.dao.UserDao;
//import com.Util.DbUtil;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.Enumeration;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import com.Bits.UserBit;

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
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        UserBit user= new UserBit();
    	String action = request.getParameter("action");
    	String result="{\"result\":\"false\"}";
    	String decode = request.getParameter("decode");
    	String encode = request.getParameter("encode");
    	String userName=request.getParameter("username");
		String password=request.getParameter("password");
		System.out.println("Got: "+userName+", "+password);
    	if("true".equals(encode)){
    		// Encode them
    		userName = Base64.getEncoder().encodeToString(userName.getBytes("utf-8"));
			password = Base64.getEncoder().encodeToString(password.getBytes("utf-8"));
			System.out.println("Encoding, now: "+userName+", "+password);
    	}
    	if("login".equals(action))
    	{
    		System.out.println("Logging in");
    		// It's a valid user
    		if(UserDao.GetRole(userName, password)!=-1)
    		{
    			System.out.println("Valid user");
    			if("true".equals(decode)){
    	    		// Decode them
    				try{
    	    			byte[] base64decodedBytes = Base64.getDecoder().decode(userName);
    	            	userName=  new String(base64decodedBytes, "utf-8");
    	    			
    	            	base64decodedBytes = Base64.getDecoder().decode(password);
    	            	password=  new String(base64decodedBytes, "utf-8");
    	            	
    	            	System.out.println("Decoding, now: "+userName+", "+password);
    	    		}
    	    		catch(UnsupportedEncodingException e)
    	    		{
    	    			System.out.println("Error :" + e.getMessage());
    	    		}
    	    	}
    			result="{\"result\":\"true\","
    					+ "\"username\":\""+userName+"\","
    					+ "\"password\":\""+password+"\"}";
    		}
    	}
    	else if("getrole".equals(action))
    	{
    		result="{\"role\":\""+UserDao.GetRole(userName, password)+"\"}";
    	}
    	else if("logout".equals(action))
    	{
    		result="{\"result\":\"true\","
					+ "\"username\":\"\","
					+ "\"password\":\"\"}";
    	}
    	else if("getuser".equals(action))
    	{
        	int authLevel=-1;
        	int userId=0;
        	if(userName!="" && password !="")
        	{
        		//Decode them
        		try{
        			byte[] base64decodedBytes = Base64.getDecoder().decode(userName);
                	userName=  new String(base64decodedBytes, "utf-8");
        			
                	base64decodedBytes = Base64.getDecoder().decode(password);
                	password=  new String(base64decodedBytes, "utf-8");
                	userId = UserDao.GetUserId(userName);
                	authLevel=UserDao.GetRole(userName, password);
        		}
        		catch(UnsupportedEncodingException e)
        		{
        			System.out.println("Error :" + e.getMessage());
        		}
        	}
        	if(authLevel!=-1)
        	{
        		user = UserDao.GetUserProperties(userId);
        	}
        	else{
        		user.Role=-1;
        		user.UserName="Guest";
        		user.FirstName="Guest";
        	}
    	}
    	else{
    		// Why did you even come here?
    	}
    	System.out.println("RETURNING:"+result);
    	request.setAttribute("data", result);
        RequestDispatcher view = request.getRequestDispatcher("/WEB-INF/result.jsp");
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
        //Cookie[] cookies = request.getCookies();
        System.out.println("POST ACTION!");
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
        
        if(action.equals("home")){
            forward="/home.jsp";
    	}
    	RequestDispatcher view = request.getRequestDispatcher(forward);
        view.forward(request, response);
    }
}