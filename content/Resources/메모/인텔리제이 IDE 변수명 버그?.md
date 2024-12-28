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

추상화된 `IRepository`를 통해서 중복된 코드를 획기적으로 줄이긴 했는데, 다음이 무

---
References: 

Links to this page: 