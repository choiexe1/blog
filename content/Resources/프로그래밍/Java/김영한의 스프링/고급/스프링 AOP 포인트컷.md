---
title: 
tags:
  - java
  - spring
  - pointcut
  - aop
publish: true
date: 2025-01-04 11:40
comments: true
---
## 배경
- 포인트컷은 어드바이스를 적용할지의 여부에 대해 판별하는 기능이다.
- 스프링 AOP에서의 포인트컷은 `AspectJ` 표현식을 사용한다.

## 포인트컷 지시자(Pointcut Designator)
- `@Pointcut("execution(* hello.aop.order..*(..))")`
- 포인트컷 표현식은 `execution`과 같이 포인트컷 지시자로 시작한다.

## execution 문법
```
execution(접근제어자? 반환타입 선언타입?메서드이름(파라미터) 예외?)
```
- 메소드 실행 조인 포인트를 매칭한다.
- `?`는 생략할 수 있다.
- `*` 같은 패턴을 지정할 수 있다.

## 예시
- 먼저 예시를 위해 다음의 순서로 프로젝트를 구성한다.
- 어노테이션 생성
	- `ClassAop`
	- `MethodAop`

```java
@Target(ElementType.TYPE)  
@Retention(RetentionPolicy.RUNTIME)  
public @interface ClassAop {  
}

@Target(ElementType.METHOD)  
@Retention(RetentionPolicy.RUNTIME)  
public @interface MethodAop {  
    String value();  
}
```
- `@Target`은 자바의 클래스 타입에 적용할 것인지, 메서드에 적용할 것인지와 같은 적용 유형을 의미한다.
- `@Retention`은 어느 시점까지 타겟의 메모리를 유지할 것인지 결정하는 어노테이션이다.
	- 위에서는 `RetentionPolicy.Runtime`을 통해서 런타임에 어노테이션 정보를 메모리에 갖고 있는다는 것이다.
	- 즉, `Reflection API`등을 사용해서 어노테이션 정보를 알 수 있다는 의미가 된다.
- `MethodAop`는 문자열 타입의 `value` 속성을 가진다.
- 다음으로 `MemberService` 인터페이스와 구현체를 구현한다.
```java
public interface MemberService {  
    String hello(String param);  
}

@ClassAop  
@Component  
public class MemberServiceImpl implements MemberService {  
  
    @Override  
    @MethodAop("test value")  
    public String hello(String param) {  
        return "ok";  
    }  
  
    public String internall(String param) {  
        return "ok";  
    }  
}
```

#### 정확히 매칭
```java
@Slf4j  
@SpringBootTest  
public class ExecutionTest {  
    AspectJExpressionPointcut pointcut = new AspectJExpressionPointcut();  
    Method helloMethod;  
  
    @BeforeEach  
    void init() throws NoSuchMethodException {  
        helloMethod = MemberServiceImpl.class.getMethod("hello", String.class);  
    }  
  
    @Test  
    void printMethod() {  
        // public java.lang.String hello.aop.member.MemberServiceImpl.hello(java.lang.String)
        log.info("helloMethod = {}", helloMethod);  
    }  
}
```
- `printMethod()`를 실행해보면 주석 처리 된 내용과 동일한 `public java.lang.String hello.aop.order.aop.member.MemberServiceImpl.hello(java.lang.String)`가 출력 된다.
- 다음의 포인트컷 표현식은 이 메소드 정보와 정확히 매치된다.
```java
@Test  
void exactMatch() {  
    // public java.lang.String hello.aop.member.MemberServiceImpl.hello(java.lang.String)에 정확히 매치  
    pointcut.setExpression("execution(public String hello.aop.member.MemberServiceImpl.hello(String))");  
    assertThat(pointcut.matches(helloMethod, MemberServiceImpl.class)).isTrue();  
}
```
- **매칭 조건**
	- 접근제어자?: `public`
	- 반환타입: `String`
	- 선언타입?: `hello.aop.member.MemberServiceImpl`
	- 메서드이름: `hello`
	- 파라미터: `(String)`
	- 예외?: 생략
