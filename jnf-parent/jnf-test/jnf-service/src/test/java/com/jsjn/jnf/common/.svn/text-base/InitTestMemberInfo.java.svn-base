package com.jsjn.jnf.common;

import org.springframework.jdbc.core.JdbcTemplate;

import com.jsjn.jnf.bean.dto.assist.BizConfigDto;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.IdGen;
import com.jsjn.jnf.service.assist.impl.BusinessConfigServiceImpl;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.jnf.service.member.impl.MemberServiceImpl;
import com.jsjn.panda.setup.ParseSpring;
import com.mchange.v2.c3p0.ComboPooledDataSource;

public class InitTestMemberInfo {
	
	private static MemberServiceImpl memberServiceImpl = (MemberServiceImpl) ParseSpring.context.getBean("memberServiceImpl");

	private static BusinessConfigServiceImpl configServiceImpl = (BusinessConfigServiceImpl) ParseSpring.context.getBean("businessConfigServiceImpl");
	
	private static ComboPooledDataSource dataSource = (ComboPooledDataSource) ParseSpring.context.getBean("dataSource");

	private static JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
	
	private static final String mid = "9999";
	
	private static final String investMemberId = SequenceUtils.getMemberInfo(mid);
	public static void initBusinessMember(String mid){
		
		//先删除
		deleteAllMember(mid);
		
		insertInvestMember(mid);
		insertBusinessMember(mid);
		insertBusinessConfig(mid);
		
	}
	
	public static void insertInvestMember(String mid){
		/**
		 * 商户投资人
		 */
		MemberDto memberDto1 = new MemberDto();
		memberDto1.setCustId(investMemberId);
		memberDto1.setCustName(Cryptos.aesEncrypt("常熟市康欣农村小额贷款股份有限公司"));
		memberDto1.setmId(mid);
		memberDto1.setCustType("1");
		memberDto1.setMobile(Cryptos.aesEncrypt("13151591525"));
		memberDto1.setState("1");
		memberDto1.setIsReal("1");
		memberDto1.setRemark("测试专用商户投资人");
		memberDto1.setIdType("2");
		memberDto1.setIdNo(Cryptos.aesEncrypt("913205006902807071"));
		memberDto1.setExtCustId("");
		memberDto1.setInsttuId("320581001");
		memberDto1.setDigest(memberDto1.buildDigest());
		memberDto1.setIsNewRecord(true);
		
		memberServiceImpl.save(memberDto1);
	}
	
	public static void insertBusinessMember(String mid){
		/**
		 * 新增测试商户信息
		 */
		MemberDto memberDto = new MemberDto();
		memberDto.setCustId(SequenceUtils.getMemberInfo(mid));
		memberDto.setCustName(Cryptos.aesEncrypt("测试专用商户"));
		System.out.println(memberDto.getCustName());
		memberDto.setmId(mid);
		memberDto.setCustType("3");
		memberDto.setMobile(Cryptos.aesEncrypt("15705172120"));
		memberDto.setState("1");
		memberDto.setIsReal("1");
		memberDto.setRemark("测试专用商户");
		memberDto.setIdType("2");
		memberDto.setIdNo(Cryptos.aesEncrypt("913205943212172861"));
		memberDto.setExtCustId("");
		memberDto.setInsttuId("");
		memberDto.setDigest(memberDto.buildDigest());
		memberDto.setIsNewRecord(true);
		
		memberServiceImpl.save(memberDto);
	}
	
