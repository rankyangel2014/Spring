package com.jsjn.jnf.bean.dto.assist;

import com.jsjn.jnf.bean.dto.base.BaseDTO;
import com.jsjn.jnf.common.security.SaltManager;
import com.jsjn.jnf.common.utils.StringUtils;

/**
 * 摘要基类
 * 
 * @author lilong
 * 
 */
public abstract class DigestDto<T> extends BaseDTO<T> {

	protected static String SALT = SaltManager.getDigestSalt();

	/**
	 * 如果digest被@Override那么子类必须覆盖validDigest方法
	 */
	private String digest;

	/**
	 * 摘要验证是否合法
	 */
	private Boolean valid;

	public String getDigest() {
		return digest;
	}

	public void setDigest(String digest) {
		this.digest = digest;
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 校验数据摘要
	 * 
	 * @return
	 */
	public boolean validDigest() {
		String buildDigest = this.buildDigest();
		if (StringUtils.isNotEmpty(buildDigest)) {
			return buildDigest.equals(this.digest);
		}
		return false;
	}

	public abstract String buildDigest();

	public Boolean getValid() {
		return valid;
	}

	public void setValid(Boolean valid) {
		this.valid = valid;
	}

}
