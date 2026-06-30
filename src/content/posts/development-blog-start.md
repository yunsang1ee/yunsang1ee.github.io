---
title: "개발 블로그를 시작하며: Graphics, Engine, AI for Graphics"
description: "대학 4학년 1학기가 끝나가는 시점에서, Graphics AI Engineer라는 방향과 이 블로그의 카테고리를 정리합니다."
pubDate: 2026-06-30
category: "dev-process-knowledge-system"
tags:
  - Blog
  - Graphics
  - Engine
  - AI for Graphics
series:
  slug: "blog-start"
  title: "Behind the Frame 시작"
  order: 1
type: "retrospective"
featured: true
pinned: true
relatedProjects:
  - "eisenvalor"
  - "ray-tracing-simulator"
---

## 고민

이 글을 작성하는 시점은 대학 4학년 1학기가 끝나가는 시점이다.

1, 2학년 때는 프로그래밍과 CS 기초를 중심으로 공부했고, 2학년 2학기에는 하드웨어 ray tracing 가속 없이 OpenGL Compute Shader를 사용해 GPU 기반 path tracing을 직접 구현했다.

3학년부터는 전통적인 graphics 기법만으로는 앞으로의 photorealistic 표현과 제작 효율 요구를 모두 감당하기 어렵다고 판단해, 인공지능 부전공을 시작했다. 그 과정에서 RAG MCP 서버 구현과 deep learning 관련 논문 작성을 경험하고 있다.

현재 졸업작품은 DX12와 DXR을 기반으로 한 real-time path tracing 구현을 중심으로 진행하고 있다.

이 시점에서 가장 많이 고민한 것은 "나는 어떤 개발자로 성장하고 싶은가"였다.

현재 정의하는 방향은 다음과 같다.

> Graphics AI Engineer  
> Real-Time & Photorealistic Graphics를 중심으로, AI for Graphics를 함께 다루는 개발자

여기서 말하는 AI는 범용적인 AI 서비스 개발보다는, graphics를 더 사실적으로 만들고 rendering pipeline을 확장하기 위한 도구에 가깝다.

즉, Neural Rendering, Inverse Rendering, Image Processing, Photorealistic AI처럼 graphics와 직접 맞닿아 있는 AI 기술에 관심을 두고 있다.

물론 직접 거대한 모델을 학습시키는 ML engineer가 되겠다는 의미는 아니다. 오히려 ML 연구와 모델이 만들어낸 결과를 이해하고, 이를 real-time graphics와 game engine 구조 안에 어떻게 통합할 수 있는지 고민하는 쪽에 가깝다.

이 지점이 앞으로의 graphics programmer에게 중요한 확장 방향 중 하나라고 생각한다.

## 그래서

이 블로그는 앞으로 다음 5개의 카테고리를 기준으로 작성하려 한다.

### 1. Graphics Programming

DirectX 12, DXR, Path Tracing, PBR, ReSTIR, GPU Debugging 등 real-time graphics programming과 관련된 내용을 정리한다.

단순한 개념 정리보다는 직접 구현하며 마주친 문제와 해결 과정을 중심으로 기록하려 한다. 정리해둔 내용이 많지는 않아서 이후 DirectX 12 Ultimate를 다루면서 많이 복습하지 못한 전통 pipeline에 대해 정리하고, Ultimate 기능에 대해 더 기록하겠다.

### 2. Engine / Framework Architecture

졸업작품을 진행하며 game client framework를 어떻게 구성했는지 정리할 예정이다.

뭔가 대단한 것은 아니고, 그저 내가 생각하기에 좋은 구조를 어떻게 구성하려 했는가를 다룰 것 같다. 이와 함께 Unity, Unreal, Bevy 같은 상용 engine의 구조나 architecture pattern도 함께 살펴볼 예정이다.

### 3. AI for Graphics

전통적인 real-time graphics만으로 photorealistic을 추구하는 시대에서, 이제는 AI를 활용해 graphics를 확장하는 흐름이 중요해지고 있다고 본다.

이 카테고리에서는 Neural Rendering, Inverse Rendering, Image Processing, Photorealistic AI, Digital Twin 등 graphics와 직접 연결되는 AI 기술을 중심으로 정리할 것이다.

### 4. Dev Process & Knowledge System

개발 과정에서 사용하는 workflow와 지식 관리 방식을 정리한다.

GitHub, PR, CI, 기술 문서화, debugging tool 사용법뿐 아니라, RAG 기반 지식 시스템도 이 범주에서 다룰 예정이다.

특히 graphics 논문, engine 설계 문서, 구현 기록을 어떻게 축적하고 다시 활용할 수 있는지에 관심이 있다.

### 5. Miscellaneous

아직 명확히 분류하기 어렵거나, 위 카테고리에 넣기 애매한 내용을 다룬다.

기술적인 짧은 기록, 짧은 생각, 실험적인 메모 등이 여기에 포함될 수 있다.
