package comp5619.backend;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.*;


//By using mockMVC you DO NOT need to start the backend server !! Just run the test case is fine.
//Tests using mockMVS, code will be called in exactly the same way as if it were processing a real HTTP request but without the cost of starting the server.
@SpringBootTest
@AutoConfigureMockMvc
class BackendApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    public static String asJsonString(final Object obj) {
        try {
            final ObjectMapper mapper = new ObjectMapper();
            final String jsonContent = mapper.writeValueAsString(obj);
            return jsonContent;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //sampleTest and sampleTest2 is only samples to demo the use of the mockMvc, remove after finish the final implementation

    @Test
    public void sampleTestGetMethod() throws Exception {

        this.mockMvc.perform(get("/users/profile/1"))
                .andExpect(status().isOk())
//                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.role", is("business")));
    }


    @Test
    public void sampleTestPostMethod() throws Exception {

        Map<String,String> data = new HashMap<>();
        data.put("email","oliverCustomer@fake.com");
        data.put("password","123456789");

        this.mockMvc.perform(post("/users/checkSignIn")
                .content(asJsonString(data))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Sign In Success")));

    }

}
