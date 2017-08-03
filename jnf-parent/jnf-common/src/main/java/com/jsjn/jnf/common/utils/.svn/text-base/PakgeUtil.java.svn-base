package com.jsjn.jnf.common.utils;

import java.io.UnsupportedEncodingException;

public final class PakgeUtil {
    /**
     * 私有构造函数
     */
    private PakgeUtil() {
    }

    /**
     * 得到指定byte长度的字符串,不足左补"0",超过则截取
     * @param str string
     * @param length 长度
     * @param encType 编码类型
     * @return 返回结果 字符串
     */
    public static String getFixedStrLeft(final String str, final int length, final String encType) {
        String value = str;
        if (value == null) {
            value = "";
        }
        String resultStr = value;
        // 字符串转为byte数组的长度

        int strByteLength;
        try {
            if (value != null && !"".equals(value)) {
                strByteLength = value.getBytes(encType).length;
                if (strByteLength < length) {
                    int count = length - strByteLength;
                    for (int i = 0; i < count; i++) {
                        resultStr = "0" + resultStr;
                    }
                } else if (strByteLength > length) {
                    byte[] byteArray = new byte[length];
                    byte[] temp = value.getBytes(encType);
                    int n = 0;
                    for (int i = 0; i < length; i++) {
                        byteArray[i] = temp[i];
                        if (temp[i] < 0) {
                            n++;
                        }
                    }
                    if (n % 2 != 0) {
                        byteArray[length - 1] = ' ';
                    }
                    resultStr = new String(byteArray);
                }
            } else {
                for (int i = 0; i < length; i++) {
                    resultStr += "0";
                }
            }
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("字符的编码方式不对" + e.getMessage());
        }
        return resultStr;
    }

    /**
     * 得到指定byte长度的字符串,不足右补0x00,超过则截取
     * @param str 字符串
     * @param length 长度
     * @param encType 编码类型
     * @return 返回结果 返回值
     */
    public static String getFixedStrRight(final String str, final int length, final String encType) {
        String value = str;
        if (value == null) {
            value = "";
        }
        String resultStr = value;
        // 字符串转为byte数组的长度

        int strByteLength;

        try {
            if (value != null && !"".equals(value)) {
                strByteLength = value.getBytes(encType).length;
                if (strByteLength < length) {
                    byte[] fill; // 需补位的byte数组
                    int count = length - strByteLength;
                    fill = new byte[count];
                    for (int i = 0; i < count; i++) {
                        fill[i] = 0x00;
                    }
                    resultStr += new String(fill, encType);

                } else if (strByteLength > length) {
                    byte[] byteArray = new byte[length];
                    byte[] temp = value.getBytes(encType);
                    int n = 0;
                    for (int i = 0; i < length; i++) {
                        byteArray[i] = temp[i];
                        if (temp[i] < 0) {
                            n++;
                        }
                    }
                    if (n % 2 != 0) {
                        byteArray[length - 1] = 0x00;
                    }
                    resultStr = new String(byteArray, encType);
                }
            } else {
                byte[] fill = new byte[length];
                for (int i = 0; i < length; i++) {
                    fill[i] = 0x00;
                }
                resultStr = new String(fill, encType);
            }
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("字符的编码方式不对" + e.getMessage());
        }
        return resultStr;
    }

    /**
     * 得到指定byte长度的字符串,不足右补空格,超过则截取
     * @param str 字符串
     * @param length 长度
     * @param encType 编码类型
     * @return 返回结果 返回结果
     */
    public static String getFixedRightSpace(final String str, final int length, final String encType) {
        String value = str;
        if (value == null) {
            value = "";
        }
        String resultStr = value;
        // 字符串转为byte数组的长度

        int strByteLength;
        try {
            if (value != null && !"".equals(value)) {
                strByteLength = value.getBytes(encType).length;
                if (strByteLength < length) {
                    int count = length - strByteLength;
                    for (int i = 0; i < count; i++) {
                        resultStr = resultStr + " ";
                    }
                } else if (strByteLength > length) {
                    byte[] byteArray = new byte[length];
                    byte[] temp = value.getBytes(encType);
                    int n = 0;
                    for (int i = 0; i < length; i++) {
                        byteArray[i] = temp[i];
                        if (temp[i] < 0) {
                            n++;
                        }
                    }
                    if (n % 2 != 0) {
                        byteArray[length - 1] = ' ';
                    }
                    resultStr = new String(byteArray);
                }
            } else {
                for (int i = 0; i < length; i++) {
                    resultStr += " ";
                }
            }
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("字符的编码方式不对" + e.getMessage());
        }
        return resultStr;
    }

   


    /**
     * 截取byte数组
     * @param old 原数组
     * @param start 开始位置
     * @param end 结束位置
     * @return 返回结果 返回结果
     */
    public static byte[] splitByteArry(final byte[] old, int start, final int end) {
        int fromIndex = start;
        if (fromIndex < 1 || (end - fromIndex < 0)) {
            return null;
        }
        fromIndex = fromIndex - 1;

        byte[] result = new byte[end - fromIndex];
        for (int i = 0; i < result.length; i++) {
            result[i] = old[fromIndex + i];
        }
        return result;
    }

}
