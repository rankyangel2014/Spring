package com.jsjn.jnf.dao.member;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;
@MyBatisDao
public interface MemberDao extends CrudDao<MemberDto>{
	

	
	/**
	 * 根据用户编号查询用户详情
	 * @param custId
	 * @return
	 */
	public MemberDto queryMember(String custId);
		
	/**
	 * 根据条件查询所有符合条件的用户
	 * 
	 * @param map
	 * @return
	 */
	public List<MemberDto> queryMembers(MemberDto bo);
	
	/**
	 * 根据商户号查询所有符合条件的用户
	 * 
	 * @param mid 商户号
	 * @return
	 */
	public List<MemberDto> getInsttuListByMid(String mid);
	
	/**
	 * 检查用户是否存在 
	 * >0 存在， =0 不存在
	 * @param mid
	 * @param idNo
	 * @return
	 */
	public MemberDto findCust(@Param(value="mId")String mid,@Param(value="idNo")String idNo);
	
	/**
	 * 更具机构号查询用户信息
	 * >0 存在， =0 不存在
	 * @param mid
	 * @param insttuId
	 * @return
	 */
	public MemberDto findCustByInsttuId(@Param(value="mId")String mid,@Param(value="insttuId")String insttuId);
	
	/**
	 * 根据商户编号查询商户机构码
	 * @param mid
	 * @return
	 */
	public String findOrgNo(@Param(value="mId")String mid,@Param(value="custType")String custType);
	
	/**
	 * 根据客户号查询客户信息
	 * @param custId
	 * @return
	 */
	public MemberDto queryMemberById(@Param(value="custId")String custId);
	
	/**
	 * 查询某商户下投资人信息
	 * @param mid
	 * 			商户号
	 * @return
	 */
	public MemberDto queryInvestInfo(@Param(value = "mId")String mid);
	
	/**
	 * 更新商户会员信息
	 * @param dto
	 * @return
	 */
	public int updateMember(MemberDto dto);
	
	/**
	 * @param mid
	 * @param custType
	 * @return
	 */
	public MemberDto queryMemberInfo(@Param(value = "mid")String mid,
			@Param(value = "custType")String custType);
	
	/**
	 * 根据custId 修改手机号
	 * @param custId
	 * @param mobile
	 * @param digest
	 * @return
	 */
	public int updateMobile(@Param(value = "custId")String custId,
			@Param(value = "mobile")String mobile,
			@Param(value = "digest")String digest);
	
	/**
	 * 查询投资人
	 */
	public MemberDto queryInvest(MemberDto dto);
	
	/**
	 * 根据机构号查询用户信息
	 */
	public MemberDto queryMemberByInsttuId(
			@Param(value = "insttuId")String insttuId,
			@Param(value = "mid")String mid);

	
}
