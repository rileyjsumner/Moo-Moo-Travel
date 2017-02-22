package com.Util;

import java.io.IOException;
import java.util.*;
// ADD THIS PLUGIN UNDER "HELP" -> "INSTALL NEW SOFTWARE"
// THEN DO "ADD..."
// SET THE URL TO:
//http://repo1.maven.org/maven2/.m2e/connectors/m2eclipse-mavenarchiver/0.17.2/N/LATEST/
//import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
//import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.qpxExpress.QPXExpressRequestInitializer;
import com.google.api.services.qpxExpress.QPXExpress;
import com.google.api.services.qpxExpress.model.PassengerCounts;
import com.google.api.services.qpxExpress.model.TripOption;
import com.google.api.services.qpxExpress.model.TripOptionsRequest;
import com.google.api.services.qpxExpress.model.TripsSearchRequest;
import com.google.api.services.qpxExpress.model.SliceInput;
import com.google.api.services.qpxExpress.model.TimeOfDayRange;
import com.google.api.services.qpxExpress.model.TripsSearchResponse;

public class FlightSearchObject {
	
	private static final String API_KEY = "AIzaSyCRjhH9N48NhWnwxBlX6Jii4a7DFp4NJ8o";
	
	/** instance of the HTTP transport. */
	private static HttpTransport httpTransport;
	
	/** instance of the JSON factory. */
	private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
	
	/***
	 * 
	 * @param Adults Number of Adults riding
	 * @param Children Number of Children riding
	 * @param Seniors Number of Seniors riding
	 * @param InfantSeat Number of Infants riding in a seat
	 * @param InfantLap Number of Infants riding in a Lap
	 * @param Origin Three Letter description of the origin city
	 * @param Destination Three Letter description of the destination city
	 * @param Date Date of flight in YYYY-MM-DD
	 * @param time 0 -> AnyTime, 1 -> Morning, 2 -> Afternoon, 3 -> Evening 
	 * @param time2 0 -> AnyTime, 1 -> Morning, 2 -> Afternoon, 3 -> Evening 
	 */
	public static String FlightSearch(int Adults,int Children,int Seniors,int InfantSeat,int InfantLap,String Origin,String Destination,String Date,String ReturnDate, int time, int time2)
	{
		try 
		{
			System.out.println("ORIGIN: "+Origin+"\nDest: "+Destination+"\nDate: "+Date+"\nRetDate: "+ReturnDate+"\nTime: "+time+"\nTime2: "+time2);
			//get the httpTransport from google
			httpTransport = GoogleNetHttpTransport.newTrustedTransport();
			
			//Set the passengers
			PassengerCounts passengers= new PassengerCounts();
			passengers.setAdultCount(Adults);
			passengers.setSeniorCount(Seniors);
			passengers.setChildCount(Children);
			passengers.setInfantInLapCount(InfantLap);
			passengers.setInfantInSeatCount(InfantSeat);
			
			//Set up the main flight
			List<SliceInput> slices = new ArrayList<SliceInput>();
			
			SliceInput slice = new SliceInput();
			TimeOfDayRange depTime=new TimeOfDayRange();
			if(time==1){
				depTime.setEarliestTime("05:00");
				depTime.setLatestTime("11:59");
				slice.setPermittedDepartureTime(depTime);
			}
			else if(time==2){
				depTime.setEarliestTime("12:00");
				depTime.setLatestTime("17:59");
				slice.setPermittedDepartureTime(depTime);
			}
			else if(time==3){
				depTime.setEarliestTime("12:00");
				depTime.setLatestTime("17:59");
				slice.setPermittedDepartureTime(depTime);
			}
			slice.setOrigin(Origin); 
			slice.setDestination(Destination); 
			slice.setDate(Date);
			slices.add(slice);
			
			//Set up the return flight
			SliceInput slice2 = new SliceInput();
			TimeOfDayRange returnTime=new TimeOfDayRange();
			if(time2==1){
				returnTime.setEarliestTime("05:00");
				returnTime.setLatestTime("11:59");
				slice2.setPermittedDepartureTime(returnTime);
			}
			else if(time2==2){
				returnTime.setEarliestTime("12:00");
				returnTime.setLatestTime("17:59");
				slice2.setPermittedDepartureTime(returnTime);
			}
			else if(time2==3){
				returnTime.setEarliestTime("12:00");
				returnTime.setLatestTime("17:59");
				slice2.setPermittedDepartureTime(returnTime);
			}
			slice2.setOrigin(Destination); 
			slice2.setDestination(Origin); 
			slice2.setDate(ReturnDate);
			
			slices.add(slice2);
			
			//Combine everything into an options class
			TripOptionsRequest request= new TripOptionsRequest();
			request.setSolutions(10);
			request.setPassengers(passengers);
			request.setSlice(slices);
			
			//Add it to the request
			TripsSearchRequest parameters = new TripsSearchRequest();
			parameters.setRequest(request);
			//System.out.println(parameters.toPrettyString());
			// add it to the QPX object
			QPXExpress qpXExpress= new QPXExpress
					.Builder(httpTransport, JSON_FACTORY, null)
					.setApplicationName("Moo Moo Travel")
					.setGoogleClientRequestInitializer(new QPXExpressRequestInitializer(API_KEY))
					.build();
			
			// Execute the request
			TripsSearchResponse results= qpXExpress.trips().search(parameters).execute();
			//System.out.println(results);
			//Make it readable
			List<TripOption> tripResults=results.getTrips().getTripOption();
			
			//System.out.println("PRETTYSTRING:\n"+results.toPrettyString());
			if(tripResults==null){
				System.out.println("NO FLIGHTS FOUND");
				return "{\"kind\" : \"empty\"}";
			}
			return results.toPrettyString();
			
		}
		//....Aaaand you fail
		catch (IOException e)
		{
			System.err.println("FLIGHTFAIL:\n"+e.getMessage());
		}
		catch (Throwable t)
		{
			System.err.println("FLIGHTFAIL:\n"+t.getMessage());
			t.printStackTrace();
		}
		// Just return an empty default JSON
		return "{\"kind\" : \"empty\"}";
	}
	public static double distance(double lat1, double lng1, double lat2, double lng2)
	{
		int r = 6371; // average radius of the earth in km
		double dLat = Math.toRadians(lat2 - lat1);
		double dLon = Math.toRadians(lng2 - lng1);
		double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) 
			* Math.sin(dLon / 2) * Math.sin(dLon / 2);
		double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		double d = r * c;
		return d;
	}
}
