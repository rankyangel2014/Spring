package com.jsjn.jnf.panda.client;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.jsjn.jnf.common.utils.CacheUtils;
import com.jsjn.log4p.pandaclient.Log4pPandaClient;
import com.jsjn.panda.client.Result;
import com.jsjn.panda.exception.NoServiceException;
import com.jsjn.panda.exception.PandaRemoteException;
import com.jsjn.panda.exception.TimeoutException;

/**
 * 组装后的pandaclient
 * @author majian
 *
 */
public class PandaClient2 extends Log4pPandaClient{
	
	/**
	 * Panda接口调用方法(支持缓存)
	 * @param cacheSec 缓存时间（秒） 3600=1小时 
	 * @param arg0 调用系统的编号
	 * @param arg1 调用的方法名称
	 * @param arg2 调用的参数
	 * @return
	 */
	public static Result invoke(long cacheSec,String arg0,String arg1,Object... arg2) throws NoServiceException, PandaRemoteException, TimeoutException{
		Result obj = null;
		if (cacheSec>0){
			String key = buildKey(arg0,arg1,arg2);
			CacheUtils.updateSec(key,cacheSec);
			obj = (Result)CacheUtils.get(key);
			if (obj==null){
				obj = invoke(arg0,arg1,arg2);
				CacheUtils.set(key, obj, cacheSec);
				//logger.info("PandaClient.invoke,obj==null,重新发起panda请求，重新设置缓存");
			}else{
				//logger.info("PandaClient.invoke,obj!=null,从缓存中取数");
			}
		}else{
			//logger.info("PandaClient.invoke,cacheSec==0,未使用缓存!");
			obj = invoke(arg0,arg1,arg2);
		}
		return obj;
	}
	
	/**
	 * 根据参数，组装唯一的hashcode作为cache key
	 * @return
	 */
	private static String buildKey(String arg0,String arg1,Object... arg2){
		String code1 = String.valueOf(arg0.hashCode());
		String code2 = String.valueOf(arg1.hashCode());
		String json = JSON.toJSONString(arg2,SerializerFeature.WriteMapNullValue,SerializerFeature.WriteNullListAsEmpty);
		//这里为什么要先把objects转成json? 因为object相同对象每次的hash都不一样，所以变通转成字符串
		String code3 = String.valueOf(json.hashCode());
		return code1 + code2 + code3;
	}

}
