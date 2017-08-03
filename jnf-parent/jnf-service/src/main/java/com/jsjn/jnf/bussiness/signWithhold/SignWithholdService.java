package com.jsjn.jnf.bussiness.signWithhold;

import com.jsjn.jnf.bean.bo.signWithhold.SignWithholdReqBO;
import com.jsjn.jnf.bean.bo.signWithhold.SignWithholdResBO;
import com.jsjn.jnf.common.exception.BussinessException;

/**
 * 代扣签约
 * 
 * @author Administrator
 * 
 */
public interface SignWithholdService {

	/**
	 * 代扣签约
	 * 
	 * @param dto
	 * @return
	 */
	public SignWithholdResBO signWithhold(SignWithholdReqBO dto) throws BussinessException;
}
