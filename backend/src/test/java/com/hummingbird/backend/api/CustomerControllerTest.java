package com.hummingbird.backend.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hummingbird.backend.user.controller.CustomerController;
import com.hummingbird.backend.user.service.serviceImpl.GeneralCustomerService;
import com.hummingbird.backend.user.util.SessionUtilService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static com.hummingbird.backend.api.CustomerDocumentation.getCustomerFieldInfo;
import static com.hummingbird.backend.init.DBInit.*;
import static com.hummingbird.backend.user.controller.CustomerController.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(RestDocumentationExtension.class)
@ExtendWith(MockitoExtension.class)
@WebMvcTest(CustomerController.class)
@MockBean(JpaMetamodelMappingContext.class)
class CustomerControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private GeneralCustomerService customerService;

    @MockBean
    private SessionUtilService sessionUtilService;


    @BeforeEach
    void setUp(WebApplicationContext applicationContext,
               RestDocumentationContextProvider contextProvider) {

        mockMvc = MockMvcBuilders
                .webAppContextSetup(applicationContext)
                .apply(documentationConfiguration(contextProvider))
                .build();

        when(passwordEncoder.encode(any())).thenReturn("zxcv1234~");
    }

    @DisplayName("회원 가입 성공시 http status 200 반환")
    @Test
    void testSuccessToSignup() throws Exception {

        // given
        doNothing().when(customerService.signup(Customer_REQUEST_DTO,passwordEncoder));

        // when
        mockMvc.perform(post(CUSTOMER_API_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(serializedToJson(Customer_REQUEST_DTO)))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("/api/customer/create/success",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        getCustomerFieldInfo()
                ));

    }

    @DisplayName("중복된 회원 정보로 회원 가입 요청시 HTTP 상태 코드 409를 반환")
    @Test
    void failToRegistrationCustomerByDuplicated() throws Exception {

        when(customerService.isDuplicatedCustomer(any(),passwordEncoder)).thenReturn(true);

        mockMvc.perform(post(CUSTOMER_API_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(serializedToJson(Customer_REQUEST_DTO)))
                .andDo(print())
                .andExpect(status().isConflict())
                .andDo(document("members/create/fail",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        getCustomerFieldInfo()
                ));

    }

    @DisplayName("회원 가입시 입력 값을 인지할 수 있지만 유효한 값이 아닌 경우 HTTP 상태 코드 422를 반환")
    @Test
    void failToSignupCustomerByUnValidInput() throws Exception {

        when(customerService.isValidCustomer(any(),passwordEncoder)).thenReturn(false);

        mockMvc.perform(post(CUSTOMER_API_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(serializedToJson(Customer_REQUEST_DTO)))
                .andDo(print())
                .andExpect(status().isUnprocessableEntity())
                .andDo(document("members/create/fail",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        getCustomerFieldInfo()
                ));

    }


    private String serializedToJson(Object object) throws JsonProcessingException {
        return objectMapper.writeValueAsString(object);
    }
}