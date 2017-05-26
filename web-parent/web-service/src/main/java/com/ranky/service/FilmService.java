package com.ranky.service;

import java.util.List;

import com.ranky.bean.FilmDto;
import com.ranky.bean.ImageDto;

public interface FilmService {
	FilmDto getFilm(Integer id);

	int saveFilm(FilmDto userDto);

	int updateFilm(FilmDto userDto);

	int deleteFilm(Integer id);

	FilmDto getAllFilm(FilmDto user);

	FilmDto getFilmByCondition(String value);

	List<ImageDto> getImagesByTid(String tid);

}
