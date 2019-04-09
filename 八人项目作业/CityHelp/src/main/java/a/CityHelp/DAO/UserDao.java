package a.CityHelp.DAO;

import a.CityHelp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;

@Repository
@Table(name = "users")//这里表名要统一
public interface UserDao extends JpaRepository<User, String> {


}
