package com.jsjn.jnf.service.assist.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang3.StringUtils;

import com.jsjn.jnf.common.utils.DateUtils;
import com.jsjn.jnf.service.assist.SequenceService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 获取序列号辅助类,封装了获取各个表需要序列的逻辑，每个方法名对应各自的表。
 * 
 * @author qiangl
 * 
 */
public class SequenceUtils {

	private static SequenceService service = (SequenceService) ParseSpring.context.getBean("sequenceServiceImpl");

	/**
	 * 获取序列号辅助类
	 * 
	 * @param name
	 * @return
	 */
	private static String getSeq(String name) {
		return service.getSeq(name);
	}

	/**
	 * 获取商户序列
	 * 
	 * @return
	 */
	public static String getBusInfo() {
		return getSeq(TABS_NAME_SEQ.JNF_BUSINESS_INFO.getSeqName());
	}

	/**
	 * 实名认证流水表序列
	 * 
	 * @return
	 */
	public static int getRealNameFlow() {
		return Integer.parseInt(getSeq(TABS_NAME_SEQ.JNF_REALNAME_FLOW.getSeqName()));
	}

	/**
	 * 用户绑卡表序列
	 * 
	 * @return
	 */
	public static String getSignAgree(String mid) {
		SimpleDateFormat sf = new SimpleDateFormat("yyyyMMdd");
		Date d = new Date();
		return "C" + mid + sf.format(d) + StringUtils.leftPad(getSeq(TABS_NAME_SEQ.JNF_BIND_CARD.getSeqName()), 6, "0");
	}

	/**
	 * 获取用户序列
	 * 
	 * @param mid
	 *            商户id号
	 * @return
	 */
	public static String getMemberInfo(String mid) {
		return "M" + mid + StringUtils.leftPad(getSeq(TABS_NAME_SEQ.JNF_MEMBER_INFO.getSeqName()), 8, "0");
	}

	/**
	 * 用户签约协议序列
	 * 
	 * @param mid
	 *            商户id号
	 * @return
	 */
	public static String getBindCard(String mid) {
		return "C" + mid + DateUtils.getDate("yyyyMMdd")
				+ StringUtils.leftPad(getSeq(TABS_NAME_SEQ.JNF_MEMBER_INFO.getSeqName()), 8, "0");
	}

	/**
	 * 内部户序列
	 * 
	 * @param mid
	 *            商户id号
	 * @return
	 */
	public static String getMemberAccount(String mid) {
		return "A" + mid + StringUtils.leftPad(getSeq(TABS_NAME_SEQ.JNF_MEMBER_ACCOUNT.getSeqName()), 8, "0");
	}

	/**
	 * api权限序列号
	 * 
	 * @return
	 */
	public static String getApiRole() {
		return getSeq(TABS_NAME_SEQ.JNF_API_ROLE.getSeqName());
	}

	/**
	 * 交易序列号 "T"+4位商户号+2位类型+6位日期（yyMMdd）+8位自增列（前面不足补零，用完后循环)
	 * 
	 * @param mid
	 *            商户id号
	 * @param transType
	 *            交易类型
	 * @return
	 */
	public static String getTrasaction(String mid, String transType) {
		return "T" + mid + StringUtils.leftPad(transType, 2, "0") + DateUtils.getDate("yyMMdd")
				+ StringUtils.leftPad(getSeq(TABS_NAME_SEQ.JNF_TRANSACTION.getSeqName()), 8, "0");
	}

	/**
	 * 交易批次号
	 * 
	 * @param mid
	 *            商户id号
	 * @param transType
	 *            交易类型
	 * @return
	 */
	public static String getTrasactionBNo() {
		return getSeq(TABS_NAME_SEQ.JNF_TRANSACTION_BNO.getSeqName());
	}

	/**
	 * 支付序列号
	 * 
	 * @param mid
	 *            商户id号
	 * @param transType
	 *            交易类型
	 * @return
	 */
	public static String getPaymentOrder(String mid, String transType) {
		return "O" + mid + StringUtils.leftPad(transType, 2, "0") + DateUtils.getDate("yyMMdd")
				+ StringUtils.leftPad(getSeq(TABS_NAME_SEQ.JNF_PAYMENT_ORDER.getSeqName()), 8, "0");
	}

	/**
	 * 集成渠道交易轨迹序列
	 * 
	 * @return
	 */
	public static String getChannelLocus() {
		return getSeq(TABS_NAME_SEQ.JNF_CHANNEL_LOCUS.getSeqName());
	}

	/**
	 * 金农付字典序列
	 * 
	 * @return
	 */
	public static String getDict() {
		return getSeq(TABS_NAME_SEQ.JNF_DICT.getSeqName());
	}

	/**
	 * 获取报文流水表序列号
	 * 
	 * @return
	 */
	public static String getInterfaceXmlSeq() {
		return getSeq(TABS_NAME_SEQ.JNF_XML_FLOW.getSeqName());
	}

	/**
	 * 获取费用表序列号
	 * 
	 * @return
	 */
	public static String getFeeConfigSeq() {
		return getSeq(TABS_NAME_SEQ.JNF_FEE_CONFIG.getSeqName());
	}

