---
title: 
tags:
  - css
  - tailwindcss
publish: true
date: 2024-12-05
---
## tailwindCSS 적용
테일윈드 CSS를 적용하기 위해서는 `Node.js`의 패키지 매니저인 `NPM`이 필요하다. 

자세한 설치 방법은 [테일윈드 공식 문서 - Tailwind CLI](https://tailwindcss.com/docs/installation)를 참고하자.

## 적용 과정
테일윈드는 HTML 파일이나 Javascript 컴포넌트 또는 다른 템플릿에서 클래스 이름을 스캔하여 해당 스타일을 생성한 다음 정적 CSS 파일에 작성 하는 방식을 사용한다.

```
클래스 이름 스캔 -> 정적 CSS 파일 생성 -> CSS 적용
```

따라서 중간에 정적 CSS 파일을 생성하는 과정이 필요하다. 테일윈드는 CLI를 통해 이 과정을 간편하게 설정할 수 있도록 기능을 제공한다.


### tailwindCSS 설치
먼저 스프링 부트는 정적 리소스를 `resources/static`에서 제공하므로 해당 폴더에서 tailwindCSS를 설치한다.

```bash
npm install -D tailwindcss
```

### tailwindCSS 초기화
설치 과정이 끝나면, 이제 tailwindCSS가 어떤 형식의 파일에서 

---
References: 

Links to this page: 