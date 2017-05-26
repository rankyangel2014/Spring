package com.ranky.service;

import com.ranky.bean.UserDto;

public interface UserService {
	UserDto getUser(Integer id);

	int saveUser(UserDto userDto);

	int updateUser(UserDto userDto);

	int deleteUser(Integer id);

	UserDto getAllUser(UserDto user);

	UserDto getUserByCondition(String value);

}
