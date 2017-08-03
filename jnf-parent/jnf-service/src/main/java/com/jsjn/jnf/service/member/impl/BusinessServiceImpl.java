package com.jsjn.jnf.service.member.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.dto.assist.ApiRoleCtrlDto;
import com.jsjn.jnf.bean.dto.assist.BizConfigDto;
import com.jsjn.jnf.bean.dto.assist.DigestDto;
import com.jsjn.jnf.bean.dto.member.BussinessDto;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.bean.dto.member.RoleDto;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.security.Digests;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.ValidatorUtil;
import com.jsjn.jnf.dao.member.BussinessDao;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.jnf.service.member.BusinessService;
import com.jsjn.jnf.service.member.MemberService;
import com.jsjn.panda.setup.ParseSpring;

@Service
@Transactional(readOnly = true)
public class BusinessServiceImpl extends
		CrudService<BussinessDao, BussinessDto> implements BusinessService {
	private BussinessDao dao = getCrudDao();
	private MemberService memberService = (MemberService) ParseSpring.context
			.getBean("memberServiceImpl");

	@Override
	public Boolean isOpen(String mid) {
		if (StringUtils.isBlank(mid)) {
			return false;
		}
		BussinessDto dto = get(mid);
		if (dto != null) {
			return StringUtils.equals(
					TabsConstant.BUSINESS_INFO_STATE_OK.val(), dto.getStatus());
		} else {
			return false;
		}
	}

	@Override
	public BussinessDto queryBusinessById(String mid) {
		BussinessDto dto = get(mid);
		return dto;
	}

	@Override
	public BussinessDto saveBusinessInfo(BussinessDto dto) throws Exception {
		/**
		 * 商户新增功能 1、使用validation方法对dto进行校验(商户名称，证件号码，联系电话，联系地址，状态) 2、检查证件号码是否被使用
		 * 3、生成商户编号（问题：前端页面，该字段是否可以不显示） 3、新增数据，操作jnf_t1 和 jnf_t2
		 */

		// 校验dto相关数据
		String[] propertys = { "mName", "busLcnsNo", "phoneNo", "addr",
				"status" };
		String errMsg = ValidatorUtil.validpropertys(dto, propertys);

		if (!StringUtils.isBlank(errMsg)) {
			logger.error("输入参数不合法！" + errMsg);
			throw new Exception("输入参数不合法！" + errMsg);
		}

		// 判断证件号码是否注册过
		BussinessDto tmp = get(dto);
		if (tmp != null) {
			logger.error("该证件号码已被注册！");
			throw new Exception("该证件号码已被注册！");
		}
		// TODO 校验营业执照 或 三证统一 正确性

		// 生成商户编号，新增数据jnf_t1
		String mid = SequenceUtils.getBusInfo();
		dto.setIsNewRecord(true);
		dto.setMid(mid);
		save(dto);

		// 操作数据库关联表 jnf_t2
		String custId = SequenceUtils.getMemberInfo(mid);
		MemberDto memberDto = new MemberDto();
		memberDto.setIsNewRecord(true);
		memberDto.setCustId(custId);
		memberDto.setCustName(dto.getMName());
		memberDto.setMobile(dto.getPhoneNo());
		memberDto.setMId(mid);
		memberDto.setCustType(TabsConstant.MEMBER_INFO_CUSTTYPE_BUSINESS.val());
		memberDto.setState(TabsConstant.MEMBER_INFO_STATE_OK.val());
		memberDto.setIsReal(TabsConstant.MEMBER_INFO_ISREAL_OK.val());
		memberDto.setIdType(TabsConstant.MEMBER_INFO__TYPE_REGNO.val());
		memberDto.setIdNo(dto.getBusLcnsNo());
		memberDto.setDigest(memberDto.buildDigest());
		String custIdReturn = memberService.regMember(memberDto);
		if (StringUtils.equals(custIdReturn, "")) {
			logger.error("更新会员信息表失败！");
			throw new Exception("更新会员信息表失败！");
		}
		return dto;
	}

	@Override
	public List<BussinessDto> findBussiness(String mid, String mName,
			String status) throws Exception {
		/**
		 * 根据商户号，商户名称，状态 查询商户信息列表 1、mid，mName，status为查询条件，可以为空，不做校验。
		 */

		return dao.findBussiness(mid, mName, status);
	}

	@Override
	public BussinessDto updateBussinessInfo(BussinessDto dto) throws Exception {
		/**
		 * 商户信息修改功能 1、使用validation方法对dto进行校验(mid 商户名称，证件号码，联系电话，联系地址，状态)
		 * 2、检查证件号码是否被使用（ mid不是自己的） 3、修改数据，操作jnf_t1 和 jnf_t2
		 */

		// 校验dto相关数据
		String[] propertys = { "mid", "mName", "busLcnsNo", "phoneNo", "addr",
				"status" };
		String errMsg = ValidatorUtil.validpropertys(dto, propertys);

		if (!StringUtils.isBlank(errMsg)) {
			logger.error("输入参数不合法！" + errMsg);
			throw new Exception("输入参数不合法！" + errMsg);
		}

		// 判断证件号码是否注册过
		BussinessDto tmp = dao.regNoIsRegiset(dto.getMid(), dto.getBusLcnsNo());
		if (tmp != null) {
			logger.error("该证件号码已被注册！");
			throw new Exception("该证件号码已被注册！");
		}
		// TODO 校验营业执照 或 三证统一 正确性

		// 修改数据jnf_t1
		dto.setIsNewRecord(false);
		save(dto);

		// 操作数据库关联表 jnf_t2 问题：类型为商户，商户为mid只会有一条
		MemberDto memberDto = memberService.queryMemberInfo(dto.getMid(),
				TabsConstant.MEMBER_INFO_CUSTTYPE_BUSINESS.val());
		memberDto.setMId(dto.getMid());
		memberDto.setCustName(dto.getMName());
		memberDto.setIdNo(dto.getBusLcnsNo());
		memberDto.setMobile(dto.getPhoneNo());
		memberDto.setState(dto.getStatus());
		memberDto.setDigest(memberDto.buildDigest());
		int custIdReturn = memberService.updateMember(memberDto);
		if (custIdReturn < 0) {
			logger.error("更新会员信息表失败！");
			throw new Exception("更新会员信息表失败！");
		}
		return dto;
	}

	@Override
	public List<String> findBussinessAuth(String mid) throws Exception {
		/**
		 * 根据商户号，查找当前用户权限列表 1、商户号为必填，做非空校验
		 */
		if (StringUtils.isBlank(mid)) {
			logger.error("商户号不能为空！");
			throw new Exception("商户号不能为空！");
		}
		return dao.findBussinessAuth(mid);
	}

	/**
	 * 删除商户权限
	 * 
	 * @param mid
	 * @return
	 * @throws Exception
	 */
	@Override
	@Transactional(readOnly = false)
	public int deleteBussinessAuth(String mid) throws Exception {
		if (StringUtils.isBlank(mid)) {
			throw new Exception("参数非法");
		}
		int countDelete = dao.deleteBussinessAuth(mid);
		return countDelete;
	}

	@Transactional(readOnly = false, rollbackFor = { RuntimeException.class,
			Exception.class })
	@Override
	public boolean updateBussinessAuth(String[] roles, String mid)
			throws Exception {
		/**
		 * 修改mid商户的权限 1、mid为必输入，做mid非空校验 2、删除商户号为mid用户的当前所有权限 操作jnf_t7表
		 * 3、将权限数组和mid组装成一个list,作为参数传入 4、执行sql，批量插入商户权限
		 */
		if (StringUtils.isBlank(mid)) {
			logger.error("商户号不能为空！");
			throw new Exception("商户号不能为空！");
		}
		int countDelete = deleteBussinessAuth(mid);

		/**
		 * 如果roles=null,相当于删除
		 */
		if (countDelete >= 0 && roles == null) {
			return true;
		}

		if (countDelete >= 0 && roles != null) {
			List<ApiRoleCtrlDto> list = new ArrayList<ApiRoleCtrlDto>();
			for (int i = 0; i < roles.length; i++) {
				ApiRoleCtrlDto dto = new ApiRoleCtrlDto();
				dto.setMid(mid);
				dto.setPerid(Long.parseLong(roles[i]));
				list.add(dto);
			}
			int countInsert = dao.insertBussinessAuth(list);
			if (countInsert >= 0) {
				return true;
			}
		}
		return false;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.jsjn.jnf.service.member.BusinessService#qryBusnessAll(java.lang.String
	 * )
	 */
	@Override
	public Map<String, Object> qryBusnessAll(String mid) throws Exception {
		logger.info("=========进入查询商户信息 qryBusnessAll");
		Map<String, Object> map = new HashMap<String, Object>();
		BussinessDto bussinessDto = getCrudDao().qryBusnessByMid(mid);
		BizConfigDto bussinessConfigDto = getCrudDao().qryBussinessConfigByMid(
				mid);
		List<RoleDto> list = getCrudDao().qryApiRole(mid);
		List<RoleDto> perList = getCrudDao().qryPerowRole();
		map.put("busness", bussinessDto);
		map.put("busnessCfg", bussinessConfigDto);
		map.put("list", list);
		map.put("perList", perList);
		return map;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.jsjn.jnf.service.member.BusinessService#qryRoleAll()
	 */
	@Override
	public Map<String, Object> qryRoleAll() throws Exception {
		logger.info("===============进入查询接入配置信息 qryRoleAll");
		Map<String, Object> map = new HashMap<String, Object>();
		List<RoleDto> perList = getCrudDao().qryPerowRole();
		map.put("perList", perList);
		return map;
	}

	private void operaBunes(BussinessDto bussinessDto,
			BizConfigDto bizConfigDto, String role[], boolean flag)
			throws Exception {
		if (flag)
			amendBunes(bussinessDto, bizConfigDto, role);
		else
			createBunes(bussinessDto, bizConfigDto, role);
	}

	/**
	 * @param bussinessDto
	 * @param bizConfigDto
	 * @param role
	 * @throws Exception
	 */
	private void createBunes(BussinessDto bussinessDto,
			BizConfigDto bizConfigDto, String[] role) throws Exception {
		int num = getCrudDao().insert(bussinessDto);
		if (num <= 0) {
			throw new Exception("添加商户信息失败");
		}
		bizConfigDto.setAppkey(Digests.md5(bizConfigDto.getMid()));
		bizConfigDto.setDigest(bizConfigDto.buildDigest());
		num = getCrudDao().createBizConfig(bizConfigDto);
		if (num <= 0) {
			throw new Exception("添加接入配置信息失败");
		}
		operaRole(role, bussinessDto.getMid());
	}

	private void amendBunes(BussinessDto bussinessDto,
			BizConfigDto bizConfigDto, String role[]) throws Exception {
		int num = getCrudDao().update(bussinessDto);
		if (num <= 0) {
			throw new Exception("商户信息修改失败");
		}
		num = getCrudDao().amendBizConfig(bizConfigDto);
		if (num <= 0) {
			throw new Exception("接入配置信息修改失败");
		}
		operaRole(role, bussinessDto.getMid());
	}

	/**
	 * 修改接入配置信息
	 * 
	 * @param role
	 * @param mid
	 * @throws Exception
	 */
	private void operaRole(String[] role, String mid) throws Exception {
		int num = 0;
		try {
			getCrudDao().deleteBussinessAuth(mid);
		} catch (Exception e) {
			throw new Exception("權限信息修改失败");
		}
		if (role != null && !StringUtils.isBlank(role[0])) {
			List<ApiRoleCtrlDto> list = new ArrayList<ApiRoleCtrlDto>();
			for (int i = 0; i < role.length; i++) {
				ApiRoleCtrlDto apiRoleCtrlDto = new ApiRoleCtrlDto();
				apiRoleCtrlDto.setMid(mid);
				apiRoleCtrlDto.setPerid(Long.parseLong(role[i]));
				list.add(apiRoleCtrlDto);
			}
			num = getCrudDao().insertBussinessAuth(list);
			if (num <= 0) {
				throw new Exception("權限信息修改失败");
			}
		}
	}

	/**
	 * 信息效验
	 * 
	 * @param bussinessDto
	 * @param bizConfigDto
	 * @throws Exception
	 */
	private void valiData(BussinessDto bussinessDto, BizConfigDto bizConfigDto,
			boolean flag, String[] role) throws Exception {
		// 判断mid是否为空
		if (StringUtils.isBlank(bussinessDto.getMid())) {
			throw new Exception("商户号不得为空");
		}
		// 效验商户
		String errMsg = ValidatorUtil.validObj(bussinessDto);
		if (!StringUtils.isBlank(errMsg)) {
			throw new Exception(errMsg);
		}
		// 效验接入信息
		errMsg = ValidatorUtil.validObj(bizConfigDto);
		if (!StringUtils.isBlank(errMsg)) {
			throw new Exception(errMsg);
		}
		// 操作数据层
		operaBunes(bussinessDto, bizConfigDto, role, flag);
	}

	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW, rollbackFor = {
			RuntimeException.class, Exception.class })
	@Override
	public Map<String, Object> createBusness(BussinessDto bussinessDto,
			BizConfigDto bizConfigDto, String[] role) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		// 效验信息
		valiData(bussinessDto, bizConfigDto, false, role);
		map.put("success", true);
		map.put("infoMsg", "添加成功");
		return map;
	}

	@Override
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW, rollbackFor = {
			RuntimeException.class, Exception.class })
	public Map<String, Object> amendBusness(BussinessDto bussinessDto,
			BizConfigDto bizConfigDto, String[] role) throws Exception {
		logger.info("=========进入修改商户所有信息");
		Map<String, Object> map = new HashMap<String, Object>();
		// 效验信息格式
		valiData(bussinessDto, bizConfigDto, true, role);
		map.put("success", true);
		map.put("infoMsg", "修改成功");
		return map;
	}

	@Override
	protected BussinessDao getCrudDao() {
		return (BussinessDao) ParseSpring.context.getBean("bussinessDao");
	}

	public static void main(String[] args) throws Exception {
	}

}
