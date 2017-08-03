package com.jsjn.jnf.service.member;

import java.util.Date;
import java.util.Map;

import com.jsjn.jnf.bean.dto.member.FeeRealNameDto;

/**
 * realnameflow service
 * @author Administrator
 *
 */
public interface RealNameFlowService {

	/**
	 * 新增一条realname flow记录
	 * @param mId
	 * @param custName
	 * @param IdNo
	 * @param bankCardNo
	 * @param mobile
	 * @param bankName
	 * @param bankCode
	 * @return
	 */
	public int insertFlow(String mId, String custName, String IdNo, String bankCardNo, String mobile, String bankName,String bankCode,String orgNo);
	/**
	 * 更新flow表状态
	 * @param token
	 * @param status
	 * @param exception
	 * @param resCode
	 * @return
	 */
	public int updateStatus(String token,String status,String exception,String resCode);
	/**
	 * 更新state值=validating，防并发，防重复
	 * @param token
	 * @return
	 */
	public int updateStateValidating(String token);
	/**
	 * 更新token值
	 * @param token
	 * @param flowId
	 * @param custId
	 * @return
	 */
	public int updateToken(String token,String flowId,String custId);
	public FeeRealNameDto selectByToken(String token);
	
	public Map<String,Object> controlTimes(String idNo,Date now);
}
