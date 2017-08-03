package com.jsjn.jnf.bussiness.bank.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.bo.bank.RealtimeBalQueryReqBO;
import com.jsjn.jnf.bean.bo.bank.RealtimeBalQueryResBO;
import com.jsjn.jnf.bussiness.bank.BankRealtimeBalQueryService;
import com.jsjn.jnf.integration.bank.RealtimeBalQueryInterface;
import com.jsjn.jnf.integration.bank.impl.JsyhCashSweepQueryImpl;
import com.jsjn.jnf.integration.bank.impl.JsyhRealTimeBalQueryImpl;
import com.jsjn.jnf.integration.bank.strategy.RealtimeBalQueryStrategy;

/**
 * 银行查询 实时余额查询实现类
 * 
 * @author yincy
 * 
 */
@Service
@Transactional
public class BankRealtimeBalQueryServiceImpl implements BankRealtimeBalQueryService {

	/**
	 * 账户实时余额
	 * 
	 * 1）校验账户信息，如：是否登记等 2）生成流水号，记录日志 3） 根据条件决定策略类 规则：
	 * 签约了资金归集的子账户，【实时余额查询】接口的值不能反映真实的【可用余额】，需要用【资金归集上存余额查询】接口查询 4） 接收返回值，处理异常？
	 */
	@Override
	public RealtimeBalQueryResBO realtimeBalQuery(RealtimeBalQueryReqBO reqDto) {

		/**
		 * TODO 1）校验账户信息，如：是否登记等
		 */

		/**
		 * TODO 2）生成流水号，记录日志
		 */

		/**
		 * TODO 3） 根据条件决定策略类
		 */
		RealtimeBalQueryInterface impl = null;

		//默认查询实时余额
		if (isCashSweepAccount()) {
			impl = new JsyhCashSweepQueryImpl();
		} else {
			impl = new JsyhRealTimeBalQueryImpl();
		}

		RealtimeBalQueryStrategy strategy = new RealtimeBalQueryStrategy(impl);

		/**
		 * TODO 4） 接收返回值，处理异常？
		 */
		return strategy.query(reqDto);
	}

	/**
	 * TODO 判断是否是资金归集账户
	 * 
	 * @return
	 */
	public boolean isCashSweepAccount() {
		return false;
	}
}
