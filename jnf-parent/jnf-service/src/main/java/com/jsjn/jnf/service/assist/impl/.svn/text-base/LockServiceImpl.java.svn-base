/**
 * 
 */
package com.jsjn.jnf.service.assist.impl;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.dto.assist.LockDto;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.ValidatorUtil;
import com.jsjn.jnf.dao.assist.LockDao;
import com.jsjn.jnf.service.assist.LockService;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * @author ZSMJ
 *
 */
@Service
@Transactional(readOnly = true)
public class LockServiceImpl extends CrudService<LockDao, LockDto> implements LockService{
	
	private final static Logger logger = Logger.getLogger(LockServiceImpl.class);
	private LockDao dao = (LockDao)ParseSpring.context.getBean("lockDao");

	@Transactional(readOnly = false)
	@Override
	public int insertLock(String mid,String lockType,String lockNo) throws Exception {
		LockDto dto = new LockDto();
		dto.setMid(mid);
		dto.setLockType(lockType);
		dto.setLockNo(lockNo);
		String[] propertys = { "mid", "lockType", "lockNo"};
		String errMsg = ValidatorUtil.validpropertys(dto, propertys);
		if (!StringUtils.isBlank(errMsg)) {
			logger.info("新增锁:商户号" + mid + "锁类型" + lockType + "锁号" + lockNo + "不合法！");
			throw new Exception("insertLock参数不合法");
		}
		return dao.insert(dto);		
	}
	
	@Transactional(readOnly = false)
	@Override
	public int deleteLock(String mid,String lockType,String lockNo) throws BussinessException {
		LockDto dto = new LockDto();
		dto.setMid(mid);
		dto.setLockType(lockType);
		dto.setLockNo(lockNo);
		String[] propertys = { "mid", "lockType", "lockNo"};
		String errMsg = ValidatorUtil.validpropertys(dto, propertys);
		if (!StringUtils.isBlank(errMsg)) {
			logger.info("删除锁:商户号" + mid + "锁类型" + lockType + "锁号" + lockNo + "不合法！");
			throw new BussinessException(ReturnCode.FAIL,"锁表参数不合法");
		}

		return dao.delete(dto);
	}
	

	@Override
	protected LockDao getCrudDao() {
		return dao;
	}


}
