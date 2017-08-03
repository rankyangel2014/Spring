package com.jsjn.jnf.common.config;

/**
 * 数据表各种表，枚举字段常量枚举。 为了方便查找和使用，命名规范如下， 例如：BUSINESS_INFO_STATE_OK 第一二位
 * BUSINESS_INFO 是表名 第三位 state 表中字段名 第四位 ok 这个字段某个枚举意义 ok 代表正常等
 * 
 * @author qiangl
 * 
 */
public enum TabsConstant {
	/**
	 * 商户-状态-正常
	 */
	BUSINESS_INFO_STATE_OK("1"),
	/**
	 * 商户-状态-冻结
	 */
	BUSINESS_INFO_STATE_FREEZE("2"),
	/**
	 * 用户-状态-正常
	 */
	MEMBER_INFO_STATE_OK("1"),
	/**
	 * 用户-证件类型-身份证
	 */
	MEMBER_INFO__TYPE_ID("1"),
	/**
	 * 用户-证件类型-营业执照/组织机构代码证
	 */
	MEMBER_INFO__TYPE_REGNO("2"),
	/**
	 * 用户-状态-冻结
	 */
	MEMBER_INFO_STATE_FREEZE("2"),
	/**
	 * 用户-客户类型-投资人
	 */
	MEMBER_INFO_CUSTTYPE_INVEST("1"),
	/**
	 * 用户-客户类型-借款人
	 */
	MEMBER_INFO_CUSTTYPE_LOAN("2"),
	/**
	 * 用户-客户类型-商户
	 */
	MEMBER_INFO_CUSTTYPE_BUSINESS("3"),
	/**
	 * 用户-实名认证-已认证
	 */
	MEMBER_INFO_ISREAL_OK("1"),
	/**
	 * 用户-客户类型-未认证
	 */
	MEMBER_INFO_ISREAL_NOT("2"),
	/**
	 * 用户-证件类型-身份证
	 */
	MEMBER_INFO_IDTYPE_ID("1"),

	/**
	 * 签约协议-状态-未启用
	 */
	BIND_CARD_STATE_NOUSE("0"),
	/**
	 * 签约协议-状态-正常
	 */
	BIND_CARD_STATE_OK("1"),
	/**
	 * 签约协议-状态-冻结
	 */
	BIND_CARD_STATE_FREEZE("2"),
	/**
	 * 签约协议-协议类型-代收
	 */
	BIND_CARD_TYPE_RECEIVE("1"),
	/**
	 * 签约协议-协议类型-代付
	 */
	BIND_CARD_TYPE_PAY("2"),

	/**
	 * 内部虚拟户-状态-正常
	 */
	MEMBER_ACCOUNT_STATE_OK("1"),
	/**
	 * 内部虚拟户-状态-冻结
	 */
	MEMBER_ACCOUNT_STATE_FREEZE("2"),

	/**
	 * 交易-类型-代扣
	 */
	TRANSACTION_TRADETYPE_WITHHOLD("1"),

	/**
	 * 交易-类型-转账
	 */
	TRANSACTION_TRADETYPE_TRANSFER("0"),

	/**
	 * 交易-交易状态-成功
	 */
	TRANSACTION_STATUS_SUCC("2"),
	/**
	 * 交易-交易状态-失败
	 */
	TRANSACTION_STATUS_FAIL("9"),
	/**
	 * 交易-交易状态-代付款
	 */
	TRANSACTION_STATUS_WAIT("0"),
	/**
	 * 交易-交易状态-处理中
	 */
	TRANSACTION_STATUS_DEAL("1"),
	/**
	 * 支付-类型-代扣
	 */
	PAYMENT_ORDERTYPE_WITHHOLD("1"),
	/**
	 * 支付-类型-转账
	 */
	PAYMENT_ORDERTYPE_TRANSFER("0"),
	/**
	 * 支付-支付状态-成功
	 */
	PAYMENT_ORDER_STATUS_SUCC("2"),
	/**
	 * 支付-支付状态-失败
	 */
	PAYMENT_ORDER_STATUS_FAIL("9"),
	/**
	 * 支付-支付状态-处理中
	 */
	PAYMENT_ORDER_STATUS_DEAL("1"),
	/**
	 * 支付-渠道-银联
	 */
	PAYMENT_ORDER_CHANNEL_UNION("1"),
	/**
	 * 支付-渠道-快钱
	 */
	PAYMENT_ORDER_CHANNEL_QUICKPAY("2"),
	/**
	 * 支付-渠道-xx银行
	 */
	PAYMENT_ORDER_CHANNEL_BANK("3"),