	/**
	 * 代扣签约信息临时表序列
	 * 
	 * @param mid
	 *            商户id号
	 * @return
	 */
	public static String getSignTempSeq(String mid) {
		return "T" + mid + DateUtils.getDate("yyyyMMdd")
				+ StringUtils.leftPad(getSeq(TABS_NAME_SEQ.JNF_SIGN_TEMP.getSeqName()), 6, "0");
	}

	/**
	 * 用户第三方账户表序列
	 * 
	 * @param custId
	 *            用户id
	 * @return
	 */
	public static String getThirdAcctSeq(String custId) {
		return "A" + custId + StringUtils.leftPad(getSeq(TABS_NAME_SEQ.JNF_USER_THIRD_ACCOUNT.getSeqName()), 8, "0");
	}

	/**
	 * 签约信息表序列
	 * 
	 * @param mid
	 *            商户id号
	 * @return
	 */
	public static String getSignInfoSeq(String mid) {
		return "C" + mid + DateUtils.getDate("yyyyMMdd")
				+ StringUtils.leftPad(getSeq(TABS_NAME_SEQ.JNF_SIGN_INFO.getSeqName()), 6, "0");
	}

	/**
	 * 支付渠道表序列
	 * 
	 * @return
	 */
	public static String getChannelSeq() {
		return "CH" + getSeq(TABS_NAME_SEQ.JNF_CHANNEL.getSeqName());
	}

	/**
	 * 投资人渠道关系表序列
	 * 
	 * @return
	 */
	public static String getInvestorChannelSeq() {
		return getSeq(TABS_NAME_SEQ.JNF_INVESTOR_CHANNEL.getSeqName());
	}

	/**
	 * 推送表序列
	 * 
	 * @param mid
	 *            商户id号
	 * @return
	 */
	public static String getPushSeq(String mid) {
		return "P" + mid + DateUtils.getDate("yyyyMMdd")
				+ StringUtils.leftPad(getSeq(TABS_NAME_SEQ.JNF_PUSH.getSeqName()), 6, "0");
	}

	/**
	 * 批量代扣表序列
	 * 
	 * @param mid
	 *            商户id号
	 * @return
	 */
	public static String getBatchWithholdSeq(String mid) {
		return "BW" + mid + DateUtils.getDate("yyyyMMdd")
				+ StringUtils.leftPad(getSeq(TABS_NAME_SEQ.JNF_BATCH_WITHHOLD.getSeqName()), 6, "0");
	}


	/**
	 * 对账表序列
	 * 
	 * @param mid
	 *            商户id号
	 * @return
	 */
	public static String getStatementSeq() {
		return DateUtils.getDate("yyyyMMdd")
				+ StringUtils.leftPad(getSeq(TABS_NAME_SEQ.JNF_STATEMENT.getSeqName()), 8, "0");
	}

	private enum TABS_NAME_SEQ {
		/**
		 * 
		 */
		JNF_BUSINESS_INFO("JNF_SEQ_T1"),
		/**
		 * 
		 */
		JNF_MEMBER_INFO("JNF_SEQ_T2"),
		/**
		 * 
		 */
		JNF_BIND_CARD("JNF_SEQ_T3"),
		/**
		 * 
		 */
		JNF_MEMBER_ACCOUNT("JNF_SEQ_T4"),
		/**
		 * 
		 */
		JNF_API_ROLE("JNF_SEQ_T6"),
		/**
		 * 
		 */
		JNF_TRANSACTION("JNF_SEQ_T8"),
		/**
		 * 
		 */
		JNF_TRANSACTION_BNO("JNF_SEQ_T9"),
		/**
		 * 
		 */
		JNF_PAYMENT_ORDER("JNF_SEQ_T10"),
		/**
		 * 
		 */
		JNF_CHANNEL_LOCUS("JNF_SEQ_T11"),
		/**
		 * 
		 */
		JNF_DICT("JNF_SEQ_T12"),
		/**
		 * 
		 */
		JNF_REALNAME_FLOW("JNF_SEQ_T14"),
		/**
		 * 
		 */
		JNF_XML_FLOW("JNF_SEQ_T17"),
		/**
		 * 
		 */
		JNF_FEE_CONFIG("JNF_SEQ_T18"),
		/**
		 * 
		 */
		JNF_SIGN_TEMP("JNF_SEQ_T20"),
		/**
		 * 
		 */
		JNF_USER_THIRD_ACCOUNT("JNF_SEQ_T21"),
		/**
		 * 
		 */
		JNF_SIGN_INFO("JNF_SEQ_T22"),
		/**
		 * 
		 */
		JNF_CHANNEL("JNF_SEQ_T23"),
		/**
		 * 
		 */
		JNF_INVESTOR_CHANNEL("JNF_SEQ_T24"),
		/**
		 * 
		 */
		JNF_PUSH("JNF_SEQ_T26"),
		/**
		 * 
		 */
		JNF_BATCH_WITHHOLD("JNF_SEQ_T91"),
		/**
		 * 对账表sequence
		 */
		JNF_STATEMENT("JNF_SEQ_T30");

		private String seqName;

		private TABS_NAME_SEQ(String seqName) {
			this.seqName = seqName;
		}

		public String getSeqName() {
			return this.seqName;
		}
	}
}
