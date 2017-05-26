package com.ranky.bean;

import java.util.List;

/**
 * Created by admin on 16/8/8.
 */
public class FilmDto extends BaseDTO<FilmDto> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String tid;
	private String serialNo;
	private String filmName;
	private String filmCover;
	private String filmTorrent;
	private String actorName;
	private String filmExt;
	private String filmSize;
	private String filmDuration;
	private String markInfo;
	private String releaseTime;
	private String torrentTerm;
	private String source;
	private List<ImageDto> images;
	private List<TorrentDto> torrents;

	public List<ImageDto> getImages() {
		return images;
	}

	public void setImages(List<ImageDto> images) {
		this.images = images;
	}

	public List<TorrentDto> getTorrents() {
		return torrents;
	}

	public void setTorrents(List<TorrentDto> torrents) {
		this.torrents = torrents;
	}

	public FilmDto() {
	}

	public FilmDto(String tid, String markInfo, String filmExt, String filmSize, String serialNo, String filmName,
			String filmCover, String actorName, String filmDuration, String releaseTime, String torrentTerm) {
		this.tid = tid;
		this.setMarkInfo(markInfo);
		this.filmExt = filmExt;
		this.filmSize = filmSize;
		this.serialNo = serialNo;
		this.filmName = filmName;
		this.filmCover = filmCover;
		this.actorName = actorName;
		this.filmDuration = filmDuration;
		this.releaseTime = releaseTime;
		this.torrentTerm = torrentTerm;
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

	public String getSerialNo() {
		return serialNo;
	}

	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}

	public String getFilmName() {
		return filmName;
	}

	public void setFilmName(String filmName) {
		this.filmName = filmName;
	}

	public String getActorName() {
		return actorName;
	}

	public void setActorName(String actorName) {
		this.actorName = actorName;
	}

	public String getFilmExt() {
		return filmExt;
	}

	public void setFilmExt(String filmExt) {
		this.filmExt = filmExt;
	}

	public String getFilmSize() {
		return filmSize;
	}

	public void setFilmSize(String filmSize) {
		this.filmSize = filmSize;
	}

	public String getFilmDuration() {
		return filmDuration;
	}

	public void setFilmDuration(String filmDuration) {
		this.filmDuration = filmDuration;
	}

	public String getReleaseTime() {
		return releaseTime;
	}

	public void setReleaseTime(String releaseTime) {
		this.releaseTime = releaseTime;
	}

	public String getTorrentTerm() {
		return torrentTerm;
	}

	public void setTorrentTerm(String torrentTerm) {
		this.torrentTerm = torrentTerm;
	}

	public String getFilmCover() {
		return filmCover;
	}

	public void setFilmCover(String filmCover) {
		this.filmCover = filmCover;
	}

	public String getFilmTorrent() {
		return filmTorrent;
	}

	public void setFilmTorrent(String filmTorrent) {
		this.filmTorrent = filmTorrent;
	}

	public String getMarkInfo() {
		return markInfo;
	}

	public void setMarkInfo(String markInfo) {
		this.markInfo = markInfo;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

}