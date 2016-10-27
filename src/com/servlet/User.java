package com.servlet;

import com.dao.*;
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
        
        Cookie[] cookies = request.getCookies();
        String sessionName = null;
        String sessionPass = null;
        
        if (action!=null){
            System.out.println("Get action is: " + action);
        }
        
        for (Cookie cookie : cookies) {
            if(cookie.getName().equals("JSESSION_USERNAME")){
                sessionName=cookie.getValue();
            }
            else if(cookie.getName().equals("JSESSION_PASSWORD")){
                sessionPass=cookie.getValue();
            }
        }
        int Role =-1;
        int UserId =-1;
        if(sessionPass!=null && sessionName != null){
            Role = UserDao.GetRole(sessionName, sessionPass);
            UserId = UserDao.GetUserId(sessionName);
            forward = "/login.jsp";
            //Refresh cookies
            response.addCookie(new Cookie("JSESSION_USERNAME",sessionName));
            response.addCookie(new Cookie("JSESSION_PASSWORD",sessionPass));
        }
        else{
            forward = "/Home.jsp";
        }
        if("login".equals(action)){
            request.setAttribute("buttons", LessonDao.getButtonBean());
            forward = "/Home.jsp";
        }
        else if("createAccount".equals(action)){
            request.setAttribute("buttons", LessonDao.getButtonBean());
            forward = "/createAccount.jsp";
        }
        else if(Role == -1 || UserId == -1){
            request.setAttribute("buttons", LessonDao.getButtonBean());
            forward = "/login.jsp";
        }
        else if (action==null){
            forward = "/login-failed.html";
        }
        else if (action.equals("crud")){
            request.setAttribute("buttons", LessonDao.getButtonBean());
            request.setAttribute("general", new GeneralBean(sessionName,Role));
            if(Role>1){
                String CRUDaction = request.getParameter("crudaction");
                if(CRUDaction == null || CRUDaction.equals("home")){
                    forward = "crud/crud.jsp";
                }
                else if(CRUDaction.equals("lessons")){
                    forward = "crud/lessons.jsp";
                    
                }
                else if(CRUDaction.equals("progress")){
                    forward = "crud/progress.jsp";
                    
                }
                else if(CRUDaction.equals("questions")){
                    forward = "crud/questions.jsp";
                    request.setAttribute("questions", QuestionDao.getAllQuestions());
                }
                else if(CRUDaction.equals("editquestionform")){
                    forward = "crud/edit.jsp";
                    request.setAttribute("editList",QuestionDao.GetQuestion(Integer.parseInt(request.getParameter("Id"))));
                    request.setAttribute("editType", "Question");
                }
                else if(CRUDaction.equals("deletequestion")){
                    forward = "crud/questions.jsp";
                    QuestionDao.deleteQuestion(Integer.parseInt(request.getParameter("Id")));
                    request.setAttribute("questions", QuestionDao.getAllQuestions());
                }
                else if(CRUDaction.equals("users")){
                    forward = "crud/users.jsp";
                    request.setAttribute("users", UserDao.GetAllUsers());
                }
                else if(CRUDaction.equals("adduserform")){
                    forward = "crud/add.jsp";
                    request.setAttribute("addList",Arrays.asList("Username","First Name","Last Name","Password","Email","Role"));
                    request.setAttribute("addType", "User");
                }
                else if(CRUDaction.equals("edituserform")){
                    forward = "crud/edit.jsp";
                    request.setAttribute("editList",UserDao.GetUserProperties(Integer.parseInt(request.getParameter("userId"))));
                    request.setAttribute("editType", "User");
                }
                else if(CRUDaction.equals("deleteuser")){
                    forward = "crud/users.jsp";
                    UserDao.DeleteUser(Integer.parseInt(request.getParameter("userId")));
                }
                else{
                    forward = "crud/crud.jsp";
                }
            }
            else{
                forward = "/permission-denied.jsp";
            }
            
        }
        else if (action.equals("done") || action.equals("next")){
            String lessonS = request.getParameter("lesson");
            String gr = lessonS.substring(0, 1);
            String ls = lessonS.substring(2, 3);
            int grade = Integer.parseUnsignedInt(gr);
            int lesson = Integer.parseUnsignedInt(ls);
            request.setAttribute("buttons", LessonDao.getButtonBean());
            request.setAttribute("general", new GeneralBean(sessionName,Role));
            ProgressDao.safeMakeProgress(UserId, grade, lesson);
            int prog = ProgressDao.getProgress(UserId, grade, lesson);
            int max = LessonDao.getLessonPages(grade,lesson);
            System.out.println("MAX:"+max);
            int MaxPractice = LessonDao.getMaxPractice(grade,lesson); System.out.println(MaxPractice + max);
            int helpNeeded=0;
            forward="/lesson.jsp";
            if(action.equals("done")){
                if(prog<max){
                    prog++;
                    ProgressDao.SetProgress(UserId, grade, lesson, prog);
                }
                else{
                    String answer = request.getParameter("answer");
                    if(answer.equals(AnswersDao.getAnswer(UserId, grade, lesson))){
                        prog++;
                        ProgressDao.SetProgress(UserId, grade, lesson, prog);
                    }
                    else
                    {
                        helpNeeded = AnswersDao.getPageType(UserId, grade, lesson);
                    }
                }
            }
            if(prog<max){
                LessonBean bean = LessonDao.getLessonPage(grade, lesson, prog+1);
                request.setAttribute("data", bean);
            }
            else
            {
                if (helpNeeded!=0){
                    HelpBean bean;
                    if(HelpDao.hasHelpPage(helpNeeded)){
                        bean = HelpDao.getHelpPage(helpNeeded,UserId);
                    }
                    else{
                        bean = new HelpBean();
                        bean.Grade = grade;
                        bean.Lesson = lesson;
                        bean.CorrectAns = AnswersDao.getAnswer(UserId, grade, lesson);
                        bean.Help = "<p>Sorry, but we couldn't find any help content for that question.</p><p>You might have to try this one on your own.</p>";
                        bean.Title = LessonDao.getLessonText(grade, lesson);
                    }
                    bean.UserAnswer = request.getParameter("answer");
                    request.setAttribute("data", bean);
                    request.setAttribute("redir", grade+"."+lesson);
                    forward = "/help.jsp";
                }
                else{
                    request.setAttribute("data", Questions.getNewQuestion(UserId, grade, lesson));
                }
            }
            
        }
        else if (action.equalsIgnoreCase("home")){
            request.setAttribute("buttons", LessonDao.getButtonBean());
            request.setAttribute("general", new GeneralBean(sessionName,Role));
            forward="/Home.jsp";
        }
        else if (action.equals("logout")){
            response.addCookie(new Cookie("JSESSION_USERNAME",""));
            response.addCookie(new Cookie("JSESSION_PASSWORD",""));
            forward = "/login.jsp";
        }
        
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
        
        String sessionName = null;
        String sessionPass = null;
        
        Enumeration<String> test = request.getParameterNames();
        String h="";
        
        while (test.hasMoreElements()){
            h= test.nextElement();
            System.out.println("PARAMETER: "+h+" : "+request.getParameter(h));
        }
        
    	String action = request.getParameter("action");
    	System.out.println("Post action is: " + action);
        
        String forward="/login-failed.html";
        
        if (action!=null){
            System.out.println("Get action is: " + action);
        }
        for (Cookie cookie : cookies) {
            if(cookie.getName().equals("JSESSION_USERNAME")){
                sessionName=cookie.getValue();
            }
            else if(cookie.getName().equals("JSESSION_PASSWORD")){
                sessionPass=cookie.getValue();
            }
        }
        int Role =-1;
        int UserId =-1;
        if(sessionPass!=null && sessionName != null){
            Role = UserDao.GetRole(sessionName, sessionPass);
            UserId = UserDao.GetUserId(sessionName);
            forward = "/login.jsp";
        }
        else{
            forward = "/Home.jsp";
        }
        //LOGIC HERE
        
        if(action.equals("Login")){
            forward="/login.jsp";
            String Username=request.getParameter("UserName");
            String Password = request.getParameter("Password");
            Connection con= dbutil.getConnection();
            try {
                PreparedStatement preparedStatement = con
                        .prepareStatement("SELECT Userid from users WHERE Username=? AND Password=?");
                // Parameters start with 1
                preparedStatement.setString(1, Username);
                preparedStatement.setString(2, Password);
                ResultSet set= preparedStatement.executeQuery();
                if(set.first()){
                    int id = set.getInt(1);
                    response.addCookie(new Cookie("JSESSION_USERNAME",Username));
                    response.addCookie(new Cookie("JSESSION_PASSWORD",Password));
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
    		
    	}
    	else if(action.equals("CreateAccount")){
            String Username=request.getParameter("UserName");
            String FirstName=request.getParameter("FirstName");
            String LastName=request.getParameter("LastName");
            String Email=request.getParameter("Email");
            String Password=request.getParameter("Password");
            Connection con= dbutil.getConnection();
            UserDao.SafeAddUser(Username, FirstName, LastName, Email, Password,0);
            forward="/Home.jsp";
    	} // Things that require ID :
        else if(Role == -1 || UserId == -1){
            forward="/Home.jsp";
        }
        else if(action.equals("crud")){
            request.setAttribute("buttons", LessonDao.getButtonBean());
            request.setAttribute("general", new GeneralBean(sessionName,Role));
            if(Role>1){
                String CRUDaction = request.getParameter("crudaction");
                if(CRUDaction == null || CRUDaction.equals("home")){
                    forward = "crud/crud.jsp";
                }
                else if(CRUDaction.equals("editUser")){
                    int editUserID = Integer.parseInt(request.getParameter("editUserID"));
                    String editUserName = request.getParameter("editUsername");
                    String editFirstName = request.getParameter("editFirst Name");
                    String editLastName = request.getParameter("editLast Name");
                    String editPassword = request.getParameter("editPassword");
                    String editEmail = request.getParameter("editEmail");
                    int editRole=0;
                    try{
                        editRole = Integer.parseInt(request.getParameter("editRole"));
                    }
                    catch (NumberFormatException ex){
                        
                    }
                    UserDao.UpdateUser(editUserID,editUserName, editFirstName, editLastName, editEmail, editPassword, editRole);
                    forward="crud/users.jsp";
                }
                else if(CRUDaction.equals("editQuestion")){
                    int editUserID = Integer.parseInt(request.getParameter("editUserID"));
                    String editUserName = request.getParameter("editUsername");
                    String editFirstName = request.getParameter("editFirst Name");
                    String editLastName = request.getParameter("editLast Name");
                    String editPassword = request.getParameter("editPassword");
                    String editEmail = request.getParameter("editEmail");
                    int editRole=0;
                    try{
                        editRole = Integer.parseInt(request.getParameter("editRole"));
                    }
                    catch (NumberFormatException ex){
                        
                    }
                    UserDao.UpdateUser(editUserID,editUserName, editFirstName, editLastName, editEmail, editPassword, editRole);
                    forward="crud/users.jsp";
                }
                else if(CRUDaction.equals("addUser")){
                    String editUserName = request.getParameter("addUsername");
                    String editFirstName = request.getParameter("addFirst Name");
                    String editLastName = request.getParameter("addLast Name");
                    String editPassword = request.getParameter("addPassword");
                    String editEmail = request.getParameter("addEmail");
                    int editRole=0;
                    try{
                        editRole = Integer.parseInt(request.getParameter("addRole"));
                    }
                    catch (NumberFormatException ex){
                        
                    }
                    UserDao.SafeAddUser(editUserName, editFirstName, editLastName, editEmail, editPassword,editRole);
                    forward="crud/users.jsp";
                }
                else{
                    forward = "crud/crud.jsp";
                }
            }
            else{
                forward = "/permission-denied.jsp";
            }
        }
    	RequestDispatcher view = request.getRequestDispatcher(forward);
        view.forward(request, response);
    }
}