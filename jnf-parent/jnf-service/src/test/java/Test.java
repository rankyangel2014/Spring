import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

import org.apache.commons.io.IOUtils;

import com.jsjn.jnf.common.security.Cryptos;

public class Test {
	public static void main(String[] args) throws Exception {
		// System.setProperty("http.proxyHost", "172.31.17.201");
		// System.setProperty("http.proxyPort", "3128");

		/*
		 * URL url = new URL(
		 * "http://172.31.50.110:8250/zs-web/services/ws/shzxForeignService?wsdl"
		 * ); Client client = new Client(url); Object[] result =
		 * client.invoke("idInfoVerif", new Object[] { "320821198608201112",
		 * "test", "320581001" }); Object[] result1 =
		 * client.invoke("qryBankCardBy4Element", new Object[] {
		 * "320821198608201112", "320821198608201112", "320821198608201112",
		 * "test", "320581001" }); System.out.println((result[0]).toString());
		 * System.out.println((result1[0]).toString());
		 */

		//测试加密算法
		加密解密数据库连接字符串();
	}

	public static void splitFile() throws FileNotFoundException, IOException {
		List<String> list = IOUtils.readLines(new FileInputStream(new File("C:\\Users\\Ghost\\Desktop\\jnf.log")));
		System.out.println(list.size());
	}

	public static void 加密解密数据库连接字符串() throws FileNotFoundException, IOException {
		splitFile();
		//加密方法
		System.out.println(Cryptos.aesEncrypt(""));
		//解密方法
		System.out.println(Cryptos.aesDecrypt(""));

	}
}
