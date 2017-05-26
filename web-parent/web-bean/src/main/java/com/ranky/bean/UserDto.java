package com.ranky.bean;

/**
 * Created by admin on 16/8/8.
 */
public class UserDto extends BaseDTO<UserDto> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String value;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "UserDto [id=" + id + ", value=" + getValue() + "]";
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
}