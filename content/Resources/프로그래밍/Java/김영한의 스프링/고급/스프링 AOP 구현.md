---
title: 
tags:
  - java
  - programming
  - proxy
  - aop
  - spring
publish: true
date: 2025-01-04 08:29
comments: true
---
## 배경
- 배경 지식은 [[스프링 AOP 이론]]을 참고하면 된다.

## 예시
#### 스프링 AOP 구현
- 스프링 AOP를 구현하는 일반적인 방법은 앞서 학습한 `@Aspect`를 이용하는 방법이다.

```java title="AspectV1"
@Slf4j  
@Aspect
public class AspectV1 {  

    @Around("execution(* hello.aop.order..*(..))")  
    public Object doLog(ProceedingJoinPoint joinPoint) throws Throwable {  
        log.info("[log] {}", joinPoint.getSignature()); // 조인 포인트 시그니처  
        return joinPoint.proceed();  
    }  
}
```
- 자동 프록시 생성 빈 후처리기가 `Advisor`로 변환하게끔  `@Aspect` 어노테이션을 적용했다.
- `@Around` 어노테이션이 적용된 메서드인 `doLog()`는 어드바이스가 된다.
- `@Around` 내부의 값 `execution(* hello.aop.order..*(..))`은 `hello.aop.proxy` 패키지와 그 하위 패키지를 지정하는 `AspectJ` 포인트컷 표현식이다. 포인트컷 표현식은 뒤에서 자세히 설명한다.
- 따라서 `@Around` 어노테이션이 적용된 메서드는 하나의 어드바이저라고 볼 수 있다.
- 이제 `OrderService`, `OrderRepository`의 모든 메서드는 AOP 적용의 대상이 된다.

> 스프링은 `AspectJ`의 문법을 차용하고, 프록시 방식의 AOP를 제공한다. AspectJ를 직접 사용하는 것이 아니다. 스프링 AOP를 적용할 때 `@Aspect` 어노테이션을 사용하는데, 이 어노테이션도 `AspectJ`가 제공하는 어노테이션이다.


```java
@Slf4j  
@SpringBootTest  
@Import(AspectV1.class)  
public class AopTest {  
    @Autowired  
    OrderService orderService;  
  
    @Autowired  
    OrderRepository orderRepository;  
  
    @Test  
    void aopInfo() {  
        log.info("isAopProxy orderRepository = {}", AopUtils.isAopProxy(orderRepository));  
        log.info("isAopProxy orderService = {}", AopUtils.isAopProxy(orderService));  
    }  
  
    @Test  
    void success() {  
        orderService.orderItem("itemA");  
    }  
  
    @Test  
    void exception() {  
        Assertions.assertThatThrownBy(() -> orderService.orderItem("ex")).isInstanceOf(IllegalStateException.class);  
    }  
}
```

```
2025-01-04T08:47:39.714+09:00  INFO 2113 --- [aop] [           main] hello.aop.order.aop.AspectV1             : [log] void hello.aop.order.OrderService.orderItem(String)
2025-01-04T08:47:39.714+09:00  INFO 2113 --- [aop] [           main] hello.aop.order.OrderService             : [orderService] 실행
2025-01-04T08:47:39.714+09:00  INFO 2113 --- [aop] [           main] hello.aop.order.aop.AspectV1             : [log] String hello.aop.order.OrderRepository.save(String)
2025-01-04T08:47:39.714+09:00  INFO 2113 --- [aop] [           main] hello.aop.order.OrderRepository          : [orderRepository] 실행
2025-01-04T08:47:39.720+09:00  INFO 2113 --- [aop] [           main] hello.aop.AopTest                        : isAopProxy orderRepository = true
2025-01-04T08:47:39.720+09:00  INFO 2113 --- [aop] [           main] hello.aop.AopTest                        : isAopProxy orderService = true
2025-01-04T08:47:39.738+09:00  INFO 2113 --- [aop] [           main] hello.aop.order.aop.AspectV1             : [log] void hello.aop.order.OrderService.orderItem(String)
2025-01-04T08:47:39.738+09:00  INFO 2113 --- [aop] [           main] hello.aop.order.OrderService             : [orderService] 실행
2025-01-04T08:47:39.738+09:00  INFO 2113 --- [aop] [           main] hello.aop.order.aop.AspectV1             : [log] String hello.aop.order.OrderRepository.save(String)
2025-01-04T08:47:39.738+09:00  INFO 2113 --- [aop] [           main] hello.aop.order.OrderRepository          : [orderRepository] 실행
```

- `@Aspect`는 애스펙트라는 표식이지 컴포넌트 스캔이 되는 것은 아니다. 따라서 `AspectV1`을 AOP로 사용하려면 스프링 빈으로 등록해야 한다.
- `@Import`는 주로 설정 파일을 추가할 때 사용하지만, 이 기능으로 스프링 빈도 등록할 수 있다. 테스트에서는 버전을 올려가면서 변경할 예정이라 사용했다.
- 프록시를 통해 AOP가 잘 적용 된 것을 확인 했다.

