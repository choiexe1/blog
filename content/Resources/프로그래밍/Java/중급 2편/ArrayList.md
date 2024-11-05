---
title: 
tags:
  - java
  - programming
  - data-structure
  - array
  - collection-framework
publish: true
date: 2024-10-19
---
## 배열의 특징
배열과 같이 여러 데이터(자료)를 구조화해서 다루는 것을 자료 구조라 한다. 자바는 배열 뿐만 아니라, 컬렉션 프레임워크라는 이름으로 다양한 자료 구조를 제공한다.

- 배열에서 자료를 찾을 때 인덱스(index)를 사용하면 매우 빠르게 찾을 수 있다.
- 인덱스를 통한 입력, 변경, 조회의 경우 한번의 연산만으로 자료의 위치를 찾을 수 있다.

![[배열-01.png]]
배열의 인덱스는 생성하고자 하는 타입의 단일 메모리 크기만큼 메모리를 사용한다. 배열은 메모리 상에 순서대로 붙어서 존재한다.

예를 들어 `int`형의 배열을 5개를 만든 경우, 단일 `int` 타입은 4byte의 크기를 가진다.

그리고 `int[] arr`는 배열의 시작이 되는 메모리 주소를 가진다. `arr` 변수로부터 `4byte` 크기만큼 이동하면 인덱스로 자료를 빠르게 접근할 수 있게 된다.

정리하면 배열에서 인덱스를 사용하는 경우 데이터가 아무리 많아도 **한 번의 연산으로 필요한 자료를 찾을 수 있다.**

## 배열의 검색
배열에 들어있는 데이터를 찾는 것을 검색이라 한다.
배열에 들어있는 데이터를 검색할 때는 배열에 들어있는 데이터를 하나하나 비교해야 한다. 

이때는 이전과 같이 인덱스를 사용해서 한번에 찾을 수 없다. 대신에 배열 안에 있는 데이터를 하나하나 확인해야 한다. 따라서 평균적으로 볼 때 배열의 크기가 클 수록 오랜 시간이 걸린다.

## 배열의 데이터 추가
배열에 데이터를  추가할 때 위치에 따른 성능 변화가 존재한다. 이는 메모리에서 순서대로 붙어서 존재하는 배열의 특징 때문에 그렇다.

1. 배열의 첫번째 위치에 데이터 추가
	- 배열의 첫번쨰 위치를 찾는데는 인덱스를 사용하므로 `O(1)`이 걸린다.
	- 모든 데이터를 배열의 크기만큼 한 칸씩 이동해야 한다. 따라서 `O(n)`만큼의 연산이 걸린다.
	- `O(1 + n)`에서 상수를 제거하여 `O(n)`이 된다.
2. 배열의 중간 위치에 데이터 추가
	- 배열의 첫번째 위치를 찾는데는 `O(1)`이 걸린다.
	- 인덱스의 오른쪽에 있는 데이터를 모두 한 칸씩 이동해야 한다. 따라서 평균 연산은 `O(n/2)`이 된다.
	- `O(1 + n/2)`에서 상수를 제거하여 `O(n)`이 된다.
3. 배열의 마지막 위치에 데이터 추가
	- 이 경우 배열이 이동하지 않고 배열의 길이를 사용하면 배열의 마지막 인덱스에 접근할 수 있으므로 한번의 계산으로 위치를 찾을 수 있고, 기존 배열을 이동하지 않으므로 `O(1)`이 된다.

```java title="배열의 데이터 추가 예제"
public static void main(String[] args) {  
    int[] arr = new int[5];  
    arr[0] = 1;  
    arr[1] = 2;  
    System.out.println(Arrays.toString(arr));  
  
    // 배열의 첫번째 위치에 추가  
    // 기본 배열의 데이터를 한 칸씩 뒤로 밀고 배열의 첫번째 위치에 추가  
    int newValue = 3;  
    addFirst(arr, newValue);  
  
    System.out.println(Arrays.toString(arr));  
  
    // 배열의 인덱스 위치에 추가  
    // 기본 배열의 데이터를 한 칸씩 뒤로 밀고 배열의 인덱스 위치에 추가  
    int index = 4;  
    addIndex(arr, index, newValue);  
    System.out.println(Arrays.toString(arr));  
}  
  
private static void addIndex(int[] arr, int index, int newValue) {  
    for (int i = arr.length - 1; i > index; i--) {  
        arr[i] = arr[i - 1];  
    }  
  
    arr[index] = newValue;  
}  
  
private static void addFirst(int[] arr, int newValue) {  
    for (int i = arr.length - 1; i > 0; i--) {  
        arr[i] = arr[i - 1];  
    }  
  
    arr[0] = newValue;  
}
```

## 배열의 한계
배열은 가장 기본적인 자료구조이고, 특히 인덱스를 사용할 때 최고의 효율이 나온다. 하지만 이런 배열에는 단점이 있다.

배열을 생성하는 시점에 배열의 크기를 미리 정해야 한다는 것이다. 만약 누구나 참여할 수 있는 이벤트를 진행하고 이벤트가 끝나면 추첨을 통해서 당첨자를 정한다고 가정해보자. 

이 때 이벤트에 참여하는 사용자들을 배열에 보관한다고 가정하자. 참여자는 실시간으로 계속 추가되는데 이 때 넉넉하게 길이가 1000인 배열을 사용했는데 예상보다 참여자가 많아서 1000명을 넘게 된다면 더 많은 사용자가 이벤트에 참여하지 못하게 되는 문제가 발생한다. 

