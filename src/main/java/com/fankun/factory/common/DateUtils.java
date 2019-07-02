package com.fankun.factory.common;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils {
	
	public static String dateFormat1="yyyy-MM-dd HH:mm:ss";
	public static String dateFormat2="yyyy.MM.dd HH:mm:ss";
	
	public static String dateFormat(String date) throws ParseException {
		String date2= date.substring(0, 19);
		return date2;
		}
	
	public static Date dateFormat(String date,String format) throws ParseException {
		SimpleDateFormat formatter = new SimpleDateFormat(format);
		Date currentTime = formatter.parse(date);
		return currentTime;
	}
	
	public static String dateFormat(String date,String format,String format2) throws ParseException {
		String date2= dateFormat(date);
		Date currentTime = dateFormat(date2,dateFormat1);
		return dateToString(currentTime,format2);
	}
	
	public static String dateToString(Date date,String format) throws ParseException {
		SimpleDateFormat formatter = new SimpleDateFormat(format);
		String  fomat2 = formatter.format(date);
		return fomat2;
		}
	
	public static String getToday(){
		DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		String result = dateFormat.format(new Date());
		return result;
	}
public static void main(String[] args) throws ParseException {
	int aa = subtractNow("2019-01-06 17:00:45");
	System.out.println(aa);
}
	public static int subtractNow(String updateTime) throws ParseException {
		Date updateDate =  dateFormat(updateTime,dateFormat1);
		long diff = new Date().getTime() - updateDate.getTime()  ;//这样得到的差值是微秒级别
	    long days = diff / (1000 * 60 * 60 * 24);
	    return Integer.parseInt(String.valueOf(days));
	}
	
	public static Date validDate(String date,String format) throws ParseException {
		SimpleDateFormat formatter = new SimpleDateFormat(format);
		formatter.setLenient(false);
		Date currentTime = formatter.parse(date);
		return currentTime;
	}
	
}
