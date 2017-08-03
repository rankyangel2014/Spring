/**
 * 
 */
package com.jsjn.jnf.dao.fee;

import java.util.List;

import com.jsjn.jnf.bean.bo.fee.AccountDetailDataBO;
import com.jsjn.jnf.bean.bo.fee.TotalFeeDataBo;
import com.jsjn.jnf.bean.dto.member.FeeStatisticDataBO;
import com.jsjn.jnf.bean.dto.member.FeeRealNameDto;
import com.jsjn.jnf.bean.dto.member.FeeWithholdDto;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;

/**
 * @author ZSMJ
 * 
 */
@MyBatisDao
public interface TotalFeeDao extends CrudDao<TotalFeeDataBo> {

	/**
	 * 查询计费汇总
	 * 
	 * @param dto
	 * @return
	 */
	public List<TotalFeeDataBo> qryTotalFee(TotalFeeDataBo dto);

	/**
	 * 计费查询统计
	 * 
	 * @param dto
	 * @return
	 */
	public List<FeeStatisticDataBO> queryFeeStatisticList(FeeStatisticDataBO dto);

	/**
	 * 查询对账信息
	 * 
	 * @param dto
	 * @return
	 */
	public List<AccountDetailDataBO> queryAccount(AccountDetailDataBO dto);

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
