---
title: 
tags:
  - java
  - programming
publish: true
date: 2024-09-23
---
## 열거형 (Enum)

자바가 제공하는 열거형을 제대로 이해하려면 먼저 열거형이 탄생한 이유를 알아야 한다. 예제를 따라가며 열거형이 만들어진 근본적인 이유를 알아보자.

**비즈니스 요구사항**

고객은 3등급으로 나누고, 상품 구매시 등급별로 할인을 적용한다. 할인시 소수점 이하는 버린다.
- `BASIC` -> 10% 할인
- `GOLD` -> 20% 할인
- `DIAMOND` -> 30% 할인

```java title="DiscountService.java"
public class DiscountService {  
  public int discount(String grade, int price) {  
    int discountPercent = 0;  
  
    if (grade.equals("BASIC")) {  
      discountPercent = 10;  
    } else if (grade.equals("GOLD")) {  
      discountPercent = 20;  
    } else if (grade.equals("DIAMOND")) {  
      discountPercent = 30;  
    } else {  
      System.out.println(grade + " 할인 X");  
    }  
  
    return price * discountPercent / 100;  
  }  
}
```

할인 서비스 클래스를 정의했다. 이 할인 서비스의 `discount` 메서드는 회원의 등급을 문자열로 받고, 가격을 받아 할인 금액을 반환하는 간단한 메서드다.

하지만 이 클래스를 사용하는 곳에서 존재하지 않는 회원 등급을 입력하거나, 오타로 인해 잘못된 등급을 입력하거나 대문자로 이루어진 회원 등급이 아닌 소문자로 입력할 수 있는 여지가 충분히 존재한다.

- **타입 안정성 부족**: 문자열은 오타가 발생하기 쉽고, 유효하지 않은 값이 입력될 수 있다.
- **데이터 일관성**: "GOLD", "gold", "Gold" 등 다양한 형식으로 문자열을 입력할 수 있어 일관성이 떨어진다.

즉 `String`으로 상태나 카테고리를 표현하면, 잘못된 문자열을 실수로 입력할 가능성이 있다.

이러한 잘못된 값은 컴파일 시에는 감지되지 않고, 런타임에서만 문제가 발견되기 때문에 디버깅이 어려워 질 수 있다.

이런 문제를 해결하기 위해서는 특정 범위로 값을 제한해야 한다.

## 상수로 해결해보기
```java title="StringGrade.java"
public class StringGrade {  
  public static final String BASIC = "BASIC";  
  public static final String GOLD = "GOLD";  
  public static final String DIAMOND = "DIAMOND";  
}
```

```java title="DiscountService.java"
public class DiscountService {  
  public int discount(String grade, int price) {  
    int discountPercent = 0;  
  
    if (grade.equals(StringGrade.BASIC)) {  
      discountPercent = 10;  
    } else if (grade.equals(StringGrade.GOLD)) {  
      discountPercent = 20;  
    } else if (grade.equals(StringGrade.DIAMOND)) {  
      discountPercent = 30;  
    } else {  
      System.out.println(grade + " 할인 X");  
    }  
  
    return price * discountPercent / 100;  
  }  
}
```

문자열 상수를 사용한 덕분에 전체적으로 코드가 더 명확해졌다. 그리고 `discount()`에 인자를 전달할 때도 `StringGrade`가 제공하는 상수를 사용하면 된다.

더 좋은 점은, 실수로 상수의 이름을 잘못 입력하면 컴파일 시점에 오류가 발생한다는 점이다.

하지만 문자열 상수를 사용해도 지금까지 발생한 문제들을 근본적으로 해결할 수는 없다. 왜냐하면 `String`타입은 어떤 문자열이든 입력할 수 있기 때문이다.

즉, 어떤 개발자가 실수로 `StringGrade`의 상수를 사용하지 않고 직접 문자열을 사용해도 막을 수 있는 방법이 없는 것이다. 근본적인 문제가 해결되지 않은 것이다.

## 타입 안전 열거형 패턴 (Type-safe Enum Pattern)
지금까지 설명한 문제를 해결하기 위해 많은 개발자들이 오랜 기간 고민하고 나온 결과가 바로 타입 안전 열거형 패턴이다.

`enumetaion`이란 어떤 항목을 열거한다는 것을 의미한다. 핵심은 직접 나열한 항목만 사용할 수 있게 한다는 점이다. 나열한 항목이 아닌 것은 사용할 수 없다.

쉽게 이야기해서 앞서 봤던 `String`처럼 아무런 문자열이나 다 사용할 수 있는 것이 아니라, 직접 나열한 항목인 `BASIC`, `GOLD`, `DIAMOND`만 사용할 수 있게 된다.

```java title="ClassGrade.java"
public class ClassGrade {  
  public static final ClassGrade BASIC = new ClassGrade();  
  public static final ClassGrade GOLD = new ClassGrade();  
  public static final ClassGrade DIAMOND = new ClassGrade();  
}
```

- 위에 열거된 각각의 항목들은 `static`이므로 어플리케이션 로딩 시점에 각각의 인스턴스가 생성된다.
- 각각의 상수는 같은 `ClassGrade` 타입이지만, 서로 다른 참조값을 가진다.

---
References: 김영한의 실전 자바 - 중급 1편

Links: 