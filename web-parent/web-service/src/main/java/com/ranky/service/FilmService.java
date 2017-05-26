package com.ranky.service;

import com.ranky.bean.FilmDto;

public interface FilmService {
	FilmDto getFilm(Integer id);

	int saveFilm(FilmDto userDto);

	int updateFilm(FilmDto userDto);

	int deleteFilm(Integer id);

	FilmDto getAllFilm(FilmDto user);

	FilmDto getFilmByCondition(String value);

}
