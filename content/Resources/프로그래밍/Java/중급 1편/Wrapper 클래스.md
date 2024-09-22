---
title: 
tags:
  - java
  - programming
publish: true
date: 2024-09-22
---
자바는 객체 지향 언어이다. 그런데 객체가 아닌 `int`, `double` 같은 기본형이 존재한다. 기본형은 객체가 아니기 때문에 다음과 같은 한계가 있다.

- 객체는 유용한 메서드를 제공할 수 있는데, 기본형은 객체가 아니므로 메서드를 제공할 수 없다.


- 기본형은 `null` 값을 가질 수 없다. 때로는 데이터가 `없음`이라는 상태를 나타내야 할 필요가 있는데 기본형은 항상 값을 가지기 때문에 이런 표현을 할 수 없다.

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

**직접 만든 래퍼 클래스**

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

자기 자신의 갑

---