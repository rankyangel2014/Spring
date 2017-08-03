package com.jsjn.skylark.combination;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.ServletContextListener;

import com.jsjn.skylark.mloan.web.filter.MloanFilter;
import com.jsjn.skylark.mloan.web.listener.MloanServletContextListener;
import com.jsjn.skylark.combination.dep.AppComp;
import com.jsjn.skylark.common.Constant;
import com.jsjn.skylark.common.utils.PropertiesLoader;

public class MloanCombinationImpl implements Combination {

	private static PropertiesLoader loader = new PropertiesLoader(
			"/mloan/mloan.properties");

	public String getAppName() {
		return loader.getProperty("appName");
	}

	public String getVersion() {
		return loader.getProperty("appVersion");
	}

	public ServletContextListener getListener() {

		return new MloanServletContextListener();
	}

	public Filter getFilter() {
		return new MloanFilter();
	}

	public List<AppComp> getAppComp() {
		final String httpBaseUrl = Constant.getConfig("common.httpBaseUrl");
		List<AppComp> comps = new ArrayList<AppComp>();
		AppComp comp = new AppComp();
		comp.setAppName(loader.getProperty("appName"));
		comp.setDisplayName(loader.getProperty("appDisplayName"));
		comp.setUrl(httpBaseUrl + loader.getProperty("appUpdateUrl"));
		comp.setVersion(loader.getProperty("appVersion"));
		comps.add(comp);
		return comps;
	}

	@Override
	public String getUnfilteredURIs() {

		return "(.*stat\\.do)|(.*queryIP\\.do)";
	}

	public String getAppWebServer() {
		return loader.getProperty("appWebServer");
	}

}
