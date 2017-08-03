package com.jsjn.jnf.service.assist;

import java.util.List;

import com.jsjn.jnf.bean.linkq.MessageDto;
import com.jsjn.jnf.common.exception.BussinessException;

public interface MessageService {

	/**
	 * 批量新增
	 * 
	 * @param list
	 * @return
	 * @throws Exception
	 */
	public Integer insertMessage(List<MessageDto> list) throws BussinessException;

	/**
	 * 更新消息发送状态
	 * 
	 * @param dto
	 * @return
	 * @throws Exception
	 */
	public Integer updateMessage(MessageDto dto) throws BussinessException;

	/**
	 * 查询
	 * 
	 * @param limit
	 * @return
	 * @throws Exception
	 */
	public List<MessageDto> queryMessageList(Integer limit);

}
