package com.jsjn.jnf.integration.interfaces;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;

import org.apache.log4j.Logger;

import com.jsjn.jnf.bean.bo.integration.CardBinReqDto;
import com.jsjn.jnf.bean.bo.integration.CardBinRspDto;
import com.jsjn.jnf.bean.bo.integration.SingleWithholdReqDto;
import com.jsjn.jnf.bean.bo.integration.SingleWithholdRspDto;
import com.jsjn.jnf.bean.bo.integration.WhiteListSignReqDto;
import com.jsjn.jnf.bean.bo.integration.WhiteListSignRspDto;
import com.jsjn.jnf.bean.bo.integration.WithholdStatusReqDto;
import com.jsjn.jnf.bean.bo.integration.WithholdStatusRspDto;
import com.jsjn.jnf.common.mapper.JaxbMapper;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.DateUtils;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.network.TcpClient;
import com.jsjn.jnf.dao.assist.DictDao;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 中间系统提供的接口
 * 
 * @author xiekaixiang
 * 
 */
public class IntermediateSystem {

	private final static Logger logger = Logger.getLogger(IntermediateSystem.class);
	private static DictDao dao = (DictDao) ParseSpring.context.getBean("dictDao");
	private static String IP = "";
	private static String PORT = "";
	private static String KEY = "";
	private static int TIME_OUT = 0;
	
	static{
		IP = dao.findByType("TCP_SERVER_IP");
		PORT = dao.findByType("TCP_SERVER_PORT");
		KEY = Cryptos.aesDecrypt(dao.findByType("TCP_CONNECT_KEY"));
		TIME_OUT = StringUtils.toInteger(dao.findByType("INTER_SYS_TIME_OUT"));
	}

	/**
	 * 白名单签约
	 * 
	 * @param reqDto
	 * @return
	 * @throws IOException
	 */
	public static WhiteListSignRspDto WhiteListSign(WhiteListSignReqDto reqDto) throws IOException, NoSuchAlgorithmException {
		logger.info("method:WhiteListSign-->input :" + reqDto);
		WhiteListSignRspDto whiteListSignRspDto = null;
		reqDto.setTranCd("7820");// 设置交易码
		reqDto.setOrgNo(reqDto.getOrgNo());
		reqDto.setTranDt(DateUtils.getDate("yyyyMMdd"));
		
		// 把输入参数转换成xml
		String reqXml = JaxbMapper.toXml(reqDto, "GBK").replaceAll("\r|\n", "");
		whiteListSignRspDto = JaxbMapper.fromXml(TcpClient.getData(IP,PORT,reqXml,KEY,TIME_OUT), WhiteListSignRspDto.class);
//		WhiteListSignRspDto whiteListSignRspDto = new WhiteListSignRspDto();
//		whiteListSignRspDto.setResCode("000000");
//		whiteListSignRspDto.setResMsg("成功");
//		whiteListSignRspDto.setSignNo("AAAAAAAA");
		logger.info("method:WhiteListSign-->output" + whiteListSignRspDto);
		return whiteListSignRspDto;
	}

	/**
	 * 单笔代扣
	 * 
	 * @param reqDto
	 * @return
	 * @throws IOException
	 */
	public static SingleWithholdRspDto singleWithhold(SingleWithholdReqDto reqDto) throws IOException, NoSuchAlgorithmException {
		logger.info("method:singleWithhold-->input :" + reqDto);
		SingleWithholdRspDto singleWithholdRspDto = null;
		StringBuilder xmlString = new StringBuilder();
		reqDto.setTranCd("7826");// 设置交易码
		reqDto.setOrgNo(reqDto.getOrgNo());
		reqDto.setTranDt(DateUtils.getDate("yyyyMMdd"));
		
		// 把输入参数转换成xml
		String reqXml = JaxbMapper.toXml(reqDto, "GBK").replaceAll("\r|\n", "");
		xmlString.append(String.format("%04d", reqXml.length())).append(reqXml);
		singleWithholdRspDto = JaxbMapper.fromXml(TcpClient.getData(IP,PORT,reqXml,KEY,TIME_OUT), SingleWithholdRspDto.class);
		logger.info("method:singleWithhold-->output" + singleWithholdRspDto);
		return singleWithholdRspDto;
	}

