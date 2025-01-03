---
title: 
tags:
  - java
  - proxy
  - programming
  - spring
  - aop
publish: true
date: 2025-01-03 19:44
comments: fal
---
## 배경
- 스프링 어플리케이션에 프록시를 적용하려면 `Advisor`를 만들어서 스프링 빈으로 등록하면 된다.
- 앞서 배운 자동 프록시 생성기가 `Advisor`를 찾아서 모두 자동으로 처리해주기 때문이다.
- `Advisor`를 직접 구현하는 것도 편리하긴 하지만, `Advice`와 `Pointcut`을 각각 따로 구현해야 한다.
- 스프링은 `@Aspect` 어노테이션으로 매우 편리하게 `Pointcut`과 `Advice`로 구성 되어 있는 `Advisor` 생성 기능을 지원한다.

> `@Aspect`는 관점 지향 프로그래밍(AOP)을 가능하게 하는 `AspectJ` 프로젝트에서 제공하는 어노테이션이다. 스프링은 이것을 차용해서 프록시를 통한 AOP를 가능하게 한다.







---

References: 김영한의 스프링 핵심 원리 - 고급편

Links to this page:
