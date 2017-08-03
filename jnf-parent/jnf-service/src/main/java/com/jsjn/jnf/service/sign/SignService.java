package com.jsjn.jnf.service.sign;

import com.jsjn.jnf.bean.dto.withhold.SignTempInfoDto;

public interface SignService {

	/**
	 * 签约
	 */
	public String  sign(SignTempInfoDto tempDto) throws Exception;

}
