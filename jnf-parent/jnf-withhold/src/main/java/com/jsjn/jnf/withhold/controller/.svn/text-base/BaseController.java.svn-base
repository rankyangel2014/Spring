package com.jsjn.jnf.withhold.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang.StringUtils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.computech.common.util.ConverUtil;
import com.jsjn.jnf.bean.dto.withhold.BaseDTO;
import com.jsjn.jnf.common.linkq.Constant;
import com.jsjn.platform.driver.linkq.LinkQHandler;
import com.jsjn.system.po.PubUserinfo;

public abstract class BaseController {

	public BaseController() {
	}

	/**
	 * 获取登录用户信息
	 * 
	 * @param req
	 * @return
	 */
	public PubUserinfo getUserDto(HttpServletRequest req) {
		// 获取session用户信息
		PubUserinfo userDto = (PubUserinfo) req.getSession().getAttribute(Constant.USER_IN_SESSION);
		return userDto;
	}

	/**
	 * 查询结果集
	 * 
	 * @param inDto
	 *            输入对象
	 * @param outDto
	 *            输出对象
	 * @param req
	 *            请求对象
	 * @return 返回处理结果json对象
	 * @throws Exception
	 */
	public JSONObject queryForMulti(BaseDTO inDto, BaseDTO outDto, HttpServletRequest req) throws Exception {
		BaseDTO retDto = new BaseDTO();// 返回对象
		JSONObject json = null;// 响应输出json串
		// 后台查询记录
		try {
			// 获取用户信息
			PubUserinfo userDto = getUserDto(req);
			if (userDto == null) {
				throw new Exception("当前没有登录用户或用户session已过期！");
			}
			// 判断是否使用当前机构码条件
			if (inDto.getIsUseCurOrgNo()) {
				inDto.setOrgNo(userDto.getId().getInsttuId());
			}
			inDto.set_insttuId(userDto.getId().getInsttuId());
			inDto.set_userId(userDto.getId().getUserId());

			// 设置分页
			/*
			 * String startStr=req.getParameter("start"); long
			 * start=StringUtils.isNotBlank(startStr) ?
			 * ConverUtil.getObjLong(startStr):1l;
			 */
			// modify by kongyj at 2013-09-09 begin
			long start = ConverUtil.getObjLong(req.getParameter("start"));
			// modify by kongyj at 2013-09-09 end
			inDto.set_areaId("3200");
			inDto.set_pageStart(start);
			if (ConverUtil.getObjLong(inDto.get_pageLimit()) <= 0) {
				if (inDto.get_pageLimit() == null || Long.valueOf(0L).equals(inDto.get_pageLimit())) {
					inDto.set_pageLimit(Constant.PAGE_SIZE);
				}
			}

			// 发后台交易
			if (outDto != null)
				retDto = LinkQHandler.getData(inDto, outDto.getClass());
			else
				retDto = LinkQHandler.getData(inDto, inDto.getClass());

		} catch (Exception e) {
			e.printStackTrace();
			retDto.set_rspMsg(e.getMessage());
		} finally {
			JSONArray ja = null;
			boolean flag = false;// 处理结果标记
			if (retDto.get_rspCode() != null && Constant.RESPONSE_OK.equalsIgnoreCase(retDto.get_rspCode())) {
				flag = true;
				String jsonStr = JSONObject.toJSONString(retDto);
				JSONObject res = JSONObject.parseObject(jsonStr);
				ja = res.getJSONArray(inDto.get_sqlListName());
			} else if (Constant.RESPONSE_NO_DATA_FOUND.equals(retDto.get_rspCode())) {// 没有查询结果
				// 判断是否需要通知前台
				if (inDto.getNoRecNotice()) {
					flag = false;
				} else {
					flag = true;
				}
			}
			// 将返回对象属性信息拷贝到输出对象
			if (outDto != null)
				PropertyUtils.copyProperties(outDto, retDto);

			// 将对象转化成json字符串
			json = new JSONObject();
			json.put("success", flag); // 处理结果标记
			json.put("errMsg", retDto.get_rspMsg()); // 响应信息
			json.put("total", retDto.get_total()); // 总记录数
			json.put("root", ja); // 结果集
		}

		return json;
	}

