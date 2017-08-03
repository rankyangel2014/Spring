//package com.jsjn.jnf;
//
//import java.io.BufferedReader;
//import java.io.IOException;
//import java.io.InputStreamReader;
//import java.io.PrintWriter;
//import java.io.StringReader;
//import java.net.ServerSocket;
//import java.net.Socket;
//import java.net.SocketException;
//
//import org.apache.commons.lang3.StringUtils;
//import org.jdom.Document;
//import org.jdom.Element;
//import org.jdom.input.SAXBuilder;
//import org.xml.sax.InputSource;
//
//import com.jsjn.jnf.bean.bo.integration.CardBinRspDto;
//import com.jsjn.jnf.bean.bo.integration.SingleWithholdRspDto;
//import com.jsjn.jnf.bean.bo.integration.WhiteListSignRspDto;
//import com.jsjn.jnf.bean.bo.integration.WithholdStatusRspDto;
//import com.jsjn.jnf.common.mapper.JaxbMapper;
//import com.jsjn.jnf.common.utils.Logger;
//
//public class TcpServer {
//
//	private final static Logger logger = Logger.getLogger(TcpServer.class);
//
//	public static void main(String[] args) {
//		new TcpServer().startup();
//	}
//
//	/**
//	 * 启动函数
//	 */
//	public void startup() {
//		ServerSocket ss = null;
//		try {
//			ss = new ServerSocket(6666);
//			while (true) {
//				Socket s = ss.accept();
//				new Thread(new ServerThread(s)).start();
//			}
//		} catch (IOException e) {
//			logger.error(e);
//		}
//	}
//
//	private class ServerThread implements Runnable {
//		private Socket s;
//		private BufferedReader br;
//		private PrintWriter out;
//		private boolean flag = true;
//
//		public ServerThread(Socket s) throws IOException {
//			this.s = s;
//			br = new BufferedReader(new InputStreamReader(
//					this.s.getInputStream()));
//			out = new PrintWriter(this.s.getOutputStream(), true);
//		}
//
//		private void stop() {
//			flag = false;
//		}
//
//		@Override
//		public void run() {
//			try {
//				while (true) {
//					if (!flag)
//						break;
//					String str = br.readLine();
//					if (StringUtils.isNotBlank(str)) {
//						out.println(handlerMessage(str));
//					}
//				}
//			} catch (SocketException e) {
//				logger.error(e);
//				stop();
//			} catch (IOException e) {
//				logger.error(e);
//			} finally {
//				try {
//					if (br != null)
//						br.close();
//					if (out != null)
//						out.close();
//					if (s != null)
//						s.close();
//				} catch (IOException e) {
//					logger.error(e);
//				}
//			}
//		}
//
//		/**
//		 * 处理接收到的xml并返回给客户端
//		 * 
//		 * @param msg
//		 * @return
//		 */
//		private String handlerMessage(String msg) {
//			logger.info("Server接收消息:" + msg);
//			String str = null;
//			CardBinRspDto cardBinRspDto = null;
//			SingleWithholdRspDto singleWithholdRspDto = null;
//			WhiteListSignRspDto whiteListSignRspDto = null;
//			WithholdStatusRspDto withholdStatusRspDto = null;
//			String tranCd = getTranCdFromXML(msg.substring(4));
//			// 单笔代扣
//			if (StringUtils.equals("7826", tranCd)) {
//				singleWithholdRspDto = new SingleWithholdRspDto();
//				singleWithholdRspDto.setStatus("000000");
//				singleWithholdRspDto.setOrderNo("12320887");
//				singleWithholdRspDto.setSerialNo("342394838");
//				singleWithholdRspDto.setResCode("000000");
//				singleWithholdRspDto.setResMsg("成功");
//				str = JaxbMapper.toXml(singleWithholdRspDto, "GBK");
//				// 白名单
//			} else if (StringUtils.equals("7820", tranCd)) {
//				whiteListSignRspDto = new WhiteListSignRspDto();
//				whiteListSignRspDto.setResCode("000000");
//				whiteListSignRspDto.setResMsg("成功");
//				whiteListSignRspDto.setSignNo("342394838");
//				str = JaxbMapper.toXml(whiteListSignRspDto, "GBK");
//				// 卡BIN查询
//			} else if (StringUtils.equals("7830", tranCd)) {
//				cardBinRspDto = new CardBinRspDto();
//				cardBinRspDto.setResCode("000000");
//				cardBinRspDto.setResMsg("成功");
//				cardBinRspDto.setBankCode("6002");
//				cardBinRspDto.setBankName("工商银行");
//				str = JaxbMapper.toXml(cardBinRspDto, "GBK");
//				// 查询代扣状态
//			} else if (StringUtils.equals("7840", tranCd)) {
//				withholdStatusRspDto = new WithholdStatusRspDto();
//				withholdStatusRspDto.setResCode("000000");
//				withholdStatusRspDto.setResMsg("成功");
//				withholdStatusRspDto.setStatus("000000");
//				str = JaxbMapper.toXml(withholdStatusRspDto, "GBK");
//			} else {
//				logger.error("未知的服务");
//			}
//			logger.info("服务器返回：" + str);
//			return str.replaceAll("\r|\n", "");
//		}
//
//		/**
//		 * 获取交易码
//		 * 
//		 * @param xmlString
//		 * @return
//		 */
//		private String getTranCdFromXML(String xmlString) {
//			SAXBuilder saxbBuilder = new SAXBuilder();
//			StringReader read = new StringReader(xmlString);
//			Document document = null;
//			Element root = null;
//			try {
//				document = saxbBuilder.build(new InputSource(read));
//				root = document.getRootElement();
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//			return root.getChildText("tranCd");
//		}
//	}
//}
