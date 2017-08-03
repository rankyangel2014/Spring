package com.jsjn.jnf.common;

import org.apache.commons.lang3.StringUtils;

import com.jsjn.jnf.common.utils.DateUtils;
import com.jsjn.jnf.service.assist.SequenceService;
import com.jsjn.panda.setup.ParseSpring;

public class TestSequenceUtils {
	
	public static String getNextTradeNo(String mid, String transType){
		SequenceService service = (SequenceService) ParseSpring.context.getBean("sequenceServiceImpl");
		
		return "T"
		+ mid
		+ transType
		+ DateUtils.getDate("yyMMdd")
		+ StringUtils.leftPad(
				Integer.parseInt(service.getSeq("JNF_SEQ_T8")) + 1 + "", 8,"0");
	}
	
	public static String  getNextPaymentNo(String mid, String transType){
		SequenceService service = (SequenceService) ParseSpring.context.getBean("sequenceServiceImpl");
		
		return "O"
		+ mid
		+ transType
		+ DateUtils.getDate("yyMMdd")
		+ StringUtils.leftPad(
				Integer.parseInt(service.getSeq("JNF_SEQ_T10")) + 1 + "",8, "0");
		
	}
}
