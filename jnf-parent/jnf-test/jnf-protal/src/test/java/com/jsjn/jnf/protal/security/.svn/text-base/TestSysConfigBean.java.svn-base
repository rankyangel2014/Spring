package com.jsjn.jnf.protal.security;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;

import com.jsjn.jnf.bean.dto.assist.DictDto;
import com.jsjn.jnf.panda.client.PandaClient;
import com.jsjn.panda.client.Result;
import com.jsjn.panda.exception.NoServiceException;
import com.jsjn.panda.exception.PandaRemoteException;
import com.jsjn.panda.exception.TimeoutException;

import net.sf.json.JSONArray;

import org.powermock.modules.junit4.PowerMockRunner;
/**
 * SysConfigBean的测试类
 * 测试的方法：getSysConfig
 * 说明:无
 * 预置条件：无
 * 测试思路：1. 设置的属性值为正常，能够获取成功
 *        2. 设置的属性值为空，能够能够抛出异常
 *        3. 设置的属性值不符合规格，能够能够抛出异常
 *        4. 调用invoke抛异常时，返回false
 */

@RunWith(PowerMockRunner.class)
@PrepareForTest(PandaClient.class)
public class TestSysConfigBean {
    /**
     * 设置的属性值为正常，能够获取成功
     */
    @Test
    public void testGetSysConfigNormal() throws NoServiceException, PandaRemoteException, TimeoutException {
        
        Map<String,String> params = new HashMap<String,String>();
        params.put("NO_WORKING_START_TIME", "12:00:00");
        params.put("NO_WORKING_END_TIME", "14:00:00");
        params.put("EFFECTIVE_SEC", "50");
        params.put("ACC_MAX_COUNT_FOR_IP", "10");
        params.put("ACC_MAX_COUNT_FOR_SYS", "100");
        params.put("COOLING_SEC_FOR_IP", "120");
        params.put("COOLING_SEC_FOR_SYS", "360");
        params.put("REFRESH_CONFIG_SEC", "3000");
        Result result = this.generateResult(params);
        PowerMockito.mockStatic(PandaClient.class);
        Mockito.when(
                PandaClient.invoke(Mockito.anyInt(), Mockito.anyString(), Mockito.anyString(), Mockito.anyCollection()))
                .thenReturn(result);
        assertTrue(SysConfigBean.getSysConfig());
        assertEquals("12:00:00", SysConfigBean.NO_WORKING_START_TIME);
        assertEquals("14:00:00", SysConfigBean.NO_WORKING_END_TIME);
        assertEquals(50, SysConfigBean.EFFECTIVE_SEC);
        assertEquals(10, SysConfigBean.ACC_MAX_COUNT_FOR_IP);
        assertEquals(100, SysConfigBean.ACC_MAX_COUNT_FOR_SYS);
        assertEquals(120, SysConfigBean.COOLING_SEC_FOR_IP);
        assertEquals(360, SysConfigBean.COOLING_SEC_FOR_SYS);
        assertEquals(3000, SysConfigBean.REFRESH_CONFIG_SEC);
    }
    
    /**
     * 设置时间值为空，能够能够抛出异常
     */
    @Test
    public void testGetSysConfigNullDate() throws NoServiceException, PandaRemoteException, TimeoutException {
        
        Map<String,String> params = new HashMap<String,String>();
        params.put("NO_WORKING_START_TIME", null);
        params.put("NO_WORKING_END_TIME", "14:00:00");
        params.put("EFFECTIVE_SEC", "50");
        params.put("ACC_MAX_COUNT_FOR_IP", "10");
        params.put("ACC_MAX_COUNT_FOR_SYS", "100");
        params.put("COOLING_SEC_FOR_IP", "120");
        params.put("COOLING_SEC_FOR_SYS", "360");
        params.put("REFRESH_CONFIG_SEC", "3000");
        Result result = this.generateResult(params);
        PowerMockito.mockStatic(PandaClient.class);
        Mockito.when(
                PandaClient.invoke(Mockito.anyInt(), Mockito.anyString(), Mockito.anyString(), Mockito.anyCollection()))
                .thenReturn(result);
        assertFalse(SysConfigBean.getSysConfig());
    }
    
    /**
     * 设置整型值为空，能够能够抛出异常
     */
    @Test(expected=NumberFormatException.class)
    public void testGetSysConfigNullInt() throws NoServiceException, PandaRemoteException, TimeoutException {
        
        Map<String,String> params = new HashMap<String,String>();
        params.put("NO_WORKING_START_TIME", "10:00:00");
        params.put("NO_WORKING_END_TIME", "14:00:00");
        params.put("EFFECTIVE_SEC", null);
        params.put("ACC_MAX_COUNT_FOR_IP", "10");
        params.put("ACC_MAX_COUNT_FOR_SYS", "100");
        params.put("COOLING_SEC_FOR_IP", "120");
        params.put("COOLING_SEC_FOR_SYS", "360");
        params.put("REFRESH_CONFIG_SEC", "3000");
        Result result = this.generateResult(params);
        PowerMockito.mockStatic(PandaClient.class);
        Mockito.when(
                PandaClient.invoke(Mockito.anyInt(), Mockito.anyString(), Mockito.anyString(), Mockito.anyCollection()))
                .thenReturn(result);
        assertFalse(SysConfigBean.getSysConfig());
    }
    
