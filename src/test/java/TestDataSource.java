import com.jcc.entity.Reader;

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

        ReaderService readerService =(ReaderService)ac.getBean("readerServiceImpl");
        Reader reader;
        Map<String,Object> qmap=new HashMap<String, Object>();
        qmap.put("rid","1000");
        qmap.put("rpwd","1000");
        reader=readerService.selectReader(qmap);
        System.out.println(reader.getRname());

        BookService bookService =(BookService)ac.getBean("bookServiceImpl");
        Book book =new Book();
        book.setTag("历史");
        List<Book> books=bookService.selectBooks(book);
        for(Book bok:books){
            System.out.println(bok.getBname());
        }
        /*Map<String,Object> qmap1=new HashMap<String, Object>();
        qmap.put("rid","1000");
        List<Book> books=bookService.selectBookFrom_reader_book_record(qmap1);
        for(Book book:books){
            System.out.println(book.getBname());
        }*/




    }




}
