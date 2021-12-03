#!/home/yuuki/anaconda3/envs/scrape/bin/python3
import requests
from bs4 import BeautifulSoup
import json

# スクレイピング対象の URL にリクエストを送り HTML を取得する
res = requests.get('https://developer.mozilla.org/ja/docs/Web/HTTP/Status')

# レスポンスの HTML から BeautifulSoup オブジェクトを作る
soup = BeautifulSoup(res.text, 'html.parser')

dts =	soup.find_all('dt')
dds =	soup.find_all('dd')

dt_strings = []
dd_strings = []
for dt in dts:
    dt_strings.append(dt.find("code").string)
for dd in dds:
    print("=======")
    if (dd.text):
        # print(dd.text)
        dd_strings.append(dd.text)

# 各ステータスの情報をpython dictで保存していく
data = []
for i in range(len(dd_strings)):
    # code ... 200
    # note ... OK
    # description_ja_JP ... リクエストが成功したことを示します。...
    code, note = dt_strings[i].split(" ", 1)
    description_ja_JP = dd_strings[i]
    d = { "code": code, "note": note, "description": { "ja-JP": description_ja_JP } }
    data.append(d)

# 最後にjsonとして書き出し
# path = "status_codes.json"
# with open(path, mode='w') as f:
#     text = json.dumps(data, sort_keys=True, ensure_ascii=False, indent=2)
#     f.write(text)

# スクレイピング対象の URL にリクエストを送り HTML を取得する
res = requests.get('https://developer.mozilla.org/en-US/docs/Web/HTTP/Status')

# レスポンスの HTML から BeautifulSoup オブジェクトを作る
soup = BeautifulSoup(res.text, 'html.parser')

dts =	soup.find_all('dt')
dds =	soup.find_all('dd')

dt_strings = []
dd_strings = []
for dt in dts:
    dt_strings.append(dt.find("code").string)
for dd in dds:
    print("=======")
    if (dd.text):
        # print(dd.text)
        dd_strings.append(dd.text)

# 各ステータスの情報をpython dictで保存していく
for i in range(len(dd_strings)):
    # code ... 200
    # note ... OK
    # description_ja_JP ... リクエストが成功したことを示します。...
    code, note = dt_strings[i].split(" ", 1)
    description_en_US = dd_strings[i]
    description_en_US = description_en_US.replace('\n', '').replace("   ", ' ').replace("  ", ' ')
    data[i]["description"]["en-US"] = description_en_US

# 最後にjsonとして書き出し
path = "status_codes.json"
with open(path, mode='w') as f:
    text = json.dumps(data, sort_keys=True, ensure_ascii=False, indent=2)
    f.write(text)
