package com.jsjn.jnf.dao.member.realNameFlowDao;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;

import com.jsjn.jnf.bean.dto.member.RealNameFlowDto;
import com.jsjn.panda.setup.ParseSpring;
import com.mchange.v2.c3p0.ComboPooledDataSource;

public class TestMemberFlowCommon {

	private static ComboPooledDataSource dataSource = (ComboPooledDataSource) ParseSpring.context.getBean("dataSource");

	private static JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);

	/**
	 * 插入金农付实名认证流水表
	 * @param dto
	 */
	public static void insertMemberFlow(RealNameFlowDto dto) {
		final RealNameFlowDto realNameDto = dto;
		String insertSQL = "insert into jnf_t14(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

		jdbcTemplate.update(insertSQL, new PreparedStatementSetter() {
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setInt(1, 		realNameDto.getId());
				ps.setString(2, 	realNameDto.getmId());
				ps.setString(3, 	realNameDto.getBussinessId());
				ps.setString(4, 	realNameDto.getCustId());
				ps.setString(5, 	realNameDto.getCustName());
				ps.setString(6, 	realNameDto.getIdNo());
				ps.setString(7, 	realNameDto.getBankCardNo());
				ps.setString(8, 	realNameDto.getMobile());
				ps.setString(9, 	realNameDto.getValidateCode());
				ps.setString(10, 	realNameDto.getState());
				ps.setString(11, 	realNameDto.getException());
				ps.setString(12, 	realNameDto.getIp());
				ps.setDate(13, 		new Date(System.currentTimeMillis()));
				ps.setDate(14, 		new Date(System.currentTimeMillis()));
				ps.setString(15, 	realNameDto.getPushFlag());
				ps.setString(16, 	realNameDto.getToken());
				ps.setString(17, 	realNameDto.getBankName());
				ps.setString(18, 	realNameDto.getBankCode());
			}
		});
	}

	/**
	 * 批量插入金农付实名认证流水表
	 * @param list
	 * @return
	 */
	public static boolean insertMemberFlowBatch(List<RealNameFlowDto> list) {
		final List<RealNameFlowDto> realNameList = list;
		String sql = "insert into jnf_t14(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

		jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
			public void setValues(PreparedStatement ps, int i) throws SQLException {
				RealNameFlowDto dto = realNameList.get(i);
				ps.setInt(1, 		dto.getId());
				ps.setString(2, 	dto.getmId());
				ps.setString(3, 	dto.getBussinessId());
				ps.setString(4, 	dto.getCustId());
				ps.setString(5, 	dto.getCustName());
				ps.setString(6, 	dto.getIdNo());
				ps.setString(7, 	dto.getBankCardNo());
				ps.setString(8, 	dto.getMobile());
				ps.setString(9, 	dto.getValidateCode());
				ps.setString(10, 	dto.getState());
				ps.setString(11, 	dto.getException());
				ps.setString(12, 	dto.getIp());
				ps.setDate(13, 		new Date(System.currentTimeMillis()));
				ps.setDate(12, 		new Date(System.currentTimeMillis()));
				ps.setString(12, 	dto.getPushFlag());
				ps.setString(12, 	dto.getToken());
				ps.setString(12, 	dto.getBankName());
				ps.setString(12, 	dto.getBankCode());

			}

			public int getBatchSize() {
				return realNameList.size();
			}
		});

		return true;
	}

	/**
	 * 根据ID删除一条Flow记录
	 * 
	 * @param id
	 */
	public static void deleteMemberFlowById(int id) {
		String deleteSQL = "delete from jnf_t14 where c1 = ?";
		jdbcTemplate.update(deleteSQL, new Object[] { id });
	}

	/**
	 * 根据ID查询一条记录的信息
	 * 
	 * @param id
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static RealNameFlowDto queryMemberFlowById(int id) {
		RealNameFlowDto retDto = null;
		String querySQL = "select c1 as id,c2 as mId,c3 as bussinessId,c4 as custId,c5 as custName,c6 as idNo,c7 as bankCardNo,c8 as mobile,c9 as validateCode,"
				+ "c10 as state,c11 as exception,c12 as ip,c13 as created ,c14 as modified,c15 as pushFlag,c16 as token,c17 as bankName,c18 as bankCode from jnf_t14 where c1=?";

		Map map = jdbcTemplate.queryForMap(querySQL, new Object[] { id });
		if(map != null){
			retDto = new RealNameFlowDto();
			retDto.setId(Integer.parseInt(map.get("id").toString()));
			retDto.setmId(map.get("mId").toString());
			retDto.setBussinessId(map.get("bussinessId") != null ? map.get("bussinessId").toString() : null);
			retDto.setCustId(map.get("custId") != null ? map.get("custId").toString() : null);
			retDto.setCustName(map.get("custName").toString());
			retDto.setIdNo(map.get("idNo").toString());
			retDto.setBankCardNo(map.get("bankCardNo").toString());
			retDto.setMobile(map.get("mobile").toString());
			retDto.setValidateCode(map.get("validateCode") != null ? map.get("validateCode").toString() : null);
			retDto.setState(map.get("state") != null ? map.get("state").toString() : null);
			retDto.setException(map.get("exception") != null ? map.get("exception").toString() : null);
			retDto.setIp(map.get("ip") != null ? map.get("ip").toString() : null);
			retDto.setCreated(map.get("created").toString());
			retDto.setModified(map.get("modified") != null ? map.get("modified").toString() : null);
			retDto.setPushFlag(map.get("pushFlag") != null ? map.get("pushFlag").toString() : null);
			retDto.setToken(map.get("token") != null ? map.get("token").toString() : null);
			retDto.setBankName(map.get("bankName") != null ? map.get("bankName").toString() : null);
			retDto.setBankCode(map.get("bankCode") != null ? map.get("bankCode").toString() : null);
		}
		return retDto;
	}
	
	@SuppressWarnings("rawtypes")
	public static RealNameFlowDto queryMemberFlowByMid(String mid) {
		RealNameFlowDto retDto = null;
		String querySQL = "select c1 as id,c2 as mId,c3 as bussinessId,c4 as custId,c5 as custName,c6 as idNo,c7 as bankCardNo,c8 as mobile,c9 as validateCode,"
				+ "c10 as state,c11 as exception,c12 as ip,c13 as created ,c14 as modified,c15 as pushFlag,c16 as token,c17 as bankName,c18 as bankCode from jnf_t14 where c2=?";

		Map map = jdbcTemplate.queryForMap(querySQL, new Object[] { mid });
		if(map != null){
			retDto = new RealNameFlowDto();
			retDto.setId(Integer.parseInt(map.get("id").toString()));
			retDto.setmId(map.get("mId").toString());
			retDto.setBussinessId(map.get("bussinessId") != null ? map.get("bussinessId").toString() : null);
			retDto.setCustId(map.get("custId") != null ? map.get("custId").toString() : null);
			retDto.setCustName(map.get("custName").toString());
			retDto.setIdNo(map.get("idNo").toString());
			retDto.setBankCardNo(map.get("bankCardNo").toString());
			retDto.setMobile(map.get("mobile").toString());
			retDto.setValidateCode(map.get("validateCode") != null ? map.get("validateCode").toString() : null);
			retDto.setState(map.get("state") != null ? map.get("state").toString() : null);
			retDto.setException(map.get("exception") != null ? map.get("exception").toString() : null);
			retDto.setIp(map.get("ip") != null ? map.get("ip").toString() : null);
			retDto.setCreated(map.get("created").toString());
			retDto.setModified(map.get("modified") != null ? map.get("modified").toString() : null);
			retDto.setPushFlag(map.get("pushFlag") != null ? map.get("pushFlag").toString() : null);
			retDto.setToken(map.get("token") != null ? map.get("token").toString() : null);
			retDto.setBankName(map.get("bankName") != null ? map.get("bankName").toString() : null);
			retDto.setBankCode(map.get("bankCode") != null ? map.get("bankCode").toString() : null);
		}
		return retDto;
	}
	
	
	/**
	 * 此方法来自开发类，此处COPY来
	 * @param num
	 * @return
	 */
	public static String buildCode(int num) {
		String[] str = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" };
		Random rand = new Random();// 创建Random类的对象rand
		String code = "";
		int index = 0;
		for (int i = 0; i < num; ++i) {
			index = rand.nextInt(str.length - 1);// 在0到str.length-1生成一个伪随机数赋值给index
			code += str[index];// 将对应索引的数组与code的变量值相连接
		}
		return code;
	}

}
