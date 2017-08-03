package com.jsjn.jnf.admin.fee;

import java.io.PrintWriter;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.bo.fee.XmlFlowDataBO;
import com.jsjn.jnf.bean.dto.member.FeeStatisticDataBO;
import com.jsjn.jnf.bean.dto.member.FeeRealNameDto;
import com.jsjn.jnf.bean.dto.member.FeeWithholdDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.panda.client.Result;

@Controller
@RequestMapping("/jnf/FeeAction.do")
public class FeeAction {
	private final static Logger logger = Logger.getLogger(FeeAction.class);

	@RequestMapping(params = "method=getFeeList")
	public String getFeeList(final HttpServletRequest req,
			final HttpServletResponse resp, XmlFlowDataBO dto) throws Exception {

		logger.info("[调用开始] " + "method:expertFeeXml " + "==>Parameters:"
				+ JSONObject.toJSONString(dto));

		req.setCharacterEncoding("UTF-8");

		String mname = new String(req.getParameter("mname").getBytes(
				"ISO8859-1"), "UTF-8");// 客户名称
		String custName = new String(req.getParameter("custName").getBytes(
				"ISO8859-1"), "UTF-8");// 机构名称
		String reqTimeMin = req.getParameter("reqTimeMin");// 调用时间起
		String reqTimeMax = req.getParameter("reqTimeMax");// 调用时间止
		String state = req.getParameter("state");// 调用接口状态
		String bflag = req.getParameter("bflag");// 业务返回状态

		dto.setMname(mname);
		dto.setCustName(custName);
		dto.setBeginTime(reqTimeMin);
		dto.setOverTime(reqTimeMax);
		dto.setState(state);
		dto.setBflag(bflag);
		JSONArray jsonArray = null;
		try {

			Result result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,
					"qryXmlFlow", dto);
			String str = result.getResult();
			jsonArray = JSONArray.fromObject(str);

			logger.info("[调用结束] " + "method:expertFeeXml " + "==>result:" + str);

		} catch (Exception e) {
			throw e;
		}
		if (null != jsonArray) {

			final Map<String, String> maps = new LinkedHashMap<String, String>();
			maps.put("id", "序号");
			maps.put("mname", "商户名称");
			maps.put("custName", "机构名称");
			maps.put("method", "调用方法");
			maps.put("state", "接口状态");
			maps.put("exception", "接口失败原因");
			maps.put("bflag", "业务状态");
			maps.put("reason", "业务失败原因");
			maps.put("fee", "单价");
			maps.put("resTime", "调用时间");

			final List<XmlFlowDataBO> demo = (List<XmlFlowDataBO>) JSONArray
					.toCollection(jsonArray, XmlFlowDataBO.class);

		} else {
			resp.setCharacterEncoding("UTF-8");
			resp.setHeader("content-type", "text/html;charset=UTF-8");
			PrintWriter out = resp.getWriter();
			out.println("<script language=\"javascript\">");
			out.println("alert('没有数据可以进行导出！');");
			out.println("</script>");
			out.flush();
		}
		return null;
	};

	@RequestMapping(params = "method=getFeeConfigList")
	public String getFeeConfigList(HttpServletRequest req,
			HttpServletResponse resp, FeeStatisticDataBO dto) throws Exception {

		logger.info("[调用开始] " + "method:queryFeeStatisticList"
				+ "==>Parameters:" + JSONObject.toJSONString(dto));

		JSONArray ja = null;
		JSONObject json = new JSONObject();

		Result result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,
				"queryFeeConfigList", dto);
		String str = result.getResult();
		logger.info("[调用结束] " + "method:queryFeeStatisticList" + "==>result:"
				+ str);

		ja = JSONArray.fromObject(str);
		json.put("success", true);
		json.put("errMsg", "交易执行成功！");
		json.put("total", ja.size());
		json.put("root", ja);
		req.setCharacterEncoding("UTF-8");
		resp.setCharacterEncoding("UTF-8");
		resp.getWriter().write(json.toString());
		resp.getWriter().flush();
		resp.getWriter().close();

		return null;
	};

	@RequestMapping(params = "method=getFeeStatisticList")
	public String getFeeStatisticList(HttpServletRequest req,
			HttpServletResponse resp, FeeStatisticDataBO dto) throws Exception {

		logger.info("[调用开始] " + "method:queryFeeStatisticList"
				+ "==>Parameters:" + JSONObject.toJSONString(dto));

		JSONArray ja = null;
		JSONObject json = new JSONObject();

		Result result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,
				"queryFeeStatisticList", dto);
		String str = result.getResult();
		logger.info("[调用结束] " + "method:queryFeeStatisticList" + "==>result:"
				+ str);

		ja = JSONArray.fromObject(str);
		json.put("success", true);
		json.put("errMsg", "交易执行成功！");
		json.put("total", ja.size());
		json.put("root", ja);
		req.setCharacterEncoding("UTF-8");
		resp.setCharacterEncoding("UTF-8");
		resp.getWriter().write(json.toString());
		resp.getWriter().flush();
		resp.getWriter().close();

		return null;
	};

	@RequestMapping(params = "method=getFeeRealnameDetail")
	public String getFeeRealnameDetail(HttpServletRequest req,
			HttpServletResponse resp, FeeRealNameDto dto) throws Exception {

		logger.info("[调用开始] " + "method:getFeeRealnameDetail"
				+ "==>Parameters:" + JSONObject.toJSONString(dto));

		JSONArray ja = null;
		JSONObject json = new JSONObject();

		Result result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,
				"queryFeeRealnameDetail", dto);
		String str = result.getResult();
		logger.info("[调用结束] " + "method:getFeeRealnameDetail" + "==>result:"
				+ str);

		ja = JSONArray.fromObject(str);
		json.put("success", true);
		json.put("errMsg", "交易执行成功！");
		json.put("total", ja.size());
		json.put("root", ja);
		req.setCharacterEncoding("UTF-8");
		resp.setCharacterEncoding("UTF-8");
		resp.getWriter().write(json.toString());
		resp.getWriter().flush();
		resp.getWriter().close();
		return null;
	};

	@RequestMapping(params = "method=getWithholdDetail")
	public String getWithholdDetail(HttpServletRequest req,
			HttpServletResponse resp, FeeWithholdDto dto) throws Exception {

		logger.info("[调用开始] " + "method:getWithholdDetail" + "==>Parameters:"
				+ JSONObject.toJSONString(dto));

		JSONArray ja = null;
		JSONObject json = new JSONObject();

		Result result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,
				"queryFeeWithholdDetail", dto);
		String str = result.getResult();
		logger.info("[调用结束] " + "method:getWithholdDetail" + "==>result:" + str);

		ja = JSONArray.fromObject(str);
		json.put("success", true);
		json.put("errMsg", "交易执行成功！");
		json.put("total", ja.size());
		json.put("root", ja);
		req.setCharacterEncoding("UTF-8");
		resp.setCharacterEncoding("UTF-8");
		resp.getWriter().write(json.toString());
		resp.getWriter().flush();
		resp.getWriter().close();

		return null;
	};

}
