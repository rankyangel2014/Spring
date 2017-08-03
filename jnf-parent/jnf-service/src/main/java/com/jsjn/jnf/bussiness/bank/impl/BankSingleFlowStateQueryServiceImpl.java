package com.jsjn.jnf.bussiness.bank.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.bo.bank.SingleFlowStateQueryReqBO;
import com.jsjn.jnf.bean.bo.bank.SingleFlowStateQueryReqDataBO;
import com.jsjn.jnf.bean.bo.bank.SingleFlowStateQueryResBO;
import com.jsjn.jnf.bean.dto.payment.PaymentDto;
import com.jsjn.jnf.bussiness.bank.BankSingleFlowStateQueryService;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.utils.Logger;
import com.jsjn.jnf.integration.bank.SingleFlowStateQueryInterface;
import com.jsjn.jnf.integration.bank.impl.JsyhSingleFlowStateQueryImpl;
import com.jsjn.jnf.integration.bank.strategy.SingleFlowStateQueryStrategy;
import com.jsjn.jnf.service.payment.PaymentService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 银行查询 单笔支付流水状态查询实现类
 * 
 * @author yincy
 * 
 */
@Service
public class BankSingleFlowStateQueryServiceImpl implements BankSingleFlowStateQueryService {

	private final static Logger logger = Logger.getLogger(BankSingleFlowStateQueryServiceImpl.class);

	//支付表
	private PaymentService paymentService = (PaymentService) ParseSpring.context.getBean("paymentServiceImpl");

	/**
	 * 单笔支付流水状态查询
	 * 
	 * 1）校验订单信息 : 根据【交易订单编号】查找对应【支付订单编号(银行账务流水号)】。 2）生成流水号，记录日志 3） 根据条件决定策略类 规则：
	 * 签约了资金归集的子账户，【实时余额查询】接口的值不能反映真实的【可用余额】，需要用【资金归集上存余额查询】接口查询 4） 接收返回值，处理异常？
	 * 
	 * @throws BussinessException
	 */
	@Override
	@Transactional(readOnly = true)
	public SingleFlowStateQueryResBO singleFlowStateQuery(SingleFlowStateQueryReqBO req) throws BussinessException {

		//获取请求数据
		SingleFlowStateQueryReqDataBO reqDataBo = req.getReqData();

		String tranNo = reqDataBo.getTranNo();

		/**
		 * 1）校验账户信息，如：是否登记等
		 */
		List<PaymentDto> orderList = paymentService.getOrdersByTradeNo(tranNo);

		if (orderList.isEmpty()) {
			throw new BussinessException(ReturnCode.FAIL, "根据交易订单号没有查到支付订单");
		}

		if (orderList.size() > 1) {
			throw new BussinessException(ReturnCode.FAIL, "该笔交易不是单笔支付！");
		}

		PaymentDto payOrder = orderList.get(0);

		System.out.println(payOrder.getPayAccount());

		/**
		 * TODO 3） 根据条件决定策略类
		 */
		SingleFlowStateQueryInterface impl = new JsyhSingleFlowStateQueryImpl();

		SingleFlowStateQueryStrategy strategy = new SingleFlowStateQueryStrategy(impl);

		/**
		 * TODO 4） 接收返回值，处理异常？
		 */

		return strategy.query(req);

	}

}
