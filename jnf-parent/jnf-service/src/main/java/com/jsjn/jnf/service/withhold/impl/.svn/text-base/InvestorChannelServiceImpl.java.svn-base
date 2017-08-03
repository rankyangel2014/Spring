package com.jsjn.jnf.service.withhold.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.dto.assist.ChannelDto;
import com.jsjn.jnf.bean.dto.assist.MenuDto;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.bean.dto.withhold.InvestorChannelDto;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.Logger;
import com.jsjn.jnf.dao.member.MemberDao;
import com.jsjn.jnf.dao.withhold.WithholdDao;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.jnf.service.withhold.InvestorChannelService;
import com.jsjn.panda.setup.ParseSpring;

@Service("investorChannelService")
public class InvestorChannelServiceImpl implements InvestorChannelService {

	private final static Logger logger = Logger.getLogger(InvestorChannelServiceImpl.class);

	private WithholdDao withholdDao = (WithholdDao) ParseSpring.context.getBean("withholdDao");
	private MemberDao memberDao = (MemberDao) ParseSpring.context.getBean("memberDao");

	@Override
	public InvestorChannelDto getInvestorChannelList(InvestorChannelDto investorChannelDto) {
		List<InvestorChannelDto> list = withholdDao.queryInvestorChannelList(investorChannelDto);
		for (InvestorChannelDto dto : list) {
			dto.setCustName(Cryptos.aesDecrypt(dto.getCustName()));
		}
		investorChannelDto.setRecList(list);
		return investorChannelDto;
	}

	@Override
	public Long queryInvestorChannelCount(InvestorChannelDto investorChannelDto) {
		return withholdDao.queryInvestorChannelCount(investorChannelDto);
	}

	@Override
	@Transactional(readOnly = false, rollbackFor = Exception.class)
	public int saveWithhold(InvestorChannelDto investorChannelDto) throws Exception {
		int res = 0;
		String mId = investorChannelDto.getMId();
		String insttuId = investorChannelDto.getCustId();
		// 查询T2用户信息custId 贷款人payerUserId
		MemberDto payerUserDto = memberDao.findCustByInsttuId(mId, insttuId);

		String payerUserId = "";// 付款方用户编号
		if (null == payerUserDto) {
			String custName = investorChannelDto.getCustName();
			payerUserDto = new MemberDto();
			payerUserId = SequenceUtils.getMemberInfo(mId);
			payerUserDto.setCustId(payerUserId);// 生成用户序列号
			payerUserDto.setMId(mId);
			payerUserDto.setCustType("1");// 用户类型：1=投资人 2=借款人
			payerUserDto.setIdType("0");
			payerUserDto.setState("1");
			payerUserDto.setIsReal("1");
			payerUserDto.setRemark("备注：名称=" + custName + " 类型=投资人");
			payerUserDto.setInsttuId(insttuId);

			// 加密
			payerUserDto.setCustName(Cryptos.aesEncrypt(custName));
			payerUserDto.setIdNo(Cryptos.aesEncrypt(insttuId));
			payerUserDto.setMobile(Cryptos.aesEncrypt(""));
			// 摘要
			payerUserDto.setDigest(payerUserDto.buildDigest());
			memberDao.insert(payerUserDto);
		} else {
			payerUserId = payerUserDto.getCustId();
		}

		investorChannelDto.setId(SequenceUtils.getInvestorChannelSeq());
		investorChannelDto.setState("1");
		investorChannelDto.setCustId(payerUserId);
		res = withholdDao.insertInvestorChannel(investorChannelDto);
		return res;

	}

	@Override
	public int updateWithholdStatus(InvestorChannelDto investorChannelDto) {
		return withholdDao.updateInvestorChannelState(investorChannelDto);
	}

	@Override
	public InvestorChannelDto queryInverstor(String channelId, String investorId) throws BussinessException {
		InvestorChannelDto resDto = withholdDao.queryInverstor(channelId, investorId);

		if (null == resDto) {
			logger.error("不存在的投资人");
			throw new BussinessException(ReturnCode.FAIL, "不存在的投资人");
		}

		return resDto;
	}

	@Override
	public List<MenuDto> qryChannelByInvestorId(MemberDto memberDto) {
		return withholdDao.qryChannelByInvestorId(memberDto);
	}

	@Override
	public List<ChannelDto> queryChannelByOrgNoAndType(String orgNo, String businessType) {
		return withholdDao.queryChannelByOrgNoAndType(orgNo, businessType);
	}

	@Override
	public List<ChannelDto> queryChannelByBusinessType(String businessType) {
		return withholdDao.queryChannelByBusinessType(businessType);
	}
}
