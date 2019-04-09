package a.CityHelp.controller.IPdector;

import com.sun.deploy.util.BlackList;
import sun.net.util.IPAddressUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

public class URLInterceptor  implements HandlerInterceptor{

    @Autowired
    BlackListDao blackListDao;

    private Map<String, Integer> redisTemplate = new HashMap<String, Integer>();
    private static final Logger logger = LoggerFactory.getLogger(URLInterceptor.class);

    //在请求处理之前进行调用（Controller方法调用之前）
    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        return true;
    }

    //请求处理之后进行调用，但是在视图被渲染之前（Controller方法调用之后）
    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
        String ip = IPAddressUtil.getClientIpAddress(httpServletRequest);
        List<BlackList> blackLists = blackListDao.findByIp(ip);
        if (blackLists == null || blackLists.size() == 0){
            urlHandle(httpServletRequest, 5000, 10);
        } else {
            //强制控制跳转
            modelAndView.setViewName("/errorpage/error.html");
        }
    }

    //在整个请求结束之后被调用
    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }

    public void urlHandle(HttpServletRequest request, long limitTime,int limitCount) throws RequestLimitException {
        /**
         * 省略业务逻辑部分，参考"准备"步骤
         */
        if (count > limitCount){ //符合锁定条件
            Calendar calendar = Calendar.getInstance();
            Date iptime=calendar.getTime();
            BlackList blackList = new BlackList(ip, iptime);
            blackListDao.addBlackList(blackList);
            throw new RequestLimitException();
        }
    }
}