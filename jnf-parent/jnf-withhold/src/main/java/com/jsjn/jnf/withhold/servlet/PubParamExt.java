package com.jsjn.jnf.withhold.servlet;

import java.io.Serializable;

public class PubParamExt implements Serializable{

    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    
    
    private String paraNo;
    private String paramKey; //下拉参数值paraValue
    private String paramValue; //下拉参数描述 paraDesc
    private String hasEmptyLine; //是否在列表中插入空行，0：是   1：否
    
    

    public String getParamKey() {
        return paramKey;
    }

    public void setParamKey(String paramKey) {
        this.paramKey = paramKey;
    }

    public String getParamValue() {
        return paramValue;
    }

    public void setParamValue(String paramValue) {
        this.paramValue = paramValue;
    }

    public java.lang.String getParaNo() {
        return paraNo;
    }

    public void setParaNo(java.lang.String paraNo) {
        this.paraNo = paraNo;
    }

    public String getHasEmptyLine() {
        return hasEmptyLine;
    }

    public void setHasEmptyLine(String hasEmptyLine) {
        this.hasEmptyLine = hasEmptyLine;
    }
}