	/**
	 * 卡BIN查询
	 * 
	 * @param accountNo
	 * @return
	 * @throws IOException
	 * @throws NoSuchAlgorithmException 
	 */
	public static CardBinRspDto cardBinQry(String accountNo) throws IOException, NoSuchAlgorithmException {
	    logger.info("method:cardBinQry-->input :" + accountNo);
		CardBinRspDto cardBinRspDto = null;
		CardBinReqDto cardBinReqDto = new CardBinReqDto();
		cardBinReqDto.setAccountNo(accountNo);
		cardBinReqDto.setOrgNo("320115001");
		cardBinReqDto.setTranDt(DateUtils.getDate("yyyyMMdd"));
		cardBinReqDto.setTranCd("7827");
		// 把输入参数转换成xml
		String reqXml = JaxbMapper.toXml(cardBinReqDto, "gbk").replaceAll("\r|\n", "");
		cardBinRspDto = JaxbMapper.fromXml(TcpClient.getData(IP,PORT,reqXml,KEY,TIME_OUT), CardBinRspDto.class);
		logger.info("method:cardBinQry-->output" + cardBinRspDto);
		return cardBinRspDto;
	}

	/**
	 * 代扣状态查询
	 * 
	 * @param accountNo
	 * @return
	 * @throws IOException
	 */
	public static WithholdStatusRspDto withholdStatusQry(String orderNo,String orgNo) throws IOException, NoSuchAlgorithmException {
	    logger.info("method:withholdStatusQry-->input :" + orderNo);
		WithholdStatusRspDto withholdStatusRspDto = null;
		WithholdStatusReqDto withholdStatusReqDto = new WithholdStatusReqDto();
		withholdStatusReqDto.setOrderNo(orderNo);
		withholdStatusReqDto.setTranCd("7828");// 设置交易码
		withholdStatusReqDto.setOrgNo(orgNo);
		withholdStatusReqDto.setTranDt(DateUtils.getDate("yyyyMMdd"));
		
		// 把输入参数转换成xml
		String reqXml = JaxbMapper.toXml(withholdStatusReqDto, "GBK").replaceAll("\r|\n", "");
		withholdStatusRspDto = JaxbMapper.fromXml(TcpClient.getData(IP,PORT,reqXml,KEY,TIME_OUT), WithholdStatusRspDto.class);
		logger.info("method:withholdStatusQry-->output" + withholdStatusRspDto);
		return withholdStatusRspDto;
	}

	public static void main(String[] args) throws IOException, NoSuchAlgorithmException {
//		WhiteListSignReqDto reqDto = new WhiteListSignReqDto();
//		reqDto.setAccountNo("6225881111111111");
//		reqDto.setAddress("江苏南京");
//		reqDto.setBankCode("0308");
//		reqDto.setBankName("南京银行");
//		reqDto.setCardType("1");
//		reqDto.setOrgNo("320115001");
//		reqDto.setCustSignNo("123");
//		reqDto.setIdNo("32112212214456746484");
//		reqDto.setIdType("0");
//		reqDto.setName("张三");
//		reqDto.setPhoneNo("13212312321");
//		reqDto.setSignFlag("1");
//		SingleWithholdReqDto reqDto1 = new SingleWithholdReqDto();
//		reqDto1.setAmount(new BigDecimal("123"));
//		reqDto1.setCustSignNo("123");
//		reqDto1.setOrderNo("24234234121");
//		reqDto1.setSign("1");
//		reqDto1.setSignNo("7889");
//		System.out.println(WhiteListSign(reqDto));// 白名单签约
//		System.out.println(singleWithhold(reqDto1));// 单笔代扣
		System.out.println("返回的字符："+cardBinQry("6225881111111111"));// 卡BIN查询
//		System.out.println(withholdStatusQry("242342342"));// 代扣状态查询
		
		
	}
}
