package com.ranky.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.miemiedev.mybatis.paginator.domain.Order;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;
import com.google.common.collect.Lists;
import com.ranky.bean.UserDto;
import com.ranky.dao.UserDao;
import com.ranky.service.UserService;

/**
 * Hello world!
 *
 */
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;

	@Override
	@Transactional(readOnly = true)
	// @Cacheable(value = "users", sync = true)
	public UserDto getUser(Integer id) {
		// System.out.println("getUser load from database !");
		return userDao.findUser(id);
	}

	@Override
	// @Cacheable(value = "users", sync = true)
	public UserDto getUserByCondition(String value) {
		// System.out.println("getUserByCondition load from database !");
		return userDao.findUserByCondition(value);
	}

	@Override
	// @CachePut("users")
	@Transactional(readOnly = false)
	public int saveUser(UserDto userDto) {
		// System.out.println("saveUser load from database !");
		int i = userDao.saveUser(userDto);
		return i;
	}

	@Override
	// @Cacheable("users")
	public UserDto getAllUser(UserDto user) {
		// System.out.println("getAllUser load from database !");
		String sort = user.getSort();
		List<Order> orders = Lists.newArrayList(Order.formString(sort));
		PageBounds pageBounds = new PageBounds(user.getPage(), user.getLimit(), orders, true);
		PageList<UserDto> list = userDao.findAllUser(pageBounds);
		// 获得结果集条总数
		user.setTotalCount(list.getPaginator().getTotalCount());
		user.setRoot(list);
		return user;
	}

	@Override
	// @CachePut("users")
	public int updateUser(UserDto userDto) {
		// System.out.println("updateUser load from database !");
		return userDao.updateUser(userDto);
	}

	@Override
	// @CacheEvict("users")
	public int deleteUser(Integer id) {
		// System.out.println("deleteUser load from database !");
		return userDao.removeUser(id);
	}
}
