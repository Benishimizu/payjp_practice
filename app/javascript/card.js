


// MEMO
// トークン化を行うファイルを作成しよう
// 今回は、card.jsというファイルを作成し、そのファイルにトークン化の処理を記述していきましょう。また、この段階でフォーム送信時にイベントが発火することを確かめます。

// card.jsを作成しましょう
// 以下のように、card.jsを作成してください。
// 正しく読み込まれるか確認しましょう
// card.jsに以下のように記述しましょう。ページが読み込まれた時に、payという変数に代入したアロー関数が実行されるようにします。
// const pay = () => {
//   console.log("カード情報トークン化のためのJavaScript");
// };

// window.addEventListener("load", pay);

// STEP2
// フォーム送信時にイベントが発火するようにしましょう
// 続いて、フォームの送信ボタンをクリックしたら、イベントが発火するようにしましょう。クレジットカード情報のトークン化を、フォーム送信時に実行されるようにするためです。

// card.jsを以下のように編集しましょう。

// const pay = () => {
//   const submit = document.getElementById("button");
//   submit.addEventListener("click", (e) => {
//     e.preventDefault();
//     console.log("フォーム送信時にイベント発火")
//   });
// };

// window.addEventListener("load", pay);
// STEP3
// 公開鍵を設定しましょう
// 公開鍵の情報は、JavaScriptのファイルに設定します。以下のようにcard.jsに記述しましょう。

// 「pk」から始まるものがテスト公開鍵です。
// 「*************」には、自身のテスト公開鍵を設定するようにしましょう。
// app/javascript/card.js

// const pay = () => {
//   const payjp = Payjp('pk_test_***********************')// PAY.JPテスト公開鍵
// // elementsインスタンスを作成
//   const elements = payjp.elements();
//   const submit = document.getElementById("button");
//   submit.addEventListener("click", (e) => {
//     e.preventDefault();
//     console.log("フォーム送信時にイベント発火")
//   });
// };

// window.addEventListener("load", pay);
// // memo3
// elementsインスタンスは、フォームを生成するためのcreate()メソッドを使えます。

// elements.create()
// elementsインスタンスのメソッドです。このメソッドを使用することで、入力フォームを作成できます。この時、生成されたフォームはelementという種類のインスタンスになります。
// 以下のように記述することで、指定したフォームのtypeのelementインスタンスを生成できます。

// 【例】
// 1
// const hogeElement = elements.create('指定したいフォームのtype')
// 指定可能なtypeは以下の4つです。

// 指定可能なtype	説明
// card	カード番号入力欄、有効期限入力欄、CVC入力欄の順に横に並んだフォーム
// cardNumber	カード番号入力欄
// cardExpiry	有効期限入力欄
// cardCvc	CVC入力欄
// cardを指定してelementを生成した場合、同じelementsから他のtypeを指定してelementを生成できません
// 最後に、生成した各elmentインスタンスをビューに反映します。すでにあるHTML要素を指定し、フォームに置き換える形になります。この指定はmountメソッドで行えます。

// mountメソッド
// 引数で要素のid属性を指定し、指定した要素とelementインスタンスが情報を持つフォームとを置き換えるメソッドです。以下のように利用します。

// 【例】
// const hogeElement = elements.create('指定したいフォームのtype')
// // #sampleというid属性の要素とフォームを置き換える
// hegeElement.mount('#sample')
// createToken(element: Element, options?: object)メソッド
// このメソッドを使うと、戻り値としてカード情報のトークンを取得できます。

// 第一引数のcardはPAY.JP側に送るカードの情報で、直前のステップで定義したカード番号に関するelementインスタンス(numberElement)を使います。
const pay = () => {
  // const payjp = Payjp('pk_test_**********')// PAY.JPテスト公開鍵
  const payjp = Payjp(process.env.PAYJP_PUBLIC_KEY);
  const elements = payjp.elements();
  const numberElement = elements.create('cardNumber');
  const expiryElement = elements.create('cardExpiry');
  const cvcElement = elements.create('cardCvc');

  numberElement.mount('#number-form');
  expiryElement.mount('#expiry-form');
  cvcElement.mount('#cvc-form');

  const submit = document.getElementById("button");

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    payjp.createToken(numberElement).then(function (response) {
      if (response.error) {
      } else {
        const token = response.id;
        const renderDom = document.getElementById("charge-form");
        // const tokenObj = `<input value=${token} name='token'>`;
        const tokenObj = `<input value=${token} name='token' type="hidden">`;
        renderDom.insertAdjacentHTML("beforeend", tokenObj);
        // debugger;
        // console.log(token)
      }
      numberElement.clear();
      expiryElement.clear();
      cvcElement.clear();
      document.getElementById("charge-form").submit();
    });
  });
};

window.addEventListener("load", pay);