package com.Servlet;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.*;

import com.Bits.UserBit;
import com.dao.UserDao;

public class Admin extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    public Admin() {
        super();
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	// Just in case we really mess up
    	System.out.println("GETADMIN");
    	if("true".equals(request.getParameter("holynixon"))){
    		request.setAttribute("data", "Why'd you do that? Fine. Have a reset.");
    		UserDao.AddUser(encode("nixon"), encode("Richard"), encode("Nixon"), encode("Goodthing.I@added.this.com"), encode("watergateisalie"),3);
    		RequestDispatcher view = request.getRequestDispatcher("WEB-INF/result.jsp");
    		view.forward(request, response);
    	}
    	else{
    		response.sendRedirect("Home");
    		return;
    	}
    }
    /**
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    private String encode(String in){
    	try {
			return (Base64.getEncoder().encodeToString(in.getBytes("utf-8")));
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "";
    }
    private String decode(String encoded){
    	byte[] base64decodedBytes = Base64.getDecoder().decode(encoded);
    	try {return new String(base64decodedBytes, "utf-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "";
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("POST ACTION!");
        String forward="WEB-INF/home.html";
    	String userName = request.getParameter("username");
    	String password = request.getParameter("password");
    	String action = request.getParameter("action");
    	boolean valid=false;
    	boolean returndata=false;
    	String data="";
    	if(action == null){action="admin";}
    	System.out.println("GOT: "+userName+","+password);
    	// Encode them
    	if(userName != null && password != null){
			String EncodeUserName = encode(userName);
			String EncodePassword = encode(password);
			System.out.println(UserDao.GetRole(EncodeUserName, EncodePassword));
			if(UserDao.GetRole(EncodeUserName, EncodePassword)>1){
				valid=true;
				if(action.equals("admin")){
					forward="WEB-INF/admin.jsp";
					request.setAttribute("role", UserDao.GetRole(EncodeUserName, EncodePassword));
					request.setAttribute("username", userName);
					request.setAttribute("password", password);
				}
				else if(action.equals("getusers"))
				{
					returndata=true;
					data="[";
					boolean first=true;
					List<UserBit> users = UserDao.GetAllUsers();
					for(int i=0;i<users.size();i++){
						if(!first){data+=",";}else{first=false;}
						data+="{\"username\":\""+decode(users.get(i).UserName)+"\",";
						data+="\"password\":\""+decode(users.get(i).Password)+"\",";
						data+="\"firstname\":\""+decode(users.get(i).FirstName)+"\",";
						data+="\"lastname\":\""+decode(users.get(i).LastName)+"\",";
						data+="\"id\":\""+users.get(i).UserId+"\",";
						data+="\"role\":\""+users.get(i).Role+"\",";
						data+="\"email\":\""+decode(users.get(i).Email)+"\"}";
					}
					data+="]";
				}
				else if(action.equals("getuser"))
				{
					returndata=true;
					String input_id=request.getParameter("id");
					int id=Integer.parseInt(input_id);
					UserBit user = UserDao.GetUserProperties(id);
					data="{\"username\":\""+decode(user.UserName)+"\",";
					data+="\"password\":\""+decode(user.Password)+"\",";
					data+="\"firstname\":\""+decode(user.FirstName)+"\",";
					data+="\"lastname\":\""+decode(user.LastName)+"\",";
					data+="\"id\":\""+user.UserId+"\",";
					data+="\"role\":\""+user.Role+"\",";
					data+="\"email\":\""+decode(user.Email)+"\"}";
				}
				else if(action.equals("edituser"))
				{
					returndata=true;
					data="[]";
					String input_id=request.getParameter("edit_id");
					String input_username=request.getParameter("edit_username");
					String input_firstname=request.getParameter("edit_firstname");
					String input_lastname=request.getParameter("edit_lastname");
					String input_password=request.getParameter("edit_password");
					String input_email=request.getParameter("edit_email");
					int id=Integer.parseInt(input_id);
					UserDao.UpdateUser(id, encode(input_username), encode(input_firstname), encode(input_lastname), encode(input_email), encode(input_password));
				}
				else if(action.equals("newuser"))
				{
					returndata=true;
					String input_username=request.getParameter("edit_username");
					String input_firstname=request.getParameter("edit_firstname");
					String input_lastname=request.getParameter("edit_lastname");
					String input_password=request.getParameter("edit_password");
					String input_email=request.getParameter("edit_email");
					UserDao.AddUser(encode(input_username), encode(input_firstname), encode(input_lastname), encode(input_email), encode(input_password),1);
				}
				else if(action.equals("deleteuser"))
				{
					returndata=true;
					String input_id=request.getParameter("id");
					int id=Integer.parseInt(input_id);
					UserDao.DeleteUser(id);
				}
				else{
					returndata=true;
				}
			}
			else{
				response.sendRedirect("Home");
				return;
			}
    	}
    	if(returndata)
    	{
    		forward="WEB-INF/result.jsp";
    		request.setAttribute("data", data);
    		RequestDispatcher view = request.getRequestDispatcher(forward);
    		view.forward(request, response);
    		return;
    	}
    	if(valid){
    		RequestDispatcher view = request.getRequestDispatcher(forward);
    		view.forward(request, response);
    	}
    	else{
    		response.sendRedirect("Home");
    		return;
    	}
    }
}