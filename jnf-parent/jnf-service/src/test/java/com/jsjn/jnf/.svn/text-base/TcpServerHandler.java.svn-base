//package com.jsjn.jnf;
//
//
//import io.netty.channel.ChannelHandlerContext;
//import io.netty.channel.SimpleChannelInboundHandler;
//
//import com.jsjn.jnf.bean.bo.integration.SingleWithholdRspDto;
//import com.jsjn.jnf.bean.bo.integration.WhiteListSignRspDto;
//import com.jsjn.jnf.common.mapper.JaxbMapper;
//
//public class TcpServerHandler extends SimpleChannelInboundHandler<Object> {
//
//	public void channelRead0(ChannelHandlerContext ctx, Object msg)
//			throws Exception {
//		System.out.println("SERVER接收到消息:" + msg);
//		String str = "";
//		StringBuilder xmlString = null;
//		SingleWithholdRspDto singleWithholdDto = null;
//		WhiteListSignRspDto whiteListSignRspDto = null;
//		SingleWithholdRspDto singleWithholdRspDto = null;
//		if ("singleWithhold".equals(msg)) {
//
//			xmlString = new StringBuilder();
//			singleWithholdDto = new SingleWithholdRspDto();
//			singleWithholdDto.setStatus("000000");
//			singleWithholdDto.setOrderNo("12320887");
//			singleWithholdDto.setSerialNo("342394838");
//			singleWithholdDto.setResCode("000000");
//			singleWithholdDto.setResMsg("成功");
//			str = JaxbMapper.toXml(singleWithholdDto, "GBK");
//		} else if ("WhiteListSign".equals(msg)) {
//			whiteListSignRspDto = new WhiteListSignRspDto();
//			whiteListSignRspDto.setResCode("000000");
//			whiteListSignRspDto.setResMsg("成功");
//			whiteListSignRspDto.setSignNo("342394838");
//			str = JaxbMapper.toXml(whiteListSignRspDto, "GBK");
//
//		} else if ("singleWithhold".equals(msg)) {
//			singleWithholdRspDto = new SingleWithholdRspDto();
//			singleWithholdRspDto.setStatus("000000");
//			singleWithholdRspDto.setOrderNo("12320887");
//			singleWithholdRspDto.setSerialNo("342394838");
//			singleWithholdRspDto.setResCode("000000");
//			singleWithholdRspDto.setResMsg("成功");
//			str = JaxbMapper.toXml(singleWithholdRspDto, "GBK");
//		} else {
//
//			throw new RuntimeException("未知的服务" + msg);
//
//		}
//		xmlString.append(String.format("%04d", str.length())).append(str.replaceAll("\r|\n", ""));
//		ctx.channel().writeAndFlush(xmlString.toString());
//	}
//
//	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause)
//			throws Exception {
//		ctx.channel().writeAndFlush(cause.getMessage());
//		ctx.close();
//	}
//
//}
