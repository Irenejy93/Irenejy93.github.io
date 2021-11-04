---
title: Open NLP Model 비교
categories:
- NLP
tags:
- code
---

```python
example_document1 = '''Baidu's Apollo Project is one of the world's leading autonomous driving and AI programs, with one of the largest partner ecosystems and over 100 global partners as of 2018, including BYD, Dongfeng, Microsoft, Intel, Nvidia, Daimler AG, ZTE, Grab, Ford, Hyundai and Honda.'''
news1 = '- BuzzFeed on Thursday bought news website HuffPost from Verizon Communications Inc VZ.N in the latest sign of consolidation in the online media world.'
example_document3 = 'The company sped up the development schedules for 12 vehicle programs: the Hummer electric truck, three other GMC Ultium variants that include an EV pickup, four Chevrolet electric vehicles that also includes a pickup and compact crossover, and four Cadillacs.'
example_document2 = '''Scientists say that the press-released results share a few more details than last weeks positive announcements from Pfizer and BioNTech, which are together working on a rival RNA vaccine, and from the Russian developers behind the controversial ‘Sputnik V’ vaccine. Moderna released figures suggesting that its vaccine is likely to prevent severe COVID-19 infections, something that was not clear from the other developers’ announcements.'''
news4= '''
Tesla is getting added to the S&P 500, shares surge on the news
Julia La Roche
Julia La Roche·Correspondent
Tue, November 17, 2020, 7:41 AM GMT+9
Shares of Telsa (TSLA) jumped more than 10% in the after-hours session on the news that the electric carmaker is set to join the S&P 500.

On Monday evening, the S&P Dow Jones Indices announced that Tesla will be added to the closely-followed stock index on Monday, Dec. 21 before the market opens to coincide with the December quarterly rebalance.'''

news5= '''A bipartisan group of U.S. states plans to file an antitrust lawsuit against Google as early as next month, according to two people briefed on the matter, potentially beating a more widely anticipated lawsuit from a different group of states led by Texas.'''
```


------------
## Gate API ( ANNIE : rule based ) 

Gate 라고불리는 Gate cloud 에서 데이터를 가져와서 룰 기반 으로 회사명, 날짜, 돈, 위치 등을 인식한다. 


```python

```

```python

import requests
url="https://cloud-api.gate.ac.uk/process-document/annie-named-entity-recognizer" # Gate cloud 주소 
headers = {'Content-Type': 'text/plain'}

def GATENER(original):
    ll = []
    sentence = original.encode('utf-8') # 문장 utf-8 인코딩
    response = requests.post(url, data=sentence, headers=headers).json() # 인코딩한 문장 해당 클라우드에 입력 및 개체명 찾기

    import json
    result = json.dumps(response, indent=2) # 결과 json 형태로 수집 
    try:
        orgdict = json.loads(result)['entities']['Organization'] # 수집된 데이터에서 organization 태그 된 단어 추출 
        for d in orgdict:
            organization = original[d['indices'][0]:d['indices'][1]]
            ll.append(organization)
    except :
        print('No Orgnization within Sentence')
    return ll


print(GATENER(example_document1))
```
    ['Apollo Project', 'Microsoft', 'Intel', 'Nvidia', 'Daimler AG', 'Hyundai', 'Honda']


```python
GATENER(news2)
```
    No Orgnization within Sentence
    
    
```python   
GATENER(news3)
```
    Pfizer
    BioNTech
    
    
```python    
GATENER(news4)
```
    No Orgnization within Sentence
    
    
```python
GATENER(news5)
```
    Google


## NLTK

NLTK 에서 지원하는 개체명 인식기 

```python
import nltk # NLTK 에서 재공하는 NER 분석을 위한 데이터 다운로드
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('maxent_ne_chunker')
nltk.download('words')


def nltkner(original):
    dicts = [(' '.join(c[0] for c in chunk), chunk.label() ) 
             for chunk in nltk.ne_chunk(nltk.pos_tag(nltk.word_tokenize(original))) # NLTK 사용, 문장 tokenize (형태소별로 문장 쪼개기)
             if hasattr(chunk, 'label')] # 쪼갠 단어 객체명 붙여주기
    orglist = [a[0] for a in dicts if a[1]=='ORGANIZATION'] # 객체명중 ORGNAIZATION 인 단어 찾기 
    print(orglist)
    return dicts , orglist

dicts, orglist = nltkner(example_document)
```
        ['AI', 'BYD', 'Intel', 'ZTE', 'Ford']
        
```python
dicts, orglist = nltkner(news1)
```
        ['BuzzFeed', 'HuffPost', 'Verizon Communications Inc']
```python
dicts, orglist = nltkner(news3)
```
        ['BioNTech', 'RNA']
