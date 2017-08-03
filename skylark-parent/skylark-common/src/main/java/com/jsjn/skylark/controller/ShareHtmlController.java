package com.jsjn.skylark.controller;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.RandomUtils;
import org.joda.time.DateTime;
import org.joda.time.Days;
import org.joda.time.LocalDate;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.google.common.base.Preconditions;
import com.jsjn.skylark.bean.MessageDto;
import com.jsjn.skylark.session.UserInfo;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.WriteResult;

@Controller
@RequestMapping("/skylark/share")
public class ShareHtmlController extends AbstractBaseController {

	private static Mongo mg;
	private static DB db;
	private static DBCollection collection;
	private static DateTimeFormatter format = DateTimeFormat
			.forPattern("yyyy-MM-dd HH:mm:ss");

	static {
		try {
			mg = new Mongo("192.168.10.149", 27017);// 建立连接
			db = mg.getDB("test");// 数据库名
			collection = db.getCollection("test");// 集合名，对应mysql中的表名
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 生成跳转到模板的URL地址
	 * @param message
	 * @param req
	 * @param resp
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("genUrl.do")
	@ResponseBody
	public String genUrl(MessageDto message, HttpServletRequest req,
			HttpServletResponse resp) throws Exception {

		UserInfo userDto = getUserDto(req);//获取用户ID
		String isCode = message.getIsCode();
		String subject = Preconditions.checkNotNull(message.getSubject());
		String messageStr = Preconditions.checkNotNull(message.getMessage());
//		String expireDate = Preconditions.checkNotNull(message.getExpireDate());
		String templateNm = Preconditions.checkNotNull(message.getTemplateNm());
		JSONObject json = new JSONObject();
		DBObject obj = new BasicDBObject();
		String messageId = UUID.randomUUID().toString().replaceAll("-", "");
		String code = StringUtils.mid(messageId, RandomUtils.nextInt(24), 4);
		if (StringUtils.isNotBlank(isCode)) {// 生成提取码
			obj.put("code", code);
			json.put("code", code);
		} else {
			json.put("code", "");
		}
		obj.put("id", messageId);
		obj.put("subject", subject);
		obj.put("message", messageStr);
//		obj.put("expireDate", expireDate);
		obj.put("templateNm", templateNm);
		obj.put("createBy", userDto.getUserId());
		obj.put("createTime", new DateTime().toString(format));
		
		WriteResult wr = collection.insert(obj);//入库
		if (wr.getError() == null) {
			json.put("success", "true");
			json.put("messageId", messageId);
			return json.toJSONString();
		}
		return null;
	}

	/**
	 * 跳转到相应模板页面
	 * @param message
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("forwordPage.do")
	public String forwordPage(MessageDto message, ModelMap model)
			throws Exception {
		String id = Preconditions.checkNotNull(message.getId());
		BasicDBObject filter_dbobject = new BasicDBObject();
		filter_dbobject.put("id", id);
		DBObject cursor = collection.findOne(filter_dbobject);
		String code = String.valueOf(cursor.get("code"));
		JSONObject json = JSONObject.parseObject(String.valueOf(cursor
				.get("message")));
		model.put("subject", cursor.get("subject"));
		model.put("repay", json.get("repay"));
		model.put("repayList", json.get("repayList"));
//		LocalDate createDate = format.parseDateTime(
//				cursor.get("createTime").toString()).toLocalDate();
//		
//		LocalDate endDate = format.parseDateTime(
//				cursor.get("expireDate").toString()).toLocalDate();
//		 是否过期(超过一天即过期)
//		if (Days.daysBetween(createDate, endDate).getDays() > 1) {
//			return "expire";
//		}
		if (StringUtils.isNotBlank(code)
				&& !StringUtils.equalsIgnoreCase(message.getCode(), code)) {
			model.put("id", id);
			if (StringUtils.equalsIgnoreCase("true", message.getIsCode())) {
				model.put("errMessage", "提取码错误，请重新输入！");
			}
			return "code";
		}

		return Preconditions.checkNotNull(cursor.get("templateNm")).toString();
	}
}
