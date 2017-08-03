package com.jsjn.jnf.service.assist;

import com.jsjn.jnf.bean.dto.assist.BizConfigDto;
import com.jsjn.jnf.common.exception.BussinessException;

/**
 * 
 * @author Administrator
 *
 */
public interface BusinessConfigService {
	
	/**
	 * 保存商户配置
	 * @param config  {"appkey","mid","whiteList","rsaPubKey","aesKey"}
	 * @return
	 */
	public BizConfigDto saveBussinessConfig(BizConfigDto config) throws Exception;
	
	/**
	 * 根据appkey查询商户配置
	 * @param appkey
	 * @return
	 */
	public BizConfigDto queryBussinessConfig(BizConfigDto config) throws BussinessException;
	
	/**
	 * 根据mid查询商户接入配置
	 * @param mid
	 * @return
	 */
	public BizConfigDto queryBussinessConfigByMid(String mid) throws BussinessException;
}
