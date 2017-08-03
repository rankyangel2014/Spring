import com.jsjn.jnf.common.utils.HttpUtils;

/**
 * 
 */

/**
 * @author ZSMJ
 * 
 */
public class APITest {

	//@Test
	public void realNameAuthBy4Element() throws Exception {
		String service = "realNameAuthBy4Element";
		String reqData = "<reqData><custName>张三</custName><idNo>140602199106019015</idNo><bankCardNo>9558800200135073266</bankCardNo><mobile>15656565656</mobile></reqData>";
		HttpUtilsTest.test(service, reqData);
	}

	//@Test
	public void realNameAuthByMessage() throws Exception {
		String service = "realNameAuthByMessage";
		String reqData = "<reqData><custName>张三</custName><idNo>140602199106019015</idNo><bankCardNo>9558800200135073266</bankCardNo><mobile>15656565656</mobile><token>ac97e0a20cc84c6192b40badeec5ad15</token><code>2244</code></reqData>";
		HttpUtilsTest.test(service, reqData);
	}

	//@Test
	public void cardBINQuery() throws Exception {
		//		for(int i = 0 ; i < 3 ; i++){
		//			String service = "cardBINQuery";
		//			String reqData = "<reqData><bankCardNo>6217000830000123038</bankCardNo></reqData>";
		//			HttpUtilsTest.test(service, reqData);
		//		}
		//		
		//		Thread.sleep(11000);

		String service = "cardBINQuery";
		String reqData = "<reqData><bankCardNo>6228769888837178276</bankCardNo></reqData>";
		HttpUtilsTest.test(service, reqData);

	}

	//@Test
	public void tradeFlowQuery() throws Exception {
		String service = "tradeFlowQuery";
		String reqData = "<reqData><startDt>20160415</startDt><endDt>20160415</endDt></reqData>";
		HttpUtilsTest.test(service, reqData);
	}

	//@Test
	public void singlePaymentQuery() throws Exception {
		String service = "singlePaymentQuery";
		String reqData = "<reqData><tranNo>T10020017032900000337</tranNo></reqData>";
		HttpUtilsTest.test(service, reqData);
	}

	//@Test
	public void clearCache() throws Exception {
		HttpUtils.sendPost("http://172.31.210.59:8080/jnf-protal/test/clearCache", "");
	}

	//@Test
	public static void singlePayTest() throws Exception {
		String service = "bankSinglePaymentTrade";
		String reqData = "<reqData><serialNo>JNF0009</serialNo>" + "<amount>30000.00</amount>"
				+ "<curCode>01</curCode>" + "<externLoanNo>JNF支付合同号0001</externLoanNo>"
				+ "<payeeAccountName>疆酥枷得商么友线公司</payeeAccountName>"
				+ "<payeeAccountNo>70560188000150035</payeeAccountNo>" + "<payeeBankName></payeeBankName>"
				+ "<payeeBankNo></payeeBankNo>" + "<payorAccountName>酞洲恃姜堰溘乎颈区旅酉罚蘸有限宫丝</payorAccountName>"
				+ "<payorAccountNo>16200188000286264</payorAccountNo>" + "<purpose>这是目的这是目的这是目的</purpose>"
				+ "<urgencyFlag>0</urgencyFlag></reqData>";
		HttpUtilsTest.test(service, reqData);
	}

	//@Test
	public void testWithHoldInfo() throws Exception {
		String service = "queryWithholdinginfos";
		StringBuffer reqData = new StringBuffer("<reqData>");
		reqData.append("<tranNo>T10010016082200000181</tranNo>");
		reqData.append("<serialNo>JNF0002</serialNo>");
		reqData.append("</reqData>");
		HttpUtilsTest.test(service, reqData.toString());
	}

	//@Test
	public void testQuerySignInfos() throws Exception {
		String service = "querySignInfo";
		StringBuffer reqData = new StringBuffer("<reqData>");
		reqData.append("<loanNo>112233</loanNo>");
		reqData.append("<orgNo>2233</orgNo>");
		reqData.append("</reqData>");
		HttpUtilsTest.test(service, reqData.toString());
	}

	/**
	 * 单笔代扣
	 * 
	 * @throws Exception
	 */
	//@Test
	public void 单笔代扣() throws Exception {
		String service = "singleWithHold";
		//		String reqData = "<reqData><serialNo>GUOCAI1004</serialNo>"
		//				+ "<orgNo>320582301</orgNo>"
		//				+ "<loanNo>101</loanNo>"
		//				+ "<cardSignNo>C100220160920000023</cardSignNo>"
		//				+ "<custName>张借款</custName>"
		//				+ "<custIdNo>623024199209163522</custIdNo>"
		//				+ "<curCode></curCode>"
		//				+ "<amount>3300.01</amount></reqData>";
		String reqData = "<reqData><serialNo>GUOCAI1214121222</serialNo>" + "<orgNo>320000114</orgNo>"
				+ "<loanNo>557</loanNo>" + "<cardSignNo>C100220170418000213</cardSignNo>"
				+ "<custName>疆酥枷得商么友线公司</custName>" + "<custIdNo>450321198608208626</custIdNo>" + "<curCode></curCode>"
				+ "<amount>100.01</amount><remark>备注</remark></reqData>";
		HttpUtilsTest.test(service, reqData);
	}

