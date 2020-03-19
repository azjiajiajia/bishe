
import com.jcc.entity.Reader;
import com.jcc.entity.Book;
import com.jcc.service.BookService;
import com.jcc.service.ReaderService;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
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

        ReaderService readerService =(ReaderService)ac.getBean("readerServiceImpl");
        Reader reader;
        Map<String,Object> qmap=new HashMap<String, Object>();
        qmap.put("rid","1000");
        qmap.put("rpwd","1000");
        reader=readerService.selectReader(qmap);
        System.out.println(reader.getRname());

        Book book=new Book();
        book.setTag("历史");
        BookService bookService=(BookService)ac.getBean("bookServiceImpl");
        List<Book> books=bookService.selectBooks(book);
        for (Book bk:books){
            System.out.println(bk.getBname());
        }
    }



}
