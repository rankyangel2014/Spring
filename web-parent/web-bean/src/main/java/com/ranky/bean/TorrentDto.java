package com.ranky.bean;

/**
 * Created by admin on 16/8/8.
 */
public class TorrentDto extends BaseDTO<TorrentDto> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String tid;
	private String isHd;
	private String torrentName;
	private String torrentUrl;

	public TorrentDto(String tid, String torrentUrl) {
		this.tid = tid;
		this.torrentUrl = torrentUrl;
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

	public String getTorrentUrl() {
		return torrentUrl;
	}

	public void setTorrentUrl(String torrentUrl) {
		this.torrentUrl = torrentUrl;
	}

	public String getTorrentName() {
		return torrentName;
	}

	public void setTorrentName(String torrentName) {
		this.torrentName = torrentName;
	}

	public String getIsHd() {
		return isHd;
	}

	public void setIsHd(String isHd) {
		this.isHd = isHd;
	}
}