import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jcc.entity.Book;
import com.jcc.service.BookService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import java.util.List;

/**
 * 使用Junit单元测试：测试我们的配置
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring/applicationContext.xml")
public class WBJTest {

    @Autowired
    private BookService bookService;

    @Test
    public  void testTransfer(){

        Book book = new Book();
        book.setBname("%1%");
        //开启分页查询
        PageHelper.startPage(1, 5);
//                List<Book> books = bookService.selectAll();
        List<Book> books = bookService.selectBooks(book);
        // 将分页信息放入PageInfo对象里
        PageInfo<Book> page = new PageInfo<Book>(books, 5);

        for (Book book1 : books) {
            System.out.println(book1);
        }
        System.out.println("==================page===================");
        System.out.println(page);
        System.out.println("==================pageList===================");
        for (Book book1 : page.getList()) {
            System.out.println(book1);
        }

//        Book book1 = bookService.selectOne("哈哈");
//        System.out.println(book1);



    }

}
