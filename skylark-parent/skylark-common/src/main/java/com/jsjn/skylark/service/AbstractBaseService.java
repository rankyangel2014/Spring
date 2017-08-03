package com.jsjn.skylark.service;

import com.jsjn.skylark.session.SessionContext;
import com.jsjn.skylark.session.UserInfo;

public abstract class AbstractBaseService {

	/**
	 * 获取登录用户信息
	 * 
	 * @return UserInfo
	 */
	public UserInfo getUserDto() {
		// 获取session用户信息
		UserInfo userInfo = (UserInfo) SessionContext.getSession()
				.getAttribute(SessionContext.USER_INFO);

		return userInfo;
	}
}
