---
title: 
tags: 
publish: true
date: 2024-09-23
---
## Math 클래스

`Math` 클래스는 수 많은 수학 문제를 해결해주는 클래스이다.

```java
// 기본 연산 메소드  
System.out.println("max(10, 20) = " + Math.max(10, 20)); // 최대값  
System.out.println("min(10, 20) = " + Math.min(10, 20)); // 최소값  
System.out.println("abs(-10) = " + Math.abs(-10)); // 절대값  
  
// 반올림 및 정밀도 메서드  
System.out.println("ceil(2.1) = " + Math.ceil(2.1)); // 올림  
System.out.println("floor(2.1) = " + Math.floor(2.1)); // 내림  
System.out.println("round(2.1) = " + Math.round(2.1)); // 반올림  
  
// 기타 유용한 메서드  
System.out.println("sqrt(4) = " + Math.sqrt(4)); // 제곱근  
System.out.println("random() = " + Math.random()); // 0.0 ~ 1.0 사이의 double 값
```

이 외에도 다양한 메소드들이 존재하므로, 필요할 때 검색해서 API 문서를 찾아보아야 한다.

## Random 클래스
랜덤의 경우 `Math.random()`을 사용해도 되지만 `Random` 클래스를 사용하면 더욱 다양한 임의의 값을 구할 수 있다.

- `Math.random()`도 내부에서 `Random` 클래스를 사용한다.
- `Random` 클래스는 `java.util` 패키지 소속이다.





---
References: 

Links: 