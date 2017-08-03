import org.junit.Test;

import com.jsjn.jnf.bean.dto.account.BindCardDto2;
import com.jsjn.jnf.bean.dto.assist.BizConfigDto;
import com.jsjn.jnf.bean.dto.assist.DictDto;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.bean.dto.withhold.InvestorChannelDto;
import com.jsjn.jnf.bean.dto.withhold.SignInfoDto;
import com.jsjn.jnf.bean.dto.withhold.UserThirdAccountDto;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.ValidatorUtil;
import com.jsjn.jnf.dao.account.BindCardDao2;
import com.jsjn.jnf.dao.assist.BizConfigDao;
import com.jsjn.jnf.dao.member.MemberDao;
import com.jsjn.jnf.service.assist.DictService;
import com.jsjn.jnf.service.assist.SequenceService;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.jnf.service.withhold.InvestorChannelService;
import com.jsjn.jnf.service.withhold.SignInfoService;
import com.jsjn.jnf.service.withhold.UserThirdAccountService;
import com.jsjn.panda.setup.ParseSpring;

public class DaoTest {

	private final String mid = "1002";

	private final BizConfigDao bizConfigDao = (BizConfigDao) ParseSpring.context.getBean("bizConfigDao");

	/**
	 * 配置表
	 */
	private final DictService dictService = (DictService) ParseSpring.context.getBean("dictServiceImpl");

	/**
	 * sequence
	 */
	private static SequenceService sequenceService = (SequenceService) ParseSpring.context.getBean("sequenceServiceImpl");

	/**
	 * 用户表
	 */
	private final MemberDao memberDao = (MemberDao) ParseSpring.context.getBean("memberDao");

	/**
	 * 用户绑卡表T21
	 */
	private final UserThirdAccountService userThirdAccountService = (UserThirdAccountService) ParseSpring.context.getBean("userThirdAccountServiceImpl");

	/**
	 * 签约信息表T22
	 */
	private final SignInfoService signInfoService = (SignInfoService) ParseSpring.context.getBean("signInfoServiceImpl");

	/**
	 * 投资人渠道T24
	 */
	private final InvestorChannelService investorChannelService = (InvestorChannelService) ParseSpring.context.getBean("investorChannelService");

	public static void main(String[] args) {
		DaoTest t = new DaoTest();

		//		t.selectDictDao();
		//		t.insertUserThirdAcct();
		//		t.insertUser();
		//		t.insertCard();
		//		t.insertDictDao();
		//		t.insertUserThirdAcct();
		//		t.insertSignInfo();
		//				t.test();
		t.updateBizConfig();
	}

	public void test() {
		String custName = "张借款";

		System.out.println(Cryptos.aesEncrypt(custName));
	}

	public void investorChannelService() {
		new InvestorChannelDto();

		//		dto.setCustId(custId);
	}

	public void insertSignInfo() {
		//        SignInfoServiceImpl impl = new SignInfoServiceImpl();

		//收款人
		String payeeUserId = "M100200001012";

		//渠道
		String bindChannel = "CH11";

		//借款人
		String payerUserId = "M100200001013";
		String payerBindAccId = "AM10020000101300000027";

		SignInfoDto dto = new SignInfoDto();
		dto.setAid(SequenceUtils.getSignInfoSeq(this.mid));
		//		dto.setAid("C100220160921000024");
		dto.setmId(this.mid);
		dto.setBindChannel(bindChannel);
		dto.setPayeeUserId(payeeUserId);
		dto.setPayerUserId(payerUserId);
		dto.setPayerBindAccId(payerBindAccId);
		dto.setType("1");
		dto.setState("3");
		dto.setLoanNo("2");
		dto.setDigest(dto.buildDigest());

		this.signInfoService.insert(dto);
	}

	@Test
	public void insertUserThirdAcct() {
		UserThirdAccountDto dto = new UserThirdAccountDto();

		String custId = "M100200001013";
		String bindAccNo = "6222023035847721555";
		String custName = "JNF_TEST_01";
		String custIdNo = "111811111111111";
		String mobile = "15612345678";
		//		String custName = "黄晓明";
		//		String custIdNo = "330726196507040016";
		//		String mobile = "18651661234";
		//		String custName = "JNF_TEST_01";
		//		String idNo = "111811111111111";
		//		String phoneNo = "15612345678";

		//		dto.setAccNo(SequenceUtils.getThirdAcctSeq(custId));
		dto.setAccNo("AM10020000101300000027");
		dto.setStatus("1");
		dto.setCustId(custId);
		dto.setmId(this.mid);
		dto.setBindAccType("01");
		dto.setBindAccNo(Cryptos.aesEncrypt(bindAccNo));
		dto.setCustName(Cryptos.aesEncrypt(custName));
		dto.setCustIdNo(Cryptos.aesEncrypt(custIdNo));
		dto.setMobile(Cryptos.aesEncrypt(mobile));
		dto.setCardBankCode("ICBKCNBJ");
		dto.setRemark("姓名= " + custName + "卡号= " + bindAccNo + "银行卡编码= " + dto.getCardBankCode());

		dto.setDigest(dto.buildDigest());

		System.out.println(Cryptos.aesEncrypt("疆酥枷得商么友线公司"));
		//		this.userThirdAccountService.insert(dto);
	}

