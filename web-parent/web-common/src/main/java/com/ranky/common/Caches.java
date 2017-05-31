package com.ranky.common;

/**
 * 定義cache名稱、超時時長（秒）、最大size 每个cache缺省半小时超时、最多缓存50000条数据，需要修改可以在构造方法的参数中指定。
 */
public enum Caches {
	users(60), images(60), torrents(60), films(60);

	Caches() {
	}

	Caches(int ttl) {
		this.ttl = ttl;
	}

	Caches(int ttl, int maxSize) {
		this.ttl = ttl;
		this.maxSize = maxSize;
	}

	private int maxSize = 50000; // 最大數量
	private int ttl = 1800; // 过期时间（秒）

	public int getMaxSize() {
		return maxSize;
	}

	public void setMaxSize(int maxSize) {
		this.maxSize = maxSize;
	}

	public int getTtl() {
		return ttl;
	}

	public void setTtl(int ttl) {
		this.ttl = ttl;
	}
}
