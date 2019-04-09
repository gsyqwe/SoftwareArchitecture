package com.example.demo.controller;

import com.example.demo.domains.*;
import com.example.demo.service.BookService;
import com.example.demo.service.DocConvertService;
import com.example.demo.service.UserService;
import com.example.demo.serviceImpl.BookServiceImpl;
import com.example.demo.serviceImpl.DocConverter;
import com.example.demo.serviceImpl.Epubconverter;
import com.example.demo.serviceImpl.UserServiceImpl;
import org.json.JSONArray;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("UserController")
public class UserController {

    private BookService bookService = new BookServiceImpl();

    private UserService userService = new UserServiceImpl();

    /**
     *@Author : gsy
     *@Desciption : 得到个人信息
     *@return : 个人信息
     */
    @GetMapping("/getpersonal/{userid}")
    public String getpersonal(@PathVariable("userid")String userid){
        User user=userService.getUserByUserID(userid);
        return user.getName()+";"+user.getIdentity()+ ";"+userid +";"+
                user.getSchool() +";"+user.getDepartment();
    }

    /**
     *@Author : gsy
     *@Desciption : 根据userid保存编辑自己的个人信息
     *@param userid
     *@param username
     *@param briefcase
     *@param school
     */
    @GetMapping("/editpersonal/{userid}/{username}/{briefcase}/{school}")
    public void editpersonal(@PathVariable("userid")String userid,@PathVariable("username")String username,
                             @PathVariable("briefcase")String briefcase,@PathVariable("school")String school){
        String info="";
        User user = userService.getUserByUserID(userid);
        user.setSchool(school);
        user.setName(username);
        user.setDepartment(briefcase);
        info=user.getIdentity()+user.getName()+"编号为"+user.getUserid()+"在"+new Date().getTime()+"修改了信息";
        userService.updateUser(user);
        userService.notifyAdmin(info);
    }

    /**
     *@Author : gsy
     *@Desciption : 根据identity得到自己可以借的书籍
     *@param identity
     *@return : 个人可以借的书籍的JSONArray
     */
    @GetMapping("/availablebook/{identity}")
    public String availablebook(@PathVariable("identity") String identity){
        return new JSONArray(bookService.getAllBook(identity)).toString();
    }

    /**
     *@Author : gsy
     *@Desciption : 借书
     *@param userid
     *@param identity
     *@param bookid
     *@param bookname
     *@param category
     */
    @GetMapping("/borrowbook/{userid}/{identity}/{bookid}/{bookname}/{category}")
    public void borrowbook(@PathVariable("userid")String userid,@PathVariable("identity") String identity,
                           @PathVariable("bookid")String bookid, @PathVariable("bookname")String bookname,
                           @PathVariable("category")String category){
        Book book = new Book();
        book.setName(bookname);
        book.setCategory(category);
        int id= Integer.parseInt(bookid);
        book.setId(id);
        User user = new Student();
        if(identity.equals("学生"))
            user = new Student();
        else if(identity.equals("老师"))
            user = new Teacher();
        else if(identity.equals("研究生"))
            user = new PostGraduate();
        user.setUserid(userid);
    }

    /**
     *@Author : gsy
     *@Desciption : 阅读word
     *@param bookcontent
     *@return : 访问路径
     */
    @GetMapping("/readword/{bookcontent}")
    public String readword(@PathVariable("bookcontent")String bookcontent){
        List<Book> books=bookService.getAllBook();
        for (int i =0 ;i<books.size();i++){
            if (books.get(i).getId()== Integer.parseInt(bookcontent)){
                DocConverter docConverter=new DocConverter(books.get(i).getContent());
                docConverter.conver();
                String result=docConverter.getpdf();
                result="http://localhost:9090/"+result;
                return result;
            }
        }
        return "";
    }

    /**
     *@Author : gsy
     *@Desciption : 阅读Epub
     *@param bookcontent
     *@return : 访问内容
     */
    @GetMapping("/readepub/{bookcontent}")
    public String readepub(@PathVariable("bookcontent")String bookcontent){
        List<Book> books=bookService.getAllBook();
        for (int i =0 ;i<books.size();i++){
            if (books.get(i).getId()== Integer.parseInt(bookcontent)){
                Epubconverter epubconverter=new Epubconverter();
                return epubconverter.conver(books.get(i).getContent());
            }
        }
        return "";
    }

    /**
     *@Author : gsy
     *@Desciption : 阅读pdf
     *@param bookcontent
     *@return : 访问路径
     */
    @GetMapping("/readpdf/{bookcontent}")
    public String readpdf(@PathVariable("bookcontent")String bookcontent){
        List<Book> books=bookService.getAllBook();
        for (int i =0 ;i<books.size();i++){
            if (books.get(i).getId()== Integer.parseInt(bookcontent)){
                String result=books.get(i).getContent();
                result=result.substring(result.lastIndexOf("\\"),result.length());
                result=result.substring(1,result.length());
                result="http://localhost:9090/"+result;
                return result;
            }
        }
        return "";
    }
}
