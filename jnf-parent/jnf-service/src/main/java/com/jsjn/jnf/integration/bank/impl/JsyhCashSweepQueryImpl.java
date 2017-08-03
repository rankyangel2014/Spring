package com.jsjn.jnf.integration.bank.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.bo.bank.RealtimeBalQueryReqBO;
import com.jsjn.jnf.bean.bo.bank.RealtimeBalQueryReqDataBO;
import com.jsjn.jnf.bean.bo.bank.RealtimeBalQueryResBO;
import com.jsjn.jnf.bean.bo.bank.RealtimeBalQueryResDataBO;
import com.jsjn.jnf.bean.bo.integration.jsyh.request.JsReqBase;
import com.jsjn.jnf.bean.bo.integration.jsyh.request.JsReqBaseHead;
import com.jsjn.jnf.bean.bo.integration.jsyh.request.JsReqCashSweepQueryBody;
import com.jsjn.jnf.bean.bo.integration.jsyh.response.JsResBase;
import com.jsjn.jnf.bean.bo.integration.jsyh.response.JsResBaseHead;
import com.jsjn.jnf.bean.bo.integration.jsyh.response.JsResCashSweepQuery;
import com.jsjn.jnf.bean.bo.integration.jsyh.response.JsResCashSweepQueryBody;
import com.jsjn.jnf.common.config.BankInterfaceCode;
import com.jsjn.jnf.common.mapper.JaxbMapper;
import com.jsjn.jnf.common.utils.DateUtils;
import com.jsjn.jnf.common.utils.network.SocketUtil;
import com.jsjn.jnf.integration.bank.RealtimeBalQueryInterface;
import com.jsjn.jnf.integration.bank.factory.JsyhReqFactory;
import com.jsjn.jnf.integration.bank.factory.JsyhResFactory;
import com.jsjn.jnf.service.assist.DictService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 江苏银行 资金归集上存余额查询 实现类
 * 
 * @author yincy
 * 
 */
@Service
@Transactional
public class JsyhCashSweepQueryImpl implements RealtimeBalQueryInterface {

	/**
	 * 配置表
	 */
	private final DictService dictService = (DictService) ParseSpring.context.getBean("dictServiceImpl");

	/**
	 * 
	 * 1) 获取传参 2) 初始化CT机的请求和返回报文对象 3) 发送请求 接收报文 4) 转化返回对象
	 */
	@SuppressWarnings("rawtypes")
	@Override
	public RealtimeBalQueryResBO realTimeBalQuery(RealtimeBalQueryReqBO req) {

		String bankInterfaceCode = BankInterfaceCode.JSYH_CASHSWEEP_QUERY.getCode();
		String jsyhCtHost = dictService.findByType("JSYH_CT_HOST");
		String jsyhCtPort = dictService.findByType("JSYH_CT_PORT");

		/**
		 * 1) 获取传参
		 */
		RealtimeBalQueryReqDataBO reqData = req.getReqData();

		String accountNo = reqData.getAccountNo();
		String curCode = reqData.getCurCode();

		/**
		 * 2) 初始化CT机的请求报文对象 返回报文对象
		 */
		//初始化CT机请求报文
		JsReqBase ctReqDto = JsyhReqFactory.creatReqObj(bankInterfaceCode);
		JsReqBaseHead ctReqHead = ctReqDto.getHead();
		JsReqCashSweepQueryBody ctReqBody = (JsReqCashSweepQueryBody) ctReqDto.getBody();

		ctReqHead.setTr_code(BankInterfaceCode.JSYH_CASHSWEEP_QUERY.getTrcode());
		ctReqHead.setTr_acdt(DateUtils.getDate("yyyyMMdd"));
		ctReqHead.setTr_time(DateUtils.getTime("hhmmss"));
		ctReqHead.setFile_flag("0");
		ctReqHead.setReq_no("0000001");//TODO 流水号

		ctReqBody.setCur_code(curCode);
		ctReqBody.setAcno(accountNo);

		//初始化CT机返回报文对象
		JsResBase ctResDto = JsyhResFactory.creatResObj(bankInterfaceCode);

		/**
		 * 3) 发送请求，接收返回值
		 */
		String ctReqXML = JaxbMapper.toXml(ctReqDto, false);
		String ctResXML = "";

		//TODO 异常处理
		try {
			ctResXML = SocketUtil.send2JsyhCT(jsyhCtHost, jsyhCtPort, ctReqXML);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		ctResDto = JaxbMapper.fromXml(ctResXML, JsResCashSweepQuery.class);
		JsResBaseHead ctResHead = ctResDto.getHead();
		JsResCashSweepQueryBody ctResBody = (JsResCashSweepQueryBody) ctResDto.getBody();

		/**
		 * 4) 转化返回对象
		 */
		RealtimeBalQueryResBO resDto = new RealtimeBalQueryResBO();
		RealtimeBalQueryResDataBO resDataDto = new RealtimeBalQueryResDataBO();

		//TODO 封装错误信息
		resDataDto.setAccountName(ctResBody.getAc_name());
		resDataDto.setAcBalance(ctResBody.getBal());//对于签约资金归集的子账户，展示余额为：自身余额 = 卡上余额+上存余额 
		resDataDto.setAccountNo(ctReqBody.getAcno());//账户名称，取request中内容
		resDataDto.setBankName("");
		resDataDto.setBankNo("");
		resDataDto.setCurCode(ctReqBody.getCur_code());//币种，取request中内容
		resDataDto.setFreezeBalance("");//忽略冻结余额
		resDataDto.setUppBalance(ctResBody.getUpp_bal());
		resDataDto.setUseBalance(ctResBody.getUse_bal());
		resDataDto.setSelfBalance(ctResBody.getSelf_bal());//自身余额

		resDto.setResCode(ctResHead.getRet_code());
		resDto.setResMsg(ctResHead.getRet_info());
		resDto.setSign("这是签名");
		resDto.setResData(resDataDto);

		return resDto;
	}

}
