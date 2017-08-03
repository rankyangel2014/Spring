package com.jsjn.jnf.common.linkq;

import java.io.InputStream;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jsjn.platform.util.ConfigBean;
import com.jsjn.platform.util.config.PlatformConfigReader;

/**
 * LinkQ配置类 默认读取platform_config/platform.properties
 * 
 * @author CodmerYin
 * 
 */
public class LinkQConfig {

	private final static Logger logger = LoggerFactory.getLogger(LinkQConfig.class);

	private static String configFilePath;

	public static String getConfigFilePath() {
		return configFilePath;
	}

	public static void setConfigFilePath(String configFilePath) {
		LinkQConfig.configFilePath = configFilePath;
	}

	//初始化方法
	public void init() {
		//加载配置
		InputStream in = ConfigBean.class.getClassLoader().getResourceAsStream(configFilePath);
		Properties pp = PlatformConfigReader.readFile(in);
		//读取LINKQ的配置
		if (in != null) {
			ConfigBean.LINKQ_SERVER = pp.getProperty("LINKQ_SERVER");
			String linkQServers = pp.getProperty("LINKQ_SERVERS");
			if (linkQServers != null) {
				String[] dd = linkQServers.split(",");
				for (String d : dd) {
					String[] df = d.split(":");
					ConfigBean.LINKQ_SERVERS.put(df[0], df[1]);
				}
			}
			ConfigBean.LINKQ_PORT = pp.getProperty("LINKQ_PORT");
			ConfigBean.LINKQ_TIMEOUT = pp.getProperty("LINKQ_TIMEOUT");
			ConfigBean.LINKQ_SENDQUEUE = pp.getProperty("LINKQ_SEND_QUEUE");
			ConfigBean.LINKQ_RECIVEQUEUE = pp.getProperty("LINKQ_RECIVE_QUEUE");
			ConfigBean.LINKQ_MAX_ACTIVE = (pp.getProperty("LINKQ_MAX_ACTIVE") == null ? ConfigBean.LINKQ_MAX_ACTIVE
					: Integer.parseInt(pp.getProperty("LINKQ_MAX_ACTIVE")));
			ConfigBean.LINKQ_MAX_IDLE = (pp.getProperty("LINKQ_MAX_IDLE") == null ? ConfigBean.LINKQ_MAX_IDLE
					: Integer.parseInt(pp.getProperty("LINKQ_MAX_IDLE")));
			ConfigBean.LINKQ_MAX_SLEEP_TIME = (pp.getProperty("LINKQ_MAX_SLEEP_TIME") == null ? ConfigBean.LINKQ_MAX_SLEEP_TIME
					: Integer.parseInt(pp.getProperty("LINKQ_MAX_SLEEP_TIME")));
			ConfigBean.LlNKQ_HEARTBEAT = (pp.getProperty("LlNKQ_HEARTBEAT") == null ? ConfigBean.LlNKQ_HEARTBEAT
					: Integer.parseInt(pp.getProperty("LlNKQ_HEARTBEAT")));
			ConfigBean.LINKQ_DEC_PREC = (pp.getProperty("LINKQ_DEC_PREC") == null ? ConfigBean.LINKQ_DEC_PREC
					: Integer.parseInt(pp.getProperty("LINKQ_DEC_PREC")));

			logger.info("LINKQ_SERVER:" + ConfigBean.LINKQ_SERVER);
			logger.info("LINKQ_SERVERS:" + linkQServers);
			logger.info("LINKQ_PORT:" + ConfigBean.LINKQ_PORT);
			logger.info("LINKQ_TIMEOUT:" + ConfigBean.LINKQ_TIMEOUT);
			logger.info("LINKQ_SENDQUEUE:" + ConfigBean.LINKQ_SENDQUEUE);
			logger.info("LINKQ_RECIVEQUEUE:" + ConfigBean.LINKQ_RECIVEQUEUE);
			logger.info("LINKQ_MAX_ACTIVE:" + ConfigBean.LINKQ_MAX_ACTIVE);
			logger.info("LINKQ_MAX_IDLE:" + ConfigBean.LINKQ_MAX_IDLE);
			logger.info("LINKQ_MAX_SLEEP_TIME:" + ConfigBean.LINKQ_MAX_SLEEP_TIME);
			logger.info("LlNKQ_HEARTBEAT:" + ConfigBean.LlNKQ_HEARTBEAT);
			logger.info("LINKQ_DEC_PREC:" + ConfigBean.LINKQ_DEC_PREC);
		}
	}
}
