package com.dao;

//import com.Bits.UserBit;
import com.Bits.VacationPreviewBit;
import com.Util.DbUtil;

import java.sql.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class VacationDao {
	public static boolean SaveVacation(int user_id,String name,int origin_airport_id,int destination_airport_id,String departure_date,String return_date,int flight_adults,int flight_children,int flight_seniors,int flight_infants_lap,int flight_infants_seat,int vac_custom,double vac_lat,double vac_lng,String selected_flight_id,String selected_hotel_id,String selected_car_id){
		Connection con =DbUtil.getConnection();
		PreparedStatement preparedStatement = null;
		try {
			preparedStatement = con.prepareStatement("INSERT INTO vacations (name,user_id,origin_airport_id,destination_airport_id,departure_date,return_date,flight_adults,flight_children,flight_seniors,flight_infants_lap,flight_infants_seat,vac_custom,vac_lat,vac_lng,selected_flight_id,selected_hotel_id,selected_car_id) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? )");

			preparedStatement.setString(1, name);//,NULL -- user_id - IN int(11)
			preparedStatement.setInt(2, user_id);//,NULL -- user_id - IN int(11)
			if(origin_airport_id== -1){preparedStatement.setNull(3, 0);}else{
			preparedStatement.setInt(3, origin_airport_id);}//,0   -- origin_airport_id - IN int(11)
			if(destination_airport_id== -1){preparedStatement.setNull(4, 0);}else{
			preparedStatement.setInt(4, destination_airport_id);}//,0   -- destination_airport_id - IN int(11)
			if(departure_date==""){preparedStatement.setNull(5, 0);}else{
			preparedStatement.setString(5, departure_date);}//,''  -- departure_date - IN date
			if(return_date==""){preparedStatement.setNull(6, 0);}else{
			preparedStatement.setString(6, return_date);}//,''  -- return_date - IN date
			preparedStatement.setInt(7, flight_adults);//,0   -- flight_adults - IN int(11)
			preparedStatement.setInt(8, flight_children);//,0   -- flight_children - IN int(11)
			preparedStatement.setInt(9, flight_seniors);//,0   -- flight_seniors - IN int(11)
			preparedStatement.setInt(10, flight_infants_lap);//,0   -- flight_infants_lap - IN int(11)
			preparedStatement.setInt(11, flight_infants_seat);//,0   -- flight_infants_seat - IN int(11)
			preparedStatement.setInt(12, vac_custom);//,0   -- vac_custom - IN tinyint(4)
			preparedStatement.setDouble(13, vac_lat);//,0   -- vac_lat - IN double
			preparedStatement.setDouble(14, vac_lng);//,0   -- vac_lng - IN double
			preparedStatement.setString(15, selected_flight_id);//,''  -- selected_flight_id - IN varchar(40)
			preparedStatement.setString(16, selected_hotel_id);//,''  -- selected_hotel_id - IN varchar(40)
			preparedStatement.setString(17, selected_car_id);//,''  -- selected_car_id - IN varchar(40)
			//))");*/
			preparedStatement.execute();
			return true;
		}
		catch (SQLException ex) {
			Logger.getLogger(VacationDao.class.getName()).log(Level.SEVERE, null, ex);
			System.out.println(preparedStatement);
		}
		return false;
	}
	public static List<VacationPreviewBit> PreviewVacations(int user_id){
		Connection con =DbUtil.getConnection();
		PreparedStatement preparedStatement = null;
		List<VacationPreviewBit> vacations = new ArrayList<>();
		try {
			preparedStatement = con.prepareStatement("SELECT v.departure_date AS departure_date, v.return_date AS return_date, v.name AS name, origin_T.name AS origin,destination_T.name AS destination FROM vacations AS v "+
													"INNER JOIN airports AS origin_T ON(origin_T.id=v.origin_airport_id) "+
													"INNER JOIN airports AS destination_T ON(destination_T.id=v.destination_airport_id) WHERE v.user_id=?");
			preparedStatement.setInt(1, user_id);
			ResultSet set = preparedStatement.executeQuery();
			VacationPreviewBit newVacation;
			while(set.next())
			{
				System.out.println(set);
				newVacation = new VacationPreviewBit();
				if(set.getString("origin")==null){
					System.out.println("ORIGIN:NULL");
					newVacation.origin="Not Yet set";
				}
				else{
					newVacation.origin=set.getString("origin");
				}
				if(set.getString("destination")==null){
					System.out.println("destination:NULL");
					newVacation.destination="Not Yet set";
				}
				else{
					newVacation.destination=set.getString("destination");
				}
				newVacation.name=set.getString("name");
				if(set.getString("name")==null){
					System.out.println("name:NULL");
					newVacation.name="Not Yet set";
				}
				else{
					newVacation.name=set.getString("name");
				}
				if(set.getString("departure_date")==null){
					System.out.println("departure_date:NULL");
					newVacation.date="Not Yet set";
				}
				else{
					newVacation.date=set.getString("departure_date");
				}
				if(set.getString("return_date")==null){
					System.out.println("return_date:NULL");
					newVacation.returnDate="Not Yet set";
				}
				else{
					newVacation.returnDate=set.getString("return_date");
				}
				vacations.add(newVacation);
			}
		}
		catch (SQLException ex) {
			Logger.getLogger(VacationDao.class.getName()).log(Level.SEVERE, null, ex);
			System.out.println(preparedStatement);
		}
		return vacations;
	}
}