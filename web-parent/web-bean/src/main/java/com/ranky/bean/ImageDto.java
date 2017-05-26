package com.ranky.bean;

public class ImageDto extends BaseDTO<ImageDto> {

	private static final long serialVersionUID = 1L;
	private Integer id;
	private String tid;
	private String imageUrl;
	private String isCover;

	public ImageDto(String tid, String imageUrl) {
		this.tid = tid;
		this.imageUrl = imageUrl;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTid() {
		return tid;
	}

	public void setTid(String tid) {
		this.tid = tid;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getIsCover() {
		return isCover;
	}

	public void setIsCover(String isCover) {
		this.isCover = isCover;
	}

}