package com.jsjn.jnf.bussiness.statement.impl;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.google.common.base.CharMatcher;
import com.google.common.base.Splitter;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.SftpException;
import com.jsjn.jnf.bean.bo.statement.StatementReqBO;
import com.jsjn.jnf.bean.bo.statement.StatementReqDataBO;
import com.jsjn.jnf.bean.bo.statement.StatementResBO;
import com.jsjn.jnf.bean.dto.statement.StatementDTO;
import com.jsjn.jnf.bussiness.statement.StatementLogic;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.Logger;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.ValidatorUtil;
import com.jsjn.jnf.common.utils.network.SFtpClient;
import com.jsjn.jnf.service.assist.DictService;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.jnf.service.statement.StatementService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 对账功能逻辑层
 * 
 * @author yincy
 * 
 */
@Service
public class StatementLogicImpl implements StatementLogic {

	private final static Logger logger = Logger.getLogger(StatementLogicImpl.class);

	/**
	 * 配置表JNF_T12
	 */
	private final DictService dictService = (DictService) ParseSpring.context.getBean("dictServiceImpl");

	/**
	 * 对账表JNF_T30
	 */
	private final StatementService statementService = (StatementService) ParseSpring.context.getBean("statementServiceImpl");

	/**
	 * 商户主动发起对账
	 */
	@Override
	public StatementResBO verifyAcct(StatementReqBO reqBo) throws BussinessException {
		/**
		 * 初始化请求参数
		 */
		String reqMid = reqBo.getMid();//商户号
		StatementReqDataBO reqDataBo = reqBo.getReqData();//业务数据
		String reqFileName = reqDataBo.getFileName();//文件名称
		String reqVerifyDate = reqDataBo.getVerifyDate();//对账日期

		/**
		 * 校验请求字段是否合法
		 */
		this.verifyReqFieldIsValid(reqDataBo);

		/**
		 * 读取对账文件内容
		 * 
		 * 文件格式：serialNo|tranNo|payeeIdNo|payeeName|payerIdNo|payerName|amount|
		 * payStatus
		 * 中文释义：业务编号|交易订单编号|收款方证件号码|收款方名称|付款方证件号码|付款方名称|交易金额|支付状态(0:扣款未决 1:扣款失败
		 * 2:扣款成功，记账成功 3:失败(未决) 4:扣款成功，记账失败)
		 */
		String content = null;
		try {
			//获取文件内容
			content = SFtpClient.getData(this.dictService.findByType("SFTP_HOST"),
					this.dictService.findByType("SFTP_PORT"),
					this.dictService.findByType("SFTP_USER"),
					this.dictService.findByType("SFTP_PASSWORD"),
					reqFileName);
		} catch (JSchException e1) {
			logger.error(e1.getMessage(), e1);
			throw new BussinessException(ReturnCode.FAIL_CONNECT_SFTP, "SFTP服务异常-连接失败获取session异常");
		} catch (SftpException e1) {
			logger.error(e1.getMessage(), e1);
			throw new BussinessException(ReturnCode.FAIL_LOAD_DATA_SFTP, "SFTP服务异常-文件不存在");
		} catch (IOException e1) {
			logger.error(e1.getMessage(), e1);
			throw new BussinessException(ReturnCode.FAIL_NETWORK_SFTP, "SFTP服务异常-IO异常");
		}
		List<String> statementList = Splitter.on(CharMatcher.BREAKING_WHITESPACE).splitToList(content);

		try {
			List<StatementDTO> list = new ArrayList<StatementDTO>();
			List<String> recordStrList = null;
			for (String recordStr : statementList) {
				recordStrList = Splitter.on(TabsConstant.SPLIT_CHAR.val()).splitToList(recordStr);
				//如果是换行符，则跳过
				if (CharMatcher.BREAKING_WHITESPACE.matchesAllOf(recordStr)) {
					continue;
				}
				list.add(this.initRecord2DTO(reqMid,
						reqVerifyDate,
						recordStrList.get(0),
						recordStrList.get(1),
						recordStrList.get(2),
						recordStrList.get(3),
						recordStrList.get(4),
						recordStrList.get(5),
						new BigDecimal(recordStrList.get(6)),
						recordStrList.get(7)));
			}
			this.statementService.batchInsert(list);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("批量插入对账表失败", e);
			throw new BussinessException(ReturnCode.FAIL, "批量插入对账表失败" + reqFileName);
		}

		StatementResBO resBo = new StatementResBO();
		resBo.setResCode(ReturnCode.SUCCESS);
		resBo.setResMsg("对账单已受理");
		return resBo;
	}

	/**
	 * 将每行内容初始化成DTO
	 * 
	 * @return
	 */
	private StatementDTO
			initRecord2DTO(String mid, String verifyDate, String serialNo, String tranNo, String payeeIdNo,
					String payeeName, String payerIdNo, String payerName, BigDecimal amount, String payStatus) {
		StatementDTO dto = new StatementDTO();
		dto.setMid(mid);
		dto.setVerifyDate(verifyDate);
		dto.setId(SequenceUtils.getStatementSeq());
		dto.setSerialNo(serialNo);
		dto.setTranNo(tranNo);
		dto.setPayerIdNo(Cryptos.aesEncrypt(payerIdNo));//加密处理
		dto.setPayerName(Cryptos.aesEncrypt(payerName));//加密处理
		dto.setAmount(amount);
		dto.setmPayStatus(payStatus);
		return dto;
	}

	/**
	 * 验证字段是否合法
	 * 
	 * @param reqDataBo
	 * @throws Exception
	 */
	private void verifyReqFieldIsValid(StatementReqDataBO reqDataBo) throws BussinessException {
		String errMsg = ValidatorUtil.validObj(reqDataBo);
		if (!StringUtils.isBlank(errMsg)) {
			logger.error("请求参数不合法！" + errMsg);
			throw new BussinessException(ReturnCode.FAIL_VALIDATE, errMsg);
		}
		logger.info("请求字段合法！");
	}
}
