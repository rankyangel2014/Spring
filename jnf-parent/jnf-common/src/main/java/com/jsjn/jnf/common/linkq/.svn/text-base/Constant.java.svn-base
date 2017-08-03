package com.jsjn.jnf.common.linkq;

import com.jsjn.pubsys.common.sso.SessionContext;
import com.jsjn.system.po.PubInsttu;
import com.jsjn.system.po.PubUserinfo;

public final class Constant
{

    public Constant()
    {
    }
    
    public static String FILE_SEPATATOR=System.getProperty("file.separator");
    
    //项目路径
    public static String PRJ_PATH="";
    //项目存放文件路径
    public static String PRJ_FILE_PATH="";
    static
    {
    	String path=Constant.class.getResource("/").getPath();
    	path=path.substring(0, path.indexOf("WEB-INF"));
    	PRJ_PATH=path;
    	PRJ_FILE_PATH=path+"/file/";
    }
	//登录用户信息
    public static PubUserinfo USER=null;
    //登录机构信息
    public static PubInsttu INSTTU=null;

	//平台整合  存放用户和机构信息
	public static final java.lang.String BANK_IN_SESSION = SessionContext.SSO_USER_COMP_INFO;
	public static final java.lang.String USER_IN_SESSION = SessionContext.SSO_USER_INFO;
	
    //用户初始化密码
    public static final String USER_INIT_PASSWORD = "123456";
    
	// 分页大小
	public final static long PAGE_SIZE = 10;
	//最大分页条数 add by lgw 20130116
	public final static long PAGE_MAX_SIZE = 1000;
    
	//下拉菜单默认参数描述
	public static final String DEFAULT_PARA_VALUE = "PARE_ITEM";
	
	
	//后台查询交易码
	public static final String JYM_QUERY = "99001";
	
	//后台响应码-成功
	public static final String RESPONSE_OK = "000000";
	//后台响应码-找不到数据
	public static final String RESPONSE_NO_DATA_FOUND = "001403";
	
	//未到期期数
	public static final long PERD_NO_FUTURE = 9999;
	
	// pub_plat
	public static final String PUB_PLAT = "pub_plat";
	
	// lm_jsrmc
	public static final String LM_JSRMC = "lm_jsrmc";
	
	// as_jsmf
	public static final String AS_JSMF = "as_jsmf";

	// 机构号
	public static final String BANK_CD = "BANK_CD";
	
	// 用户号
	public static final String USER_ID = "USER_ID";
	
	// 查询的错误信息
	public static final String ERR_MSG = "errMsg";
	
	// 银行存款科目
	public static final String YHCKKM="101200";
	
	// 对外担保农贷科目
	public static final String KMKZZ_32="910701";
	
	// 对外担保科贷科目
	public static final String KMKZZ_99="910601";
	
	//后台根据给定条件查询不到数据是否需要提示前台
	public static final boolean IS_NOTICE=true;
	
	public static final boolean NOT_NOTICE=false;
	
	/*对外担保*/
	// 放款
	public static final String SURETY_FK = "0";

	// 还款
	public static final String SURETY_HK = "1";
	
	// 客户类型-个人客户
	public static final String CUST_TYPE_PSN = "0";

	// 客户类型-企业客户
	public static final String CUST_TYPE_COM = "1";

	// 还款方式-客户还款
	public static final String REPAY_TYPE_CUST = "01";

	// 还款方式-代偿还款
	public static final String REPAY_TYPE_ORG = "02";
	
	// 农贷机构类型
	public static final String ND_INSTTUTY = "01";
	
	// 小微贷机构类型
	public static final String XWD_INSTTUTY = "02";

	// 科贷机构类型
	public static final String KD_INSTTUTY = "90";
	
	//对外担保放款
	public static final String EXTSURETY_ISSUE = "10000001";
	
	//对外担保客户还款
	public static final String EXTSURETY_REPAYTYPE_CUST = "10000002";
	
	//对外担保代偿还款
	public static final String EXTSURETY_REPAYTYPE_ORG = "10000003";
	
	//开鑫贷担保放款
	public static final String KXD_SURETY_ISSUE = "10000004";
	
	//开鑫贷还款
	public static final String KXD_SURETY_REPAY = "10000005";
	
	//开鑫贷手续费
	public static final String KXD_SURETY_FEE = "10000006";
	
	//保证金记账
	public static final String EXTSURETY_BZJ = "10000007";
		
	public static final String OWNER = "service";
	
	public static final String METHODNAME = "methodName";
	
	public static final String PARAMOBJECT = "paramObj";
	
	public static final String LISTNAME = "listName";
	
	public static final String TRANSCODE = "transCode";
	
	public static final String NOTICE = "notice";
	
	public static final String  IGNORE_ORGNO = "ignoreOrgNo";
	
	//还款时客户以现金方式还款
	public static final String XIAN_JIN_KEY = "cash";
	public static final String XIAN_JIN = "现金";
	
	public static PubUserinfo getUSER() {
		return USER;
	}

	public static void setUSER(PubUserinfo uSER) {
		USER = uSER;
	}

	public static PubInsttu getINSTTU() {
		return INSTTU;
	}

	public static void setINSTTU(PubInsttu iNSTTU) {
		INSTTU = iNSTTU;
	}
    
}