	/**
	 * 字典表新增记录
	 */
	@Test
	public void insertDictDao() {
		Long.parseLong(sequenceService.getSeq("JNF_SEQ_T12"));

		DictDto dictDto = new DictDto();
		//		dictDto.setId(dictId);
		//		dictDto.setValue("http://apitest.tfb8.com/cgi-bin/v2.0/api_acp_single_query.cgi");
		//		dictDto.setLabel("宏图三胞天付宝代扣结果查询地址");
		//		dictDto.setType("TFB_URL_WITHHOLD_QUERY");
		//		dictDto.setDesc("宏图三胞天付宝代扣结果查询地址");
		//		dictDto.setSort("0");
		//		dictDto.setParentId("0");

		this.dictService.addDictInfo(dictDto);
	}

	/**
	 * 查询字典表(JNF_T12)
	 */
	public void selectDictDao() {
		String key = "NO_PAYMENT_START_TIME";
		//		String value = dictDao.findByType(key);
		String value = this.dictService.findByType(key);
		System.out.println(value);
	}

	/**
	 * 更新商户接入表(JNF_T5)
	 */
	public void updateBizConfig() {
		String WD_PUBLICKEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwFZ1JKwcZlNuSqlOUFvoMk51kqjYTsTOHwSYQs7c4eCBPSes/4wKLkhGJ5QXtc2JTFSSLAx2NU2UoRIozWutBSlnh/gdnwvSXCrolWLtuGroWkJHL+jt/f79I/734NlC3w0bF1zh4JXm2noWKjdZQuBYtaobZAK8kwgBm9ggbPwIDAQAB";

		String WD_APPKEY = "526f968454c14984d53b77fd3d26d119";

		BizConfigDto config = new BizConfigDto();
		config.setMid("1002");
		config.setAppkey(WD_APPKEY);
		config.setWhiteList("172.31.10.75;172.31.10.236;172.31.10.214;172.31.19.62;127.0.0.1;172.31.19.82;180.1.52.207;172.31.19.77;172.31.19.94;172.31.19.72");
		config.setRsaPubKey(WD_PUBLICKEY);
		config.setDigest(config.buildDigest());

		//		config.setMid("9999");
		//		config.setAppkey("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
		//		config.setWhiteList("222.190.122.222");
		//		config.setRsaPubKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCszb7Oe3663YvEttxYA3ohZPOK6pxJtNzZDnmwr5NsaGnK0Z5Zwtcjr5Olo20XjJAZ5OYRpM5Sou2psXP+UGhJmnYQarOpSJyGWEV5dqsjRLjcHxaIoXrBrh+qU18n+nKcWJstvusdO0NzPQdWNAM2YwtadZ5CEMlGRG7Ha7sbyQIDAQAB");
		//		config.setDigest(config.buildDigest());

		//		config.setMid("1001");
		//		config.setAppkey("3ae1214cb072428094a471ca7f7e2509");
		//		config.setWhiteList("101.251.223.88;101.251.223.84;222.190.122.221;122.97.128.101;122.97.128.103");
		//		config.setRsaPubKey(
		//				"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEmeULVi/fi03AgFbgzKZ2L/R3BtyuARa2YgrhyJlhMbW3QnmwmE6u1jj/mPuNvuE5aRts5Df1aPJMv2gvW9G6K4HOiqRgjAZujab2DOZzmYdmyuQycze3MmDiP3skEqul6ArrNyqc2FOEj/puFaxqprVD2rudvkcBPDYRhozZMQIDAQAB");
		//		config.setDigest(config.buildDigest());

		System.out.println("1002接入摘要:" + config.getDigest());

		//		this.bizConfigDao.update(config);
	}

