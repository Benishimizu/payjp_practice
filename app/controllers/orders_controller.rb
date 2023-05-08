class OrdersController < ApplicationController
  def index
    @order = Order.new
  end

  def create
    @order = Order.new(order_params)
    if @order.valid?
      pay_item

      # Payjp.api_key = "sk_test_***********"  # 自身のPAY.JPテスト秘密鍵を記述しましょう
      # Payjp::Charge.create(
      #   amount: order_params[:price],  # 商品の値段
      #   card: order_params[:token],    # カードトークン
      #   currency: 'jpy'                 # 通貨の種類（日本円）
      # )
      # 決済処理を記述しましょう
      # それでは、実際にコントローラーに決済処理を記述していきます。

      # 決済処理を行うには、秘密鍵をPAY.JP側へ送付する必要があります。そのために、先ほど導入したPAY.JPのAPIのGem「payjp」が提供する、Payjpクラスのapi_keyというインスタンスに秘密鍵を代入します。

      # また、決済に必要な情報は同様にGemが提供する、Payjp::Charge.createというクラスおよびクラスメソッドを使用します。

      # 以下のようにコントローラーへ追記しましょう。

      # 「sk」から始まるものがテスト秘密鍵です。
      # 自身のテスト秘密鍵を設定するようにしましょう。


      @order.save
      return redirect_to root_path
    else
      render 'index'
    end
  end

  private

  # def order_params
  #   params.require(:order).permit(:price)
  # end
  def order_params
    params.require(:order).permit(:price).merge(token: params[:token])
  end
  # 上記のように設定することで、order_params[:price]としてpriceの情報が、order_params[:token]としてtokenの情報が取得できるようになります。

  def pay_item
    # Payjp.api_key = "sk_test_***********"  # 自身のPAY.JPテスト秘密鍵を記述しましょう
    Payjp.api_key = ENV["PAYJP_SECRET_KEY"]
    Payjp::Charge.create(
      amount: order_params[:price],  # 商品の値段
      card: order_params[:token],    # カードトークン
      currency: 'jpy'                 # 通貨の種類（日本円）
    )
  end
    # リファクタリングしましょう
    # 現状のコントローラーの記述はやや複雑で読みにくいものになっています。新たにメソッドを定義し、その中に決済処理を移動しましょう。
    # pay_itemというメソッドに切り出し、コントローラーの処理の可読性を高めました。ここまで記述できたら、再度正しく決済処理が実行されるか確かめましょう。





end