	public static void insertBusinessConfig(String mid){
		/**
		 * 商户接入信息
		 * 商户公钥
		 		"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5tOCnaxzZPN23w"+
				"W8aubrBeklBLKjZgl3GCT8UozukY1g2efkUuN/GXx1zvAFadfZJ61"+
				"EYyw1uvPG2Q2BBrmz699Dho50aaOyvgWhzvu1YfV/ugJsjCx1IZRr"+
				"PfBd1GbQ8kT4M9O63hi5SVfK+DuR/tveCV+vLi8Eq9wXE8K4eowIDAQAB";
			商户私钥
				"MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALm04KdrHNk83bfB"
				+ "bxq5usF6SUEsqNmCXcYJPxSjO6RjWDZ5+RS438ZfHXO8AVp19knrURjLDW688bZD"
				+ "YEGubPr30OGjnRpo7K+BaHO+7Vh9X+6AmyMLHUhlGs98F3UZtDyRPgz07reGLlJV"
				+ "8r4O5H+294JX68uLwSr3BcTwrh6jAgMBAAECgYBbTI3WQVbhhocKvFK/NOiYDmLN"
				+ "ZANvTCSGJC2bG9VKsHzB652Fjo6VnFWCfL+9lZkMJmCsa8ei1cmP7ff40qRIt7TS"
				+ "Las1+hUo4ZhcpTi+JzBw/h65isleNm3IwaduW2gC+HYDGbbKlBR3dACbysLelt/a"
				+ "1lYWYEFp7xjgaWoDQQJBAOXReaJPPpmDSthJHYSSTXCBsPANZESlNH+VFs62/ajX"
				+ "aC6XzJ9nMhArc54pISMQMkbFgN4RLGJtRQhbHkCBPDsCQQDO3OiKnvfEhHqx8qJd"
				+ "JTXUJjlhhPHFx00StzYv1qFObKdhBVAx+42jRpF8Ml3O4xH2EkYztHJMkzinzaV+"
				+ "e0i5AkEAv2fqzUMA2SxfTqn+mqabNqPdcOFGbGHHyqaqWzpPI6tcSsoFE5IIQS1f"
				+ "Ww/YWHKp3QWrochd1hA52Y7CMGkydwJBAJvr2sORqwPPL4QtdMBsqbQs05dz06DV"
				+ "5nwy6H8Kci9gqpDwpk/mYg4txL8uX5LviLxHbe7PFlAtr8ibsyAw4NECQB9Y/7Tb"
				+ "3v+XLP+7uGnUOwadyW+msUAyXWhMswhSG9bVXHlmPUjUW8vMz03sWItleDVjr/BS" + "2Rg+Y+1cTRzlsR0=";
		 */
		
		BizConfigDto config = new BizConfigDto();
		config.setMid(mid);
		config.setAppkey(IdGen.uuid());
		config.setWhiteList("127.0.0.1");
		config.setRsaPubKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5tOCnaxzZPN23w"+
				"W8aubrBeklBLKjZgl3GCT8UozukY1g2efkUuN/GXx1zvAFadfZJ61"+
				"EYyw1uvPG2Q2BBrmz699Dho50aaOyvgWhzvu1YfV/ugJsjCx1IZRr"+
				"PfBd1GbQ8kT4M9O63hi5SVfK+DuR/tveCV+vLi8Eq9wXE8K4eowIDAQAB");
		config.setDigest(config.buildDigest());
		config.setIsNewRecord(true);
		configServiceImpl.save(config);
	}
	
	/**
	 * 根据商户MID删除所有测试用户数据
	 */
	public static void deleteAllMember(String mid){
		String deleteMemberSQL = "delete from jnf_t2 where c3 = ?";
		jdbcTemplate.update(deleteMemberSQL, new Object[]{mid});
		
		String deleteConfigSQL = "delete from jnf_t5 where c1 = ?";
		jdbcTemplate.update(deleteConfigSQL, new Object[]{mid});
		
		String deleteBindCardSQL = "delete from jnf_t3 where c3 = ?";
		jdbcTemplate.update(deleteBindCardSQL, new Object[]{mid});
		
		String deleteFlowSQL = "delete from jnf_t14 where c2 = ?";
		jdbcTemplate.update(deleteFlowSQL, new Object[]{mid});
	}
	
	/**
	 * 根据MID删除借款用户以及流水
	 * @param mid
	 * @param idNo
	 */
	public static void deleteLoanMember(String mid){
		String deleteMemberSQL = "delete from jnf_t2 where c3 = ? and c4 = 2";
		jdbcTemplate.update(deleteMemberSQL, new Object[]{mid});
		
		String deleteBindCardSQL = "delete from jnf_t3 where c3 = ?";
		jdbcTemplate.update(deleteBindCardSQL, new Object[]{mid});
		
		String deleteFlowSQL = "delete from jnf_t14 where c2 = ?";
		jdbcTemplate.update(deleteFlowSQL, new Object[]{mid});
		
	}
	
	public static void deleteInvestMember(){
		String deleteMemberSQL = "delete from jnf_t2 where c1 = ?";
		jdbcTemplate.update(deleteMemberSQL, new Object[]{investMemberId});
	}
	
	public static void updateInvestDigest(String digest){
		String deleteMemberSQL = "update jnf_t2 set c13= ? where c1 = ?";
		jdbcTemplate.update(deleteMemberSQL, new Object[]{digest,investMemberId});
	}
	
	
	/**
	 * 根据MID获取appKey
	 * @param mid
	 * @return
	 */
	public static String getAppkey(String mid){
		String querySQL = "select c2 as appKey from jnf_t5 where c1 = ?";
		return jdbcTemplate.queryForObject(querySQL, new Object[]{mid}, String.class);
	}
	
}
