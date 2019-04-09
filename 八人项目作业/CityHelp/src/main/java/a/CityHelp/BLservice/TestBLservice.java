package a.CityHelp.BLservice;

import a.CityHelp.entity.User;

import java.util.List;

public interface TestBLservice {

    public String sayHello();
    public User canLogin(String uname, String password);
    public User   registerNewUser(String uemail,String password,String name) throws SameUserException;
    public User getUserByID(String id);
    public boolean activeUser(String id);
    public List generateReceivePath(String userid);
    public boolean addPath(String userid, ReceivePath path);
    public void deletePath(String userid,String PathID);
    public void setDefaultPath(String userid,String PathID);
    public void editUserElementInfo(String uid,String uname,String sex, String password);
}
