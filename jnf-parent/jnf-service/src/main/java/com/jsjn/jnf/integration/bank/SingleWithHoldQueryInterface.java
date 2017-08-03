package com.jsjn.jnf.integration.bank;

import com.jsjn.jnf.bean.pojo.integration.SingleWithHoldQueryPojo;
import com.jsjn.jnf.bean.pojo.integration.SingleWithHoldResPojo;

/**
 * 单笔代扣结果查询 接口
 * 
 * @author yincy
 * 
 */
public interface SingleWithHoldQueryInterface {

	/**
	 * 单笔代扣结果查询
	 * 
	 * @param tranNo
	 *            代扣对应交易订单号
	 * @return
	 */
	public SingleWithHoldResPojo withHoldResultQuery(SingleWithHoldQueryPojo pojo);

}
