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

---
References: 

Links: 