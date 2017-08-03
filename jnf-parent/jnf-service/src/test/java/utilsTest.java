import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.bo.bank.SinglePaymentTradeResBO;
import com.jsjn.jnf.bean.bo.bank.SinglePaymentTradeResDataBO;
import com.jsjn.jnf.bean.bo.base.BaseOpenResBO;
import com.jsjn.jnf.bean.bo.integration.tfb.response.TfbResSingleWithHold;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.BeanUtils;

public class utilsTest {
	public static void main(String[] args) {
		cryptosUtils();
		//    	fastJsonUtils();
		//    	beanUtils();
	}

	public static void beanUtils() {
		Map<String, Object> map = new HashMap<String, Object>();
		TfbResSingleWithHold bean = new TfbResSingleWithHold();

		map.put("spid", "value1");
		map.put("spbillno", "value2");

		BeanUtils.transMap2Bean(map, bean);

		System.out.println(bean.getSpid());
		System.out.println(bean.getSpbillno());

		Map<String, Object> map2 = new HashMap<String, Object>();
		TfbResSingleWithHold bean2 = new TfbResSingleWithHold();

		bean2.setCur_type("value01");
		bean2.setSpbillno("value02");

		map2 = BeanUtils.transBean2Map(bean2);
		System.out.println(map2.get("cur_type"));
		System.out.println(map2.get("spbillno"));
	}

	public static void fastJsonUtils() {

		//返回结果
		BaseOpenResBO resDto = new SinglePaymentTradeResBO();
		//		SinglePaymentTradeResDataBO resDataDto = new SinglePaymentTradeResDataBO();
		//		
		//		resDataDto.setStat("1");
		//		resDataDto.setSerialNo("JNF0004");
		//		resDataDto.setTranNo("T10010016082200000184");
		//		
		//		resDto.setResData(resDataDto);
		//		resDto.setResMsg("响应成功！");
		//		resDto.setResCode(ReturnCode.SUCCESS);

		String json = "{\"resCode\":\"000000\",\"resData\":{\"serialNo\":\"JNF0005\",\"stat\":\"1\",\"tranNo\":\"T10010016082200000185\"},\"resMsg\":\"响应成功！\"}";

		System.out.println(json);

		resDto = JSONObject.parseObject(json, resDto.getClass());

		System.out.println(resDto.getClass().toString());

		SinglePaymentTradeResDataBO resDataDto = (SinglePaymentTradeResDataBO) resDto.getResData();

		System.out.println(resDataDto.getSerialNo());
	}

	//aes加解密
	public static void cryptosUtils() {
		String DEFAULT_KEY = "9f58a20946b47e190003ec716c1c457d";

		/**
		 * commonValue pro_sault: "/Users/admin/Documents/workspace/abc.png"
		 * 
		 * jdbc:oracle:thin:@172.31.55.80:1521:ora10g
		 */

		/**
		 * cryptValue user=9d7fe7649afd79b56bb71225f14b8cf9
		 * password=12f4d96864b63a4a1877debada27c012 jdbcUrl=6d3f6
		 * aa79b81aa8422260106c5e974ead79356939ccc4057c069057f87b761dfe1534195fad57a6c610f4a6cf75e4ec5
		 */

		String commonValue = "jdbc:oracle:thin:@172.31.19.103:1521:ora10g";
		//    	String commonValue = "微贷系统";

		//    	String cryptValue = "a2de2cc6782e854b517f16db06cb3d74";

		String cryptValue = "6d3f6aa79b81aa8422260106c5e974ea3f6653b4cacb7b0014d123666906976707b822eaf5b216eb2374bc0ecda640af";

		//解密
		//    	String decryptValue = Cryptos.aesDecrypt(cryptValue);
		//    	
		//    	System.out.println("解密1后为："+ decryptValue);

		//    	//解密
		String decryptValue2 = Cryptos.aesDecrypt(cryptValue, DEFAULT_KEY);

		System.out.println("解密2后为：" + decryptValue2);
		//    	
		//加密1
		String encryptValue1 = Cryptos.aesEncrypt(commonValue, DEFAULT_KEY);

		System.out.println("加密1后为：" + encryptValue1);
		//    	
		//    	//加密2
		//    	String encryptValue2 = Cryptos.aesEncrypt(commonValue, DEFAULT_KEY);
		//    	
		//    	System.out.println("加密2后为：" + encryptValue2);

	}
}
