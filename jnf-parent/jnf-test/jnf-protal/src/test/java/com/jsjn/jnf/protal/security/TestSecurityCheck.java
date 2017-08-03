package com.jsjn.jnf.protal.security;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import com.alibaba.fastjson.JSONArray;
import com.jsjn.jnf.bean.dto.assist.BizConfigDto;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.panda.client.PandaClient;
import com.jsjn.panda.client.Result;

import net.sf.json.JSONObject;

@RunWith(PowerMockRunner.class)
@PrepareForTest(PandaClient.class)
/**
 * SecurityCheck的测试类
 * 测试的方法：getBusinessConfig
 * 说明:无
 * 预置条件：无
 * 测试思路：1. 返回的商户信息错误，能够抛出异常
 *        2. 能够获取正常的商户信息
 *        3. 调用invoke抛异常时，能够抛出异常
 * 测试的方法：verifyFlow
 * 说明:无
 * 预置条件：无
 * 测试思路：1. 验证ip失败，返回SYS_BUSY
 *        2. 验证sessionid失败，返回SYS_BUSY
 *        3. 验证整个系统的访问失败，返回SYS_BUSY
 *        4. 验证ip、sessionid、整个系统的访问成功，返回SUCCESS
 * 测试的方法：verifyWorkingTime
 * 说明:无
 * 预置条件：无
 * 测试思路： 1. 在非工作时间，返回INVALID_WORKING_TIME
 *        2. 在工作时间，返回SUCCESS
 * 测试的方法：verifyTimeStamp
 * 说明:无
 * 预置条件：无
 * 测试思路： 1. 请求的时间戳小于当前时间-1分钟，返回INVALID_PARAMS
 *        2. 请求的时间戳大于当前时间+1分钟，返回INVALID_PARAMS
 *        3. 请求的时间戳在当前时间-1分钟与当前时间+1分钟之间，返回SUCCESS
 * 测试的方法：verifyApiRoleCtrl
 * 说明:无
 * 预置条件：无
 * 测试思路： 1. 获取商户权限失败，返回INVALID_ROLE_CTRL
 *        2. 调用invoke抛异常时，返回SYS_BUSY
 *        3. 查询的商户有权限，返回SUCCESS
 * 测试的方法：verifyWhiteList
 * 说明:无
 * 预置条件：无
 * 测试思路： 1. 商户在白名单中，返回SUCCESS
 *        2. 商户不在白名单中，返回INVALID_IP
 * 测试的方法：verify
 * 说明:无
 * 预置条件：无
 * 测试思路： 1. 流控校验校验失败，返回SYS_BUSY
 *        2. 工作时间校验失败，返回INVALID_WORKING_TIME
 *        3. 请求参数不合法，返回INVALID_PARAMS
 *        4. 公钥验签失败，返回INVALID_PARAMS
 *        5. 时间戳验证失败，返回INVALID_PARAMS
 *        6. 商户权限验证失败，返回INVALID_ROLE_CTRL
 *        7. 白名单验证失败，返回INVALID_IP
 *        8. 以上步骤验证成功，返回SUCCESS
 */
public class TestSecurityCheck {
    /**
     * 返回的商户信息错误，能够抛出异常
     * @throws Exception
     */
    @Test(expected=Exception.class)
    public void testGetBusinessConfigError() throws Exception {
        Result result = genErrorBizConfig();
        PowerMockito.mockStatic(PandaClient.class);
        Mockito.when(
                PandaClient.invoke(Mockito.anyInt(), Mockito.anyString(), Mockito.matches("queryBussinessConfig"), Mockito.anyObject()))
                .thenReturn(result);
        SecurityCheck.getBusinessConfig("appkey");
    }
    /**
     * 调用invoke抛异常时，能够抛出异常
     * @throws Exception
     */
    @Test(expected=Exception.class)
    public void testGetBusinessConfigException() throws Exception {
        PowerMockito.mockStatic(PandaClient.class);
        Mockito.when(
                PandaClient.invoke(Mockito.anyInt(), Mockito.anyString(), Mockito.matches("queryBussinessConfig"), Mockito.anyObject()))
                .thenThrow(new Exception("数据异常"));
        SecurityCheck.getBusinessConfig("appkey");;
    }
    /**
     * 能够获取正常的商户信息
     * @throws Exception
     */
    @Test
    public void testGetBusinessConfigNormal() throws Exception {
        PowerMockito.mockStatic(PandaClient.class);
        Result result = genSucBizConfig();
        Mockito.when(
                PandaClient.invoke(Mockito.anyInt(), Mockito.anyString(), Mockito.matches("queryBussinessConfig"), Mockito.anyObject()))
                .thenReturn(result);
        JSONObject jsonObject = SecurityCheck.getBusinessConfig("appkey");
        assertEquals(jsonObject.get("appkey"),"appkey");
        assertEquals(jsonObject.get("mid"),"mid");
        assertEquals(jsonObject.get("whiteList"),"whitelist");
        assertEquals(jsonObject.get("rsaPubKey"),"abcd1234");
        assertEquals(jsonObject.get("resMsg"),"操作成功");
    }

    private Result genSucBizConfig() {
        BizConfigDto bizConfigDto = new BizConfigDto();
        bizConfigDto.setResCode(ReturnCode.SUCCESS);
        bizConfigDto.setAppkey("appkey");
        bizConfigDto.setMid("mid");
        bizConfigDto.setWhiteList("whitelist");
        bizConfigDto.setRsaPubKey("abcd1234");
        bizConfigDto.setResMsg("操作成功");
        Result result = new Result();
        String jsonStr = JSONArray.toJSONString(bizConfigDto);
        System.out.println(jsonStr);
        result.setResult(jsonStr);
        return result;
    }

    private Result genErrorBizConfig() {
        BizConfigDto bizConfigDto = new BizConfigDto();
        bizConfigDto.setResCode(ReturnCode.FAIL);
        bizConfigDto.setResMsg("商户配置数据异常");
        Result result = new Result();
        String jsonStr = JSONArray.toJSONString(bizConfigDto);
        System.out.println(jsonStr);
        result.setResult(jsonStr);
        return result;
    }
}
