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
import org.springframework.web.bind.annotation.PatchMapping;

import com.ranky.bean.ImageDto;
import com.ranky.sqlbuilder.FilmSqlBuilder;

public interface ImageDao {

	@CachePut("images")
	@Insert(value = "insert into image (tid, imageUrl,isCover) values (#{tid},#{imageUrl},#{isCover})")
	@Options(keyProperty = "id", useGeneratedKeys = true)
	int saveImage(ImageDto ImageDto);

	@CachePut("torrents")
	@InsertProvider(type = FilmSqlBuilder.class, method = "batchInsertImages")
	int batchSaveImage(@Param("list") List<ImageDto> ImageDto);

	@Delete(value = "delete from image  where id = #{id}")
	@CacheEvict("images")
	int removeImage(@Param("id") Integer id);

	@Delete(value = "delete from image  where tid = #{tid}")
	@CacheEvict("images")
	int removeImages(@Param("tid") String tid);

	@Update(value = "update image set tid=#{tid} , imageUrl= #{imageUrl}, isCover=#{isCover} where id = #{id}")
	@CachePut("images")
	int updateImage(ImageDto ImageDto);

	@Select(value = "select * from image where id = #{id}")
	@Cacheable(value = "images", sync = true)
	ImageDto findImageById(@Param("id") Integer id);

	@Select(value = "select * from image where tid = #{tid} ")
	@Cacheable(value = "images", sync = true)
	List<ImageDto> findImagesByTid(@Param("tid") String tid);

	@Select(value = "select * from image where tid = #{tid} and  isCover='Y' ")
	@Cacheable(value = "images", sync = true)
	ImageDto findCoverImageByTid(@Param("tid") String tid);

	@Select(value = "select * from image where  tid = #{tid} limit 1 ")
	@Cacheable(value = "images", sync = true)
	ImageDto findDefaultImageByTid(@Param("tid") String tid);
}
