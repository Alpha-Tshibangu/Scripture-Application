import pandas as pd
import numpy as np
from fastapi import FastAPI
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

app = FastAPI()

kjv = pd.read_csv('C:\\Users\\alphatshibangu\\Desktop\\scripture-app\\Biblle Corpus\\t_kjv.csv')
bcp47 = pd.read_csv('C:\\Users\\alphatshibangu\\Desktop\\scripture-app\\Biblle Corpus\\BCP-47.csv')

@app.get("/verse")
def verse(q: str):

    q = kjv[kjv['t'].str.contains(q, case=False)]
    random_verse_selector = np.random.randint(1, size=None)
    verse_location = (f"{q['b'].iloc[random_verse_selector]} {q['c'].iloc[random_verse_selector]}:{q['v'].iloc[random_verse_selector]}")
    verse_text = q['t'].iloc[random_verse_selector]
    
    text = ("text", verse_text)
    reference = ("reference", verse_location)
    
    text_and_reference = dict([text, reference])

    return text_and_reference

@app.get("/verse-translation")
def translation(q: str, lang="eng_Latn"):

    verse_text = verse(q)
    lang = bcp47[bcp47['l'].str.contains(lang, case=False)]
    lang_code = lang['c'].loc[lang.index[0]]

    tokenizer = AutoTokenizer.from_pretrained("facebook/nllb-200-distilled-600M")
    model = AutoModelForSeq2SeqLM.from_pretrained("facebook/nllb-200-distilled-600M")
    
    article = verse_text["text"]
    inputs = tokenizer(article, return_tensors="pt")
    
    translated_tokens = model.generate(
        **inputs, forced_bos_token_id=tokenizer.lang_code_to_id[lang_code], max_length=200
        )

    translated_text_str = ("translation", tokenizer.batch_decode(translated_tokens, skip_special_tokens=True)[0])
    translated_text_obj = dict([translated_text_str])

    return translated_text_obj

