package a.CityHelp.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.InetAddress;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class CH {


    private static boolean isDebug = false;
    private static final double EARTH_RADIUS = 6378137;//赤道半径

    private static double rad(double d) {
        return d * Math.PI / 180.0;
    }

    private static ObjectMapper mapper = new ObjectMapper();

    public static Map jsonToMap(String json) {
        ObjectMapper mapper = new ObjectMapper();
        Map readValue = null;
        try {
            readValue = mapper.readValue(json, Map.class);
        } catch (IOException e) {
            return new HashMap();
        }
        return readValue;

    }

    public static String generateJson(Object obj) {
        String rjson = "";
        try {

            rjson = mapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return rjson;
    }

    public static double GetDistance(double x1, double y1, double x2, double y2) {
        double lon1 = x1;
        double lat1 = y1;
        double lon2 = x2;
        double lat2 = y2;


        double radLat1 = rad(lat1);
        double radLat2 = rad(lat2);
        double a = radLat1 - radLat2;
        double b = rad(lon1) - rad(lon2);
        double s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * EARTH_RADIUS;
        return s;//单位米
    }

    public static boolean isAdminLogin(HttpServletRequest request) {

        if (isDebug) {
            return true;
        }

        if (request.getSession().getAttribute("adminid") == null) {
            return false;
        }


        return true;

    }

    public static boolean isRestaurantLogin(HttpServletRequest request) {
        if (isDebug) {
            return true;
        }


        if (request.getSession().getAttribute("restaurantid") == null) {
            return false;
        }

        return true;

    }

    public static boolean isUserLogin(HttpServletRequest request) {
        if (isDebug) {
            return true;
        }


        if (request.getSession().getAttribute("userid") == null) {
            return false;
        }

        return true;

    }

    /**
     * @Description: 获取客户端IP地址
     */
    public static String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
            if (ip.equals("127.0.0.1")) {
                //根据网卡取本机配置的IP
                InetAddress inet = null;
                try {
                    inet = InetAddress.getLocalHost();
                } catch (Exception e) {
                }
                ip = inet.getHostAddress();
            }
        }

        if (ip != null && ip.length() > 15) {
            if (ip.indexOf(",") > 0) {
                ip = ip.substring(0, ip.indexOf(","));
            }
        }
        return ip;
    }

    public static String formatDate(Date date) {
        String strDateFormat = "yyyy-MM-dd HH:mm:ss";
        SimpleDateFormat sdf = new SimpleDateFormat(strDateFormat);
        return sdf.format(date);
    }

    public static String randomHexString(int len) {
        try {
            StringBuffer result = new StringBuffer();
            for (int i = 0; i < len; i++) {
                result.append(Integer.toHexString(new Random().nextInt(16)));
            }
            return result.toString().toUpperCase();

        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();

        }
        return null;

    }

}
