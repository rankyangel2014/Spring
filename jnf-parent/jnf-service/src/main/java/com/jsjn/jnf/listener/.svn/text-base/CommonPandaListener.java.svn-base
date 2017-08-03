package com.jsjn.jnf.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.security.SaltManager;
import com.jsjn.panda.listener.PandaStartUpListner;

/**
 * 
 * @author lilong
 *
 */
public class CommonPandaListener implements PandaStartUpListner {
	
	private final static Logger logger = LoggerFactory.getLogger(CommonPandaListener.class);

	@Override
	public void beforeRegister() {
	}

	@Override
	public void beforeSetup() {

	}

	@Override
	public void beforeSubscribe() {

	}

	@Override
	public void destory() {

	}

	@Override
	public void init() {
		SaltManager.setDigestSalt(Global.getConfig("salt.digest"));
		SaltManager.setEncryptionSalt(Global.getConfig("salt.encryption"));
		logger.info("common panda listener start...");
		
	}

}
