---
title: Survival Ensembles
tags:
- Paper
toc: true
toc_sticky: true
toc_label: contents
categories:
- ChurnPrediction
---



#### Churn Prediction
# Survival Ensembles


## 01. Introduction

목적 : 고래고객 (접속 확률이 높고, In-app purchase 구매력이 높은 고객 ) 의 F2P 게임의 이탈 예측
- F2P games : 
    - 비-계약: 계약이없으므로, 이탈이 계약의 끝과 상관없이 일어남
    - 이탈 : 10일 이상의 비접속
    - 기존의 이탈 예측법
         - binary classification 
            - 직관적이지만 언제 이탈하는지 정확한 때를 예측할수없음
            - 특성이 정적변수 이어야만 함
        - Regression
            - 모든 플레이어가 게임을 그만두었을때만 이 모델이 가장 적합하다



#### 발전된 모델 
- 이탈할때의 시간 예측 
- Censorted 데이터를 서로 비교하여, 이탈 예측의 차원을 포착
- Survival ensembles : 고객이 언제 이탈할지 예측
    - 고객 이탈에 영향을 주는 risk factor에 대한 정보 추출
    - y~f(time) 으로 시간에 따라 생존률 예측
        - 고객을 곧이탈, 최근미래 이탈, 먼미래 이탈 의 3개의 집단으로 분류 가능
        - 생존률이 영향있는 variable 추출 가능 


## 생존률 분석방법

#### A. Survival analysis
- 이탈(죽음) 까지의 시간을 예측하는 통계적 기술 
- 이벤트 ( 이탈/죽음 )이 발생하기 전까지의 시간에 관한 학문 
- Data are censored 

    1. Estimated through non-parametric Kaplan-Meier estimator  (비모수적 ) 
    
        - Kaplan –meier : 사건(사망이) 발생한 시점마다 구간생존율을 구하여 이들의 누적 생존률을 추정 
        
        - K players churn during the period of time T $(t_1 <t_2 < … < t_n)$ 
        
        - $𝑆(𝑡_𝑗 )=𝑆(𝑡_(𝑗−1) )( 1−𝑑_𝑗/𝑛_𝑗 )$ number of surviver nj before time tj
                    
    2. semi-parametric survival technique : cox proportional-hazard models 
        -  다변량 선형분석 또는 다변량 logistic 선형과 흡사하게 다양한 risk factor을 평가
        - Hazard rate 이란 ? : 주어진 시간에 생존할 확률 ( expected number of events / unit of time )
            - can exceed 1 
        
        * 단점 : Has several assumption 
            -  Covariate or predictors는 이탈 징후에 대해 연관성을 가지고 있어야한다
            - 가려진 문제를, 비슷한 정도를 비교하는 maximizing partial likelihood 를 이용하여 비교 
            - Variable 과 ouput 이 변하지 않는 고정된 관계를 가지고 있어야하며 model selection 에 영향이 있어야함 
            - involves important effort in the model selection 
            - Difficult to scale big data
            - Constant hazard ratio over time 

## 기존 생존률 예측 모델 

#### Survival Trees and Ensembles 
1. Decision Tree 
    - non-parametric (비모수적)
    - 같은 특성을 가진 집단끼리 grouping 
    - Impurities 를 최소화 한다
2. Survival trees ; 
     - Root node is then divided into 2 daughter nodes 
    - Maximize survival differences between 2 group of individual 
    - 단점 : 결정트리 1개는 안정적이지 않기 때문에, 변동이 있을경우 예측에 큰 차이가 생길 수 있다.
         - 해결 : emsemble 사용


<br />

## conditional inference survival ensembles 


#### B. Survival Trees and Ensembles 
- Random forest
    - Nelson-Aalan estimates
- conditional inference survival ensembles 
    - Uses weighted Kaplan Meier function (가중된 Kaplan meier function 사용 ) 
    - Introduce weight to the nodes ( 각각 노드 마다 가중치 사용 ) 

#### Dataset
* Player attention : 
    * Time spent per day in the game 하루에 게임에 사용하는 시간 
    * Lifetime : numer of days since registration until churn 이탈할때까지 총 가입기간
* Player loyalty : 
    * Number of days at least one playing session 한번이라도 접속한 날짜의 수
    * Loyalty index 접속한 날짜수 / 이탈할때까지 총 가입기간
    * Days from registration to first purchase 가입날짜부터 처음 결제한 날짜 사이의 기간
    * Days since last purchase 마지막 결제일
* Playing intensity 
    * Number of action 활동 횟수 
    * Session 접속 횟수
    * In-app purchase 결제 횟수
    * Action activity distance ( average number of action over life time) 평균 활동 횟수
* Player level 



#### Conditional inference survival ensemble

1. Kaplan – meier 을 이용하여 고래이용자들의 이탈률을 시각화 
    - 각 그룹 ( 고래, 비 지불 사용자, 지불 사용자 ) 의 생존률을 비교 가능
2. Conditional inference survival ensemble 
    - 1000 trees  to predict the exit time of whales 
    - Kaplan-meier survival curve represent the group of player included in the node lassifciation 
    - integrated brier score (IBS) 이용하여 각 특성의 중요성을 비교 및 feature selection 
        - 주어진 시간 t 에 예측 생존률과 실제 생존률을 오차 비교 
        - 낮은 점수의 IBS 는 더 나은 예측률을 가짐 (between 0 to 1,  0 is better ) 
        - Binary /categorical outcome 에 알맞음


![Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/churn/img1.png){: .align-center}
