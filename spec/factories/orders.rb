FactoryBot.define do
  factory :order do
    price {3000}
    token {"tok_abcdefghijk00000000000000000"}
    # テストコードを編集して実行しましょう
    # バリデーションを追加したので、テストコードも修正します。まずは、tokenの値についても設定できるようにFactoryBotの記述を編集しましょう。
  end
end
