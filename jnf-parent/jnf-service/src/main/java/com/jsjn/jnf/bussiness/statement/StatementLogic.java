package com.jsjn.jnf.bussiness.statement;

import com.jsjn.jnf.bean.bo.statement.StatementReqBO;
import com.jsjn.jnf.bean.bo.statement.StatementResBO;
import com.jsjn.jnf.common.exception.BussinessException;

/**
 * 对账 逻辑层
 * 
 * @author yincy
 *
 */
public interface StatementLogic {

	/**
	 * 商户 对账接口
	 * 
	 * @param dto
	 * @return
	 * @throws Exception
	 */
	public StatementResBO verifyAcct(StatementReqBO reqBo) throws BussinessException;

}
