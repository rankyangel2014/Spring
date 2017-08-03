package com.jsjn.jnf.withhold.withhold;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.jsjn.jnf.bean.dto.assist.MenuDto;
import com.jsjn.jnf.bean.dto.withhold.CardInfoDto;
import com.jsjn.jnf.bean.dto.withhold.SignDto;
import com.jsjn.jnf.bean.dto.withhold.SignTempInfoDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.jnf.withhold.controller.BaseController;
import com.jsjn.jnf.withhold.util.WeedfsUtil;
import com.jsjn.panda.client.Result;
import com.jsjn.system.po.PubUserinfo;

@Controller
@RequestMapping(value = "/jnf/withhold.do")
public class WithholdServiceController extends BaseController {

	private final static Logger logger = Logger.getLogger(WithholdServiceController.class);

	/**
	 * 代扣签约查询
	 * 
	 * @param signDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=getSignInfoList")
	public void getSignInfoList(SignDto signDto, HttpServletRequest req, HttpServletResponse resp) throws Exception {
		String str = JSONObject.toJSONString(signDto);
		logger.info("[调用开始] " + "getSignInfoList" + "==>Parameters:" + str);
		try {
			PubUserinfo userInfo = getUserDto(req);
			String state = signDto.getSignStatus();
			String orgNo = signDto.getOrgNo();
			String stationId = userInfo.getStationId();//岗位ID
			String insttuId = userInfo.getId().getInsttuId();//机构ID
			String userId = userInfo.getId().getUserId();//当前用户ID
			if (!userId.contains("990000001")) {//金农公司人员可以查询所有数据(不限机构和客户经理)
				orgNo = insttuId;//非金农公司人员只能查询本机构下的数据
				if (stationId.contains("400")) {//非金农公司客户经理岗只能查本人名下数据
					signDto.setCustManagerNo(userId);
					signDto.setOrgNo(insttuId);
				} else if (stationId.contains("600")) {//非金农公司会计岗可以查询本机构下所有客户经理名下数据

					signDto.setCustManagerNo("");
					signDto.setOrgNo(insttuId);
				} else {
					logger.error("您没有代扣签约查询权限，请联系管理员！");
					JSONObject jsonObject = new JSONObject();
					jsonObject.put("resMsg", "查询接口出错，没有权限！请联系管理员");
					jsonObject.put("success", false);
					writeRespToPage(jsonObject, req, resp);
				}
			}
			signDto.set_transCode("QRY850");
			signDto.set_sqlListName("resultList");
			signDto.setOrderType("1");
			signDto.setSetlFlg("N");
			// 查询小微贷 贷款信息 by linkq
			JSONObject json = queryForMulti(signDto, null, req);
			logger.info("linkq返回结果：" + json);
			Map<String, String> map = Maps.newHashMap();
			JSONArray array = json.getJSONArray("root");
			if (CollectionUtils.isNotEmpty(array)) {
				for (int i = 0; i < array.size(); i++) {
					JSONObject obj = array.getJSONObject(i);
					String loanNo = obj.getString("loanNo");
					String lastRepayDt = obj.getString("lastRepayDt");
					String insttuid = StringUtils.defaultIfBlank(obj.getString("orgNo"), StringUtils.EMPTY);
					if (StringUtils.isNotBlank(loanNo)) {
						map.put(insttuid + loanNo, lastRepayDt);
					}
				}
			}

			List<String> ids = Lists.newArrayList(map.keySet());
			// 根据签约号查询贷款信息 查询jnf_20
			Result result = null;
			JSONArray root = null;
			if (CollectionUtils.isNotEmpty(ids)) {
				result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "querySignTempInfoByIds", orgNo, ids, state);
			}
			if (null != result) {
				root = JSONArray.parseArray(result.getResult());
				for (int i = 0; i < root.size(); i++) {
					JSONObject obj = root.getJSONObject(i);
					String insttuid = StringUtils.defaultIfBlank(obj.getString("insttuId"), StringUtils.EMPTY);
					String loanNo = obj.getString("loanNo");
					obj.put("lastRepayDt", map.get(insttuid + loanNo));
				}
			}

			logger.info("[调用结束]" + "getSignInfoList" + "==>result:" + root);
			json.put("root", null == root ? "" : root);
			//bug 13705 modified by yincongyang on 2017-02-23 begin
			//	json.put("total", null == result ? "0" : JSONArray.parseArray(result.getResult()).size() + "");
			//bug 13705 modified by end on 2017-02-23 end
			writeRespToPage(json, req, resp);
		} catch (Exception e) {
			logger.error("Panda远程调用querySignTempInfoByIds接口失败！,", e);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("resMsg", "查询接口出错！请联系管理员");
			jsonObject.put("success", false);
			writeRespToPage(jsonObject, req, resp);
		}
	}

	/**
	 * 根据主键查询贷款信息
	 * 
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=querySignTempInfoById")
	public void querySignTempInfoById(SignTempInfoDto inDto, HttpServletRequest req, HttpServletResponse resp)
			throws Exception {

		String str = JSONObject.toJSONString(inDto);
		logger.info("[调用开始]" + "querySignTempInfoById" + "==>Parameters:" + str);

		try {
			Result result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "querySignTempInfoById", inDto);
			req.setCharacterEncoding("UTF-8");
			resp.setCharacterEncoding("UTF-8");
			JSONObject json = new JSONObject();
			JSONObject jsonObject = JSONObject.parseObject(result.getResult());
			if (null == jsonObject) {
				json.put("success", false);
				json.put("errMsg", "查询失败！");
			} else {

				json.put("success", true);
				json.put("errMsg", "交易执行成功");
				json.put("data", jsonObject);
			}
			resp.getWriter().write(json.toString());
			resp.getWriter().flush();
			resp.getWriter().close();
			logger.info("[调用结束]" + "querySignTempInfoById" + "==>result:" + jsonObject.toJSONString());
		} catch (Exception e) {
			logger.error("Panda远程调用querySignTempInfoById接口失败！,", e);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", "");
			jsonObject.put("resMsg", "查询接口出错！请联系管理员");
			jsonObject.put("success", false);
			writeRespToPage(jsonObject, req, resp);
		}
	}

	/**
	 * 贷款合同号查询
	 * 
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=findContNoByCondition")
	public void findContNoByCondition(SignDto signDto, HttpServletRequest req, HttpServletResponse rsp)
			throws Exception {

		logger.info("[调用开始] " + "method:findContNoByCondition " + "==>Parameters:" + JSONObject.toJSONString(signDto));
		try {
			signDto.set_transCode("QRY850");
			signDto.set_sqlListName("resultList");

			signDto.setOrderType("0");
			signDto.setSetlFlg("N");
			//Bug #14198  【代扣签约】添加一个状态为1（保存未提交）的状态
			signDto.setSignStatus("0,1,4,5");
			signDto.setLastRepayDt("");
			JSONObject json = queryForMulti(signDto, null, req);
			if (json.get("root") == null) {
				json.put("root", "");
			}
			logger.info("[调用结束]" + "getSignInfoList" + "==>result:" + json);
			writeRespToPage(json, req, rsp);

		} catch (Exception e) {
			logger.error("Panda远程调用findContNoByCondition接口失败！,", e);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", "");
			jsonObject.put("resMsg", "查询接口出错！请联系管理员");
			jsonObject.put("success", false);
			writeRespToPage(jsonObject, req, rsp);
		}
	}

	/**
	 * 用户实名认证信息保存
	 * 
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=saveSignTempInfo")
	public void saveSignTempInfo(SignTempInfoDto inDto, HttpServletRequest req, HttpServletResponse rsp)
			throws Exception {
		logger.info(req.getSession().getAttribute("loginUserInfo"));
		logger.info("[调用开始] " + "method:saveSignTempInfo " + "==>Parameters:" + JSONObject.toJSONString(inDto));

		JSONObject json = new JSONObject();
		Result result = null;
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "saveSignTempInfo", inDto);
			JSONObject jsonResult = JSONObject.parseObject(result.getResult());
			json.put("success", true);
			json.put("errMsg", "交易执行成功");
			json.put("data", jsonResult);
			req.setCharacterEncoding("UTF-8");
			rsp.setCharacterEncoding("UTF-8");
			rsp.getWriter().print(json.toJSONString());
			rsp.getWriter().flush();
			rsp.getWriter().close();

			logger.info("[调用结束] " + "method:saveSignTempInfo " + "==>result:" + json.toJSONString());

		} catch (Exception e) {
			logger.error("Panda远程调用saveSignTempInfo接口失败！,", e);
			JSONObject jsonObject = new JSONObject();
			JSONObject data = new JSONObject();
			data.put("success", false);
			data.put("message", e.getMessage());
			jsonObject.put("data", data);
			jsonObject.put("errMsg", "保存签约信息出错！请联系管理员");
			jsonObject.put("success", false);
			writeRespToPage(jsonObject, req, rsp);
		}
	}

	//	/**
	//	 * 发送短信验证码
	//	 * 
	//	 * @param inDto
	//	 * @param req
	//	 * @param rsp
	//	 * @throws Exception
	//	 */
	//	@RequestMapping(params = "method=sendSmsVerifyCode")
	//	public void sendSmsVerifyCode(SignTempInfoDto inDto,
	//			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
	//
	//		logger.info("[调用开始] " + "method:sendSmsVerifyCode " + "==>Parameters:"
	//				+ JSONObject.toJSONString(inDto));
	//
	//		JSONObject json = new JSONObject();
	//		Result result = null;
	//		try {
	//			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,
	//					"sendSmsVerifyCode", inDto);
	//			String str = result.getResult();
	//			if ("true".equals(str)) {
	//				json.put("success", true);
	//				json.put("message", "发送短信成功！");
	//			} else if ("false".equals(str)) {
	//				json.put("success", false);
	//				json.put("message", "发送短信失败！请重试...");
	//			}
	//
	//			req.setCharacterEncoding("UTF-8");
	//			rsp.setCharacterEncoding("UTF-8");
	//			rsp.getWriter().print(json.toJSONString());
	//			rsp.getWriter().flush();
	//			rsp.getWriter().close();
	//
	//			logger.info("[调用结束] " + "method:sendSmsVerifyCode " + "==>result:"
	//					+ str);
	//
	//		} catch (Exception e) {
	//			System.out.println(e.getMessage());
	//			logger.error("Panda远程调用sendSmsVerifyCode接口失败！,", e);
	//			JSONObject jsonObject = new JSONObject();
	//			jsonObject.put("message", "发送短信出错！请联系管理员");
	//			jsonObject.put("success", false);
	//			writeRespToPage(jsonObject, req, rsp);
	//		}
	//	}

