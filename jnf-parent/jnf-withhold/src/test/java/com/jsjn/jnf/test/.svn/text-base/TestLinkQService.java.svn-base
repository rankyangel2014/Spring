package com.jsjn.jnf.test;

import net.sf.json.JSONObject;

import com.jsjn.jnf.bean.dto.withhold.SignDto;
import com.jsjn.jnf.bean.linkq.PaymentMessageDto;
import com.jsjn.jnf.common.linkq.LinkQHandler;
import com.jsjn.platform.util.ConfigBean;

public class TestLinkQService {
	public static void main(String[] args) {
		查询贷款信息1();
	}

	public static void 查询贷款信息() {
		System.out.println(ConfigBean.LINKQ_SERVER = "172.31.18.151");
		PaymentMessageDto signDto = new PaymentMessageDto();
		signDto.set_transCode("REG004");
		signDto.setOperate("JNCRM");
		signDto.setLoanNo("000000");
		signDto.setChargeCode("000000");
		signDto.setChargeMsg("放款成功");
		signDto.set_insttuId("320000114");
		signDto.set_userId("J320000114loan");
		JSONObject res = LinkQHandler.getJsonNoLogin(signDto);
		System.out.println(res);
	}

	public static void 查询贷款信息1() {
		System.out.println(ConfigBean.LINKQ_SERVER = "172.31.19.77");
		SignDto signDto = new SignDto();
		signDto.set_transCode("MNG110");
		signDto.setOrgNo("320000114");
		signDto.setLoanNo("128");
		signDto.set_insttuId("320000114");
		signDto.set_userId("J320000114loan");
		signDto.setPayChannel("CH12");
		signDto.setCardSignNo("123");
		signDto.setIsBatchPay("N");
		signDto.setPayStartDay("-");
		signDto.setSignStatus("3");// 3-已签约

		//		signDto.setCustName("张三");
		//		signDto.setMobile("13212312312");
		//		signDto.setBankCardNo("6226234243234234");
		//		signDto.setBankName("江苏银行");
		net.sf.json.JSONObject res = LinkQHandler.getJsonNoLogin(signDto);
		System.out.println(res);
	}

	public static void 查询贷款信息2() {
		System.out.println(ConfigBean.LINKQ_SERVER = "172.31.19.77");
		SignDto signDto = new SignDto();
		signDto.set_transCode("QRY850");
		signDto.set_sqlListName("resultList");
		signDto.setOrderType("1");
		signDto.setSetlFlg("N");
		//		signDto.set_transCode("MNG110");
		//		signDto.setOrgNo("");
		//		signDto.setLoanNo("");
		signDto.set_insttuId("990000001");
		signDto.set_userId("J990000001loan");
		signDto.setOrgNo("320000114");
		signDto.setCustManagerNo("J3200001140001");
		//		signDto.setPayChannel("CH12");
		//		signDto.setCardSignNo("");
		//		signDto.setIsBatchPay("N");
		//		signDto.setSignStatus("3");// 3-已签约
		net.sf.json.JSONObject res = LinkQHandler.getJsonNoLogin(signDto);
		System.out.println(res);
	}
}
