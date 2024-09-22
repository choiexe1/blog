---
title: 
tags:
  - java
  - programming
publish: true
date: 2024-09-22
---
자바는 객체 지향 언어이다. 그런데 객체가 아닌 `int`, `double` 같은 기본형이 존재한다. 기본형은 객체가 아니기 때문에 한계가 있다.

**기본형의 한계**

1. 객체는 유용한 메서드를 제공할 수 있는데, 기본형은 객체가 아니므로 메서드를 제공할 수 없다. 
2. 기본형은 `null` 값을 가질 수 없다. 때로는 데이터가 `없음`이라는 상태를 나타내야 할 필요가 있는데 기본형은 항상 값을 가지기 때문에 이런 표현을 할 수 없다.

```java
public static void main(String[] args) {  
  int value = 10;  
  int i1 = compareTo(value, 5);  
  int i2 = compareTo(value, 10);  
  int i3 = compareTo(value, 20);  
  
  System.out.println(i1);  
  System.out.println(i2);  
  System.out.println(i3);  
  
}  
  
public static int compareTo(int value, int target) {  
  if (value < target) {  
    return -1;  
  } else if (value > target) {  
    return 1;  
  } else {  
    return 0;  
  }  
}
```

위의 예시 코드에서는 `value` 값을 단순히 비교하고 결과에 따라 `-1`, `0`, `1`을 반환하는 메서드가 존재한다.

위와 같은 경우, 만약 `value`가 객체였다면 `value` 객체 스스로 자기 자신의 값과 다른 값을 비교하는 메서드를 제공하는 것이 더 유용할 것이다.

**래퍼 클래스**

```java
public class MyInteger {  
  private final int value;  
  
  public MyInteger(int value) {  
    this.value = value;  
  }  
  
  public int getValue() {  
    return value;  
  }  
  
  public int compareTo(int target) {  
    if (value < target) {  
      return -1;  
    } else if (value > target) {  
      return 1;  
    } else {  
      return 0;  
    }  
  }  
  
  @Override  
  public String toString() {  
    return String.valueOf(value);  
  }  
}
```

`int` 값을 가지는 래퍼 클래스 `MyInteger` 클래스다. 캡슐화 되어 있고, 불변 객체이다.

자기 자신의 값과 다른 정수 값을 비교하는 `compare()` 메서드를 가지고, `toString()`을 오버라이딩하여 `value` 속성의 값을 문자열로 반환한다.

이런 형태로 기본형을 내부에 품고, 메서드를 통해 다양한 기능을 추가할 수 있다. 이를 [[래퍼 클래스]]라고 한다.

쉽게 말해, 래퍼 클래스는 기본형의 객체 버전이다.

**기본 제공 래퍼 클래스**

자바는 기본형에 대응하는 래퍼 클래스를 기본으로 제공한다.

- `byte` > `Byte`
- `short` > `Short`
- `int` > `Integer`
- `long` > `Long`
- `float` > `Float`
- `double` > `Double`
- `char` > `Character`
- `boolean` > `Boolean`

이런 기본 래퍼 클래스는, 다음과 같은 특징을 가진다.
- 불변 객체이다
- `equals`로 비교해야 한다.

> [!note]
> `Integer.valueOf()` 메서드를 사용하면 `-127`부터 `128`까지 캐싱 해놓고 반환한다. 즉, 문자열 풀처럼 재사용 되는 것이다. 만약 `129`의 값을 가지는 `Integer`를 생성하려고 하면, `new Integ`


---
References: 김영한의 실전 자바 - 중급 1편

Links: [[래퍼 클래스]], 