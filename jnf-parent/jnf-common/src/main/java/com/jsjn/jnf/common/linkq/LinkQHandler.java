package com.jsjn.jnf.common.linkq;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jsjn.jnf.common.utils.JSONUtil;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.platform.driver.linkq.LinkQException;
import com.jsjn.platform.driver.serialize.CSerializer;
import com.jsjn.pubsys.common.sso.SessionContext;

/**
 * LinkQ 交易工具类
 * 
 * @author CodmerYin
 * 
 */
public class LinkQHandler {

	private final static Logger logger = LoggerFactory.getLogger(LinkQHandler.class);

	/**
	 * 发送LinkQ(需要Session)
	 * 
	 * @param cs
	 * @param clazz
	 * @return
	 * @throws LinkQHandlerException
	 */
	public static <T> T getData(CSerializer cs, Class<T> clazz) throws LinkQHandlerException {
		com.jsjn.system.po.PubUserinfo userinfo = (com.jsjn.system.po.PubUserinfo) SessionContext.getAttribute(SessionContext.SSO_USER_INFO);
		if (userinfo != null) {
			cs.set_insttuId(userinfo.getId().getInsttuId());
			cs.set_userId(userinfo.getId().getUserId());
		}
		cs.set_areaId("3200");
		try {
			return com.jsjn.platform.driver.linkq.LinkQHandler.getData(cs, clazz);
		} catch (LinkQException e) {
			e.printStackTrace();
			logger.error("发送linkQ交易异常===" + e.getMessage());
		}
		return null;
	}

	/**
	 * 发送LinkQ(不需要Session)
	 * 
	 * @param cs
	 * @param clazz
	 *            (T extends LinkQBaseDTO)
	 * @return
	 * @throws LinkQHandlerException
	 */
	public static <T> T getDtoNoLogin(CSerializer cs, Class<T> clazz) throws LinkQHandlerException {

		//机构码：默认是【金农管理机构】
		String insttuId = StringUtils.isEmpty(cs.get_insttuId()) ? "990000001" : cs.get_insttuId();
		//登录ID：默认是【金农管理机构名下用户】
		String userId = StringUtils.isEmpty(cs.get_userId()) ? "J9900000010001" : cs.get_userId();
		//查询分页起始值：默认为0
		Long pageStart = (cs.get_pageStart() == null) ? 0L : cs.get_pageStart();
		//查询分页数量：默认为10
		Long pageLimit = (cs.get_pageLimit() == null) ? 10L : cs.get_pageLimit();

		cs.set_insttuId(insttuId);
		cs.set_userId(userId);
		cs.set_areaId("3200");
		cs.set_pageStart(pageStart);
		cs.set_pageLimit(pageLimit);
		try {
			return com.jsjn.platform.driver.linkq.LinkQHandler.getData(cs, clazz);
		} catch (LinkQException e) {
			e.printStackTrace();
			logger.error("发送linkQ交易异常===" + e.getMessage());
		}
		return null;
	}

	/**
	 * 发送LinkQ(不需要Session)
	 * 
	 * @param cs
	 * @param clazz
	 * @return
	 * @throws LinkQHandlerException
	 */
	public static JSONObject getJsonNoLogin(CSerializer reqDto) {
		logger.info("LinkQ调用开始：" + JSONUtil.toJSONString(reqDto));
		CSerializer resDto = new LinkQBaseDTO();

		JSONObject resJsonObj = new JSONObject();
		JSONArray resJsonArr = new JSONArray();
		String recList = reqDto.get_sqlListName();

		try {
			resDto = getDtoNoLogin(reqDto, reqDto.getClass());
		} catch (LinkQHandlerException e) {
			e.printStackTrace();
			resDto.set_rspMsg(e.getMessage());
		} finally {
			boolean flag = false;// 处理结果标记
			if (resDto.get_rspCode() != null && Constant.RESPONSE_OK.equalsIgnoreCase(resDto.get_rspCode())) {
				flag = true;
				JSONObject res = JSONObject.fromObject(resDto);
				if (StringUtils.isNotBlank(recList)) {

					resJsonArr = res.getJSONArray(recList);
				}
			} else if (Constant.RESPONSE_NO_DATA_FOUND.equalsIgnoreCase(resDto.get_rspCode())) {
				flag = true;// 找不到数据也标记为true
			}
			logger.info("LinkQ调用结束：" + JSONUtil.toJSONString(resDto));
			// 将对象转化成json字符串
			resJsonObj.put("success", flag); // 处理结果标记
			resJsonObj.put("errMsg", resDto.get_rspMsg()); // 响应信息
			resJsonObj.put("total", resDto.get_total()); // 总记录数
			resJsonObj.put("root", resJsonArr); // 结果集
		}
		return resJsonObj;
	}
}
