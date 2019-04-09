package a.CityHelp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Created by pangkunkun on 2017/9/3.
 */
@Component
public class MyCommandLineRunner implements CommandLineRunner {

    @Override
    public void run(String... var1) throws Exception {
        System.out.println("This will be execute when the project was started!");


    }
}