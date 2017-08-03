package com.jsjn.jnf.service.assist;

import java.util.List;

import com.jsjn.jnf.bean.dto.assist.ChannelDto;
import com.jsjn.jnf.common.exception.BussinessException;

/**
 * 渠道表 接口类
 * 
 * @author yincy
 * 
 */
public interface ChannelService {
	/**
	 * 根据channelId查询渠道信息
	 * 
	 * @param channelId
	 * @return
	 * @throws BussinessException
	 */
	public ChannelDto queryChannelById(String channelId) throws BussinessException;

	/**
	 * 查询全部渠道信息
	 */
	public List<ChannelDto> queryChannel();

	/**
	 * 新增渠道信息
	 */
	public int addChannel(ChannelDto dto);

	/**
	 * 修改渠道信息
	 */
	public int updateChannel(ChannelDto dto);

	/**
	 * 删除渠道信息
	 */
	public int delChannel(ChannelDto dto);

	/**
	 * 根据机构号查询该机构支持的默认渠道
	 * 
	 * @param orgNo
	 *            机构号
	 * @return
	 */
	public ChannelDto queryChannelByOrgNo(String orgNo) throws Exception;

	/**
	 * 根据机构号查询该机构支持的业务类型
	 * 
	 * @param orgNo
	 *            机构号
	 * @return
	 */
	public List<String> queryBusinessTypesByOrgNo(String orgNo) throws Exception;
}
