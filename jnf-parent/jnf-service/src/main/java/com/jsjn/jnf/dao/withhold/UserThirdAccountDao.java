package com.jsjn.jnf.dao.withhold;

import org.apache.ibatis.annotations.Param;

import com.jsjn.jnf.bean.dto.withhold.UserThirdAccountDto;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;

@MyBatisDao
public interface UserThirdAccountDao extends CrudDao<UserThirdAccountDto> {

	/**
	 * 根据账户编号查询账户信息
	 */
	public UserThirdAccountDto queryUserThirdAcctByAccNo(
			@Param(value = "accNo") String accNo,
			@Param(value = "mid") String mid);

	/**
	 * 根据账户编号查询账户信息
	 */
	public UserThirdAccountDto queryUserThirdAcctByCardNo(
			@Param(value = "custId") String custId,
			@Param(value = "mId") String mId,
			@Param(value = "custIdNo") String custIdNo);
	
	/**
	 * 更新第三方账户信息
	 */
	public int updateThirdUserInfo(
			@Param(value = "bindAccNo") String bindAccNo,
			@Param(value = "mobile") String mobile,
			@Param(value = "cardBankCode") String cardBankCode,
			@Param(value = "digest") String digest,
			@Param(value = "accNo") String accNo);
	
	

}