그렇다고 처음부터 크기가 너무 큰 배열을 확보하면 메모리가 많이 낭비된다.

배열처럼 처음부터 정적으로 길이가 정해져있는 것이 아니라, 동적으로 언제든지 길이를 늘리고 줄일 수 있는 자료구조가 있다면 편리 할 것이다.

## 배열 리스트 (ArrayList)

배열의 경우 다음과 같은 2가지 불편함이 있다.
- 배열의 길이를 동적으로 변경할 수 없다.
- 데이터를 추가하기 불편하다.
	- 데이터를 추가하는 경우 오른쪽으로 한 칸씩 데이터를 밀어야 한다.

배열의 이런 불편함을 해소하고 동적으로 데이털르 추가할 수 있는 자료구조를 **리스트(List)**라고 한다.

**리스트 자료 구조**

순서가 존재하고, 중복을 허용하는 자료 구조를 리스트라 한다. 일반적으로 배열과 리스트는 구분해서 이야기한다. 리스트는 배열보다 유연한 자료 구조로, 크기가 동적으로 변할 수 있다.

- 배열: 순서가 있고 중복을 허용하지만 크기가 정적으로 고정된다.
- 리스트: 순서가 있고 중복을 허용하지만 크기가 동적으로 변할 수 있다.

### MyArrayListV1 구현
배열을 활용해서 리스트 자료 구조를 직접 만든다.

보통 배열을 사용한 리스트라고 해서 `ArrayList`라고 부른다.

예제에선 구현을 완성하는 것 보다는 자료 구조 자체를 설명하는 것에 목적을 둔다고 한다.

```java title="MyArrayListV1.java"
package collection.array;  

import java.util.Arrays;  
  
public class MyArrayListV1 {  
    private static final int DEFAULT_CAPACITY = 5;  
  
    private Object[] elementData;  
    private int size = 0;  
  
    public MyArrayListV1() {  
        elementData = new Object[DEFAULT_CAPACITY];  
    }  
  
    public MyArrayListV1(int initialCapacity) {  
        elementData = new Object[initialCapacity];  
    }  
  
    public int size() {  
        return size;  
    }  
  
    public void add(Object o) {  
        elementData[size] = o;  
        size++;  
    }  
  
    public Object get(int index) {  
        return elementData[index];  
    }  
  
    public Object set(int index, Object element) {  
        Object oldValue = get(index);  
        elementData[index] = element;  
  
        return oldValue;  
    }  
  
    public int indexOf(Object o) {  
        for (int i = 0; i < size; i++) {  
            if (o.equals(elementData[i])) {  
                return i;  
            }  
        }  
        return -1;  
    }  
  
    public String toString() {  
        return Arrays.toString(Arrays.copyOf(elementData, size)) +  
                "," + " size= " + size + ", capacity = " + elementData.length;  
    }  
}
```

우리가 원하는 리스트는 동적으로 저장할 수 있는 크기가 커져야한다. 위의 구현으로는 아직 저장할 수 있는 데이터 크기가 `DEFAULT_CAPACITY`나 [[메서드 오버로딩]]한 생성자의 `initialCapacity` 변수에 의해 고정되어 있다.

### MyArrayListV2 구현

```java title="MyArrayListV2.java"
package collection.array;  
  
import java.util.Arrays;  
  
public class MyArrayListV2 {  
    private static final int DEFAULT_CAPACITY = 5;  
  
    private Object[] elementData;  
    private int size = 0;  
  
    public void add(Object o) {  
        if (size == elementData.length) {  
            grow();  
        }  
  
        elementData[size] = o;  
        size++;  
    }  
  
    private void grow() {  
        int oldCapacity = elementData.length;  
        int newCapacity = oldCapacity * 2;  
  
        elementData = Arrays.copyOf(elementData, newCapacity);  
    }  
}
```
`MyArrayListV1`과 다른 코드는 동일하므로 삭제하였다. 달라진 부분을 천천히 확인해보자.

- `add()` 사용 시 리스트의 크기가 `elementData.length`보다 큰 경우 `grow()` 메서드를 사용한다.
- `grow()` 메서드는 현재 배열 크기에 곱하기 2를 해서 크기를 늘리고 기존 배열의 내부 값을 복사한 뒤 새로운 배열로 기존 `elementData`의 참조값을 변경한다.
- 기존 `elementData`로 사용하던 배열은 더 이상 참조하는 곳이 없으므로 가비지 컬렉션의 대상이 된다.


> [!tip]
> 현재는 `grow()`를 호출 할 때 배열의 크기는 기존과 비교해서 2배씩 증가한다.
> 
> - 데이터가 하나 추가될 때마다 배열의 크기를 1씩 증가시키게 되면 배열을 복사하는 연산이 너무 자주 발생한다.
> - 배열을 새로 복사해서 만드는 연산은 배열을 새로 만들고 또 기존 데이터를 복사하는 시간이 걸리므로 가능한 줄이는 것이 좋다. 이렇게 2배씩 증가하면 배열을 새로 만들고 복사하는 연산을 줄일 수 있다. 반면에 배열의 크기를 너무 크게 증가시키면 메모리가 낭비된다.
> - 일반적으로는 배열의 크기를 50% 증가하는 방법을 사용한다.


---
References: 김영한의 실전 자바 - 중급 2편

Links to this page: 