package com.ranky.sqlbuilder;

import org.apache.ibatis.jdbc.SQL;

public class UserSqlBuilder {
	public String findUser() {
		return new SQL() {
			{
				SELECT("*");
				FROM("mytable");
				WHERE("value like #{value} || '%'");
			}
		}.toString();

	}
}