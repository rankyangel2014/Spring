package com.jsjn.jnf.integration.realname;

import com.jsjn.jnf.bean.bo.integration.CardBinRspDto;

public interface CardBinInterface{
	public CardBinRspDto query(String bankCardNo) throws Exception;
	public String queryBankName(String bankCardNo) throws Exception;
	public String queryBankCode(String bankCardNo) throws Exception;
}
