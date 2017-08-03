package com.jsjn.jnf.service.member;

import java.text.ParseException;
import java.util.List;

import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.common.exception.BussinessException;

/**
 * 会员（用户）api接口
 * 
 * @author qiangl
 * 
 */
public interface MemberService {
	

	/**
	 * 查询符合条件的所有会员（用户）
	 * @param bto
	 * @return
	 * @throws Exception
	 */
	public List<MemberDto> queryMembers(MemberDto bto) throws Exception;

	/**
	 * 根据用户编号查询用户详情
	 * 
	 * @param dto
	 * 上送字段 {"custId"}
	 * @return
	 * @throws Exception
	 */
	public MemberDto queryMember(String custId) throws Exception;

	/**
	 * 注册会员
	 * 
	 * @param dto
	 * @return 注册成功之后，返回custId
	 * @throws ParseException 
	 * @throws Exception
	 */
	public String regMember(MemberDto dto) throws Exception;
	
	/**
	 * 更新商户会员
	 * @param dto
	 * @return
	 * @throws Exception
	 */
	public int updateMember(MemberDto dto) throws Exception;
	/**
	 * 更改用户实名认证状态
	 * 
	 * @param dto
	 * @return
	 * @throws Exception
	 */
	public MemberDto modifyReal(MemberDto dto) throws Exception;
	
	/**
	 * 查询该商户cust信息
	 * @param mid
	 * @param idNo
	 * @return
	 * @throws Exception
	 */
	public MemberDto findCust(String mid, String idNo) throws Exception;
	
	/**
	 * 根据商户号查询机构码
	 * @param mId
	 * @return 返回机构码，如果没找到则返回为空字符串
	 * @throws Exception
	 */
	public String findOrgNo(String mid) throws Exception;
	
	
	/**
	 * 根据客户号查询客户信息
	 * @param custId
	 * @return
	 */
	public MemberDto queryMemberById(String custId) throws BussinessException;
	
	
	/**
	 * 查询某商户下投资人信息
	 * @param mid
	 * 			商户号
	 * @return
	 */
	public MemberDto queryInvestInfo(String mid) throws BussinessException;
	
	
	/**
	 * @param mid
	 * @param custType
	 * @return
	 */
	public MemberDto queryMemberInfo(String mid,String custType);
	
	/**
	 * 根据客户号修改手机号码
	 * @param custId
	 * @return
	 */
	public int updateMobile(String custId,String mobile,String digest);
	
	/**
	 * 查询投资人是否存在
	 * @return
	 */
	public MemberDto queryInvest(MemberDto dto);
	
	/**
	 * 注册投资人
	 * @param dto
	 * @return
	 */
	public String regInvest(MemberDto dto) throws Exception;
	
	/**
	 * 根据机构号查询用户信息
	 * @author yincy
	 * 
	 * @param insttuId
	 * @param mid
	 * @throws BussinessException
	 */
	public MemberDto queryMemberByInsttuId(String insttuId,String mid) throws BussinessException;
	/**
	 * 根据商户号查询用户信息
	 * @author xkx
	 * 
	 * @param mid
	 * @throws BussinessException
	 */
	public List<MemberDto> queryInsttuListByMid(String mid) throws BussinessException;
	
	public MemberDto queryMemberByInsttuIdTwo(String insttuId);
	
}
