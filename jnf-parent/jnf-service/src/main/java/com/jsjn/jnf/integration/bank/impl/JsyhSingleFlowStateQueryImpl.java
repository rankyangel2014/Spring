package com.jsjn.jnf.integration.bank.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.bo.bank.SingleFlowStateQueryReqBO;
import com.jsjn.jnf.bean.bo.bank.SingleFlowStateQueryReqDataBO;
import com.jsjn.jnf.bean.bo.bank.SingleFlowStateQueryResBO;
import com.jsjn.jnf.bean.bo.bank.SingleFlowStateQueryResDataBO;
import com.jsjn.jnf.bean.bo.integration.jsyh.request.JsReqBase;
import com.jsjn.jnf.bean.bo.integration.jsyh.request.JsReqBaseHead;
import com.jsjn.jnf.bean.bo.integration.jsyh.request.JsReqFlowStateQueryBody;
import com.jsjn.jnf.bean.bo.integration.jsyh.response.JsResBase;
import com.jsjn.jnf.bean.bo.integration.jsyh.response.JsResBaseHead;
import com.jsjn.jnf.bean.bo.integration.jsyh.response.JsResFlowStateQuery;
import com.jsjn.jnf.bean.bo.integration.jsyh.response.JsResFlowStateQueryBody;
import com.jsjn.jnf.bean.dto.assist.InterfaceXmlDto;
import com.jsjn.jnf.common.config.BankInterfaceCode;
import com.jsjn.jnf.common.config.TradeCode;
import com.jsjn.jnf.common.mapper.JaxbMapper;
import com.jsjn.jnf.common.utils.Logger;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.network.SocketUtil;
import com.jsjn.jnf.integration.bank.SingleFlowStateQueryInterface;
import com.jsjn.jnf.integration.bank.factory.JsyhReqFactory;
import com.jsjn.jnf.integration.bank.factory.JsyhResFactory;
import com.jsjn.jnf.service.assist.DictService;
import com.jsjn.jnf.service.assist.InterfaceXmlService;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 江苏银行 单笔支付流水状态查询 实现类
 * 
 * @author yincy
 * 
 */
@Service
@Transactional
public class JsyhSingleFlowStateQueryImpl implements SingleFlowStateQueryInterface {

	private final static Logger logger = Logger.getLogger(JsyhSingleFlowStateQueryImpl.class);
	/**
	 * 配置表
	 */
	private final DictService dictService = (DictService) ParseSpring.context.getBean("dictServiceImpl");
	/**
	 * 报文流水
	 */
	private final InterfaceXmlService interfaceXmlService = (InterfaceXmlService) ParseSpring.context.getBean("interfaceXmlServiceImpl");

	/**
	 * 
	 * 1) 获取传参，根据订单号获取 凭证号 2) 初始化CT机的请求和返回报文对象 3) 发送请求 接收报文 4) 转化返回对象
	 */
	@SuppressWarnings("rawtypes")
	@Override
	public SingleFlowStateQueryResBO singleFlowStateQuery(SingleFlowStateQueryReqBO req) {

		/**
		 * 1) 获取传参，根据订单号获取 凭证号
		 */
		String bankInterfaceCode = BankInterfaceCode.JSYH_SINGLE_FLOW_STATE_QUERY.getCode();
		String tradeCode = BankInterfaceCode.JSYH_SINGLE_FLOW_STATE_QUERY.getTrcode();
		SingleFlowStateQueryReqDataBO reqData = req.getReqData();
		String tranNo = reqData.getTranNo();
		String tranDt = reqData.getTranDt();
		String certNo = tranNo;

		/**
		 * 2) 初始化CT机的请求报文对象 返回报文对象
		 */
		JsReqBase ctReqDto = JsyhReqFactory.creatReqObj(bankInterfaceCode);
		JsReqBaseHead ctReqHead = ctReqDto.getHead();
		JsReqFlowStateQueryBody ctReqBody = (JsReqFlowStateQueryBody) ctReqDto.getBody();

		ctReqHead.setTr_code(tradeCode);
		ctReqHead.setTr_acdt(tranDt);
		//		ctReqHead.setTr_time(DateUtils.getTime("hhmmss"));
		ctReqHead.setFile_flag("0");
		ctReqHead.setReq_no(certNo);// 流水号

		ctReqBody.setCert_no(certNo);
		ctReqBody.setTr_acdt(tranDt);

		//初始化CT机返回报文对象
		JsResBase ctResDto = JsyhResFactory.creatResObj(bankInterfaceCode);
		/**
		 * 3) 发送请求，接收返回值
		 */
		String ctReqXML = JaxbMapper.toXml(ctReqDto, false);
		logger.info("开始调用江苏银行交易流水查询接口,请求报文信息：" + ctReqXML);

		String ctResXML = "";
		SingleFlowStateQueryResBO resDto = new SingleFlowStateQueryResBO();
		// 获取报文流水表Sequence
		String interfaceXmlSeq = SequenceUtils.getInterfaceXmlSeq();
		// 插入报文流水表
		insertInterfaceXml(interfaceXmlSeq, ctReqXML);
		try {
			String jsyhCtHost = dictService.findByType("JSYH_CT_HOST");
			String jsyhCtPort = dictService.findByType("JSYH_CT_PORT");
			ctResXML = SocketUtil.send2JsyhCT(jsyhCtHost, jsyhCtPort, ctReqXML);
		} catch (Exception e) {
			logger.error("江苏银行交易流水查询接口调用异常", e);
			//接口调用异常，状态为：银行处理中。		
			resDto.setResCode(TradeCode.TRADE_DEAL.getCode());
			resDto.setResMsg(e.getMessage());
			// 更新报文流水表
			updateInterfaceXml(interfaceXmlSeq, ctResXML, "2", "江苏银行交易流水查询接口调用异常！,异常原因：" + e.getMessage());
			return resDto;
		}
		logger.info("结束江苏银行交易流水查询接口，返回结果信息：" + ctResXML);
		ctResDto = JaxbMapper.fromXml(ctResXML, JsResFlowStateQuery.class);
		JsResBaseHead ctResHead = ctResDto.getHead();
		JsResFlowStateQueryBody ctResBody = (JsResFlowStateQueryBody) ctResDto.getBody();

		/**
		 * 4) 转化返回对象
		 */
		String succFlag = ctResHead.getSucc_flag();//是否成功标识(0:表示成功 ,1:表示通讯机超时 ,8:表示主机结果未知,其它:交易失败)
		String retMsg = ctResHead.getRet_info();//返回信息

		String resCode = TradeCode.TRADE_DEAL.getCode();//默认为处理中...
		String state = "1";
		if (!StringUtils.equals(succFlag, "0")) {//0-表示接口调用成功
			resDto.setResCode(resCode);
			resDto.setResMsg(retMsg);
		} else {
			state = "0";
			SingleFlowStateQueryResDataBO resDataDto = new SingleFlowStateQueryResDataBO();
			resDataDto.setStatus(ctResBody.getStat());
			resDataDto.setFailReason(ctResBody.getError_info());
			resDataDto.setTranNo(certNo);

			resDto.setResCode(TradeCode.TRADE_SUCCESS.getCode());//调用成功
			resDto.setResMsg(retMsg);
			resDto.setResData(resDataDto);
		}
		// 更新报文流水表
		updateInterfaceXml(interfaceXmlSeq, ctResXML, state, retMsg);
		return resDto;
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
		dto.setMethod("JsyhSingleFlowStateQueryImpl.singleFlowStateQuery");
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
