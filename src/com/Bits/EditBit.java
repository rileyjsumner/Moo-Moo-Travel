package com.Bits;
/**
 * @author owner
 */
public class EditBit {
    public String Value;
    public String Name;
    public boolean Edit;
    public EditBit(){
        
    }
    public EditBit(String name,String value,boolean edit){
        Name= name;
        Value=value;
        Edit = edit;
    }
    public boolean CanEdit(){
        return Edit;
    }
    public String GetValue(){
        return Value;
    }
    public String GetName(){
        return Name;
    }
}