package com.jsjn.jnf.dao.assist;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jsjn.jnf.bean.dto.assist.ChannelBankDto;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;

@MyBatisDao
public interface ChannelBankDao extends CrudDao<ChannelBankDto> {

	/**
	 * 查询渠道对应银行
	 * 
	 * @param bankToChannelDto
	 * @return
	 */
	public List<ChannelBankDto> queryBankList(ChannelBankDto bankToChannelDto);

	/**
	 * 根据渠道、金农银行编码查询对应渠道的银行信息
	 * 
	 * @param channelId
	 * @param jnBankCode
	 * @return
	 */
	public ChannelBankDto queryBankInfo(@Param(value = "channelId") String channelId,
			@Param(value = "jnBankCode") String jnBankCode);

	public ChannelBankDto queryJnBankCode(ChannelBankDto dto);

	/**
	 * 根据条件查询所有银行渠道
	 */
	public List<ChannelBankDto> queryAllBankList(ChannelBankDto dto);

	/**
	 * 新增银行渠道
	 */
	public int addBankInfo(ChannelBankDto dto);

	/**
	 * 修改银行渠道
	 */
	public int updateBankInfo(ChannelBankDto dto);

	/**
	 * 删除银行渠道
	 */
	public int delBankInfo(ChannelBankDto dto);

	/**
	 * 查询银行最大限额
	 * 
	 * @param orgNo
	 *            机构号
	 * @param channel
	 *            渠道ID
	 * @param bankCode
	 *            征信系统银行CODE
	 * @return
	 */
	public ChannelBankDto queryMaxAmount(@Param(value = "orgNo") String orgNo,
			@Param(value = "channel") String channel, @Param(value = "bankCode") String bankCode);

}
