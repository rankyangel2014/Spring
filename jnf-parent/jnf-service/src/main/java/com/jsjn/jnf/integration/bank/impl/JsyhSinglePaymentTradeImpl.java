package com.jsjn.jnf.integration.bank.impl;

import java.util.HashMap;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.bo.bank.SinglePaymentTradeReqBO;
import com.jsjn.jnf.bean.bo.bank.SinglePaymentTradeReqDataBO;
import com.jsjn.jnf.bean.bo.integration.jsyh.request.JsReqBase;
import com.jsjn.jnf.bean.bo.integration.jsyh.request.JsReqBaseHead;
import com.jsjn.jnf.bean.bo.integration.jsyh.request.JsReqSinglePaymentTradeBody;
import com.jsjn.jnf.bean.bo.integration.jsyh.response.JsResBase;
import com.jsjn.jnf.bean.bo.integration.jsyh.response.JsResBaseHead;
import com.jsjn.jnf.bean.bo.integration.jsyh.response.JsResSinglePaymentTrade;
import com.jsjn.jnf.bean.bo.integration.jsyh.response.JsResSinglePaymentTradeBody;
import com.jsjn.jnf.bean.dto.assist.InterfaceXmlDto;
import com.jsjn.jnf.bean.pojo.integration.SinglePaymentResPojo;
import com.jsjn.jnf.common.config.BankInterfaceCode;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.config.TradeCode;
import com.jsjn.jnf.common.mapper.JaxbMapper;
import com.jsjn.jnf.common.utils.DateUtils;
import com.jsjn.jnf.common.utils.Logger;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.network.SocketUtil;
import com.jsjn.jnf.integration.bank.SinglePaymentTradeInterface;
import com.jsjn.jnf.integration.bank.factory.JsyhReqFactory;
import com.jsjn.jnf.integration.bank.factory.JsyhResFactory;
import com.jsjn.jnf.service.assist.DictService;
import com.jsjn.jnf.service.assist.InterfaceXmlService;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 江苏银行 对外支付 实现类
 * 
 * @author yincy
 * 
 */
@Service
public class JsyhSinglePaymentTradeImpl implements SinglePaymentTradeInterface {

	private final static Logger logger = Logger.getLogger(JsyhSinglePaymentTradeImpl.class);
	/**
	 * 报文流水
	 */
	private final InterfaceXmlService interfaceXmlService = (InterfaceXmlService) ParseSpring.context.getBean("interfaceXmlServiceImpl");
	/**
	 * 配置表
	 */
	private final DictService dictService = (DictService) ParseSpring.context.getBean("dictServiceImpl");

