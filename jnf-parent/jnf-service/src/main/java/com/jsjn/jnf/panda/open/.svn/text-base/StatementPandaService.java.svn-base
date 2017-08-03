package com.jsjn.jnf.panda.open;

import org.springframework.stereotype.Service;

import com.jsjn.jnf.bean.bo.statement.StatementReqBO;
import com.jsjn.jnf.bean.bo.statement.StatementResBO;
import com.jsjn.jnf.bussiness.statement.StatementLogic;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 对外提供: 对账功能 panda服务类
 * 
 * @author CodmerYin
 * 
 */
@PandaService(serviceName = "statementPandaService", serviceType = ServiceType.CommonBean)
@Service
public class StatementPandaService {

	/**
	 * 对账逻辑层
	 */
	private StatementLogic statementLogic = (StatementLogic) ParseSpring.context.getBean("statementLogicImpl");

	/**
	 * 商户主动对账
	 * 
	 * @param req
	 * @return
	 */
	@PandaMethod(mName = "verifyAcct", dscrpt = "商户主动对账", RegID = "verifyAcct")
	public StatementResBO singleWithHold(StatementReqBO reqBo) {

		StatementResBO resDto = new StatementResBO();
		try {
			resDto = statementLogic.verifyAcct(reqBo);
		} catch (BussinessException e) {
			resDto.setResCode(e.getErrorCode());
			resDto.setResMsg(e.getMessage());
		}
		return resDto;
	}
}
