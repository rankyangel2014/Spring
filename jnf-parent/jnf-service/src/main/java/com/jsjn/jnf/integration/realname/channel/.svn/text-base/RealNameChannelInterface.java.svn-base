package com.jsjn.jnf.integration.realname.channel;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.bo.integration.SocialCreditRspDto;
/**
 * 用户实名认证渠道接口（实名认证可能会走不通的接口）
 * @author qiangl
 *
 */
@Service
@Transactional(readOnly=true)
public interface RealNameChannelInterface {
	/**
	 * 获取验证码
	 * @param dto
	 * @return
	 */
	public SocialCreditRspDto validate(String custName,String idNo,
			String cardNo,String tel,String orgNo,String token,String mid) throws Exception;
	/**
	 * 校验验证码
	 * @param dto
	 * @return
	 */
	public boolean submit(String custName,String idNo,
			String cardNo,String tel,String code,String token);
}
