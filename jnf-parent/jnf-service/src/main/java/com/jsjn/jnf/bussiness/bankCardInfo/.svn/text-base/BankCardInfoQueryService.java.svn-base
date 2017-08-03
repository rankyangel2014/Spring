package com.jsjn.jnf.bussiness.bankCardInfo;

import com.jsjn.jnf.bean.bo.bankCard.BankCardValidateReqBO;
import com.jsjn.jnf.bean.bo.bankCard.BankCardValidateResBO;
import com.jsjn.jnf.bean.bo.bankCard.CardInfoQueryReqBO;
import com.jsjn.jnf.bean.bo.bankCard.CardInfoQueryResBO;
import com.jsjn.jnf.common.exception.BussinessException;

/**
 * 银行卡相关
 * 
 * @author Administrator
 * 
 */
public interface BankCardInfoQueryService {
	/**
	 * 卡BIN查询
	 * 
	 * @param dto
	 * @return
	 */
	public CardInfoQueryResBO bankCardInfoQuery(CardInfoQueryReqBO dto) throws BussinessException;

	/**
	 * 四要素认证
	 * 
	 * @param dto
	 * @return
	 */
	public BankCardValidateResBO bankCardValidate(BankCardValidateReqBO dto) throws BussinessException;
}
