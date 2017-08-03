package com.jsjn.jnf.bussiness.realname;

import com.jsjn.jnf.bean.bo.cardBin.CardBinQueryReqBO;
import com.jsjn.jnf.bean.bo.cardBin.CardBinQueryResBO;
import com.jsjn.jnf.bean.bo.realname.RealNameReqBO;
import com.jsjn.jnf.bean.bo.realname.RealNameResBO;



/**
 * 实名认证接口
 * @author Administrator
 *
 */
public interface RealNameSerivce {
	/**
	 * 校验用户输入四要素是否正确，正确的同时发送验证码
	 * @param dto
	 * @return
	 */
	public RealNameResBO validate(RealNameReqBO rn);
	
	/**
	 * 验证用户输入的验证码是否正确，并做后续处理
	 * @param dto
	 * @return
	 */
	public RealNameResBO submit(RealNameReqBO rn);
	
	/**
	 * 卡BIN查询
	 * @param bankCardNo
	 * @return
	 */
	public CardBinQueryResBO cardBinQuery(CardBinQueryReqBO dto);
}
