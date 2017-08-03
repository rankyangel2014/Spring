package com.jsjn.jnf.service.account.impl;

import com.jsjn.jnf.dao.account.AccountDao;
import com.jsjn.jnf.bean.dto.account.AccountDto;
import com.jsjn.jnf.service.account.AccountService;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.panda.setup.ParseSpring;

public class AccountServiceImpl extends CrudService<AccountDao, AccountDto> implements
		AccountService {

	@Override
	public AccountDto openAccount(AccountDto dto) throws Exception {
		save(dto);
		return dto;
	}

	@Override
	protected AccountDao getCrudDao() {
		return (AccountDao) ParseSpring.context.getBean("memberAccountDao");
	}

	

}
