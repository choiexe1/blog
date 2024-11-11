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

![[sort-1.png]]
- 먼저 가장 왼쪽의 데이터와 그 다음 데이터를 비교한다.
- 3과 2를 비교했을 때, 3이 더 크기 때문에 둘을 교환한다.

![[sort-2.png]]
- 다음 차례의 둘을 비교한다.
- 3과 1을 비교했을 때 3이 더 크기 때문에 둘을 교환한다.
- 이렇게 처음부터 끝까지 비교하면 마지막 항목은 가장 큰 값이 된다. 여기서는 3이다.

![[sort-3.png]]
- 처음으로 돌아와서 다시 비교를 시작한다.
- 2와 1을 비교했을 때 2가 더 크기 때문에 둘을 교환한다.
- 최종적으로 1, 2, 3으로 정렬된다.

위 예시의 정렬 알고리즘은 가장 단순한 정렬이다. 실제로는 정렬 성능을 높이기 위한 다양한 알고리즘이 존재한다.

자바는 초기에는 퀵 소트(QuickSort)를 사용했다가 지금은 데이터가 작을 때(32개 이하)는 듀얼 피벗 퀵 소트(Dual-Pivot QuickSort)를 사용하고 데이터가 많을 때는 팀소트(TimSort)를 사용한다.

이런 알고리즘은 평균 `O(n log n)`의 성능을 제공한다.

## 비교자 Comparator
그런데 정렬을 할 때 1, 2, 3의 순서가 아니라 3, 2, 1로 정렬하고 싶다면 어떻게 해야할까?

이때는 비교자를 사용하면 된다. 이름 그대로 두 값을 비교할 때 비교 기준을 직접 제공할 수 있다.

```java
public interface Comparator<T> {
	int compare(T o1, T o2);
}
```
- 두 인수를 비교해서 결과 값을 반환하면 된다.
	- 첫 번째 인수가 더 작으면 음수, 예(`-1`)
	- 두 값이 같으면 `0`
	- 첫 번째 인수가 더 크면 양수, 예(`1`)



---
References: 김영한의 실전 자바 - 중급 2편

Links to this page: 