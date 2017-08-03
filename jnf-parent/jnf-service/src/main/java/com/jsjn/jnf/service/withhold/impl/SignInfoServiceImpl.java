package com.jsjn.jnf.service.withhold.impl;

import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.jsjn.jnf.bean.dto.withhold.SignInfoDto;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.dao.withhold.SignInfoDao;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.jnf.service.withhold.SignInfoService;
import com.jsjn.panda.setup.ParseSpring;

@Service
public class SignInfoServiceImpl extends CrudService<SignInfoDao, SignInfoDto> implements SignInfoService {

	@Override
	protected SignInfoDao getCrudDao() {
		return (SignInfoDao) ParseSpring.context.getBean("signInfoDao");
	}
	
	/**
	 * 根据协议号查询签约信息
	 * @author yincy
	 * 
	 * @param aid 签约协议号
	 * @param mid 商户号
	 * @throws BussinessException
	 */
	@Override
	public SignInfoDto querySignInfoByAid(String aid, String mid) throws BussinessException {
		
		SignInfoDto resDto = getCrudDao().querySignInfoByAid(aid,mid);
		
		if(null == resDto){
			logger.error("不存在该笔代扣签约");
		    throw new BussinessException(ReturnCode.FAIL,"不存在该笔代扣签约");
		}
		if (!StringUtils.equals(resDto.getDigest(), resDto.buildDigest())) {
		    logger.error("签约信息表T22解签失败...");
		    logger.error("数据库摘要: " + resDto.getDigest());
		    logger.error("现摘要: " + resDto.buildDigest());
			throw new BussinessException(ReturnCode.FAIL,"签约信息异常");
		}
		
		return resDto;
	}
	
	/**
	 * 插入
	 */
	@Override
	public int insert(SignInfoDto dto) {
		return getCrudDao().insert(dto);
	}

	/* (non-Javadoc)
	 * @see com.jsjn.jnf.service.withhold.SignInfoService#querySignState(com.jsjn.jnf.bean.dto.withhold.SignInfoDto)
	 */
	/**
	 * 查询签约状态
	 */
	@Override
	public Map<String, Object> querySignState(SignInfoDto signInfoDto) throws BussinessException {
		Map<String, Object> map;
		try {
			 map = getCrudDao().querySignInfos(signInfoDto);
		} catch (Exception e) {
			throw new BussinessException(ReturnCode.FAIL, "查询签约状态信息异常");
		}
		logger.info("============logger state"+map);
		if (map==null||map.size()<1)
			throw new BussinessException(ReturnCode.FAIL, "签约状态信息查询为空");
		return getCrudDao().querySignInfos(signInfoDto);
	}

}
