package com.jsjn.jnf.panda.admin.fee;

import java.util.List;

import com.jsjn.jnf.bean.bo.fee.AccountDetailDataBO;
import com.jsjn.jnf.bean.bo.fee.TotalFeeDataBo;
import com.jsjn.jnf.bean.dto.member.FeeStatisticDataBO;
import com.jsjn.jnf.bean.dto.member.FeeRealNameDto;
import com.jsjn.jnf.bean.dto.member.FeeWithholdDto;
import com.jsjn.jnf.service.fee.TotalFeeService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 
 * @author Administrator
 * 
 */
@PandaService(serviceName = "PandaTotalFeeService", serviceType = ServiceType.CommonBean)
public class PandaTotalFeeService {

	private TotalFeeService tfs = (TotalFeeService) ParseSpring.context
			.getBean("totalFeeServiceImpl");

	@PandaMethod(mName = "qryTotalFee", dscrpt = "查询费用总计", RegID = "qryTotalFee")
	public List<TotalFeeDataBo> qryTotalFee(TotalFeeDataBo dto)
			throws Exception {

		return tfs.qryTotalFee(dto);
	}

	@PandaMethod(mName = "queryFeeStatisticList", dscrpt = "查询费用统计", RegID = "queryFeeStatisticList")
	public List<FeeStatisticDataBO> queryFeeStatisticList(FeeStatisticDataBO dto)
			throws Exception {

		return tfs.queryFeeStatisticList(dto);
	}

	@PandaMethod(mName = "queryAccount", dscrpt = "查询对账信息", RegID = "queryAccount")
	public List<AccountDetailDataBO> queryAccount(AccountDetailDataBO dto)
			throws Exception {

		return tfs.queryAccount(dto);
	}

	@PandaMethod(mName = "queryFeeRealnameDetail", dscrpt = "查询实名认证交易明细", RegID = "queryFeeRealnameDetail")
	public List<FeeRealNameDto> queryFeeRealnameDetail(FeeRealNameDto dto)
			throws Exception {

		return tfs.queryFeeRealnameDetail(dto);
	}

	@PandaMethod(mName = "queryFeeWithholdDetail", dscrpt = "查询代扣交易明细", RegID = "queryFeeWithholdDetail")
	public List<FeeWithholdDto> queryFeeWithholdDetail(FeeWithholdDto dto)
			throws Exception {

		return tfs.queryFeeWithholdDetail(dto);
	}
}
