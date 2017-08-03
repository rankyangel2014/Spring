package com.jsjn.jnf.service.assist.impl;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.dto.assist.FeeConfigDto;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.dao.assist.FeeConfigDao;
import com.jsjn.jnf.service.assist.FeeConfigService;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.jnf.service.member.MemberService;
import com.jsjn.panda.setup.ParseSpring;

@Service
@Transactional(readOnly = true)
public class FeeConfigServiceImpl extends
		CrudService<FeeConfigDao, FeeConfigDto> implements FeeConfigService {
	private MemberService ms = (MemberService) ParseSpring.context
			.getBean("memberServiceImpl");
	private FeeConfigDao dao = getCrudDao();

	// 查询
	@Override
	public List<FeeConfigDto> qryFeeConfig(FeeConfigDto dto) throws Exception {
		/**
		 * 根据mId获取机构码。发送人行征信和4要素查询时用到。 jianglai yige shanghu keneng you duoge
		 * touziren,muqianzhiyou yige
		 */
		String orgNo = ms.findOrgNo(dto.getMid());
		dto.setOrgNo(orgNo);
		return dao.qryFeeConfig(dto);
	}

	// 查询
	@Override
	public List<FeeConfigDto> qryFeeConfigList(FeeConfigDto dto)
			throws Exception {
		List<FeeConfigDto> list = dao.qryFeeConfig(dto);
		for (FeeConfigDto feeConfigDto : list) {
			String insttuName = feeConfigDto.getInsttuName();
			if (StringUtils.isNotBlank(insttuName)) {
				feeConfigDto.setInsttuName(Cryptos.aesDecrypt(insttuName));
			}
		}
		return list;
	}

	// 新增
	@Override
	public int addFeeConfig(FeeConfigDto dto) throws Exception {
		String id = SequenceUtils.getFeeConfigSeq();
		dto.setId(id);
		return dao.addFeeConfig(dto);
	}

	// 修改
	@Override
	public int updateFeeConfig(FeeConfigDto dto) throws Exception {
		return dao.updateFeeConfig(dto);
	}

	// 删除
	@Override
	public int delFeeConfig(String id) throws Exception {
		return dao.delFeeConfig(id);
	}

	@Override
	protected FeeConfigDao getCrudDao() {
		return (FeeConfigDao) ParseSpring.context.getBean("feeConfigDao");
	}

}
