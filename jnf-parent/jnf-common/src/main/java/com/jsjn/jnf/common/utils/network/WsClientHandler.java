package com.jsjn.jnf.common.utils.network;


import org.codehaus.xfire.MessageContext;
import org.codehaus.xfire.handler.AbstractHandler;
import org.jdom.Element;

public class WsClientHandler extends AbstractHandler {  
	    private String userName = null;  
	    private String password = null;  
	    
	    public WsClientHandler(String userName, String password) {  
	        this.userName = userName;  
	        this.password = password;  
	    }  
	    @Override  
	    public void invoke(MessageContext context) throws Exception {  
	        Element header = new Element("header");  
	        context.getOutMessage().setHeader(header);  
	        Element user = new Element("user");  
	        Element name = new Element("name");  
	        name.addContent(userName);  
	        Element pwd = new Element("password");  
	        pwd.addContent(password);
	        user.addContent(name);  
	        user.addContent(pwd);  
	        header.addContent(user);
	    }  
	}
