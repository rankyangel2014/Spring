package com.jsjn.jnf.service.assist.impl;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.dto.assist.BizConfigDto;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.utils.IdGen;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.ValidatorUtil;
import com.jsjn.jnf.dao.assist.BizConfigDao;
import com.jsjn.jnf.service.assist.BusinessConfigService;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.panda.setup.ParseSpring;

@Service
@Transactional(readOnly = true)
public class BusinessConfigServiceImpl extends CrudService<BizConfigDao, BizConfigDto> implements BusinessConfigService {
	private BizConfigDao dao = (BizConfigDao) ParseSpring.context.getBean("bizConfigDao");

	private final static Logger logger = Logger.getLogger(BusinessConfigServiceImpl.class);

	@Override
	protected BizConfigDao getCrudDao() {
		return dao;
	}

	@Override
	@Transactional(readOnly = false)
	public BizConfigDto saveBussinessConfig(BizConfigDto config) throws Exception {
		/**
		 * 保存商户接入配置：新增和修改功能 一、检查dto中，商户号和appkey是否为空。若为空：则是新增操作。 若不为空，则是修改操作。
		 * 二、新增操作 1、生成商户号和appkey（商户号序列生成，不存在重复）
		 * 2、使用validation方法对dto进行校验（商户号，appkey，ip白名单，商户公钥） 3、插入数据库，操作jnf_t5
		 * 三、修改操作 1、使用validation方法对dto进行校验（商户号，appkey，ip白名单，商户公钥）
		 * 2、根据商户号查询该条记录。比较摘要，判断数据是否被篡改 3、若没有被篡改，根据商户号和appkey，修改查询出来的记录。
		 * 如果修改条数=1：则成功。 修改条数=0：说明商户号或appkey传入时被篡改，提示数据不正确 若<0：系统异常
		 */

		String appKey = config.getAppkey();
		if (StringUtils.isBlank(appKey)) {
			//新增操作
			config.setAppkey(IdGen.randomBase62(32));
			return insertBussinessConfig(config);
		}
		if (!StringUtils.isBlank(appKey)) {
			//修改操作（mid和appkey 不允许修改）
			return updateBussinessConfig(config);
		}
		//属于异常数据
		logger.info("数据异常!");
		config.setResCode(ReturnCode.FAIL);
		config.setResMsg("数据异常!");
		return config;
	}

	/**
	 * 新增商户配置信息
	 * 
	 * @param config
	 * @return
	 * @throws Exception
	 */
	private BizConfigDto insertBussinessConfig(BizConfigDto config) throws Exception {
		String[] propertys = { "appkey", "mid", "whiteList", "rsaPubKey" };
		String errMsg = ValidatorUtil.validpropertys(config, propertys);
		if (!StringUtils.isBlank(errMsg)) {
			logger.error("输入参数不合法！" + errMsg);
			throw new Exception("输入参数不合法！" + errMsg);
		}

		/**
		 * 查询商户公钥，不能重复
		 */
		BizConfigDto temp = dao.qryByPubKey(config.getMid(), config.getRsaPubKey());
		if (temp != null) {
			logger.error("商户公钥已存在，不允许重复！");
			throw new Exception("商户公钥已存在，不允许重复！");
		}

		config.setDigest(config.buildDigest());
		int count = dao.insert(config);
		if (count > 0) {
			config.setResCode(ReturnCode.SUCCESS);
			config.setResMsg("保存商户配置成功！");
		} else {
			logger.info("保存商户配置出错!");
			config.setResCode(ReturnCode.FAIL);
			config.setResMsg("保存商户配置出错!");
		}
		return config;
	}

	/**
	 * 修改商户配置信息
	 * 
	 * @param config
	 * @return
	 * @throws Exception
	 */
	private BizConfigDto updateBussinessConfig(BizConfigDto config) throws Exception {
		String[] propertys = { "mid", "appkey", "whiteList", "rsaPubKey" };
		String errMsg = ValidatorUtil.validpropertys(config, propertys);
		if (!StringUtils.isBlank(errMsg)) {
			logger.error("输入参数不合法！" + errMsg);
			throw new Exception("输入参数不合法！" + errMsg);
		}

		//根据mid查询当前商户
		BizConfigDto dto = dao.queryBussinessConfigByMid(config.getMid());
		if (!dto.getDigest().equals(dto.buildDigest())) {
			logger.error("该商户接入配置信息已被篡改！");
			throw new Exception("该商户接入配置信息已被篡改！");
		}
		//比较 appKey 判断，当前用户是否修改自己数据
		if (!config.getAppkey().equals(dto.getAppkey())) {
			logger.error("商户的appKey不能被修改！");
			throw new Exception("商户的appKey不能被修改！");
		}

		/**
		 * 查询商户公钥，不能重复
		 */
		BizConfigDto temp = dao.qryByPubKey(config.getMid(), config.getRsaPubKey());
		if (temp != null) {
			logger.error("商户公钥已存在，不允许重复！");
			throw new Exception("商户公钥已存在，不允许重复！");
		}

		config.setDigest(config.buildDigest());
		int count = dao.update(config);
		if (count > 0) {
			config.setResCode(ReturnCode.SUCCESS);
			config.setResMsg("修改商户配置成功！");
		} else {
			logger.info("修改商户配置出错!");
			config.setResCode(ReturnCode.FAIL);
			config.setResMsg("修改商户配置出错!");
		}
		return config;
	}

	@Override
	public BizConfigDto queryBussinessConfig(BizConfigDto config) throws BussinessException {
		String appkey = config.getAppkey();
		String mid = config.getMid();

		BizConfigDto retDto = get(config);

		//校验传入参数
		if (StringUtils.isBlank(appkey) && StringUtils.isBlank(mid)) {
			logger.error("appkey和mid不能同时为空");
			throw new BussinessException(ReturnCode.FAIL, "appkey和mid不能同时为空");
		}

		//判断返回结果
		if (retDto == null) {
			logger.error("传入appKey或mid有误");
			throw new BussinessException(ReturnCode.FAIL, "传入appKey或mid有误");
		}

		//摘要判断
		if (!StringUtils.equals(retDto.buildDigest(), retDto.getDigest())) {
			logger.error("商户配置数据异常");
			throw new BussinessException(ReturnCode.FAIL, "商户配置数据异常");
		}
		return retDto;
	}

	@Override
	public BizConfigDto queryBussinessConfigByMid(String mid) throws BussinessException {
		/**
		 * 根据mid查询商户接入配置 1、mid必传，非空校验 2、查询jnf_t5表
		 * 3、取出查询结果，做成摘要，和原摘要比较。若不等，则设置错误信息：数据被篡改 4、若相等，展示数据。
		 */
		if (StringUtils.isBlank(mid)) {
			logger.error("输入参数不合法！");
			throw new BussinessException(ReturnCode.FAIL, "输入参数不合法！");
		}
		BizConfigDto dto = dao.queryBussinessConfigByMid(mid);
		if (dto != null) {
			if (!dto.getDigest().equals(dto.buildDigest())) {
				logger.error("该商户接入配置信息已被篡改！");
				dto.setValid(false);
				return dto;
			}
			dto.setValid(true);
			return dto;
		}

		return dto;
	}
}
