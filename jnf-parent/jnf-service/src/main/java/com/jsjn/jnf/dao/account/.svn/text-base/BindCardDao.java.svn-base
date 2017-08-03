package com.jsjn.jnf.dao.account;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;


import com.jsjn.jnf.bean.dto.account.BindCardDto;
import com.jsjn.jnf.bean.dto.assist.MenuDto;
import com.jsjn.jnf.bean.dto.member.BussinessDto;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;
@MyBatisDao
public interface BindCardDao extends CrudDao<BindCardDto> {
	
	
	public int isBindCard(Map<String,String> map);
	
	public int signAgree(BindCardDto dto);
	
	
	/**
	 * 根据协议号查询详细的绑卡信息
	 * @param aid
	 * @return
	 */
	public BindCardDto queryBindCardInfoAboutAid(String aid);
	
	/**
	 * 查询出所有的商户名称
	 * @return
	 */
	//public List<BussinessDto> queryAllBusinessName();
	
	/**
	 * 查询出所有的银行名称
	 * @return
	 */
	//public List<MenuDto> queryAllBankName ();
	
	/**
	 * 根据用户编号查询所有的绑卡信息
	 * @param custId
	 * @return
	 */
	public List<BindCardDto> queryBindCarUser(String custId);
	
	
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
	public BindCardDto queryBindCardInfo(@Param(value = "custId") String custId, @Param(value = "mId") String mid,
			@Param(value = "bankCardNo") String bankCardNo);
	
	/**
	 * 更新协议号
	 * @param aid
	 * @param signNo
	 * @return
	 */
	public int updateSignNo(@Param(value = "aid")String aid,@Param(value = "signNo")String signNo);
	
	/**
	 * 查询绑定卡信息
	 * @param cardSignNo
	 * @param bankCardNo
	 * @param custName
	 * @param idNo
	 * @param mobile
	 * @return
	 */
	public BindCardDto querySignInfo(
			@Param(value = "cardSignNo")String cardSignNo,
			@Param(value = "mid")String mid,
			@Param(value = "bankCardNo")String bankCardNo, 
			@Param(value = "custName")String custName, 
			@Param(value = "idNo")String idNo, 
			@Param(value = "mobile")String mobile);
	
	/**
	 * 删除绑卡信息
	 * @param cardSignNo
	 * @return
	 */
	public int deleteSignInfo(String cardSignNo);
	
	/**
	 * 插入解绑表
	 * @param flag
	 * @param aid
	 * @return
	 */
	public int insertReleaseSign(@Param(value = "flag")String flag,@Param(value = "aid")String aid);
}
