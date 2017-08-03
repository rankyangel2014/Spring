package com.jsjn.jnf.service.withhold;

import java.util.List;

import com.jsjn.jnf.bean.dto.assist.ChannelDto;
import com.jsjn.jnf.bean.dto.assist.MenuDto;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.bean.dto.withhold.InvestorChannelDto;
import com.jsjn.jnf.common.exception.BussinessException;

public interface InvestorChannelService {

	public InvestorChannelDto getInvestorChannelList(InvestorChannelDto investorChannelDto);

	public int saveWithhold(InvestorChannelDto investorChannelDto) throws Exception;

	public int updateWithholdStatus(InvestorChannelDto investorChannelDto);

	public Long queryInvestorChannelCount(InvestorChannelDto investorChannelDto);

	public InvestorChannelDto queryInverstor(String channelId, String investorUserId) throws BussinessException;

	public List<MenuDto> qryChannelByInvestorId(MemberDto memberDto);

	public List<ChannelDto> queryChannelByOrgNoAndType(String orgNo, String businessType);

	public List<ChannelDto> queryChannelByBusinessType(String businessType);

}
