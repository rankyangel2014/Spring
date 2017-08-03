package com.jsjn.jnf.common.utils.network;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Socket;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import com.jsjn.jnf.common.utils.Logger;

public class TcpClient {

	private final static Logger logger = Logger.getLogger(TcpClient.class);

	/**
	 * 获取服务端消息
	 * 
	 * @param msg
	 * @return
	 * @throws IOException
	 * @throws NoSuchAlgorithmException
	 */
	public static String getData(String ip, String port, String sendMsg, String key, int timeout) throws IOException,
			NoSuchAlgorithmException {
		Socket client = new Socket(ip, Integer.parseInt(port));
		byte[] gbkSendBytes = sendMsg.getBytes("gbk");
		byte[] gbkMd5Bytes = md5(sendMsg + key).getBytes("gbk");

		String len = String.format("%04d", gbkSendBytes.length + gbkMd5Bytes.length);
		DataInputStream dis = new DataInputStream(client.getInputStream());
		DataOutputStream dos = new DataOutputStream(client.getOutputStream());
		dos.write(len.getBytes("gbk"));
		dos.write(gbkSendBytes);
		dos.write(gbkMd5Bytes);
		dos.flush();
		client.setSoTimeout(timeout * 1000);
		byte[] recvLen = new byte[4];
		dis.read(recvLen);
		String strLen = new String(recvLen, "GBK");
		int n = Integer.parseInt(strLen.trim());
		byte[] body = new byte[n];
		dis.read(body);

		dis.close();
		dos.close();

		String bodyStr = new String(body, "gbk");
		String xmlBody = bodyStr.substring(0, bodyStr.length() - 32);
		String sign = bodyStr.substring(bodyStr.length() - 32);

		return md5(xmlBody + key).equals(sign) ? xmlBody : "";
	}

	/**
	 * MD5(XML + 秘钥)
	 * 
	 * @param str
	 * @return
	 * @throws IOException
	 * @throws NoSuchAlgorithmException
	 */
	public static String md5(String str) throws IOException, NoSuchAlgorithmException {
		MessageDigest md5 = MessageDigest.getInstance("MD5");
		byte[] md5Bytes = md5.digest(str.getBytes("gbk"));
		StringBuffer hexValue = new StringBuffer();
		for (int i = 0; i < md5Bytes.length; i++) {
			int val = ((int) md5Bytes[i]) & 0xff;
			if (val < 16)
				hexValue.append("0");
			hexValue.append(Integer.toHexString(val).toUpperCase());
		}
		return hexValue.toString();
	}

}
