package com.Bits;
public class AirportBit
{
	public String name;
	public double lat;
	public double lng;
	public String code;
	public String country;
	public int size;
	public double distance;
	
	public AirportBit()
	{
		name="";
		lat=0;
		lng=0;
		code="";
		size=0;
	}
	public AirportBit(String _name,double _lat,double _lng,String _code,String _country,int _size,double _distance)
	{
		name=_name;
		lat=_lat;
		lng=_lng;
		code=_code;
		country=_country;
		size=_size;
		distance=_distance;
	}
}
