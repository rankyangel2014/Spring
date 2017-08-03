package com.jsjn.skylark.service;

import org.springframework.stereotype.Service;

import com.jsjn.skylark.bean.ParamDto;
import com.jsjn.skylark.common.Constant;
import com.jsjn.skylark.ex.LinkQHandlerException;
import com.jsjn.skylark.session.UserInfo;
import com.jsjn.skylark.common.utils.LinkQHandler;

@Service
public class ParamService extends AbstractBaseService {

	/**
	 * 获取下拉参数列表
	 * 
	 * @param inDto
	 *            inDto
	 * @return ParamDto
	 */
	public ParamDto getDropDownParaInfo(ParamDto inDto) {
		ParamDto outDto = new ParamDto();
		UserInfo userInfo = getUserDto();
		if (userInfo == null) {
			return inDto;
		}
		inDto.setOrgNo(userInfo.getInsttuId());
		inDto.set_insttuId(userInfo.getInsttuId());
		inDto.set_userId(userInfo.getUserId());
		inDto.setOrgType(userInfo.getInsttuTy());
		inDto.set_accDate(userInfo.getJyrq());
		//
		inDto.set_transCode(Constant.QRY8888);
		inDto.set_sqlListName("recList");
		// 设置分页
		inDto.set_pageStart(0L);

		inDto.set_pageLimit(Constant.PAGE_MAX_SIZE);
		try {
			outDto = LinkQHandler.getData(inDto, ParamDto.class);
		} catch (LinkQHandlerException e) {
			outDto.set_rspCode(Constant.RESPONSE_FAIL);
			outDto.set_rspMsg("获取下拉参数失败");
		}

		return outDto;

	}

	/**
	 * 获取下拉参数列表
	 * 
	 * @return ParamDto
	 */
	public ParamDto loadParamData(){

		ParamDto inDto = new ParamDto();
		UserInfo userInfo = getUserDto();
		if (userInfo == null) {
			return inDto;
		}
		inDto.setOrgNo(userInfo.getInsttuId());
		inDto.set_insttuId(userInfo.getInsttuId());
		inDto.set_userId(userInfo.getUserId());
		inDto.setOrgType(userInfo.getInsttuTy());
		inDto.set_accDate(userInfo.getJyrq());
		//
		inDto.set_transCode(Constant.QRY8888);
		inDto.set_sqlListName("recList");

		// 设置分页
		inDto.set_pageStart(0l);
		inDto.set_pageLimit(Constant.PAGE_MAX_SIZE);
		// 从后台获取下拉列表参数
		ParamDto outDto = new ParamDto();
		try {
			outDto = LinkQHandler.getData(inDto, ParamDto.class);
		} catch (LinkQHandlerException e) {
			outDto.set_rspCode(Constant.RESPONSE_FAIL);
			outDto.set_rspMsg("获取下拉参数失败");
		}
		return outDto;

	}

}
