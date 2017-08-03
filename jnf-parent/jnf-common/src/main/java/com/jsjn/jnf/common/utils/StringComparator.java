package com.jsjn.jnf.common.utils;

import java.util.Comparator;

/**
 * String 字符串按照字典排序
 * @author yincy
 *
 */
public class StringComparator implements Comparator<String> {

    @Override
    public int compare(String o1, String o2) {
        return o1.compareTo(o2);
    }
    

}