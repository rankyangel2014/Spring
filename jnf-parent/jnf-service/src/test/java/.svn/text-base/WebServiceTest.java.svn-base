
import com.jsjn.jnf.common.utils.Encodes;
import com.jsjn.jnf.common.utils.network.WebServiceUtil;
import com.jsjn.jnf.dao.assist.DictDao;
import com.jsjn.panda.setup.ParseSpring;

public class WebServiceTest {

	DictDao dao = (DictDao) ParseSpring.context.getBean("dictDao");

	public void test() throws Exception {
//		String wsUrl = "http://172.31.55.61:8068/zs-web/services/ws/shzxForeignService?wsdl";
		String wsUrl = "http://172.31.10.144:8080/zs-web/services/ws/shzxForeignService?wsdl";
		String userName = "jsjnzfjsxt";
		String password = "19AB75959CCE6ABCE42F8064C8C0A53A";

		String name = "张三";
		String idNo = "440300199001010016";
		String preMobile = "18600000001";
		String accountNo = "6230580000000000005";
		String insttuid = "320000114";
		String cardType = "1";
		
		// 调用webservice接口返回结果
		String returnMsg = WebServiceUtil.invoke(wsUrl, userName, password, "qryBankCardBy4Element",
				new Object[] { Encodes.encodeBase64(idNo.getBytes("UTF-8")),
						Encodes.encodeBase64(name.getBytes("UTF-8")), 
						Encodes.encodeBase64(accountNo.getBytes("UTF-8")),
						Encodes.encodeBase64(preMobile.getBytes("UTF-8")),
						Encodes.encodeBase64(insttuid.getBytes("UTF-8")),
						Encodes.encodeBase64(cardType.getBytes("UTF-8")) });
		
		System.out.println(returnMsg);
		
		
//		String realname = "印从洋";
//		String realidNo = "341124199311067613";
//		String isPhoto = "false";
//		
//		
//		// 调用webservice接口返回结果
//		String returnMsg2 = WebServiceUtil.invoke(wsUrl, userName, password, "idInfoVerif",
//				new Object[] { Encodes.encodeBase64(idNo.getBytes("UTF-8")),
//						Encodes.encodeBase64(name.getBytes("UTF-8")), 
//						Encodes.encodeBase64(insttuid.getBytes("UTF-8")),
//						Encodes.encodeBase64(isPhoto.getBytes("UTF-8")) });
//
//		System.out.println(returnMsg2);

	}

	public static void main(String[] args) throws Exception {
		WebServiceTest t = new WebServiceTest();

		t.test();
	}
	
}
