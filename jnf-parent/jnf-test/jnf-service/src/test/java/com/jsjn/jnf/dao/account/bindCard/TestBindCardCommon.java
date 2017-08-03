package com.jsjn.jnf.dao.account.bindCard;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;

import com.jsjn.jnf.bean.dto.account.BindCardDto;
import com.jsjn.panda.setup.ParseSpring;
import com.mchange.v2.c3p0.ComboPooledDataSource;

public class TestBindCardCommon {
	private static ComboPooledDataSource dataSource = (ComboPooledDataSource) ParseSpring.context.getBean("dataSource");

	private static JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
	
	public static void insertBindCard(BindCardDto dto){
		final BindCardDto bindCardDto = dto;
		String insertSQL = "insert into jnf_t3(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		jdbcTemplate.update(insertSQL, new PreparedStatementSetter(){

			@Override
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setString(1, 	bindCardDto.getAid());
				ps.setString(2, 	bindCardDto.getCustId());
				ps.setString(3, 	bindCardDto.getMId());
				ps.setString(4, 	bindCardDto.getType());
				ps.setString(5, 	bindCardDto.getBankName());
				ps.setString(6, 	bindCardDto.getBankCardNo());
				ps.setString(7, 	bindCardDto.getState());
				ps.setString(8, 	bindCardDto.getMobile());
				ps.setString(9,		bindCardDto.getAgreementHash());
				ps.setString(10, 	bindCardDto.getRemark());
				ps.setString(11, 	bindCardDto.getDigest());
				ps.setDate(12, 		new Date(System.currentTimeMillis()));
				ps.setDate(13, 		new Date(System.currentTimeMillis()));
				ps.setString(14, 	bindCardDto.getCustName());
				ps.setString(15, 	bindCardDto.getIdNo());
				ps.setString(16, 	bindCardDto.getSignNo());
				
			}
		});
	}
	
	public static void deleteBindCardInfoById(String aid){
		String deleteSQL = "delete from jnf_t3 where c1 = ?";
		jdbcTemplate.update(deleteSQL,new Object[]{aid});
	}
	
	public static void updateBindCardDigest(String aid ,String digest){
		String updateSQL = "update jnf_t3 set c11 = ? where c1 = ?";
		jdbcTemplate.update(updateSQL,new Object[]{digest,aid});
	}

}
