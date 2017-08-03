package com.jsjn.jnf.panda.admin.payment;

import java.util.List;

import com.jsjn.jnf.bean.dto.payment.PaymentDto;
import com.jsjn.jnf.service.payment.PaymentService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 交易panda服务类
 * 
 * @author ZSMJ
 * 
 */
@PandaService(serviceName = "pandaPaymentService", serviceType = ServiceType.CommonBean)
public class PandaPaymentService {

	private PaymentService paymentService = (PaymentService) ParseSpring.context.getBean("paymentServiceImpl");

	@PandaMethod(mName = "findPaymentInfoByCondition", dscrpt = "支付信息查询", RegID = "findPaymentInfoByCondition")
	public List<PaymentDto> findPaymentInfoByCondition(PaymentDto paymentDto) throws Exception {
		return paymentService.findPaymentInfoByCondition(paymentDto);
	}
	
	@PandaMethod(mName = "findExceptionPaymentInfo", dscrpt = "支付异常信息查询", RegID = "findExceptionPaymentInfo")
	public List<PaymentDto> findExceptionPaymentInfo(PaymentDto paymentDto) throws Exception {
	    return paymentService.findExceptionPaymentInfo(paymentDto);
	}
	
	@PandaMethod(mName = "dealException", dscrpt = "支付异常信息处理", RegID = "dealException")
    public boolean dealException(PaymentDto dto) throws Exception {
        String orderNo = dto.getOrderNo();
        String exception = dto.getFailReason();
        String state = dto.getStatus();
        return paymentService.dealException(orderNo, exception, state);
    }
	
}
