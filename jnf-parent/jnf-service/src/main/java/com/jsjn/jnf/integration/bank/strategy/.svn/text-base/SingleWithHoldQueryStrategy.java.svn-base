package com.jsjn.jnf.integration.bank.strategy;

import com.jsjn.jnf.bean.pojo.integration.SingleWithHoldQueryPojo;
import com.jsjn.jnf.bean.pojo.integration.SingleWithHoldResPojo;
import com.jsjn.jnf.common.config.ChannelCode;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.utils.Logger;
import com.jsjn.jnf.integration.bank.SingleWithHoldQueryInterface;
import com.jsjn.jnf.integration.bank.impl.TfbWithHoldResultQueryImpl;
import com.jsjn.jnf.integration.bank.impl.YfbSingleWithHoldImpl;

/**
 * 单笔代扣结果查询 策略类
 * 
 * @author yincy
 * 
 */
public class SingleWithHoldQueryStrategy {

	private final static Logger logger = Logger.getLogger(SingleWithHoldQueryStrategy.class);

	private SingleWithHoldQueryInterface impl;

	/**
	 * 根据不同渠道类型初始化对应集成层实现类
	 * 
	 * @param channelCode
	 * @throws BussinessException
	 */
	public SingleWithHoldQueryStrategy(String channelCode) throws BussinessException {
		this.impl = this.getSingleWithHoldQueryImpl(channelCode);
	}

	/**
	 * 根据 【渠道类型】 返回对应的 【代扣状态查询】 集成层实现类
	 * 
	 * @throws BussinessException
	 */
	private SingleWithHoldQueryInterface getSingleWithHoldQueryImpl(String channelCode) throws BussinessException {

		SingleWithHoldQueryInterface impl = null;

		if (channelCode.equals(ChannelCode.CHANNEL_GUOCAI_TFB.getCode())) {
			impl = new TfbWithHoldResultQueryImpl();
		} else if (channelCode.equals(ChannelCode.CHANNEL_SUNNING_YFB.getCode())) {
			impl = new YfbSingleWithHoldImpl();
		} else {
			logger.error("签约渠道已失效或者错误，请核实");
			throw new BussinessException(ReturnCode.FAIL, "签约渠道已失效或者错误，请核实");
		}

		return impl;
	}

	/**
	 * 调用集成层代扣方法
	 * 
	 * @param reqPojo
	 * @return
	 */
	public SingleWithHoldResPojo withHoldResultQuery(SingleWithHoldQueryPojo reqPojo) throws BussinessException {
		return this.impl.withHoldResultQuery(reqPojo);
	}
}
