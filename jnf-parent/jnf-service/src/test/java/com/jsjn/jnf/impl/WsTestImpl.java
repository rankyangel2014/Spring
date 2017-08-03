package com.jsjn.jnf.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jws.WebService;

import org.codehaus.xfire.client.XFireProxyFactory;
import org.codehaus.xfire.service.Service;
import org.codehaus.xfire.service.binding.ObjectServiceFactory;

import com.alibaba.fastjson.JSONObject;
import com.computech.common.util.SpringUtil;
import com.jsjn.jnf.WsTest;
import com.jsjn.platform.util.StringUtil;
import com.jsjn.pubsys.webservice.IService;

@WebService(serviceName = "mlspWsTest", endpointInterface = "com.jsjn.jnf.WsTest")
public class WsTestImpl implements WsTest {

	@Override
	public void helloWorld(String msg) throws Exception {
		System.out.println(msg);
	}

	public static void submit() {
		JSONObject json = new JSONObject();
		JSONObject wfvariable = new JSONObject();
		wfvariable.put("custNO", "J9900000010013");
		wfvariable.put("custType", "");
		wfvariable.put("params", "");
		wfvariable.put("flowType", "99");
		wfvariable.put("modId", "0030");
		wfvariable.put("bankCd", "990000001");
		wfvariable.put("startUser", "J9900000010013");
		wfvariable.put("examAmt", "1000.00");
		wfvariable.put("allowBatchExam", "1");
		wfvariable.put("commonExam", "1");
		wfvariable.put("ps",
				"金额【10,000.00】|合同号【01290003】|户名（银行账户）【银行存款/招商银行河西支行28】");

		JSONObject wfinstance = new JSONObject();
		wfinstance.put("checkType", "1");
		wfinstance.put("flowType", "99");
		wfinstance.put("userName", "J9900000010013");
		wfinstance.put("actorId", "J9900000010013");
		wfinstance.put("userNO", "");
		wfinstance.put("swimlan", "600");
		wfinstance.put("smFlag", "1");
		wfinstance.put("oActorId", "");
		wfinstance.put("insttuTy", "01");
		wfinstance.put("insttuId", "990000001");
		wfinstance.put("smsendActorId", "");
		wfinstance.put("step", "1");
		wfinstance.put("deptId", "");

		json.put("wfvariable", wfvariable);
		json.put("wfinstance", wfinstance);

		Service serviceModel = new ObjectServiceFactory()
				.create(IService.class);
		IService service = null;
		try {
			service = (IService) new XFireProxyFactory().create(serviceModel,
					"http://172.31.18.30/pubsys/Services/CommonXfire.Service");
			System.out.println(json.toJSONString());
			String rel = service.submit(json.toJSONString());
			System.out.println(rel);
		} catch (Exception e) {
		}
	}

	public static void exam(String taskinstanceId) {

		JSONObject json = new JSONObject();
		json.put("operation", "0");
		json.put("userId", "J9900000010013");
		json.put("taskinstanceId", taskinstanceId);
		json.put("flowType", "99");
		json.put("params", "123");
		json.put("idea", "审批意见");//审批意见

		JSONObject pushMsg = new JSONObject();
		pushMsg.put("topicId", "userId_J9900000010013");
		pushMsg.put("title", "贷款调查提醒");
		pushMsg.put("content", "请调查客户专用测试的贷款申请。");
		pushMsg.put("url",
				"/jnf-withhold/com.jsjn.jnf.withhold.sign.add.AddWithholdList.view?tempParam=");
		pushMsg.put("type", "0");
		pushMsg.put("validDate", "20160927");
//		json.put("pushMsg", pushMsg);

		Service serviceModel = new ObjectServiceFactory()
				.create(IService.class);
		IService service = null;
		try {
			service = (IService) new XFireProxyFactory().create(serviceModel,
					"http://172.31.18.30/pubsys/Services/CommonXfire.Service");
			System.out.println(json.toJSONString());
			String rel = service.exam(json.toJSONString());
			System.out.println(rel);
		} catch (Exception e) {
		}

	}

	public static void main(String[] args) {
//		submit();
		exam("990000001000002551997");
	}

}
