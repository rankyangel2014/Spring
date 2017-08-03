package com.jsjn.jnf.protal.open.action;

import java.util.Hashtable;

import javax.servlet.http.HttpServletRequest;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.mock.web.MockHttpSession;

import com.jsjn.jnf.protal.security.SecurityCheck;

/**
 * TestOpenEntry的测试类 测试的方法：
 * OpenEntry 测试思路：
 * 说明:无
 * 预置条件：无
 * 1. 合法性校验失败，返回SYS_BUSY、INVALID_WORKING_TIME、INVALID_PARAMS、INVALID_ROLE_CTRL、INVALID_IP
 * 2. 合法性校验成功，进行实名认证查询，实名认证失败，返回错误信息，且响应信息中的签名正确 
 * 3. 合法性校验成功，进行实名认证查询，实名认证成功，返回正确信息，且响应信息中的签名正确
 * 4.合法性校验成功，进行短信认证，短信认证失败，返回错误信息，且响应信息中的签名正确 
 * 5.合法性校验成功，进行短信认证，短信认证成功，返回正确信息，且响应信息中的签名正确 
 * 6.合法性校验成功，进行BIN卡查询，查询失败，返回错误信息，且响应信息中的签名正确 
 * 7.合法性校验成功，进行BIN卡查询，查询成功，返回正确信息，且响应信息中的签名正确 
 * 8.合法性校验成功，进行交易流水查询，查询失败，返回失败信息，且响应信息中的签名正确 
 * 9.合法性校验成功，进行交易流水查询，查询成功，返回成功信息，且响应信息中的签名正确 
 * 10.合法性校验成功，进行单笔支付状态查询，查询失败，返回失败信息，且响应信息中的签名正确 
 * 11.合法性校验成功，进行单笔支付状态查询，查询成功，返回成功信息，且响应信息中的签名正确 
 * 12.合法性校验成功，进行代扣，代扣失败，返回失败信息，且响应信息中的签名正确 
 * 13. 合法性校验成功，进行代扣，代扣成功，返回成功信息，且响应信息中的签名正确
 * 14. 调用pandaClient的invoke方法抛异常，返回SYS_BUSY信息 
 * 15.调用pandaClient的invoke方法返回的resData为空，能返回响应的信息 
 * 16.调用pandaClient的invoke方法返回的resDatas为空，能返回响应的信息
 */
@RunWith(PowerMockRunner.class)
@PrepareForTest(SecurityCheck.class)
public class TestOpenEntry {
    private MockHttpServletRequest req;
    private MockHttpServletResponse rsp;
    private MockHttpSession session;
    private OpenEntry entry;
    //private String publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDRsSzUWYbCO+Qj1zcezPLRE1wFJBERkpvsAHi7oJmvsFMUpHUe0SOtkPdqdIaLzCcad2BEKeVMP6T+FEkLQGb9OS5FcOCnJPQtgcYKnLerkQ/ZaZ07YsUH2RWTlwCnRW0l0OqaC8Kz1P8Ih6FD0NtNUbcLVbM0Xm+KLioNlz4w4wIDAQAB";
    //private String privateKey = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBANGxLNRZhsI75CPXNx7M8tETXAUkERGSm+wAeLugma+wUxSkdR7RI62Q92p0hovMJxp3YEQp5Uw/pP4USQtAZv05LkVw4Kck9C2Bxgqct6uRD9lpnTtixQfZFZOXAKdFbSXQ6poLwrPU/wiHoUPQ201RtwtVszReb4ouKg2XPjDjAgMBAAECgYA9XKWLtm8S48fNHSuKHdtoh0vETVuZUtfB5hlufn66xNRrE/0Z+YWBQwzD4DmHK0S+H/TRvZjWCUHVAEanvj7kj2rreN1ng57GAsZnXwIgNQL0cAUxE2YKplX8iLalcxqb+i94lY9dz5R2yy785SEZr0FoOG8/vC1BxaJTncpwwQJBAO+6soc2KmqyHNAxK4hLeth79dKvQxl0a50kGjbHd7vcBjSJbCFwIuB5TKDn2KwjCIo9TtwmTI3VPFcZoIDLABMCQQDf7JSmpOcFujUx4g0dGx8IQOUEqQXeDp0wsfn3m5bwbj4P027voszFZefnLln5vL4xjkzUOKxk+Q2l4vGqKkXxAkAmURX17J9s/FkEocdOepoA/hc1fJPh/qywqjOSa+FkYm+PeCOTWKQKcvjfgw8rvFHCHrh7EZgM13dUiKER1OCHAkEAk+a4fKVYrjDCp/MOBFaAlbv/SKe3Z2cxrhMv7rsG5EF8nolhschPBmb72HeGGGzxFtxNpLLWM09JE3OleWa4kQJAbmdZ7dNPr6PMG56K8/QCyOKuaalPn8xvQYqYWRul4jAHDKWVK2JH6jMzaUSvYB3uhsobYCotdR1XXfMJeNKwSg";

    @Before
    public void setUp() {
        req = new MockHttpServletRequest();
        rsp = new MockHttpServletResponse();
        session = new MockHttpSession();
        req.setSession(session);
        entry = new OpenEntry();
    }

    /**
     * 合法性校验失败，返回SYS_BUSY
     */
    @SuppressWarnings("unchecked")
    @Test
    public void testOpenEntry() {
        PowerMockito.mockStatic(SecurityCheck.class);
        Mockito.when(SecurityCheck.verify(Mockito.any(HttpServletRequest.class), Mockito.anyString(),
                Mockito.any(Hashtable.class), Mockito.anyList())).thenReturn("999998");
        entry.openEntry(req, rsp);

    }
}
