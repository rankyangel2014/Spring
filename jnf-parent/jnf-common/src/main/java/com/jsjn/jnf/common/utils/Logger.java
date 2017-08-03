package com.jsjn.jnf.common.utils;

import java.text.MessageFormat;
import java.util.Date;

import org.apache.log4j.Level;
import org.apache.log4j.spi.LoggingEvent;

/**
 * 调用方法 
 * import com.jsjn.jnf.common.utils.Logger
 * public static Logger logger = Logger.getLogger(Test.class);
 * @author Administrator
 *
 */
public class Logger {

	private final org.apache.log4j.Logger logger;
	/**
	 * 日志流水号
	 */
	private static ThreadLocal<String> loggerIdThreadLocal = new ThreadLocal<String>();
	private Logger(Class<?> clazz) {
		logger = org.apache.log4j.Logger.getLogger(clazz);
	}
	
	public static Logger getLogger(Class<?> clazz) {
		return new Logger(clazz);
	}
	
	/**
	 * 获取日志流水号
	 * @return
	 */
	public static String loggerId(){
		if (("").equals(loggerIdThreadLocal.get())||loggerIdThreadLocal.get()==null){
			String globalSeq = "JN"+DateUtils.formatDate(new Date(), "yyMMddHHmmssSSS")+IdGen.randomBase62(5);
			loggerIdThreadLocal.set(globalSeq);
		}
		return loggerIdThreadLocal.get();
	}
	
	/**
	 * 设置日志流水号(service层需要设置，portal和open不需要设置)
	 * @param id
	 */
	public static void setLoggerId(String id){
		loggerIdThreadLocal.set(id);
	}

	public void debug(Object message) {
		//if (logger.isDebugEnabled()) {
			forcedLog(logger, Level.DEBUG, message);
		//}
	}

	public void debug(Object message, Throwable t) {
		//if (logger.isDebugEnabled()) {
			forcedLog(logger, Level.DEBUG, message, t);
		//}
	}

	public void debug(String pattern, Object... arguments) {
		//if (logger.isDebugEnabled()) {
			forcedLog(logger, Level.DEBUG, format(pattern, arguments));
		//}
	}
	
	public void debug(String pattern, Throwable t, Object... arguments) {
		//if (logger.isDebugEnabled()) {
			forcedLog(logger, Level.DEBUG, format(pattern, arguments), t);
		//}
	}
	
	public void info(Object message) {
		//if (logger.isDebugEnabled()) {
			forcedLog(logger, Level.INFO, message);
		//}
	}

	public void info(Object message, Throwable t) {
		//if (logger.isDebugEnabled()) {
			forcedLog(logger, Level.INFO, message, t);
		//}
	}

	public void info(String pattern, Object... arguments) {
		//if (logger.isDebugEnabled()) {
			forcedLog(logger, Level.INFO, format(pattern, arguments));
		//}
	}
	
	public void info(String pattern, Throwable t, Object... arguments) {
		//if (logger.isDebugEnabled()) {
			forcedLog(logger, Level.INFO, format(pattern, arguments), t);
		//}
	}
	
	public void error(Object message) {
		//if (logger.isDebugEnabled()) {
			forcedLog(logger, Level.ERROR, message);
		//}
	}
	public void error(Throwable t) {
		//if (logger.isDebugEnabled()) {
			forcedLog(logger, Level.ERROR, "",t);
		//}
	}
	public void error(Object message, Throwable t) {
		//if (logger.isDebugEnabled()) {
			forcedLog(logger, Level.ERROR, message, t);
		//}
	}

	public void error(String pattern, Object... arguments) {
		//if (logger.isDebugEnabled()) {
			forcedLog(logger, Level.ERROR, format(pattern, arguments));
		//}
	}
	
	public void error(String pattern, Throwable t, Object... arguments) {
		//if (logger.isDebugEnabled()) {
			forcedLog(logger, Level.ERROR, format(pattern, arguments), t);
		//}
	}	

	private static void forcedLog(org.apache.log4j.Logger logger, Level level,Object message) {
		logger.callAppenders(new LoggingEvent(FQCN, logger, level, loggerId()+"|"+message,null));
	}

	private static void forcedLog(org.apache.log4j.Logger logger, Level level,Object message, Throwable t) {
		logger.callAppenders(new LoggingEvent(FQCN, logger, level, loggerId()+"|"+message, t));
	}

	private static String format(String pattern, Object... arguments) {
		return MessageFormat.format(pattern, arguments);
	}

	private static final String FQCN;

	static {
		FQCN = Logger.class.getName();
	}
}