	/**
	 * 查询单个对象
	 * 
	 * @param inDto
	 *            输入对象
	 * @param outDto
	 *            输出对象
	 * @param req
	 *            请求对象
	 * @return 返回处理结果json对象
	 * @throws Exception
	 */
	public JSONObject queryForSingle(BaseDTO inDto, BaseDTO outDto, HttpServletRequest req) throws Exception {
		BaseDTO retDto = new BaseDTO();// 返回对象
		JSONObject json = null;// 响应输出json串
		// 后台查询记录
		try {
			// 获取用户信息
			PubUserinfo userDto = getUserDto(req);
			if (userDto == null) {
				throw new Exception("当前没有登录用户或用户session已过期！");
			}
			// 判断是否使用当前机构码条件
			if (inDto.getIsUseCurOrgNo()) {
				inDto.setOrgNo(userDto.getId().getInsttuId());
			}
			inDto.set_insttuId(userDto.getId().getInsttuId());
			inDto.set_userId(userDto.getId().getUserId());

			// 设置分页
			String startStr = req.getParameter("start");
			long start = StringUtils.isNotBlank(startStr) ? ConverUtil.getObjLong(startStr) : 1l;
			inDto.set_areaId("3200");
			inDto.set_pageStart(start);
			inDto.set_pageLimit(Constant.PAGE_SIZE);

			// 发后台交易
			if (outDto != null)
				retDto = LinkQHandler.getData(inDto, outDto.getClass());
			else
				retDto = LinkQHandler.getData(inDto, inDto.getClass());

		} catch (Exception e) {
			e.printStackTrace();
			// 封装异常信息
			// if(retDto==null)
			// retDto=new BaseDTO();
			retDto.set_rspMsg(e.getMessage());
		} finally {
			JSONArray ja = null;
			boolean flag = false;// 处理结果标记
			Object listObj = null;// 结果集对象
			Object singleObj = null;// 单个结果对象
			if (retDto.get_rspCode() != null && Constant.RESPONSE_OK.equalsIgnoreCase(retDto.get_rspCode())) {
				flag = true;
				// //获取结果集对象
				// listObj=reflection.getPrivatePropertyValue(retDto,
				// inDto.get_sqlListName());
				JSONObject res = JSONObject.parseObject(JSONObject.toJSONString(retDto));
				Object list = res.get(inDto.get_sqlListName());
				if (list != null) {
					ja = (JSONArray) list;
					if (!ja.isEmpty()) {
						singleObj = ja.get(0);
					}
				}
				// //获取单个对象
				// singleObj=listObj!=null&&((List)listObj).size()>0?((List)listObj).get(0):null;
			}
			// 将返回对象属性信息拷贝到输出对象
			if (outDto != null)
				PropertyUtils.copyProperties(outDto, retDto);

			// 将对象转化成json字符串
			json = new JSONObject();
			json.put("success", flag); // 处理结果标记
			json.put("errMsg", retDto.get_rspMsg()); // 响应信息
			json.put("rspCode", retDto.get_rspCode());// 响应代号
			json.put("data", JSONObject.toJSONString(singleObj));// 单个结果对象
		}

		return json;
	}

	/**
	 * 更新对象
	 * 
	 * @param inDto
	 *            输入对象
	 * @param outDto
	 *            输出对象
	 * @param req
	 *            请求对象
	 * @return 返回处理结果json对象
	 * @throws Exception
	 */
	public JSONObject updateData(BaseDTO inDto, BaseDTO outDto, HttpServletRequest req) throws Exception {
		BaseDTO retDto = new BaseDTO();// 返回对象
		JSONObject json = null;// 响应输出json串
		// 后台查询记录
		try {
			// 获取用户信息
			PubUserinfo userDto = getUserDto(req);
			if (userDto == null) {
				throw new Exception("当前没有登录用户或用户session已过期！");
			}
			// 判断是否使用当前机构码条件
			if (inDto.getIsUseCurOrgNo()) {
				inDto.setOrgNo(userDto.getId().getInsttuId());
			}
			inDto.set_areaId("3200");
			inDto.set_insttuId(userDto.getId().getInsttuId());
			inDto.set_userId(userDto.getId().getUserId());
			inDto.set_sqlListName("resultList");
			// inDto.set_insttuId("320000114");
			// inDto.set_userId("J3200001140001");
			// 发后台交易
			if (outDto != null)
				retDto = LinkQHandler.getData(inDto, outDto.getClass());
			else
				retDto = LinkQHandler.getData(inDto, inDto.getClass());

		} catch (Exception e) {
			e.printStackTrace();
			// 封装异常信息
			if (retDto == null)
				retDto = new BaseDTO();
			retDto.set_rspMsg(e.getMessage());
		} finally {
			// 处理结果标记
			boolean flag = false;
			if (retDto.get_rspCode() != null && Constant.RESPONSE_OK.equalsIgnoreCase(retDto.get_rspCode())) {
				flag = true;
			}
			// 将返回对象属性信息拷贝到输出对象
			if (outDto != null)
				PropertyUtils.copyProperties(outDto, retDto);

			// 将对象转化成json字符串
			json = new JSONObject();
			json.put("success", flag); // 处理结果标记
			json.put("errMsg", retDto.get_rspMsg()); // 响应信息
			json.put("data", JSONObject.toJSONString(retDto)); // 响应对象
		}

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
	 * @return
	 * @throws Exception
	 */
	public String writeRespToPage(JSONObject json, HttpServletRequest req, HttpServletResponse resp) throws Exception {
		// 将json字符串响应到前台
		try {
			req.setCharacterEncoding("UTF-8");
			resp.setCharacterEncoding("UTF-8");
			resp.getWriter().print(json);
			resp.getWriter().flush();
			resp.getWriter().close();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			throw e;
		} catch (IOException e) {
			e.printStackTrace();
			throw e;
		}

		return null;
	}

	// public void initExport(String modelId, ExportColumnDto expDto) {
	// Excel exc = PlatformContextListener.excels.get(modelId);
	// ArrayList<ColumnModel> modelColumn = exc.getColumnModel();
	// ArrayList<ExportColumnDto> custColumn = expDto.getResultList();
	// ArrayList<ColumnModel> selectedColumn = new ArrayList<ColumnModel>();
	// expDto.setExpModelName(exc.getTiltle());
	//
	// for (int i = 0; i < modelColumn.size(); i++) {
	// ColumnModel modelCol = modelColumn.get(i);
	// for (int j = 0; j < custColumn.size(); j++) {
	// ExportColumnDto custCol = custColumn.get(j);
	// if (modelCol.getName().equals(custCol.getColumnName())) {
	// if (custCol.getIsExp().equals("Y")) {
	// ColumnModel model = new ColumnModel();
	// model.setName(modelCol.getName());
	// model.setPosition(i);
	// selectedColumn.add(model);
	// }
	// break;
	// }
	//
	// }
	// }
	// exc.setSelectdColumnModel(selectedColumn);
	// }

	// public void

}
