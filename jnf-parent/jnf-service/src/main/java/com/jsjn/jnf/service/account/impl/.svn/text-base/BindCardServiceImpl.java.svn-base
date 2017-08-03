package com.jsjn.jnf.service.account.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.dto.account.BindCardDto;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.SensitiveInfoUtils;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.dao.account.BindCardDao;
import com.jsjn.jnf.service.account.BindCardService;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.panda.setup.ParseSpring;

@Service
@Transactional(readOnly = true)
public class BindCardServiceImpl extends CrudService<BindCardDao, BindCardDto> implements BindCardService {
	
	private BindCardDao dao = (BindCardDao)getBean("bindCardDao");
	
	@Transactional(rollbackFor = Exception.class)
	@Override
	public boolean updateUserCardState(String state, String aid) throws Exception {
		/**
		 * lihanbing
		 * 1.先通过aid查出绑卡的信息
		 * 2.通过数据摘要验证数据是否异常，如果数据与数据摘要不符，则返回数据异常。
		 * 3.数据无异常则执行sql语句，修改绑卡状态，同时更新数据摘要。
		 * 4.返回更新数据的条数。
		 */
	    if(StringUtils.isBlank(state)){
	        logger.info("状态不能为空");
	        throw new BussinessException(ReturnCode.FAIL,"状态不能为空");
	    }
	    if(StringUtils.isBlank(aid)){
	        logger.info("协议号不能为空");
	        throw new BussinessException(ReturnCode.FAIL,"协议号不能为空");
	    }
	    
		BindCardDto retDto = dao.queryBindCardInfoAboutAid(aid);
		if (retDto == null) {
			logger.info("协议号为" + aid + "的绑卡信息不存在");
			throw new BussinessException(ReturnCode.FAIL,"协议号为" + aid + "的绑卡信息不存在");
		}
		if (!StringUtils.equals(retDto.getDigest(), retDto.buildDigest())) {
		    logger.info("解签失败..." + "数据库摘要：" + retDto.getDigest() + ";现摘要:" + retDto.buildDigest());
			throw new BussinessException(ReturnCode.FAIL,"客户数据异常");
		}
		retDto.setIsNewRecord(false);
		retDto.setState(state);
		save(retDto);
		return true;
	}

	@Override
	public List<BindCardDto> queryUserBindCardInfo(String custId)
			throws Exception {
		/**
		 * lihanbing
		 * 1.根据参数用户编号查询数据
		 * 2.对查询出的数据进行摘要处理。
		 * 3.对解密的数据进行脱敏处理。（脱敏和方政商议写成一个utils，公用）
		 * 4.将处理后的结果返回。
		 */
		if(StringUtils.isBlank(custId)){
		    logger.error("用户编号不能为空");
		    throw new BussinessException(ReturnCode.FAIL,"用户编号不能为空");
		}
	    
		//查出用户绑卡信息
		List<BindCardDto> list = dao.queryBindCarUser(custId);
		
		for(BindCardDto dto :list ){
		    if(!StringUtils.equals(dto.getDigest(), dto.buildDigest())){
		        logger.error("数据被篡改..." +"数据库存储摘要："+dto.getDigest()+";现摘要："+dto.buildDigest());
                dto.setValid(false);
                dto.setMobile(SensitiveInfoUtils.mobilePhone(Cryptos.aesDecrypt(dto.getMobile())));
                dto.setBankCardNo(SensitiveInfoUtils.bankCard(Cryptos.aesDecrypt(dto.getBankCardNo())));
                continue;
            }
		    dto.setValid(true);
		    dto.setMobile(SensitiveInfoUtils.mobilePhone(Cryptos.aesDecrypt(dto.getMobile())));
            dto.setBankCardNo(SensitiveInfoUtils.bankCard(Cryptos.aesDecrypt(dto.getBankCardNo())));
		}
		
		return list;
	}
	
	@Override
	@Transactional(readOnly = false)
	public boolean signAgree(BindCardDto dto) throws Exception {
		//加密存储
		dto.setCustName(Cryptos.aesEncrypt(dto.getCustName()));
		dto.setIdNo(Cryptos.aesEncrypt(dto.getIdNo()));
		dto.setBankCardNo(Cryptos.aesEncrypt(dto.getBankCardNo()));
		dto.setMobile(Cryptos.aesEncrypt(dto.getMobile()));
		dto.setDigest(dto.buildDigest());
		int n = getCrudDao().signAgree(dto);
		if (n>0){
			return true;
		}
		return false;
	}

	@Override
	public boolean isBindCard(String mId, String custName, String idNo, String bankCardNo) throws Exception {
		Map<String,String> map=new HashMap<String,String>();  
		map.put("mId",mId);  
		map.put("custName",Cryptos.aesEncrypt(custName));  
		map.put("idNo",Cryptos.aesEncrypt(idNo));  
		map.put("bankCardNo",Cryptos.aesEncrypt(bankCardNo));  
		int n = getCrudDao().isBindCard(map); 
		if (n>0){
			return true;
		}
		return false;
	}

	@Override
	public List<BindCardDto> queryAgrees(BindCardDto dto) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected BindCardDao getCrudDao() {
		return (BindCardDao) ParseSpring.context.getBean("bindCardDao");
	}
	
	
	@Override
	public BindCardDto queryBindCardInfo(String custId, String mid, String bankCardNo) throws BussinessException{
		BindCardDto retDto = getCrudDao().queryBindCardInfo(custId, mid, bankCardNo);
		if (retDto == null) {
		    logger.info("客户号为" + custId + "商户号为" + mid + "银行卡号为" + bankCardNo + "的绑卡信息不存在");
			throw new BussinessException(ReturnCode.RESPONSE_NO_DATA_FOUND,"该客户未绑卡");
		}
		if (!StringUtils.equals(retDto.getDigest(), retDto.buildDigest())) {
		    logger.info("解签失败..." + "数据库摘要：" + retDto.getDigest() + ";现摘要:" + retDto.buildDigest());
			throw new BussinessException(ReturnCode.FAIL,"客户绑卡数据异常");
		}
		
		retDto.setResCode(ReturnCode.SUCCESS);
		retDto.setResMsg("操作成功");
		return retDto;
	}
	@Override
	public boolean updateSignNo(String aid, String signNo) throws Exception {
		int count = dao.updateSignNo(aid, signNo);
		if(count > 0){
			return true;
		}
		return false;
	}

	@Override
	public BindCardDto querySignInfo(String cardSignNo,String mid, String bankCardNo, String custName, String idNo, String mobile)
			throws Exception {
		return dao.querySignInfo(cardSignNo,mid, bankCardNo, custName, idNo, mobile);
	}

	@Override
	public int deleteSignInfo(String cardSignNo) throws Exception {
		return dao.deleteSignInfo(cardSignNo);
	}

	@Override
	public int insertReleaseSign(String flag, String aid) throws Exception {
		return dao.insertReleaseSign(flag, aid);
	}
}
