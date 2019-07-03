package com.fankun.factory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;


@SpringBootApplication
public class AppStart extends SpringBootServletInitializer {
	//

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(AppStart.class);
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(AppStart.class, args);
    }
    
}

