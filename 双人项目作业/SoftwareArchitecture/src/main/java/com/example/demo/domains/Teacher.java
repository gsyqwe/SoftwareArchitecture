package com.example.demo.domains;


import com.example.demo.daoImpl.RecordDaoImpl;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table( name = "users")
@DiscriminatorValue("teacher")
public class Teacher extends User {

    @Id
    private String userid;

    private String name;

    private String password;

    private String school;

    private String department;

    private final String identity = "老师";

    @Override
    public String getSchool() {
        return school;
    }

    @Override
    public void setSchool(String school) {
        this.school = school;
    }

    @Override
    public String getDepartment() {
        return department;
    }

    @Override
    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public String getIdentity() {
        return identity;
    }

    @Override
    public String borrow(Book book) {
        int already = new RecordDaoImpl().getBookNumAlreadyBorrowed(userid);
        if(already>=DefaultConstant.TEACHER_MAX_NUM){
            return "最多借阅15本,不能再借阅";
        }
        if(!DefaultConstant.TEACHER_category.contains(book.getCategory())){
            return "此类别不能借阅";
        }
        else{
            Record record = new Record();
            record.setBookID(book.getId());
            record.setCategory(book.getCategory());
            record.setBookname(book.getName());
            record.setFlag(1);
            record.setTime(new Date());
            record.setUserID(userid);
            new RecordDaoImpl().insertRecord(record);
            return "辅导书籍借阅成功";
        }
    }

    @Override
    public String getUserid() {
        return userid;
    }

    @Override
    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
