package com.ranky.protal.config;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSource;
import org.apache.ibatis.logging.slf4j.Slf4jImpl;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.github.miemiedev.mybatis.paginator.OffsetLimitInterceptor;
import com.ranky.aop.MybatisPlugin;

/**
 * Created by admin on 16/8/8.
 */

@Configuration
@EnableTransactionManagement
@PropertySource({ "classpath:jdbc.properties" })
public class DataSourceConfig {

	@Value("${jdbc.driver}")
	private String jdbcDriver;

	@Value("${db.url}")
	private String dbUrl;

	//	@Value("${db.username}")
	//	private String username;
	//
	//	@Value("${db.password}")
	//	private String password;
	//
	//	@Value("${db.maxtotal}")
	//	private Integer maxTotal;
	//
	//	@Value("${db.minidle}")
	//	private Integer minIdle;
	//
	//	@Value("${db.maxidle}")
	//	private Integer maxIdle;

	@Bean(destroyMethod = "close")
	public DataSource dataSource() {
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName(jdbcDriver);
		dataSource.setUrl(dbUrl);
		//		dataSource.setUsername(username);
		//		dataSource.setPassword(password);
		//		dataSource.setMaxActive(maxTotal);
		//		dataSource.setMinIdle(minIdle);
		//		dataSource.setMaxIdle(maxIdle);
		return dataSource;
	}

	@Bean
	public DataSourceTransactionManager txManager() {
		return new DataSourceTransactionManager(dataSource());
	}

	@Bean
	public SqlSessionFactory sqlSessionFactory() throws Exception {
		SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
		org.apache.ibatis.session.Configuration config = new org.apache.ibatis.session.Configuration();
		config.setLogImpl(Slf4jImpl.class);// 指定log实现
		// 配置分页插件
		OffsetLimitInterceptor pagingInterceptor = new OffsetLimitInterceptor();
		// 配置数据库方言
		// pagingInterceptor.setDialectClass("com.github.miemiedev.mybatis.paginator.dialect.OracleDialect");
		pagingInterceptor.setDialectClass("com.ranky.SqliteDialect");
		config.addInterceptor(pagingInterceptor);
		// 配置自定义插件
		config.addInterceptor(new MybatisPlugin());
		sessionFactory.setConfiguration(config);
		sessionFactory.setDataSource(dataSource());
		return sessionFactory.getObject();
	}
}