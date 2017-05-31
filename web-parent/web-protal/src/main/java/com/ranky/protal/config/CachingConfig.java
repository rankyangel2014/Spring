package com.ranky.protal.config;

import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.guava.GuavaCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import com.google.common.cache.CacheBuilder;
import com.ranky.common.Caches;

@Configuration
@EnableCaching
public class CachingConfig {
	/**
	 * 创建基于guava的Cache Manager
	 * 
	 * @return
	 */
	@Bean
	@Primary
	public CacheManager guavaCacheManager() {
		SimpleCacheManager cacheManager = new SimpleCacheManager();
		// 把各个cache注册到cacheManager中，GuavaCache实现了org.springframework.cache.Cache接口
		ArrayList<GuavaCache> caches = new ArrayList<GuavaCache>();
		for (Caches c : Caches.values()) {
			caches.add(new GuavaCache(c.name(),
					CacheBuilder.newBuilder()
							.recordStats()
							.expireAfterWrite(c.getTtl(), TimeUnit.SECONDS)
							.maximumSize(c.getMaxSize())
							.build()));
		}
		cacheManager.setCaches(caches);
		return cacheManager;
	}
}