package com.jsjn.jnf.service.withhold;

import java.util.Map;

import com.jsjn.jnf.bean.dto.withhold.SignInfoDto;
import com.jsjn.jnf.common.exception.BussinessException;

/**
 * 签约信息接口
 * @author yincy
 *
 */
public interface SignInfoService {
	
	public int insert(SignInfoDto dto);

	/**
	 * 根据协议号查询签约信息
	 * @author yincy
	 * 
	 * @param aid 签约协议号
	 * @param mid 商户号
	 * @throws BussinessException
	 */
	public SignInfoDto querySignInfoByAid(String aid,String mid) throws BussinessException;
	
	Map<String,Object> querySignState(SignInfoDto signInfoDto) throws BussinessException;
	
}
