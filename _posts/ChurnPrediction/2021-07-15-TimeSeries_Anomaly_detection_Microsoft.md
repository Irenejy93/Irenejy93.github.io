---
title: Survival Ensembles
tags:
- Paper
toc: true
toc_sticky: true
toc_label: contents
categories:
- Anomaly_Detection
---




#### Anomaly Detection
# Time series Anomaly detection at Microsoft

### 01. Introduction 

1. Lack of label: 실용적일수있도록 레이블링을 따로하지않은 모델
2. Generalization : 다양한 데이터에 적용할수있는 일반적인 모델
3. Efficiency : 효율적인 모델 


구성
1. 데이터 입력
    - 데이터 입력의 빈번도 (granularity) & 사용자의 저장시스템으로부터 이상치 감지 시스템의 연결 (connect string) 
        e.g. granularity 를 1분이라고 설정하면 , 매분 마다 새로운 데이터 포인트가 생성된다. 타임시리즈 데이터 포인트는 influxDB 와 kafka 에 넣어진다. 
    - 해당 모듈은 매초마다 10,000 ~100,000 데이터 포인트가 생성된다.  
 

2. 실험 : 다음장 에서 설명 


3. 온라인 대입
    - 입력되는 데이터에 대해 긴급하게 이상치를 감지하기 위해, sliding window 가 필요하다. 따라서 Flink 를 사용하여 메모리안의 포인트들을 빠르게 최적화 시킨다. 




### 02 Method

#### A. Saliency Detection: Spectral Residual Approach
Survival Ensemble Models 

* 컴퓨터 비전에서 쓰이는 saliency Detection 방법으로, 컴퓨터 또는 사람이 사진을 인식할때, 중요하다고 인식하는 부분 H(innovation) 과 눈또는 뇌가 기존에 이미 인식했던 부분 H(Prior Knowledge) 로 이루어져있다. 


* Saliency detection 과 time series anomaly detection 는 유사한 부분이 있다.


* Spectral Residual <3 단계>
    1. Fast Fourier Transform ( TFF) : 퓨리에 전환 , 2차원의 이미지 또는 시간 데이터(time series)를 주파수 (frequency) 영역 으로 분해한것

        - 주어진  각 sliding window 구간의 시계열 데이터에대한 퓨리에 전환후 최근 위치로 부터 임의의 m=5 시간 스텝의 구간에 대한 estimate point 를 추가하여 low latency 를 제공한다. 



![Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/churn/img2.png){: .align-center}


2. Spectral Residual 계산 : 
    * SR 계산법 : 푸리에 변환을 통해 구해진 log spectrum curve 에대해 평균값을 뺄때 나오는 값이 Spectral residual curve 이다

3. 푸리에 역변환 :
    * 푸리에 역변환 을 통해 주파수 형태의 데이터를 시간데이터로 되돌린다. 
    
       &rarr; 이 결과를 saliency map 이라고 부른다



![Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/churn/img3.png){: .align-center}


#### B. SR- CNN

- 주어진 saliency map 에  기존의 값의 label 을 0 , 가상의 anomaly 값을 추가하여 1 로 정한다.
- 가상의 값은  𝑥=(𝑥 ̅+𝑚𝑒𝑎𝑛)(1+𝑣𝑎𝑟)∙𝑟+𝑥 으로 계산한다.
- CNN은 saliency detection에 주로 사용되는 지도학습 모델로 해당 논문에서 역시 주어진 label 을 구분하는 학습모델로 사용한다 
- CNN 네트워크는 두개의 1D-convolutional 네트워크 구성되어있다. 
     - sliding window 사이즈와 동일한 채널사이즈의 은닉층과  그 채널의 두배의 사이즈의 은닉층 으로 이루어진 2개의 층으로 구성되어있다.


