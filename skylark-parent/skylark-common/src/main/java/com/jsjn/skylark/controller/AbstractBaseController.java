package com.jsjn.skylark.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Method;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;
import net.sf.json.util.PropertyFilter;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.jsjn.skylark.bean.BaseDto;
import com.jsjn.skylark.common.Constant;
import com.jsjn.skylark.session.SessionContext;
import com.jsjn.skylark.session.UserInfo;

public abstract class AbstractBaseController {

	/**
	 * LOG4J
	 */
	private static final Logger LOGERUTIL = Logger
			.getLogger(AbstractBaseController.class);

	protected static final String ENCODING = System
			.getProperty("file.encoding");

	public AbstractBaseController() {
	}

	/**
	 * 获取登录用户信息
	 * 
	 * @param req
	 *            HttpServletRequest
	 * @return UserInfo
	 */
	public UserInfo getUserDto(HttpServletRequest req) {
		// 获取session用户信息
		UserInfo userInfo = (UserInfo) req.getSession().getAttribute(
				SessionContext.USER_INFO);

		return userInfo;
	}

	/**
	 * 初始化DTO
	 * 
	 * @param dto
	 *            dto
	 * @param req
	 *            HttpServletRequest
	 * @throws Exception
	 *             Exception
	 */
	public void initDto(BaseDto<?> dto, HttpServletRequest req)
			throws Exception {
		// 获取用户信息
		if (dto == null) {
			throw new Exception("当前没有记录传入！");
		}
		UserInfo userDto = getUserDto(req);
		if (userDto == null) {
			throw new Exception("当前没有登录用户或用户session已过期！");
		}
		dto.set_transCode(req.getParameter("_transCode"));
		if (StringUtils.isNotBlank(req.getParameter("start"))) {
			dto.set_pageStart(Long.parseLong(req.getParameter("start")));
		}
		if (StringUtils.isNotBlank(req.getParameter("jsonData"))) {
			dto.setJsonData(req.getParameter("jsonData"));
		}
		if (StringUtils.isNotBlank(req.getParameter("isUseCurOrgNo"))) {
			dto.setIsUseCurOrgNo(Boolean.valueOf(req
					.getParameter("isUseCurOrgNo")));
		}
		// 判断是否使用当前机构码条件
		if (dto.getIsUseCurOrgNo()) {
			dto.setOrgNo(userDto.getInsttuId());
		}
		dto.set_insttuId(userDto.getInsttuId());
		dto.set_userId(userDto.getUserId());
		dto.setOrgType(userDto.getInsttuTy());
		if (StringUtils.isNotBlank(req.getParameter("pageLimit"))) {
			dto.set_pageLimit(Long.valueOf(req.getParameter("pageLimit")));
		} else {
			dto.set_pageLimit(Constant.PAGE_SIZE);
		}
		dto.set_accDate(userDto.getJyrq());

	}

	/**
	 * 封装查询结果集json字符串
	 * 
	 * @param dto
	 *            BaseDTO
	 * @param sqlListName
	 *            sqlListName
	 * @return JSONObject
	 */
	public JSONObject jsonQueryForMulti(BaseDto<?> dto, String sqlListName) {
		if (dto == null) {
			return null;
		}
		// 处理结果标记
		boolean flag = false;
		if (dto.get_rspCode() != null
				&& (Constant.RESPONSE_OK.equalsIgnoreCase(dto.get_rspCode()) || Constant.RESPONSE_NO_DATA_FOUND
						.equalsIgnoreCase(dto.get_rspCode()))) {
			flag = true;
		}
		JSONArray ja = null;
		ArrayList<?> list = new ArrayList<Object>();
		if (!(StringUtils.isBlank(sqlListName) || "recList".equals(sqlListName))) {
			String firstLetter = sqlListName.substring(0, 1).toUpperCase();
			String getMethodName = "get" + firstLetter
					+ sqlListName.substring(1);
			Method mh = ReflectionUtils.findMethod(dto.getClass(),
					getMethodName, new Class[] {});
			list = (ArrayList<?>) ReflectionUtils.invokeMethod(mh, dto,
					new Object[] {});
		} else {
			list = dto.getRecList();
		}

		if (list != null && list.size() > 0) {
			// 声明JsonConfig配置文件对象
			JsonConfig jsonConfig = new JsonConfig();
			// 设置循环检测策略
			jsonConfig
					.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
			jsonConfig.setJsonPropertyFilter(new PropertyFilter() {
				// 重写内部的允许字段通过的方法
				public boolean apply(Object source, String name, Object value) {
					// 排除的字段名字（属性名）
					if (name.equals("_SQL_CODE") || name.equals("_areaId")
							|| name.equals("_fileName")
							|| name.equals("_insttuId")
							|| name.equals("_isUnLoad")
							|| name.equals("_accDate") || name.equals("_id")
							|| name.equals("_rspCode")
							|| name.equals("_rspMsg")
							|| name.equals("_sqlListName")
							|| name.equals("_sqlTxt")
							|| name.equals("_transCode")
							|| name.equals("_userId") || name.equals("_uuid")
							|| name.equals("modId") || name.equals("recList")
							|| name.equals("userId")) {
						return true;
					} else {
						return false;
					}
				}
			});
			ja = JSONArray.fromObject(list, jsonConfig);
		} else {
			ja = new JSONArray();
		}
		JSONObject json = new JSONObject();
		json.put("success", flag); // 处理结果标记
		json.put("rspMsg", dto.get_rspMsg()); // 响应信息
		json.put("errMsg", dto.get_rspMsg()); // 响应信息
		json.put("total", dto.get_total()); // 总记录数
		json.put("root", ja); // 结果集

		return json;
	}

