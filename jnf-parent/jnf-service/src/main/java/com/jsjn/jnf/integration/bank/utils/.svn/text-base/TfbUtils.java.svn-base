package com.jsjn.jnf.integration.bank.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jsjn.jnf.common.security.Digests;
import com.jsjn.jnf.common.utils.BeanUtils;
import com.jsjn.jnf.common.utils.StringUtils;

/**
 * 宏图三胞  天付宝工具类
 * @author yincy
 *
 */
public class TfbUtils {
    
	/**
	 * 获取 request 签名
	 * @param obj 需要签名的java bean
	 * @param spkey 对应商户的key
	 * @return
	 */
	public static String getReqSign(Object obj,String spKey){		
		// 将 javaBean 转化为 map
		Map<String, Object> tfbReqMap = new HashMap<String, Object>();
		tfbReqMap = BeanUtils.transBean2Map(obj);
		
		// 将 map 转化为 key1=value1&key2=value2...  然后再拼接天付宝分配的商户spkey
		StringBuilder tfbReqSign = new StringBuilder();
		tfbReqSign.append(StringUtils.mapToString(tfbReqMap)).append("&key=").append(spKey);
		
		// 将拼接后的字符串生成MD5摘要，然后再全部转为小写
		String reqSign = StringUtils.lowerCase(Digests.md5(tfbReqSign.toString()));
		
		return reqSign;
	}
	
	/**
	 * 获取 response 签名
	 * @param obj 需要签名的java bean
	 * @param spKey 对应商户的key
	 * @return
	 */
	public static String getResSign(Object obj,String spKey){
		// 将 javaBean 转化为 map
		Map<String, Object> tfbResMap = new HashMap<String, Object>();
		tfbResMap = BeanUtils.transBean2Map(obj);

		// 声明不参与摘要的字段
		List<String> excudeKeylist = new ArrayList<String>();
		excudeKeylist.add("retcode");
		excudeKeylist.add("retmsg");
		excudeKeylist.add("md5_sign");

		// 根据返回的字段值，生成sign值
		StringBuilder tfbResSign = new StringBuilder();
		tfbResSign.append(StringUtils.mapToString(tfbResMap, excudeKeylist)).append("&key=").append(spKey);
		String resSign = StringUtils.lowerCase(Digests.md5(tfbResSign.toString()));
		
		return resSign;
	}
	
	
	
}
