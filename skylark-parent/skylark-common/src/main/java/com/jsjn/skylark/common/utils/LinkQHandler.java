package com.jsjn.skylark.common.utils;

import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.jsjn.platform.driver.linkq.LinkQException;
import com.jsjn.platform.driver.serialize.CSerializer;
import com.jsjn.skylark.common.Constant;
import com.jsjn.skylark.ex.LinkQHandlerException;
import com.jsjn.skylark.session.SessionContext;
import com.jsjn.skylark.session.UserInfo;
import com.jsjn.system.po.PubInsttu;

public class LinkQHandler {

	private static Logger log = Logger.getLogger(LinkQHandler.class);

	// 发送linkQ交易
	public static <T> T getData(CSerializer cs, Class<T> clazz)
			throws LinkQHandlerException {
		// PubUserinfo userinfo =
		// (PubUserinfo)SessionContext.getAttribute(SessionContext.USER_INFO);
		UserInfo userinfo = (UserInfo) SessionContext
				.getAttribute(SessionContext.USER_INFO);
		if (userinfo != null) {
			cs.set_insttuId(userinfo.getInsttuId());
			cs.set_userId(userinfo.getUserId());
		}
		String sysName = userinfo.getModId();
		if (StringUtils.isNotBlank(sysName)) {
			cs.set_sysName(sysName);
		}
		// 获取对象中机构码信息，并对操作机构进行安全校验
		String orgNo = null;
		boolean flag = false; // 是否需要校验机构信息标志，操作公共表的信息无机构码限制的则无需校验
		try {
			Method m = cs.getClass().getMethod("getOrgNo");
			if (m != null) {
				flag = true;
				orgNo = ConverUtil.getObjStr(m.invoke(cs));
			}
		} catch (Exception e) {
			flag = false;
		}
		// 操作机构进行安全校验
		if (flag) {
			// 判断机构码是否为空
			if (StringUtils.isBlank(orgNo)
					&& (!judgeIsMgrOrg(SessionContext.getSession()))) {
				// throw new LinkQHandlerException("当前操作机构码不能为空！");
				try {
					// 业务机构码默认设置为当前登录机构码
					Method m = cs.getClass()
							.getMethod("setOrgNo", String.class);
					if (m != null) {
						orgNo = userinfo.getInsttuId();
						m.invoke(cs, orgNo);
					}
				} catch (Exception e) {
				}
			}
			// 如果当前登录机构属性为营业机构，则机构码必须为当前登录机构
			/*
			 * if((!MaspUtil.judgeIsMgrOrg(SessionContext.getSession()))
			 * &&(!orgNo.equalsIgnoreCase(userinfo.getId().getInsttuId()))) {
			 * throw new LinkQHandlerException("当前登录机构不允许操作其它机构数据！"); }
			 */
		}

		cs.set_areaId("3200");
		try {
			return com.jsjn.platform.driver.linkq.LinkQHandler.getData(cs,
					clazz);
		} catch (LinkQException e) {
			log.error("发送linkQ交易异常===" + e.getMessage());
			throw new LinkQHandlerException(e.getMessage());
		}
	}

	// 发送linkQ交易，webservice等特殊处理使用
	public static <T> T getData(CSerializer cs, Class<T> clazz,
			boolean isJudgeOrg) throws LinkQHandlerException {
		UserInfo userinfo = (UserInfo) SessionContext
				.getAttribute(SessionContext.USER_INFO);
		if (userinfo != null) {
			cs.set_insttuId(userinfo.getInsttuId());
			cs.set_userId(userinfo.getUserId());
		}
		String sysName = userinfo.getModId();
		if (StringUtils.isNotBlank(sysName)) {
			cs.set_sysName(sysName);
		}

		// 获取对象中机构码信息，并对操作机构进行安全校验
		String orgNo = null;
		boolean flag = false; // 是否需要校验机构信息标志，操作公共表的信息无机构码限制的则无需校验
		// 判断当前操作标志是否需要校验机构信息
		if (isJudgeOrg) {
			try {
				Method m = cs.getClass().getMethod("getOrgNo");
				if (m != null) {
					flag = true;
					orgNo = ConverUtil.getObjStr(m.invoke(cs));
				}
			} catch (Exception e) {
				flag = false;
			}
		}
		// 操作机构进行安全校验
		if (flag) {
			// 判断机构码是否为空
			if (StringUtils.isBlank(orgNo)
					&& (!judgeIsMgrOrg(SessionContext.getSession()))) {
				// throw new LinkQHandlerException("当前操作机构码不能为空！");
				try {
					// 业务机构码默认设置为当前登录机构码
					Method m = cs.getClass()
							.getMethod("setOrgNo", String.class);
					if (m != null) {
						orgNo = userinfo.getInsttuId();
						m.invoke(cs, orgNo);
					}
				} catch (Exception e) {
				}
			}
			// 如果当前登录机构属性为营业机构，则机构码必须为当前登录机构
			if ((!judgeIsMgrOrg(SessionContext.getSession()))
					&& (!orgNo.equalsIgnoreCase(userinfo.getInsttuId()))) {
				throw new LinkQHandlerException("当前登录机构不允许操作其它机构数据！");
			}
		}

		cs.set_areaId("3200");
		try {
			return com.jsjn.platform.driver.linkq.LinkQHandler.getData(cs,
					clazz);
		} catch (LinkQException e) {
			e.printStackTrace();
			log.error("发送linkQ交易异常===" + e.getMessage());
		}
		return null;
	}

	public static Object getMapList(CSerializer cs)
			throws LinkQHandlerException {
		UserInfo userinfo = (UserInfo) SessionContext
				.getAttribute(SessionContext.USER_INFO);
		if (userinfo != null) {
			cs.set_insttuId(userinfo.getInsttuId());
			cs.set_userId(userinfo.getUserId());
		}
		String sysName = userinfo.getModId();
		if (StringUtils.isNotBlank(sysName)) {
			cs.set_sysName(sysName);
		}
		cs.set_areaId("3200");
		try {
			return com.jsjn.platform.driver.linkq.LinkQHandler.getMapList(cs);
		} catch (LinkQException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 判断当前登录机构是否管理机构
	 * 
	 * @return flag
	 */
	public static boolean judgeIsMgrOrg(HttpServletRequest req) {
		boolean flag = false;
		PubInsttu pi = (PubInsttu) req.getSession().getAttribute(
				Constant.BANK_IN_SESSION);
		if (pi != null && StringUtils.isNotBlank(pi.getInsttuAttr())) {
			if ("1".equalsIgnoreCase(pi.getInsttuAttr().substring(0, 1))) {
				flag = true;
			}
		}
		return flag;
	}

	/**
	 * 判断当前登录机构是否管理机构
	 * 
	 * @return flag
	 */
	public static boolean judgeIsMgrOrg(HttpSession session) {
		boolean flag = false;
		PubInsttu pi = (PubInsttu) session
				.getAttribute(Constant.BANK_IN_SESSION);
		if (pi != null && StringUtils.isNotBlank(pi.getInsttuAttr())) {
			if ("1".equalsIgnoreCase(pi.getInsttuAttr().substring(0, 1))) {
				flag = true;
			}
		}
		return flag;
	}

}
