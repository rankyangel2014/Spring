package com.ranky.task;

import java.util.concurrent.Callable;

import org.apache.commons.lang3.StringUtils;

import com.ranky.bean.FilmDto;
import com.ranky.common.Cryptos;

public class ScheduledTask implements Callable<FilmDto> {

	private String url;

	private static final String URI_PREFIX = Cryptos
			.aesDecrypt("2020240521b7b47e7e6aadf4cfa6e39b96b5225158f4dbc0fa30d14252f8ba4c");
	private static final String TORRENT_URI_PREFIX = Cryptos
			.aesDecrypt("c2c432af94d6818d1ecb55796787604654ef735568f854cf69450e67dc167b37");
	private static final String FILM_INFO_SPLIT = Cryptos.aesDecrypt("f043277cdeda2aff9667e26d20333248");

	public ScheduledTask(String url) {

		this.url = url;
	}

	@Override
	public FilmDto call() throws Exception {

		System.out.println(" url from task ");
		if (StringUtils.isBlank(url)) {
			throw new RuntimeException("url is null ");
		} else {
			return null;
		}

		//		Document doc = null;
		//		try {
		//			doc = Jsoup.connect(URI_PREFIX + url).timeout(5000).get();
		//		} catch (Exception e1) {
		//			System.err.println(url + e1.getMessage());
		//		}
		//		if (Objects.nonNull(doc)) {
		//			String uuid = UUID.randomUUID().toString();
		//			String tid = StringUtils.replaceChars(uuid, "-", "");
		//
		//			Elements aidEles = doc.select(".attnm a[href]");
		//			Elements imgEles = doc.select("img[file]");
		//			String[] arr = doc.select("td .t_f").get(0).text().split(FILM_INFO_SPLIT);
		//
		//			List<ImageDto> imgs = Lists.newArrayListWithCapacity(imgEles.size());
		//			imgEles.forEach(new Consumer<Element>() {
		//				@Override
		//				public void accept(Element t) {
		//					try {
		//						String imgUrl = t.attr("file");
		//						imgs.add(new ImageDto(tid, imgUrl, "N"));
		//					} catch (Exception e) {
		//						e.printStackTrace();
		//					}
		//
		//				}
		//
		//			});
		//
		//			List<TorrentDto> aids = Lists.newArrayListWithCapacity(aidEles.size());
		//			aidEles.forEach(new Consumer<Element>() {
		//				@Override
		//				public void accept(Element t) {
		//					try {
		//						URIBuilder uri = new URIBuilder(t.attr("href"));
		//						String said = uri.getQueryParams().get(0).getValue();
		//						String aid = String.format(URI_PREFIX + TORRENT_URI_PREFIX, said);
		//						aids.add(new TorrentDto(tid, "N", t.text(), aid));
		//					} catch (Exception e) {
		//						e.printStackTrace();
		//					}
		//
		//				}
		//
		//			});
		//
		//			String serialNo = arr[25].substring(2);
		//			String filmName = arr[3];
		//			String actorName = arr[6];
		//			String filmExt = arr[9];
		//			String filmSize = arr[12];
		//			String filmDuration = arr[14].substring(2);
		//			String markInfo = arr[17];
		//			String releaseTime = arr[20];
		//			String torrentTerm = arr[23];
		//
		//			FilmDto filmDto = new FilmDto();
		//			filmDto.setTid(tid);
		//			filmDto.setSerialNo(serialNo);
		//			filmDto.setFilmName(filmName);
		//			filmDto.setActorName(actorName);
		//			filmDto.setFilmExt(filmExt);
		//			filmDto.setFilmSize(filmSize);
		//			filmDto.setFilmDuration(filmDuration);
		//			filmDto.setMarkInfo(markInfo);
		//			filmDto.setReleaseTime(releaseTime);
		//			filmDto.setTorrentTerm(torrentTerm);
		//			filmDto.setSource(URI_PREFIX + url);
		//			filmDto.setTorrents(aids);
		//			filmDto.setImages(imgs);
		//			return filmDto;
		//		}
		//		return null;
	}
}