#### 포인트컷 분리
- `@Around`에 값으로 포인트 컷 표현식을 직접 넣는 방법도 있지만 분리하는 방법도 있다.
- `@Pointcut` 어노테이션을 사용하여 별도로 분리하는 것이다.

```java
@Slf4j  
@Aspect  
public class AspectV2 {  
  
    @Pointcut("execution(* hello.aop.order..*(..))")  
    private void allOrder() {  
    }  
  
    @Around("allOrder()")  
    public Object doLog(ProceedingJoinPoint joinPoint) throws Throwable {  
        log.info("[log] {}", joinPoint.getSignature()); // 조인 포인트 시그니처  
  
        return joinPoint.proceed();  
    }  
}
```
- **@Pointcut**
	- `@Pointcut`은 메서드에 적용한다. 값으로는 표현식을 입력하면 된다.
	- `@Pointcut`이 적용된 메서드 이름과 파라미터를 합쳐서 포인트컷 시그니처(signature)라 부른다.
	- 메서드의 반환 타입은 `void`여야 한다.
	- 메서드 바디는 비워둬야 한다.
	- 포인트컷 시그니처는 `allOrder()`이다. 이름 그대로 주문과 관련된 모든 기능을 대상으로 하는 포인트컷이다.
- **@Around**
	- 어드바이스에서는 포인트컷을 직접 지정해도 되지만, 포인트컷 시그니처를 사용해도 된다. 여기서는 `@Around("allOrder()")`를 사용한다.
- 이렇게 포인트 컷을 분리해서 다양한 어드바이스에 적용할 수 있다. 여기서 어드바이스는 `doLog`와 같은 `Aspect` 내의 어드바이스를 의미한다.
- 이 AOP를 적용한 실행 결과는 `AspectV1`과 동일하다.

#### 어드바이스 추가
- 앞서 로그를 출력하는 기능에 추가로 트랜잭션을 적용한다. 진짜 트랜잭션은 아니고, 기능이 동작한 것 처럼 로그만 남긴다.

```java
@Slf4j  
@Aspect  
public class AspectV3 {  
    @Around("allOrder()")  
    public Object doLog(ProceedingJoinPoint joinPoint) throws Throwable {  
        log.info("[log] {}", joinPoint.getSignature()); // 조인 포인트 시그니처  
  
        return joinPoint.proceed();  
    }  
  
    @Pointcut("execution(* hello.aop.order..*(..))")  
    private void allOrder() {  
    }  
  
    // 클래스 이름 패턴이 *Service    
    @Pointcut("execution(* *..*Service.*(..))")  
    private void allService() {  
    }  
   
    @Around("allOrder() && allService()")  
    public Object doTransaction(ProceedingJoinPoint joinPoint) throws Throwable {  
        try {  
            log.info("[트랜잭션 시작] {}", joinPoint.getSignature());  
            Object result = joinPoint.proceed();  
            log.info("[트랜잭션 커밋] {}", joinPoint.getSignature());  
            return result;  
        } catch (Exception e) {  
            log.info("[트랜잭션 롤백] {}", joinPoint.getSignature());  
            throw e;  
        } finally {  
            log.info("[리소스 반환]");  
        }  
    }  
}
```
- `allOrder()` 포인트컷 시그니처는 `hello.aop.order` 패키지와 하위 패키지를 대상으로 한다.
- `allService()` 포인트컷 시그니처는 타입 이름 패턴이 `*Service`를 대상으로 하는데, 쉽게 이야기 해서 이름이 `...Service`로 끝나는 대상에 모두 적용한다.
- `@Around("allOrder() && allService()")`
	- 포인트컷은 이렇게 조합할 수 있다. 자바 논리 연산자와 동일한 연산 방식이다.
	- hello.aop.order 패키지와 하위 패키지인 것을 만족하면서 클래스 이름 패턴이 `*Service`인 것을 대상으로 한다.
- 결과적으로 `doTransaction()` 어드바이스는 `OrderService`에만 적용된다.
- `doLog()` 어드바이스는 `OrderService`, `OrderRepository`에 모두 적용된다.

