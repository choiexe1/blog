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

## 클래스로 구현하는 타입 안전 열거형 패턴 (Type-safe Enum Pattern)
지금까지 설명한 문제를 해결하기 위해 많은 개발자들이 오랜 기간 고민하고 나온 결과가 바로 타입 안전 열거형 패턴이다.

`enumetaion`이란 어떤 항목을 열거한다는 것을 의미한다. 핵심은 직접 나열한 항목만 사용할 수 있게 한다는 점이다. 나열한 항목이 아닌 것은 사용할 수 없다.

쉽게 이야기해서 앞서 봤던 `String`처럼 아무런 문자열이나 다 사용할 수 있는 것이 아니라, 직접 나열한 항목인 `BASIC`, `GOLD`, `DIAMOND`만 사용할 수 있게 된다.

```java title="ClassGrade.java"
public class ClassGrade {  
  public static final ClassGrade BASIC = new ClassGrade();  
  public static final ClassGrade GOLD = new ClassGrade();  
  public static final ClassGrade DIAMOND = new ClassGrade();

  private ClassGrade() {}
}
```

- 위에 열거된 각각의 항목들은 `static`이므로 어플리케이션 로딩 시점에 각각의 인스턴스가 생성되고, `final` 키워드로 인해 참조값을 변경할 수 없는 상수가 된다.
- 다른 개발자가 객체를 직접 생성하여 전달 할 수 있으므로, `private` 키워드의 생성자를 정의하여 객체 생성에 접근을 제한 한다.
- 각각의 상수는 같은 `ClassGrade` 타입이지만, 서로 다른 참조값을 가진다.

```java title="DiscountService.java"
public class DiscountService {  
  public int discount(ClassGrade grade, int price) {  
    int discountPercent = 0;  
  
    if (grade == ClassGrade.BASIC) {  
      discountPercent = 10;  
    } else if (grade == ClassGrade.GOLD) {  
      discountPercent = 20;  
    } else if (grade == ClassGrade.DIAMOND) {  
      discountPercent = 30;  
    } else {  
      System.out.println("할인 X");  
    }  
  
    return price * discountPercent / 100;  
  }  
}
```

앞서 말했듯 자바 실행 시점, 자바 메모리 구조 중 [[자바의 메모리 구조#메서드 영역|메서드 영역]]에 `ClassGrade`의 `static` 변수를 보관하므로 어플리케이션 전역에서 객체 생성 없이 사용할 수 있게된다.

수정된 `DiscountService`의 `discount()` 메서드는 이제 인자로 `ClassGrade` 타입을 받아서 타입 안정성을 갖추게 되었다.

조건문에는 `==` 연산자를 사용하여 참조값을 비교한다.

> [!note]
> Enum 사용 시 객체를 직접 생성할 수 없도록 생성자를 `private`으로 접근 제한 해야한다.
> 
> 열거할 항목들을 상수로 정의 해야한다.
> 
> 비교 시 참조값 비교를 위해 `==` 연산자를 사용해야 한다.

## 자바에서 제공하는 열거형 타입 (Enum Type)
자바는 타입 안전 열거형 패턴을 매우 편리하게 사용할 수 있도록 열거형을 제공한다.

쉽게 말해, [[#클래스로 구현하는 타입 안전 열거형 패턴 (Type-safe Enum Pattern)]]을 쉽게 사용 할 수 있도록 프로그래밍 언어에서 지원하는 것이다.

열거형을 한번 정의하고 사용해보면서 학습해보자.

```java title="Grade.java"
public enum Grade {  
  BASIC, GOLD, DIAMOND  
}
```

열거형을 정의할 때는 `class` 대신에 `enum`을 사용하고, 원하는 상수의 이름을 나열하면 된다.
위에 작성된 코드는 앞서 구현했던 `ClassGrade`와 거의 같다.

다른점은 암묵적으로 `java.lang.Enum`을 상속 받는다는 것이다.

- 열거형은 자동으로 `java.lang.Enum`을 상속 받는다.
- 열거형도 제공하기 위해 제약이 추가된 클래스다.
- 외부에서 임의로 생성할 수 없다.

**열거형의 장점**
- **타입 안정성 향상**: 열거형은 사전에 정의된 상수들로만 구성되므로, 유효하지 않은 값이 입력될 가능성이 없다.
- **간결성 및 일관성**: 열거형을 사용하면 코드가 더 간결하고 명확해지며, 데이터의 일관성이 보장된다.
- **확장성**: 새로운 회원 등급 타입을 추가하고 싶을 때, `Enum`에 새로운 상수를 추가하기만 하면 된다.

> [!tip]
> `Enum`에 나열된 항목들은 모두 상수이기 때문에 [[static#static import|static import]]를 사용할 수 있다.

## 열거형의 주요 메서드들

- **values()**: 모든 Enum 상수를 포함하는 배열 반환
- **valueOf(String name)**: name 인자와 일치하는 Enum 상수 반환
- **name()**: Enum 상수의 이름을 문자열로 반환
- **ordinal()**: Enum 상수의 선언 순서 인덱스를 반환 (0부터 시작)
- **toString()**: Enum 상수의 이름을 문자열로 반환한다. name() 메서드와 유사하지만 toString()은 직접 오버라이드 할 수 있다.

> [!warning]
> `ordinal()`의 값은 사용하지 않는 것이 좋다, 왜냐하면 이 값을 사용하다가 중간에 상수를 선언하는 위치가 변경되면 전체 상수의 위치가 모두 변경될 수 있기 때문이다.

> [!note] 열거형 정리
> - 열거형은 `java.lang.Enum`을 자동(강제)으로 상속 받는다.
> - 열거형은 이미 `java.lang.Enum`을 상속 받았기 때문에 추가로 다른 클래스를 상속 받을 수 없다.
> - 열거형은 인터페이스를 구현할 수 있다.
> - 열거형에 추상 메서드를 선언하고, 구현할 수 있다.

## 리팩토링
앞서 정의했던 

---
References: 김영한의 실전 자바 - 중급 1편

Links: [[자바의 메모리 구조#메서드 영역]], [[static#static import##]]