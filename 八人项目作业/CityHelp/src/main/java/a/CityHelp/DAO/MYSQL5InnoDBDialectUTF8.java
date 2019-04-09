package a.CityHelp.DAO;

import org.hibernate.dialect.MySQL5InnoDBDialect;

public class MYSQL5InnoDBDialectUTF8 extends MySQL5InnoDBDialect {
    @Override
    public String getTableTypeString() {
//        return super.getTableTypeString();
        return " ENGINE=InnoDB DEFAULT CHARSET=utf8";
    }
}
