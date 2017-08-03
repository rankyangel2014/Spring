package com.jsjn.skylark.combination;

import java.util.List;

import javax.servlet.ServletContextListener;
import javax.servlet.Filter;

import com.jsjn.skylark.combination.dep.AppComp;

/**若要整合到skylark平台，必须实现该接口。
 * 并且实现类必须在 com.jsjn.skylark.combination 包下。
 * 实现类的名称要符合规范，为 应用名+CombinationImpl。
 * @author think
 *
 */
public interface Combination {

	/**向skylark平台提供该应用的名称
	 * @return
	 */
	String getAppName();
	
	/**向平台提供该应用的版本信息。
	 * @return
	 */
	String getVersion();
	
	/**向平台提供app组件信息。格式为jsonobject。要求如下：<br/>
	 *@return {<br/>
        &emsp;"comp1": {<br/>
            &emsp;&emsp;"comp": "comp1",<br/>
            &emsp;&emsp;"url": "http://172.31.210.70:8080/skylark/_update/comp1.zip",<br/>
            &emsp;&emsp;"version": "0.0.1"<br/>
        	&emsp;},<br/>
        &emsp;"comp2": {<br/>
            &emsp;&emsp;"comp": "comp2",<br/>
            &emsp;&emsp;"url": "http://172.31.210.70:8080/skylark/_update/comp2.zip",<br/>
            &emsp;&emsp;"version": "0.0.1"<br/>
        	&emsp;},<br/>
        	&emsp;...<br/>
    	}<br/>
	 */
	List<AppComp> getAppComp();
	
	/**向平台提供监听器。有平台的监听器统一管理。
	 * @return
	 */
	ServletContextListener getListener();
	
	/**向平台提供过滤器，有平台的过滤器统一管理。
	 * @return
	 */
	Filter getFilter();
	
	/**向平台提供不需要过滤的uri。正则表达式。
	 * @return
	 */
	String getUnfilteredURIs();
	
	/**
	 * 向平台提供后台访问的web服务器地址
	 * @return
	 */
	String getAppWebServer();
}
