package a.CityHelp.controller;


import a.CityHelp.BLservice.TestBLservice;
import a.CityHelp.DAO.UserDao;
import a.CityHelp.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;


@Controller
@EnableAutoConfiguration
public class TestController {

    @Autowired
    private TestBLservice userBL;


    private String city = "南京";
    private double x = 118.7697853;
    private double y = 32.045413;

    @RequestMapping("/")
    public String index() {
        System.out.print(userBL.sayHello());
        return "index.html";
    }


}
