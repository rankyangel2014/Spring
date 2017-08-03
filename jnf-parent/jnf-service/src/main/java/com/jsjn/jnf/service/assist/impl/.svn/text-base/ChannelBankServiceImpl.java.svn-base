/**
 * 
 */
package com.jsjn.jnf.service.assist.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.dto.assist.ChannelBankDto;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.dao.assist.ChannelBankDao;
import com.jsjn.jnf.service.assist.ChannelBankService;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * @author ZSMJ
 * 
 */
@Service
@Transactional(readOnly = true)
public class ChannelBankServiceImpl extends CrudService<ChannelBankDao, ChannelBankDto> implements ChannelBankService {

	private ChannelBankDao dao = (ChannelBankDao) ParseSpring.context.getBean("channelBankDao");

	@Override
	public List<ChannelBankDto> queryBankList(ChannelBankDto bankToChannelDto) {

		return dao.queryBankList(bankToChannelDto);
	}

	@Override
	protected ChannelBankDao getCrudDao() {
		return dao;
	}

	@Override
	public ChannelBankDto queryBankInfo(String channelId, String jnBankCode) throws BussinessException {
		ChannelBankDto dto = dao.queryBankInfo(channelId, jnBankCode);
		if (dto == null) {
			logger.error("不支持的银行卡类型");
			throw new BussinessException(ReturnCode.FAIL_UNSUPPORTCARDKIND, "不支持的银行卡类型");
		}
		return dto;
	}

	@Override
	public ChannelBankDto queryJnBankCode(ChannelBankDto dto) {
		return dao.queryJnBankCode(dto);
	}

	@Override
	public List<ChannelBankDto> queryAllBankList(ChannelBankDto dto) {
		List<ChannelBankDto> list = dao.queryAllBankList(dto);
		for (ChannelBankDto cbd : list) {
			/**
			 * 注：将经过拦截器得到的总页数total值设置到查询结果集中。用于分页
			 */
			cbd.setTotal(dto.getTotal());
		}
		return list;
	}

	@Override
	public int addBankInfo(ChannelBankDto dto) {
		return dao.addBankInfo(dto);
	}

	@Override
	public int updateBankInfo(ChannelBankDto dto) {
		return dao.updateBankInfo(dto);
	}

	@Override
	public int delBankInfo(ChannelBankDto dto) {
		return dao.delBankInfo(dto);
	}

	@Override
	public ChannelBankDto queryMaxAmount(String orgNo, String channelId, String bankCode) throws BussinessException {
		return dao.queryMaxAmount(orgNo, channelId, bankCode);
	}

}
