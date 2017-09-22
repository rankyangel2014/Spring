package com.ranky.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.miemiedev.mybatis.paginator.domain.Order;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;
import com.google.common.collect.Lists;
import com.ranky.bean.FilmDto;
import com.ranky.bean.ImageDto;
import com.ranky.bean.TorrentDto;
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

	@Transactional
	@Override
	public int saveFilm(FilmDto filmDto) {
		List<TorrentDto> torrents = filmDto.getTorrents();
		List<ImageDto> imgs = filmDto.getImages();
		filmDto.setFilmCover(imgs.get(0).getImageUrl());
		filmDto.setFilmTorrent(torrents.get(0).getTorrentUrl());
		imageDao.batchSaveImage(imgs);
		torrentDao.batchSaveTorrent(torrents);
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
		String sort = filmDto.getSort();
		Integer page = filmDto.getPage();
		Integer limit = filmDto.getLimit();
		List<Order> orders = Lists.newArrayList(Order.formString(sort));
		PageBounds pageBounds = new PageBounds(page, limit, orders);
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

	@Override
	public List<ImageDto> getImagesByTid(String tid) {
		return imageDao.findImagesByTid(tid);
	}

}