	/**
	 * 插入T12
	 */
	@Test
	public void insertUser() {

		MemberDto entity = new MemberDto();

		//		String custName = "疆酥枷得商么友线公司";
		//		String idNo = "513425199008167298";
		//		String phoneNo = "15850662789";

		//		String custName = "封腺痛一征蒂拭悟所";
		//		String phoneNo = "15908896676";
		//		String idNo = "370902195105017473";

		//		String custName = "酞洲恃姜堰溘乎颈区旅酉罚蘸有限宫丝";
		//		String idNo = "150223197803042467";
		//		String phoneNo = "15850663344";

		//		String custName = "张借款";
		//		String idNo = "623024199209163522";
		//		String phoneNo = "15699008877";

		String custName = "JNF_TEST_01";
		String idNo = "111811111111111";
		String phoneNo = "15612345678";

		//		String custName = "张家港昌盛小贷公司";
		//		String insttuId = "320581001";
		//		String idNo = "822101031419799100";
		//		String phoneNo = "15650668888";

		//		String custName = "微贷系统联调测试小贷公司";
		//		String insttuId = "320000114";
		//		String idNo = "53500241975558821D";
		//		String phoneNo = "15650679900";

		entity.setCustId(SequenceUtils.getMemberInfo(this.mid));//生成用户序列号
		entity.setCustName(custName);
		entity.setMId(this.mid);
		entity.setCustType("1");//用户类型：1=投资人  2=借款人
		entity.setMobile(phoneNo);
		entity.setState("1");
		entity.setIsReal("1");
		entity.setRemark("备注：名称=" + custName + " 类型=借款人");
		//        entity.setRemark("备注：名称="+custName+" 类型=投资人");
		entity.setIdType("1");//1:身份证 2：统一信用代码 3：营业执照
		entity.setIdNo(idNo);
		//        entity.setInsttuId(insttuId);

		//校验
		String[] properties = { "custId", "custName", "mId", "custType", "mobile", "state", "isReal", "remark",
				"idType", "idNo" };
		String errMsg = ValidatorUtil.validpropertys(entity, properties);
		if (!StringUtils.isBlank(errMsg)) {
			System.out.println(errMsg);
			return;
		}

		//加密
		entity.setCustName(Cryptos.aesEncrypt(custName));
		entity.setMobile(Cryptos.aesEncrypt(phoneNo));
		entity.setIdNo(Cryptos.aesEncrypt(idNo));
		//摘要
		entity.setDigest(entity.buildDigest());

		this.memberDao.insert(entity);
	}

	public void insertCard() {
		//		String custId = "M102100000943";
		//		String phoneNo = "15908896676";
		//		String idNo = "370902195105017473";
		//		String custName = "封腺痛一征蒂拭悟所";
		//		String bankCardNo = "60340188000068642";

		//		String custId = "M102100000944";
		//		String phoneNo = "15850662789";
		//		String idNo = "513425199008167298";
		//		String custName = "疆酥枷得商么友线公司";
		//		String bankCardNo = "70560188000150035";

		//		String custId = "M102100000945";
		//		String phoneNo = "15850663344";
		//		String idNo = "150223197803042467";
		//		String custName = "酞洲恃姜堰溘乎颈区旅酉罚蘸有限宫丝";
		//		String bankCardNo = "16200188000286264";

		String custId = "M102100000946";
		String phoneNo = "15850665566";
		String idNo = "445222196912045483";
		String custName = "芜牺恃百丽弓参尹娱乐友线宫司";
		String bankCardNo = "20340188000029777";

		BindCardDao2 bc = (BindCardDao2) ParseSpring.context.getBean("bindCardDao2");

		BindCardDto2 entity = new BindCardDto2();

		entity.setAid(SequenceUtils.getSignAgree(this.mid));//协议号
		entity.setCustId(custId);//用户号
		entity.setMId(this.mid);
		entity.setType("0");//协议类型：转账
		entity.setBankName("江苏银行");
		entity.setBankCardNo(bankCardNo);
		entity.setState("1");//协议状态
		entity.setMobile(phoneNo);
		entity.setRemark("备注：名称=" + custName + " 账户=" + bankCardNo);
		entity.setCustName(custName);
		entity.setIdNo(idNo);
		entity.setSignNo("test sign no");
		entity.setCardType("2");//1=签约资金实时归集子账户，2=资金归集主账户，3=普通账户
		entity.setCardBankNo("");
		entity.setCardBankName("");
		entity.setDigest(entity.buildDigest());

		//校验
		String[] properties = { "aid", "custId", "mId", "type", "bankName", "bankCardNo", "state", "mobile",
				"custName", "idNo" };
		String errMsg = ValidatorUtil.validpropertys(entity, properties);
		if (!StringUtils.isBlank(errMsg)) {
			System.out.println(errMsg);
			return;
		}

		//加密
		entity.setBankCardNo(Cryptos.aesEncrypt(bankCardNo));
		entity.setCustName(Cryptos.aesEncrypt(custName));
		entity.setMobile(Cryptos.aesEncrypt(phoneNo));
		entity.setIdNo(Cryptos.aesEncrypt(idNo));

		bc.insert(entity);
	}
}
