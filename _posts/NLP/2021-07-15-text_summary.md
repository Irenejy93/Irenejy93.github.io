---
title: Text Summarization
categories:
- NLP
tags:
- Method
- code
toc: true
toc_sticky: true
toc_label: contents
---

### Bert vs. TextRank
# Text Summarization
### 01. Text Summarization

* Abstraction vs. Extraction : 
    * vAbstraction : 원본텍스트를 이해하여, 원본텍스트게 없던 단어, 문장으로 재구성한 요약 
        * 문서의 내용을 압축하여 새로운 문서 작성
        * 자연어 이해 및 생성 기술이 필수적
        * Labelled data필요
    * Extraction:
        * 문서에 존재하는 단어나 구, 문장을 그대로 추출
        * 보다 쉬운 접근 방법
        * 요약문의 응집도나 가독성이 다소 부족
        
        
* 예) 개미는(뚠뚠) 오늘도(뚠뚠) 열심히 일을 하네(뚠뚠) 개미는(뚠뚠) 언제나(뚠뚠) 열심히일을하네(뚠뚠) 개미는아무말도하지않지만(띵가띵가) 땀을뻘뻘흘리면서(띵가띵가) 매일매일을살기위해서열심히일하네(띵가띵가)  한치앞도(뚠뚠) 모르는(뚠뚠) 험한이세상개미도배짱이도알수없지만그렇지만오늘도행복하다네(뚠뚠) 개미는(뚠뚠) 오늘도(뚠뚠) 열심히 일을 하네(뚠뚠) 개미는(뚠뚠) 언제나(뚠뚠) 열심히일을하네(뚠뚠) 개미는아무말도하지않지만(띵가띵가) 땀을뻘뻘흘리면서(띵가띵가) 매일매일을살기위해서열심히일하네(띵가띵가) 한치앞도(뚠뚠) 모르는(뚠뚠) 험한이세상개미도배짱이도알수없지만그렇지만오늘도행복하다네(뚠뚠)

    * Abstraction : 이세상은 한치앞을 알수없이 험난하지만 그럼에도불구하고 개미는 열씸히 일을한다.  
    * Extraction : 개미는아무말도하지않지만(띵가띵가) 땀을뻘뻘흘리면서(띵가띵가) 매일매일을살기위해서열심히일하네(띵가띵가).


### TextRank vs. Bert_Extractive Summarization

* TextRank : Word Graph 나 Sentence Graph 를 구축한뒤  Graph ranking 알고리즘인 Page Rank를 이용하여 각각 키워드와 핵심 문장을 추출한다. 


* Bert Extractive Summarization : 2018년 NLP 경쟁 부문에서 대부분 우승한 Bert 를 가지고 문맥 흐름상 중요한 문장 추출 


### TextRank 
![Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/textrank.png){: .align-center}


- PageRank : 여러 페이지에서 많은 유입을 받는 페이지가 중요한 페이지라고 정의, 유입이 많은 페이지 순으로 Ranking 하는 graph ranking 알고리즘 
- 문장 속 단어들 중 빈번하게 나온 단어들을 개수로 순위를 정한다 
    - 문장 속에서 그, 을, 를, 과 같은 빈번한 불용어를 제거한다. 그 후 여러 문장에서 나온 같은 단어의 개수를 카운트한다
    - 가장 빈번하게 등장한 단어일수록, 해당 문서에서 중요한 키워드일 확률이 높다. 
    - 문장안에 Ranking 이 높은 단어가 여러 개 가지고 문서내의 비슷한 문장이 많다.
    
    
- Ranking 이 높은 단어가 여러 개 가지고 있을 수록 중요한 문서내의 중요한 문장일 확률이 높다


### Bert Extractive Summarization

- Bert Extractive Summarization 논문 참조 
- 뉴욕타임즈 데이터셋, 일별 이메일 데이터셋 요약부분 에서 State of art 달성함
- Bert : 입력층을 단어로 받아 단어 위치, 문장의 위치, 단어의 뜻등을 학습  
    - 따라서, 문맥중 중요한 문장을 추출하기위해서는 입력층을 문장단위로 변경해줘야함
    - Embedding :
        - 문장 A 문장 B 로 번갈아가면서 서로 문장이 다른문장이라는걸 인식하는 Embedding
        - 문장의 시작, 끝과 동일 문장등을 입력하는 Token Embedding 
        
![Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/bertextra.png){: .align-center}

### Fine-tuning with Summarization Layers
* Summarize Layers: embedding 된 Bert 출력층을 또다른 Layer로 학습시켜 문서단위에서 문장요약을 한다. 
    * 3가지 방식으로 각 문장을 비교분석 
        * 중요한정도의 예측값 Yi을 계산한다. 여러 예측값 Yi 를 비교, 손실함수를 계산하여, 각 예측값중 평균값에 가장 가까운 문장을 추출  
            1. Simple Classifier :단순한 선형 분류 레이어
                 * 각 출력값에 대한 sigmoid (0과1사이값) 예측값을 계산
                * 예측값에 대한 손실함수 계산 및 비교 

            2. Inter-sentence Transformer
                    $ℎ ̃^𝑙=𝐿𝑁(ℎ^{𝑙 −1}+𝑀𝐻𝐴𝑡𝑡(ℎ^{𝑙 −1}))$
                    
                * 다시한번 Transformer 학습층을 통해, 문서내의 문장간의 관계를 학습.
                * Multihead Attention 을 통해 문서내의 의미가 비슷한 문장이거나 연관성이 높을수록, 높은값을 가진다. 
                * Normalize 를 통해, 나온값을 정규화한다
            3. Recurrent Neural Network
                * Bert 출력에 대해 LSTM 을 학습, 각 Forgot gate, input gates, ouput gates 에 학습
	해당 결과를 sigmoid 를 취해 학습
