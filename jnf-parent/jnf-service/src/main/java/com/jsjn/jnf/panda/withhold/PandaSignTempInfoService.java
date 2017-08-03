package com.jsjn.jnf.panda.withhold;

import java.util.ArrayList;
import java.util.List;

import com.jsjn.jnf.bean.dto.member.BussinessDto;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.bean.dto.withhold.SignTempInfoDto;
import com.jsjn.jnf.service.withhold.SignTempInfoService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

@PandaService(serviceName = "pandaSignTempInfoService", serviceType = ServiceType.CommonBean)
public class PandaSignTempInfoService {

	private SignTempInfoService signTempInfoService = (SignTempInfoService) ParseSpring.context.getBean("signTempInfoService");

	/**
	 * 查询签约信息
	 * 
	 * @param signTempInfoDto
	 * @return
	 */
	@PandaMethod(RegID = "getSignTempInfoList")
	public SignTempInfoDto getSignTempInfoList(SignTempInfoDto signTempInfoDto) {
		return signTempInfoService.getSignTempInfoList(signTempInfoDto);
	}

	/**
	 * 查询签约信息条数
	 * 
	 * @param signTempInfoDto
	 * @return
	 */
	@PandaMethod(RegID = "getSignTempInfoCount")
	public Long getSignTempInfoCount(SignTempInfoDto signTempInfoDto) {
		return signTempInfoService.querySignTempInfoCount(signTempInfoDto);
	}

	/**
	 * 新增用户实名认证信息
	 * 
	 * @param signTempInfoDto
	 * @return
	 * @throws Exception
	 */
	@PandaMethod(RegID = "saveSignTempInfo")
	public SignTempInfoDto saveSignTempInfo(SignTempInfoDto signTempInfoDto) throws Exception {
		return signTempInfoService.saveSignTempInfo(signTempInfoDto);
	}

	/**
	 * 发送短信验证码
	 * 
	 * @param signTempInfoDto
	 * @return
	 * @throws Exception
	 */
	@PandaMethod(RegID = "sendSmsVerifyCode")
	public boolean sendSmsVerifyCode(SignTempInfoDto signTempInfoDto) {
		String cradNo = signTempInfoDto.getCardNo();
		String mobile = signTempInfoDto.getMobile();
		String signRecordId = signTempInfoDto.getSignRecordId();
		return signTempInfoService.sendSmsVerifyCode(signRecordId, cradNo, mobile);
	}

	/**
	 * 更新用户签约信息
	 * 
	 * @param signTempInfoDto
	 * @return
	 * @throws Exception
	 */
	@PandaMethod(RegID = "updateSignTempFilesInfo")
	public SignTempInfoDto updateSignTempFilesInfo(SignTempInfoDto signTempInfoDto) throws Exception {
		return signTempInfoService.updateSignTempFilesInfo(signTempInfoDto);
	}

	/**
	 * 根据主键查询签约信息
	 * 
	 */
	@PandaMethod(RegID = "querySignTempInfoById")
	public SignTempInfoDto querySignTempInfoById(SignTempInfoDto signTempInfoDto) {
		String signRecordId = signTempInfoDto.getSignRecordId();
		return signTempInfoService.querySignTempInfoById(signRecordId);
	}

	/**
	 * 更新流程id号
	 * 
	 * @param signTempInfoDto
	 * @return
	 */
	@PandaMethod(RegID = "updateTaskinstanceId")
	public SignTempInfoDto updateTaskinstanceId(SignTempInfoDto signTempInfoDto) {
		return signTempInfoService.updateTaskinstanceId(signTempInfoDto);
	}

	/**
	 * 更新流程id号
	 * 
	 * @param signTempInfoDto
	 * @return
	 */
	@PandaMethod(RegID = "querySignTempInfoByIds")
	public List<SignTempInfoDto> querySignTempInfoByIds(String instuuId, List<String> ids,String state) {
		return signTempInfoService.querySignTempInfoByIds(instuuId, ids,state);
	}

	@PandaMethod(mName = "queryWithholdInfos", dscrpt = "查询协议信息", RegID = "queryWithholdInfos")
	public List<SignTempInfoDto> queryWithholdInfos(SignTempInfoDto signTempInfoDto) {
		List<SignTempInfoDto> list = signTempInfoService.queryWithholdInfos(signTempInfoDto);
		return list;
	}

	@PandaMethod(mName = "getCommercial", dscrpt = "查询商户信息", RegID = "getCommercial")
	public List<BussinessDto> getCommercial() {
		List<BussinessDto> list = new ArrayList<BussinessDto>();
		list = signTempInfoService.getCommercial();
		return list;
	}

	@PandaMethod(mName = "getTnstitution", dscrpt = "查询机构信息", RegID = "getTnstitution")
	public List<MemberDto> geTinstitution(String mid) {
		List<MemberDto> list = new ArrayList<MemberDto>();
		list = signTempInfoService.geTinstitution(mid);
		return list;
	}

	@PandaMethod(mName = "queryWithDetails", dscrpt = "查询临时签约详细信息", RegID = "queryWithDetails")
	public SignTempInfoDto queryWithDetails(String signRecordId) {
		SignTempInfoDto signTempInfoDto = new SignTempInfoDto();
		signTempInfoDto = signTempInfoService.queryWithDetails(signRecordId);
		return signTempInfoDto;
	}
}
