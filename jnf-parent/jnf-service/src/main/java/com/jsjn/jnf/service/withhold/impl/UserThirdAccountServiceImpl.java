package com.jsjn.jnf.service.withhold.impl;

import org.springframework.stereotype.Service;

import com.jsjn.jnf.bean.dto.withhold.UserThirdAccountDto;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.dao.withhold.UserThirdAccountDao;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.jnf.service.withhold.UserThirdAccountService;
import com.jsjn.panda.setup.ParseSpring;

@Service
public class UserThirdAccountServiceImpl extends CrudService<UserThirdAccountDao, UserThirdAccountDto> implements
		UserThirdAccountService {

	@Override
	protected UserThirdAccountDao getCrudDao() {
		return (UserThirdAccountDao) ParseSpring.context.getBean("userThirdAccountDao");
	}

	@Override
	public int insert(UserThirdAccountDto dto) {
		return getCrudDao().insert(dto);
	}

	/**
	 * 根据【账户编号】查找用户绑定的银行卡信息
	 * 
	 * @author yincy
	 * 
	 * @param accNo
	 * @return
	 */
	@Override
	public UserThirdAccountDto queryUserThirdAcctByAccNo(String accNo, String mid) throws BussinessException {

		UserThirdAccountDto resDto = getCrudDao().queryUserThirdAcctByAccNo(accNo, mid);

		if (resDto == null) {
			logger.error("银行卡号未登记：");
			logger.error("银行卡号为：" + accNo);
			throw new BussinessException(ReturnCode.FAIL, "银行卡未登记");
		}
		//		if (!StringUtils.equals(resDto.getDigest(), resDto.buildDigest())) {
		//			logger.error("第三方账户表T21解签失败...");
		//		    logger.error("数据库摘要: " + resDto.getDigest());
		//		    logger.error("现摘要: " + resDto.buildDigest());
		//			throw new BussinessException(ReturnCode.FAIL,"银行卡信息异常");
		//		}

		return resDto;
	}

}
