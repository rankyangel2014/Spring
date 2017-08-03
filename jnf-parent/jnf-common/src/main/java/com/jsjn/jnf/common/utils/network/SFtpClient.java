package com.jsjn.jnf.common.utils.network;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpException;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.utils.Logger;

public class SFtpClient {
	private final static Logger logger = Logger.getLogger(SFtpClient.class);

	/**
	 * 获取session
	 * 
	 * @param host
	 * @param userName
	 * @param password
	 * @param port
	 * @return
	 * @throws JSchException
	 * @throws BussinessException
	 */
	public static Session getSession(String host, String userName, String password, String port) throws JSchException {
		Session session = null;
		JSch jsch = new JSch();
		//连接服务器，采用默认端口  
		if (StringUtils.isBlank(port)) {
			session = jsch.getSession(userName, host);
		} else {
			session = jsch.getSession(userName, host, Integer.valueOf(port));
		}
		//设置登陆主机的密码  
		session.setPassword(password);//设置密码     
		//设置第一次登陆的时候提示，可选值：(ask | yes | no)  
		session.setConfig("StrictHostKeyChecking", "no");
		//设置登陆超时时间     
		session.connect(3000);
		return session;
	}

	public static Session getSession(String host, String userName, String password) throws Exception {
		return getSession(host, userName, password, null);
	}

	/**
	 * 读取文件中的内容
	 * 
	 * @param fileName
	 * @return
	 * @throws IOException
	 * @throws JSchException
	 * @throws SftpException
	 * @throws Exception
	 */
	public static String getData(String host, String port, String userName, String password, String filePath)
			throws JSchException, SftpException, IOException {
		logger.info("file:-->" + filePath);
		String list = null;
		Session session = null;
		InputStream instream = null;
		Channel channel = null;
		session = getSession(host, userName, password, port);
		channel = session.openChannel("sftp");
		channel.connect(1000);
		ChannelSftp sftp = (ChannelSftp) channel;
		instream = sftp.get(filePath);
		try {
			list = IOUtils.toString(instream, Charset.forName("GBK"));
		} finally {
			IOUtils.closeQuietly(instream);
			if (channel != null)
				channel.disconnect();
			if (session != null)
				session.disconnect();
		}
		return list;
	}

	public static String getData(String host, String userName, String password, String filePath) throws IOException,
			JSchException, SftpException {
		return getData(host, null, userName, password, filePath);
	}

}
