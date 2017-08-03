package com.jsjn.jnf.dao.withhold;

import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.jsjn.jnf.bean.dto.withhold.SignInfoDto;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;

@MyBatisDao
public interface SignInfoDao extends CrudDao<SignInfoDto> {

	/**
	 * 根据协议号查询签约信息
	 */
	public SignInfoDto querySignInfoByAid(@Param(value = "aid") String aid, @Param(value = "mid") String mid);

	/**
	 * 根据借据号查询该笔贷款是否签约状态
	 */
	public int querySignStateByLoanNo(@Param(value = "mid") String mid, @Param(value = "loanNo") String loanNo, @Param(
			value = "insttuId") String insttuId);

	public Map<String, Object> querySignInfos(SignInfoDto signInfoDto);

	/**
	 * 解约
	 * 
	 * @param signTempInfoDto
	 * @return
	 */
	public int cancelSign(@Param(value = "aid") String aid);

	/**
	 * 重新签约，更新正式表签约状态为无效
	 * 
	 * @param signTempInfoDto
	 * @return
	 */
	public int updateSiganInfoSignState(@Param(value = "mid") String mid, @Param(value = "loanNo") String loanNo,
			@Param(value = "insttuId") String insttuId);

	/**
	 * 
	 * 
	 * @param signTempInfoDto
	 * @return
	 */
	public int querySignStatusByorgNoAndLoanNo(@Param(value = "orgNo") String orgNo,
			@Param(value = "loanNo") String loanNo);
}
