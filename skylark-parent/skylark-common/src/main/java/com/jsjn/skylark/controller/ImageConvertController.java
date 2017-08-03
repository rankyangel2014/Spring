package com.jsjn.skylark.controller;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.GetMethod;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
/**
 * 把base64编码的文本转成图片
 * @author Ghost
 *
 */
@Controller
public class ImageConvertController extends AbstractBaseController {

	@ResponseBody
	@RequestMapping(value = "/skylark/convertBase64ToImage.do")
	public void convertBase64ToImage(HttpServletRequest req,
			HttpServletResponse resp, String fileId) throws IOException {
		HttpClient client = new HttpClient();
		//weedfs地址
		GetMethod get = new GetMethod("http://172.31.18.153/mloan" + fileId);
		client.executeMethod(get);
		String str = get.getResponseBodyAsString();
		get.releaseConnection();
		String contentType = str.substring(5, str.indexOf(";"));
		String content = str.substring(str.indexOf(",") + 1);
		resp.setContentType(contentType);
		OutputStream out = resp.getOutputStream();
		out.write(Base64.decodeBase64(content.getBytes()));
		out.flush();
		out.close();
	}

}
