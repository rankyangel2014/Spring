package com.jsjn.jnf.bussiness.query.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.common.collect.Lists;
import com.jsjn.jnf.bean.bo.orgBusiness.OrgBusinessReqBO;
import com.jsjn.jnf.bean.bo.orgBusiness.OrgBusinessReqDataBO;
import com.jsjn.jnf.bean.bo.orgBusiness.OrgBusinessResBO;
import com.jsjn.jnf.bean.bo.orgBusiness.OrgBusinessResDataBO;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.bussiness.query.QueryOrgBusinessService;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.ValidatorUtil;
import com.jsjn.jnf.service.assist.ChannelService;
import com.jsjn.jnf.service.member.MemberService;
import com.jsjn.panda.setup.ParseSpring;

@Service
@Transactional(readOnly = true)
public class QueryOrgBusinessServiceImpl implements QueryOrgBusinessService {

	private final static Logger logger = Logger.getLogger(QueryOrgBusinessServiceImpl.class);
	private ChannelService channelService = (ChannelService) ParseSpring.context.getBean("channelServiceImpl");
	private MemberService memberService = (MemberService) ParseSpring.context.getBean("memberServiceImpl");

	@Override
	public OrgBusinessResBO orgBusinessQuery(OrgBusinessReqBO dto) throws BussinessException {
		OrgBusinessResBO resBO = new OrgBusinessResBO();
		OrgBusinessReqDataBO reqData = dto.getReqData();

		String[] propertys = { "orgNo" };
		String errMsg = ValidatorUtil.validpropertys(reqData, propertys);
		if (StringUtils.isNotBlank(errMsg)) {
			logger.error("传入参数不合法！" + errMsg);
			throw new BussinessException(ReturnCode.FAIL, errMsg);
		}

		String orgNo = reqData.getOrgNo();
		String mid = dto.getMid();

		MemberDto member = memberService.queryMemberByInsttuId(orgNo, mid);
		if (null == member) {
			logger.error("机构号输入错误！");
			throw new BussinessException(ReturnCode.FAIL, "机构号输入错误！" + orgNo);
		}

		List<String> businessTypeList = Lists.newArrayList();
		try {
			businessTypeList = channelService.queryBusinessTypesByOrgNo(orgNo);
		} catch (Exception e) {
			logger.error("机构支持业务类型查询失败!" + e.getMessage(), e);
			throw new BussinessException(ReturnCode.FAIL, "机构支持业务类型查询失败!" + e.getMessage());
		}

		if (businessTypeList.isEmpty()) {
			logger.error("机构支持业务类型查询失败!");
			throw new BussinessException(ReturnCode.FAIL, "机构支持业务类型查询失败!");
		}

		OrgBusinessResDataBO resData = new OrgBusinessResDataBO();
		resData.setEnableWithhold(businessTypeList.contains(TabsConstant.CHANNEL_TYPE_WITHHOLD.val()) ? "Y" : "N");
		resData.setEnablePay(businessTypeList.contains(TabsConstant.CHANNEL_TYPE_PAYMENT.val()) ? "Y" : "N");
		resBO.setResData(resData);
		resBO.setResCode(ReturnCode.SUCCESS);
		resBO.setResMsg("交易成功！");
		return resBO;
	}
}