```
2025-01-04T09:14:40.367+09:00  INFO 2282 --- [aop] [           main] hello.aop.order.aop.AspectV3             : [log] void hello.aop.order.OrderService.orderItem(String)
2025-01-04T09:14:40.368+09:00  INFO 2282 --- [aop] [           main] hello.aop.order.aop.AspectV3             : [트랜잭션 시작] void hello.aop.order.OrderService.orderItem(String)
2025-01-04T09:14:40.368+09:00  INFO 2282 --- [aop] [           main] hello.aop.order.OrderService             : [orderService] 실행
2025-01-04T09:14:40.368+09:00  INFO 2282 --- [aop] [           main] hello.aop.order.aop.AspectV3             : [log] String hello.aop.order.OrderRepository.save(String)
2025-01-04T09:14:40.368+09:00  INFO 2282 --- [aop] [           main] hello.aop.order.OrderRepository          : [orderRepository] 실행
2025-01-04T09:14:40.368+09:00  INFO 2282 --- [aop] [           main] hello.aop.order.aop.AspectV3             : [트랜잭션 커밋] void hello.aop.order.OrderService.orderItem(String)
2025-01-04T09:14:40.368+09:00  INFO 2282 --- [aop] [           main] hello.aop.order.aop.AspectV3             : [리소스 반환]
2025-01-04T09:14:40.376+09:00  INFO 2282 --- [aop] [           main] hello.aop.AopTest                        : isAopProxy orderRepository = true
2025-01-04T09:14:40.376+09:00  INFO 2282 --- [aop] [           main] hello.aop.AopTest                        : isAopProxy orderService = true
2025-01-04T09:14:40.393+09:00  INFO 2282 --- [aop] [           main] hello.aop.order.aop.AspectV3             : [log] void hello.aop.order.OrderService.orderItem(String)
2025-01-04T09:14:40.394+09:00  INFO 2282 --- [aop] [           main] hello.aop.order.aop.AspectV3             : [트랜잭션 시작] void hello.aop.order.OrderService.orderItem(String)
2025-01-04T09:14:40.394+09:00  INFO 2282 --- [aop] [           main] hello.aop.order.OrderService             : [orderService] 실행
2025-01-04T09:14:40.394+09:00  INFO 2282 --- [aop] [           main] hello.aop.order.aop.AspectV3             : [log] String hello.aop.order.OrderRepository.save(String)
2025-01-04T09:14:40.394+09:00  INFO 2282 --- [aop] [           main] hello.aop.order.OrderRepository          : [orderRepository] 실행
2025-01-04T09:14:40.394+09:00  INFO 2282 --- [aop] [           main] hello.aop.order.aop.AspectV3             : [트랜잭션 롤백] void hello.aop.order.OrderService.orderItem(String)
2025-01-04T09:14:40.394+09:00  INFO 2282 --- [aop] [           main] hello.aop.order.aop.AspectV3             : [리소스 반환]
```
- 여기서 로그를 남기는 순서, 그러니까 어드바이스가 적용되는 순서를 변경하고 싶으면 어떻게 해야할까?
- 그 전에 잠깐 포인트컷을 외부로 빼서 사용하는 방법을 먼저 알아본다.

#### 포인트컷 참조
- 포인트컷을 공용으로 사용하기 위해서 별도의 외부 클래스에 모아두어도 된다.
- 외부에서 접근해야 하므로 `public` 접근 제어자를 사용한다.

```java
public class Pointcuts {  
    @Pointcut("execution(* hello.aop.order..*(..))")  
    public void allOrder() {  
    }  
  
    @Pointcut("execution(* *..*Service.*(..))")  
    public void allService() {  
    }  
  
    @Pointcut("allOrder() && allService()")  
    public void allOrderAndService() {   
    }  
}
```
- 이 포인트컷을 사용하기 위해서는 다음과 같이 패키지 이름과 포인트컷 시그니처를 함께 작성 해야한다.
```java
@Slf4j  
@Aspect  
public class AspectV4Pointcut {  
    @Around("hello.aop.order.aop.Pointcuts.allOrder()")  
    public Object doLog(ProceedingJoinPoint joinPoint) throws Throwable {  
        log.info("[log] {}", joinPoint.getSignature());  
  
        return joinPoint.proceed();  
    }  
      
    @Around("hello.aop.order.aop.Pointcuts.allOrderAndService()")  
    public Object doTransaction(ProceedingJoinPoint joinPoint) throws Throwable {  
        try {  
            log.info("[트랜잭션 시작] {}", joinPoint.getSignature());  
            Object result = joinPoint.proceed();  
            log.info("[트랜잭션 커밋] {}", joinPoint.getSignature());  
            return result;  
        } catch (Exception e) {  
            log.info("[트랜잭션 롤백] {}", joinPoint.getSignature());  
            throw e;  
        } finally {  
            log.info("[리소스 반환]");  
        }  
    }  
}
```

#### 어드바이스 순서
- 어드바이스는 기본적으로 순서를 보장하지 않는다.
- 순서를 지정하고 싶으면 `@Aspect` 적용 단위로 `org.springframework.core.annotation.@Order` 어노테이션을 적용해야 한다.
- 문제는 이것은 **어드바이스 단위가 아니라 클래스 단위로 적용**한다는 점이다.
- 그래서 지금처럼 하나의 애스펙트에 여러 어드바이스가 있으면 **순서를 보장 받을 수 없다.**
- 따라서 **애스펙트를 별도의 클래스로 분리**해야한다.

---

References: 김영한의 스프링 핵심 원리 - 고급편

Links to this page: [[스프링 AOP 이론]]
