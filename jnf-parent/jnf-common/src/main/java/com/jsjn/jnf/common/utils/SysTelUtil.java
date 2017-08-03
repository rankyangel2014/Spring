package com.jsjn.jnf.common.utils;

public final class SysTelUtil {
    public static final String ISSENDTOOSYS = "1"; // <!-- 是否给核心发送交易 0则不发其他都发
    public static final String TELMSGIP = "180.1.50.4"; // 【已过时】 <!-- 短信交互的服务端地址
    public static final String TELMSGPORT = "7880"; // 【已过时】<!-- 短信发送的服务端的端口 -->
    public static final String TELENCODE = "GB18030"; // 【已过时】<!-- 短信内容的编码格式 -->
    public static final String TIMEOUT = "120000"; // 【已过时】<!-- 发送短信的超时时间 5分钟-->
    private SysTelUtil() {
    }
}
