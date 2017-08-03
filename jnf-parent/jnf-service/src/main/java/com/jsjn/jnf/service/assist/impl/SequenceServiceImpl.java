package com.jsjn.jnf.service.assist.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.dao.assist.SeqDao;
import com.jsjn.jnf.bean.dto.assist.SeqDto;
import com.jsjn.jnf.service.assist.SequenceService;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.panda.setup.ParseSpring;



@Service
@Transactional(readOnly=true)
public class SequenceServiceImpl extends CrudService<SeqDao,SeqDto> implements SequenceService {

	@Override
	public String getSeq(String name) {
		SeqDto dto=new SeqDto();
		dto.setName(name+".NEXTVAL");
		SeqDto tmp=get(dto);
		if(tmp!=null){
			return tmp.getVal();
		}
		return "";
	}
	
	
	@Override
	protected SeqDao getCrudDao() {
		return (SeqDao) ParseSpring.context.getBean("seqDao");
	}


}
