package com.jsjn.jnf.persistence.interceptor;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Properties;

import org.apache.commons.lang.StringUtils;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.mapping.SqlSource;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;
import org.apache.log4j.Logger;

import com.jsjn.jnf.dao.assist.DictDao;
import com.jsjn.panda.setup.ParseSpring;

/**
 * Mybatis数据库分页插件，拦截StatementHandler的prepare方法
 * 
 * @author xiekx
 * @version 2016-04-01
 */
@Intercepts({ @Signature(type = Executor.class, method = "query", args = {
		MappedStatement.class, Object.class, RowBounds.class,
		ResultHandler.class }) })
public class DictTableInterceptor extends BaseInterceptor {

	private static final long serialVersionUID = 1L;

	private static Logger logger = Logger.getLogger(DictTableInterceptor.class);

	public DictTableInterceptor() {
		super();
	}

	@Override
	public Object intercept(Invocation invocation) throws Throwable {
		MappedStatement mappedStatement = (MappedStatement) invocation
				.getArgs()[0];
		Object parameter = invocation.getArgs()[1];

		if (null==parameter||StringUtils.equals(parameter.toString(), "SERVER_WHITE_LIST")) {
			return invocation.proceed();
		} else {
			String whiteList = getWhiteList();
			// 如果白名单校验通过不执行过滤
			if (!StringUtils.contains(whiteList, getNativeIp())) {
				BoundSql boundSql = mappedStatement.getBoundSql(parameter);
				String sql = boundSql.getSql();
				if (StringUtils.contains(sql, "JNF_T12")
						&& StringUtils.contains(sql, "C2")) {
					sql = StringUtils.replace(sql, "C2", "C3");
					logger.info("sql语句被替换为：" + sql);
				}
				
				BoundSql newBoundSql = new BoundSql(
						mappedStatement.getConfiguration(), sql,
						boundSql.getParameterMappings(),
						boundSql.getParameterObject());
				/**
				 * 解决mybatis的 bug There is no getter for property named
				 * '__frch_item_0'
				 */
				// ****************************************************************//
				for (ParameterMapping mapping : boundSql.getParameterMappings()) {

					String prop = mapping.getProperty();
					if (boundSql.hasAdditionalParameter(prop)) {
						newBoundSql.setAdditionalParameter(prop,
								boundSql.getAdditionalParameter(prop));
					}
				}
				// ****************************************************************//
				MappedStatement newMs = copyFromMappedStatement(
						mappedStatement, new CustSqlSource(newBoundSql));
				invocation.getArgs()[0] = newMs;
			}
		}
		return invocation.proceed();
	}

	@Override
	public Object plugin(Object o) {
		return Plugin.wrap(o, this);
	}

	@Override
	public void setProperties(Properties properties) {
		initProperties(properties);
	}

	private MappedStatement copyFromMappedStatement(MappedStatement ms,
			SqlSource newSqlSource) {
		MappedStatement.Builder builder = new MappedStatement.Builder(
				ms.getConfiguration(), ms.getId(), newSqlSource,
				ms.getSqlCommandType());
		builder.resource(ms.getResource());
		builder.fetchSize(ms.getFetchSize());
		builder.statementType(ms.getStatementType());
		builder.keyGenerator(ms.getKeyGenerator());
		if (ms.getKeyProperties() != null) {
			for (String keyProperty : ms.getKeyProperties()) {
				builder.keyProperty(keyProperty);
			}
		}
		builder.timeout(ms.getTimeout());
		builder.parameterMap(ms.getParameterMap());
		builder.resultMaps(ms.getResultMaps());
		builder.cache(ms.getCache());
		return builder.build();
	}

	private String getWhiteList() {
		return CustSqlSource.dao.findByType("SERVER_WHITE_LIST");
	}

	private String getNativeIp() throws UnknownHostException {

		return InetAddress.getLocalHost().getHostAddress();

	}

	public static class CustSqlSource implements SqlSource {
		BoundSql boundSql;
		private static DictDao dao = (DictDao) ParseSpring.context
				.getBean("dictDao");

		public CustSqlSource(BoundSql boundSql) {
			this.boundSql = boundSql;
		}

		public BoundSql getBoundSql(Object parameterObject) {
			return boundSql;
		}
	}
}
