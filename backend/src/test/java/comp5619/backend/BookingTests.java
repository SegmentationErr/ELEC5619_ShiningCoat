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
public class BookingTests {

    private String userNameNewUser = "Business Users Used For Test";
    private String emailNewUser = "testBusinessUserEmail@test.com";
    private final String roleNewUser = "business";
    private final String passwordNewUser = "123456789";
    private String idNewUser = "";

    private String idNewShop = "";

    private String idNewService = "";

    private String idNewBooking = "";

    @BeforeAll
    public void setUpForTests(MockMvc mockMvc) throws Exception{

        System.out.println("Set Up For Booking Tests");

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

        Map<String,Object> serviceData = new HashMap<>();
        serviceData.put("available",1);
        serviceData.put("serviceDescription","this is test service description");
        serviceData.put("image",null);
        serviceData.put("pickup",1);
        serviceData.put("price","123");
        serviceData.put("serviceName","This is test service name");
        serviceData.put("shop_id",Integer.parseInt(this.idNewShop));

        this.idNewService = TestHelper.createTestService(mockMvc,serviceData);

        System.out.println("Done Set Up For Booking Tests");
    }


    @Test
    public void testAddBooking(MockMvc mockMvc) throws Exception{
        System.out.println("Test Add New Booking");

        Map<String,Object> data = new HashMap<>();
        data.put("pickup",1);
        data.put("service_id",this.idNewService);
        data.put("shop_id",this.idNewShop);
        data.put("user_id",this.idNewUser);
        data.put("time","2019-06-12 20:30:00");

        mockMvc.perform(post("/bookings/add")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        System.out.println("Done Test Add New Booking");
    }


    @Test
    public void testGetAllBookingByUserId(MockMvc mockMvc) throws Exception{
        System.out.println("Test Get All Bookings By User Id");

        List<Map<String,Object>> res = TestHelper.getListResponses(mockMvc,"/bookings/getAllBookings/"+this.idNewUser);

        Assert.assertEquals(res.size(),1);

        Assert.assertEquals(res.get(0).get("user_id"),Integer.parseInt(this.idNewUser));

        Assert.assertEquals(res.get(0).get("service_id"),Integer.parseInt(this.idNewService));

        Assert.assertEquals(res.get(0).get("shop_id"),Integer.parseInt(this.idNewShop));

        Assert.assertEquals(String.valueOf(res.get(0).get("time")),"2019-06-12T10:30:00.000+00:00");

        this.idNewBooking = String.valueOf(res.get(0).get("id"));

        System.out.println("Done Get All Bookings By User Id");
    }


    @Test
    public void testGetAllBookingByShopId(MockMvc mockMvc) throws Exception{
        System.out.println("Test Get All Bookings By Shop Id");

        List<Map<String,Object>> res = TestHelper.getListResponses(mockMvc,"/bookings/getAllShopBookings/"+this.idNewShop);

        Assert.assertEquals(res.size(),1);

        Assert.assertEquals(res.get(0).get("user_id"),Integer.parseInt(this.idNewUser));

        Assert.assertEquals(res.get(0).get("service_id"),Integer.parseInt(this.idNewService));

        Assert.assertEquals(res.get(0).get("shop_id"),Integer.parseInt(this.idNewShop));

        Assert.assertEquals(String.valueOf(res.get(0).get("time")),"2019-06-12T10:30:00.000+00:00");

        Assert.assertEquals(res.get(0).get("username"),this.userNameNewUser);

        System.out.println("Done Get All Bookings By Shop Id");
    }


    @Test
    public void testDeleteBookings(MockMvc mockMvc) throws Exception{
        System.out.println("Test Delete Bookings");

        Map<String,Object> data = new HashMap<>();
        data.put("pickup",1);
        data.put("service_id",this.idNewService);
        data.put("shop_id",this.idNewShop);
        data.put("user_id",this.idNewUser);
        data.put("time","2019-07-12 20:30:00");

        mockMvc.perform(post("/bookings/add")
                        .content(TestHelper.asJsonString(data))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        Map<String,Object> deleteData = new HashMap<>();
        deleteData.put("id",this.idNewBooking);

        mockMvc.perform(post("/bookings/deleteBooking")
                        .content(TestHelper.asJsonString(deleteData))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        List<Map<String,Object>> res = TestHelper.getListResponses(mockMvc,"/bookings/getAllShopBookings/"+this.idNewShop);

        Assert.assertEquals(res.size(),1);

        Assert.assertEquals(res.get(0).get("user_id"),Integer.parseInt(this.idNewUser));

        Assert.assertEquals(res.get(0).get("service_id"),Integer.parseInt(this.idNewService));

        Assert.assertEquals(res.get(0).get("shop_id"),Integer.parseInt(this.idNewShop));

        Assert.assertEquals(String.valueOf(res.get(0).get("time")),"2019-07-12T10:30:00.000+00:00");

        Assert.assertEquals(res.get(0).get("username"),this.userNameNewUser);

        System.out.println("Done Delete Bookings");
    }


    @AfterAll
    public void cleanUpAfterTests(MockMvc mockMvc) throws Exception{
        System.out.println("Clean Up");

        TestHelper.clearTestUserFromDb(mockMvc,this.idNewUser);
        TestHelper.clearTestShopsFromDb(mockMvc,this.idNewUser);
        TestHelper.clearTestServicesFromDb(mockMvc,this.idNewShop);
        TestHelper.clearTestBookingsFromDb(mockMvc,this.idNewUser);

        System.out.println("Done Clean Up");
    }


    @Test
    public void runAll(MockMvc mockMvc) throws Exception{
        setUpForTests(mockMvc);

        try{
            testAddBooking(mockMvc);
            testGetAllBookingByUserId(mockMvc);
            testGetAllBookingByShopId(mockMvc);
            testDeleteBookings(mockMvc);
        }
        catch (Exception e){
            System.out.println(e);
        }

        cleanUpAfterTests(mockMvc);
    }


}
