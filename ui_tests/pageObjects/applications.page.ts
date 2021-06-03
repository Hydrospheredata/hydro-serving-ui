import * as playwright from 'playwright-core';
export class ApplicationsPage {
  private readonly page: playwright.Page;
  private readonly baseUrl: string;
  private readonly createApplicationButtonSelector = 'Create Application'
  private readonly signatureTableSelector = 'div.application__signature'
  readonly signatureTableHeaderSelector = 'span.signature__title'
  readonly signatureTableTitleSelector= 'div.signature__io-field-title'
  readonly signatureTableNameSelector = 'div.signature__io-field-name'
  readonly signatureTableValueSelector = 'div.signature__io-field-additional-info'
  private readonly stageBlockSelector = 'div.application__stage.ng-star-inserted'
  readonly stageHeaderSelector = 'div.application__stage-header'
  private readonly modelVariantSelector = 'div.application__model-variants'
  readonly modelVariantNameSelector = 'span.model-version__name'
  readonly modelVariantVersionSelector = 'span.model-version__version'
  private readonly modelVariantMenuSelector = 'div.menu.ng-star-inserted--showed'
  readonly modelVariantMenuTextSelector = 'div.menu__item.ng-star-inserted'
  private readonly modelVariantMenuDetailsButtonSelector = 'details'
  private readonly modelVariantMenuMonitoringButtonSelector = 'monitoring'
  private readonly modelVariantMenuDataProjectionButtonSelector = 'data projection'
  private readonly modelVariantMenuStatButtonSelector = 'stat'
  private readonly testButtonSelector = 'button.hs-button.hs-button--flat.hs-button--flat-cyan'
  private readonly editButtonSelector = 'button.hs-button.hs-button--flat.hs-button--flat-primary'
  private readonly removeButtonSelector = 'button.hs-button.hs-button--flat.hs-button--flat-warning'
  private readonly editWindowSelector = 'div.dialog__container'
  private readonly editWindowHeaderBlockSelector = 'div.hs-input'
  readonly editWindowApplicationNameSelector = 'label.hs-input__label.ng-star-inserted'
  readonly editWindowApplicationNameInputSelector = 'input#applicationName.ng-pristine.ng-valid.ng-touched.hs-input__input'
  readonly kafkaCheckboxSelector = 'label.hydro-checkbox'
  readonly addStageButtonSelector = 'button.add-stage-button.hs-button.hs-button--stroked.hs-button--stroked-base'
  readonly cancelButtonSelector = 'button.hs-button.hs-button--base.hs-button--base-base'
  readonly editApplicationButtonSelector = 'button.hs-button.hs-button--flat.hs-button--flat-primary'
  readonly editWidowStageSelector = 'div.stage.ng-untouched.ng-pristine.ng-star-inserted.ng-valid'
  readonly editWindowStageLabelSelector = 'label.service__field-label'
  readonly editWindowSelectSelector = 'mdl-select.mdl-select.ng-untouched.ng-pristine.ng-valid'
  readonly modelNameBlockSelector = 'div.service__field.service__field--model-name'
  readonly modelVersionBlockSelector = 'div.service__field.service__field--model-version'
  readonly modelWeightBlockSelector = 'div.service__field.service__field--is-last.service__field--model-weight'
  readonly dockerImageSelector = 'span.docker-image'
  readonly hostSelector = 'div.service__field.service__field--hostSelector span'
  readonly addModelVariantButtonSelector = 'button.button.button--flat.stage__add-model-variant-button.hs-button.hs-button--flat-primary.ng-star-inserted'
  readonly removeModelVariantButtonSelector = 'div.service__remove-container.ng-start-inserted'
  readonly testWindowSelector = 'div.test-application'
  readonly webButtonSelector = 'web'
  readonly cURLButtonSelector = 'cURL'
  readonly gRPCButtonSelector = 'gRPC'
  readonly testWindowOutputHeaderSelector = 'div.tests-fields__item-header'
  readonly testWindowInputHeaderSelector = 'div.tests-fields__item.__input.ng-star-inserted label'
  readonly testWindowInputCodeSelector = 'div.CodeMirror.cm-s-default.CodeMirror-wrap'
  readonly testWindowOutputCodeSelector = 'div.tests-fields__item.__output'
  readonly testWindowApplicationNameSelector = 'p.application-name'
  readonly testAppButtonSelector = 'button.hs-button.hs-button--flat.hs-button--flat-primary'
  readonly closeTestWindowButtonSelector = 'hydro-icon.icon.test-application__close-icon'
  readonly CodeSelector = 'div.code.code--wrap-space.ng-star-inserted'
  readonly copyButtonSelector = 'div.copy'
  readonly testWindowStatusSelector = 'span.status.ng-star-inserted'
  readonly removeWindowSelector = 'div.dialog__content.dialog__content--center'
  readonly removeWindowTitleSelector = 'span.dialog__content-question'
  readonly removeWindowModelSelector = 'p.dialog__text.dialog__text--is-alert'
  readonly removeWindowCancelButtonSelector = 'button.hs-button.hs-button--base.hs-button--base-base'
  readonly removeWindowRemoveButtonSelector = 'button.hs-button.hs-button--flat.hs-button--flat-warning'
  readonly appTooltipSelector = 'div.mdl-snackbar__text'





  constructor(page: playwright.Page, unifiedConsoleUrl: string) {
    this.page = page;
    this.baseUrl = unifiedConsoleUrl + '/applications';
  }




}
