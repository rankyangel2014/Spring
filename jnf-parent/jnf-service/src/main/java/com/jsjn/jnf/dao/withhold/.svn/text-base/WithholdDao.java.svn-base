package com.jsjn.jnf.dao.withhold;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jsjn.jnf.bean.dto.assist.ChannelDto;
import com.jsjn.jnf.bean.dto.assist.MenuDto;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.bean.dto.withhold.BatchWithholdDto;
import com.jsjn.jnf.bean.dto.withhold.InvestorChannelDto;
import com.jsjn.jnf.bean.dto.withhold.PubInsttuDto;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;

@MyBatisDao
public interface WithholdDao extends CrudDao<InvestorChannelDto> {

	/**
	 * 查询投资人签约信息
	 * 
	 * @param investorChannelDto
	 * @return
	 */
	public List<InvestorChannelDto> queryInvestorChannelList(InvestorChannelDto investorChannelDto);

	/**
	 * 查询投资人签约信息
	 * 
	 * @param investorChannelDto
	 * @return
	 */
	public Long queryInvestorChannelCount(InvestorChannelDto investorChannelDto);

	/**
	 * 查询机构列表
	 * 
	 * @param pubInsttuDto
	 * @return
	 */
	public List<PubInsttuDto> queryOrgList(PubInsttuDto pubInsttuDto);

	/**
	 * 更新投资人签约信息状态
	 * 
	 * @param investorChannelDto
	 * @return
	 */
	public int updateInvestorChannelState(InvestorChannelDto investorChannelDto);

	/**
	 * 新增投资人签约信息
	 * 
	 * @param investorChannelDto
	 * @return
	 */
	public int insertInvestorChannel(InvestorChannelDto investorChannelDto);

	/**
	 * 根据【渠道】和【投资人客户号】查询对应的投资人账户详细信息
	 * 
	 * @param channel
	 * @param investorUserId
	 * @return
	 */
	public InvestorChannelDto queryInverstor(@Param(value = "channelId") String channelId,
			@Param(value = "investorId") String investorId);

	/**
	 * 根据投资人查询渠道编号
	 * 
	 * @return
	 */
	public List<MenuDto> qryChannelByInvestorId(MemberDto memberDto);

	/**
	 * 批量保存代扣信息
	 * 
	 * @param list
	 * @return
	 */
	public Integer batchInsertWithhold(List<BatchWithholdDto> list);

	/**
	 * 查询有效的批量代扣信息
	 * 
	 * @return
	 */
	public List<BatchWithholdDto> queryBatchWithhold(@Param("limit") Integer limit);

	/**
	 * 更新批量代扣信息
	 * 
	 * @param batchWithholdDto
	 * @return
	 */
	public Integer updateWithhold(BatchWithholdDto batchWithholdDto);

	/**
	 * 查询机构提现卡号
	 * 
	 * @param orgNo
	 * @return
	 */
	public List<String> queryInsttuCardNo(@Param(value = "orgNo") String orgNo);

	/**
	 * 根据机构码和业务类型查询渠道
	 * 
	 * @param orgNo
	 * @param businessType
	 *            代扣 ，代付
	 * @return
	 */
	public List<ChannelDto> queryChannelByOrgNoAndType(@Param(value = "orgNo") String orgNo, @Param(
			value = "businessType") String businessType);

	/**
	 * 根据 业务类型查询渠道
	 * 
	 * @param orgNo
	 * @param businessType
	 *            代扣 ，代付
	 * @return
	 */
	public List<ChannelDto> queryChannelByBusinessType(@Param(value = "businessType") String businessType);

}
