package com.jsjn.jnf.protal.test.action;


import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jsjn.jnf.bean.bo.bank.SinglePaymentSecCheckReqBO;
import com.jsjn.jnf.bean.bo.bank.SinglePaymentSecCheckResBO;
import com.jsjn.jnf.bean.bo.bank.SinglePaymentSecCheckResDataBO;
import com.jsjn.jnf.common.security.RSAUtils;
import com.jsjn.jnf.common.utils.CacheUtils;
import com.jsjn.jnf.common.utils.Collections3;
import com.jsjn.jnf.common.utils.HttpUtils;


/**
 * 
 * @author ZSMJ
 * 清除缓存
 */
@Controller
@RequestMapping(value="/test")
public class ClearCache{
	
	public final static String TG_PRIVATEKEY = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALm04KdrHNk83bfB"
			+ "bxq5usF6SUEsqNmCXcYJPxSjO6RjWDZ5+RS438ZfHXO8AVp19knrURjLDW688bZD"
			+ "YEGubPr30OGjnRpo7K+BaHO+7Vh9X+6AmyMLHUhlGs98F3UZtDyRPgz07reGLlJV"
			+ "8r4O5H+294JX68uLwSr3BcTwrh6jAgMBAAECgYBbTI3WQVbhhocKvFK/NOiYDmLN"
			+ "ZANvTCSGJC2bG9VKsHzB652Fjo6VnFWCfL+9lZkMJmCsa8ei1cmP7ff40qRIt7TS"
			+ "Las1+hUo4ZhcpTi+JzBw/h65isleNm3IwaduW2gC+HYDGbbKlBR3dACbysLelt/a"
			+ "1lYWYEFp7xjgaWoDQQJBAOXReaJPPpmDSthJHYSSTXCBsPANZESlNH+VFs62/ajX"
			+ "aC6XzJ9nMhArc54pISMQMkbFgN4RLGJtRQhbHkCBPDsCQQDO3OiKnvfEhHqx8qJd"
			+ "JTXUJjlhhPHFx00StzYv1qFObKdhBVAx+42jRpF8Ml3O4xH2EkYztHJMkzinzaV+"
			+ "e0i5AkEAv2fqzUMA2SxfTqn+mqabNqPdcOFGbGHHyqaqWzpPI6tcSsoFE5IIQS1f"
			+ "Ww/YWHKp3QWrochd1hA52Y7CMGkydwJBAJvr2sORqwPPL4QtdMBsqbQs05dz06DV"
			+ "5nwy6H8Kci9gqpDwpk/mYg4txL8uX5LviLxHbe7PFlAtr8ibsyAw4NECQB9Y/7Tb"
			+ "3v+XLP+7uGnUOwadyW+msUAyXWhMswhSG9bVXHlmPUjUW8vMz03sWItleDVjr/BS" + "2Rg+Y+1cTRzlsR0=";
	
	@RequestMapping(value = "/querySinglePayment", method = RequestMethod.POST)
	public void querySinglePay(HttpServletRequest req, HttpServletResponse rsp){
		
		System.out.println("************** 商户二次握手接口调用开始333 *****************");
		
		String reqData = "<resData><serialNo>JNF0007</serialNo>"
				+ "<amount>30000.00</amount>"
				+ "<curCode>01</curCode>"
				+ "<externLoanNo>JNF支付合同号0001</externLoanNo>"
				+ "<payeeAccountName>疆酥枷得商么友线公司</payeeAccountName>"
				+ "<payeeAccountNo>70560188000150035</payeeAccountNo>"
				+ "<payeeBankName></payeeBankName>"
				+ "<payeeBankNo></payeeBankNo>"
				+ "<payorAccountName>酞洲恃姜堰溘乎颈区旅酉罚蘸有限宫丝</payorAccountName>"
				+ "<payorAccountNo>16200188000286264</payorAccountNo>"
				+ "<purpose>这是目的这是目的这是目的</purpose>"
				+ "<urgencyFlag>0</urgencyFlag></resData>";
		
		String resCode = "0";
		String resMsg = "test success";
		
		String signContent = resCode + reqData + resMsg;
		
		String sign = RSAUtils.sign(signContent, TG_PRIVATEKEY);
		
		String reqXMLDataTpl = "<message><sign>{0}</sign><resCode>{1}</resCode><resMsg>{2}</resMsg>{3}</message>";
		
		String reqXMLData = MessageFormat.format(reqXMLDataTpl, sign, resCode, resMsg, reqData);
		
		System.out.println("二次握手返回数据：" + reqXMLData);
		
		// 输出响应信息
		HttpUtils.writeRespToPage(reqXMLData, rsp);
		
		System.out.println("************** 商户二次握手接口调用结束 *****************");
	}
	
	/**
	 * OpenApi入口处理函数
	 * @param req
	 * @param rsp
	 */
	@RequestMapping(value = "/clearCache", method = RequestMethod.POST)
	public void openEntry(HttpServletRequest req, HttpServletResponse rsp){
		CacheUtils.remoceAll();
		// 输出响应信息
		HttpUtils.writeRespToPage("清除缓存成功", rsp);
	}

}
