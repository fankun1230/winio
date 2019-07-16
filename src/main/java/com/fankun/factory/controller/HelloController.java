package com.fankun.factory.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HelloController {
	@RequestMapping("/index")
	public String index(ModelMap map) {
		// 加入一个属性，用来在模板中读取
		return "index";
	}
}
