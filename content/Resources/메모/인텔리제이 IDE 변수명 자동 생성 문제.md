---
title: 
tags:
  - java
  - intellij
publish: true
date: 2024-12-29
---
새벽에 코딩하다가 문득 이상한 점을 발견했다. 

리포지토리 레이어에 중복된 코드가 너무 많아서, 해당하는 공통 영역 부분을 다음과 같이 추상화해서 제공하기로 결정했다.

```java
public interface IRepository<T, ID, SearchDTO, UpdateDTO> {  
    ID save(T t);  
  
    Optional<T> findById(ID id);  
  
    List<T> findAll();  
  
    List<T> findAll(SearchDTO searchDTO);  
  
    int findAllCount(SearchDTO searchDTO);  
  
    void update(ID id, UpdateDTO updateDTO);  
  
    void delete(ID id);  
}
```

```java
public interface ItemRepository extends IRepository<Item, Long, SearchItemDTO, UpdateItemDTO> {  
    List<Item> findItemsByWarehouseId(Long warehouseId);  
}
```

추상화된 `IRepository`를 통해서 중복된 코드를 획기적으로 줄이긴 했는데, 다음이 문제였다.

```java
@Mapper  
public interface ItemMapper extends ItemRepository {  
    @Override  
    List<Item> findItemsByWarehouseId(Long warehouseId);  
  
    @Override  
    Long save(Item item);  
  
    @Override  
    Optional<Item> findById(Long aLong);  
  
    @Override  
    List<Item> findAll();  
  
    @Override  
    List<Item> findAll(SearchItemDTO searchItemDTO);  
  
    @Override  
    int findAllCount(SearchItemDTO searchItemDTO);  
  
    @Override  
    void update(Long aLong, UpdateItemDTO updateItemDTO);  
  
    @Override  
    void delete(Long aLong);  
}
```

현재 프로젝트에서는 `MyBatis`를 사용해보는 중이라 이 매퍼가 필요하다. 매퍼는 XML로 작성된 SQL과 소스코드를 매핑하면서 실제 매퍼 객체를 만드는 데에 사용된다. 이상한 부분은 매개변수의 `Long aLong`이다. 왜냐하면 `IRepository`에서 정의하기로는 분명 `ID` 타입의 `id`라고 정의해뒀는데 구현 시에 `Long aLong` 이렇게 바뀌는 것이다.

이게 왜 짜증나냐면, 저 자잘한 파라미터가 지 멋대로 변경되서 코드가 정상적으로 작동하지 않는다는거다. 물론 하나 하나 찾아서 바꿔주면 된다. 


- 그래서 `IRepository`의 파라미터를 `id`가 아니라 다른것으로 변경하니까 잘 작동한다.
- `IRepository`의 제네릭 타입 `ID`를 `IDType`으로 다음과 같이 바꿨더니 IDE가 생성하는 파라미터 이름이 정상적이다.

```java
  
public interface IRepository<T, IDType, SearchDTO, UpdateDTO> {  
    IDType save(T t);  
  
    Optional<T> findById(IDType id);  
  
    List<T> findAll();  
  
    List<T> findAll(SearchDTO searchDTO);  
  
    int findAllCount(SearchDTO searchDTO);  
  
    void update(IDType id, UpdateDTO updateDTO);  
  
    void delete(IDType id);  
}
```

그런데 이게 버그인지 인텔리제이의 의도대로 작동한 것인지..

내 생각엔 버그같다.

---
References: 

Links to this page: 