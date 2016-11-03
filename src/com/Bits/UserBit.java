package com.Bits;
/**
 * @author owner
 */
public class UserBit {
    public int UserId;
    public String UserName;
    public String FirstName;
    public String LastName;
    public String Password;
    public String Email;
    public int Role;
    public UserBit(){
        
    }
    public int GetUserId(){
        return UserId;
    }
    public String GetUserName(){
        return UserName;
    }
    public String GetFirstName(){
        return FirstName;
    }
    public String GetLastName(){
        return LastName;
    }
    public String GetPassword(){
        return Password;
    }
    public String GetEmail(){
        return Email;
    }
    public String GetRole(){
        if(Role==2){
            return "Admin";
        }
        else{
            return "User";
        }
    }
}
