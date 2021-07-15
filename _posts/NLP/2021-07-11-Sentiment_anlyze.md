---
title: Sentiment Analysis
categories:
- NLP
tags:
- Method
---

# Sentimental Analysis

## 1. Sentiment Analysis Methods
### 1. Rule-based
* 축약단어 풀기
* 특수 문자 제거 와 같은 특정 조건으로 가능한 방법
* Stemming, lemmatization
* Removing stopwords (.,!? Etc)
* Dictionary 비교 ( 100 of News about Apple ) 

![Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/sent_alz/graph1.png){: .align-center}

* TextBlob
        * Medium ~0.1
        * left tailed
* Afinn
        * Medium ~0
        * Right tailed
* SentiWordNet
        * 1 negative news
* Vader
        * Medium ~0
        * Right tailed 

<hr>

#### Results on positive news
![Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/sent_alz/comp1.png){: .align-center}

#### Results on negative news
![Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/sent_alz/comp2.png){: .align-center}

#### Affin dictionary Sentiment 
![Git repository 신규 생성 이미지]({{ site.url }}{{ site.baseurl }}/assets/images/sent_alz/dict.png){: .align-center}



## 2. Machine learning
* Tokenization
* SVM, linear regression, SVM etc
* Disadvantage: require Tagging


## 3. Deep Learning
* Embedding with given word dictionary e.g. Glove
* LSTM, RNN etc
* Heavy model compare to Rule based
