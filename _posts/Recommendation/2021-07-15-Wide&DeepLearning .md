---
title: Wide & Deep Learning for Recommendation System
tags:
- Paper
toc: true
toc_sticky: true
toc_label: contents
categories:
- Recommendation
---

### 추천 시스템

기존 추천 시스템 구성 :
1. Memorization Model
    - 각 특성의 곱(cross-product transformation)을 통해, 데이터상에서 공출현한 특성과 특성 사이의 직접적인 상관관계 추출
    - E.g. : Logistic regression Model 
    - 단점 :
        - 기존 공출현하지 않은 새로운 특성과의 상관관계 추출 불가

2. Generalized Model
    - 고차원의 희소 데이터를 저차원의 데이터로 학습 (Embedding)
    - 기존에 없었던 새로운 특성의 상관관계를 찾아냄
    - E.g. Factorization Machine, Deep Neural Network
    - 단점 
        - over-generalize 로 인해 관련없는 아이템들을 추천할수 있음 
        - 학습을 위해 특성을 만들어내는 feature engineering 필요
 


### Wide & Deep Learning 

* Wide component
    * Generalized linear model 𝑦=𝑤^𝑇 𝑥+𝑏
        e.g. AND(gender=female, language =en) 
    * 특성 상관관계 추출, 및 선형모델에 비선형 추가


* Deep component
    1. Embedding vector 통해 고차원의 sparse 한 범주형 특성을 저차원의 dense 한 데이터로 변화
    2. 비용 함수 축소를 위해 학습 
    3. 은닉층에 입력
        - ReLU 활성화 함수 


### Joint Training of Wide & Deep Model 

Joint Training : Wide component 와  Deep component 의 출력을 weighted sum 을 이용하여 병합

1. Weighted sum : Wide component 중 부분만 추출하여 Deep model의 단점을 보완

2. Back-propagating using Stochastic Gradient Descendent
    - Stochastic 경사 하강법을 이용한 역전파 함수 로 병합된 모델 훈련 

3. ReLU 활성화 함수를 이용한 3개의 은닉층 학습

4. Logtistic 활성화 함수이용한 출력층 생성



### Conclusion 

![Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/widedeep/img1.png){: .align-center}


