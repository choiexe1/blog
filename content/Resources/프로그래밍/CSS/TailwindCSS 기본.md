---
title: 
tags:
  - css
  - tailwindcss
publish: true
date: 2024-12-05
---
## @Layer 디렉티브

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

```css
@layer components {    
    .btn {  
       @apply py-1 px-2 border border-gray-400 rounded-md hover:bg-gray-500 hover:text-white transition-all duration-200
    }  
}
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


## @apply 디렉티브
이 `@apply`는 테일윈드에서 가장 중요한 역할을 하는데, 테일윈드에 적용된 유틸리티 클래스를 다른 클래스에도 적용해주는 기능을 한다. 

쉽게 말해 `utilities` 레이어에 적용된 유틸리티 클래스를 컴포넌트 레이어에서 사용하게 해주는 것이다.

이 디렉티브 덕분에 유틸리티 클래스를 컴포넌트에 손쉽게 적용할 수 있다.

```css
@layer components {    
    .btn {  
       @apply py-1 px-2 border border-gray-400 rounded-md hover:bg-gray-500 hover:text-white transition-all duration-200
    }  
}
```

## 반응형
테일윈드 CSS는 `variant`를 통해 컴포넌트 클래스나 유틸리티 클래스에 반응형 디자인을 적용 할 수 있다.

다음의 컴포넌트 클래스인 `.btn`은 스크린 사이즈에 따라 배경 색이 변경되도록 `variant`가 적용되어 있다.

```css
.btn {  
    @apply py-1 px-2 border border-gray-400 rounded-md hover:bg-gray-500 hover:text-white transition-all duration-200;  
    @apply sm:bg-red-500 md:bg-blue-500;   /* variant */
}
```



---
References: [테일윈드 공식 문서 - Functions & Directive](https://tailwindcss.com/docs/functions-and-directives)

Links to this page: 