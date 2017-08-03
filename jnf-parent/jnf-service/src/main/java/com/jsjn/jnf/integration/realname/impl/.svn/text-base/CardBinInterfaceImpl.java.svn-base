package com.jsjn.jnf.integration.realname.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.bo.integration.CardBinRspDto;
import com.jsjn.jnf.integration.interfaces.IntermediateSystem;
import com.jsjn.jnf.integration.realname.CardBinInterface;

/**
 * 卡Bin查询
 * @author Administrator
 *
 */
@Service
@Transactional(readOnly=true)
public class CardBinInterfaceImpl implements CardBinInterface{
	@Override
	public CardBinRspDto query(String bankCardNo) throws Exception {
		/**
		 * 目前是从中间业务系统获取卡bin
		 * 如果后面发现中间业务数据不是最新，则考虑先从中间业务查询
		 * 如果没查到，再去快钱查询
		 * 一期先实现从中间业务查询
		 */
		return IntermediateSystem.cardBinQry(bankCardNo);
	}
	
	public String queryBankName(String bankCardNo) throws Exception{
		return query(bankCardNo).getBankName();
	}

	@Override
	public String queryBankCode(String bankCardNo) throws Exception {
		return query(bankCardNo).getBankCode();
	}
	
	public static void main(String[] args) throws Exception {
		CardBinInterface impl = new CardBinInterfaceImpl();
		
		impl.query("6236681240001459231");
	}

}
