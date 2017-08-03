package com.jsjn.jnf.service.withhold;

import java.util.List;

import com.jsjn.jnf.bean.dto.member.BussinessDto;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.bean.dto.withhold.SignTempInfoDto;

public interface SignTempInfoService {

	public SignTempInfoDto getSignTempInfoList(SignTempInfoDto signTempInfoDto);

	public SignTempInfoDto saveSignTempInfo(SignTempInfoDto signTempInfoDto) throws Exception;

	public boolean sendSmsVerifyCode(String signRecordId, String cradNo, String mobile);

	public SignTempInfoDto updateSignTempFilesInfo(SignTempInfoDto signTempInfoDto);

	public Long querySignTempInfoCount(SignTempInfoDto signTempInfoDto);

	public SignTempInfoDto querySignTempInfoById(String signRecordId);

	public SignTempInfoDto updateTaskinstanceId(SignTempInfoDto signTempInfoDto);

	/**
	 * 根据签约号查询临时表信息
	 * 
	 * @param ids
	 * @return
	 */
	public List<SignTempInfoDto> querySignTempInfoByIds(String instuuId, List<String> ids,String state);

	public List<BussinessDto> getCommercial();

	public List<MemberDto> geTinstitution(String mid);

	public List<SignTempInfoDto> queryWithholdInfos(SignTempInfoDto signTempInfoDto);

	public SignTempInfoDto queryWithDetails(String signRecordId);

	/**
	 * 查询该笔签约信息是否处于中间状态
	 * 
	 * @param signTempInfoDto
	 * @return
	 */
	public int querySignInfoByLoanNo(SignTempInfoDto signTempInfoDto);
}
