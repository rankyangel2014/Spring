package com.jsjn.jnf.dao.member;

import java.util.Date;

import org.apache.ibatis.annotations.Param;

import com.jsjn.jnf.bean.dto.member.FeeRealNameDto;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;

@MyBatisDao
public interface RealNameFlowDao extends CrudDao<FeeRealNameDto> {
	/**
	 * 插入实名认证记录流水
	 * 
	 * @param type
	 * @return
	 */
	public int insertFlow(FeeRealNameDto dto);

	/**
	 * 更新表，加入token
	 * 
	 * @param token
	 * @return
	 */
	public int updateToken(@Param(value = "token") String token,
			@Param(value = "flowId") String flowId,
			@Param(value = "custId") String custId);

	/**
	 * 更新表，加入fee
	 * 
	 * @param fee
	 * @return
	 */
	public int updateFee(FeeRealNameDto dto);

	/**
	 * 更新最终结果状态
	 * 
	 * @param state
	 * @return
	 */
	public int updateState(@Param(value = "token") String token,
			@Param(value = "state") String state,
			@Param(value = "exception") String exception,
			@Param(value = "resCode") String resCode);

	/**
	 * 更新state状态，防并发和重复提交
	 * 
	 * @return
	 */
	public int updateSendState(String token);

	/**
	 * 根据token查询第一次用户填写信息
	 * 
	 * @param token
	 * @return
	 */
	public FeeRealNameDto selectByToken(String token);

	/**
	 * 更新验证码
	 * 
	 * @param code
	 * @param token
	 * @return
	 */
	public int updateCode(@Param(value = "code") String code,
			@Param(value = "token") String token);

	/**
	 * 查找验证码
	 * 
	 * @param token
	 * @return
	 */
	public String queryCode(String token);
	
	/**
	 * 通过身份证号查询实名认证流水表中 
	 * @param idNo start end
	 * @return
	 */
	public Integer controlTimes(@Param(value="idNo")String idNo,@Param(value="start")Date start,@Param(value="end")Date end);
		

	 
}
