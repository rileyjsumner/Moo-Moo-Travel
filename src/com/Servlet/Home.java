package com.Servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Enumeration;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.*;

import com.DbUtil.DbUtil;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class Home extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    public Home() {
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
        URL url;
        InputStream is = null;
        BufferedReader br;
        String line;
        String data="";
        System.out.println("Nixon Kek");
        try {
            url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyDFnRgp5wG3WNEKiLZg8Cjk5vjSyvL86_8");
            is = url.openStream();  // throws an IOException
            br = new BufferedReader(new InputStreamReader(is));

            while ((line = br.readLine()) != null) {
                data += line + "\n";
                System.out.println(line);
            }
        } catch (MalformedURLException mue) {
             mue.printStackTrace();
        } catch (IOException ioe) {
             ioe.printStackTrace();
        } finally {
            try {
                if (is != null) is.close();
            } catch (IOException ioe) {
                // nothing to see here
            }
        }
        if (action!=null){
            System.out.println("Get action is: " + action);
        }
        if("home".equals(action)){
            forward = "/home.jsp";
        }
        else{
            forward = "/home.jsp";
        }
        response.addHeader("data", data);
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
        
        if(action.equals("home")){
            forward="/home.jsp";
    	}
    	RequestDispatcher view = request.getRequestDispatcher(forward);
        view.forward(request, response);
    }
}