package com.jsjn.jnf.dao.assist;


import org.springframework.jdbc.core.JdbcTemplate;

import com.jsjn.panda.setup.ParseSpring;
import com.mchange.v2.c3p0.ComboPooledDataSource;

public class TestLockCommon {
	private static ComboPooledDataSource dataSource = (ComboPooledDataSource) ParseSpring.context.getBean("dataSource");

	private static JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
	
	public static void deleteAllLock(){
		String deleteSQL = "truncate table jnf_t10";
		jdbcTemplate.execute(deleteSQL);
	}
	
	public static void insertLock(String mid,String lockType,String lockNo){
		String insertSQL = "insert into jnf_t10(c1,c2,c3) values(?,?,?)";
		jdbcTemplate.update(insertSQL, new Object[]{mid,lockType,lockNo});
	}
	
	public static int existLock(String mid,String lockType,String lockNo){
		String selectSQL = "select count(0) from jnf_t10 where c1 = ? and c2 = ? and c3 = ?";
		return jdbcTemplate.queryForInt(selectSQL, new Object[]{mid,lockType,lockNo});
	}

}
