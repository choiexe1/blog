---
title: 
tags:
  - java
  - programming
  - servlet
  - spring
  - mvc
publish: true
date: 2024-11-20
---
## 서블릿 (Servlet)
최초의 MVC 기술부터 현재 사용하는 스프링 MVC 기술까지 어떻게, 그리고 왜 발전 해왔는지 수강생에게 알려준다. 그 시작이 서블릿이다.

### Hello 서블릿
백문이 불여일타다. 스프링 부트 환경에서 서블릿을 등록하고 사용해본다.

> [!tip] 톰캣과 서블릿
> 서블릿은 톰캣 같은 웹 어플리케이션 서버를 직접 설치하고 그 위에 서블릿 코드를 클래스 파일로 빌드해서 올린 다음, 톰캣 서버를 실행하면 된다. 하지만 이 과정은 매우 번거롭다.
> 
> 스프링 부트는 톰캣 서버를 내장하고 있으므로, 톰캣 서버 설치 없이 편리하게 서블릿 코드를 실행할 수 있다.


```java
@ServletComponentScan  
@SpringBootApplication  
public class ServletApplication {  

    public static void main(String[] args) {  
       SpringApplication.run(ServletApplication.class, args);  
    }
    
}
```
- 스프링 부트는 서블릿을 직접 등록해서 사용할 수 있도록 `@ServletComponentScan`을 지원한다.


```java
@WebServlet(name = "helloServlet", urlPatterns = "/hello")  
public class HelloServlet extends HttpServlet {  
  
    @Override  
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {  
        System.out.println("HelloServlet.service");  
    }  
}
```
- `@WebServlet` 서블릿 어노테이션
	- name: 서블릿 이름
	- urlPatterns: URL 매핑

HTTP 요청을 통해 매핑된 URL이 호출되면 서블릿 컨테이너는 `service()` 메서드를 실행한다.

```java
@Override  
protected void service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {  
    System.out.println("HelloServlet.service");  
    System.out.println("req = " + req);  
    System.out.println("res = " + res);  
  
    String username = req.getParameter("username");  
    System.out.println("username = " + username);  
  
    res.setContentType("text/plain");  
    res.setCharacterEncoding("utf-8");  
    res.getWriter().write("hello " + username);  
}
```

- `HttpServletRequest`, `HttpServletResponse`는 서블릿에서 구현해놓은 HTTP 기본 스펙이다. 이 두 객체를 이용해 다양한 기능을 구현한다.
- `req.getParameter`: 쿼리 파라미터를 쉽게 가져올 수 있는 메서드
- `res.setContentType`: 응답 헤더의 컨텐츠 타입을 설정하는 메서드
- `res.setCharacterEncoding`: 응답 헤더의 인코딩 유형을 설정하는 메서드
- `res.getWriter().write()`: 응답 바디를 설정하는 메서드





---
References: 김영한의 스프링 MVC 1편

Links to this page: 