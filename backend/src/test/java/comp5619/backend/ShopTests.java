package comp5619.backend;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.AfterAll;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import org.junit.Assert.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import static org.hamcrest.Matchers.*;


//This class is only for the demo of the basic tests for GET and POST actions for backend
@RunWith(SpringRunner.class)
@SpringBootTest
public class ShopTests {

    private String userNameNewUser = "Business Users Used For Test";
    private String emailNewUser = "testBusinessUserEmail@test.com";
    private final String roleNewUser = "business";
    private final String passwordNewUser = "123456789";
    private String idNewUser = "";

    private String idNewShop = "";

    public void createTestBusinessUser(MockMvc mockMvc) throws Exception{
        Map<String,String> data = new HashMap<>();
        data.put("username",userNameNewUser);
        data.put("email",emailNewUser);
        data.put("role",roleNewUser);
        data.put("password",passwordNewUser);

        this.idNewUser = TestHelper.createTestUser(mockMvc,data);
    }

    @Test
    public void testAddNewShop(MockMvc mockMvc) throws Exception{

        System.out.println("Run Test Add New Shop");

        Map<String,String> data = new HashMap<>();
        data.put("shopName", "test new shop name 1");
        data.put("contactNumber","123456789");
        data.put("startTime","09:00");
        data.put("endTime","21:00");
        data.put("shopAddress","330 church street, parramatta, sydney, NSW");
        data.put("shopDescription","this is test shop 1");
        data.put("userId",this.idNewUser);
        data.put("lat","-50.0");
        data.put("lng","50.0");

        mockMvc.perform(post("/shops/addShop")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        MvcResult resultActions = mockMvc.perform(get("/shops/getAllShopsById/"+this.idNewUser))
                .andExpect(status().isOk())
                .andReturn();

        String contentAsString = resultActions.getResponse().getContentAsString();

        final ObjectMapper mapper = new ObjectMapper();

        List<Map<String,Object>> map = mapper.readValue(contentAsString, ArrayList.class);

        this.idNewShop = String.valueOf(map.get(0).get("id"));

        System.out.println("Done Test Add New Shop");
    }

    @Test
    public void testGetShopDetail(MockMvc mockMvc) throws Exception{
        System.out.println("Run Test Get Shop Profile");

        mockMvc.perform(get("/shops/getShopDetail/"+this.idNewShop))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.shop_name", is("test new shop name 1")))
                .andExpect(jsonPath("$.user_id", is(Integer.parseInt(this.idNewUser))));

        System.out.println("Done Test Get Shop Profile");
    }
    @Test
    public void testSearchShop(MockMvc mockMvc) throws Exception{
        System.out.println("Run Test Search Shop");

        String searchName = "BUSINESS USER USED FOR TEST";

        MvcResult resultActions = mockMvc.perform(get("/shops/search/"+searchName))
                .andExpect(status().isOk())
                .andReturn();

        String contentAsString = resultActions.getResponse().getContentAsString();

        final ObjectMapper mapper = new ObjectMapper();

        List<Map<String,Object>> results = mapper.readValue(contentAsString, ArrayList.class);

        Assert.assertEquals(results.size(),1);

        Assert.assertEquals(results.get(0).get("id"),this.idNewShop);

        System.out.println("Done Test Search Shop");
    }

    @Test
    public void testUpdateShop(MockMvc mockMvc) throws Exception{
        System.out.println("Run Test Update Shop");

        Map<String,String> data = new HashMap<>();
        data.put("shopName", "test new shop name 1 new name");
        data.put("contactNumber","123456789");
        data.put("startTime","09:00");
        data.put("endTime","21:00");
        data.put("shopAddress","330 church street, parramatta, sydney, NSW");
        data.put("shopDescription","this is test shop 1 new description");
        data.put("userId",this.idNewShop);
        data.put("lat","-50.0");
        data.put("lng","50.0");

        mockMvc.perform(post("/shops/updateShop")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mockMvc.perform(get("/shops/getShopDetail/"+this.idNewShop))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(Integer.parseInt(this.idNewShop))))
                .andExpect(jsonPath("$.shop_name", is("test new shop name 1 new name")))
                .andExpect(jsonPath("$.description", is("this is test shop 1 new description")));

        System.out.println("Done Test Update Shop");
    }

    @AfterAll
    public void clearTestUserFromDb(MockMvc mockMvc) throws Exception{
        TestHelper.clearTestUserFromDb(mockMvc,this.idNewUser);
        TestHelper.clearTestShopsFromDb(mockMvc,this.idNewUser);
    }

    @Test
    public void runAll(MockMvc mockMvc) throws Exception{
        createTestBusinessUser(mockMvc);

        testAddNewShop(mockMvc);

        testGetShopDetail(mockMvc);

        testUpdateShop(mockMvc);

        clearTestUserFromDb(mockMvc);
    }
}
