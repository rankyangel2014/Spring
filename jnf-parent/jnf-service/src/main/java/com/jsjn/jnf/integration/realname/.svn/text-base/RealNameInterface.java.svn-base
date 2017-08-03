package com.jsjn.jnf.integration.realname;

import com.jsjn.jnf.bean.bo.integration.SocialCreditRspDto;


/**
 * 实名认证接口
 * @author qiangl
 *
 */
public interface RealNameInterface {
	/**
	 * 校验客户身份信息,发送短信信息
	 * @param dto
	 * @return
	 */
	public SocialCreditRspDto validate(String custName,String idNo,
			String cardNo,String tel,String orgNo,String token,String mid) throws Exception;
	/**
	 * 校验短信验证
	 * @param dto
	 * @return
	 */
	public boolean submit(String custName,String idNo,String cardNo,
			String tel,String code,String token);
}
