package com.jsjn.jnf.bussiness.bank;

import com.jsjn.jnf.bean.bo.bank.SingleWithHoldReqBO;
import com.jsjn.jnf.bean.bo.bank.SingleWithHoldResBO;
import com.jsjn.jnf.common.exception.BussinessException;

/**
 * 单笔代扣 接口类
 * 
 * @author yincy
 * 
 */
public interface BankSingleWithHoldService {

	/**
	 * 单笔代扣
	 * 
	 * @param dto
	 * @param flag 是否（TRUE/FALSE）需要二次验签
	 * @return
	 * @throws Exception
	 */
	public SingleWithHoldResBO singleWithHold(SingleWithHoldReqBO dto, boolean flag) throws BussinessException;

}
