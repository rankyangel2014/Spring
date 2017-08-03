package com.jsjn.jnf.panda.withhold;

import java.util.List;

import com.jsjn.jnf.bean.dto.assist.ChannelDto;
import com.jsjn.jnf.bean.dto.assist.MenuDto;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.bean.dto.withhold.InvestorChannelDto;
import com.jsjn.jnf.service.withhold.InvestorChannelService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

@PandaService(serviceName = "pandaInvestorChannelService", serviceType = ServiceType.CommonBean)
public class PandaInvestorChannelService {

	private InvestorChannelService investorChannelService = (InvestorChannelService) ParseSpring.context.getBean("investorChannelService");

	/**
	 * 查询投资人与渠道关系
	 * 
	 * @param investorChannelDto
	 * @return
	 */
	@PandaMethod(mName = "getInvestorChannelList", RegID = "getInvestorChannelList")
	public InvestorChannelDto getInvestorChannelList(InvestorChannelDto investorChannelDto) {
		return investorChannelService.getInvestorChannelList(investorChannelDto);
	}

	/**
	 * 查询投资人与渠道关系Count
	 * 
	 * @param investorChannelDto
	 * @return
	 */
	@PandaMethod(mName = "queryInvestorChannelCount", RegID = "queryInvestorChannelCount")
	public Long queryInvestorChannelCount(InvestorChannelDto investorChannelDto) {
		return investorChannelService.queryInvestorChannelCount(investorChannelDto);
	}

	/**
	 * 新增投资人与签约渠道关系
	 * 
	 * @param investorChannelDto
	 * @return
	 */
	@PandaMethod(mName = "saveWithhold", dscrpt = "新增投资人与签约渠道关系", RegID = "saveWithhold")
	public int saveWithhold(InvestorChannelDto investorChannelDto) throws Exception {
		return investorChannelService.saveWithhold(investorChannelDto);
	}

	/**
	 * 更新投资人与签约渠道关系状态
	 * 
	 * @param investorChannelDto
	 * @return
	 */
	@PandaMethod(mName = "updateWithholdStatus", dscrpt = "更新投资人与签约渠道关系状态", RegID = "updateWithholdStatus")
	public int updateWithholdStatus(InvestorChannelDto investorChannelDto) {
		return investorChannelService.updateWithholdStatus(investorChannelDto);
	}

	/**
	 * 根据投资人查询渠道编号
	 * 
	 * @param withholdDto
	 * @return
	 */
	@PandaMethod(mName = "qryChannelByInvestorId", dscrpt = "根据投资人查询渠道编号", RegID = "qryChannelByInvestorId")
	public List<MenuDto> qryChannelByInvestorId(MemberDto memberDto) {
		return investorChannelService.qryChannelByInvestorId(memberDto);
	}

	/**
	 * 根据机构码和业务类型查询渠道
	 * 
	 * @param orgNo
	 * @param businessType
	 * @return
	 */
	@PandaMethod(mName = "queryChannelByOrgNoAndType", dscrpt = "根据机构码和业务类型查询渠道", RegID = "queryChannelByOrgNoAndType")
	public List<ChannelDto> queryChannelByOrgNoAndType(String orgNo, String businessType) {
		return investorChannelService.queryChannelByOrgNoAndType(orgNo, businessType);
	}

	/**
	 * 根据业务类型查询渠道
	 * 
	 * @param orgNo
	 * @param businessType
	 * @return
	 */
	@PandaMethod(mName = "queryChannelByBusinessType", dscrpt = "根据业务类型查询渠道", RegID = "queryChannelByBusinessType")
	public List<ChannelDto> queryChannelByBusinessType(String businessType) {
		return investorChannelService.queryChannelByBusinessType(businessType);
	}

}
