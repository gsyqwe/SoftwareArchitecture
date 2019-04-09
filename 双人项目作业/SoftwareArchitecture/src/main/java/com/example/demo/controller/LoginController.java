package com.example.demo.controller;

import com.example.demo.domains.PostGraduate;
import com.example.demo.domains.Student;
import com.example.demo.domains.Teacher;
import com.example.demo.domains.User;
import com.example.demo.service.BookService;
import com.example.demo.service.UserService;
import com.example.demo.serviceImpl.BookServiceImpl;
import com.example.demo.serviceImpl.UserServiceImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/LoginController")
public class LoginController {

    private BookService bookService = new BookServiceImpl();

    private UserService userService = new UserServiceImpl();

    /**
     *@Author : gsy
     *@Desciption : 根据用户名和密码登录
     * @param userid
     * @param passwd
     *@return : 身份 / 密码错误
     */
    @GetMapping("/login/{userid}/{passwd}")
    public String login(@PathVariable("userid")String userid,@PathVariable("passwd")String passwd){
        //调用userService方法
        return userService.login(userid,passwd);
    }

    /**
     *@Author : gsy
     *@Desciption : 注册
     * @param username
     * @param userid
     * @param passwd
     * @param identity
     * @param briefcase
     * @param school
     */
    @GetMapping("/register/{username}/{userid}/{passwd}/{identity}/{briefcase}/{school}")
    public void register(@PathVariable("username")String username, @PathVariable("userid")String userid,
                         @PathVariable("passwd")String passwd, @PathVariable("identity")String identity,
                         @PathVariable("briefcase")String briefcase, @PathVariable("school")String school){
        //调用userService方法
        User user = new Student();
        if(identity.equals("学生"))
            user = new Student();
        else if(identity.equals("教师"))
            user = new Teacher();
        else if(identity.equals("研究生"))
            user = new PostGraduate();
        user.setName(username);
        user.setUserid(userid);
        user.setSchool(school);
        user.setDepartment(briefcase);
        user.setPassword(passwd);
        userService.insertUser(user);
    }

    /**
     *@Author : gsy
     *@Desciption : 检查用户名是否被注册
     * @param userid
     */
    @GetMapping("/check/{userid}")
    public boolean check(@PathVariable("userid")String userid){
        return userService.isRegister(userid);
    }

}
