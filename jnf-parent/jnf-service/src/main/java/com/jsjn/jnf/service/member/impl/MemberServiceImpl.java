package com.jsjn.jnf.service.member.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.SensitiveInfoUtils;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.ValidatorUtil;
import com.jsjn.jnf.dao.member.MemberDao;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.jnf.service.member.MemberService;

@Service
@Transactional(readOnly = true)
public class MemberServiceImpl extends CrudService<MemberDao, MemberDto>
		implements MemberService {

	private MemberDao dao = (MemberDao) getBean("memberDao");

	@Override
	public List<MemberDto> queryMembers(MemberDto bo) throws Exception {
		/**
		 * 流程逻辑
		 * 
		 * TODO lihanbing
		 * 
		 * 1.前端发送已验证的字段，判断实际参数是否为空。 2.判断如果字段为证件号，姓名 则使用AES加密。
		 * 3.判读如果以时间为查询条件，则将String类型转date类型。 4.将查询条件封装到Map中。 5.dao层处理查询数据。
		 * 6.对加密数据进行解密处理。 7.查询结果脱敏处理（姓名过滤敏，除第一个字显示外，其他文字军用*号替换
		 * 手机号码过滤，189*****158 证件号码过滤敏感信息过滤为 3**************015） 8.return 查询结果
		 */

		// 对查询条件进行加密
		if (!StringUtils.isBlank(bo.getIdNo())) {
			bo.setIdNo(Cryptos.aesEncrypt(bo.getIdNo()));
		}
		if (!StringUtils.isBlank(bo.getCustName())) {
			bo.setCustName(Cryptos.aesEncrypt(bo.getCustName()));
		}

		List<MemberDto> bos = getCrudDao().queryMembers(bo);

		for (MemberDto dto : bos) {
			if (!StringUtils.equals(dto.getDigest(), dto.buildDigest())) {
				logger.error("数据被篡改..." + "数据库存储摘要：" + dto.getDigest()
						+ ";现摘要：" + dto.buildDigest());
				dto.setValid(false);
				dto.setCustName(SensitiveInfoUtils.chineseName(Cryptos
						.aesDecrypt(dto.getCustName())));
				dto.setMobile(SensitiveInfoUtils.mobilePhone(Cryptos
						.aesDecrypt(dto.getMobile())));
				dto.setIdNo(SensitiveInfoUtils.idCardNum(Cryptos.aesDecrypt(dto
						.getIdNo())));
				continue;
			}
			dto.setValid(true);
			dto.setCustName(SensitiveInfoUtils.chineseName(Cryptos
					.aesDecrypt(dto.getCustName())));
			dto.setMobile(SensitiveInfoUtils.mobilePhone(Cryptos.aesDecrypt(dto
					.getMobile())));
			dto.setIdNo(SensitiveInfoUtils.idCardNum(Cryptos.aesDecrypt(dto
					.getIdNo())));
		}

		return bos;
	}

	public MemberDto queryMember(MemberDto dto) throws Exception {

		MemberDto tmp = get(dto);
		if (tmp != null) {
			if (!StringUtils.equals(tmp.getDigest(), tmp.buildDigest())) {
				dto.setResCode(ReturnCode.FAIL);
				dto.setResMsg("客户数据异常");
				logger.info("解签失败..." + "数据库摘要：" + tmp.getDigest() + ";现摘要:"
						+ tmp.buildDigest());
			} else {
				dto.setResCode(ReturnCode.SUCCESS);
				dto.setResMsg("操作成功");
				dto.setCustId(tmp.getCustId());
			}
		} else {
			dto.setResCode(ReturnCode.FAIL);
			dto.setResMsg("客户不存在");
			logger.info("客户不存在");
		}
		return dto;
	}

	@Override
	public String regMember(MemberDto dto) throws Exception {
		dto.setIdNo(Cryptos.aesEncrypt(dto.getIdNo()));// 身份证号码加密
		dto.setCustName(Cryptos.aesEncrypt(dto.getCustName()));// 用户姓名加密
		dto.setMobile(Cryptos.aesEncrypt(dto.getMobile()));// 电话号码加密
		MemberDto tmp = get(dto);
		if (tmp != null) {
			throw new BussinessException(ReturnCode.FAIL, "该客户已经注册");
		}
		if (TabsConstant.MEMBER_INFO_CUSTTYPE_BUSINESS.val().equals(
				dto.getCustType())) {
			// 如果客户类型为商户
			save(dto);
			dto.setResCode(ReturnCode.SUCCESS);
			dto.setResMsg(Global.SUCCESS_MSG);
			String custId = dto.getCustId();
			if (!StringUtils.isBlank(custId)) {
				return custId;
			}
			return "";
		}
		if (TabsConstant.MEMBER_INFO_CUSTTYPE_INVEST.val().equals(
				dto.getCustType())) {
			// TODO 暂时不实现
			return "";
		}
		dto.setIsNewRecord(true);
		dto.setIsReal(TabsConstant.MEMBER_INFO_ISREAL_NOT.val());// 1=认证 2=未认证
		dto.setCustType(TabsConstant.MEMBER_INFO_CUSTTYPE_LOAN.val());// 1=投资者
																		// 2=借款人
																		// 3=商户
		dto.setState(TabsConstant.MEMBER_INFO_STATE_OK.val());// 1=正常 2=冻结
		dto.setIdType(TabsConstant.MEMBER_INFO__TYPE_ID.val());// 证件类型：1=身份证
		dto.setDigest(dto.buildDigest());// 生成摘要
		// 获取当前时间
		// SimpleDateFormat df = new
		// SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
		// String now = df.format(new Date());// new Date()为获取当前系统时间
		// dto.setCreated(df.parse(now));
		// dto.setModified(df.parse(now));
		String seq = SequenceUtils.getMemberInfo(dto.getMId());
		dto.setCustId(seq);
		save(dto);
		dto.setResCode(ReturnCode.SUCCESS);
		dto.setResMsg(Global.SUCCESS_MSG);
		String custId = dto.getCustId();
		if (!StringUtils.isBlank(custId)) {
			return custId;
		}
		return "";
	}

	@Override
	public MemberDto modifyReal(MemberDto dto) throws Exception {
		String[] propertys = { "custName", "mId", "idType", "idNo" };
		String errMsg = "";
		errMsg = ValidatorUtil.validpropertys(dto, propertys);
		if (!StringUtils.isBlank(errMsg)) {
			dto.setResCode(ReturnCode.FAIL);
			dto.setResMsg(errMsg);
			return dto;
		}
		dto.setIsReal(TabsConstant.MEMBER_INFO_ISREAL_OK.val());
		dto.setIsNewRecord(false);
		dto.setIdNo(Cryptos.aesEncrypt(dto.getIdNo()));// 身份证号码加密
		dto.setCustName(Cryptos.aesEncrypt(dto.getCustName()));// 用户姓名加密
		dto.setDigest(dto.buildDigest());
		save(dto);
		return dto;
	}

	@Override
	protected MemberDao getCrudDao() {
		return dao;
	}

	@Override
	/**
	 * TODO lihanbing
	 */
	public MemberDto queryMember(String custId) throws Exception {

		MemberDto member = dao.queryMember(custId);
		if (member == null) {
			logger.error("系统未查询到相关用户信息");
			throw new BussinessException(ReturnCode.FAIL, "系统未查询到相关用户信息");
		} else {
			// 用户信息进行摘要处理
			String mobile = Cryptos.aesDecrypt(member.getMobile());
			String custName = Cryptos.aesDecrypt(member.getCustName());
			String idNo = Cryptos.aesDecrypt(member.getIdNo());
			member.setMobile(mobile);
			member.setCustName(custName);
			member.setIdNo(idNo);
		}
		return member;
	}

	@Override
	public MemberDto findCust(String mid, String idNo) throws Exception {
		idNo = Cryptos.aesEncrypt(idNo);
		MemberDto memberDto = dao.findCust(mid, idNo);
		return memberDto;
	}

	@Override
	public String findOrgNo(String mid) throws Exception {
		String result = dao.findOrgNo(mid,
				TabsConstant.MEMBER_INFO_CUSTTYPE_INVEST.val());
		if (StringUtils.isBlank(result)) {
			return "";
		} else {
			return result;
		}
	}

	@Override
	public MemberDto queryMemberById(String custId) throws BussinessException {
		MemberDto retDto = dao.queryMemberById(custId);
		if (retDto == null) {
			logger.error("客户号为" + custId + "的客户不存在");
			throw new BussinessException(ReturnCode.RESPONSE_NO_DATA_FOUND,
					"客户号为" + custId + "的客户不存在");
		}
		if (!StringUtils.equals(retDto.getDigest(), retDto.buildDigest())) {
			logger.info("解签失败..." + "数据库摘要：" + retDto.getDigest() + ";现摘要:"
					+ retDto.buildDigest());
			throw new BussinessException(ReturnCode.FAIL, "客户数据异常");
		}

		retDto.setResCode(ReturnCode.SUCCESS);
		retDto.setResMsg("操作成功");
		return retDto;
	}

	@Override
	public MemberDto queryInvestInfo(String mid) throws BussinessException {
		MemberDto retDto = dao.queryInvestInfo(mid);
		if (retDto == null) {
			logger.error("商户号为" + mid + "无投资人");
			throw new BussinessException(ReturnCode.RESPONSE_NO_DATA_FOUND,
					"商户号为" + mid + "无投资人");
		}
		if (!StringUtils.equals(retDto.getDigest(), retDto.buildDigest())) {
			logger.info("解签失败..." + "数据库摘要：" + retDto.getDigest() + ";现摘要:"
					+ retDto.buildDigest());
			throw new BussinessException(ReturnCode.FAIL, "投资人信息异常");
		}

		retDto.setResCode(ReturnCode.SUCCESS);
		retDto.setResMsg("操作成功");
		return retDto;

	}

	@Override
	public int updateMember(MemberDto dto) throws Exception {
		String[] propertys = { "custName", "mId", "mobile", "idType", "idNo" };
		String errMsg = "";
		errMsg = ValidatorUtil.validpropertys(dto, propertys);
		if (!StringUtils.isBlank(errMsg)) {
			dto.setResCode(ReturnCode.FAIL);
			dto.setResMsg(errMsg);
			return -1;
		}
		/**
		 * 检查该用户是否注册
		 */
		MemberDto tmp = get(dto);
		if (tmp != null) {
			logger.error("该客户已经注册");
			throw new BussinessException(ReturnCode.FAIL, "该客户已经注册");
		}

		dto.setIdNo(Cryptos.aesEncrypt(dto.getIdNo()));// 身份证号码加密
		dto.setCustName(Cryptos.aesEncrypt(dto.getCustName()));// 用户姓名加密
		dto.setMobile(Cryptos.aesEncrypt(dto.getMobile()));// 电话号码加密
		dto.setDigest(dto.buildDigest());
		return dao.updateMember(dto);
	}

	@Override
	public MemberDto queryMemberInfo(String mid, String custType) {
		return dao.queryMemberInfo(mid, custType);
	}

	@Override
	public int updateMobile(String custId, String mobile, String digest) {
		return dao.updateMobile(custId, mobile, digest);
	}

	/**
	 * 查询投资人是否存在
	 */
	@Override
	public MemberDto queryInvest(MemberDto dto) {
		return dao.queryInvest(dto);
	}

	/**
	 * 注册投资人
	 */
	@Override
	public String regInvest(MemberDto dto) throws Exception {
		/**
		 * 1、检查投资人是否存在 2、如果存在则提示错误 3、如果不存在，注册投资人
		 */

		String[] propertys = { "custName", "mId", "mobile", "idType", "idNo" };
		String errMsg = "";
		errMsg = ValidatorUtil.validpropertys(dto, propertys);
		if (!StringUtils.isBlank(errMsg)) {
			logger.error("参数输入有误" + errMsg);
			dto.setResCode(ReturnCode.FAIL);
			dto.setResMsg(errMsg);
			return "";
		}

		dto.setIdNo(Cryptos.aesEncrypt(dto.getIdNo()));// 身份证号码加密
		dto.setCustName(Cryptos.aesEncrypt(dto.getCustName()));// 用户姓名加密
		dto.setMobile(Cryptos.aesEncrypt(dto.getMobile()));// 电话号码加密
		MemberDto tmp = queryInvest(dto);
		if (tmp != null) {
			logger.error("该投资人已经注册");
			throw new BussinessException(ReturnCode.FAIL, "该投资人已经注册");
		}

		String seq = SequenceUtils.getMemberInfo(dto.getMId());
		dto.setCustType(TabsConstant.MEMBER_INFO_CUSTTYPE_INVEST.val());// 1=投资者
																		// 2=借款人
																		// 3=商户
		dto.setIsReal(TabsConstant.MEMBER_INFO_ISREAL_OK.val());// 1=认证 2=未认证
		dto.setDigest(dto.buildDigest());// 生成摘要
		dto.setCustId(seq);
		dto.setIsNewRecord(true);
		save(dto);
		dto.setResCode(ReturnCode.SUCCESS);
		dto.setResMsg(Global.SUCCESS_MSG);
		String custId = dto.getCustId();
		if (!StringUtils.isBlank(custId)) {
			return custId;
		}
		return "";

	}

	/**
	 * 根据机构号查询用户信息
	 * 
	 * @author yincy
	 * 
	 * @param insttuId
	 * @param mid
	 * @throws BussinessException
	 */
	@Override
	public MemberDto queryMemberByInsttuId(String insttuId, String mid)
			throws BussinessException {
		MemberDto retDto = dao.queryMemberByInsttuId(insttuId, mid);
		if (retDto == null) {
			logger.error("机构不存在：");
			logger.error("机构号为：" + insttuId);
			throw new BussinessException(ReturnCode.FAIL, "该机构未在金农付登记");
		}
		if (!StringUtils.equals(retDto.getDigest(), retDto.buildDigest())) {
			logger.error("用户表T2解签失败...");
			logger.error("数据库摘要: " + retDto.getDigest());
			logger.error("现摘要: " + retDto.buildDigest());
			throw new BussinessException(ReturnCode.FAIL, "投资人信息异常");
		}
		return retDto;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.jsjn.jnf.service.member.MemberService#queryMemberByInsttuIdTwo(java
	 * .lang.String)
	 */
	@Override
	public MemberDto queryMemberByInsttuIdTwo(String insttuId) {
		MemberDto retDto = dao.queryMemberByInsttuId(insttuId, null);
		return retDto;
	}

	@Override
	public List<MemberDto> queryInsttuListByMid(String mid)
			throws BussinessException {
		return dao.getInsttuListByMid(mid);
	}

}
