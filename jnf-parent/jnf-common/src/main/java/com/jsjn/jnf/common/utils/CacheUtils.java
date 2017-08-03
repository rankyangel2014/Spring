package com.jsjn.jnf.common.utils;

import java.util.Hashtable;

/**
 * 轻量级本地cache缓存
 * 建议存储少量数据、如字典配置等
 * @author majian
 *
 */
public class CacheUtils {
	/**
	 * 存储缓存
	 */
	private static Hashtable<String, Object> cache = new Hashtable<String, Object>();
	/**
	 * 记录上次缓存时间
	 * 当前时间-缓存时间<=cacheSec从缓存中取数据，反之删除cache中内容
	 */
	private static Hashtable<String, Long> cachePutTime = new Hashtable<String, Long>();
	/**
	 * 记录最大缓存时间
	 */
	private static Hashtable<String, Long> cacheTime = new Hashtable<String, Long>();
	
	public static void set(String key,Object obj,long cacheSec){
		cache.put(key, obj);
		cachePutTime.put(key, System.currentTimeMillis()/1000);
		cacheTime.put(key, cacheSec);		
	}
	public static Object get(String key){
		if (isExistCache(key)){
			return cache.get(key);
		}else{
			remove(key);
		}
		return null;
	}
	public static void remove(String key){
		cache.remove(key);
		cachePutTime.remove(key);
		cacheTime.remove(key);
	}
	
	/**
	 * 清除缓存中所有内容
	 */
	public static void remoceAll(){
		cache.clear();
		cachePutTime.clear();
		cacheTime.clear();
	}
	
	/**
	 * 检查缓存是否超时或是否有缓存
	 * @param key
	 * @param cacheSec
	 * @return
	 */
	private static boolean isExistCache(String key){
		//获取上一次保存的时间,System.currentTimeMillis()/1000
		Long t1 = cachePutTime.get(key);
		Long cacheSec = cacheTime.get(key);
		if (t1!=null){
			Long t2 = System.currentTimeMillis()/1000;
			Long diff = cacheSec-(t2-t1);
			if (diff>0){//说明在缓存时间内
				return true;
			}else{
				return false;
			}
		}
		return false;
	}
	public static void updateSec(String key, long cacheSec) {
		cacheTime.put(key, cacheSec);	
	}
}
