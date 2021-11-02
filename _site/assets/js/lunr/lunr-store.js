var store = [{
        "title": "Bert paper Review",
        "excerpt":"01 what is Bert? BERT ( Bi-directional Encoder Representation from Transformers) 기존 자연어 처리 신경망 RNN ( 순환 신경망 ) : 각 새로운 입력층마다 hidden layer 를 저장/수정 하여 새로운 정보를 점차 업데이트 해나아가는 신경망 LSTM : RNN의 응용모델로 각 신경망에 hidden state 와 cell state 를 더해주어 오랜시간 이전...","categories": ["NLP"],
        "tags": ["Paper"],
        "url": "http://localhost:4000/nlp/Bert-paper-Review/",
        "teaser": null
      },{
        "title": "Sentiment Analysis",
        "excerpt":"Sentimental Analysis 1. Sentiment Analysis Methods 1. Rule-based 축약단어 풀기 특수 문자 제거 와 같은 특정 조건으로 가능한 방법 Stemming, lemmatization Removing stopwords (.,!? Etc) Dictionary 비교 ( 100 of News about Apple ) TextBlob * Medium ~0.1 * left tailed Afinn * Medium ~0 * Right tailed SentiWordNet *...","categories": ["NLP"],
        "tags": ["Method"],
        "url": "http://localhost:4000/nlp/Sentiment_anlyze/",
        "teaser": null
      },{
        "title": "Survival Ensembles",
        "excerpt":"Churn Prediction Survival Ensembles 01. Introduction 목적 : 고래고객 (접속 확률이 높고, In-app purchase 구매력이 높은 고객 ) 의 F2P 게임의 이탈 예측 F2P games : 비-계약: 계약이없으므로, 이탈이 계약의 끝과 상관없이 일어남 이탈 : 10일 이상의 비접속 기존의 이탈 예측법 binary classification 직관적이지만 언제 이탈하는지 정확한 때를 예측할수없음 특성이...","categories": ["ChurnPrediction"],
        "tags": ["Paper"],
        "url": "http://localhost:4000/churnprediction/Survival_Ensembels/",
        "teaser": null
      },{
        "title": "Survival Ensembles",
        "excerpt":"Anomaly Detection Time series Anomaly detection at Microsoft 01. Introduction Lack of label: 실용적일수있도록 레이블링을 따로하지않은 모델 Generalization : 다양한 데이터에 적용할수있는 일반적인 모델 Efficiency : 효율적인 모델 구성 데이터 입력 데이터 입력의 빈번도 (granularity) &amp; 사용자의 저장시스템으로부터 이상치 감지 시스템의 연결 (connect string) e.g. granularity 를 1분이라고 설정하면 ,...","categories": ["Anomaly_Detection"],
        "tags": ["Paper"],
        "url": "http://localhost:4000/anomaly_detection/TimeSeries_Anomaly_detection_Microsoft/",
        "teaser": null
      },{
        "title": "Text Summarization",
        "excerpt":"Bert vs. TextRank Text Summarization 01. Text Summarization Abstraction vs. Extraction : vAbstraction : 원본텍스트를 이해하여, 원본텍스트게 없던 단어, 문장으로 재구성한 요약 문서의 내용을 압축하여 새로운 문서 작성 자연어 이해 및 생성 기술이 필수적 Labelled data필요 Extraction: 문서에 존재하는 단어나 구, 문장을 그대로 추출 보다 쉬운 접근 방법 요약문의 응집도나...","categories": ["NLP"],
        "tags": ["Method","code"],
        "url": "http://localhost:4000/nlp/text_summary/",
        "teaser": null
      },{
        "title": "DeepFM",
        "excerpt":"DeepFM A Factorization-Machine based Neural Network 01. what is CTR ? CTR : click Through rate CTR 이란 ? 사용자의 클릭 안에 숨겨져 있는 사용자의 특성 또는 어플의 특성 사이의 상관관계 학습 예) 식사 시간 에 음식 배달 어플의 다운로드 수 증가 ( 2 차 상관관계) 10대 남자는 총 게임...","categories": ["Recommendation"],
        "tags": ["Paper"],
        "url": "http://localhost:4000/recommendation/Deepfm/",
        "teaser": null
      },{
        "title": "Factorization Machine",
        "excerpt":"Factorization Machine 01. Factorization Matrix 01 ) sparse Data 대부분의 x 의 element xi 가 0 인 희소한 (sparse) 한 데이터 추천 시스템, 텍스트 분석 범주형 변수 사용자 = {영희(A), 바둑이(B), 철수(C) … } , 영화아이템 = {타이타닉(TI), 노팅힐(NH), 스타워즈(SW), 스타트렉(ST)} Git repository 신규 생성 이미지 02 ) Factorization Matrix...","categories": ["Recommendation"],
        "tags": ["Paper"],
        "url": "http://localhost:4000/recommendation/Factorization_Machine/",
        "teaser": null
      },{
        "title": "Product-based Neural Network",
        "excerpt":"Product-based Neural Network 01 . Multi-field Dataset 클릭률 모델 입력 데이터 : multiple field categorical data e.g. [weekday = Tuesday , Gender = Male, city=London] One-hot encoding  고차원의 희소 데이터 e.g. [0, 1, 0, 0, 0] [0, 1] 기존 모델: logistic regression, 비선형 gradient boosting trees , Factorization machine...","categories": ["Recommendation"],
        "tags": ["Paper"],
        "url": "http://localhost:4000/recommendation/Product-based/",
        "teaser": null
      },{
        "title": "Wide & Deep Learning for Recommendation System",
        "excerpt":"추천 시스템 기존 추천 시스템 구성 : Memorization Model 각 특성의 곱(cross-product transformation)을 통해, 데이터상에서 공출현한 특성과 특성 사이의 직접적인 상관관계 추출 E.g. : Logistic regression Model 단점 : 기존 공출현하지 않은 새로운 특성과의 상관관계 추출 불가 Generalized Model 고차원의 희소 데이터를 저차원의 데이터로 학습 (Embedding) 기존에 없었던 새로운 특성의...","categories": ["Recommendation"],
        "tags": ["Paper"],
        "url": "http://localhost:4000/recommendation/Wide&DeepLearning/",
        "teaser": null
      },{
        "title": "Deep Learning over Multi-field Cateogorical Data",
        "excerpt":"Deep Learning over Multi-field Cateogorical Data 1. CTR 모델 모델 비교 기존 CTR 예측 선형 모델 : : Logistic linear regression, naïve Bayes, FTRL logistic regression 장점 : 쉬운 활용법 단점 : 낮은 효율성, 독립적인 입력데이터의 상관관계를 찾지 못함 기존 CTR 예측 비선형 모델 : Factorization Machine, Gradient Boosting Tree...","categories": ["Recommendation"],
        "tags": ["Paper"],
        "url": "http://localhost:4000/recommendation/multi_field_category/",
        "teaser": null
      },{
        "title": "Self Learning improves NLU",
        "excerpt":"youtube review                    ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/self_learning_improves_NLU/",
        "teaser": null
      },{
        "title": "Fine-grained Interest Matching for Neural News Recommendation",
        "excerpt":"Review on Youtube                      ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/Finegrained/",
        "teaser": null
      }]
