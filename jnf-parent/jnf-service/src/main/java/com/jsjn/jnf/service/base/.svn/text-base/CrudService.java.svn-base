package com.jsjn.jnf.service.base;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.dto.assist.DigestDto;
import com.jsjn.jnf.bean.dto.base.BaseDTO;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.panda.setup.ParseSpring;

/**
 * Service基类
 */
@Transactional(readOnly = true)
public abstract class CrudService<D extends CrudDao<T>, T extends BaseDTO<T>>
		extends BaseService {
	/**
	 * 
	 * @return
	 */
	protected abstract D getCrudDao();

	// @Autowired
	// protected D dao;

	/**
	 * 获取单条数据
	 * 
	 * @param id
	 * @return
	 */
	public T get(String id) {
		return getCrudDao().get(id);
	}

	/**
	 * 获取单条数据
	 * 
	 * @param entity
	 * @return
	 */
	public T get(T entity) {
		return getCrudDao().get(entity);
	}

	/**
	 * 查询列表数据
	 * 
	 * @param entity
	 * @return
	 */
	public List<T> findList(T entity) {
		return getCrudDao().findList(entity);
	}

	/**
	 * 查询分页数据
	 * 
	 * @param page
	 *            分页对象
	 * @param entity
	 * @return
	 */
	//@SuppressWarnings("unchecked")
	public BaseDTO<T> findPage(T entity) {
		List<T> list = getCrudDao().findList(entity);
		//final int size = list.size();
		//BaseDTO<T>[] arrays = list.toArray(new BaseDTO[size]);
		entity.setRoot(list);
		return entity;
	}

	/**
	 * 保存数据（插入或更新）
	 * 
	 * @param entity
	 */
	@SuppressWarnings("unchecked")
	@Transactional(readOnly = false)
	public void save(T entity) {
		if (entity instanceof DigestDto) {
			DigestDto<T> digest = (DigestDto<T>) entity;
			digest.setDigest(digest.buildDigest());
			if (digest.getIsNewRecord()) {
				getCrudDao().insert((T) digest);
			} else {
				getCrudDao().update((T) digest);
			}
		} else {

			if (entity.getIsNewRecord()) {
				getCrudDao().insert(entity);
			} else {
				getCrudDao().update(entity);
			}
		}
	}

	/**
	 * 删除数据
	 * 
	 * @param entity
	 */
	@Transactional(readOnly = false)
	public void delete(T entity) {
		getCrudDao().delete(entity);
	}
	
	public Object getBean(String beanName){
		return ParseSpring.context.getBean(beanName);
	}
}
