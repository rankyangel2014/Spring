import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.junit.Test;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.dto.assist.BizConfigDto;
import com.jsjn.jnf.bean.dto.assist.DigestDto;
import com.jsjn.jnf.bean.dto.base.BaseDTO;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.bean.dto.trade.TransactionDto;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.security.DataBaseEncrypt;
import com.jsjn.jnf.common.security.SaltManager;
import com.jsjn.jnf.common.security.SignatureServiceHandler;
import com.jsjn.jnf.common.utils.SensitiveInfoUtils;

import com.jsjn.jnf.service.assist.impl.BusinessConfigServiceImpl;
import com.jsjn.jnf.service.member.impl.MemberServiceImpl;
import com.jsjn.panda.setup.ParseSpring;

public class DataInitializationTest {

	@Test
	public void initDbData() throws BussinessException, ParseException {
		MemberServiceImpl memberServiceImpl = (MemberServiceImpl) ParseSpring.context.getBean("memberServiceImpl");

		BusinessConfigServiceImpl configServiceImpl = (BusinessConfigServiceImpl) ParseSpring.context
				.getBean("businessConfigServiceImpl");
		System.out.println(SaltManager.getDigestSalt());
		/**
		 * 商户用户
		 */
		MemberDto memberDto = new MemberDto();
		memberDto.setCustId("M100100000001");
		memberDto.setCustName(Cryptos.aesEncrypt("苏州天宫信息技术有限公司"));
		System.out.println(memberDto.getCustName());
		memberDto.setMId("1001");
		memberDto.setCustType("3");
		memberDto.setMobile(Cryptos.aesEncrypt("15705172120"));
		System.out.println(memberDto.getMobile());
		memberDto.setState("1");
		memberDto.setIsReal("1");
		memberDto.setRemark("苏大天宫商户用户");
		memberDto.setIdType("2");
		memberDto.setIdNo(Cryptos.aesEncrypt("913205943212172861"));
		System.out.println(memberDto.getIdNo());
		memberDto.setExtCustId("");
		memberDto.setInsttuId("");
		memberDto.setCreated(new Date());
		memberDto.setModified(new Date());
		memberDto.setDigest(memberDto.buildDigest());
		memberDto.setIsNewRecord(true);
		System.out.println("M100100000001摘要:" + memberDto.getDigest());

		//memberServiceImpl.save(memberDto);
		//
		/**
		 * 商户投资人
		 */
		MemberDto memberDto1 = new MemberDto();
		memberDto1.setCustId("M100100000002");
		memberDto1.setCustName(Cryptos.aesEncrypt("常熟市康欣农村小额贷款股份有限公司"));
		System.out.println(memberDto1.getCustName());
		memberDto1.setMId("1001");
		memberDto1.setCustType("1");
		memberDto1.setMobile(Cryptos.aesEncrypt("13151591525"));
		System.out.println(memberDto.getMobile());
		memberDto1.setState("1");
		memberDto1.setIsReal("1");
		memberDto1.setRemark("苏大天宫投资人用户");
		memberDto1.setIdType("2");
		memberDto1.setIdNo(Cryptos.aesEncrypt("913205006902807071"));
		System.out.println(memberDto.getIdNo());
		memberDto1.setExtCustId("");
		memberDto1.setInsttuId("320581001");
		memberDto1.setCreated(new Date());
		memberDto1.setModified(new Date());
		memberDto1.setDigest(memberDto1.buildDigest());
		memberDto1.setIsNewRecord(true);
		System.out.println("M100100000002摘要:" + memberDto1.getDigest());

		//memberServiceImpl.save(memberDto1);

		/**
		 * 商户接入信息
		 */
		BizConfigDto config = new BizConfigDto();
		config.setMid("1001");
		config.setAppkey("3ae1214cb072428094a471ca7f7e2509");
		config.setWhiteList("172.31.210.10;172.31.210.191;172.31.210.59;222.190.122.221;180.106.239.182");
		config.setRsaPubKey(
				"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5tOCnaxzZPN23wW8aubrBeklBLKjZgl3GCT8UozukY1g2efkUuN/GXx1zvAFadfZJ61EYyw1uvPG2Q2BBrmz699Dho50aaOyvgWhzvu1YfV/ugJsjCx1IZRrPfBd1GbQ8kT4M9O63hi5SVfK+DuR/tveCV+vLi8Eq9wXE8K4eowIDAQAB");
		config.setDigest(config.buildDigest());
		System.out.println("M1001接入摘要:" + config.getDigest());
		config.setIsNewRecord(true);
		//configServiceImpl.save(config);

	}

