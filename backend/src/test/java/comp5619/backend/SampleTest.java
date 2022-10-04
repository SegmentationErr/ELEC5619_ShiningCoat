package comp5619.backend;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.*;

//This class is only for the demo of the basic tests for GET and POST actions for backend
public class SampleTest{

    @Test
    public void sampleTestGetMethod(MockMvc mockMvc) throws Exception {

        mockMvc.perform(get("/users/profile/1"))
                .andExpect(status().isOk())
//                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.role", is("business")));
    }

    @Test
    public void sampleTestPostMethod(MockMvc mockMvc) throws Exception {

        Map<String,String> data = new HashMap<>();
        data.put("email","oliverCustomer@fake.com");
        data.put("password","123456789");

        mockMvc.perform(post("/users/checkSignIn")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Sign In Success")));

    }
}
