/**
 * <p>
 * 项目名称：slarms
 * <p>
 * Package名称：com.computech.slarms.osys.util 文件名称：SocketClient.java 版本：1.00 创建日期：2010-10-9 Copyright (c) 2007-2009 四川日达科技有限公司 版权所有 www.hk-computech.com. All rights reserved.
 */
package com.jsjn.jnf.common.utils;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.net.Socket;
import java.net.UnknownHostException;

import com.computech.common.util.LogerUtil;

/**
 * <p>
 * 类说明：短信发送客户端
 * @author：huyin
 * @version 1.00
 */
public final class SocketClient {

    /**
     * 私有构造
     */
    private SocketClient() {
    }

    /**
     * 日志对象
     */
    private static final LogerUtil LOGER = new LogerUtil(SocketClient.class);

    /**
     * 发送报文
     * @param ip ip地址
     * @param port 端口号
     * @param timeout 超时
     * @param packe 报文
     * @return 返回结果 报文
     * @throws UnknownHostException 异常
     * @throws IOException IO异常
     */
    public static BackPack newSend(String ip, int port, int timeout, byte[] packe) throws UnknownHostException, IOException {
        byte[] bodyPack;
        BackPack backPack = new BackPack();
        LOGER.info("****************发送短信报文****************** ip=" + ip + " ,port=" + port);
        Socket socket = new Socket(ip, port); // 设置链接的服务器地址
        try {
            socket.setSoTimeout(timeout); // 设置超时时间
            // 客户端提交数据所使用的输出流
            BufferedOutputStream outBuffere = new BufferedOutputStream(socket.getOutputStream());
            outBuffere.write(packe); // 将客户端数据提交至客户端
            outBuffere.flush();
            // 客户端下载数据所使用的输入流
            BufferedInputStream inBuffere = new BufferedInputStream(socket.getInputStream());

            // 报文头-->报文体长度
            byte[] length = new byte[5];
            // 读取报文头五位
            inBuffere.read(length, 0, 5);
            String headLength = new String(length, SysTelUtil.TELENCODE);
            bodyPack = new byte[Integer.valueOf(headLength)];
            // 读取报文体
            inBuffere.read(bodyPack, 0, bodyPack.length);
            String bodyStr = new String(bodyPack, SysTelUtil.TELENCODE);
            LOGER.info("****************接收短信报文******************");
            LOGER.info(bodyStr);
            String[] result = bodyStr.split("[|]");
            if (result.length < 5) {
                throw new RuntimeException("短信平台返回信息有误");
            }
            backPack.setReponseCode(result[3]);
            backPack.setReponseMsg(result[4]);
        } finally {
            socket.close();
        }
        return backPack;
    }

    /**
     * <p>
     * 发送报文
     * @param ip ip地址
     * @param port 端口号
     * @param timeout 超时
     * @param packe 报文
     * @return 返回结果 报文
     * @throws UnknownHostException 异常
     * @throws IOException IO异常
     */
    public static byte[] send(String ip, int port, int timeout, byte[] packe) throws UnknownHostException, IOException {
        byte[] bodyPack;
        LOGER.info("****************发送短信报文****************** ip=" + ip + " ,port=" + port);

        // System.out.print(new
        // String(packe,OSysParam.getParam(OSysParam.telEncode)));
        Socket socket = new Socket(ip, port); // 设置链接的服务器地址
        try {
            socket.setSoTimeout(timeout); // 设置超时时间
            // 客户端提交数据所使用的输出流
            BufferedOutputStream outBuffere = new BufferedOutputStream(socket.getOutputStream());
            outBuffere.write(packe); // 将客户端数据提交至客户端
            outBuffere.flush();
            // 客户端下载数据所使用的输入流
            BufferedInputStream inBuffere = new BufferedInputStream(socket.getInputStream());

            // 报文头-->报文体长度
            byte[] length = new byte[4];
            // 读取报文头四位
            inBuffere.read(length, 0, 4);
            String headLength = new String(length, SysTelUtil.TELENCODE);
            // 报文头——>报文类型
            byte[] headType = new byte[4];
            // 读取报文类型
            inBuffere.read(headType, 0, 4);
            // 报文体
            bodyPack = new byte[Integer.valueOf(headLength).intValue()];
            // 读取报文体
            inBuffere.read(bodyPack, 0, bodyPack.length);
            LOGER.info("****************接收短信报文******************");
            LOGER.info(new String(bodyPack, SysTelUtil.TELENCODE));
        } finally {
            socket.close();
        }
        return bodyPack;
    }
}