	/**
	 * 封装查询单个对象json字符串
	 * 
	 * @param dto
	 *            BaseDTO
	 * @return JSONObject
	 */
	public JSONObject jsonQueryForSingle(BaseDto<?> dto) {
		if (dto == null) {
			return null;
		}
		// 处理结果标记
		boolean flag = false;
		if (StringUtils.isNotBlank(dto.get_rspCode())) {
			if (Constant.RESPONSE_OK.equalsIgnoreCase(dto.get_rspCode())) {
				flag = true;
			} else if (Constant.RESPONSE_NO_DATA_FOUND.equalsIgnoreCase(dto
					.get_rspCode())) {
				flag = true;
			}
		}
		// 声明JsonConfig配置文件对象
		JsonConfig jsonConfig = new JsonConfig();
		// 设置循环检测策略
		jsonConfig
				.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
		jsonConfig.setJsonPropertyFilter(new PropertyFilter() {
			// 重写内部的允许字段通过的方法
			public boolean apply(Object source, String name, Object value) {
				// 排除的字段名字（属性名）
				if (name.equals("_SQL_CODE") || name.equals("_areaId")
						|| name.equals("_fileName")
						|| name.equals("_insttuId")
						|| name.equals("_isUnLoad")
						|| name.equals("_accDate") || name.equals("_id")
						|| name.equals("_rspCode")
						|| name.equals("_rspMsg")
						|| name.equals("_sqlListName")
						|| name.equals("_sqlTxt")
						|| name.equals("_transCode")
						|| name.equals("_userId") || name.equals("_uuid")
						|| name.equals("modId") || name.equals("recList")
						|| name.equals("userId")) {
					return true;
				} else {
					return false;
				}
			}
		});
		JSONObject json = new JSONObject();
		json.put("success", flag); // 处理结果标记
		json.put("rspMsg", dto.get_rspMsg()); // 响应信息
		json.put("errMsg", dto.get_rspMsg()); // 响应信息
		json.put("data", JSONObject.fromObject(dto,jsonConfig)); // 响应对象

		return json;
	}

	/**
	 * 封装数据更新json字符串
	 * 
	 * @param dto
	 *            BaseDTO
	 * @return JSONObject
	 */
	public JSONObject jsonUpdateData(BaseDto<?> dto) {
		if (dto == null) {
			return null;
		}
		// 处理结果标记
		boolean flag = false;
		if (dto.get_rspCode() != null
				&& Constant.RESPONSE_OK.equalsIgnoreCase(dto.get_rspCode())) {
			flag = true;
		}
		JSONObject json = new JSONObject();
		json.put("success", flag); // 处理结果标记
		json.put("rspMsg", dto.get_rspMsg()); // 响应信息
		json.put("errMsg", dto.get_rspMsg()); // 响应信息
		json.put("data", JSONObject.fromObject(dto)); // 响应对象

		return json;
	}

	/**
	 * 响应输出到页面
	 * 
	 * @param json
	 *            页面响应json对象
	 * @param req
	 *            请求对象
	 * @param resp
	 *            响应对象
	 * @return String
	 * @throws Exception
	 *             Exception
	 */
	public String writeRespToPage(JSONObject json, HttpServletRequest req,
			HttpServletResponse resp) throws Exception {
		// 将json字符串响应到前台
		try {
			req.setCharacterEncoding("UTF-8");
			resp.setContentType("application/json; charset=UTF-8");
			resp.setCharacterEncoding("UTF-8");
			resp.getWriter().print(json);
			resp.getWriter().flush();
			resp.getWriter().close();
		} catch (UnsupportedEncodingException e) {
			LOGERUTIL.error(e.getMessage());
			throw e;
		} catch (IOException e) {
			LOGERUTIL.error(e.getMessage());
			throw e;
		}
		return null;
	}

	/**
	 * 返回上传标志
	 * 
	 * @param dto
	 *            dto
	 * @param req
	 *            req
	 * @param resp
	 *            resp
	 * @throws Exception
	 *             Exception
	 */
	public void writeUploadRespToPage(BaseDto<?> dto, HttpServletRequest req,
			HttpServletResponse resp) throws Exception {
		if (dto == null) {
			return;
		}
		// 处理结果标记
		boolean flag = false;
		if (dto.get_rspCode() != null
				&& Constant.RESPONSE_OK.equalsIgnoreCase(dto.get_rspCode())) {
			flag = true;
		}
		try {
			req.setCharacterEncoding("UTF-8");
			resp.setCharacterEncoding("UTF-8");
			resp.getWriter().println(
					"{success:" + flag + ",mess:'" + dto.get_rspMsg()
							+ "',data:" + JSONObject.fromObject(dto) + "}");
			resp.getWriter().flush();
			resp.getWriter().close();
		} catch (UnsupportedEncodingException e) {
			LOGERUTIL.error(e.getMessage());
			throw e;
		} catch (IOException e) {
			LOGERUTIL.error(e.getMessage());
			throw e;
		}
	}
}
