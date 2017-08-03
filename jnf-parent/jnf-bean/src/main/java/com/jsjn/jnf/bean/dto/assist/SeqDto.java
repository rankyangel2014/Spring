package com.jsjn.jnf.bean.dto.assist;

import com.jsjn.jnf.bean.dto.base.BaseDTO;

/**
 * 数据库取序列值
 * @author qiangl
 *
 */
public class SeqDto extends BaseDTO<SeqDto>{
	/**
	 * 
	 */
	private static final long serialVersionUID = -7589467425134951844L;
	/**
	 * 序列号名称
	 */
	private String name;
	/**
	 * 序列值
	 */
	private String val;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getVal() {
		return val;
	}
	public void setVal(String val) {
		this.val = val;
	}
	
}
