package com.jsjn.jnf.common.exception;

public class BussinessException extends Exception{

	/**
	 * JinNongPay Bussiness Exception
	 */
    /** 错误码 */
    protected String errorCode;
    protected String errorMessage;
    
	private static final long serialVersionUID = 1L;

    public BussinessException(String errorCode,String message) {
    	super(message,null);
        this.errorCode = errorCode;
        this.errorMessage = message;
    }    
	public BussinessException(String errorCode,Throwable cause) {
		super(errorCode,cause);
		this.errorCode = errorCode;
	}
	public BussinessException(String errorCode,String message, Throwable cause) {
		super(message, cause);
		this.errorCode = errorCode;
	}
	public String getErrorCode() {
		return errorCode;
	}
}
