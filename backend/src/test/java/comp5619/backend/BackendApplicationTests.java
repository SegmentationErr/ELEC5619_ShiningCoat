package comp5619.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;


//By using mockMVC you DO NOT need to start the backend server !! Just run the test case is fine.
//Tests using mockMVS, code will be called in exactly the same way as if it were processing a real HTTP request but without the cost of starting the server.
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
//@TestPropertySource(locations = "classpath:application-${spring.profiles.active:local}.properties")
//@FixMethodOrder(MethodSorters.NAME_ASCENDING) //  org.junit.FixMethodOrder;
class BackendApplicationTests {

    @Autowired
    public MockMvc mockMvc;

    //Remove the SampleTests related codes when finish the final implementation
    private final UserTests userTests = new UserTests();

    private final ShopTests shopTests = new ShopTests();

    private final ServiceTests serviceTests = new ServiceTests();

    private final CommentTests commentTests = new CommentTests();

    @Test
    public void runAllUserTests() throws Exception{
        userTests.runAll(mockMvc);
    }

    @Test
    public void runAllShopTests() throws Exception{
        shopTests.runAll(mockMvc);
    }

    @Test
    public void runAllServiceTests() throws Exception{
        serviceTests.runAll(mockMvc);
    }

    @Test
    public void runAllCommentTests() throws Exception{
        commentTests.runAll(mockMvc);
    }

}
