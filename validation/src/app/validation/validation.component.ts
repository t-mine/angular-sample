import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
})
export class ValidationComponent implements OnInit {
  // IPアドレス
  public inputIP: string | undefined;
  // サブネットマスク
  public inputSubnetMask: string | undefined;

  // IPアドレスの最小文字数
  public readonly minNetworkAddressLength: number = 7;
  // IPアドレスの最大文字数
  public readonly maxNetworkAddressLength: number = 15;
  // IPアドレスの正規表現 x.x.x.x ~ xxx.xxx.xxx.xxx
  public readonly networkAddressPattern: string =
    '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])[¥.]){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$';

  // 入力エラー情報を画面に表示するためのプロパティ
  public validationError: any;
  // 入力エラー情報を管理するためのリスト
  private validationErrorList: any = [];

  constructor() {}

  ngOnInit() {
    this.inputIP = '';
    this.inputSubnetMask = '';
  }

  /**
   * OKボタンがクリックされた時のイベントハンドラ
   * ここでは単純にアラートを出すだけ
   *
   * @param {any} $event イベント情報
   * @memberof ValidationComponent
   */
  public onClickOK($event: any) {
    alert('OK button had clicked.');
  }

  /**
   * keyup イベントのイベントハンドラ
   * このイベントをトリガーに入力エラー情報を管理する
   *
   * @param {any} validationKey
   * @param {any} errorInformation
   * @memberof ValidationComponent
   */
  public onKeyUp(validationKey: any, errorInformation: any) {
    this.manageValidationError(validationKey, errorInformation);
  }

  /**
   * 入力エラー情報を管理する
   * 具体的には次の処理を行う
   * # 引数の validationKey を元にエラー情報を一意に管理する
   * # ビューに表示するためのエラー情報にリストの最後の情報をセットする
   *
   * @private
   * @param {any} validationKey エラーが発生した入力フォーム
   * @param {any} errorInformation バリデーションエラー情報
   * @memberof ValidationComponent
   */
  private manageValidationError(validationKey: any, errorInformation: any) {
    for (const target in this.validationErrorList) {
      if (this.validationErrorList.hasOwnProperty(target) && this.validationErrorList[target].key === validationKey) {
        this.validationErrorList.splice(target, 1);
        break;
      }
    }

    if (errorInformation) {
      this.validationErrorList.push({ key: validationKey, error: errorInformation });
    }

    const errorData: any = this.validationErrorList[this.validationErrorList.length - 1];
    this.validationError = errorData ? errorData.error : undefined;
  }
}