	@Test
	public void initDictData() {
		MemberServiceImpl memberServiceImpl = (MemberServiceImpl) ParseSpring.context.getBean("memberServiceImpl");

		String webServiceUsername = "jsjnzfjsxt";
		String webServicePassword = "19AB75959CCE6ABCE42F8064C8C0A53A";
		String middleMd5Key = "786B530230B772607DDE9CA514C83D1E";
		System.out.println(Cryptos.aesEncrypt(webServiceUsername));
		System.out.println(Cryptos.aesEncrypt(webServicePassword));
		System.out.println(Cryptos.aesEncrypt(middleMd5Key));

	}

	@Test
	public void initPropertiesData() throws IOException {
		SignatureServiceHandler serviceHandler = (SignatureServiceHandler) ParseSpring.context
				.getBean("signatureServiceHandler");
		System.out.println(serviceHandler);
		
		String defaultKey =  DataBaseEncrypt.DEFAULT_KEY;
		String driverClass = "oracle.jdbc.driver.OracleDriver";
		String jdbcurl = "jdbc:oracle:thin:@172.31.19.91:1521:ora10g";
		String user = "as_jnf";
		String passwd = "password";

		Map<String, String> map = new HashMap<String, String>();
		map.put("driverClass", driverClass);
		map.put("jdbcUrl", Cryptos.aesEncrypt(jdbcurl, defaultKey));
		map.put("user", Cryptos.aesEncrypt(user, defaultKey));
		map.put("password", Cryptos.aesEncrypt(passwd, defaultKey));
		String path = "E:/payworks/jnf-parent/jnf-service/src/main/resources";
		File file = new File(path + "/jdbc.properties");
		writePropertiesFile(file, map);

		String keystorePasswd = "1234qwer";
		String saltFilePath = "D:\\abc\\abc.png";//"/usr/share/Tomcat/domain/abc.png"
		System.out.println(saltFilePath);
		String certFilePath = "classpath:jnf.pfx";
		String saltDebugMode = "false";

		Map<String, String> map2 = new HashMap<String, String>();
		map2.put("certFilePath", Cryptos.aesEncrypt(certFilePath, defaultKey));
		map2.put("keystorePasswd", Cryptos.aesEncrypt(keystorePasswd, defaultKey));
		map2.put("saltFilePath", Cryptos.aesEncrypt(saltFilePath, defaultKey));
		map2.put("saltDebugMode", saltDebugMode);
		map2.put("defaultKey", defaultKey);
		File file2 = new File(path + "/0aa7052e738a4e43aefa38380f6fda4c.properties");
		writePropertiesFile(file2, map2);
		System.out.println("complate!");
	}
	
	@Test
	public void testPage(){
		
//		MemberServiceImpl memberServiceImpl = (MemberServiceImpl) ParseSpring.context
//				.getBean("memberServiceImpl");
//		MemberDto memberDto = new MemberDto();
//		memberDto.setStart(0);
//		memberDto.setLimit(1);
//		BaseDTO<MemberDto> memberDto1 = memberServiceImpl.findPage(memberDto);
//		
//		System.out.println(memberDto1.getTotal());
//		System.out.println(memberDto1.getRoot());
//		
//		MemberDto memberDto2 = (MemberDto) SensitiveInfoUtils.getObject(memberDto1);
//		System.out.println(JSON.toJSONString(memberDto2));
//		
//		String json = SensitiveInfoUtils.getJson(memberDto1);
//		System.out.println(json);
		
	}

	// 写资源文件，含中文
	public static void writePropertiesFile(File file, Map<String, String> map) {
		Properties properties = new Properties();
		try {
			OutputStream outputStream = new FileOutputStream(file);
			for (Map.Entry<String, String> entry : map.entrySet()) {
				properties.setProperty(entry.getKey(), entry.getValue());
			}
			properties.store(outputStream, null);
			outputStream.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