	/**
	 * 
	 * 1) 获取传参 2) 初始化CT机的请求和返回报文对象 3) 发送请求 接收报文 4) 转化返回对象
	 * 
	 * 此处开启新事务，并且不对外抛出Exception
	 * 
	 * @return stat 交易状态
	 */
	@SuppressWarnings("rawtypes")
	@Override
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
	public SinglePaymentResPojo singlePaymentTrade(SinglePaymentTradeReqBO req, HashMap<String, String> map) {

		String bankInterfaceCode = BankInterfaceCode.JSYH_SINGLE_PATMENT_TRADE.getCode();

		/**
		 * 1) 初始化参数
		 */
		SinglePaymentTradeReqDataBO reqData = req.getReqData();

		String serialNo = reqData.getSerialNo();
		String orderNo = map.get("orderNo");
		String bankflag = map.get("bankflag");
		String postscript = map.get("postscript");

		StringBuilder reqNo = new StringBuilder();// 请求号
		reqNo.append(DateUtils.getDate("yyyyMMdd")).append("300001").append(serialNo);

		logger.info("请求号为：" + reqNo);

		/**
		 * 2) 初始化CT机的请求报文对象 返回报文对象
		 */
		// 初始化CT机请求报文
		JsReqBase ctReqDto = JsyhReqFactory.creatReqObj(bankInterfaceCode);
		JsReqBaseHead ctReqHead = ctReqDto.getHead();
		JsReqSinglePaymentTradeBody ctReqBody = (JsReqSinglePaymentTradeBody) ctReqDto.getBody();

		// CT机报文 head
		ctReqHead.setTr_code(BankInterfaceCode.JSYH_SINGLE_PATMENT_TRADE.getTrcode());
		ctReqHead.setFile_flag("0");
		ctReqHead.setReq_no(reqNo.toString());

		// CT机报文 body
		ctReqBody.setUrgency_flag(reqData.getUrgencyFlag());// 加急标志
		ctReqBody.setRcv_cur_code(reqData.getCurCode());
		ctReqBody.setAmt(reqData.getAmount());// 金额
		ctReqBody.setPay_acname(reqData.getPayorAccountName());//付款户名
		ctReqBody.setPay_acno(reqData.getPayorAccountNo());// 付款账号
		ctReqBody.setPay_cur_code(reqData.getCurCode());
		ctReqBody.setPurpose(reqData.getPurpose());// 目的
		ctReqBody.setRcv_acno(reqData.getPayeeAccountNo());
		ctReqBody.setRcv_acname(reqData.getPayeeAccountName());
		ctReqBody.setRcv_bank_no(reqData.getPayeeBankNo());// 联行号
		ctReqBody.setRcv_bank_name(reqData.getPayeeBankName());// 银行名称
		ctReqBody.setAs_acname("0");// 账簿标志 0：不需要 1：需要
		ctReqBody.setAs_acno("");
		ctReqBody.setAs_flag("");
		ctReqBody.setBank_flag(bankflag);// 银行标志 0：本行 1：他行
		ctReqBody.setCert_no(orderNo);// 不能为空，企业ERP账务流水号（支付订单编号）
		ctReqBody.setCert_type("");// 凭证种类
		ctReqBody.setPostscript(postscript);// 附言 用作对账格式文本

		// 初始化CT机返回报文对象
		JsResBase ctResDto = JsyhResFactory.creatResObj(bankInterfaceCode);

		/**
		 * 3) 发送请求，接收返回值
		 */
		String ctReqXML = JaxbMapper.toXml(ctReqDto, false);
		String ctResXML = "";

		// 流水表sequence
		String interfaceXmlSeq = SequenceUtils.getInterfaceXmlSeq();

		// 插入报文流水表
		insertInterfaceXml(interfaceXmlSeq, ctReqXML);

		logger.info("开始调用江苏银行对外支付接口,请求报文信息：" + ctReqXML);

		try {
			String jsyhCtHost = dictService.findByType("JSYH_CT_HOST");
			String jsyhCtPort = dictService.findByType("JSYH_CT_PORT");
			ctResXML = SocketUtil.send2JsyhCT(jsyhCtHost, jsyhCtPort, ctReqXML);
		} catch (Exception e) {
			logger.error("江苏银行接口调用异常", e);
			//接口调用异常，状态为：银行处理中。		   
			return new SinglePaymentResPojo(TabsConstant.TRANSACTION_STATUS_DEAL.val(), e.getMessage());
		}

		logger.info("结束调用江苏银行对外支付接口，返回结果信息：" + ctResXML);

		ctResDto = JaxbMapper.fromXml(ctResXML, JsResSinglePaymentTrade.class);
		JsResBaseHead ctResHead = ctResDto.getHead();
		JsResSinglePaymentTradeBody ctResBody = (JsResSinglePaymentTradeBody) ctResDto.getBody();

		/**
		 * 4) 返回 除了成功以外其它状态均为：处理中。
		 * 
		 */
		String succFlag = ctResHead.getSucc_flag();//是否成功标识(0:表示成功 ,1:表示通讯机超时 ,8:表示主机结果未知,其它:交易失败)
		String retMsg = ctResHead.getRet_info();//返回信息
		String resStat = ctResBody.getStat();//// 交易状态(9-交易成功 6－交易失败8－交易结果未知3－银行落地处理中)

		String state = "1";
		String resCode = TradeCode.TRADE_DEAL.getCode();//默认为处理中...

		if (StringUtils.equals(succFlag, "0")) {//0-表示接口调用成功
			if (StringUtils.equals(resStat, "9")) {//9-表示交易成功
				resCode = TradeCode.TRADE_SUCCESS.getCode();
				state = "0";
			} else if (StringUtils.equals(resStat, "6")) {// 6－交易失败
				resCode = TradeCode.TRADE_ERROR.getCode();
			}
		}
		// 更新报文流水表
		updateInterfaceXml(interfaceXmlSeq, ctResXML, state, retMsg);
		return new SinglePaymentResPojo(resCode, retMsg);
	}

	/**
	 * 插入报文流水表
	 * 
	 * @param id
	 * @param inputXml
	 *            输入报文
	 */
	public void insertInterfaceXml(String id, String inputXml) {
		InterfaceXmlDto dto = new InterfaceXmlDto();
		dto.setId(id);
		dto.setMethod("JsyhSinglePaymentTradeImpl.singlePaymentTrade");
		dto.setInputXml(inputXml);
		try {
			interfaceXmlService.insertXml(dto);
		} catch (Exception e) {
			logger.error("插入报文流水表失败", e);
		}
	}

	/**
	 * 更新报文流水表
	 * 
	 * @param id
	 * @param outputXml
	 *            输出报文
	 * @param state
	 *            状态 0：成功 1：失败
	 * @param exception
	 *            异常原因
	 */
	public void updateInterfaceXml(String id, String outputXml, String state, String exception) {
		InterfaceXmlDto dto = new InterfaceXmlDto();
		dto.setId(id);
		dto.setOutputXml(outputXml);
		dto.setState(state);
		dto.setException(exception);
		try {
			interfaceXmlService.updateXml(dto);
		} catch (Exception e) {
			logger.error("更新报文流水表失败", e);
		}
	}
}
