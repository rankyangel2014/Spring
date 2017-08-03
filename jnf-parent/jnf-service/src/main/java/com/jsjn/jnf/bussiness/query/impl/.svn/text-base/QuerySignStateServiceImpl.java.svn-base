package com.jsjn.jnf.bussiness.query.impl;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.jsjn.jnf.bean.bo.bank.QuerySignInfoDataResBo;
import com.jsjn.jnf.bean.bo.bank.QuerySignInfoReqBo;
import com.jsjn.jnf.bean.bo.bank.QuerySignInfoResBo;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.bean.dto.withhold.InvestorChannelDto;
import com.jsjn.jnf.bean.dto.withhold.SignInfoDto;
import com.jsjn.jnf.bussiness.query.QuerySignStateService;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.utils.Logger;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.ValidatorUtil;
import com.jsjn.jnf.service.member.MemberService;
import com.jsjn.jnf.service.withhold.InvestorChannelService;
import com.jsjn.jnf.service.withhold.SignInfoService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 查询签约状态业务层
 * @author yanhaibo
 *
 *
 */
@Service
public class QuerySignStateServiceImpl implements QuerySignStateService {

	private final static Logger logger = Logger
			.getLogger(QuerySignStateServiceImpl.class);

	
	private SignInfoService service = (SignInfoService) ParseSpring.context.getBean("signInfoServiceImpl");
	
	private MemberService memberService = (MemberService) ParseSpring.context.getBean("memberServiceImpl");

	private InvestorChannelService inService = (InvestorChannelService) ParseSpring.context.getBean("investorChannelService");
	/**
	 * 查询签约状态
	 */
	@Override
	public QuerySignInfoResBo querySignState(QuerySignInfoReqBo dto)
			throws BussinessException {
		logger.info("========QuerySignInfoServiceImpl querySignInfoshow start");
		QuerySignInfoResBo querySignInfoResBo = new QuerySignInfoResBo();
		System.out.println("=====================getReqData"+dto.getReqData().getLoanNo()+"==="+dto.getReqData().getOrgNo());
		//效验请求信息是否为空
		String errMsg = ValidatorUtil.validObj(dto.getReqData());
		if (!StringUtils.isBlank(errMsg)) {
			logger.error("校验查询签约状态请求参数错误" + errMsg);
			throw new BussinessException(ReturnCode.FAIL, errMsg);
		}
		// 借据号
		String lon = dto.getReqData().getLoanNo();
		// 机构号
		String insttuId = dto.getReqData().getOrgNo();

		logger.info("===============根据机构号查询用户表开始=====");
		//查询用户表开始
		MemberDto memberDto = memberService.queryMemberByInsttuId(insttuId,dto.getMid());
		String cusId = memberDto.getCustId();
		SignInfoDto signInfoDto = new SignInfoDto();
		signInfoDto.setmId(dto.getMid());
		signInfoDto.setLoanNo(lon);
		signInfoDto.setPayeeUserId(cusId);
		logger.info("=========================查询签约状态开始");
		// 查询签约状态
		Map<String, Object> map = service.querySignState(signInfoDto);
		logger.info("============logger state"+map);
		QuerySignInfoDataResBo querySignInfoDataResBo = new QuerySignInfoDataResBo();
		//获取渠道类型
		String bindChannel = String.valueOf(map.get("BINDCHANNEL"));
		//查询渠道表
		InvestorChannelDto  investorChannelDto = inService.queryInverstor(bindChannel, cusId);
		if(investorChannelDto!=null){
			querySignInfoDataResBo.setBankCardNo(investorChannelDto.getCardNo());
		}
		querySignInfoDataResBo.setSignStatus(String.valueOf(map.get("STATE")));
		querySignInfoDataResBo.setCardSignNo(String.valueOf(map.get("AID")));
		querySignInfoResBo.setResCode(ReturnCode.SUCCESS);
		querySignInfoResBo.setResMsg("响应成功");
		querySignInfoResBo.setResData(querySignInfoDataResBo);
		return querySignInfoResBo;
	}

	public static void main(String[] args) throws BussinessException {
		String insttu= "320581001";
		MemberService memberService = (MemberService) ParseSpring.context.getBean("memberServiceImpl");
		System.out.println(memberService.queryMemberByInsttuId(insttu,""));
		
		SignInfoService service = (SignInfoService) ParseSpring.context.getBean("signInfoServiceImpl");
		SignInfoDto signInfoDto = new SignInfoDto();
		signInfoDto.setLoanNo("112233");
		signInfoDto.setPayeeUserId("M100100000002");
		System.out.println(service.querySignState(signInfoDto));
	}
}