```python
dicts, orglist = nltkner(news4)
```
        ['Finance Tesla', 'TSLA']



## Stanford Core NLP

스탠포드 어학사전에를 기반으로 하는 룰기반의 개체명 인식 모델.
 사람, 장소, 위치, 돈, 숫자, 순서, 퍼센트 등등의 12개의 개체로 인식한다. 

```python
!wget http://nlp.stanford.edu/software/stanford-ner-2015-04-20.zip #  Stanford 어학사전 다운로드
!unzip stanford-ner-2015-04-20.zip # 다운로드 된 압축파일 해체
from nltk.tag.stanford import StanfordNERTagger 
jar = "stanford-ner-2015-04-20/stanford-ner-3.5.2.jar" 
model = "stanford-ner-2015-04-20/classifiers/" 

st_3class = StanfordNERTagger(model + "english.all.3class.distsim.crf.ser.gz",
                              jar, encoding='utf8') # stanford 어학사전중 장소, 사람, 조직 tag 로된 사전만 불러오기 


st_3class = StanfordNERTagger(model + "english.all.3class.distsim.crf.ser.gz", jar, encoding='utf8') 
st_4class = StanfordNERTagger(model + "english.conll.4class.distsim.crf.ser.gz", jar, encoding='utf8') 
st_7class = StanfordNERTagger(model + "english.muc.7class.distsim.crf.ser.gz", jar, encoding='utf8')

[a[0] for a in st_3class.tag(example_document.split()) if a[1]=='ORGANIZATION']
```
        ['Hyundai']

```python
[a[0] for a in st_4class.tag(news1.split()) if a[1]=='ORGANIZATION']
```
        ['HuffPost', 'Verizon', 'Communications', 'Inc']
```python
[a[0] for a in st_3class.tag(news2.split()) if a[1]=='ORGANIZATION']
```
        ['Chevrolet']

```python
[a[0] for a in st_3class.tag(news3.split()) if a[1]=='ORGANIZATION']
```
        ['Pfizer']
```python
[a[0] for a in st_3class.tag(news4.split()) if a[1]=='ORGANIZATION']
```
        ['Yahoo', 'Finance', 'Tesla', 'S&P', 'S&P', 'S&P', 'Dow', 'Jones', 'Indices']

```python
[a[0] for a in st_3class.tag(news5.split()) if a[1]=='ORGANIZATION']

```
        ['Google']



## Spacy

spaCy는 파이썬의 자연어처리를 위한 오픈 소스 기반 라이브러리다.
문장을 tokenize 한후, 각 token의 역활과 관계표현을 통해 개체명인식 , TEXT SIMILARITY 등을 계산해준다.


```python

!python3 -m spacy download en_core_web_lg # 라이브러리 다운로드
import spacy
sp_lg = spacy.load('en_core_web_lg') 

def spacy_large_ner(document):
    listss = [ent.text.strip() for ent in sp_lg(document).ents 
              if ent.label_ =='ORG'] # 문장 쪼개고, 해당 문장 spacy 에 입력후, 기관으로 개체 테그 붙어있는 단어 추출
    return  listss

def spacy_large_ner(document):
    listss = [ent.text.strip() for ent in sp_lg(document).ents if ent.label_ =='ORG']
    return  listss

dd = spacy_large_ner(example_document)
print(dd)
```
        ['Baidu', 'Apollo Project', 'BYD', 'Dongfeng', 'Microsoft', 'Intel', 'Nvidia', 'Daimler AG', 'ZTE', 'Ford', 'Hyundai', 'Honda']
        
```python
dd = spacy_large_ner(news1)
print(dd)
```
        ['Baidu',
 'Apollo Project',
 'BYD',
 'Dongfeng',
 'Microsoft',
 'Intel',
 'Nvidia',
 'Daimler AG',
 'ZTE',
 'Ford',
 'Hyundai',
 'Honda']
 
```python
spacy_large_ner(example_document3)
```
        ['GMC', 'Ultium', 'Chevrolet', 'Cadillacs']
        
```python
spacy_large_ner(example_document2)
```
        ['GMC', 'Ultium', 'Chevrolet', 'Cadillacs']

```python
dd = spacy_large_ner(news4)
print(dd)
```
        ['Pfizer', 'RNA']
```python
dd = spacy_large_ner(news5)
```
        ['Yahoo Finance', 'Telsa', 'TSLA', 'S&P', 'Tesla']

## Polyglot

위키피디아 및 FREEBASE 에서 얻은 데이터를 통해, 감성 SEMENTIC 및 문장 구조 SYNTACTIC 를 임베딩하여, 여러 언어를 인식하는 제네럴한 모델  