	/**
	 * pl代扣
	 * 
	 * @throws Exception
	 */
	//@Test
	public void batchWithHold() throws Exception {
		String service = "batchWithHold";
		String reqData = "<reqData>" + "<batchNo>32000011420170210133808</batchNo>"
				+ "<sign>9A6F3B796091962417089F651DEEE13F</sign>"
				+ "<fileName>/opt/vsftpd/xftp/320000114_20170210133808</fileName>" + "</reqData>";
		HttpUtilsTest.test(service, reqData);
	}

	/**
	 * 对账
	 * 
	 * @throws Exception
	 */
	//	@Test
	public void verifyAcct() throws Exception {
		String service = "verifyAcct";
		String reqData = "<reqData>" + "<verifyDate>20150420</verifyDate>"
				+ "<fileName>/opt/vsftpd/xftp/VER_20170210135903</fileName>" + "</reqData>";
		HttpUtilsTest.test(service, reqData);
	}

	/**
	 * 查询银行卡号
	 * 
	 * @throws Exception
	 */
	//	@Test
	public void queryOrgCardNo() throws Exception {
		String service = "queryInsttuCardNo";
		String reqData = "<reqData>" + "<orgNo>320000114</orgNo>" + "</reqData>";
		HttpUtilsTest.test(service, reqData);
	}

	public void 卡宾查询() throws Exception {
		String service = "bankCardInfoQuery";
		String reqData = "<reqData>" + "<orgNo>320000114</orgNo>" + "<bankCardNo>6226605362420031245</bankCardNo>"
				+ "</reqData>";
		HttpUtilsTest.test(service, reqData);
	}

	public void 四要素认证() throws Exception {
		String service = "bankCardValidate";
		String reqData = "<reqData>" + "<orgNo>320000114</orgNo>" + "<name>123678900987651</name>"
				+ "<idNo>140602199106019015</idNo>" + "<cardNo>9558800200135073266</cardNo>"
				+ "<mobile>15656565656</mobile>" + "</reqData>";
		HttpUtilsTest.test(service, reqData);
	}

	public void 机构业务查询() throws Exception {
		String service = "orgBusinessTypeQry";
		String reqData = "<reqData>" + "<orgNo>1</orgNo>" + "</reqData>";
		HttpUtilsTest.test(service, reqData);
	}

	public void 代扣签约() throws Exception {
		String service = "signWithhold";
		String reqData = "<reqData>" + "<orgNo>320000114</orgNo>" + "<loanNo>557</loanNo>"
				+ "<contNo>借款合同201600071</contNo>" + "<custName>疆酥枷得商么友线公司</custName>"
				+ "<idNo>450321198608208626</idNo>" + "<cardNo>6228769888837178276</cardNo>"
				+ "<mobile>15851385052</mobile>" + "<signFile>a.png#1,3610a1d34c1c</signFile>"
				+ "<idFrontFile>a.png#6,360eb55d4c5f</idFrontFile>" + "<idBackFile>a.png#6,360eb55d4c5f</idBackFile>"
				+ "<cancelAble>Y</cancelAble>" + "<channelSign>123</channelSign>" + "<isBatchPay>Y</isBatchPay>"
				+ "<payStartDay>0</payStartDay>" + "</reqData>";
		HttpUtilsTest.test(service, reqData);
	}

	public void 放款() throws Exception {
		String service = "paymentTransaction";
		String reqData = "<reqData><_id>0</_id><aid>C100220170502000227</aid><orgNo>320000114</orgNo><loanNo>557</loanNo><amount>1.00</amount>"
				+ "<payeeAccountNo>6228769888837178276</payeeAccountNo>"
				+ "<payeeAccountName>疆酥枷得商么友线公司</payeeAccountName>"
				+ "<payeeBankNo>111</payeeBankNo><payeeBankName>1231123</payeeBankName>"
				+ "<serialNo>320000114289071111</serialNo></reqData>";
		HttpUtilsTest.test(service, reqData);
	}

	public static void main(String[] args) throws Exception {
		APITest test = new APITest();
		//		test.singlePaymentQuery();
		//		test.realNameAuthBy4Element();
		//		test.queryOrgCardNo();
		//		singlePayTest();
		//		singlePayTest();
		//		System.out.println("卡宾查询");
		test.四要素认证();
		//		System.out.println("四要素认证");
		//		test.四要素认证();
		//		System.out.println("机构业务查询");
		//		test.机构业务查询();
		//		System.out.println("代扣签约");
		//		test.代扣签约();
		//		System.out.println("放款");
		//		test.放款();
		//		System.out.println("单笔代扣");
		//		test.代扣签约();

	}

}
