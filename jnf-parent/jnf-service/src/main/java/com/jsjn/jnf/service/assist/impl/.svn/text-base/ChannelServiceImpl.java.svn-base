package com.jsjn.jnf.service.assist.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.dto.assist.ChannelDto;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.dao.assist.ChannelDao;
import com.jsjn.jnf.service.assist.ChannelService;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 渠道表 实现类
 * 
 * @author yincy
 * 
 */
@Service
@Transactional(readOnly = true)
public class ChannelServiceImpl extends CrudService<ChannelDao, ChannelDto> implements ChannelService {

	@Override
	protected ChannelDao getCrudDao() {
		return (ChannelDao) ParseSpring.context.getBean("channelDao");
	}

	/**
	 * 根据channelId查询渠道信息
	 * 
	 * @param channelId
	 * @return
	 * @throws BussinessException
	 */
	@Override
	public ChannelDto queryChannelById(String channelId) throws BussinessException {

		ChannelDto resDto = getCrudDao().queryChannelById(channelId);

		if (null == resDto) {
			logger.error("不支持的渠道");
			throw new BussinessException(ReturnCode.FAIL, "不支持的渠道");
		}

		return resDto;
	}

	@Override
	public List<ChannelDto> queryChannel() {
		return getCrudDao().queryChannel();
	}

	@Override
	public int addChannel(ChannelDto dto) {
		return getCrudDao().addChannel(dto);
	}

	@Override
	public int updateChannel(ChannelDto dto) {
		return getCrudDao().updateChannel(dto);
	}

	@Override
	public int delChannel(ChannelDto dto) {
		return getCrudDao().delChannel(dto);
	}

	@Override
	public ChannelDto queryChannelByOrgNo(String orgNo) throws Exception {
		return getCrudDao().queryChannelByOrgNo(orgNo);
	}

	@Override
	public List<String> queryBusinessTypesByOrgNo(String orgNo) throws Exception {
		return getCrudDao().queryBusinessTypesByOrgNo(orgNo);
	}
}
