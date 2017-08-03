package com.jsjn.jnf.dao.payment;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;

import com.jsjn.jnf.bean.dto.payment.PaymentDto;
import com.jsjn.panda.setup.ParseSpring;
import com.mchange.v2.c3p0.ComboPooledDataSource;

public class TestPaymentCommon {
	private static ComboPooledDataSource dataSource = (ComboPooledDataSource) ParseSpring.context.getBean("dataSource");

	private static JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
	
	public static void deleteAllPayment(){
		String deleteSQL = "truncate table jnf_t9";
		jdbcTemplate.execute(deleteSQL);
	}

	
	/**
	 * 插入金农付交易表
	 * @param dto
	 */
	public static void insertTrade(PaymentDto dto) {
		final PaymentDto paymentDto = dto;
		String insertSQL = "insert into jnf_t9(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

		jdbcTemplate.update(insertSQL, new PreparedStatementSetter() {
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setString(1, 		paymentDto.getOrderNo());
				ps.setString(2, 		paymentDto.getOrderType());
				ps.setString(3, 		paymentDto.getTradeNo());
				ps.setString(4, 		paymentDto.getPayer());
				ps.setString(5, 		paymentDto.getPayBank());
				ps.setString(6, 		paymentDto.getPayAccount());
				ps.setString(7, 		paymentDto.getPayee());
				ps.setString(8, 		paymentDto.getCollBank());
				ps.setString(9, 		paymentDto.getCollAccount());
				ps.setBigDecimal(10, 	paymentDto.getAmount());
				ps.setString(11, 		paymentDto.getStatus());
				ps.setString(12, 		paymentDto.getFailReason());
				ps.setString(13, 		paymentDto.getChannel());
				ps.setDate(14, 			new Date(System.currentTimeMillis()));
				ps.setDate(15, 			new Date(System.currentTimeMillis()));	
				ps.setString(16, 		paymentDto.getDigest());
			}
		});
	}
}
