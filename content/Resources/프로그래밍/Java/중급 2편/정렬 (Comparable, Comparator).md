---
title: 
tags:
  - java
  - programming
  - algorithm
  - data-structure
  - collection-framework
  - comparable
  - comparator
publish: true
date: 2024-11-11
---
## 정렬 1 - Comparable, Comparator

먼저 예제를 통해서 배열에 들어있는 데이터를 정렬한다.

```java
public static void main(String[] args) {  
    Integer[] array = {3, 2, 1};  
    System.out.println("array = " + Arrays.toString(array));  
  
    System.out.println("기본 정렬 후");  
    Arrays.sort(array);  
    System.out.println("array = " + Arrays.toString(array));  
}
```

```title="실행 결과"
array = [3, 2, 1]
기본 정렬 후
array = [1, 2, 3]
```

`Arrays.sort()`를 사용하면 배열에 들어있는 데이터를 순서대로 정렬할 수 있다. 하지만 정렬을 하려면 어떤 순서로 정렬할 것인지에 대한 기준이 있어야한다.

### 정렬 알고리즘
정렬은 대략 다음과 같은 방식으로 이루어진다.


---
References: 김영한의 실전 자바 - 중급 2편

Links to this page: 