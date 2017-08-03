package com.jsjn.skylark.bean;

/**
 * 模板消息
 * 
 * @author xiekx
 * 
 */
public class MessageDto extends BaseDto<MessageDto> {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String id;// 编号
	private String message;// 消息
	private String subject;// 标题
	private String code;// 提取码
	private String isCode;// 是否需要提取码
	private String expireDate;// 过期日期
	private String templateNm;// 模板名称
	private String createDate;// 创建时间

	/**
	 * 默认构造函数
	 */
	public MessageDto() {
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	private String createBy;// 创建人

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getExpireDate() {
		return expireDate;
	}

	public void setExpireDate(String expireDate) {
		this.expireDate = expireDate;
	}

	public String getTemplateNm() {
		return templateNm;
	}

	public void setTemplateNm(String templateNm) {
		this.templateNm = templateNm;
	}

	public String getIsCode() {
		return isCode;
	}

	public void setIsCode(String isCode) {
		this.isCode = isCode;
	}

}
