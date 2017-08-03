/**
 * 
 */
package com.jsjn.jnf.service.assist;

import com.jsjn.jnf.common.exception.BussinessException;

/**
 * @author ZSMJ
 * 锁表
 */
public interface LockService {
	
	/**
	 * 插入锁表
	 * @param dto
	 * @return
	 */
	public int insertLock(String mid,String lockType,String lockNo) throws Exception ;
	
	/***
	 * 清除锁表
	 * @param dto
	 */
	public int deleteLock(String mid,String lockType,String lockNo) throws BussinessException;

}
