package a.CityHelp.entity;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.List;


@Entity(name = "users")
public class User {

    @Id
    private String userID;
    private String password;
    private int isActive = 0;

    //

    private String name;
    private String sex;
    private double Money;


    private String headIcon = "https://i.loli.net/2019/02/08/5c5c868588b69.png";


    @ElementCollection
    private List<String> receivePathIDs;
    private String defaultPathID;


    private int VIP_Level = 0;//vip等级，数字越高越尊贵，0为非vip
    private double sumBuyMoney = 0;

    private boolean isDelete = false;


    public User() {

    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

    public double getSumBuyMoney() {
        return sumBuyMoney;
    }

    public void setSumBuyMoney(double sumBuyMoney) {
        this.sumBuyMoney = sumBuyMoney;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public int getIsActive() {
        return isActive;
    }

    public void setIsActive(int isActive) {
        this.isActive = isActive;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public double getMoney() {
        return Money;
    }

    public void setMoney(double money) {
        this.Money = money;
    }

    public String getHeadIcon() {
        return headIcon;
    }

    public void setHeadIcon(String headIcon) {
        this.headIcon = headIcon;
    }

    public List<String> getReceivePathIDs() {
        return receivePathIDs;
    }

    public void setReceivePathIDs(List<String> receivePathIDs) {
        this.receivePathIDs = receivePathIDs;
    }

    public String getDefaultPathID() {
        return defaultPathID;
    }

    public void setDefaultPathID(String defaultPathID) {
        this.defaultPathID = defaultPathID;
    }

    public int getVIP_Level() {
        return VIP_Level;
    }

    public void setVIP_Level(int VIP_Level) {
        this.VIP_Level = VIP_Level;
    }
}
