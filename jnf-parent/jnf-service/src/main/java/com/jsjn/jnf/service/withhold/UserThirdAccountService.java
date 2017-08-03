package com.jsjn.jnf.service.withhold;

import com.jsjn.jnf.bean.dto.withhold.UserThirdAccountDto;
import com.jsjn.jnf.common.exception.BussinessException;

public interface UserThirdAccountService {
	
	public int insert(UserThirdAccountDto dto);
	
	/**
	 * 根据【账户编号】查找用户绑定的银行卡信息
	 * @author yincy
	 * 
	 * @param accNo 账户编号
	 * @param mid 商户号
	 * @return
	 */
	public UserThirdAccountDto queryUserThirdAcctByAccNo(String accNo,String mid) throws BussinessException;

}
