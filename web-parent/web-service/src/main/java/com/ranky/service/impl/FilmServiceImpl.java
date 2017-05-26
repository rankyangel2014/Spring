package com.ranky.service.impl;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.miemiedev.mybatis.paginator.domain.Order;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;
import com.google.common.collect.Lists;
import com.ranky.bean.FilmDto;
import com.ranky.bean.ImageDto;
import com.ranky.bean.TorrentDto;
import com.ranky.bean.UserDto;
import com.ranky.dao.FilmDao;
import com.ranky.dao.ImageDao;
import com.ranky.dao.TorrentDao;
import com.ranky.service.FilmService;

/**
 * Hello world!
 *
 */
@Service
public class FilmServiceImpl implements FilmService {

	@Autowired
	private TorrentDao torrentDao;
	@Autowired
	private ImageDao imageDao;
	@Autowired
	private FilmDao filmDao;

	@Override
	public FilmDto getFilm(Integer id) {
		return filmDao.findFilmById(id);
	}

	@Override
	public int saveFilm(FilmDto filmDto) {
		// FilmDto film = filmDao.findFilmById(id);
		// String tid = film.getTid();
		// ImageDto imageDto = imageDao.findCoverImageByTid(tid);
		// TorrentDto torrentDto = torrentDao.findHdTorrentByTid(tid);
		// film.setFilmCover(imageDto.getImageUrl());
		// film.setFilmTorrent(torrentDto.getTorrentUrl());
		return filmDao.saveFilm(filmDto);
	}

	@Override
	public int updateFilm(FilmDto filmDto) {
		return filmDao.updateFilm(filmDto);
	}

	@Override
	public int deleteFilm(Integer id) {
		return filmDao.removeFilm(id);
	}

	@Override
	public FilmDto getAllFilm(FilmDto filmDto) {
		// System.out.println("getAllUser load from database !");
		PageBounds pageBounds = new PageBounds();
		if (Objects.isNull(filmDto)) {
			pageBounds.setContainsTotalCount(true);
			pageBounds.setPage(-1);
			pageBounds.setLimit(-1);
			filmDto = new FilmDto();
		} else {

			String sort = filmDto.getSort();
			Integer page = filmDto.getPage();
			Integer limit = filmDto.getLimit();
			List<Order> orders = Lists.newArrayList(Order.formString(sort));
			pageBounds.setOrders(orders);
			pageBounds.setPage(page);
			pageBounds.setLimit(limit);
			pageBounds.setContainsTotalCount(true);
		}
		// PageBounds pageBounds = new PageBounds(filmDto.getPage(),
		// filmDto.getLimit(), orders, true);
		PageList<FilmDto> list = filmDao.findAllFilms(pageBounds);
		// 获得结果集条总数
		filmDto.setTotalCount(list.getPaginator().getTotalCount());
		filmDto.setRoot(list);
		return filmDto;
	}

	@Override
	public FilmDto getFilmByCondition(String value) {
		return null;
	}

}
