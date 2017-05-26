package com.ranky.sqlbuilder;

import java.text.MessageFormat;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.ibatis.jdbc.SQL;

import com.ranky.bean.ImageDto;
import com.ranky.bean.TorrentDto;

public class FilmSqlBuilder {
	public String batchInsertImages(Map<String, List<ImageDto>> map) {
		List<ImageDto> images = map.get("list");
		StringBuilder sb = new StringBuilder();
		sb.append("INSERT INTO image ");
		sb.append("(tid, imageUrl, isCover) ");
		sb.append(" select ");
		for (ImageDto imageDto : images) {
			String tid = imageDto.getTid();
			String imageUrl = imageDto.getImageUrl();
			String isCover = imageDto.getIsCover();
			String sql = String.format(" '%s','%s','%s' union all select ",
					tid, imageUrl, isCover);
			sb.append(sql);
		}
		return StringUtils.removeEnd(sb.toString(), "union all select ");

	}

	public String batchInsertTorrents(Map<String, List<TorrentDto>> map) {
		List<TorrentDto> torrents = map.get("list");
		StringBuilder sb = new StringBuilder();
		sb.append("INSERT INTO torrent ");
		sb.append("(tid, isHd, torrentName, torrentUrl ) ");
		sb.append(" select ");
		for (TorrentDto torrentDto : torrents) {
			String tid = torrentDto.getTid();
			String isHd = torrentDto.getIsHd();
			String torrentName = torrentDto.getTorrentName();
			String torrentUrl = torrentDto.getTorrentUrl();
			String sql = String.format(
					" '%s','%s','%s','%s' union all select ", tid, isHd,
					torrentName, torrentUrl);
			sb.append(sql);
		}
		return StringUtils.removeEnd(sb.toString(), "union all select ");

	}

	// public String filterFilm() {
	// return new SQL() {
	// {
	// SELECT("*");
	// FROM("film");
	// WHERE("value like #{value} || '%'");
	// }
	// }.toString();
	//
	// }
}