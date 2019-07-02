package com.fankun.factory.common;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Random;

public class StringUtils {
	   public static BigDecimal getGeneralID()
	    {
	    	Timestamp aDate = new Timestamp(System.currentTimeMillis());
	      BigDecimal dateValue = new BigDecimal(aDate.getTime());
	      for (int i = 0; i < 5; i++) {
	        dateValue = dateValue.multiply(new BigDecimal(10));
	      }
	      dateValue = new BigDecimal("110000000000000000").add(dateValue).add(new BigDecimal(getRandomDigit(5)));
	      
	      return dateValue;
	    }
	    
	    public static int getRandomDigit(int length)
	    {
	      Random random = new Random();
	      int returnValue = 1;
	      int digit = 0;
	      for (int i = 0; i < length; i++)
	      {
	        returnValue = returnValue * digit * 10 + new Double(Math.random() * 10.0D).intValue();
	        if (i == 0) {
	          digit = 1;
	        }
	      }
	      return returnValue;
	    }
}
