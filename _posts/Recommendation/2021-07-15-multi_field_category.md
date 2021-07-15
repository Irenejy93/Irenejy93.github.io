---
title: Deep Learning over Multi-field Cateogorical Data
tags:
- Paper
toc: true
toc_sticky: true
toc_label: contents
categories:
- Recommendation
---

## Deep Learning over Multi-field Cateogorical Data

## 1. CTR 모델 

1. 모델 비교 
    * 기존 CTR 예측 선형 모델 : : Logistic linear regression, naïve Bayes, FTRL logistic regression
        * 장점 : 쉬운 활용법
        * 단점 : 낮은 효율성, 독립적인 입력데이터의 상관관계를 찾지 못함

    * 기존 CTR 예측 비선형 모델 : Factorization Machine, Gradient Boosting Tree
        * 장점 : 다른 특성들의 상관관계를 찾을수있음
        * 단점 : 
            * 모든 특성의 상관관계를 찾지는 못함
            * 각 모델에 특성화된 input 을 제공 해야함
            * 복잡하고 무거운 데이터를 표현하는데 제한된 모델


## 2. Deep Learning 

* Deep Learning :
    * 고차원의 feature 를 저 차원의 feature 로 변형
    * Sparse data  dense data
    * 데이터간의 연관성 탐색 (local dependency)

1. 비지도 학습 ( Unsupervised Learning )
    * 고차원의 희소한 데이터를 저 차원의 밀집한 데이터로 학습시키는 Embedding method 
    * 숨겨진 데이터 패턴 탐색
    * DNN : Factorization Machine
    * SNN : SNN-RBM, SNN-DAE

2. 지도학습 ( Supervised Learning )
    * 역전파 (Backpropagation) 지도 학습을 통한 fine-tuning

### 1. Unsupervised Learning
Factorization- machine supported Neural Network ( RNN ) 
![Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/snn.png){: .align-center}


구성 : 
* 입력층은 Factorization machine층을 지나 희소한 데이터가 dense 한 데이터로 학습
* Tanh 활성화 함수를 이용한 은닉층 
    * 큰 데이터에서 가장 빠르게 수렴됨(converges faster) 

* Sigmoid 활성화 함수를 이용한 출력층
* 각각의 입력 데이터가 은닉층의 specific 한 필드와 연결

#### Contrasting Unsupervised Learning

![Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/ctrrate.png){: .align-center}

* AUC (area under ROC curve) 결과, Logistic regression 과 Factorial Machine 에 비해 FNN 과 SNN-DAE 와 SNN-RBM 이 더 나은 결과를 가짐
* FNN 제일 좋은 테스트 결과를 가짐
* SNN-DAE 와 SNN-RBM은 비슷한 결과를 가짐

#### 2. Supervised Learning
* 가중치 업데이트
* Back-propagation 을 이용한 비용함수 최적화 
* Drop-out 정규화로 overfit 관리
