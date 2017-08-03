import java.text.MessageFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.jsjn.jnf.bean.bo.bank.SingleWithHoldReqBO;
import com.jsjn.jnf.bean.bo.bank.SingleWithHoldResBO;
import com.jsjn.jnf.bussiness.bank.impl.BankSingleWithHoldServiceImpl;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.mapper.JaxbMapper;
import com.jsjn.jnf.common.security.RSAUtils;
import com.jsjn.jnf.common.utils.Collections3;
import com.jsjn.jnf.common.utils.DateUtils;

public class WithHoldTest {

	public void singleWithHold() {

	}

	public static void main(String[] args) {
		//		String JN_PUBLICKEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC90R6jn7RUmnPEgRk3y4mAhjE+"
		//				+ "ylRol17mccXisiduw2bQ4wI7O8Rtkftsxh6QrT+zefRxqSdKLfjcDZ92lB9YvAJ6"
		//				+ "dwYljLuY4EEBTJ/kRzABt9CTHMM3+n7uihcAzO52wAfEsPFEgD9aOcW7jXuE4qFeVN1Cn72G2kJZbbtiXQIDAQAB";

		String service = "test";
		String timestamp = DateUtils.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss:SSS");
		String appkey = "526f968454c14984d53b77fd3d26d119";
		String charset = "UTF-8";
		String signType = "RSA";

		String WD_PRIVATEKEY = "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBALAVnUkrBxmU25Kq"
				+ "U5QW+gyTnWSqNhOxM4fBJhCztzh4IE9J6z/jAouSEYnlBe1zYlMVJIsDHY1TZShE"
				+ "ijNa60FKWeH+B2fC9JcKuiVYu24auhaQkcv6O39/v0j/vfg2ULfDRsXXOHglebae"
				+ "hYqN1lC4Fi1qhtkAryTCAGb2CBs/AgMBAAECgYBeXkccNn4onJmModIHFMVPxjDd"
				+ "CUfQB/DY+Y/f9aDlF6QhOjlk1NHBYTgbEe26U1NHuZYLFlFZM2+MRCdY3IolYREO"
				+ "ImSWmzt2774SaD6n+R6LttmgsvgmJmQr0qH+fTjh5MrFnyZhAgdBmKRzGt7N5qKj"
				+ "GSsSXXR8rBNnDfdskQJBANZU7G4048YR6VKFY1CsYsZqKTjME8jVF/CMWjnxl/60"
				+ "sJ4WS72VlwKhaGpokXmBLID+ttSoGNqXTH0Yd2jxh4kCQQDSUSkrbENHwu9pLMpS"
				+ "3Kf1DYOS9g3Q4JOMwx94Pa1nFc5iKzgDqw5hl1gjhhlsmVuZPohOPF6jGitA/c7f"
				+ "khKHAkApwngibNmoQNsmAek80amZIRwQ/eoo6iP08VOvEHxd2xTCaHOvZ5L5pzsx"
				+ "6FfXxaxHIdm7i1j0ViBIC1lQsCaJAkBPg0GmWgrhsZAj2jwvsZ6KJe7Ne9rjUlRW"
				+ "TlqycdcB9xuMv7wwntYUDUzUOVmZVi1sNVkBAw/gZ/9cVdiFa8s3AkAgjTeJsy+x"
				+ "t1UoqXBHkAnF8gDabTw+tEpyYhStgC/LwGjxaQ0Kbft0TIwZjlnfFD7NtFUG2QXP" + "367+5PhAzPOd";

		//		String reqData = "<reqData><serialNo>SUNNING10001</serialNo>"
		//				+ "<orgNo>320000114</orgNo>"
		//				+ "<loanNo>82</loanNo>"
		//				+ "<cardSignNo>C100220160928000066</cardSignNo>"
		//				+ "<custName>陈华</custName>"
		//				+ "<custIdNo>330825198701073012</custIdNo>"
		//				+ "<curCode></curCode>"
		//				+ "<amount>100.01</amount></reqData>";

		String reqData = "<reqData><serialNo>GUOCAI10001</serialNo>" + "<orgNo>320000114</orgNo>"
				+ "<loanNo>70</loanNo>" + "<cardSignNo>C100220160928000067</cardSignNo>"
				+ "<custName>个人正式客户05</custName>" + "<custIdNo>44030319750113498X</custIdNo>" + "<curCode></curCode>"
				+ "<amount>100.00</amount></reqData>";

		Map<String, String> map = new HashMap<String, String>();
		map.put("service", "test");
		map.put("appkey", appkey);
		map.put("charset", charset);
		map.put("signType", signType);
		map.put("reqData", reqData);
		map.put("timestamp", String.valueOf(timestamp));
		String signContent = Collections3.getValuesOrderByKey(map);
		String sign = RSAUtils.sign(signContent, WD_PRIVATEKEY);
		String reqXMLDataTpl = "<message><service>{0}</service><appkey>{1}</appkey><charset>{2}</charset><signType>{3}</signType>"
				+ "<sign>{4}</sign><timeStamp>{5}</timeStamp>{6}</message>";
		String reqXMLData = MessageFormat.format(reqXMLDataTpl,
				service,
				appkey,
				charset,
				signType,
				sign,
				timestamp,
				reqData);

		System.out.println("********************* request start **********************");
		System.out.println(reqXMLData);
		System.out.println("********************* request end **********************");

		SingleWithHoldReqBO inDto = new SingleWithHoldReqBO();

		inDto = JaxbMapper.fromXml(reqXMLData, SingleWithHoldReqBO.class);

		inDto.setXml(reqXMLData);
		inDto.setMid("1002");

		System.out.println(inDto.getAppkey());

		BankSingleWithHoldServiceImpl impl = new BankSingleWithHoldServiceImpl();
		try {
			SingleWithHoldResBO resDto = impl.singleWithHold(inDto, true);

			System.out.println(resDto.getResCode());
			System.out.println(resDto.getResMsg());
		} catch (BussinessException e) {

			System.out.println(e.getErrorCode() + e.getMessage());
		}

	}

}
