package com.jsjn.jnf.common.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class DateConverter {

    private static DateConverter conver;

    public static DateConverter getInstance() {
        if (conver == null) {
            conver = new DateConverter();
        }
        return conver;
    }

    public String toString(Date dt, String strFormat) {
        SimpleDateFormat df = new SimpleDateFormat(strFormat);
        return df.format(dt);
    }

    public Date parse(String strDate, String strFormat) throws ParseException {
        SimpleDateFormat df = new SimpleDateFormat(strFormat);
        return df.parse(strDate);
    }

    public Date oneWeekAgo() {
        GregorianCalendar cal = new GregorianCalendar();
        cal.setTime(new Date());
        cal.add(5, -7);
        Date dOneWeekAgo = cal.getTime();
        return dOneWeekAgo;
    }

    /**
     * 得到某天之前的日期串
     * @param var
     * @param lday
     * @return 返回结果
     */
    public String getNDay(String var, int lday) {
        int strTo = lday;
        String tmp = "";
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
            Calendar calendar = new GregorianCalendar();
            Date date = sdf.parse(var);
            calendar.setTime(date);
            calendar.add(5, strTo);
            int yy = calendar.get(1);
            int mm = calendar.get(2) + 1;
            int dd = calendar.get(5);

            String m = "" + mm;
            if (mm < 10) {

                m = "0" + m;
            }
            String d = "" + dd;
            if (dd < 10) {

                d = "0" + d;
            }

            // tmp = (new StringBuilder(String.valueOf(yy))).append("-")
            // .append(M).append("-").append(D).toString();

            tmp = new StringBuilder(String.valueOf(yy)).append(m).append(d).toString();

        } catch (Exception exception) {

            exception.printStackTrace();
        }
        return tmp;
    }

    public String stringToTime(String dateString) {
        SimpleDateFormat myFmt1 = new SimpleDateFormat("yyyy-MM-dd");
        // SimpleDateFormat myFmt2 = new SimpleDateFormat("yyyyMMdd");
        try {
            Date now = myFmt1.parse(dateString);
            String StringDate = myFmt1.format(now);
            return StringDate;
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public ArrayList getNDays(String var, int lday) {
        int d = lday;
        ArrayList al = new ArrayList();

        if (lday < 0) { // 前N天

            for (int i = 0; i > lday; i--) {
                al.add(Math.abs(i), stringToTime(getNDay(var, d)));
                d++;
            }
            return al;
        }
        for (int i = 0; i < lday; i++) { // 后N天

            al.add(i, stringToTime(getNDay(var, d)));
            d--;
        }
        return al;
    }

    public String getDate1() {
        Calendar no = new GregorianCalendar();
        int m = no.get(2) + 1;
        int y = no.get(1);
        int d = no.get(5);
        //int h = no.get(11);
        //int mi = no.get(12);
        //int s = no.get(13);
        String date = (new StringBuilder(String.valueOf(y))).append("-").append(m).append("-").append(d).toString();
        return date;
    }

    /**
     * 获取当前的系统时间
     * @return 返回结果
     */
    public String getDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        Date date = new Date(System.currentTimeMillis());
        return sdf.format(date);
    }

    public Date getLastDay(String rq) {
        if (rq == null || "".equals(rq.trim()) || rq.length() < 6) {
            return null;
        }
        int year = Integer.parseInt(rq.substring(0, 4));
        int month = Integer.parseInt(rq.substring(4, 6));
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, year); // 年
        cal.set(Calendar.MONTH, month - 1); // 月，因为Calendar里的月是从0开始，所以要减1
        cal.set(Calendar.DATE, 1); // 日，设为一号
        cal.add(Calendar.MONTH, 1); // 月份加一，得到下个月的一号
        cal.add(Calendar.DATE, -1); // 下一个月减一为本月最后一天
        return cal.getTime(); // 获得月末是几号
    }

    // public static void main(String args[]) throws Exception {

    // DateConverter ct = new DateConverter();

    // System.out.println(">>>>>"+DateConverter.getInstance().getNDay("20101015",
    // -2));
    // System.out.println(">>>>>"+DateConverter.getInstance().getNDay("20100101",
    // -1));
    // System.out.println(">>>>>"+DateConverter.getInstance().getNDay("20100228",
    // -1));
    // System.out.println(">>>>>"+DateConverter.getInstance().getNDay("20100101",
    // 1));
    // System.out.println(">>>>>"+DateConverter.getInstance().getNDay("20100228",
    // 2));
    //
    //
    // ArrayList<String> s =
    // DateConverter.getInstance().getNDays("20070808", 10);
    // for (int i = 0; i < s.size(); i++){
    // System.out.println(s.get(i));
    // }
    // System.out.println(DateConverter.getInstance().toString(
    // DateConverter.getInstance().oneWeekAgo(),"yyyy-MM-dd"));

    // for(int i=0;i<10;i++){
    // String curday=DateConverter.getInstance().getNDay("20101028", i);
    // System.out.println(curday);
    // }

    // }
}
