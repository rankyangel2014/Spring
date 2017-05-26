package com.ranky.common;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
    	SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	long lt = new Long("1494992448237");
    	Date date = new Date(lt);
    	System.out.println( simpleDateFormat.format(date) );
        long lt1 = new Long("1494992343888");
        Date date1 = new Date(lt1);
        System.out.println( simpleDateFormat.format(date1) );
    }
}
