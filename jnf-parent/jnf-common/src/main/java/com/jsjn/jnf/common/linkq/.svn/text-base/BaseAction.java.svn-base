package com.jsjn.jnf.common.linkq;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang.StringUtils;

import com.jsjn.system.po.PubUserinfo;

public abstract class BaseAction {

	public BaseAction() {
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
	public JSONObject queryForMulti(LinkQBaseDTO inDto, LinkQBaseDTO outDto, HttpServletRequest req) throws Exception {

		LinkQBaseDTO retDto = new LinkQBaseDTO();
		JSONObject json = null;// 响应输出json串
		try {
			// 获取用户信息
			PubUserinfo userDto = getUserDto(req);
			if (userDto == null) {
				throw new Exception("当前没有登录用户或用户session已过期！");
			}

			inDto.set_insttuId(userDto.getId().getInsttuId());
			inDto.set_userId(userDto.getId().getUserId());

			// 设置分页
			long start = ConverUtil.getObjLong(req.getParameter("start"));
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
			JSONArray ja = new JSONArray();
			boolean flag = false;// 处理结果标记
			if (retDto.get_rspCode() != null && Constant.RESPONSE_OK.equalsIgnoreCase(retDto.get_rspCode())) {
				flag = true;
				JSONObject res = JSONObject.fromObject(retDto);
				ja = res.getJSONArray(inDto.get_sqlListName());
			} else if (Constant.RESPONSE_NO_DATA_FOUND.equalsIgnoreCase(retDto.get_rspCode())) {
				flag = true;// 找不到数据也标记为true
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
	public JSONObject queryForSingle(LinkQBaseDTO inDto, LinkQBaseDTO outDto, HttpServletRequest req) throws Exception {
		LinkQBaseDTO retDto = new LinkQBaseDTO();// 返回对象
		JSONObject json = null;// 响应输出json串
		// 后台查询记录
		try {
			// 获取用户信息
			PubUserinfo userDto = getUserDto(req);
			if (userDto == null) {
				throw new Exception("当前没有登录用户或用户session已过期！");
			}

			inDto.set_insttuId(userDto.getId().getInsttuId());
			inDto.set_userId(userDto.getId().getUserId());

			// 设置分页
			String startStr = req.getParameter("start");
			long start = StringUtils.isNotBlank(startStr) ? ConverUtil.getObjLong(startStr) : 1l;
			inDto.set_pageStart(start);
			inDto.set_pageLimit(Constant.PAGE_SIZE);

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
			Object singleObj = null;// 单个结果对象
			if (retDto.get_rspCode() != null && Constant.RESPONSE_OK.equalsIgnoreCase(retDto.get_rspCode())) {
				flag = true;
				JSONObject res = JSONObject.fromObject(retDto);
				Object list = res.get(inDto.get_sqlListName());
				if (list != null) {
					ja = (JSONArray) list;
					if (!ja.isEmpty()) {
						singleObj = ja.get(0);
					}
				}
			}
			// 将返回对象属性信息拷贝到输出对象
			if (outDto != null)
				PropertyUtils.copyProperties(outDto, retDto);

			// 将对象转化成json字符串
			json = new JSONObject();
			json.put("success", flag); // 处理结果标记
			json.put("errMsg", retDto.get_rspMsg()); // 响应信息
			json.put("rspCode", retDto.get_rspCode());// 响应代号
			json.put("data", JSONObject.fromObject(singleObj));// 单个结果对象
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
	public JSONObject updateData(LinkQBaseDTO inDto, LinkQBaseDTO outDto, HttpServletRequest req) throws Exception {
		LinkQBaseDTO retDto = new LinkQBaseDTO();// 返回对象
		JSONObject json = null;// 响应输出json串
		// 后台查询记录
		try {
			// 获取用户信息
			PubUserinfo userDto = getUserDto(req);
			if (userDto == null) {
				throw new Exception("当前没有登录用户或用户session已过期！");
			}

			inDto.set_insttuId(userDto.getId().getInsttuId());
			inDto.set_userId(userDto.getId().getUserId());

			// 发后台交易
			if (outDto != null)
				retDto = LinkQHandler.getData(inDto, outDto.getClass());
			else
				retDto = LinkQHandler.getData(inDto, inDto.getClass());

		} catch (Exception e) {
			e.printStackTrace();
			// 封装异常信息
			if (retDto == null)
				retDto = new LinkQBaseDTO();
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
			json.put("data", JSONObject.fromObject(retDto)); // 响应对象
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
}
