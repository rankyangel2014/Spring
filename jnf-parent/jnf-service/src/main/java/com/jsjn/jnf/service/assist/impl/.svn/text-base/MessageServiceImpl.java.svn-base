package com.jsjn.jnf.service.assist.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.linkq.MessageDto;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.dao.assist.MessageDao;
import com.jsjn.jnf.service.assist.MessageService;
import com.jsjn.panda.setup.ParseSpring;

@Service
@Transactional(readOnly = false)
public class MessageServiceImpl implements MessageService {

	private MessageDao dao = (MessageDao) ParseSpring.context.getBean("messageDao");

	@Override
	public Integer insertMessage(List<MessageDto> list) throws BussinessException {
		if (list.size() > 0) {
			return dao.insertMessage(list);
		}
		return 0;
	}

	@Override
	public Integer updateMessage(MessageDto dto) throws BussinessException {
		return dao.updateMessage(dto);
	}

	@Override
	public List<MessageDto> queryMessageList(Integer limit) {
		return dao.queryMessageList(limit);
	}

}
