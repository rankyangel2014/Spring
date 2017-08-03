package com.jsjn.jnf.service.account;

import java.util.List;

import com.jsjn.jnf.bean.dto.account.BindCardDto;
import com.jsjn.jnf.common.exception.BussinessException;

/**
 * 客户签约代扣协议
 * 
 * @author qiangl
 * 
 */
public interface BindCardService {
	
	/**
	 * 用户银行卡状态更改
	 * 
	 * @author 李寒冰
	 * @param state 银行卡需要更改的状态
	 * @param aid 绑卡协议号
	 * @return
	 * @throws Exception
	 */
	public boolean updateUserCardState(String state, String aid) throws Exception;
	
	/**
	 * 用户绑卡信息
	 * 
	 * @author 李寒冰
	 * @param custId 用户编号
	 * @return 
	 * @throws Exception
	 */
	public List<BindCardDto> queryUserBindCardInfo(String custId) throws Exception;

	/**
	 * 客户代扣签约
	 * 返回签约号
	 * @param dto
	 * @return
	 * @throws Exception
	 */
	public boolean signAgree(BindCardDto dto) throws Exception;

	/**
	 * 根据：根据商户号、身份证、姓名、银行卡号 检查客户是否签约 若有签约，返回签约协议号
	 * 
	 * @param boolean 如果已经绑卡返回ture，没有绑卡返回false
	 * @return
	 * @throws Exception
	 */
	public boolean isBindCard(String mId, String custName, String idNo, String bankCardNo) throws Exception;

	/**
	 * 查询签约协议列表
	 * 
	 * @param dto
	 * @return
	 * @throws Exception
	 */
	public List<BindCardDto> queryAgrees(BindCardDto dto) throws Exception;
	
	
	/**
	 * 根据下列条件查询绑卡信息
	 * @param custId
	 * 			客户号
	 * @param mid
	 * 			商户号
	 * @param bankCardNo
	 * 			银行卡号
	 * @return
	 */
	public BindCardDto queryBindCardInfo(String custId , String mid , String bankCardNo) throws BussinessException;
	
	/**
	 * 更新协议号
	 * @param aid
	 * @param signNo
	 * @return
	 * @throws Exception
	 */
	public boolean updateSignNo(String aid,String signNo) throws Exception;
	
	/**
	 * 查询绑卡信息
	 * @param cardSignNo
	 * @param bankCardNo
	 * @param custName
	 * @param idNo
	 * @param mobile
	 * @return
	 * @throws Exception
	 */
	public BindCardDto querySignInfo(String cardSignNo,String mid,String bankCardNo,
			String custName,String idNo,String mobile) throws Exception;
	
	/**
	 * 删除绑卡信息
	 * @param cardSignNo
	 * @return
	 * @throws Exception
	 */
	public int deleteSignInfo(String cardSignNo) throws Exception;
	
	/**
	 * 插入解绑表
	 * @param flag
	 * @param aid
	 * @return
	 * @throws Exception
	 */
	public int insertReleaseSign(String flag,String aid) throws Exception;
}
