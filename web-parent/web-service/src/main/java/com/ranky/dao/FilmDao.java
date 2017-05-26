package com.ranky.dao;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;
import com.ranky.bean.FilmDto;

public interface FilmDao {
	@CachePut("films")
	@Insert(value = "insert into film   (tid, serialNo, filmName, filmCover ,filmTorrent ,actorName,"
			+ "filmExt, filmSize ,filmDuration, markInfo,releaseTime,torrentTerm,source) values "
			+ "(#{tid},#{serialNo},#{filmName},#{filmCover},#{filmTorrent},#{actorName},"
			+ "#{filmExt},#{filmSize},#{filmDuration},#{markInfo} ,#{releaseTime},#{torrentTerm},#{source})")
	@Options(keyProperty = "id", useGeneratedKeys = true)
	int saveFilm(FilmDto FilmDto);

	@Delete(value = "delete from film  where id = #{id}")
	@CacheEvict("films")
	int removeFilm(@Param("id") Integer id);

	@Update(value = "update film set tid=#{tid} , serialNo= #{serialNo} ,filmName=#{filmName} ,"
			+ "filmCover= #{filmCover} ,filmTorrent=#{filmTorrent} , actorName= #{actorName} ,"
			+ "filmExt=#{filmExt} , filmSize= #{filmSize} ,filmDuration=#{filmDuration} , markInfo= #{markInfo} ,"
			+ "releaseTime=#{releaseTime}, torrentTerm=#{torrentTerm} ,source = #{source} where id = #{id}")
	@CachePut("films")
	int updateFilm(FilmDto FilmDto);

	@Select(value = "select * from film where id = #{id}")
	@Cacheable(value = "films", sync = true)
	FilmDto findFilmById(@Param("id") Integer id);

	@Select(value = "select * from film")
	@Cacheable(value = "films", sync = true)
	PageList<FilmDto> findAllFilms(PageBounds pageBounds);

}
