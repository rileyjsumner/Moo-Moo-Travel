package com.dao;

import com.Bits.AirportBit;
import com.Util.DbUtil;

import java.sql.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class AirportDao {
	/*public static AirportBit GetAirportData(String code)
	{
		return new AirportBit();
	}*/
	public static int GetAirportId(String code){
		Connection con =DbUtil.getConnection();
		PreparedStatement preparedStatement;
		try {
			String sql="SELECT id FROM airports WHERE iata = ?";
			preparedStatement = con.prepareStatement(sql);
			preparedStatement.setString(1, code);
			ResultSet set = preparedStatement.executeQuery();
			if(set.next()){
				return set.getInt(1);
			}
		}
		catch (SQLException ex) {
			Logger.getLogger(UserDao.class.getName()).log(Level.SEVERE, null, ex);
		}
		return -1;
	}
	public static AirportBit FindNearbyAirport(double lat, double lng, int distance){
		Connection con =DbUtil.getConnection();
		PreparedStatement preparedStatement;
		AirportBit foundAirport = new AirportBit();
		boolean airportFound = false;
		try {
			String sql="SELECT name, lat,lng,iata,size,iso, ACOS( SIN( RADIANS( lat ) ) *"+
    	        	" SIN( RADIANS( ? ) ) + COS( RADIANS( lat ) )* COS( RADIANS( ? )) *"+
    	        			" COS( RADIANS( lng ) - RADIANS( ? )) ) * 6380 AS"+
    	        	" distance FROM airports WHERE ACOS( SIN( RADIANS( lat ) ) * SIN( RADIANS( ? ) ) +"+
    	        			" COS( RADIANS( lat ) )* COS( RADIANS( ? )) * COS( RADIANS( lng ) - RADIANS( ? )) ) *"+
    	        	" 6380 < ? ORDER BY distance";
			preparedStatement = con.prepareStatement(sql);
			preparedStatement.setDouble(1, lat);
			preparedStatement.setDouble(2, lat);
			preparedStatement.setDouble(3, lng);
			preparedStatement.setDouble(4, lat);
			preparedStatement.setDouble(5, lat);
			preparedStatement.setDouble(6, lng);
			preparedStatement.setInt(7, distance);
			ResultSet sqlResults = preparedStatement.executeQuery();
			ArrayList<AirportBit> airports = new ArrayList<AirportBit>();
			ArrayList<AirportBit> airports_unnamed = new ArrayList<AirportBit>();
			while(sqlResults.next())
			{
				if(sqlResults.getString("name")=="")
				{
					airports_unnamed.add(new AirportBit(sqlResults.getString("name"),
						sqlResults.getDouble("lat"),
						sqlResults.getDouble("lng"),
						sqlResults.getString("iata"),
						sqlResults.getString("iso"),
						sqlResults.getInt("size"),
						sqlResults.getDouble("distance")
						));
				}
				else
				{
					airports.add(new AirportBit(sqlResults.getString("name"),
						sqlResults.getDouble("lat"),
						sqlResults.getDouble("lng"),
						sqlResults.getString("iata"),
						sqlResults.getString("iso"),
						sqlResults.getInt("size"),
						sqlResults.getDouble("distance")
						));
				}
			}
			// Debug / check for international airports
			for(AirportBit airport : airports)
			{
				if(airport.size==3)
				{
					airportFound=true;
					foundAirport=airport;
					break;
				}
			}
			// Check for large airports if no large one found
			if(!airportFound)
			{
				for(AirportBit airport : airports)
				{
					if(airport.size==2)
					{
						airportFound=true;
						foundAirport=airport;
						break;
					}
				}
			}
			// Check for medium airports if no large one found
			if(!airportFound)
			{
				for(AirportBit airport : airports)
				{
					if(airport.size==1)
					{
						airportFound=true;
						foundAirport=airport;
						break;
					}
				}
			}
			// Check for small airports if no medium one found
			if(!airportFound)
			{
				for(AirportBit airport : airports)
				{
					airportFound=true;
					foundAirport=airport;
					break;
				}
			}
			// Resort to unnamed airports
			// check for large unnamed airports
			if(!airportFound){
				for(AirportBit airport : airports)
				{
					if(airport.size==2)
					{
						airportFound=true;
						foundAirport=airport;
						foundAirport.name="Unnamed Airport";
						break;
					}
				}
			}
			// Check for medium unnamed airports if no large one found
			if(!airportFound)
			{
				for(AirportBit airport : airports)
				{
					if(airport.size==1)
					{
						airportFound=true;
						foundAirport=airport;
						foundAirport.name="Unnamed Airport";
						break;
					}
				}
			}
			// Check for small unnamed airports if no medium one found
			if(!airportFound)
			{
				for(AirportBit airport : airports)
				{
					airportFound=true;
					foundAirport=airport;
					foundAirport.name="Unnamed Airport";
					break;
				}
			}
			return foundAirport;
		}
		catch (SQLException ex) {
			Logger.getLogger(UserDao.class.getName()).log(Level.SEVERE, null, ex);
		}
		return new AirportBit();
	}
}