package com.jsjn.jnf.service.member.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.dto.member.FeeRealNameDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.dao.assist.DictDao;
import com.jsjn.jnf.dao.member.RealNameFlowDao;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.jnf.service.member.RealNameFlowService;
import com.jsjn.panda.setup.ParseSpring;

@Service
@Transactional(readOnly = true)
public class RealNameFlowServiceImpl extends CrudService<RealNameFlowDao, FeeRealNameDto>  implements RealNameFlowService {

	private RealNameFlowDao dao = (RealNameFlowDao) ParseSpring.context.getBean("realNameFlowDao");
	
	private DictDao dictDao=(DictDao) ParseSpring.context.getBean("dictDao");
	/**
	 * 插入流水记录
	 * 
	 * @param mId
	 * @param custName
	 * @param IdNo
	 * @param bankCardNo
	 * @param mobile
	 * @return
	 */
	@Override
	public int insertFlow(String mId, String custName, String IdNo, String bankCardNo, String mobile, String bankName,
			String bankCode,String orgNo) {
		// 插入流水记录
		FeeRealNameDto obj = new FeeRealNameDto();
		obj.setId(SequenceUtils.getRealNameFlow());
		obj.setmId(mId);
		obj.setCustName(Cryptos.aesEncrypt(custName));
		obj.setIdNo(Cryptos.aesEncrypt(IdNo));
		obj.setBankCardNo(Cryptos.aesEncrypt(bankCardNo));
		obj.setMobile(Cryptos.aesEncrypt(mobile));
		obj.setState(TabsConstant.REALNAME_FLOW_STATUS_START.val());
		obj.setBankName(bankName);
		obj.setBankCode(bankCode);
		obj.setOrgNo(orgNo);
		int result = dao.insertFlow(obj);
		if (result == -1) {
			return -1;
		}
		return obj.getId();
	}
	
	@Override
	public int updateStatus(String token,String status,String exception,String resCode){
		return dao.updateState(token, status,exception,resCode);
	}
	
	@Override
	public int updateToken(String token,String flowId,String custId){
		return dao.updateToken(token, flowId, custId);
	}
	
	@Override
	public int updateStateValidating(String token){
		return dao.updateSendState(token);
	}
	
	@Override
	public FeeRealNameDto selectByToken(String token){
		return dao.selectByToken(token);
	}
	
	@Override
	protected RealNameFlowDao getCrudDao() {
		return dao;
	}

	@Override
	public Map<String,Object> controlTimes(String idNo, Date now) {
		Map<String,Object> map=new HashMap<String,Object>();
		idNo=Cryptos.aesEncrypt(idNo);
		String tryPeriod=dictDao.findByType("TRY_PERIOD");
		String tryTimes=dictDao.findByType("TRY_TIMES");
		if(tryPeriod==null||tryPeriod.equals("")){
			map.put("result", "111111");
			return map;
		}else if(tryTimes==null||tryTimes.equals("")){
			map.put("result", "111111");
			return map;
		}
		Integer hour=Integer.parseInt(tryPeriod);
		Integer times=Integer.parseInt(tryTimes);
		Date start=new Date(now.getTime()-hour*1000*3600);
		Integer ValidateTimes=dao.controlTimes(idNo, start, now);
		map.put("hour", hour);
		map.put("times", times);
		if(ValidateTimes>=times){
			map.put("result",Global.RES_FAILTURE);
			return map;

		};
		map.put("result", Global.RES_SUCCESS);
		return map;
		
	}

}
