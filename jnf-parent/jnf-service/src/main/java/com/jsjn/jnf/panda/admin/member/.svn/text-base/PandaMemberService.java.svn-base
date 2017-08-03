package com.jsjn.jnf.panda.admin.member;

import java.util.List;

import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.service.member.MemberService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 
 * @author Administrator
 * 
 */
@PandaService(serviceName = "memberServicePanda", serviceType = ServiceType.CommonBean)
public class PandaMemberService {

	private MemberService ms = (MemberService) ParseSpring.context
			.getBean("memberServiceImpl");

	@PandaMethod(mName = "queryMembers", dscrpt = "查询会员信息", RegID = "queryMembers")
	public List<MemberDto> queryMembers(MemberDto dto) throws Exception {

		return ms.queryMembers(dto);
	}

	@PandaMethod(mName = "regInvest", dscrpt = "注册投资人", RegID = "regInvest")
	public String regInvest(MemberDto dto) throws Exception {

		return ms.regInvest(dto);
	}

	@PandaMethod(mName = "getInsttuListByMid", dscrpt = "根据商户号查询机构列表", RegID = "getInsttuListByMid")
	public List<MemberDto> getInsttuListByMid(MemberDto dto) throws Exception {
		List<MemberDto> members = ms.queryInsttuListByMid(dto.getMId());
		for (MemberDto memberDto : members) {
			String custName = memberDto.getCustName();
			memberDto.setCustName(Cryptos.aesDecrypt(custName));
		}

		return members;
	}

}
