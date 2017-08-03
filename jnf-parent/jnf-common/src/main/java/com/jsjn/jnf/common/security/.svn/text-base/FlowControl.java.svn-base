package com.jsjn.jnf.common.security;

import java.util.Hashtable;
import java.util.LinkedList;
import java.util.List;

public class FlowControl {

	/**
	 * 某个IP/SESSION首次向table中添加数据
	 * 
	 * @param table
	 * @param key
	 */
	public static void firstInsert(Hashtable<String, List<String>> table,
			String key) {

		List<String> list = new LinkedList<String>();

		// 用accInfo客户端存储访问信息,用:分割 时间戳:是否黑名单（0：否 1：是）
		String accInfo = "" + System.currentTimeMillis() + ":" + "0";
		list.add(accInfo);

		table.put(key, list);
	}

	/**
	 * IP/SESSION维度流量控制程序 算法： 单位时间内如果超过访问阈值，则将此IP列入黑名单， 在规定冷却时内不能再次访问
	 * @param table
	 * @param key
	 * @param accMaxCount
	 * @param coolingSec
	 * @return
	 */
	public static boolean validateOverFlowForIp(
			Hashtable<String, List<String>> table, String key , long accMaxCount , long coolingSec) {
		
		if (!table.containsKey(key)) {
			firstInsert(table, key);
			return true;
		}
		
		List<String> list = table.get(key);
		int size = list.size();
		
		// 如果小于最大60s内允许的最大条数，则直接将其添加至table中
		if (size < accMaxCount) {
			String accInfo = "" + System.currentTimeMillis() + ":" + "0";
			list.add(accInfo);
			return true;
		}
		
		//和上次请求时间比较，则判断其是否超过冷却时间
		long currTimeStamp = System.currentTimeMillis();
		long lastAccTimeStamp = Long.valueOf(list.get(list.size() - 1).split(":")[0]);
		
		if (currTimeStamp - lastAccTimeStamp > coolingSec * 1000) {
			// 大于冷却时间后，从table中清除掉此信息同时放回true
			table.remove(key);
			firstInsert(table, key);
			return true;
		}
		
		//如果该IP/SESSION未因超流量被加入黑名单，则判定本次是否超流量
		if ("0".equalsIgnoreCase(list.get(size - 1).split(":")[1])) {

			int index = size - (int) accMaxCount + 1;
			Long beforeTimeStamp = Long.valueOf(list.get(index).split(":")[0]);

			// 如果在60s内超过了最大访问次数，返回false
			if (currTimeStamp - beforeTimeStamp >= 60 * 1000) {
				String accInfo = lastAccTimeStamp + ":" + "0";
				list.add(accInfo);
				return true;
				
			}else{
				// 更新最后一条的记录，将黑名单表示置为1
				String accInfo = lastAccTimeStamp + ":" + "1";
				list.remove(size - 1);
				list.add(accInfo);
			}
		}

		return false;
	}

	/**
	 * SYS维度流量控制程序 算法： 单位时间内如果超过访问阈值，则整个系统在冷却时间内不再接受请求
	 * @param list
	 * @param accMaxCount
	 * @param coolingSec
	 * @return
	 */
	public static boolean validateOverFlowForSys(List<String> list , long accMaxCount , long coolingSec) {
		// 如果小于最大60s内允许的最大条数，则直接将其添加至list中
		int size = list.size();
		if (size < accMaxCount) {
			String accInfo = System.currentTimeMillis() + ":" + "0";
			list.add(accInfo);
			return true;
		}

		//和上次请求时间比较，判断其是否超过冷却时间
		long currTimeStamp = System.currentTimeMillis();
		long lastAccTimeStamp = Long.valueOf(list.get(list.size() - 1).split(":")[0]);
		
		if (currTimeStamp - lastAccTimeStamp > coolingSec * 1000) {
			// 大于冷却时间后，将list clear掉同时返回true
			list.clear();
			String accInfo = System.currentTimeMillis() + ":" + "0";
			list.add(accInfo);
			return true;
		}
		
		// 如果SYS维度未因超流量被加入黑名单，则判定本次是否超流量
		if ("0".equalsIgnoreCase(list.get(size - 1).split(":")[1])) {
			// 如果小于最大60s内最大条数，则直接将其添加至list中
			int index = size - (int) accMaxCount + 1;
			Long beforeTimeStamp = Long.valueOf(list.get(index).split(":")[0]);

			// 如果在60s内超过了最大访问次数，返回false
			if (currTimeStamp - beforeTimeStamp >= 60 * 1000) {
				String accInfo = lastAccTimeStamp + ":" + "0";
				list.add(accInfo);
			} else {
				// 更新最后一条的记录，置为当前系统不可访问
				String accInfo = lastAccTimeStamp + ":" + "1";
				list.remove(size - 1);
				list.add(accInfo);
			}
		}
		return false;
	}

}
