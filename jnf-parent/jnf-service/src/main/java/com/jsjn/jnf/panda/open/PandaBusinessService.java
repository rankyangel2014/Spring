package com.jsjn.jnf.panda.open;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jsjn.jnf.bean.bo.member.UpdateBussinessAuthDto;
import com.jsjn.jnf.bean.dto.assist.BizConfigDto;
import com.jsjn.jnf.bean.dto.member.BussinessDto;
import com.jsjn.jnf.service.member.BusinessService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 交易panda服务类
 * 
 * @author ZSMJ
 * 
 */
@PandaService(serviceName = "pandaBusinessService", serviceType = ServiceType.CommonBean)
public class PandaBusinessService {

	
	private BusinessService businessService = (BusinessService) ParseSpring.context.getBean("businessServiceImpl");
	

	@PandaMethod(mName = "saveBusinessInfo", dscrpt = "商户新增功能", RegID = "saveBusinessInfo")
	public BussinessDto findPaymentInfoByCondition(BussinessDto dto) throws Exception {
		return businessService.saveBusinessInfo(dto);
	}
	
	@PandaMethod(mName = "findBussiness", dscrpt = "查询商户信息列表", RegID = "findBussiness")
	public List<BussinessDto> findBussiness(BussinessDto dto) throws Exception {
		String mid = dto.getMid();
		String mName = dto.getMName();
		String status = dto.getStatus();
		return businessService.findBussiness(mid,mName,status);
	}
	
	@PandaMethod(mName = "updateBussinessInfo", dscrpt = "商户信息修改功能", RegID = "updateBussinessInfo")
	public BussinessDto updateBussinessInfo(BussinessDto dto) throws Exception {
		return businessService.updateBussinessInfo(dto);
	}
	
	@PandaMethod(mName = "findBussinessAuth", dscrpt = "查找当前用户权限列表", RegID = "findBussinessAuth")
	public List<String> findBussinessAuth(BussinessDto dto) throws Exception {
		String mid = dto.getMid();
		return businessService.findBussinessAuth(mid);
	}
	
	@PandaMethod(mName = "updateBussinessAuth", dscrpt = "修改mid商户的权限", RegID = "updateBussinessAuth")
	public boolean updateBussinessAuth(UpdateBussinessAuthDto dto) throws Exception{
		String[] roles = dto.getRoles();
		String mid = dto.getMid();
		return businessService.updateBussinessAuth(roles, mid);
	}
	
	@PandaMethod(mName = "qryBusnessAll", dscrpt = "根据id查询商户下所有信息", RegID = "qryBusnessAll")
	public Map<String, Object> qryBusnessAll(String mid) throws Exception{
		Map<String,Object> map = null;
		try {
			map =  businessService.qryBusnessAll(mid);
			return map;
		} catch (Exception e) {
			throw new Exception();
		}
	}
	
	@PandaMethod(mName = "amendBusness", dscrpt = "根据id修改商户下所有信息", RegID = "amendBusness")
	public Map<String, Object> amendBusness(BussinessDto bussinessDto,BizConfigDto bizConfigDto,String[]role){
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			map = businessService.amendBusness(bussinessDto, bizConfigDto, role);
			return map;
		} catch (Exception e) {
			map.clear();
			map.put("success", false);
			map.put("infoMsg", e.getMessage());
			return map;
		}
	}
	
	@PandaMethod(mName = "qryRoleAll", dscrpt = "查询接入配置信息", RegID = "qryRoleAll")
	public Map<String,Object> qryRoleAll(){
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			map =  businessService.qryRoleAll();
			return map;
		} catch (Exception e) {
			return map;
		}
	}
	
	@PandaMethod(mName = "createBusness", dscrpt = "新建商户信息", RegID = "createBusness")
	public Map<String, Object> createBusness(BussinessDto bussinessDto,BizConfigDto bizConfigDto,String[]role){
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			map = businessService.createBusness(bussinessDto, bizConfigDto, role);
			return map;
		} catch (Exception e) {
			map.clear();
			map.put("success", false);
			map.put("infoMsg", e.getMessage());
			return map;
		}
	}
}
