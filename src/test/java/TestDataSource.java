import com.jcc.entity.Book;
import com.jcc.entity.Reader;
import com.jcc.service.BookService;
import com.jcc.service.ReaderService;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TestDataSource {
    @SuppressWarnings("resource")
    @Test
    public void testDataSources() throws SQLException {
        ApplicationContext ac = null;
        ac = new ClassPathXmlApplicationContext("classpath:/spring/applicationContext.xml");
        BookService bookService =(BookService)ac.getBean("bookServiceImpl");
        Map<String,Object> qmap=new HashMap<String, Object>();
        qmap.put("rid","1000");
        List<Book> books=bookService.selectBookFrom_reader_book_record(qmap);
        for(Book book:books){
            System.out.println(book.getBname());
        }

    }
}
