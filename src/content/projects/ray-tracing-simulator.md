---
title: "rayTracingSimulator"
description: "OpenGL Compute Shader 기반 GPU path tracing 프로젝트. 하드웨어 ray tracing 가속 없이 renderer를 구현하고 과제전 그래픽스 부문 2등 버전까지 확장했습니다."
period: "2024.12"
teamSize: "2인"
role: "메인 개발, 새 기능 구현, 개발 방향 설정"
stack:
  - "MSVC C++20"
  - "OpenGL"
  - "Compute Shader"
  - "RenderDoc"
  - "Git"
tags:
  - "Path Tracing"
  - "OpenGL"
  - "GPU"
status: "public"
featured: true
links:
  - label: "GitHub"
    href: "https://github.com/yunsang1ee/RayTracingSimulator"
  - label: "Initial Video"
    href: "https://youtu.be/F_K9F4CjiTk?si=8siG04irpeqGojrA"
  - label: "Award Version"
    href: "https://youtu.be/QSqdcx96y-U?si=eB-hkMNqckMWaq3c"
highlights:
  - "OpenGL Compute Shader를 사용한 GPU 기반 path tracing 구현"
  - "RenderDoc 기반 graphics debugging 경험"
  - "과제전 그래픽스 부문 2등 추가 구현 버전"
---

2학년 2학기 computer graphics 프로젝트로 진행한 renderer입니다. 하드웨어 ray tracing 가속 없이 OpenGL Compute Shader를 사용해 GPU 기반 path tracing을 구현했습니다.

이 프로젝트는 graphics에 대한 흥미가 단순한 API 사용에서 rendering equation, sampling, GPU execution model 쪽으로 넘어가는 계기가 되었습니다. 이후 DirectX 12와 DXR 기반 real-time path tracing을 공부하는 출발점이기도 합니다.

블로그에서는 공개 가능한 범위에서 구현 구조, debugging 과정, 과제전 추가 구현 버전에서 무엇을 바꿨는지 정리할 예정입니다.
