package com.jsjn.jnf.bean.dto.assist;

import com.jsjn.jnf.bean.dto.base.BaseDTO;

/**
 * @author yincy 字典表字段
 */
public class DictDto extends BaseDTO<DictDto> {

	private static final long serialVersionUID = -7118287853695708178L;

	/**
	 * 编号
	 */
	private Long id;

	/**
	 * 正式环境字典值
	 */
	private String value;

	/**
	 * 字典类型
	 */
	private String type;

	/**
	 * 字典说明（单）
	 */
	private String desc;

	/**
	 * 字典类型（多）
	 */
	private String[] types;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String[] getTypes() {
		return types;
	}

	public void setTypes(String[] types) {
		this.types = types;
	}

}
