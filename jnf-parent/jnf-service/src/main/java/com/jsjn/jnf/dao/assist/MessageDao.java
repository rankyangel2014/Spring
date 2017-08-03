package com.jsjn.jnf.dao.assist;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jsjn.jnf.bean.linkq.MessageDto;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;

/**
 * @author xiekx
 * 
 */
@MyBatisDao
public interface MessageDao extends CrudDao<MessageDto> {

	/**
	 * 新增消息
	 * 
	 * @param dto
	 * @return
	 */
	public Integer insertMessage(List<MessageDto> list);

	/**
	 * 修改消息
	 * 
	 * @param dto
	 * @return
	 */
	public Integer updateMessage(MessageDto dto);

	/**
	 * 删除消息
	 * 
	 * @param id
	 * @return
	 */
	public Integer deleteMessage(@Param("id") String id);

	/**
	 * 查询消息列表
	 * 
	 * 
	 * @param limit
	 * @return
	 */
	public List<MessageDto> queryMessageList(@Param("limit") Integer limit);
}
