package com.ranky.task;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.function.Consumer;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.utils.URIBuilder;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.google.common.collect.Lists;
import com.ranky.bean.FilmDto;
import com.ranky.bean.ImageDto;
import com.ranky.bean.TorrentDto;
import com.ranky.service.FilmService;

//@Component
public class TimeTask {

	@Autowired
	private FilmService filmService;

	// @Scheduled(cron = "0/5 * * * * ?")
	public void execute() {
		System.err.println("*******定时任务begin********");
		getFilmInfo("thread-1053416-1-1.html");
		System.err.println("*******定时任务end********");
	}

	private static final String THZHD_URI_PREFIX = "http://www.taohuabbs.cc/";

	public Integer getPageCount() {
		Document doc = null;
		try {
			doc = Jsoup.connect(THZHD_URI_PREFIX + "forum-181-1.html")
					.timeout(4000).get();
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
		if (doc != null) {
			Element pageCountElement = doc.getElementById("autopbn");
			String pageCountStr = pageCountElement.attr("totalpage");
			System.out.println(pageCountStr);
			return Integer.parseInt(pageCountStr);

		}
		return 0;
	}

	public void getFilmInfo(String url) {
		String uuid = UUID.randomUUID().toString();
		String tid = StringUtils.replaceChars(uuid, "-", "");

		if (StringUtils.isBlank(url)) {
			return;
		}

		Document doc = null;
		try {
			doc = Jsoup.connect(THZHD_URI_PREFIX + url).timeout(4000).get();
		} catch (Exception e1) {
			System.err.println(url + e1.getMessage());
		}

		Elements aidEles = doc.select(".attnm a[href]");
		Elements imgEles = doc.select("img[file]");
		String[] arr = doc.select("td .t_f").get(0).text().split("[【：】]");

		List<ImageDto> imgs = Lists.newArrayListWithCapacity(imgEles.size());
		imgEles.forEach(new Consumer<Element>() {
			@Override
			public void accept(Element t) {
				try {
					String imgUrl = t.attr("file");
					String.format(
							"INSERT INTO T_IMGS(TID,IMGURL) VALUES(%s,%s);",
							tid, imgUrl);
					imgs.add(new ImageDto(tid, imgUrl, "N"));
				} catch (Exception e) {
					e.printStackTrace();
				}

			}

		});

		List<TorrentDto> aids = Lists.newArrayListWithCapacity(aidEles.size());
		aidEles.forEach(new Consumer<Element>() {
			@Override
			public void accept(Element t) {
				try {
					URIBuilder uri = new URIBuilder(t.attr("href"));
					String said = uri.getQueryParams().get(0).getValue();
					String aid = String.format(THZHD_URI_PREFIX
							+ "forum.php?mod=attachment&aid=%s", said);
					aids.add(new TorrentDto(tid, "N", t.text(), aid));
					// String.format("INSERT INTO T_AIDS(TID,AID) VALUES(%s,%s);",
					// tid, aid);
				} catch (Exception e) {
					e.printStackTrace();
				}

			}

		});
		String serialNo = arr[25].substring(2);
		String filmName = arr[3];
		String actorName = arr[6];
		String filmExt = arr[9];
		String filmSize = arr[12];
		String filmDuration = arr[14].substring(2);
		String markInfo = arr[17];
		String releaseTime = arr[20];
		String torrentTerm = arr[23];

		FilmDto filmDto = new FilmDto();
		filmDto.setTid(tid);
		filmDto.setSerialNo(serialNo);
		filmDto.setFilmName(filmName);
		filmDto.setActorName(actorName);
		filmDto.setFilmExt(filmExt);
		filmDto.setFilmSize(filmSize);
		filmDto.setFilmDuration(filmDuration);
		filmDto.setMarkInfo(markInfo);
		filmDto.setReleaseTime(releaseTime);
		filmDto.setTorrentTerm(torrentTerm);
		filmDto.setSource(THZHD_URI_PREFIX + url);
		filmDto.setTorrents(aids);
		filmDto.setImages(imgs);
		filmService.saveFilm(filmDto);

	}
}
