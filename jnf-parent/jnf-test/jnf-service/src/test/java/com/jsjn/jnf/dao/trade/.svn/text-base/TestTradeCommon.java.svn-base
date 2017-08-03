package com.jsjn.jnf.dao.trade;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;

import com.jsjn.jnf.bean.dto.trade.TransactionDto;
import com.jsjn.panda.setup.ParseSpring;
import com.mchange.v2.c3p0.ComboPooledDataSource;

public class TestTradeCommon {
	
	private static ComboPooledDataSource dataSource = (ComboPooledDataSource) ParseSpring.context.getBean("dataSource");

	private static JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);

	/**
	 * 插入金农付交易表
	 * @param dto
	 */
	public static void insertTrade(TransactionDto dto) {
		final TransactionDto tradeDto = dto;
		String insertSQL = "insert into jnf_t8(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

		jdbcTemplate.update(insertSQL, new PreparedStatementSetter() {
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setString(1, 		tradeDto.getTradeNo());
				ps.setString(2, 		tradeDto.getbNo());
				ps.setString(3, 		tradeDto.getTradeType());
				ps.setString(4, 	tradeDto.getMid());
				ps.setString(5, 	tradeDto.getMSerialNo());
				ps.setString(6, 	tradeDto.getExternLoanNo());
				ps.setString(7, 	tradeDto.getPayer());
				ps.setString(8, 	tradeDto.getPayerName());
				ps.setString(9, 	tradeDto.getPayerBankCardNo());
				ps.setString(10, 	tradeDto.getPayee());
				ps.setString(11, 	tradeDto.getPayeeName());
				ps.setBigDecimal(12, 	tradeDto.getAmount());
				ps.setString(13, 	tradeDto.getStatus());
				ps.setString(14, 	tradeDto.getFailReason());
				ps.setString(15, 	tradeDto.getDesc());
				ps.setDate(16, 		new Date(tradeDto.getCreated() != null ? tradeDto.getCreated().getTime() : System.currentTimeMillis()));
				ps.setDate(17, 		new Date(tradeDto.getModified() != null ? tradeDto.getModified().getTime() : System.currentTimeMillis()));
				ps.setString(18, 	tradeDto.getDigest());
				ps.setString(19, 	tradeDto.getException());
			}
		});
	}
	
	
	/**
	 * 根据ID查询一条记录的信息
	 * 
	 * @param id
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static TransactionDto queryMemberFlowById(String tradeNo) {
		TransactionDto retDto = null;
		String querySQL = "select c1 as tradeNo,c2 as bNo,c3 as tradeType,c4 as mid,c5 as mSerialNo,c6 as externLoanNo,c7 as payer,c8 as payerName,c9 as payerBankCardNo,"
				+ "c10 as payee,c11 as payeeName,c12 as amount,c13 as status ,c14 as failReason,c15 as desc,c18 as digest，c19 as exception" +
				" from jnf_t8 where c1=? order";

		Map map = jdbcTemplate.queryForMap(querySQL, new Object[] { tradeNo });
		if(map != null){
			retDto = new TransactionDto();
			retDto.setTradeNo(map.get("tradeNo").toString());
			retDto.setbNo(map.get("bNo").toString());
			retDto.setTradeType(map.get("setTradeType").toString());
			retDto.setMid(map.get("mid").toString());
			retDto.setMSerialNo(map.get("mSerialNo").toString());
			retDto.setExternLoanNo(map.get("externLoanNo").toString());
			retDto.setPayer(map.get("payer").toString());
			retDto.setPayerName(map.get("payerName").toString());
			retDto.setPayerBankCardNo(map.get("payerBankCardNo").toString());
			retDto.setPayee(map.get("payee") != null ? map.get("payee").toString() : null);
			retDto.setPayeeName(map.get("payeeName") != null ? map.get("payeeName").toString() : null);
			retDto.setAmount(new BigDecimal(map.get("amount").toString()));
			retDto.setStatus(map.get("status").toString());
			retDto.setFailReason(map.get("failReason") != null ? map.get("failReason").toString() : null);
			retDto.setDesc(map.get("desc").toString());
			retDto.setDigest(map.get("token").toString());
			retDto.setException(map.get("exception") != null ? map.get("exception").toString() : null);
		}
		return retDto;
	}
	
	/**
	 * 根据ID删除一条记录
	 * @param tradeNo
	 */
	public static void deleteTradeById(String tradeNo){
		String deleteSQL = "delete from jnf_t8 where c1 = ?";
		jdbcTemplate.update(deleteSQL,new Object[]{tradeNo});
	}
	
	/**
	 * 删除JNF_T8所有数据
	 */
	public static void deleteAllTrade(){
		String deleteSQL = "truncate table jnf_t8";
		jdbcTemplate.execute(deleteSQL);
	}
}