    /**
     * 设置整型值为的格式不正确，能够能够抛出异常
     */
    @Test(expected=NumberFormatException.class)
    public void testGetSysConfigErrorInt() throws NoServiceException, PandaRemoteException, TimeoutException {
        
        Map<String,String> params = new HashMap<String,String>();
        params.put("NO_WORKING_START_TIME", "10:00:00");
        params.put("NO_WORKING_END_TIME", "14:00:00");
        params.put("EFFECTIVE_SEC", "50");
        params.put("ACC_MAX_COUNT_FOR_IP", "10");
        params.put("ACC_MAX_COUNT_FOR_SYS", "100");
        params.put("COOLING_SEC_FOR_IP", "120");
        params.put("COOLING_SEC_FOR_SYS", "uwe");
        params.put("REFRESH_CONFIG_SEC", "3000");
        Result result = this.generateResult(params);
        PowerMockito.mockStatic(PandaClient.class);
        Mockito.when(
                PandaClient.invoke(Mockito.anyInt(), Mockito.anyString(), Mockito.anyString(), Mockito.anyCollection()))
                .thenReturn(result);
        assertFalse(SysConfigBean.getSysConfig());
    }
    /**
     * 设置时间值为的格式不正确，能够能够抛出异常
     */
    @Test
    public void testGetSysConfigErrorDate() throws NoServiceException, PandaRemoteException, TimeoutException {
        
        Map<String,String> params = new HashMap<String,String>();
        params.put("NO_WORKING_START_TIME", "10:00:00");
        params.put("NO_WORKING_END_TIME", "aa:00:00");
        params.put("EFFECTIVE_SEC", "50");
        params.put("ACC_MAX_COUNT_FOR_IP", "10");
        params.put("ACC_MAX_COUNT_FOR_SYS", "100");
        params.put("COOLING_SEC_FOR_IP", "120");
        params.put("COOLING_SEC_FOR_SYS", "360");
        params.put("REFRESH_CONFIG_SEC", "3000");
        Result result = this.generateResult(params);
        PowerMockito.mockStatic(PandaClient.class);
        Mockito.when(
                PandaClient.invoke(Mockito.anyInt(), Mockito.anyString(), Mockito.anyString(), Mockito.anyCollection()))
                .thenReturn(result);
        assertFalse(SysConfigBean.getSysConfig());
    }
    /**
     * 调用invoke抛异常时，返回false
     */
    @Test
    public void testGetSysConfigNoServiceException() throws NoServiceException, PandaRemoteException, TimeoutException {
        
        PowerMockito.mockStatic(PandaClient.class);
        Mockito.when(
                PandaClient.invoke(Mockito.anyInt(), Mockito.anyString(), Mockito.anyString(), Mockito.anyCollection()))
                .thenThrow(new NoServiceException());
        assertFalse(SysConfigBean.getSysConfig());
    }
    /**
     * 调用invoke抛异常时，返回false
     */
    @Test
    public void testGetSysConfigPandaRemoteException() throws NoServiceException, PandaRemoteException, TimeoutException {
        
        PowerMockito.mockStatic(PandaClient.class);
        Mockito.when(
                PandaClient.invoke(Mockito.anyInt(), Mockito.anyString(), Mockito.anyString(), Mockito.anyCollection()))
                .thenThrow(new PandaRemoteException());
        assertFalse(SysConfigBean.getSysConfig());
    }
    /**
     * 调用invoke抛异常时，返回false
     */
    @Test
    public void testGetSysConfigTimeoutException() throws NoServiceException, PandaRemoteException, TimeoutException {
        
        PowerMockito.mockStatic(PandaClient.class);
        Mockito.when(
                PandaClient.invoke(Mockito.anyInt(), Mockito.anyString(), Mockito.anyString(), Mockito.anyCollection()))
                .thenThrow(new TimeoutException());
        assertFalse(SysConfigBean.getSysConfig());
    }

    private Result generateResult(Map<String,String> params) {
        List<DictDto> list = new ArrayList<DictDto>();
        for(Entry<String,String> item:params.entrySet()){
            DictDto dict = new DictDto();
            dict.setType(item.getKey());
            dict.setValue(item.getValue());
            list.add(dict);
        }
        Result result = new Result();
        result.setResult(JSONArray.fromObject(list).toString());
        return result;
    }
}
