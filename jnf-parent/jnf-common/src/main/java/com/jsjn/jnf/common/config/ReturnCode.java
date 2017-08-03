package com.jsjn.jnf.common.config;

/**
 * 全局返回码/错误码
 * 
 * @author majian
 * 
 */
public class ReturnCode {
	/**
	 * 成功
	 */
	public static final String SUCCESS = "000000";

	/**
	 * 之前已经成功过，这里直接返回
	 */
	public static final String SUCCESSED = "666666";

	/**
	 * 通用-失败
	 */
	public static final String FAIL = "999999";

	/**
	 * 通用-找不到数据（常用于service层抛出的BussinessException）
	 */
	public static final String RESPONSE_NO_DATA_FOUND = "900000";

	/**
	 * 通用-请不要重复提交！
	 */
	public static final String FAIL_REPEAT_SUBMIT = "900101";

	/**
	 * 通用-校验信息出错（动态错误信息）
	 */
	public static final String FAIL_VALIDATE = "900102";

	/**
	 * 该银行卡已经被绑定！
	 */
	public static final String FAIL_BINDED = "900103";

	/**
	 * 未能查询到该卡所对应的银行！
	 */
	public static final String FAIL_INVALIDCARD = "900104";

	/**
	 * 不支持信用卡！
	 */
	public static final String FAIL_UNSUPPORTCARD = "900105";
	/**
	 * 不支持的卡类型！
	 */
	public static final String FAIL_UNSUPPORTCARDKIND = "900115";

	/**
	 * 暂不支持该银行！
	 */
	public static final String FAIL_UNSUPPORTBANK = "900106";

	/**
	 * 系统繁忙，稍后再试！
	 */
	public static final String FAIL_DATABASE = "900107";

	/**
	 * 注册会员失败！
	 */
	public static final String FAIL_REGIST = "900108";

	/**
	 * 实名认证-四要素认证之前失败
	 */
	public static final String FAILBEFORE = "900109";
	/**
	 * 实名认证-四要素认证之后失败
	 */
	public static final String FAIL_AUTH = "900199";

	/**
	 * 实名认证-绑定失败，用户信息输入验证失败！
	 */
	public static final String FAIL_BINDERROR = "900150";

	/**
	 * 实名认证-token值无效！
	 */
	public static final String FAIL_TOKEN = "900201";

	/**
	 * 实名认证-token有效时间为5分钟，已超时！
	 */
	public static final String FAIL_TOKENOVERTIME = "900202";

	/**
	 * 实名认证-两次发送数据不一致！
	 */
	public static final String FAIL_DIFFER = "900203";

	/**
	 * 实名认证-验证码错误！
	 */
	public static final String FAIL_CODE = "900204";

	/**
	 * 添加白名单失败！
	 */
	public static final String FAIL_WHITELIST = "900205";

	/**
	 * 系统异常，签约失败！
	 */
	public static final String FAIL_SIGN = "900206";

	/**
	 * 转账-非转账时间
	 */
	public static final String FAIL_PAYMENT_DEAL_TIME = "900301";

	/**
	 * 二次验签失败
	 */
	public static final String FAIL_INVALID_SECONED_SIGN = "900302";

	/**
	 * 二次握手失败-调用商户接口失败
	 */
	public static final String FAIL_SECONED_CONFIRM_INTERFACE = "900303";

	/**
	 * 二次握手失败-两次数据不一致
	 */
	public static final String FAIL_SECONED_CONFIRM_INVALIDATE = "900304";

	/**
	 * 交易正在处理中，结果未知
	 */
	public static final String FAIL_TRADE_WAIT = "900401";

	/**
	 * 代扣-集成层扣款失败
	 */
	public static final String FAIL_INTEGRETION_WITHHOLD = "910001";

	/**
	 * 代扣-代扣结果处理发生异常导致的失败
	 */
	public static final String FAIL_RESULTHANDLE_WITHHOLD = "910002";

	/**
	 * 批量代扣-批量插入异常导致的失败
	 */
	public static final String FAIL_BATCHINSERT_BATCHWITHHOLD = "920001";
	/**
	 * 批量代扣-文件摘要校验失败
	 */
	public static final String FAIL_VALIDATE_FILEMD5_BATCHWITHHOLD = "920002";
	/**
	 * SFTP服务异常-连接失败获取session异常
	 */
	public static final String FAIL_CONNECT_SFTP = "930001";
	/**
	 * SFTP服务异常-文件不存在
	 */
	public static final String FAIL_LOAD_DATA_SFTP = "930002";
	/**
	 * SFTP服务异常-IO异常
	 */
	public static final String FAIL_NETWORK_SFTP = "930003";

	/**
	 * 转账-余额不足
	 */
	public static final String PAYMENT_BALANCE_IS_NOT_ENOUGH = "940001";

	/**
	 * 转账-集成层转账失败
	 */
	public static final String PAYMENT_FAIL_INTEGRETION = "940002";

	/**
	 * 代付-代付结果处理发生异常导致的失败
	 */
	public static final String FAIL_RESULTHANDLE_PAYMENT = "950001";
	/**
	 * 配置错误-获取商户配置信息失败
	 */
	public static final String FAIL_QUERY_BUSINESS_CONFIG = "960001";
}
