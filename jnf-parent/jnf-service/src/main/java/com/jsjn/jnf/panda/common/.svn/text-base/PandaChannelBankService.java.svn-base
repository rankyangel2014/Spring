/**
 * 
 */
package com.jsjn.jnf.panda.common;

import java.util.List;

import com.jsjn.jnf.bean.dto.assist.ChannelBankDto;
import com.jsjn.jnf.common.config.ChannelCode;
import com.jsjn.jnf.service.assist.ChannelBankService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

/**
 * @author ZSMJ
 *
 */
@PandaService(serviceName = "PandaChannelBankService", serviceType = ServiceType.CommonBean)
public class PandaChannelBankService {
	
	private ChannelBankService channelBankService=(ChannelBankService)ParseSpring.context.getBean("channelBankServiceImpl");
	
	@PandaMethod(mName = "queryBankList", dscrpt = "查询金农支持的银行", RegID = "queryBankList")
	public  List<ChannelBankDto> queryBankList(ChannelBankDto ChannelBankDto) {
		return channelBankService.queryBankList(ChannelBankDto);
	}
	
	@PandaMethod(mName = "queryJnBankCode", dscrpt = "查询金农的bankCode", RegID = "queryJnBankCode")
	public  ChannelBankDto queryJnBankCode(ChannelBankDto ChannelBankDto) {
		String channelId = ChannelCode.CHANNEL_JN_ZX.getCode();
		ChannelBankDto.setChannelId(channelId);
		return channelBankService.queryJnBankCode(ChannelBankDto);
	}
	
	@PandaMethod(mName = "queryAllBankList", dscrpt = "查询所有银行渠道", RegID = "queryAllBankList")
	public  List<ChannelBankDto> queryAllBankList(ChannelBankDto ChannelBankDto) {
		return channelBankService.queryAllBankList(ChannelBankDto);
	}
	
	@PandaMethod(mName = "addBankInfo", dscrpt = "新增银行渠道", RegID = "addBankInfo")
	public  int addBankInfo(ChannelBankDto ChannelBankDto) {
		return channelBankService.addBankInfo(ChannelBankDto);
	}
	@PandaMethod(mName = "updateBankInfo", dscrpt = "修改银行渠道", RegID = "updateBankInfo")
	public  int updateBankInfo(ChannelBankDto ChannelBankDto) {
		return channelBankService.updateBankInfo(ChannelBankDto);
	}
	@PandaMethod(mName = "delBankInfo", dscrpt = "删除银行渠道", RegID = "delBankInfo")
	public  int delBankInfo(ChannelBankDto ChannelBankDto) {
		return channelBankService.delBankInfo(ChannelBankDto);
	}
	
}
