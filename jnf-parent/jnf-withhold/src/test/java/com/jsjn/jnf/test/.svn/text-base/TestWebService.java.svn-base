package com.jsjn.jnf.test;

import net.sf.json.JSONObject;

import com.jsjn.jnf.bean.dto.sms.ShortMessageDto;
import com.jsjn.jnf.bean.dto.workflow.WorkflowDto;
import com.jsjn.panda.client.PandaClient;
import com.jsjn.panda.client.Result;
import com.jsjn.panda.exception.NoServiceException;
import com.jsjn.panda.exception.PandaRemoteException;
import com.jsjn.panda.exception.TimeoutException;
import com.jsjn.panda.msg.MsgContext;
import com.jsjn.platform.util.ConfigBean;

/**
 * 
 * @author Ghost
 * 
 */
public class TestWebService {

	private static MsgContext mc = null;
	static {
		try {
			PandaClient.subscribe();
			mc = new MsgContext();
			Thread.sleep(1000L);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	// public static void main(String[] args) throws Exception {
	// // sendSms();
	// // addApprove();
	// // submitApprove("990000001000002552011");
	// }

	/**
	 * 发送短信
	 * 
	 * @throws Exception
	 */
	public static void sendSms() throws Exception {
		ShortMessageDto dto = new ShortMessageDto();
		dto.setTelNo("18626410032");
		dto.setMessage("18626410032");
		Result rsp = PandaClient.invoke2(mc, "0020", "sendSms", dto);
		System.out.println(JSONObject.fromObject(rsp));
	}

	/**
	 * 新增待办
	 * 
	 * @throws Exception
	 */
	public static void addApprove() {
		WorkflowDto dto = new WorkflowDto();
		dto.setCustNo("J9900000010013");
		dto.setInsttuId("990000001");
		dto.setInsttuTy("01");
		dto.setUserId("J9900000010013");
		dto.setUserName("J9900000010013");
		dto.setParams("J9900000010013");
		dto.setPs("J9900000010013");
		try {
			Result rsp = PandaClient.invoke2(mc, "0020", "addApprove", dto);
			System.out.println(JSONObject.fromObject(rsp));
		} catch (NoServiceException e) {
			e.printStackTrace();
		} catch (TimeoutException e) {
			e.printStackTrace();
		} catch (PandaRemoteException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 提交审批
	 * 
	 * @throws Exception
	 */
	public static void submitApprove(String id) {
		WorkflowDto dto = new WorkflowDto();
		dto.setOperation("0");
		dto.setIdea("审批意见");
		dto.setInsttuId("990000001");
		dto.setInsttuTy("01");
		dto.setUserId("990000001");
		dto.setTaskinstanceId(id);
		dto.setParams("990000001");
		try {
			Result rsp = PandaClient.invoke2(mc, "0020", "submitApprove", dto);
			System.out.println(JSONObject.fromObject(rsp));
		} catch (NoServiceException e) {
			e.printStackTrace();
		} catch (TimeoutException e) {
			e.printStackTrace();
		} catch (PandaRemoteException e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) throws Exception {
		System.out.println(ConfigBean.LINKQ_SERVER = "172.31.18.151");
		//		SignDto signDto = new SignDto();
		//		signDto.set_transCode("QRY850");
		//		signDto.set_sysName("mloan");
		//		PandaClient.invoke2(new MsgContext(), "0020", "getSignList", signDto);
	}
}
