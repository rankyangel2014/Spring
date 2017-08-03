package com.jsjn.jnf.common.utils.network;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.net.Socket;
import java.net.SocketTimeoutException;
import java.net.UnknownHostException;

import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.utils.Logger;

/**
 * 金农付 -银行前置机 socket通讯工具类
 * 
 * @author yincy
 * 
 */
public class SocketUtil {

	private final static Logger logger = Logger.getLogger(SocketUtil.class);

	/**
	 * 发送报文至CT机
	 * 
	 * @param message
	 */
	public static String send2JsyhCT(String host, String port, String message) throws Exception {

		Socket socket = null;
		BufferedOutputStream out = null;
		BufferedInputStream in = null;
		String result = "";

		try {
			//TODO CT机端口配置
			//socket = new Socket("172.31.17.132", 10010);
			socket = new Socket(host, Integer.parseInt(port));
			socket.setSoTimeout(Global.SOCKETTIMEOUT); // 超时时间

			// 发送数据包(byte)
			out = new BufferedOutputStream(socket.getOutputStream());
			out.write(initMsg(message));
			out.flush();

			// 接收数据包(byte)
			in = new BufferedInputStream(socket.getInputStream());
			byte[] buf = receiveJsyhCT(in);

			result = new String(buf, Global.SOCKET_ACCEPT_ENCODE_TYPE);

			logger.info(result);
			logger.info("******************* receive end! **********************");
		} catch (SocketTimeoutException e) {
			e.printStackTrace();
			logger.error("Socket-Error：socket超时,发送失败", e);
			throw new RuntimeException("连接服务器失败，socket超时，请稍后再试！");
		} catch (UnknownHostException e) {
			e.printStackTrace();
			logger.error("Socket-Error：socket网络异常,发送失败", e);
			throw new RuntimeException("连接服务器失败，socket网络异常，请稍后再试！");
		} catch (IOException e) {
			e.printStackTrace();
			logger.error("Socket-Error：发送失败", e);
			throw e;
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("Socket-Error：发送失败", e);
			throw e;
		} finally {
			try {
				if (out != null) {
					out.close();
					out = null;
				}
				if (in != null) {
					in.close();
					in = null;
				}
				if (socket != null) {
					socket.close();
					socket = null;
				}
			} catch (IOException e) {
				e.printStackTrace();
				throw e;
			}
		}
		return result;
	}

	/**
	 * 接收数据报文
	 * 
	 * @param in
	 * @return
	 * @throws IOException
	 */
	public static byte[] receiveJsyhCT(BufferedInputStream in) throws IOException {

		logger.info("******************* receive start! **********************");
		// 读取数据报文长度
		byte[] msgSize = new byte[100];
		in.read(msgSize, 0, 10);
		int iDocSize = Integer.parseInt(new String(msgSize).trim()) - 2;

		logger.info("返回报文大小(字节):  " + iDocSize);

		//读取加密方式
		byte[] encrypt = new byte[100];
		in.read(encrypt, 0, 2);
		logger.info("返回报文加密方式(字节)：    " + new String(encrypt, Global.SOCKET_ACCEPT_ENCODE_TYPE));

		// 获取完整报文byte数组
		byte[] cDoc = new byte[iDocSize];
		int iReadSize = 6000; // 缓冲用
		int sPackLength = iDocSize;
		int iTmpLength = 0;
		int iLen = 0;
		while (true) {
			if (sPackLength > 0) {
				if (sPackLength >= iReadSize) {
					iLen = in.read(cDoc, iTmpLength, iReadSize);
				} else {
					iLen = in.read(cDoc, iTmpLength, sPackLength);
				}
				sPackLength -= iLen;
				iTmpLength += iLen;
			} else {
				break;
			}
		}
		return cDoc;
	}

	/**
	 * ERP与CT的Socket方式报文结构为：报头＋报体， 报头总共有10个字节，表示报体的长度，如果报体的长度不足10位则右边用空格补足。
	 * 报体为2个字节+数据报文，前一个字节表示加密标志（0：不加密，1：加密），后一个字节为保留位（用‘0’表示）。
	 * 
	 * @param msg
	 * @return
	 * @throws Exception
	 */
	public static byte[] initMsg(String msg) throws Exception {
		// 报文不加密“00”
		msg = "00" + msg;

		// 拼接报体长度
		int msgLength = msg.getBytes(Global.SOCKET_SEND_ENCODE_TYPE).length;

		String msgLengthStr = Integer.toString(msgLength);

		int max = msgLengthStr.length();
		for (int i = 0; i < 10 - max; i++) {
			msgLengthStr = msgLengthStr + " ";
		}

		// 拼接整个报文
		msg = msgLengthStr + msg;
		logger.info("******************* send start! **********************");
		logger.info(msg);
		logger.info("******************* send end! **********************");

		return msg.getBytes(Global.SOCKET_SEND_ENCODE_TYPE);
	}
}