- `MemberServiceImpl.hello(String)` 메서드와 포인트컷 표현식의 모든 내용이 정확하게 일치한다. 따라서 `true`를 반환하므로 테스트를 통과한다.

#### 가장 많이 생략한 포인트컷
```java
@Test  
void allMatch() {  
    pointcut.setExpression("execution(* *(..))");  
    assertThat(pointcut.matches(helloMethod, MemberServiceImpl.class)).isTrue();  
}
```
- **매칭 조건**
	- 접근제어자?: 생략
	- 반환타입: `*`
	- 선언타입?: 생략
	- 메서드이름: `*`
	- 파라미터: `(..)`
	- 예외?: 생략
- 파라미터에서 `..`은 파라미터의 타입과 파라미터 수가 상관없다는 뜻이다.

#### 이름으로 매치
```java
@Test  
void nameMatch() {  
    pointcut.setExpression("execution(* hello(..))");  
    assertThat(pointcut.matches(helloMethod, MemberServiceImpl.class)).isTrue();  
}

@Test  
void namePatternMatch() {  
    pointcut.setExpression("execution(* hel*(..))");  
    assertThat(pointcut.matches(helloMethod, MemberServiceImpl.class)).isTrue();  
}

@Test  
void namePatternMatch2() {  
    pointcut.setExpression("execution(* *el*(..))");  
    assertThat(pointcut.matches(helloMethod, MemberServiceImpl.class)).isTrue();  
}
```
- 메서드 이름으로 매치하는 포인트컷이다.
- 이름의 앞 뒤에 `*`을 사용해 와일드카드로 사용할 수 있다.

#### 패키지 매칭
```java
@Test  
void packageExactMatch1() {  
    pointcut.setExpression("execution(* hello.aop.member.MemberServiceImpl.*o*(..))");  
    assertThat(pointcut.matches(helloMethod, MemberServiceImpl.class)).isTrue();  
}

@Test  
void packageExactMatch2() {  
    pointcut.setExpression("execution(* hello.aop.member.*.*(..))");  
    assertThat(pointcut.matches(helloMethod, MemberServiceImpl.class)).isTrue();  
}

@Test  
void packageExactFalse() {  
    pointcut.setExpression("execution(* hello.aop.*.*(..))");  
    assertThat(pointcut.matches(helloMethod, MemberServiceImpl.class)).isFalse();  
}  
  
@Test  
void packageMatchSubPackage1() {  
    pointcut.setExpression("execution(* hello.aop.member..*.*(..))");  
    assertThat(pointcut.matches(helloMethod, MemberServiceImpl.class)).isTrue();  
}  
  
@Test  
void packageMatchSubPackage2() {  
    pointcut.setExpression("execution(* hello.aop..*.*(..))");  
    assertThat(pointcut.matches(helloMethod, MemberServiceImpl.class)).isTrue();  
}
```
- `hello.aop.member.*(1).*(2)`
	- `(1)`: 타입
	- `(2)`: 메서드 이름
- 패키지에서 `.`과 `..`의 차이를 이해해야 한다.
- `.`: 정확히 해당 위치의 패키지
- `..`: 해당 위치의 패키지와 그 하위 패키지도 포함

#### 타입 매치
```java
@Test  
void typeExactMatch() {  
    pointcut.setExpression("execution(* hello.aop.member.MemberServiceImpl.*(..))");  
    assertThat(pointcut.matches(helloMethod, MemberServiceImpl.class)).isTrue();  
}  
  
@Test  
void typeSuperMatch() {  
    pointcut.setExpression("execution(* hello.aop.member.MemberService.*(..))");  
    assertThat(pointcut.matches(helloMethod, MemberServiceImpl.class)).isTrue();  
}
```
- `typeExactMatch()`는 타입 정보가 정확하게 일치하기 때문에 매칭된다.
- `typeSuperMatch()`는 부모 타입을 선언해도 그 자식 타입은 매칭된다.
	- `MemberServiceImpl`은 `MemberService` 인터페이스를 구현한 자식 타입이다.
	- 따라서 매칭된다.


---

References: 김영한의 스프링 핵심 원리 - 고급편

Links to this page:
