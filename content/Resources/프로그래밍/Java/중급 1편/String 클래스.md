---
title: 
tags:
  - java
  - programming
publish: true
date: 2024-09-21
---
## String 클래스

`String` 클래스는 문자로 이루어진 배열을 쉽게 다루기 위해 제공하는 클래스다. 

소문자로 시작하는 기본형 타입과 다르게, `String` 클래스는 대문자로 시작한다, 즉 참조형 타입이라는 것이다.

그러나 일반적인 참조형 타입과 다르게, `String` 클래스는 문자열을 두 가지 방법으로 생성할 수 있다.

```java
public static void main(String[] args) {
	String str1 = "Hello";
	String str2 = new String("Hello");
}
```

생성자를 이용해 생성하는 방법은 익숙한 방법이다. 그러나 문자열만 넣어서 생성하는 첫번째 방법은 익숙하지 않다.

문자열은 매우 자주 사용되기 때문에, 편의상 쌍따옴표로 문자열을 감싸면 자바가 `new String("Hello")`와 같이 변경해준다.

**문자열의 비밀**

앞서 살펴본 `String` 클래스는 사실 속성으로 문자의 배열을 가지는 클래스다. C언어에서 문자열을 출력하려면 `char` 타입의 문자 배열을 만들어서 사용했던 것과 유사하다.

자바의 버전에 따라 `byte[]`를 속성으로 가지거나, `char[]`를 속성으로 가지고 이 속성에 문자열을 저장한다.

## 참조형
`String` 클래스는 참조형이다. 따라서 `String` 타입의 변수엔 계산할 수 있는 값이 아닌 참조값이 들어있다. 그러므로 원칙적으로 `+` 같은 연산자를 사용할 수 없다.

하지만 문자열은 너무 자주 다루어지기 때문에 자바 언어에서 편의상 특별히 `+` 연산을 제공한다.

## 비교
`String` 객체를 비교할 때는 `==` 연산자가 아니라, 항상 `equals()`를 사용하여 비교해야한다. 왜냐하면 `String` 타입은 참조형이기 때문에 해당 유형의 변수는 참조값을 가지기 때문이다.

위 내용은 [[Object 클래스#동일성(Identity)과 동등성(Equality)|Object 클래스 > 동일성과 동등성]]을 참고할 수 있다.

```java
public static void main(String[] args) {  
  String str1 = "hello";  
  String str2 = "hello";  
  
  System.out.println("리터럴 == 비교: " + (str1 == str2));  
  System.out.println("리터럴 equals 비교: " + (str1.equals(str2)));  
}

// 출력 결과
// 리터럴 == 비교: true
// 리터럴 equals 비교: true
```

그러나 위 코드는 이런 추측대로 작동하지 않는다. 자바에서 리터럴 문자열을 생성하면, 자동으로 `new Strnig("hello")`로 변환한다.

이 경우 자바는 메모리 효율성과 성능 최적화를 위해 문자열 풀을 사용한다. 자바가 로드 되는 시점에 클래스에 문자열 리터럴이 있으면 문자열 풀에 `String` 인스턴스를 미리 만들어둔다. (런타임이 아니다)

이때 같은 문자열이 있으면 만들지 않는다. 즉, 위의 예시 코드에서 `str1`과 `str2`는 



---
References: 

Links: 