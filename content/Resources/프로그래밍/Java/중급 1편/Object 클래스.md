---
title: 
tags:
  - java
  - programming
created: 2024-09-17 20:09
publish: true
---
자바에서 모든 클래스의 최상위 부모 클래스는 항상 Object 클래스이다.


> [!Note]
> 클래스 생성 시, 상속 관계에 상위 부모가 없다면 암묵적으로 Object 클래스를 상속 받는다.

## 자바에서 Object 클래스가 최상위 부모 클래스인 이유
- 공통 기능 제공
- 다형성의 기본 구현

**공통 기능 제공**

객체가 정보를 제공하고, 객체가 다른 객체와 같은지 비교하고, 객체가 어떤 클래스로 만들어졌는지 확인하는 기능은 모든 객체에게 필요한 기본 기능이다. 이런 기능을 객체를 만들 때마다 항상 새로운 메서드를 정의해서 만들어야 한다면 상당히 번거로울 것이다.

막상 만든다고 하더라도 개발자마다 서로 다른 이름의 메서드를 만들어서 일관성이 없을 것이다.

따라서 `Object` 클래스는 모든 객체의 최상위 부모 클래스이기 때문에 모든 객체는 공통 기능을 편리하게 제공 받는다.


**다형성의 기본 구현**

자바의 모든 오브젝트들은 `Object` 클래스를 상속 받으므로 모든 객체에 [[다형적 참조]]가 가능하다.
이처럼 다양한 타입의 객체를 통합적으로 처리할 수 있게 해준다.

![[java-mid-polymorphism-00.png]]

위 사진과 같은 경우 `Object` 클래스를 이용하면 다형적 참조는 가능하지만, 구조적으로 메서드 오버라이딩이 불가능하다. 왜냐하면 `Object` 클래스에는 `sound()`나 `move()` 메서드가 존재하지 않기 때문이다.

따라서 사용하고자 하는 메서드 내부에서 [[다운 캐스팅]]을 통하여 변환한 뒤에나 `Dog` 클래스의 `sound()`나 `Car` 클래스의 `move()` 메서드를 사용할 수 있게 된다.

> [!note]
> `Object` 클래스를 이용하면 [[다형적 참조]]는 가능하지만, [[메서드 오버라이딩]]이 불가능하므로 다형성에 한계가 있다.

## .toString()
`Object` 클래스에서 제공하는 메서드 중 하나이며 객체의 정보를 출력해준다. 클래스 정보와 참조값을 제공하지만 이 정보만으로는 객체의 상태를 적절히 나타내지 못한다. 그래서 보통 `toString()`을 재정의해서 보다 유용한 정보를 제공하는 것이 일반적이다.
```java
public class Dog {  
  private String dogName;  
  private int age;  
  
  public Dog(String dogName, int age) {  
    this.dogName = dogName;  
    this.age = age;  
  }  
  
  @Override  
  public String toString() {  
    return "Dog{" +  
        "dogName='" + dogName + '\'' +  
        ", age=" + age +  
        '}';  
  }  
}

// 출력
// Dog{dogName='멍멍이1', age=2}
// Dog{dogName='멍멍이2', age=5}

```

> [!tip]
> `System.out.println()` 메서드는 내부에서 `Object` 클래스의 `toString()` 메서드를 호출한다.

## 동일성과 동등성 equals()

---
Origin: 

References: 김영한의 실전 자바 - 중급 1편

Links: 

Created 2024-09-17 20:09