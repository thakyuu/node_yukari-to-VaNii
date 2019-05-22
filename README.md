# node_yukari-to-VaNii

## これ is なに

ゆかりねっとで認識した直近9件の発言をVaNiiMenuのtemplate.jsonに登録するフィルタです

VaNiiMenuのTweet機能において、ゆかりねっとでの音声認識での入力が可能になります

### 参考動画
https://twitter.com/thakyuu/status/1130133778658054144

## どうやってつかうの

### 注意事項
* VaNiiMenuのTemplate.jsonを動的に書き換えます。
* 事前にテストは実施していますが、Template.jsonの中身がすべて消えてしまうなど、不具合が発生する可能性があります。
* 設定によっては、Template.jsonの既存の単語を上書きしてしまう可能性があります

### 前提
* ゆかりねっとで音声認識できるところまでセットアップ済み
* VaNiiMenu v0.11d以上を導入済み

### 使用手順
1. `config.json`の`"path": "path/to/template.json",`の箇所にVaNiiMenuのディレクトリにある`Template.json`を指定します
    * [!] jsonの制約上、ファイルパスの`\`記号は`\\`にする必要があります。(「\」は半角の「￥」)

例. `"path": "C:\\Tools\\VaNiiMenu\\Template.json",`

2. ゆかりねっとのフィルタ設定を開きます
3. フィルター追加をクリックし、適当な名前を付けます(Yukari-to-VaNiiなど)
4. フィルター種類を外部プログラムフィルタにします
5. カレントディレクトリに`node_yukari-to-VaNii.exe`のあるディレクトリを指定します
6. 実行プログラムに`node_yukari-to-VaNii.exe`を指定します。
7. ゆかりねっとで音声認識させると、上記で指定した`Template.json`に反映されるようになります

## config.jsonについて
```
{
	"configVersion": "0.0.1",
  　　　　↑触らない事
  
	"osc": {
		"targetAddress": "127.0.0.1",
		"targetPort": "39972",
		"address": {
			"reload": "/VaNiiMenu/TweetPhraseReload"
		}
	},
  　　　　↑
  　　　　通常変更する必要はありません。
  
	"template": {
		"path": "path/to/template.json",
    　　　　　　　↑
    　　　　　　　VaNiiMenuのTemplate.jsonの場所を指定します
    
		"page": 19
    　　　　　　　↑
    　　　　　　　動的に書き換えるページを指定します
    　　　　　　　初期値の19では、導入直後のVaNiiMenuの最終ページの後ろに新規のページを挿入して利用します
	}
}
```