	/**
	 * 更新用户签约信息
	 * 
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=updateSignTempFilesInfo")
	public void updateSignTempFilesInfo(SignTempInfoDto inDto, HttpServletRequest req, HttpServletResponse rsp)
			throws Exception {

		logger.info("[调用开始] " + "method:updateSignTempFilesInfo " + "==>Parameters:" + JSONObject.toJSONString(inDto));

		JSONObject json = new JSONObject();
		Result result = null;
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "updateSignTempFilesInfo", inDto);
			JSONObject jsonResult = JSONObject.parseObject(result.getResult());
			json.put("success", true);
			json.put("errMsg", "交易执行成功");
			json.put("data", jsonResult);
			req.setCharacterEncoding("UTF-8");
			rsp.setCharacterEncoding("UTF-8");
			rsp.getWriter().print(json.toJSONString());
			rsp.getWriter().flush();
			rsp.getWriter().close();

			logger.info("[调用结束] " + "method:updateSignTempFilesInfo " + "==>result:" + json.toJSONString());

		} catch (Exception e) {
			logger.error("Panda远程调用updateSignTempFilesInfo接口失败！,", e);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("errMsg", "更新用户签约信息出错！请联系管理员");
			jsonObject.put("success", false);
			writeRespToPage(jsonObject, req, rsp);
		}
	}

	/**
	 * 更新流程id号
	 * 
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=updateTaskinstanceId")
	public void updateTaskinstanceId(SignTempInfoDto inDto, HttpServletRequest req, HttpServletResponse rsp)
			throws Exception {

		logger.info("[调用开始] " + "method:updateTaskinstanceId " + "==>Parameters:" + JSONObject.toJSONString(inDto));

		JSONObject json = new JSONObject();
		Result result = null;
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "updateTaskinstanceId", inDto);
			String str = result.getResult();
			if (!"".equals(str)) {
				json.put("success", true);
				json.put("message", "保存成功！");
			} else {
				json.put("success", true);
				json.put("message", "保存失败！请重试...");
			}

			req.setCharacterEncoding("UTF-8");
			rsp.setCharacterEncoding("UTF-8");
			rsp.getWriter().print(json.toJSONString());
			rsp.getWriter().flush();
			rsp.getWriter().close();

			logger.info("[调用结束] " + "method:updateTaskinstanceId " + "==>result:" + str);

		} catch (Exception e) {
			logger.error("Panda远程调用updateTaskinstanceId接口失败！,", e);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("message", "更新流程id号出错！请联系管理员");
			jsonObject.put("success", false);
			writeRespToPage(jsonObject, req, rsp);
		}
	}

	/**
	 * 根据投资人，查询签约渠道
	 * 
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=qryChannelByInvestorId")
	public void qryChannelByInvestorId(HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		PubUserinfo userInfo = getUserDto(req);
		String insttuId = userInfo.getId().getInsttuId();//机构ID
		logger.info("[调用开始] " + "method:qryChannelByInvestorId " + "==>Parameters:" + insttuId);
		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			//result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "qryChannelByInvestorId", dto);
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,
					"queryChannelByOrgNoAndType",
					insttuId,
					TabsConstant.CHANNEL_TYPE_WITHHOLD.val());
			String str = result.getResult();

			req.setCharacterEncoding("UTF-8");
			rsp.setCharacterEncoding("UTF-8");
			rsp.getWriter().print(str);
			rsp.getWriter().flush();
			rsp.getWriter().close();

			logger.info("[调用结束] " + "method:qryChannelByInvestorId " + "==>result:" + str);

		} catch (Exception e) {
			logger.error("Panda远程调用qryChannelByInvestorId接口失败！,", e);
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject, req, rsp);
		}
	}

	/**
	 * 根据业务类型查询渠道
	 * 
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=queryChannelByBusinessType")
	public void queryChannelByBusinessType(HttpServletRequest req, HttpServletResponse rsp, String businessType)
			throws Exception {
		logger.info("[调用开始] " + "method:queryChannelByBusinessType " + "==>Parameters:" + businessType);
		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "queryChannelByBusinessType", businessType);
			String str = result.getResult();

			req.setCharacterEncoding("UTF-8");
			rsp.setCharacterEncoding("UTF-8");
			rsp.getWriter().print(str);
			rsp.getWriter().flush();
			rsp.getWriter().close();

			logger.info("[调用结束] " + "method:queryChannelByBusinessType " + "==>result:" + str);

		} catch (Exception e) {
			logger.error("Panda远程调用queryChannelByBusinessType接口失败！,", e);
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject, req, rsp);
		}
	}

	/**
	 * 卡Bin查询
	 * 
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=cardInfoQuery")
	public void cardInfoQuery(CardInfoDto dto, HttpServletRequest req, HttpServletResponse rsp) throws Exception {

		logger.info("[调用开始] " + "method:cardInfoQuery " + "==>Parameters:" + JSONObject.toJSONString(dto));

		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "cardInfoQuery", dto);
			// 返回 CardBinQueryResBO
			String str = result.getResult();

			req.setCharacterEncoding("UTF-8");
			rsp.setCharacterEncoding("UTF-8");
			rsp.getWriter().print(str);
			rsp.getWriter().flush();
			rsp.getWriter().close();

			logger.info("[调用结束] " + "method:cardInfoQuery " + "==>result:" + str);

		} catch (Exception e) {
			logger.error("Panda远程调用cardInfoQuery接口失败！,", e);
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject, req, rsp);
		}
	}

	/**
	 * 图片上传
	 */
	@RequestMapping(params = "method=uploadPicture")
	public String uploadPicture(ModelMap modelMap, @RequestParam MultipartFile file, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		InputStream stream = file.getInputStream();
		String contentType = file.getContentType();
		long length = file.getSize();
		String fileName = file.getName();
		String filePath = WeedfsUtil.weedProcess(stream, contentType, fileName, length);
		String fileSize = String.valueOf(length);
		String json = "{\"success\":\"true\"," + "\"filePath\":\"" + filePath + "\"," + "\"fileSize\":\"" + fileSize
				+ "\"," + "\"dataURI\":\"" + filePath + "\"," + "\"fileName\":\"" + fileName + "\"}";
		// 响应输出
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(json);
		response.getWriter().flush();
		response.getWriter().close();
		return null;
	}

	/**
	 * 查询所有下拉参数配置
	 * 
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=findAllMenuByCode")
	public void findAllMenuByCode(MenuDto dto, HttpServletRequest req, HttpServletResponse rsp) throws Exception {

		logger.info("[调用开始] " + "method:findAllMenuByCode " + "==>Parameters:" + JSONObject.toJSONString(dto));

		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			// 设置分页一页显示条数
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "findAllMenuByCode", dto);
			String str = result.getResult();
			JSONArray jsonArray = JSONArray.parseArray(str);
			jsonObject.put("root", jsonArray);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", true);
			writeRespToPage(jsonObject, req, rsp);

			logger.info("[调用结束] " + "method:findAllMenuByCode " + "==>result:" + str);

		} catch (Exception e) {
			logger.error("Panda远程调用findAllMenuByCode接口失败！,", e);
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject, req, rsp);
		}
	}
}
