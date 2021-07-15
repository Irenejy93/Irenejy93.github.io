---
title: Factorization Machine 
tags:
- Paper
toc: true
toc_sticky: true
toc_label: contents
categories:
- Recommendation
---


## Factorization Machine 

### 01. Factorization Matrix 
#### 01 ) sparse Data
* 대부분의 x 의 element xi 가 0 인 희소한 (sparse) 한 데이터
     - 추천 시스템, 텍스트 분석
     - 범주형 변수
* 사용자 = {영희(A), 바둑이(B), 철수(C) … } , 영화아이템 = {타이타닉(TI), 노팅힐(NH), 스타워즈(SW), 스타트렉(ST)}
[Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/factorizemachine/factor1.png){: .align-center}




#### 02 ) Factorization Matrix

[Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/factorizemachine/factor2.png){: .align-center}

* factorization matrix 는 위의 데이터 처럼  희소하지만 User - Item matrix 를 행렬분해를 통해 User matrix, Item matrix 로 분해하여 각 사용자의 잠재요인(latent factor)를 찾아낸다. 


## Factorization Machine : SVM + FMs

* SVM 과 다른 factorization model의 장점을 접목시킨 새로운 모델
* factorized parameter 를 이용하여, 여러 상호작용을 모델링
* 희소한 (sparse) 한 데이터에서도 상호작용 예측가능
* '선형 시간' 계산복잡도
    - 입력한 길이 n 에 대하여 선형 알고리즘 실행시간이 O(n)
    - 최적화 및 훈련 데이터에 저장할 필요없이 모델 저장
* 입력에 따라, 다양한 factorzation model 과 비슷한 형태의 모델을 준의


* 𝑦 ̂"(x) := + " 𝑤_0 " +" ∑_(𝑖=1)^𝑛▒〖𝑤_𝑖 𝑥_𝑖 〗+∑_(𝑖=1)^𝑛▒〖∑_(𝑗=𝑖+1)^𝑛▒〖<𝑣_𝑖,𝑣_𝑗>〗 𝑥_𝑖 𝑥_𝑗 〗



* 편향 + 각 변수 가중치 + 상관관계




* Matrix Factorization 을 통해 , 하나의 상관관계를 이용하여 다른 상관관계를 예측한다. 
    - 영희는 스타트랙을 좋아한다 
    - 철수와 바둑이는 스타워즈를 좋아한다. 
    - 바둑이는 스타트랙도 좋다한다, 영희와 바둑이가 비슷한정도로 스타트랙을 좋아한다
    - 영희는 바둑이가 스타워즈를 좋아하는만큼 좋아할것이다. 
    
* 각 interaction matrix 를 인수분해함을 통해, 데이터가 희소하더라도 𝑦 ̂고차함수의 상관관계 역시  interaction matrix를 표현할수있다


-------------------------------------

## FM vs. SVM 

### SVM ( Support Vector Machine )

* SVM : 데이터를 분류하는 hyperplane 을 찾는 알고리즘
* 다중차원의 희소한 데이터에서 적합한 hyperplane 을 찾을수없다
* 훈련데이터에 의존하여 예측 
[Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/factorizemachine/factor3.png){: .align-center}


### FM vs. SVMs


1. SVM
    - dense 한 훈련데이터
    - dual form = SVM은 저차원에서 고차원으로 mapping 후 내적 (inner product) 
    - 독립적인 상관관계
    - Linear SVM : 해당 USER, ITEM 의 편향
    - Polynomial SVM : 해당 User, Item 의 상관관계 


2. Factorization Machine
    - Overlapping 하는 의존적인 상관관계
    - Sparse 한 데이터
    - Primal form


---------------------

## FM vs. FMs
[Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/factorizemachine/factor4.png){: .align-center}

## Factorization Machine = SVM + FM

[Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/factorizemachine/factor5.png){: .align-center}
A.Matrix Factorization model 
- 추천시스템의 협업시스템Collaborative filtering algorithm
- User-item 의 matrix 에서 하위 matrix 로 행렬 인수분해 하여 비평가 된 항목을 채움 
- Matrix Factorization 은 범주형 이진 입력 데이터가 필요함


## FM  vs. SVD++

B) SVD++


- 명백한 피드백 : 사용자와 영화에 준 평점에 대해 높은평점을 받은 영화와 낮은 평점을 받은 영화를 부여한다 이를 명백한 피드백이라고 함
- 암묵적인 피드백 : 사용자가 점수를 준 영화와 점수를 주지 않은 영화에도 의미를 부여한다. 
- 아직 선택하지 않은 영화에 대하여 점수를 예측
- FM can mimic this model by using   [Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/factorizemachine/factor6.png){: .align-center}
    -|Nu| 는 한번이라도 평점을 준 모든영화


### FM  vs. PITF for tag Recommendation

C) PITF

- User 와 item 짝의 ranking tag 예측
- FM 의 이진변수 모델에 ranking 변수 tA 를 tB 추가
- (u,I,tA) 와 (u,I,tB)의 차이점을 예측한 모델이 PITF 모델과 흡사하다. 


### FM  vs. FPMC (Factorized Personalized Markov Chains )
D)FPMC
- 사용자의 지난 구매 이력으로 현재 구매순위를 예측
- FM can mimic this model by using 
[Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/factorizemachine/factor7.png){: .align-center}
- |𝐵_(𝑡−1)^𝑢| 는 지난번에 장바구니에 넣어졌던 아이템

