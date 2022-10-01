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

    private final SampleTest sampleTest = new SampleTest();

    @Test
    public void runAllSampleTestCases() throws Exception{
        sampleTest.sampleTestGetMethod(mockMvc);
        sampleTest.sampleTestPostMethod(mockMvc);
    }

}
