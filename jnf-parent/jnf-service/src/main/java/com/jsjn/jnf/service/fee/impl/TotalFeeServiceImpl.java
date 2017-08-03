/**
 * 
 */
package com.jsjn.jnf.service.fee.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jsjn.jnf.bean.bo.fee.AccountDetailDataBO;
import com.jsjn.jnf.bean.bo.fee.TotalFeeDataBo;
import com.jsjn.jnf.bean.dto.member.FeeStatisticDataBO;
import com.jsjn.jnf.bean.dto.member.FeeRealNameDto;
import com.jsjn.jnf.bean.dto.member.FeeWithholdDto;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.dao.fee.TotalFeeDao;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.jnf.service.fee.TotalFeeService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 读取报文
 * 
 * @author ZSMJ
 * 
 */
@Service
public class TotalFeeServiceImpl extends
		CrudService<TotalFeeDao, TotalFeeDataBo> implements TotalFeeService {

	@Override
	protected TotalFeeDao getCrudDao() {
		return (TotalFeeDao) ParseSpring.context.getBean("totalFeeDao");
	}

	@Override
	public List<FeeStatisticDataBO> queryFeeStatisticList(FeeStatisticDataBO dto) {
		List<FeeStatisticDataBO> lists = getCrudDao()
				.queryFeeStatisticList(dto);
		for (FeeStatisticDataBO feeStatisticDataBO : lists) {
			String insttuName = feeStatisticDataBO.getInsttuName();
			feeStatisticDataBO.setInsttuName(Cryptos.aesDecrypt(insttuName));
		}
		return lists;
	}

	public List<TotalFeeDataBo> qryTotalFee(TotalFeeDataBo dto) {
		if (!"".equals(dto.getInsttuName())) {
			dto.setInsttuName(Cryptos.aesEncrypt(dto.getInsttuName()));
		}
		List<TotalFeeDataBo> lists = getCrudDao().qryTotalFee(dto);
		if (lists.size() != 0) {
			for (TotalFeeDataBo tbo : lists) {
				/**
				 * 注：将经过拦截器得到的总页数total值设置到查询结果集中。用于分页
				 */
				tbo.setTotal(dto.getTotal());
				tbo.setInsttuName(Cryptos.aesDecrypt(tbo.getInsttuName()));
			}
		}
		return lists;
	}

	@Override
	public List<AccountDetailDataBO> queryAccount(AccountDetailDataBO dto) {
		List<AccountDetailDataBO> list = getCrudDao().queryAccount(dto);
		for (AccountDetailDataBO ad : list) {
			ad.setCustName(Cryptos.aesDecrypt(ad.getCustName()));
			ad.setMobile(Cryptos.aesDecrypt(ad.getMobile()));
			ad.setIdNo(Cryptos.aesDecrypt(ad.getIdNo()));
			ad.setCreated(ad.getCreated().substring(0, 10));
			ad.setModified(ad.getModified().substring(0, 10));
		}
		return list;
	}

	@Override
	public List<FeeWithholdDto> queryFeeWithholdDetail(FeeWithholdDto dto) {
		List<FeeWithholdDto> list = getCrudDao().queryFeeWithholdDetail(dto);
		for (FeeWithholdDto obj : list) {
			obj.setPayAccount(Cryptos.aesDecrypt(obj.getPayAccount()));
			obj.setCollAccount(Cryptos.aesDecrypt(obj.getCollAccount()));
			obj.setPayer(Cryptos.aesDecrypt(obj.getPayer()));
			obj.setPayee(Cryptos.aesDecrypt(obj.getPayee()));
		}

		return list;
	}

	@Override
	public List<FeeRealNameDto> queryFeeRealnameDetail(FeeRealNameDto dto) {
		List<FeeRealNameDto> list = getCrudDao().queryFeeRealnameDetail(dto);
		for (FeeRealNameDto obj : list) {
			obj.setCustName(Cryptos.aesDecrypt(obj.getCustName()));
			obj.setMobile(Cryptos.aesDecrypt(obj.getMobile()));
			obj.setIdNo(Cryptos.aesDecrypt(obj.getIdNo()));
			obj.setBankCardNo(Cryptos.aesDecrypt(obj.getBankCardNo()));
		}
		return list;
	}
}
