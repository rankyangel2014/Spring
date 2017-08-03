package com.jsjn.jnf.withhold.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.bo.cardBin.CardBinQueryReqBO;
import com.jsjn.jnf.bean.bo.cardBin.CardBinQueryReqDataBO;
import com.jsjn.jnf.bean.bo.cardBin.CardBinQueryResBO;
import com.jsjn.jnf.bean.bo.cardBin.CardBinQueryResDataBO;
import com.jsjn.jnf.bean.dto.withhold.InvestorChannelDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.panda.client.PandaClient;
import com.jsjn.panda.client.Result;
import com.jsjn.panda.msg.MsgContext;

@Controller
@RequestMapping("/WithholdController.do")
public class WithholdController extends BaseController {

	/**
	 * 获取投资人与渠道关系信息列表
	 * 
	 * @param dto
	 *            接收参数
	 * @param req
	 *            请求对象
	 * @param resp
	 *            响应对象
	 * @return 返回结果
	 * @throws Exception
	 */
	@RequestMapping(params = "method=getWithholdList")
	public void
			getWithholdList(HttpServletRequest req, HttpServletResponse resp, InvestorChannelDto investorChannelDto)
					throws Exception {
		Result rsp = PandaClient.invoke2(new MsgContext(),
				Global.SERVICE_PANDA_ID,
				"getInvestorChannelList",
				investorChannelDto);
		JSONObject result = JSONObject.parseObject(rsp.getResult());
		JSONArray ja = JSONArray.parseArray(result.getString("recList"));
		JSONObject json = new JSONObject();
		json.put("success", true);
		json.put("errMsg", "交易执行成功");
		json.put("total", result.getString("total"));
		json.put("root", ja);
		writeRespToPage(json, req, resp);
	}

	/**
	 * 保存投资人与渠道关系信息
	 * 
	 * @param dto
	 *            接收参数
	 * @param req
	 *            请求对象
	 * @param resp
	 *            响应对象
	 * @return 返回结果
	 * @throws Exception
	 */
	@RequestMapping(params = "method=saveWithhold")
	public void saveWithhold(HttpServletRequest req, HttpServletResponse resp, InvestorChannelDto dto) throws Exception {

		boolean flag = false;
		String msg = StringUtils.EMPTY;
		JSONObject json = new JSONObject();
		String businessType = dto.getBusinessType();

		/**
		 * 目前只支持江苏银行代付
		 */
		CardBinQueryReqDataBO reqDataDto = new CardBinQueryReqDataBO();
		CardBinQueryReqBO reqDto = new CardBinQueryReqBO();
		//代扣业务校验提现卡号 ，代付业务校验转账卡号
		if (StringUtils.equals(businessType, TabsConstant.CHANNEL_TYPE_WITHHOLD.val())) {
			reqDataDto.setBankCardNo(dto.getCardNo());
		} else {
			reqDataDto.setBankCardNo(dto.getTransCardNo());
		}
		reqDto.setReqData(reqDataDto);
		Result cardInfo = PandaClient.invoke2(new MsgContext(), Global.SERVICE_PANDA_ID, "cardBINQuery", reqDto);
		CardBinQueryResBO resDto = JSONObject.parseObject(cardInfo.getResult(), CardBinQueryResBO.class);
		String resCode = resDto.getResCode();
		if (!StringUtils.equals(resCode, ReturnCode.SUCCESS)) {
			json.put("success", Boolean.FALSE);
			json.put("errMsg", "请输入正确的银行卡号");
			writeRespToPage(json, req, resp);
			return;
		} else {
			CardBinQueryResDataBO resDataDto = resDto.getResData();
			String bankCode = resDataDto.getBankCode();
			String bankName = resDataDto.getBankName();
			if (StringUtils.equals(businessType, TabsConstant.CHANNEL_TYPE_PAYMENT.val())) {
				//金农征信平台江苏银行卡宾查询返回码为【0508】
				if (!StringUtils.equals(bankCode, "0508")) {
					flag = false;
					msg = "暂不支持【" + bankName + "】请输入江苏银行卡号！";
					json.put("success", flag);
					json.put("errMsg", msg);
					writeRespToPage(json, req, resp);
					return;
				}
			}
		}

		Result rsp = PandaClient.invoke2(new MsgContext(), Global.SERVICE_PANDA_ID, "queryInvestorChannelCount", dto);
		if (Long.valueOf(rsp.getResult()) <= 0) {
			Result res = PandaClient.invoke2(new MsgContext(), Global.SERVICE_PANDA_ID, "saveWithhold", dto);
			if (Long.valueOf(res.getResult()) <= 0) {
				flag = false;
				msg = "保存失败," + res.getException();
			} else {
				flag = true;
				msg = "保存成功！";
			}
		} else {
			flag = false;
			msg = "该机构的渠道关系已经存在并处于【启用】状态,请重新选择(渠道或机构)或【停用】当前记录！";
		}
		json.put("success", flag);
		json.put("errMsg", msg);
		writeRespToPage(json, req, resp);
	}

	/**
	 * 修改投资人与渠道关系信息状态
	 * 
	 * @param dto
	 *            接收参数
	 * @param req
	 *            请求对象
	 * @param resp
	 *            响应对象
	 * @return 返回结果
	 * @throws Exception
	 */
	@RequestMapping(params = "method=updateWithholdStatus")
	public void updateWithholdStatus(HttpServletRequest req, HttpServletResponse resp, InvestorChannelDto dto)
			throws Exception {
		Result rsp = PandaClient.invoke2(new MsgContext(), Global.SERVICE_PANDA_ID, "queryInvestorChannelCount", dto);
		boolean flag = false;
		String msg = "";
		if ("2".equals(dto.getState()) || Long.valueOf(rsp.getResult()) <= 0) {
			Result res = PandaClient.invoke2(new MsgContext(), Global.SERVICE_PANDA_ID, "updateWithholdStatus", dto);
			if (Long.valueOf(res.getResult()) <= 0) {
				flag = false;
				msg = "操作失败," + res.getException();
			} else {
				flag = true;
				msg = "操作成功！";
			}
		} else {
			flag = false;
			msg = "操作失败，该机构的渠道关系已经存在并处于【启用】状态";
		}
		JSONObject json = new JSONObject();
		json.put("success", flag);
		json.put("errMsg", msg);
		writeRespToPage(json, req, resp);

	}
}
