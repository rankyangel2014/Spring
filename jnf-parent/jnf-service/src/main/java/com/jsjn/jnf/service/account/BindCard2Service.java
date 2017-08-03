package com.jsjn.jnf.service.account;

import com.jsjn.jnf.bean.dto.account.BindCardDto2;

/**
 * TODO
 * for test
 */
public interface BindCard2Service {
	
	/**
	 * 是否绑卡
	 * @return boolean 如果已经绑卡返回custId，没有绑卡返回null
	 * @throws Exception
	 */
	public String getCustId(String mId, String custName, String bankCardNo) throws Exception;
	
	/**
	 * 查询绑卡信息
	 * @param mId
	 * @param custId
	 * @param bankCardNo
	 * @return
	 * @throws Exception
	 */
	public BindCardDto2 queryCardInfo(String mId, String custId, String bankCardNo) throws Exception;
}
