/**
 * 
 */
package com.jsjn.jnf.integration.withhold.impl;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.bo.integration.SingleWithholdReqDto;
import com.jsjn.jnf.bean.bo.trade.WithHoldReqBO;
import com.jsjn.jnf.bean.bo.trade.WithHoldReqDataBO;
import com.jsjn.jnf.bean.bo.trade.WithHoldSecCheckResDataBO;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.integration.interfaces.GetWithHoldData;
import com.jsjn.jnf.integration.interfaces.IntermediateSystem;
import com.jsjn.jnf.integration.withhold.WithHoldInterface;
import com.jsjn.jnf.service.assist.LockService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * @author ZSMJ 代扣集成层
 */
@Service
@Transactional(readOnly = true)
public class WithHoldInterfaceImpl implements WithHoldInterface {

	private final static Logger logger = Logger.getLogger(WithHoldInterfaceImpl.class);

	private LockService lockService = (LockService) ParseSpring.context.getBean("lockServiceImpl");

	/**
	 * 代扣集成层流程如下(现只针对一家做处理) 采用如果有事务,那么加入事务,没有的话新建一个机制 
	 * 1、锁表（支付表）
	 * 2、二次握手反查代扣数据（核对）
	 * 3、根据不同渠道进行代扣
	 */
	@Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = { RuntimeException.class,
			Exception.class })
	@Override
	public void withHolding(String orderNo, String signNo, WithHoldReqBO reqDto,String orgNo) throws Exception {
		// 获取业务请求主体
		WithHoldReqDataBO reqDataDto = reqDto.getReqData();

		/**
		 * *******************************锁表(支付表)******************************
		 */
		try{
			lockService.insertLock(reqDto.getMid(), TabsConstant.LOCK_TYPE_PAYMENT.val(), orderNo);
		}catch(Exception e){
		    logger.error("存在相同的支付编号为" + orderNo + "的代扣交易,请核实！");
			throw new Exception("存在相同的支付编号为" + orderNo + "的代扣交易,请核实！");
		}

		/**
		 * ***********************二次握手反查代扣数据(核对)************************
		 */
		// 商户实际业务编号
		//TODO 补充
		String serialNo = reqDataDto.getSerialNo();
		WithHoldSecCheckResDataBO secCheckResDto = null;
		try {
			secCheckResDto = GetWithHoldData.getWithHoldData(reqDto.getMid(), serialNo);
		} catch (Exception e) {
			logger.error("调用商户提供反查代扣数据出错",e);
			throw new Exception("调用商户提供反查代扣数据出错");
		}

		// 比较数据
		String origData = reqDataDto.secCheckString();
		String currData = secCheckResDto.secCheckString();
		if (!reqDataDto.secCheckString().equals(currData)) {
			logger.error("该笔支付存在风险！支付订单编号为" + orderNo + "的交易经二次握手检查数据不一致，原：[" + origData + "] 现[ " + currData + "]");
			throw new Exception("该笔支付存在风险！该笔交易经二次握手检查数据不一致！");
		}

		/**
		 * **************************根据不同支付渠道进行支付***************************
		 */
		SingleWithholdReqDto singlReqDto = new SingleWithholdReqDto();
		singlReqDto.setOrderNo(orderNo);
		singlReqDto.setCustSignNo(reqDataDto.getCustNo());
		singlReqDto.setSignNo(signNo);
		singlReqDto.setAmount(reqDataDto.getAmount());
		singlReqDto.setOrgNo(orgNo);
		try {
			IntermediateSystem.singleWithhold(singlReqDto);
		} catch (Exception e) {
			//TODO 补充
			logger.error("处理支付编号为" + serialNo + "时调用中间业务平台发生异常！" , e);
			throw new Exception("处理支付编号为" + serialNo + "时调用中间业务平台发生异常！" );
		}
	}

}
