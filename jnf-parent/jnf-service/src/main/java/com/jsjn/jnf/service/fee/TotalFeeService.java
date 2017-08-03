/**
 * 
 */
package com.jsjn.jnf.service.fee;

import java.util.List;

import com.jsjn.jnf.bean.bo.fee.AccountDetailDataBO;
import com.jsjn.jnf.bean.bo.fee.TotalFeeDataBo;
import com.jsjn.jnf.bean.dto.member.FeeStatisticDataBO;
import com.jsjn.jnf.bean.dto.member.FeeRealNameDto;
import com.jsjn.jnf.bean.dto.member.FeeWithholdDto;

/**
 * @author ZSMJ
 * 
 */
public interface TotalFeeService {

	/**
	 * 查询报文流水表
	 * 
	 * @param reqXml
	 * @return
	 */
	public List<TotalFeeDataBo> qryTotalFee(TotalFeeDataBo dto);

	/**
	 * 查询对账信息
	 * 
	 * @param dto
	 * @return
	 */
	public List<AccountDetailDataBO> queryAccount(AccountDetailDataBO dto);

	/**
	 * 计费统计查询
	 * 
	 * @param dto
	 * @return
	 */
	public List<FeeStatisticDataBO> queryFeeStatisticList(FeeStatisticDataBO dto);

	/**
	 * 查询代扣交易明细
	 * 
	 * @param dto
	 * @return
	 */
	public List<FeeWithholdDto> queryFeeWithholdDetail(FeeWithholdDto dto);

	/**
	 * 查询实名认证交易明细
	 * 
	 * @param dto
	 * @return
	 */
	public List<FeeRealNameDto> queryFeeRealnameDetail(FeeRealNameDto dto);

}
