---
title: Product-based Neural Network
tags:
- Paper
toc: true
toc_sticky: true
toc_label: contents
categories:
- Recommendation
---

## Product-based Neural Network

### 01 . Multi-field Dataset


* 클릭률 모델 입력 데이터 : multiple field categorical data 
    * e.g. [weekday = Tuesday , Gender = Male, city=London]


* One-hot encoding  고차원의 희소 데이터
    * e.g. [0, 1, 0, 0, 0] [0, 1]


* 기존 모델: logistic regression, 비선형 gradient boosting trees , Factorization machine 
    * 고차원의 희소한 데이터에서 특성의 패턴을 추려내기가 어려움





### 02. 기존 CTR 모델 

* factorization machine supported neural network (FNN):
    * Deep learning Neural Network with factorization machine pre-training 


* Convolutional Click Prediction Model (CCPM):
    * Convolutional Neural Network 을 이용한 예측
    * Non-neighbor feature 과의 상관관계 분석 불가


* Product unit neural network (PUNN)
    *  특성사이의 의존도 학습 불가


### 03. Product-based Neural Network 
* Product-based Neural Network (PNN)
![Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/pdnn/struct1.png){: .align-center}
    * Pre- training 없이, 각 field 에서 embedding layer 로 특성연결 
    
    * 각 특성 간의 연관관계를 inner product 또는 outer product-based neural network 를 product Layer 로 pair-wise 연결

    * 고차원의 특성들을 hidden layer 에 전부 연결,패턴 추출
        * Relu 활성화 함수 

    * 지도 학습을 통해, 비용함수 최적화 및 CTR 예측 



### Inner Product-based Neural Network (IPNN)

Inner product –based neural network 
- 입력: Linear information signal 𝑙
- Pairwise feature interaction 𝑔(𝑓_𝑖, 𝑓_𝑗 )= <𝑓_𝑖, 𝑓_𝑗> 정의
- Linear 형태의 𝑙_z + 상관관계 𝑙_p 신경망 학습

Inner product
- 𝑙_z  : inner product 형태의 가중치와 선형정보 보존
- 𝑙_p  : Pairwise feature interaction 의 inner product ;  이차원의 square matrix 
    - 행렬 분해 (decomposition) 통한 시간 및 공간 복잡도 축소 

### Outer Product-based Neural Network (OPNN)

* 각 선형 vector 데이터 의 Pair 의 Outer product
* Matrix 형태의 출력
    * 시간, 공간 복잡도 증가
    * Element-wise superposition 를 통한 시간및 공간 복잡도 축소 
        Eelement-wise : 두벡터의 행렬이 같은 원소 끼리 계산

![Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/pdnn/struct2.png){: .align-center}

Superposition : 
1. T(cu)=cT(u)
2. T(u+v)=T(u)+T(v)


#### 기존 모델과 성능 비교

![Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/pdnn/struct3.png){: .align-center}

