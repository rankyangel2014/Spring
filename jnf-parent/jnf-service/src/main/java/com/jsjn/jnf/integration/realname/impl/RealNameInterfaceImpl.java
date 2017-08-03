package com.jsjn.jnf.integration.realname.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.bo.integration.SocialCreditRspDto;
import com.jsjn.jnf.integration.realname.RealNameInterface;
import com.jsjn.jnf.integration.realname.channel.RealNameChannelInterface;
import com.jsjn.jnf.integration.realname.channel.impl.CreditSystemRealNameImpl;

@Service
@Transactional(readOnly=true)
public class RealNameInterfaceImpl implements RealNameInterface{

	@Override
	public boolean submit(String custName,String idNo,
			String cardNo,String tel,String code,String token) {
		RealNameChannelInterface channel = new CreditSystemRealNameImpl();
		return channel.submit(custName,idNo,cardNo,tel,code,token);	
	}

	@Override
	public SocialCreditRspDto validate(String custName,String idNo,
			String cardNo,String tel,String orgNo,String token,String mid) throws Exception{
		RealNameChannelInterface channel = new CreditSystemRealNameImpl();
		return channel.validate(custName,idNo,cardNo,tel,orgNo,token,mid);
	}

}
