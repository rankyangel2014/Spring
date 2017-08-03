package com.jsjn.jnf.dao.member.memberDao;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;

import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.panda.setup.ParseSpring;
import com.mchange.v2.c3p0.ComboPooledDataSource;

public class TestMemberCommon {
	
	private static ComboPooledDataSource dataSource = (ComboPooledDataSource) ParseSpring.context.getBean("dataSource");

	private static JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
	
	@SuppressWarnings("rawtypes")
	public static MemberDto queryMemberInfoByIdNo(String mid,String idNo) {
		MemberDto retDto = null;
		String querySQL = "select c1 as custId,c2 as custName,c3 as mId,c4 as custType,c5 as mobile,c6 as state,c7 as isReal,c8 as remark,c9 as idType,"
				+ "c10 as idNo,c11 as extCustId,c12 as insttuId,c13 as digest ,c14 as created,c15 as modified from jnf_t2 where c3=? and c10 = ?";

		Map map = jdbcTemplate.queryForMap(querySQL, new Object[] { mid,idNo });
		if(map != null){
			retDto = new MemberDto();
			retDto.setCustId(map.get("custId").toString());
			retDto.setCustName(map.get("custName").toString());
			retDto.setmId(map.get("mId").toString());
			retDto.setCustType(map.get("custType").toString());
			retDto.setMobile(map.get("mobile") != null ? map.get("mobile").toString() : null);
			retDto.setState(map.get("state").toString());
			retDto.setIsReal(map.get("isReal").toString());
			retDto.setRemark(map.get("remark") != null ? map.get("remark").toString() : null);
			retDto.setIdType(map.get("idType") != null ? map.get("idType").toString() : null);
			retDto.setIdNo(map.get("idNo") != null ? map.get("idNo").toString() : null);
			retDto.setExtCustId(map.get("extCustId") != null ? map.get("extCustId").toString() : null);
			retDto.setInsttuId(map.get("insttuId") != null ? map.get("insttuId").toString() : null);
			retDto.setDigest(map.get("digest").toString());
		}
		return retDto;
	}
	
	
	public static void insertMemberInfo(MemberDto dto){
		final MemberDto memberDto = dto;
		String insertSQL = "insert into jnf_t2(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		jdbcTemplate.update(insertSQL, new PreparedStatementSetter(){

			@Override
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setString(1, memberDto.getCustId());
				ps.setString(2, memberDto.getCustName());
				ps.setString(3, memberDto.getmId());
				ps.setString(4, memberDto.getCustType());
				ps.setString(5, memberDto.getMobile());
				ps.setString(6, memberDto.getState());
				ps.setString(7, memberDto.getIsReal());
				ps.setString(8, memberDto.getRemark());
				ps.setString(9, memberDto.getIdType());
				ps.setString(10, memberDto.getIdNo());
				ps.setString(11, memberDto.getExtCustId());
				ps.setString(12, memberDto.getInsttuId());
				ps.setString(13, memberDto.getDigest());
				ps.setDate(14, new Date(System.currentTimeMillis()));
				ps.setDate(15, new Date(System.currentTimeMillis()));
				
			}
		});
		
	}
	
	public static void deleteMemberInfoById(String custId){
		String deleteSQL = "delete from jnf_t2 where c1 = ?";
		jdbcTemplate.update(deleteSQL, new Object[]{custId});
	}
	
	public static void updateMemeberDigest(String custId,String digest){
		String updateSQL = "update jnf_t2 set c13=? where c1 = ?";
		jdbcTemplate.update(updateSQL,new Object[]{digest,custId});
	}

}
