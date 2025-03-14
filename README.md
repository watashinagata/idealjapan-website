# idealjapan ウェブサイト

AIを活用したインターネット広告代理店「idealjapan株式会社」のコーポレートウェブサイトです。

## 特徴

- モダンなデザイン
- レスポンシブレイアウト
- アニメーション効果
- 採用情報セクション

## 技術スタック

- HTML5
- CSS3（モジュール方式）
- JavaScript
- Font Awesome
- AOS (Animate On Scroll)

## デプロイ方法

### GitHub Pagesでの公開手順

1. リポジトリの「Settings」タブに移動
2. 左側のメニューから「Pages」をクリック
3. 「Source」セクションで「Branch: main」を選択
4. 「Save」ボタンをクリック
5. 数分後に公開URLが表示されます

### カスタムドメインの設定方法（オプション）

1. GitHub Pagesの設定ページで「Custom domain」に独自ドメインを入力
2. 「Save」ボタンをクリック
3. DNSプロバイダーで以下のDNSレコードを設定:
   - Aレコード: `185.199.108.153`
   - Aレコード: `185.199.109.153`
   - Aレコード: `185.199.110.153`
   - Aレコード: `185.199.111.153`
   - またはCNAMEレコード: `watashinagata.github.io`

## ローカル開発

```bash
# リポジトリをクローン
git clone https://github.com/watashinagata/idealjapan-website.git

# 変更を加えた後
git add .
git commit -m "変更内容の説明"
git push origin main
```