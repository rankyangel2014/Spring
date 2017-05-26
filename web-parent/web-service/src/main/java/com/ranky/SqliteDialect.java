package com.ranky;

import org.apache.ibatis.mapping.MappedStatement;

import com.github.miemiedev.mybatis.paginator.dialect.Dialect;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;

public class SqliteDialect extends Dialect {

	public SqliteDialect(MappedStatement mappedStatement, Object parameterObject, PageBounds pageBounds) {
		super(mappedStatement, parameterObject, pageBounds);
	}

	protected String getLimitString(String sql, String offsetName, int offset, String limitName, int limit) {
		sql = sql.trim();
		// boolean isForUpdate = false;
		// if (sql.toLowerCase().endsWith(" for update")) {
		// sql = sql.substring(0, sql.length() - 11);
		// isForUpdate = true;
		// }
		System.out.println("limit:" + limit);
		System.out.println("limitName:" + limitName);
		System.out.println("offset:" + offset);
		System.out.println("offsetName:" + offsetName);

		StringBuffer pagingSelect = new StringBuffer(sql.length() + 100);
		// if (offset > 0) {
		// pagingSelect.append("select * from ( select row_.*, rownum rownum_
		// from ( ");
		// } else {
		// pagingSelect.append("select * from ( ");
		// }
		pagingSelect.append(sql);
		if (offset > 0) {
			pagingSelect.append(" limit ? offset ?");
			setPageParameter(limitName, limit, Integer.class);
			setPageParameter(offsetName, offset, Integer.class);
		} else {
			pagingSelect.append(" limit ?");
			setPageParameter(limitName, limit, Integer.class);
		}

		// if (isForUpdate) {
		// pagingSelect.append(" for update");
		// }

		return pagingSelect.toString();
	}

}
