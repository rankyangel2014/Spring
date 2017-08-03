package com.jsjn.jnf.admin.fee;

import java.io.PrintWriter;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.FutureTask;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.admin.util.ExcelUtils;
import com.jsjn.jnf.bean.bo.fee.AccountDetailDataBO;
import com.jsjn.jnf.bean.bo.fee.TotalFeeDataBo;
import com.jsjn.jnf.bean.bo.fee.XmlFlowDataBO;
import com.jsjn.jnf.bean.dto.member.FeeRealNameDto;
import com.jsjn.jnf.bean.dto.member.FeeStatisticDataBO;
import com.jsjn.jnf.bean.dto.member.FeeWithholdDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.panda.client.Result;

@Controller
@RequestMapping("/jnf/FeeComInfoAction.do")
public class FeeComInfoAction {
	private final static ExecutorService service = Executors
			.newFixedThreadPool(10);
	private final static Logger logger = Logger
			.getLogger(FeeComInfoAction.class);

	@RequestMapping(params = "method=expertFeeXml")
	public String expertFeeXml(final HttpServletRequest req,
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
			for (int i = 0; i < demo.size(); i++) {
				demo.get(i).setId((i + 1) + "");
				if ("0".equals(demo.get(i).getState())) {
					demo.get(i).setState("成功");
				}
				if ("1".equals(demo.get(i).getState())) {
					demo.get(i).setState("失败");
				}
				if ("0".equals(demo.get(i).getBflag())) {
					demo.get(i).setBflag("成功");
				}
				if ("1".equals(demo.get(i).getBflag())) {
					demo.get(i).setBflag("失败");
				}
			}
			FutureTask<Boolean> ft1 = new FutureTask<Boolean>(
					new Callable<Boolean>() {

						@Override
						public Boolean call() throws Exception {
							return ExcelUtils.excelExport(req, resp, maps,
									demo, "计费清单.xlsx");
						}
					});
			service.submit(ft1);
			if (ft1.get()) {

				logger.info("导入Excel成功");
			} else {

				logger.info("导入Excel失败");
			}

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

	@RequestMapping(params = "method=qryTotalFee")
	public String qryTotalFee(HttpServletRequest req, HttpServletResponse resp,
			TotalFeeDataBo dto) throws Exception {

		logger.info("[调用开始] " + "method:qryTotalFee " + "==>Parameters:"
				+ JSONObject.toJSONString(dto));

		String mname = new String(req.getParameter("mname").getBytes(
				"ISO8859-1"), "UTF-8");// 客户名称
		String feeType = new String(req.getParameter("feeType").getBytes(
				"ISO8859-1"), "UTF-8");// 收费项目
		String startTime = req.getParameter("startTime");// 开始时间
		String endTime = req.getParameter("endTime");// 结束时间
		String insttuName = new String(req.getParameter("insttuName").getBytes(
				"ISO8859-1"), "UTF-8");// 机构名称

		dto.setMname(mname);
		dto.setFeeType(feeType);
		dto.setStartTime(startTime);
		dto.setEndTime(endTime);
		dto.setInsttuName(insttuName);
		JSONArray jsonArray = null;
		try {

			Result result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,
					"qryTotalFee", dto);
			String str = result.getResult();
			jsonArray = JSONArray.fromObject(str);

			logger.info("[调用结束] " + "method:qryTotalFee " + "==>result:" + str);

		} catch (Exception e) {
			throw e;
		}
		if (null != jsonArray) {

			Map<String, String> maps = new LinkedHashMap<String, String>();
			maps.put("mname", "商户名称");
			maps.put("feeType", "收费项目");
			maps.put("startTime", "开始时间");
			maps.put("endTime", "结束时间");
			maps.put("insttuName", "机构名称");
			maps.put("price", "单价（元）");
			maps.put("count", "笔数");
			maps.put("totalMoney", "合计金额");

			List<TotalFeeDataBo> demo = (List<TotalFeeDataBo>) JSONArray
					.toCollection(jsonArray, TotalFeeDataBo.class);
			for (TotalFeeDataBo tfd : demo) {
				tfd.setStartTime(startTime);
				tfd.setEndTime(endTime);
			}
			ExcelUtils.excelExport(req, resp, maps, demo, "计费汇总.xlsx");

			logger.info("导入Excel成功");

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

	@RequestMapping(params = "method=queryAccount")
	@ResponseBody
	public String queryAccount(HttpServletRequest req,
			HttpServletResponse resp, AccountDetailDataBO dto) throws Exception {

		logger.info("[调用开始] " + "method:queryAccount " + "==>Parameters:"
				+ JSONObject.toJSONString(dto));

		String mid = req.getParameter("mid");// 客户号
		String orgNo = req.getParameter("orgNo");// 机构号
		String startTime = req.getParameter("startTime");// 开始时间
		String endTime = req.getParameter("endTime");// 结束时间

		dto.setMid(mid);
		dto.setOrgNo(orgNo);
		dto.setCreated(startTime);
		dto.setModified(endTime);
		JSONArray jsonArray = null;
		try {

			Result result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,
					"queryAccount", dto);
			String str = result.getResult();
			jsonArray = JSONArray.fromObject(str);

			logger.info("[调用结束] " + "method:queryAccount " + "==>result:" + str);

		} catch (Exception e) {
			throw e;
		}
		if (null != jsonArray) {

			Map<String, String> maps = new LinkedHashMap<String, String>();
			maps.put("custName", "姓名");
			maps.put("idNo", "身份证");
			maps.put("mobile", "手机号码");
			maps.put("resCode", "返回结果");
			maps.put("exception", "返回结果说明");
			maps.put("modified", "请求日期");
			maps.put("fee", "单价（元）");

			List<AccountDetailDataBO> demo = (List<AccountDetailDataBO>) JSONArray
					.toCollection(jsonArray, AccountDetailDataBO.class);

			ExcelUtils.excelExport(req, resp, maps, demo, "对账信息.xlsx");

			logger.info("导入Excel成功");

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

	@RequestMapping(params = "method=expertFeeWithhold")
	public String expertFeeWithhold(HttpServletRequest req,
			HttpServletResponse resp, FeeWithholdDto dto) throws Exception {

		logger.info(Thread.currentThread().getName() + "[调用开始] "
				+ "method:expertFeeWithhold" + "==>Parameters:"
				+ JSONObject.toJSONString(dto));
		String fileName = new String(req.getParameter("fileName").getBytes(
				"ISO8859-1"), "UTF-8");
		JSONArray jsonArray = null;
		try {
			Result result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,
					"queryFeeWithholdDetail", dto);
			String str = result.getResult();
			jsonArray = JSONArray.fromObject(str);
		} catch (Exception e) {
			throw e;
		}
		if (null != jsonArray && jsonArray.size()>0) {

			Map<String, String> maps = new LinkedHashMap<String, String>();

			maps.put("id", "序号");
			maps.put("tradeNo", "业务流水号");
			maps.put("payAccount", "付款账号");
			maps.put("payer", "付款人");
			maps.put("collAccount", "收款账号");
			maps.put("payee", "收款人");
			maps.put("channel", "支付渠道");
			maps.put("status", "状态");
			maps.put("failReason", "备注");
			maps.put("tradeTime", "交易时间");
			maps.put("fee", "费用（元）");
			maps.put("amount", "扣款金额（元）");

			List<FeeWithholdDto> resultList = (List<FeeWithholdDto>) JSONArray
					.toCollection(jsonArray, FeeWithholdDto.class);
			for (int i = 0; i < resultList.size(); i++) {
				FeeWithholdDto obj = resultList.get(i);
				obj.setId((i + 1) + "");
			}
			ExcelUtils.excelExport(req, resp, maps, resultList,
					fileName.concat("." + ExcelUtils.FILE_EXTENSION_XLS));
		} else {
			req.setCharacterEncoding("UTF-8");
			resp.setCharacterEncoding("UTF-8");
			resp.setHeader("content-type", "text/html;charset=UTF-8");
			PrintWriter out = resp.getWriter();
			out.println("<script language=\"javascript\">");
			out.println("alert('没有数据可以进行导出！');");
			out.println("</script>");
			out.flush();
		}
		return null;
	}

	@RequestMapping(params = "method=expertFeeStatistic")
	public String expertFeeStatistic(HttpServletRequest req,
			HttpServletResponse resp, FeeStatisticDataBO dto) throws Exception {

		logger.info(Thread.currentThread().getName() + "[调用开始] "
				+ "expertFeeStatistic " + "==>Parameters:"
				+ JSONObject.toJSONString(dto));

		JSONArray jsonArray = null;
		String fileName = new String(req.getParameter("fileName").getBytes(
				"ISO8859-1"), "UTF-8");
		try {
			Result result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,
					"queryFeeStatisticList", dto);
			String str = result.getResult();
			jsonArray = JSONArray.fromObject(str);
		} catch (Exception e) {
			throw e;
		}
		if (null != jsonArray && jsonArray.size()>0) {

			Map<String, String> maps = new LinkedHashMap<String, String>();

			maps.put("id", "序号");
			maps.put("mname", "商户名称");
			maps.put("insttuName", "机构名称");
			maps.put("businessType", "业务类型");
			maps.put("channel", "渠道");
			maps.put("startTime", "开始时间");
			maps.put("endTime", "结束时间");
			maps.put("price", "单价（元）");
			maps.put("count", "笔数");
			maps.put("totalMoney", "小计（元）");
			List<FeeStatisticDataBO> resultList = (List<FeeStatisticDataBO>) JSONArray
					.toCollection(jsonArray, FeeStatisticDataBO.class);
			for (int i = 0; i < resultList.size(); i++) {
				FeeStatisticDataBO obj = resultList.get(i);
				obj.setId((i + 1) + "");
			}
			ExcelUtils.excelExport(req, resp, maps, resultList,
					fileName.concat("." + ExcelUtils.FILE_EXTENSION_XLS));
		} else {
			req.setCharacterEncoding("UTF-8");
			resp.setCharacterEncoding("UTF-8");
			resp.setHeader("content-type", "text/html;charset=UTF-8");
			PrintWriter out = resp.getWriter();
			out.println("<script language=\"javascript\">");
			out.println("alert('没有数据可以进行导出！');");
			out.println("</script>");
			out.flush();
		}
		return null;
	}

	@RequestMapping(params = "method=expertFeeRealName")
	public String expertFeeRealName(HttpServletRequest req,
			HttpServletResponse resp, FeeRealNameDto dto) throws Exception {

		logger.info(Thread.currentThread().getName() + "[调用开始] "
				+ "method:expertFeeRealName" + "==>Parameters:"
				+ JSONObject.toJSONString(dto));
		String fileName = new String(req.getParameter("fileName").getBytes(
				"ISO8859-1"), "UTF-8");
		JSONArray jsonArray = null;
		try {
			Result result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,
					"queryFeeRealnameDetail", dto);
			String str = result.getResult();
			jsonArray = JSONArray.fromObject(str);
		} catch (Exception e) {
			throw e;
		}
		if (null != jsonArray && jsonArray.size()>0) {

			Map<String, String> maps = new LinkedHashMap<String, String>();

			maps.put("id", "序号");
			maps.put("custName", "用户名称");
			maps.put("idNo", "身份证号码");
			maps.put("bankCardNo", "银行卡号");
			maps.put("mobile", "手机号码");
			maps.put("bankName", "开户行名称");
			maps.put("modified", "交易时间");
			maps.put("fee", "费用");

			List<FeeRealNameDto> resultList = (List<FeeRealNameDto>) JSONArray
					.toCollection(jsonArray, FeeRealNameDto.class);
			for (int i = 0; i < resultList.size(); i++) {
				FeeRealNameDto obj = resultList.get(i);
				obj.setId(i + 1);
			}
			ExcelUtils.excelExport(req, resp, maps, resultList,
					fileName.concat("." + ExcelUtils.FILE_EXTENSION_XLS));
		} else {
			req.setCharacterEncoding("UTF-8");
			resp.setCharacterEncoding("UTF-8");
			resp.setHeader("content-type", "text/html;charset=UTF-8");
			PrintWriter out = resp.getWriter();
			out.println("<script language=\"javascript\">");
			out.println("alert('没有数据可以进行导出！');");
			out.println("</script>");
			out.flush();
		}
		return null;
	}
}
