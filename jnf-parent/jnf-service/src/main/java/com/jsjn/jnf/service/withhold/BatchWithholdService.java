package com.jsjn.jnf.service.withhold;

import java.util.List;

import com.jsjn.jnf.bean.dto.withhold.BatchWithholdDto;
import com.jsjn.jnf.common.exception.BussinessException;

/**
 * 批量代扣接口
 * 
 * @author xiekx
 * 
 */
public interface BatchWithholdService {
	/**
	 * 批量插入代扣信息
	 * 
	 * @param list
	 * @return
	 * @throws BussinessException
	 */
	public Integer batchInsertWithhold(List<BatchWithholdDto> list) throws BussinessException;

	/**
	 * 查询代扣信息
	 * 
	 * @param limit
	 * @return
	 * @throws BussinessException
	 */
	public List<BatchWithholdDto> queryBatchWithhold(Integer limit);

	/**
	 * 更新代扣信息
	 * 
	 * @param batchWithholdDto
	 * @return
	 * @throws BussinessException
	 */
	public Integer updateWithhold(BatchWithholdDto batchWithholdDto) throws BussinessException;

}
