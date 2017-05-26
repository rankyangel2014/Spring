package com.ranky.protal.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ranky.bean.FilmDto;
import com.ranky.service.FilmService;

/**
 * 用户请求处理器 Created by admin on 16/8/6.
 */
@Controller
public class FilmController {
	private static Logger logger = LogManager.getLogger(FilmController.class);

	@Autowired
	private FilmService filmService;

	@ResponseBody
	@RequestMapping(value = "/searchFilm/{username}", method = RequestMethod.GET)
	public FilmDto searchFilm(@PathVariable("username") String username) {
		return filmService.getFilmByCondition(username);
	}

	@ResponseBody
	@RequestMapping(value = "/getFilm/{id}", method = RequestMethod.GET)
	public FilmDto getFilm(@PathVariable("id") Integer id) {
		return filmService.getFilm(id);
	}


	@ResponseBody
	@RequestMapping(value = "/getAllFilm", method = RequestMethod.GET)
	public FilmDto getAllFilm(FilmDto filmDto) {
		return filmService.getAllFilm(null);
	}

	@ResponseBody
	@RequestMapping(value = "/updateFilm", method = RequestMethod.GET)
	public String updateFilm(FilmDto filmDto) {
		return "success【" + filmService.updateFilm(filmDto) + "】";
	}

	@ResponseBody
	@RequestMapping(value = "/deleteFilm/{id}", method = RequestMethod.GET)
	public String deleteFilm(@PathVariable("id") Integer id) {
		return "success【" + filmService.deleteFilm(id) + "】";
	}

}