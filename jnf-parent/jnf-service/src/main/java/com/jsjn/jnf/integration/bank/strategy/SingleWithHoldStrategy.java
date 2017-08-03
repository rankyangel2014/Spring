package com.jsjn.jnf.integration.bank.strategy;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.pojo.integration.SingleWithHoldPojo;
import com.jsjn.jnf.bean.pojo.integration.SingleWithHoldResPojo;
import com.jsjn.jnf.common.config.ChannelCode;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.utils.Logger;
import com.jsjn.jnf.integration.bank.SingleWithHoldInterface;
import com.jsjn.jnf.integration.bank.impl.TfbSingleWithHoldImpl;
import com.jsjn.jnf.integration.bank.impl.YfbSingleWithHoldImpl;

/**
 * 单笔代扣    策略类
 * @author yincy
 *
 */
public class SingleWithHoldStrategy {
	
	private final static Logger logger = Logger.getLogger(SingleWithHoldStrategy.class);

	private SingleWithHoldInterface impl;
	
	/**
	 * 根据 渠道类型 初始化对应的【单笔代扣】集成层实现类
	 * @param channelCode
	 * @throws BussinessException
	 */
	public SingleWithHoldStrategy(String channelCode) throws BussinessException{
		this.impl = this.getSingleWithHoldImpl(channelCode);
	}
	
	/**
	 * 根据 渠道类型 返回对应的【单笔代扣】集成层实现类
	 * @throws BussinessException 
	 */
	private SingleWithHoldInterface getSingleWithHoldImpl(String channelCode) throws BussinessException{
		
		SingleWithHoldInterface impl = null;
		
		if(channelCode.equals(ChannelCode.CHANNEL_GUOCAI_TFB.getCode())){
			impl = new TfbSingleWithHoldImpl();
		}else if(channelCode.equals(ChannelCode.CHANNEL_SUNNING_YFB.getCode())){
			impl = new YfbSingleWithHoldImpl();
		}else{
			logger.error("签约渠道已失效或者错误，请核实");
			throw new BussinessException(ReturnCode.FAIL,"签约渠道已失效或者错误，请核实");
		}
		
		return impl;
	}
	
	/**
	 * 调用对应的集成层代扣方法
	 * @param reqPojo
	 * @return
	 * 
	 * 此处开启新事务
	 */
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
	public SingleWithHoldResPojo singleWithHold(SingleWithHoldPojo reqPojo){
		return this.impl.singleWithHold(reqPojo);
	}
}
