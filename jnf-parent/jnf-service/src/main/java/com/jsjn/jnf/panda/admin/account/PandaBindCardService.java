package com.jsjn.jnf.panda.admin.account;

import java.util.List;


import com.jsjn.jnf.bean.dto.account.BindCardDto;
import com.jsjn.jnf.service.account.BindCardService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 
 * @author Administrator
 *
 */
@PandaService(serviceName = "bindCardServicePanda", serviceType = ServiceType.CommonBean)
public class PandaBindCardService {
	
	private BindCardService service = (BindCardService) ParseSpring.context.getBean("bindCardServiceImpl");
	
	@PandaMethod(mName = "queryUserBindCardInfo", dscrpt = "用户所有绑卡信息", RegID = "queryUserBindCardInfo")
	public List<BindCardDto> queryUserBindCardInfo(BindCardDto dto) throws Exception {
		String custId = dto.getCustId();
		return service.queryUserBindCardInfo(custId);
	}
	
	@PandaMethod(mName = "updateUserCardState", dscrpt = "修改用户银行卡状态", RegID = "updateUserCardState")
	public boolean updateUserCardState(BindCardDto dto) throws Exception {
		String aid = dto.getAid();
		String state = dto.getState();
		return service.updateUserCardState(state,aid);
	}
	
}
