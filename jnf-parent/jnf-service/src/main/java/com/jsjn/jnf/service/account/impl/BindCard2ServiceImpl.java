package com.jsjn.jnf.service.account.impl;



import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.jsjn.jnf.bean.dto.account.BindCardDto2;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.dao.account.BindCardDao2;
import com.jsjn.jnf.service.account.BindCard2Service;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * TODO
 * for test
 */
@Service
@Transactional(readOnly = true)
public class BindCard2ServiceImpl extends CrudService<BindCardDao2, BindCardDto2> implements BindCard2Service {

	@Override
	protected BindCardDao2 getCrudDao() {
		return (BindCardDao2) ParseSpring.context.getBean("bindCardDao2");
	}

	/**
	 * 是否绑卡
	 */
	@Override
	public String getCustId(String mId, String custName, String bankCardNo) throws Exception {
		Map<String,String> map=new HashMap<String,String>();  
		map.put("mId",mId);  
		map.put("custName",Cryptos.aesEncrypt(custName));  
		map.put("bankCardNo",Cryptos.aesEncrypt(bankCardNo));  
		String str = getCrudDao().getCustId(map); 
		if (StringUtils.isBlank(str)){
			return null;
		}
		return str;
	}

	@Override
	public BindCardDto2 queryCardInfo(String mId, String custId, String bankCardNo) throws Exception {
		Map<String,String> map=new HashMap<String,String>();  
		map.put("mId",mId);  
		map.put("custId",custId);  
		map.put("bankCardNo",Cryptos.aesEncrypt(bankCardNo));  
		return getCrudDao().queryCardInfo(map);
	}
}
