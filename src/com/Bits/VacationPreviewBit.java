package com.Bits;
/**
 * @author owner
 */
public class VacationPreviewBit {
	public String name;
	public String origin;
	public String destination;
	public String date;
	public String returnDate;
	public VacationPreviewBit()
	{
		name="";
		origin="";
		destination="";
		date="";
		returnDate="";
	}
	public VacationPreviewBit(String _name,String _origin,String _destination,String _date,String _dateReturn)
	{
		name=_name;
		origin=_origin;
		destination=_destination;
		date=_date;
		returnDate=_dateReturn;
	}
}
