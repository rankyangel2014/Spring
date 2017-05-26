package com.ranky.dao;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.Update;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;
import com.ranky.bean.UserDto;
import com.ranky.sqlbuilder.UserSqlBuilder;

/**
 * 用户数据映射 Created by admin on 16/8/8.
 */
public interface UserDao {
	@Select(value = "select id,value from mytable where id = #{id}")
	@Cacheable(value = "users", sync = true)
	UserDto findUser(Integer id);

	@Select(value = "select id,value from mytable ")
	@Cacheable(value = "users", sync = true)
	PageList<UserDto> findAllUser(PageBounds pageBounds);

	@Insert(value = "insert into mytable (id, value) values (#{id},#{value})")
	@CachePut("users")
	int saveUser(UserDto userDto);

	@Update(value = "update  mytable set value=#{value} where id = #{id}")
	@CachePut("users")
	int updateUser(UserDto userDto);

	@Delete(value = "delete  from mytable  where id = #{id}")
	@CacheEvict("users")
	int removeUser(Integer id);

	@SelectProvider(type = UserSqlBuilder.class, method = "findUser")
	@Cacheable(value = "users", sync = true)
	UserDto findUserByCondition(@Param("value")String value);
}