package com.jsjn.jnf.dao.withhold;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jsjn.jnf.bean.dto.member.BussinessDto;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.bean.dto.withhold.SignTempInfoDto;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;

@MyBatisDao
public interface SignTempInfoDao extends CrudDao<SignTempInfoDto> {

	/**
	 * 查询签约信息
	 * 
	 * @param signTempInfoDto
	 * @return
	 */
	public List<SignTempInfoDto> querySignTempInfoList(SignTempInfoDto signTempInfoDto);

	/**
	 * 根据主键查询签约信息
	 * 
	 */
	public SignTempInfoDto querySignTempInfoById(@Param(value = "signRecordId") String signRecordId);

	/**
	 * 查询签约信息
	 * 
	 * @param signTempInfoDto
	 * @return
	 */
	public SignTempInfoDto querySignTempInfoById(SignTempInfoDto signTempInfoDto);

	/**
	 * 查询签约信息数量
	 * 
	 * @param signTempInfoDto
	 * @return
	 */
	public Long querySignTempInfoCount(SignTempInfoDto signTempInfoDto);

	/**
	 * 查询该笔签约信息是否处于中间状态
	 * 
	 * @param signTempInfoDto
	 * @return
	 */
	public int querySignInfoByLoanNo(SignTempInfoDto signTempInfoDto);

	/**
	 * 新增签约信息
	 * 
	 * @param signTempInfoDto
	 * @return
	 */
	public int saveSignTempInfo(SignTempInfoDto signTempInfoDto);

	/**
	 * 修改签约信息
	 * 
	 * @param signTempInfoDto
	 * @return
	 */
	public int updateSignTempInfo(SignTempInfoDto signTempInfoDto);

	/**
	 * 插入流程id号
	 * 
	 * @param signTempInfoDto
	 * @return
	 */
	public int updateTaskinstanceId(SignTempInfoDto signTempInfoDto);

	/**
	 * 插入短信验证码
	 * 
	 * @param signTempInfoDto
	 * @return
	 */
	public int updateSmsVerifyCode(@Param(value = "smsVerifyCode") String smsVerifyCode,
			@Param(value = "signRecordId") String signRecordId);

	/**
	 * 更新实名认证用户全信息
	 * 
	 * @param signTempInfoDto
	 * @return
	 */
	public int updateSignTempFilesInfo(SignTempInfoDto signTempInfoDto);

	/**
	 * 解约
	 * 
	 * @param signTempInfoDto
	 * @return
	 */
	public int cancelSignTemp(@Param(value = "signRecordId") String signRecordId);

	/**
	 * 根据签约号查询临时表信息
	 * 
	 * @param ids
	 * @return
	 */
	public List<SignTempInfoDto> querySignTempInfoByIds(@Param(value = "insttuId") String instuuId, @Param(
			value = "list") List<String> ids,@Param(value="state")String state);

	/**
	 * 重新签约后，修改前一条记录状态为无效
	 * 
	 * @return
	 */
	public int updateSignState(@Param(value = "mid") String mid, @Param(value = "loanNo") String loanNo, @Param(
			value = "insttuId") String insttuId);

	/**
	 * 获取商户的信息
	 * 
	 * @return
	 */
	public List<BussinessDto> getCommercial();

	/**
	 * 获取机构号的信息
	 * 
	 * @return
	 */
	public List<MemberDto> geTinstitution(@Param(value = "mid") String mid);

	/**
	 * 查询协议的信息
	 * 
	 * @param signTempInfoDto
	 * @return
	 */
	public List<SignTempInfoDto> queryWithholdInfos(SignTempInfoDto signTempInfoDto);

	/**
	 * 查询协议临时详细信息
	 * 
	 * @param signRecordId
	 * @return
	 */
	public SignTempInfoDto queryWithDetails(@Param(value = "signRecordId") String signRecordId);

}
