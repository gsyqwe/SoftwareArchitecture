package a.CityHelp.BL;

import a.CityHelp.BLservice.TestBLservice;
import a.CityHelp.DAO.UserDao;
import a.CityHelp.controller.CH;
import a.CityHelp.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TestBLserviceImpl implements TestBLservice {
    @Autowired
    private UserDao userDao;
    @Autowired
    private ReceivePathDao receivePathDao;


    @Override
    public String sayHello() {
        return "helloo";
    }

    @Override
    public User canLogin(String uname, String password) {
        User user = new User();
        user.setUserID(uname);

        if (userDao.existsById(uname)) {
            User u = userDao.findById(uname).get();
            if (u.getPassword().equals(password)) {
                return u;
            }
        } else {
            return null;
        }


        return null;
    }

    @Override
    public User registerNewUser(String uemail, String password, String name) throws SameUserException {
        User user = new User();
        user.setName(name);
        user.setUserID(uemail);
        user.setPassword(password);
        user.setMoney(1000);
        if (userDao.existsById(uemail)) {
            throw new SameUserException("该邮箱已被注册！");
        } else {


        }

        User user2 = userDao.save(user);
        return user2;
    }

    @Override
    public User getUserByID(String id) {
        return userDao.findById(id).get();


    }

    @Override
    public boolean activeUser(String id) {
        return false;
    }

    @Override
    public List generateReceivePath(String userid) {
        User u = userDao.findById(userid).get();
        List<ReceivePath> result = new ArrayList<>();
        for (String s : u.getReceivePathIDs()) {
            ;
            result.add(receivePathDao.findById(s).get());
        }
        return result;
    }

    @Override
    public boolean addPath(String userid, ReceivePath path) {
        User u = userDao.findById(userid).get();
        path.setReceivepathID(CH.randomHexString(11));

        String pathID = receivePathDao.save(path).getReceivepathID();
        u.getReceivePathIDs().add(pathID);


        if (u.getReceivePathIDs().size() == 1) {
            u.setDefaultPathID(u.getReceivePathIDs().get(0));
        }
        userDao.save(u);
        return true;
    }

    @Override
    public void deletePath(String userid, String PathID) {
        User u = userDao.findById(userid).get();
        u.getReceivePathIDs().remove(PathID);

        if (u.getDefaultPathID() == PathID) {
            u.setDefaultPathID(null);
        }
        if (u.getReceivePathIDs().size() >= 1) {
            u.setDefaultPathID(u.getReceivePathIDs().get(0));
        }
        userDao.save(u);
    }

    @Override
    public void setDefaultPath(String userid, String PathID) {
        User u = userDao.findById(userid).get();
        u.setDefaultPathID(PathID);
        userDao.save(u);

    }

    @Override
    public void editUserElementInfo(String uid, String uname, String sex, String password) {
        User user = userDao.findById(uid).get();
        if (uname != null) {
            user.setName(uname);
        }
        if (sex != null) {
            user.setSex(sex);
        }
        if (password != null) {
            user.setPassword(password);
        }
        userDao.save(user);
    }
}
