class Order < ApplicationRecord
  attr_accessor :token
  #  tokenの値もOrderモデルで取り扱えるようにしましょう
  validates :price, presence: true
  validates :token, presence: true
  # tokenが空では保存できないというバリデーションを設定しましょう
    # モデルにtokenが空では保存できないというバリデーションを設定しましょう。そうすることによって、コントローラー9行目のif @order.valid?でfalseとなり、エラーメッセージをブラウザ上に表示してくれるようになります。
    # tokenはordersテーブルに存在しないため、本来はOrderモデルのバリデーションとしては記載することはできません。しかしながら、前のステップでattr_accessor :tokenと記載したことにより、tokenについてのバリデーションを記述することができます。

end
