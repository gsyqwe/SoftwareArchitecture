package a.CityHelp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
@ComponentScan("lyb.yummy.controller")
@ComponentScan("lyb.yummy.BL")
@SpringBootApplication
public class YummyApplication {



	public static void main(String[] args) {
		SpringApplication.run(YummyApplication.class, args);
	}

}

