package com.jsjn.skylark.common.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.log4j.Logger;


// Referenced classes of package com.computech.common.util:
//            LogerUtil

public class ConverUtil
{

    public ConverUtil()
    {
    }

    public static double getDoubleByObject(Object s)
    {
        return s != null && !"".equals(s.toString().trim()) ? Double.parseDouble(s.toString().trim()) : 0.0D;
    }

    public static int getIntByObject(Object s)
    {
        return s != null && !"".equals(s.toString().trim()) ? Integer.parseInt(s.toString().trim()) : 0;
    }

    public static String getObjStr(Object obj)
    {
        if(obj == null)
            return "";
        else
            return obj.toString();
    }

    public static Date getObjDate(Object obj)
    {
    	Date date = null;
        if(obj == null || "".equals(obj))
            return null;
        else
        {
        	try {
        		date = new SimpleDateFormat("yyyy-MM-dd").parse(obj.toString());
			} catch (ParseException e) {
				e.printStackTrace();
		        return null;
			} 
        }
        return date;
    }
    
    public static int getObjInt(Object obj)
    {
        int rtValue = 0;
        if(obj != null && !"".equals(obj.toString()))
            try
            {
                rtValue = Integer.parseInt(obj.toString());
            }
            catch(Exception ex)
            {
                logerUtil.debug("ObjectToInt Error");
            }
        return rtValue;
    }

    public static Long getObjLong(Object obj)
    {
        Long rtValue = new Long(0L);
        if(obj != null && !"".equals(obj.toString()) && !"null".equalsIgnoreCase(obj.toString()))
            try
            {
                rtValue = new Long(Long.parseLong(obj.toString()));
            }
            catch(Exception ex)
            {
                logerUtil.debug("ObjectToLong Error");
            }
        return rtValue;
    }

    public static String intToStr(int i)
    {
        return (new Integer(i)).toString();
    }

    public static int strToInt(String str)
    {
        if(str == null || "".equals(str.trim()) || "null".equalsIgnoreCase(str))
            return 0;
        try {
        	return (new Integer(str)).intValue();
        } catch(Exception e) {
        	logerUtil.debug("strToInt Error");
        }
        
        return 0;
    }

    public static long strTolong(String str)
    {
        if(str == null || "".equals(str.trim()))
            return 0L;
        try {
        	return Long.parseLong(str);
        } catch(Exception e) {
        	logerUtil.debug("strTolong Error");
        }
        
        return 0L;
    }

    public static float strTofloat(String str)
    {
        if(str == null || "".equals(str.trim()))
            return 0.0F;
        try {
        	return Float.parseFloat(str);
        } catch(Exception e) {
        	logerUtil.debug("strTofloat Error");
        }
        return 0.0F;
    }

    public static double strTodouble(String str)
    {
        if(str == null || "".equals(str.trim()))
            return 0.0D;
        try {
            return Double.parseDouble(str);
        } catch(Exception e) {
        	logerUtil.debug("strTodouble Error");
        }
        return 0.0D;
    }

    private static final Logger logerUtil = Logger.getLogger(ConverUtil.class);

}
