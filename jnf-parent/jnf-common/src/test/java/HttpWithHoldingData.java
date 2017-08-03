
/**
 * 
 */

/**
 * @author ZSMJ 二次握手
 */
public class HttpWithHoldingData {

	//金农私钥
	private static final String privateKey = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAL3RHqOftFSac8SB"
			+ "GTfLiYCGMT7KVGiXXuZxxeKyJ27DZtDjAjs7xG2R+2zGHpCtP7N59HGpJ0ot+NwN"
			+ "n3aUH1i8Anp3BiWMu5jgQQFMn+RHMAG30JMcwzf6fu6KFwDM7nbAB8Sw8USAP1o5"
			+ "xbuNe4TioV5U3UKfvYbaQlltu2JdAgMBAAECgYEAsbLY9SMopd9mK3sUSaiRFDIM"
			+ "XhT6SmQTIrc2IxDXW5kwYrNyPlOog08bymv650RZk0LDdbh+oLJC/HcAZvkqEcI1"
			+ "GeH4hv+YDydRLMf1YiKPDqF9q/juBOO14d4gzx6kgAdajn9PJldB3H/UC9OUUcRe"
			+ "/IpnRdepPMMHyfnGPl0CQQDhFE842hVKE6ogKM5S7brNHhEAyJTkmdNV434xe4B/"
			+ "de73V6B4a5+i69jf4F2LrqX5MmPKmPedz0I+DjXd3TezAkEA1+SvLNquhpB868Np"
			+ "d/lcyYgj5Ltv1xuNr4HESjnVKq+GvLsuyDodDty2jHHGm1EqO3elPiFtChIzUWIH"
			+ "Y/z1rwJBAJz+HYP6GX9h1/g2fjM5vmHz5sg1ICWTZeUymILLMgW1rMi5RiS4bNCm"
			+ "0M7XIGidmQcILrLRn2Vje0DtiIUIGCECQFjUIfNtosOBLbT/uSSA+Fl/Z21UZcb2"
			+ "8kwVM4Nq2jdu8xwyVCRULOKRk5ajtZjwQ1UmfFnc/PVY2b6RfAL68McCQDrwNHD9"
			+ "qCnJGoYX0fgYbVqMJQEQsUo/n79rDr5Wsk2XDwxvf12BuSeQvIoVVzLJbBbxbAx0" + "cC2kmpsW16iGk18=";

	//苏大天宫公钥
	//	private static final String publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5tOCnaxzZPN23w"+
	//			"W8aubrBeklBLKjZgl3GCT8UozukY1g2efkUuN/GXx1zvAFadfZJ61"+
	//			"EYyw1uvPG2Q2BBrmz699Dho50aaOyvgWhzvu1YfV/ugJsjCx1IZRr"+
	//			"PfBd1GbQ8kT4M9O63hi5SVfK+DuR/tveCV+vLi8Eq9wXE8K4eowIDAQAB";

	private static final String publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEmeULVi/fi03AgFbgzKZ2L/R3"
			+ "BtyuARa2YgrhyJlhMbW3QnmwmE6u1jj/mPuNvuE5aRts5Df1aPJMv2gvW9G6K4HO"
			+ "iqRgjAZujab2DOZzmYdmyuQycze3MmDiP3skEqul6ArrNyqc2FOEj/puFaxqprVD" + "2rudvkcBPDYRhozZMQIDAQAB";

	//	private static final String puUrl = "http://180.106.239.182:8013/pufinance/pu_api/";
	private static final String puUrl = "http://pocketuni.net/pufinance/pu_api";

	//	public static void main(String[]args){
	//		
	//		
	//		String service = "queryWithHolding";
	//		String charset = "UTF-8";
	//		String signType = "RSA";
	//		String timestamp = DateUtils.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss:SSS");
	//		String reqData = "<reqData><serialNo>6</serialNo></reqData>";
	//		
	//		String signContent = charset + reqData + service + signType + timestamp;
	//		String sign = RSAUtils.sign(signContent, privateKey);
	//		
	//		System.out.println(RSAUtils.sign("1", privateKey));
	//		
	//		
	//		String reqXMLDataTpl = "<message><service>{0}</service><charset>{1}</charset><signType>{2}</signType>"
	//				+ "<sign>{3}</sign><timeStamp>{4}</timeStamp>{5}</message>";
	//		String reqXMLData = MessageFormat.format(reqXMLDataTpl, service, charset, signType, sign, timestamp, reqData);
	//		
	//		
	//		System.out.println("请求报文>>>>>>>>" + reqXMLData);
	////		String data = HttpUtils.sendPost(puUrl, reqXMLData);
	//		String data = HttpUtils.sendPostViaProxy(puUrl, reqXMLData,"proxy.jsjngf.com","3128");
	//		System.out.println("响应报文>>>>>>>>" +data);
	//		
	//		
	//		//验签
	//		String resCode 	= "";
	//		String resMsg 	= "";
	//		String resData 	= "";
	//		String signx	= "";
	//		try {
	//			SAXReader reader = new SAXReader();
	//			Document doc = reader.read(new ByteArrayInputStream(data.getBytes("UTF-8")));
	//			Element root = doc.getRootElement();
	//
	//			resCode = root.element("resCode").getText();
	//			resMsg = root.element("resMsg").getText();
	//			signx = root.element("sign").getText();
	//			resData = StringUtils.getXmlTagValue(data, "resData");
	//
	//		} catch (Exception e) {
	//			e.printStackTrace();
	//		}
	//		
	//		signContent = resCode + resData +  resMsg;
	//		System.out.println(">>>>>>>>验签内容" + signContent);
	//		System.out.println("开始对返回报文验签...");
	//		boolean flag = RSAUtils.verify(signContent, publicKey, signx);
	//		System.out.println(flag ? "验签通过" : "验签失败");
	//		
	//	}

}
