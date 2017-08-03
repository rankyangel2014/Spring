package com.jsjn.jnf.dao.assist;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jsjn.jnf.bean.dto.assist.ChannelDto;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;

@MyBatisDao
public interface ChannelDao extends CrudDao<ChannelDto> {

	/**
	 * 根据channelId查询渠道信息
	 * 
	 * @param channelId
	 * @return
	 */
	public ChannelDto queryChannelById(@Param(value = "channelId") String channelId);

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
	public ChannelDto queryChannelByOrgNo(@Param(value = "orgNo") String orgNo);

	/**
	 * 根据机构号查询该机构支持的业务类型
	 * 
	 * @param orgNo
	 *            机构号
	 * @return
	 */
	public List<String> queryBusinessTypesByOrgNo(@Param(value = "orgNo") String orgNo);
}
