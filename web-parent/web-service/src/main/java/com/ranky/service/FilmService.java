package com.ranky.service;

import java.util.List;

import com.ranky.bean.FilmDto;
import com.ranky.bean.ImageDto;

public interface FilmService {
	FilmDto getFilm(Integer id);

	int saveFilm(FilmDto filmDto);

	int updateFilm(FilmDto filmDto);

	int deleteFilm(Integer id);

	FilmDto getAllFilm(FilmDto filmDto);

	FilmDto getFilmByCondition(String value);

	List<ImageDto> getImagesByTid(String tid);

}