```python
import polyglot

!polyglot download TASK:ner2
# # pip install tkinter
# ERROR: Could not find a version that satisfies the requirement tkinter (from versions: none)
# ERROR: No matching distribution found for tkinter

import tkinter
text = Text(u"In Großbritannien war Gandhi mit dem westlichen Lebensstil vertraut geworden")
print(text.entities)

```

## Flair : NER 부분 3위 

```python

from flair.data import Sentence # 전이 학습 제공된 모델 import 
from flair.models import SequenceTagger

def flairner(sent):
    sentence = Sentence(sent)
    tagger = SequenceTagger.load('ner') # import 한 모델중 개체명분석 모델 불러오기
    tagger.predict(sentence) # 입력된 문장에 대한 개체명 분석 예측
    flairnerlist = [str(a).split('\"')[1] for a in sentence.get_spans('ner') if str(a).split('\"')[2][14:17] =='ORG'] 
    # 개체명이 기관(회사) 인 단어 추출
    return flairnerlist

flairner(example_document)
        ['Baidu',
         'Apollo Project',
         'AI',
         'BYD',
         'Dongfeng',
         'Microsoft',
         'Intel',
         'Nvidia',
         'Daimler AG',
         'ZTE',
         'Grab',
         'Ford',
         'Hyundai',
         'Honda']
flairner(news1)
    ['BuzzFeed', 'HuffPost', 'Verizon Communications Inc']
flairner(example_document3)
    ['Pfizer', 'BioNTech', 'Moderna']
flairner(example_document2)
flairner(news4)
    ['Yahoo Finance Tesla','Julia La Roche Julia La Roche','Telsa', 'TSLA', 'S & P Dow Jones Indices', 'Tesla']
flairner(news5)
    ['Google']
```


## DEEPPAVLOV
DEEP NEURAL NETWORK MODEL FOR THE TASK OF NAME ENTITY RECOGNITION 

DeepPavlov is an open-source conversational AI library built on TensorFlow, Keras and PyTorch.

```python
!pip install -q deeppavlov

from deeppavlov import configs, build_model

ner_model = build_model(configs.ner.ner_ontonotes_bert, download=True)

ner_model(example_document)
```

## ELMO

```python
from allennlp.predictors import Predictor
predictor = Predictor.from_path("https://allennlp.s3.amazonaws.com/models/ner-model-2018.04.26.tar.gz")
results = predictor.predict(sentence="Did Uriah honestly think he could beat The Legend of Zelda in under three hours?")
for word, tag in zip(results["words"], results["tags"]):
    print(f"{word}\t{tag}")
```




### SIMPLEST BERT MODEL RoBERTa

```python

from simpletransformers.ner import NERModel, NERArgs
model_args = NERArgs()
model_args.labels_list = ["PERSON", "LOCATION", "ORGANIZATION"]

model = NERModel(
    "roberta",
    "roberta-base",
    args=model_args, use_cuda=False
)

def bertsimplener(sentence):
    orligst = []
    predictions, raw_outputs = model.predict([sentence])
    for a in predictions[0]:
        for k,v in a.items():
            if v=='ORGANIZATION':
                orligst.append(k)
    return orligst

bertsimplener(example_document)
    ['Apollo','Project','the','autonomous','driving','and','programs,','partner','ecosystems','over','global',
     'partners','as','of','2018,','BYD,','Daimler','ZTE,','and','Honda.']
```



### CONLL 
```python
def conllner(sentence):
    words=''
    tokens = tokenizer.tokenize(tokenizer.decode(tokenizer.encode(sentence))) # 문장 형태소 분석

    inputs = tokenizer.encode_plus(sentence) # 형태소 별로 자른 단어 모음을 Tensor 형태로 변화
    inin = torch.FloatTensor([v for k,v in inputs.items()])# Tensor 형태 데이터를 모델에 입력
    output = model(torch.LongTensor([inputs['input_ids']]))[0]
    predictions = torch.argmax(output, dim=2) # 예측값을 1 과 0 사이의 값으로 축소
    # 각 단어별 예측값에 따른 label 맞춰주기
    wordtag = [(token, label_list[prediction]) for token, prediction in zip(tokens, predictions[0].tolist())]


    for i in range(len(wordtag)-1): # label 된 단어중 ,기관 개체명 가진 단어 추출 
        if wordtag[i][1] =='I-ORG':
            words += wordtag[i][0]
            if wordtag[i+1][1] != 'I-ORG':
                words += ','
    wordlist  = [a for a in words.replace('##','').split(',') if a !='']
    return wordlist

conllner(example_document1)
    ['Baidu', 'BYD', 'Dongfeng', 'Microsoft', 'Intel', 'Nvidia', 'DaimlerAG', 'ZTE', 'Grab', 'Ford', 'Hyundai', 'Honda']
conllner(example_document2)
    ['Pfizer', 'BioNTech', 'Moderna']
conllner(example_document3)
    ['Chevrolet']


```
