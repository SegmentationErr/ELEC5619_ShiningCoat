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
import org.junit.jupiter.api.BeforeAll;
import org.junit.runner.RunWith;
import org.mockito.Mock;
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

@RunWith(SpringRunner.class)
@SpringBootTest
public class ServiceTests {

    private String userNameNewUser = "Business Users Used For Test";
    private String emailNewUser = "testBusinessUserEmail@test.com";
    private final String roleNewUser = "business";
    private final String passwordNewUser = "123456789";
    private String idNewUser = "";

    private String idNewShop = "";

    private String idNewService = "";

    @BeforeAll
    public void setUpForTests(MockMvc mockMvc) throws Exception{

        System.out.println("Set Up For Services Tests");

        Map<String,String> data = new HashMap<>();
        data.put("username",userNameNewUser);
        data.put("email",emailNewUser);
        data.put("role",roleNewUser);
        data.put("password",passwordNewUser);

        this.idNewUser = TestHelper.createTestUser(mockMvc,data);

        Map<String,String> shopData = new HashMap<>();
        shopData.put("shopName", "test new shop name 1");
        shopData.put("contactNumber","123456789");
        shopData.put("startTime","09:00");
        shopData.put("endTime","21:00");
        shopData.put("shopAddress","330 church street, parramatta, sydney, NSW");
        shopData.put("shopDescription","this is test shop 1");
        shopData.put("userId",this.idNewUser);
        shopData.put("lat","-50.0");
        shopData.put("lng","50.0");

        this.idNewShop = TestHelper.createTestShop(mockMvc,shopData);

        System.out.println("Done Set Up For Services Tests");
    }

    @Test
    public void testAddService(MockMvc mockMvc) throws Exception{

        System.out.println("Test Add Service");

        Map<String,Object> data = new HashMap<>();
        data.put("available",1);
        data.put("serviceDescription","this is test service description");
        data.put("image",null);
        data.put("pickup",1);
        data.put("price","123");
        data.put("serviceName","This is test service name");
        data.put("shop_id",Integer.parseInt(this.idNewShop));

        mockMvc.perform(post("/services/add")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        MvcResult resultActions = mockMvc.perform(get("/services/getServices/"+this.idNewShop))
                .andExpect(status().isOk())
                .andReturn();

        String contentAsString = resultActions.getResponse().getContentAsString();

        final ObjectMapper mapper = new ObjectMapper();

        List<Map<String,Object>> map = mapper.readValue(contentAsString, ArrayList.class);

        this.idNewService = String.valueOf(map.get(0).get("id"));

        System.out.println("Done Test Add Service");
    }

    @Test
    public void testGetServiceById(MockMvc mockMvc) throws Exception{
        System.out.println("Run Test Get Service Detail");

        mockMvc.perform(get("/services/getServiceDetailById/"+this.idNewService))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.shop_id", is(Integer.parseInt(this.idNewShop))))
                .andExpect(jsonPath("$.service_name", is("This is test service name")))
                .andExpect(jsonPath("$.description", is("this is test service description")))
                .andExpect(jsonPath("$.available", is(true)))
                .andExpect(jsonPath("$.price", is(123.0)))
                .andExpect(jsonPath("$.rating", is(0)));

        System.out.println("Done Test Get Service Detail");
    }


    @Test
    public void testGetMapInfoById(MockMvc mockMvc) throws Exception{
        System.out.println("Run Test Get Service Map Info");

        mockMvc.perform(get("/services/getMapInfoById/"+this.idNewService))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.lat", is(-50.0)))
                .andExpect(jsonPath("$.lng", is(50.0)));

        System.out.println("Done Test Get Service Map Info");
    }

    @Test
    public void testGetAllServices(MockMvc mockMvc) throws Exception{
        System.out.println("Run Test Get All Service");

        List<Map<String,Object>> res = TestHelper.getListResponses(mockMvc,"/services/getServices/"+this.idNewShop);

        Assert.assertEquals(res.size(),1);

        Assert.assertEquals(res.get(0).get("id"),Integer.parseInt(this.idNewService));

        System.out.println("Done Test Get All Services");
    }

    @Test
    public void testSearchService(MockMvc mockMvc) throws Exception{
        System.out.println("Run Test Search Service");

        String searchName = "THIS IS TEST Service";

        List<Map<String,Object>> res = TestHelper.getListResponses(mockMvc,"/services/search/"+searchName);

        Assert.assertEquals(res.size(),1);

        Assert.assertEquals(res.get(0).get("id"),Integer.parseInt(this.idNewService));

        System.out.println("Done Test Search Service");
    }

    @Test
    public void testUpdateService(MockMvc mockMvc) throws Exception{
        System.out.println("Run Test Update Service");

        Map<String,String> data = new HashMap<>();
        data.put("service_id", this.idNewService);
        data.put("serviceName","test service new name");
        data.put("serviceDescription","test service new description");
        data.put("available","0");
        data.put("pickup","0");
        data.put("price","1234");
        data.put("image",null);

        mockMvc.perform(post("/services/update")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mockMvc.perform(get("/services/getServiceDetailById/"+this.idNewService))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.shop_id", is(Integer.parseInt(this.idNewShop))))
                .andExpect(jsonPath("$.service_name", is("test service new name")))
                .andExpect(jsonPath("$.available", is(false)))
                .andExpect(jsonPath("$.pick_up", is(false)))
                .andExpect(jsonPath("$.price", is(1234.0)))
                .andExpect(jsonPath("$.description", is("test service new description")));

        System.out.println("Done Test Update Service");
    }

    @Test
    public void testUpdateServiceTotalSold(MockMvc mockMvc) throws Exception{
        System.out.println("Run Test Update Service Total Sold");

        Map<String,String> data = new HashMap<>();
        data.put("id", this.idNewService);

        mockMvc.perform(post("/services/updateTotalSold")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mockMvc.perform(get("/services/getServiceDetailById/"+this.idNewService))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.shop_id", is(Integer.parseInt(this.idNewShop))))
                .andExpect(jsonPath("$.total_sold", is(1)));

        System.out.println("Done Test Update Service Total Sold");
    }


    @AfterAll
    public void cleanUpAfterTests(MockMvc mockMvc) throws Exception{
        TestHelper.clearTestUserFromDb(mockMvc,this.idNewUser);
        TestHelper.clearTestShopsFromDb(mockMvc,this.idNewUser);
        TestHelper.clearTestServicesFromDb(mockMvc,this.idNewShop);
    }


    @Test
    public void runAll(MockMvc mockMvc) throws Exception{
        setUpForTests(mockMvc);

        try{
            testAddService(mockMvc);
            testGetServiceById(mockMvc);
            testGetMapInfoById(mockMvc);
            testGetAllServices(mockMvc);
            testSearchService(mockMvc);
            testUpdateService(mockMvc);
            testUpdateServiceTotalSold(mockMvc);
        }
        catch (Exception e){
            System.out.println(e);
        }

        cleanUpAfterTests(mockMvc);
    }
}
