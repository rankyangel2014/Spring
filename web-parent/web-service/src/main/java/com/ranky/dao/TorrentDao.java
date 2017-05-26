package com.ranky.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;

import com.ranky.bean.TorrentDto;
import com.ranky.sqlbuilder.FilmSqlBuilder;

/**
 * 用户数据映射 Created by admin on 16/8/8.
 */
public interface TorrentDao {
	@CachePut("torrents")
	@Insert(value = "insert into torrent (tid,isHd,torrentName, torrentUrl) "
			+ "values (#{tid},#{isHd},#{torrentName},#{torrentUrl})")
	@Options(keyProperty = "id", useGeneratedKeys = true)
	int saveTorrent(TorrentDto TorrentDto);

	@CachePut("torrents")
	@InsertProvider(type = FilmSqlBuilder.class, method = "batchInsertTorrents")
	int batchSaveTorrent(@Param("list") List<TorrentDto> TorrentDto);

	@Delete(value = "delete from torrent  where id = #{id}")
	@CacheEvict("torrents")
	int removeTorrent(@Param("id") Integer id);

	@Delete(value = "delete from torrent  where id = #{tid}")
	@CacheEvict("torrents")
	int removeTorrents(@Param("tid") String tid);

	@Update(value = "update torrent set tid=#{tid}, isHd= #{isHd}, torrentName= #{torrentName} , torrentUrl= #{torrentUrl} where id = #{id}")
	@CachePut("torrents")
	int updateTorrent(TorrentDto TorrentDto);

	@Select(value = "select * from torrent where id = #{id}")
	@Cacheable(value = "torrents", sync = true)
	TorrentDto findTorrentById(@Param("id") Integer id);

	@Select(value = "select * from torrent where tid = #{tid} ")
	@Cacheable(value = "torrents", sync = true)
	List<TorrentDto> findTorrentsByTid(@Param("tid") String tid);

	@Select(value = "select * from torrent where tid = #{tid}  and isHd='Y' LIMIT 1 ")
	@Cacheable(value = "torrents", sync = true)
	TorrentDto findHdTorrentByTid(@Param("tid") String tid);
	
	@Select(value = "select * from torrent where tid = #{tid} LIMIT 1  ")
	@Cacheable(value = "torrents", sync = true)
	TorrentDto findDefaultTorrentByTid(@Param("tid") String tid);
}