package com.jsjn.jnf;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;

public class TcpClientHandler extends SimpleChannelInboundHandler<Object> {
	
	private String message ;

	@Override
	protected void channelRead0(ChannelHandlerContext ctx, Object msg)
			throws Exception {
		// TODO Auto-generated method stub
		System.out.println("客户端接收到消息："+msg.toString());
		this.message = msg.toString();
		
	}
	
	
	public String getMessage() {
		return message;
	}
	
	

}
