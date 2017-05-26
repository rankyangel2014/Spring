package com.ranky.protal.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ranky.bean.UserDto;
import com.ranky.service.UserService;

/**
 * 用户请求处理器 Created by admin on 16/8/6.
 */
@Controller
public class UserController {
	private static Logger logger = LogManager.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	@ResponseBody
	@RequestMapping(value = "/searchUser/{username}", method = RequestMethod.GET)
	public UserDto searchUser(@PathVariable("username") String username) {
		return userService.getUserByCondition(username);
	}

	@ResponseBody
	@RequestMapping(value = "/getUser/{userId}", method = RequestMethod.GET)
	public UserDto getUser(@PathVariable("userId") Integer userId) {
		return userService.getUser(userId);
	}

	@ResponseBody
	@RequestMapping(value = "/saveUser/{id}/{value}", method = RequestMethod.GET)
	public String saveUser(@PathVariable("id") Integer id, @PathVariable("value") String value) {
		UserDto user = new UserDto();
		user.setId(id);
		user.setValue(value);
		return "success【" + userService.saveUser(user) + "】";
	}

	@ResponseBody
	@RequestMapping(value = "/getAllUser", method = RequestMethod.POST)
	public UserDto getAllUser(UserDto user) {
		return userService.getAllUser(user);
	}

	@ResponseBody
	@RequestMapping(value = "/updateUser/{id}/{value}", method = RequestMethod.GET)
	public String updateUser(@PathVariable("id") Integer id, @PathVariable("value") String value) {
		UserDto user = new UserDto();
		user.setId(id);
		user.setValue(value);
		return "success【" + userService.updateUser(user) + "】";
	}

	@ResponseBody
	@RequestMapping(value = "/deleteUser/{id}", method = RequestMethod.GET)
	public String deleteUser(@PathVariable("id") Integer id) {
		return "success【" + userService.deleteUser(id) + "】";
	}

}