	/**
	 * 集成渠道交易轨迹-操作状态-未知
	 */
	CHANNEL_LOCUS_OPERATIONSTATUS_UNKNOWN("0"),
	/**
	 * 集成渠道交易轨迹-操作状态-成功
	 */
	CHANNEL_LOCUS_OPERATIONSTATUS_SUCC("1"),
	/**
	 * 集成渠道交易轨迹-操作状态-失败
	 */
	CHANNEL_LOCUS_OPERATIONSTATUS_FAIL("2"),

	/**
	 * 白名单签约标志 0：退约 1：签约：2：修改
	 */
	WHITELIST_SIGN_OUT("0"), WHITELIST_SIGN_IN("1"), WHITELIST_SIGN_modify("2"),

	/**
	 * 白名单卡折标志 0：卡 1：折
	 */
	WHITELIST_CARDTYPE_CARD("0"), WHITELIST_CARDTYPE_BOOK("1"),

	/**
	 * 锁类型 0：交易锁 1：支付锁 2：批量代扣锁
	 */
	LOCK_TYPE_TRANSACTION("0"), LOCK_TYPE_PAYMENT("1"), LOCK_TYPE_BATCHWITHHOLD("2"),

	/**
	 * 支付信息是否被修改 0：未修改 1：被修改
	 */
	PAYMENT_INFO_RIGHT("0"), PAYMENT_INFO_WRONG("1"),

	/**
	 * PORTAL服务器 1：开机 0 ：关机
	 */
	PORTAL_CURRENT_STATUS_ON("1"), PORTAL_CURRENT_STATUS_OFF("0"),

	/**
	 * 银行卡类型 0：借记卡 1：信用卡
	 */
	CARD_KIND_DEBIT("0"), CARD_KIND_CREDIT("1"),

	/**
	 * 解约标记 0：处理中 1：解约成功
	 */
	SIGNRELEASE_FLAG_DEAL("0"), SIGNRELEASE_FLAG_SUCCESS("1"),

	/**
	 * 当前解绑状态 1：成功 2：失败
	 */
	SIGNRELEASE_STATUS_SUCCESS("1"), SIGNRELEASE_STATUS_FAIL("2"),

	/**
	 * realnameflow状态： 0=发起验证请求 1=验证通过已发送验证码(也有可能是最终状态) 2=验证处理中 3=验证成功（最终）
	 * 9=异常(最终)
	 */
	REALNAME_FLOW_STATUS_START("0"), REALNAME_FLOW_STATUS_SENDCODE_SUCC("1"), REALNAME_FLOW_STATUS_SENDCODE_FAIL("9"), REALNAME_FLOW_STATUS_VALIDATING(
			"2"), REALNAME_FLOW_STATUS_VALIDATE_SUCC("3"),

	/**
	 * 批量代扣发送信息类型 1：短信 2：代扣推送 3:代付推送
	 */
	MESSAGT_TYPE_SHORTMSG("1"), MESSAGT_TYPE_PUSHMSG("2"), MESSAGT_TYPE_PAYMENTMSG("3"),
	/**
	 * 1-等待发送 2-发送成功 3-送失败
	 */
	MESSAGT_SEND_WAITING("1"), MESSAGT_SEND_SUCCESS("2"), MESSAGT_SEND_FAIL("3"),
	/**
	 * 1:扣款失败 2:扣款成功3:失败(未决)
	 */
	WITHHOLD_PAY_FAIL("1"), WITHHOLD_PAY_SUCCESS("2"), WITHHOLD_PAY_WAITING("3"),
	/**
	 * 是否为批量代扣标志
	 */
	IS_BATCH("1"), NOT_BATCH("0"), SPLIT_CHAR("|"),
	/**
	 * 渠道支持的业务类型 1：代扣 ，2：代付
	 */
	CHANNEL_TYPE_WITHHOLD("1"), CHANNEL_TYPE_PAYMENT("2");

	private String val;

	public String val() {
		return this.val;
	}

	private TabsConstant(String val) {
		this.val = val;
	}
}
