// package com.ranky.task;
//
// import java.io.IOException;
// import java.util.List;
// import java.util.UUID;
// import java.util.function.Consumer;
//
// import org.apache.commons.lang3.StringUtils;
// import org.apache.http.client.utils.URIBuilder;
// import org.jsoup.Jsoup;
// import org.jsoup.nodes.Document;
// import org.jsoup.nodes.Element;
// import org.jsoup.select.Elements;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.scheduling.annotation.Scheduled;
//
// import com.google.common.collect.Lists;
// import com.ranky.bean.FilmDto;
// import com.ranky.bean.ImageDto;
// import com.ranky.bean.TorrentDto;
// import com.ranky.common.Cryptos;
// import com.ranky.service.FilmService;
//
//// @Component
// public class TimeTask {
//
// @Autowired
// private FilmService filmService;
//
// @Scheduled(cron = "0/5 * * * * ?")
// public void execute() {
// System.err.println("*******定时任务begin********");
// System.out.println(URI_PREFIX);
// System.out.println(PAGE_COUNT_URI);
// System.out.println(TORRENT_URI_PREFIX);
// System.out.println(FILM_INFO_SPLIT);
// // getFilmInfo("thread-1053416-1-1.html");
// System.err.println("*******定时任务end********");
// }
//
// private static final String URI_PREFIX = Cryptos
// .aesDecrypt("2020240521b7b47e7e6aadf4cfa6e39b96b5225158f4dbc0fa30d14252f8ba4c");
// private static final String PAGE_COUNT_URI = Cryptos
// .aesDecrypt("0b8d69777c70b9e13bbcba559e29d6f7666ba3a5cc3d657d71e2110866caf05b");
// private static final String TORRENT_URI_PREFIX = Cryptos
// .aesDecrypt("c2c432af94d6818d1ecb55796787604654ef735568f854cf69450e67dc167b37");
//
// private static final String FILM_INFO_SPLIT =
// Cryptos.aesDecrypt("f043277cdeda2aff9667e26d20333248");
//
// public Integer getPageCount() {
// Document doc = null;
// try {
// doc = Jsoup.connect(URI_PREFIX + PAGE_COUNT_URI).timeout(4000).get();
// } catch (IOException e) {
// System.out.println(e.getMessage());
// }
// if (doc != null) {
// Element pageCountElement = doc.getElementById("autopbn");
// String pageCountStr = pageCountElement.attr("totalpage");
// System.out.println(pageCountStr);
// return Integer.parseInt(pageCountStr);
//
// }
// return 0;
// }
//
// public FilmDto getFilmInfo(String url) {
// String uuid = UUID.randomUUID().toString();
// String tid = StringUtils.replaceChars(uuid, "-", "");
//
// if (StringUtils.isBlank(url)) {
// return null;
// }
//
// Document doc = null;
// try {
// doc = Jsoup.connect(URI_PREFIX + url).timeout(5000).get();
// } catch (Exception e1) {
// System.err.println(url + e1.getMessage());
// }
//
// Elements aidEles = doc.select(".attnm a[href]");
// Elements imgEles = doc.select("img[file]");
// String[] arr = doc.select("td .t_f").get(0).text().split(FILM_INFO_SPLIT);
//
// List<ImageDto> imgs = Lists.newArrayListWithCapacity(imgEles.size());
// imgEles.forEach(new Consumer<Element>() {
// @Override
// public void accept(Element t) {
// try {
// String imgUrl = t.attr("file");
// imgs.add(new ImageDto(tid, imgUrl, "N"));
// } catch (Exception e) {
// e.printStackTrace();
// }
//
// }
//
// });
//
// List<TorrentDto> aids = Lists.newArrayListWithCapacity(aidEles.size());
// aidEles.forEach(new Consumer<Element>() {
// @Override
// public void accept(Element t) {
// try {
// URIBuilder uri = new URIBuilder(t.attr("href"));
// String said = uri.getQueryParams().get(0).getValue();
// String aid = String.format(URI_PREFIX + TORRENT_URI_PREFIX, said);
// aids.add(new TorrentDto(tid, "N", t.text(), aid));
// } catch (Exception e) {
// e.printStackTrace();
// }
//
// }
//
// });
// String serialNo = arr[25].substring(2);
// String filmName = arr[3];
// String actorName = arr[6];
// String filmExt = arr[9];
// String filmSize = arr[12];
// String filmDuration = arr[14].substring(2);
// String markInfo = arr[17];
// String releaseTime = arr[20];
// String torrentTerm = arr[23];
//
// FilmDto filmDto = new FilmDto();
// filmDto.setTid(tid);
// filmDto.setSerialNo(serialNo);
// filmDto.setFilmName(filmName);
// filmDto.setActorName(actorName);
// filmDto.setFilmExt(filmExt);
// filmDto.setFilmSize(filmSize);
// filmDto.setFilmDuration(filmDuration);
// filmDto.setMarkInfo(markInfo);
// filmDto.setReleaseTime(releaseTime);
// filmDto.setTorrentTerm(torrentTerm);
// filmDto.setSource(URI_PREFIX + url);
// filmDto.setTorrents(aids);
// filmDto.setImages(imgs);
// return filmDto;
// // filmService.saveFilm(filmDto);
// }
// }
