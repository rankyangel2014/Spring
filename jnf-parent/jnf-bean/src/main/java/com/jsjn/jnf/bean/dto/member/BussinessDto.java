package com.jsjn.jnf.bean.dto.member;

import java.util.Date;

import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.NotBlank;

import com.jsjn.jnf.bean.dto.base.BaseDTO;

/**
 * 商户实体
 * 
 * @author qiangl
 *
 */
public class BussinessDto extends BaseDTO<BussinessDto> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3231676559177635903L;
	
	
	/**
	 * 商户id号
	 */
	private String  mid;
	/**
	 * 商户名称
	 */
	@NotBlank(message="商户名称不能为空")
	@Pattern(regexp="^\\S{1,25}$",message="商户名称长度过长")
	private String  mName;
	/**
	 * 营业执照/统一信用代码
	 */
	@NotBlank(message="营业执照/统一信用代码不能为空")
	@Pattern(regexp="^\\S{1,18}$",message="营业执照/统一信用代码长度过长")
	private String  busLcnsNo;
	/**
	 * 联系电话（手机号码\固话）
	 */
	@NotBlank(message="联系电话(手机号码或固话)不能为空")
	@Pattern(regexp="^(1[3578][\\d]{9})$||^(\\d{3,4}-)?(\\d{7,8})$",message="联系电话格式不正确(手机号码或固话)")
	private String  phoneNo;
	/**
	 * 联系地址
	 */
	@NotBlank(message="联系地址不能为空")//
	@Pattern(regexp="^\\S{1,100}$",message="长度过长")
	private String  addr;
	/**
	 * 状态
	 */
	@NotBlank(message="状态不能为空")
	private String  status;
	/**
	 * 创建时间
	 */
	private Date  created;
	/**
	 * 更新时间
	 */
	private Date  modified;
	
	
	public String getMid() {
		return mid;
	}
	public void setMid(String mid) {
		this.mid = mid;
	}
	public String getMName() {
		return mName;
	}
	public void setMName(String mName) {
		this.mName = mName;
	}
	public String getBusLcnsNo() {
		return busLcnsNo;
	}
	public void setBusLcnsNo(String busLcnsNo) {
		this.busLcnsNo = busLcnsNo;
	}
	public String getPhoneNo() {
		return phoneNo;
	}
	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getCreated() {
		return created;
	}
	public void setCreated(Date created) {
		this.created = created;
	}
	public Date getModified() {
		return modified;
	}
	public void setModified(Date modified) {
		this.modified = modified;
	}
	

}
