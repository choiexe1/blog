---
title: 
tags:
  - css
  - tailwindcss
  - tailwindcss-layer
publish: true
date: 2024-12-05
---
## @Layer

테일윈드 CSS에서 `@Layer`는 스타일을 구성할 때 사용하는 키워드이다. 레이어는 기본적으로 다음과 같이 세 가지로 나누어진다.

- `base`
- `components`
- `utilities`

### base
베이스 레이어는 기본 스타일을 정의하는 레이어이며, 이 레이어는 HTML 요소에 대한 기본 스타일을 설정한다. 일반적으로 웹 어플리케이션 같은 경우 리셋 CSS을 많이 사용하는데 이 경우에 사용된다.

예를 들어 웹 브라우저에 지정된 기본 스타일을 오버라이드 하거나, 폰트, 전역 마진/패딩 등의 스타일 설정을 이 레이어에서 한다.

### components
컴포넌트 레이어는 재사용 가능한 컴포넌트나 기능적 요소들을 정의하는 곳이다. 예를 들자면 버튼, 카드, 네비게이션 바와 같은 UI 컴포넌트 스타일을 설정한다.

 쉽게 말해 여러 곳에서 재사용 될 수 있는 UI 컴포넌트를 정의할 때 사용한다. 다음은 예시로 스프링 부트 기능 연습 사이트에서 구현한 버튼 클래스이다.

```

### utilities
유틸리티 레이어는 유틸리티 클래스를 정의하는 곳이다. 이 레이어는 테일윈드의 가장 중요한 부분으로 작은 스타일 조각을 정의하여 HTML에서 클래스 형태로 적용할 수 있게 한다.

```css
@layer utilities {
	.text-red { 
		color: red; 
	}
	 
	.bg-blue {
		 background-color: blue; 
	 }
	 
	 .m-4 {
		  margin: 1rem; 
	  } 
}
```


---
References: 

Links to this page: 