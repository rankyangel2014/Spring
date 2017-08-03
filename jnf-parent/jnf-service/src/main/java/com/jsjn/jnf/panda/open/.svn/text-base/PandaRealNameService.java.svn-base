package com.jsjn.jnf.panda.open;

import net.sf.json.JSONArray;

import com.jsjn.jnf.bean.bo.cardBin.CardBinQueryReqBO;
import com.jsjn.jnf.bean.bo.cardBin.CardBinQueryResBO;
import com.jsjn.jnf.bean.bo.realname.RealNameReqBO;
import com.jsjn.jnf.bean.bo.realname.RealNameResBO;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.jnf.bussiness.realname.RealNameSerivce;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.client.Result;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 
 * @author Administrator
 *
 */
@PandaService(serviceName = "realNamePandaService", serviceType = ServiceType.CommonBean)
public class PandaRealNameService {
	
	private RealNameSerivce service = (RealNameSerivce) ParseSpring.context.getBean("realNameServiceImpl");
	
	@PandaMethod(mName = "realNameAuthBy4Element", dscrpt = "实名认证信息校验并发送验证码", RegID = "realNameAuthBy4Element")
	public RealNameResBO validate(RealNameReqBO dto){
		return service.validate(dto);
	}
	
	@PandaMethod(mName = "realNameAuthByMessage", dscrpt = "实名认证信息提交", RegID = "realNameAuthByMessage")
	public RealNameResBO submit(RealNameReqBO dto){
		return service.submit(dto);
	}
	
	@PandaMethod(mName = "cardBINQuery", dscrpt = "卡Bin查询", RegID = "cardBINQuery")
	public CardBinQueryResBO cardBinQry(CardBinQueryReqBO dto){
		return service.cardBinQuery(dto);
	}
	
	
	public static void main(String[]args) throws Exception{
		PandaClient2.subscribe();
		Thread.sleep(1000);
//		DictDto dto = new DictDto();
//		
//		//int[] ids = { 1, 2, 3 ,4 };
//		String[] types = {
//				"NO_WORKING_START_TIME" , 
//				"NO_WORKING_END_TIME" , 
//				"EFFECTIVE_SEC" , 
//				"ACC_MAX_COUNT_FOR_IP" , 
//				"ACC_MAX_COUNT_FOR_SYS" , 
//				"COOLING_SEC_FOR_IP" , 
//				"COOLING_SEC_FOR_SYS" 
//				 };
////		String[] types = {""};
////		dto.setTypes(types);
////		dto.setType("COOLING_SEC_FOR_IP");
//		dto.setTypes(types);
		Result result = PandaClient2.invoke("0020", "cardBinQry" , "123");
		System.out.println(result.getResult());
		String str = result.getResult();
		JSONArray array = JSONArray.fromObject(str);
		System.out.println(array.size());
		System.exit(0);
	}
}
