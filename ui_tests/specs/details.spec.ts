import * as playwright from 'playwright-core';
import {  DetailsHelper } from '../helpers/details.helper';
import { BaseHelper } from '../helpers/base.helper';
import { ModelsHelper } from '../helpers/models.helper';

describe("Details Page", () => {
  let browser: playwright.Browser;
  let page: playwright.Page;
  let detailsHelper: DetailsHelper;
  let baseHelper: BaseHelper;

  beforeAll(async () => {
    baseHelper = new BaseHelper()
    browser = await baseHelper.createBrowser();
    page = await baseHelper.createPage(browser);
    detailsHelper = new DetailsHelper(page)
  });

  describe('page structure', () => {
      beforeAll(async () => {
        jest.setTimeout(30000);
        await page.goto('http://localhost/models/4/54');
        await page.waitForResponse('http://localhost/api/v2/model/version')
      });

      it('check details table headers', async () => {
        await expect(await detailsHelper.getVersionHeaderFromDetailsTable()).toEqual('Version')
        await expect(await detailsHelper.getCreatedHeaderFromDetailsTable()).toEqual('Created')
        await expect(await detailsHelper.getRuntimeHeaderFromDetailsTable()).toEqual('Runtime')
      })

      it('check applications table headers', async () => {
        await expect(await detailsHelper.getNameHeaderFromApplicationsTable()).toEqual('name')
        await expect(await detailsHelper.getStatusHeaderFromApplicationsTable()).toEqual('status')
      })

      it('check services buttons', async () => {
        await expect(await detailsHelper.getMonitoringButton()).not.toBeNull()
      })

      it('check applications buttons', async () => {
        await expect(await detailsHelper.getCreateApplicationButton()).not.toBeNull()
      })

      it('check servables table headers', async () => {
        await expect(await detailsHelper.getNameHeaderFromServablesTable()).toEqual('name')
        await expect(await detailsHelper.getStatusHeaderFromServablesTable()).toEqual('status')
        await expect(await detailsHelper.getMessageHeaderFromServablesTable()).toEqual('message')
        await expect(await detailsHelper.getActionsHeaderFromServablesTable()).toEqual('actions')

      })

      it('check signatures table headers', async () => {
        await expect(await detailsHelper.getInputFieldNameHeaderFromSignaturesTable()).toEqual('input_field_name')
        await expect(await detailsHelper.getInputDataTypeHeaderFromSignaturesTable()).toEqual('input_data_type')
        await expect(await detailsHelper.getInputShapeHeaderFromSignaturesTable()).toEqual('input_shape')
        await expect(await detailsHelper.getInputProfileHeaderFromSignaturesTable()).toEqual('input_profile')
        await expect(await detailsHelper.getOutputFieldNameHeaderFromSignaturesTable()).toEqual('output_field_name')
        await expect(await detailsHelper.getOutputDataTypeHeaderFromSignaturesTable()).toEqual('output_data_type')
        await expect(await detailsHelper.getOutputShapeHeaderFromSignaturesTable()).toEqual('output_shape')
        await expect(await detailsHelper.getOutputProfileTypeHeaderFromSignaturesTable()).toEqual('output_profile')

      })

    it('check metadata table headers', async () => {
      await expect(await detailsHelper.getBranchHeaderFromMetadataTable()).toEqual('git.branch :')
      await expect(await detailsHelper.getEmailHeaderFromMetadataTable()).toEqual('git.branch.head.author.email :')
      await expect(await detailsHelper.getNameHeaderFromMetadataTable()).toEqual('git.branch.head.author.name :')
      await expect(await detailsHelper.getDateHeaderFromMetadataTable()).toEqual('git.branch.head.date :')
      await expect(await detailsHelper.getShaHeaderFromMetadataTable()).toEqual('git.branch.head.sha :')
      await expect(await detailsHelper.getIsDirtyHeaderFromMetadataTable()).toEqual('git.is-dirty :')
    })

    it('check Services buttons tooltips', async () => {
    await detailsHelper.hoverOnVisualizationButton()
      await expect(await detailsHelper.visualizationTooltipText()).toEqual('No \'embedding\' field in model output fields')
      await detailsHelper.hoverOnStatButton()
      await expect(await detailsHelper.statTooltipText()).toEqual('Need uploaded training data')
    })


    }
  )

  describe('table data', () => {
      beforeAll(async () => {
        await page.goto('http://localhost/models/4/54');
        await page.waitForResponse('http://localhost/api/v2/model/version')
      });

      it('check details table data', async () => {
        await expect(await detailsHelper.getVersionValueFromDetailsTable()).toEqual('1')
        await expect(await detailsHelper.getCreatedValueFromDetailsTable()).toContain('22 Apr 2020')
        await expect(await detailsHelper.getRuntimeValueFromDetailsTable()).toEqual('hydrosphere/serving-runtime-python-3.60.1.2-rc0')
      })

    it('check applications table data', async () => {
      await expect(await detailsHelper.getApplicationsTableEmptyText()).toEqual('Application\'s list is empty')

    })

    it('check servables table data', async () => {
      await expect(await detailsHelper.getServablesTableEmptyText()).toEqual('Servable\'s list is empty')

    })

    it('check signatures table data', async () => {
      await expect(await detailsHelper.getDataRowFromSignaturesTable()).toContain('DT_INT64')
      await expect(await detailsHelper.getDataRowFromSignaturesTable()).toContain('scalar')
      await expect(await detailsHelper.getDataRowFromSignaturesTable()).toContain('NUMERICAL')

      await expect(await detailsHelper.getWorkclassRowFromSignaturesTable()).toContain('DT_INT64')
      await expect(await detailsHelper.getWorkclassRowFromSignaturesTable()).toContain('scalar')
      await expect(await detailsHelper.getWorkclassRowFromSignaturesTable()).toContain('NUMERICAL')

      await expect(await detailsHelper.getEducationRowFromSignaturesTable()).toContain('DT_INT64')
      await expect(await detailsHelper.getEducationRowFromSignaturesTable()).toContain('scalar')
      await expect(await detailsHelper.getEducationRowFromSignaturesTable()).toContain('NUMERICAL')

      await expect(await detailsHelper.getMaritalStatusRowFromSignaturesTable()).toContain('DT_INT64')
      await expect(await detailsHelper.getMaritalStatusRowFromSignaturesTable()).toContain('scalar')
      await expect(await detailsHelper.getMaritalStatusRowFromSignaturesTable()).toContain('NUMERICAL')

      await expect(await detailsHelper.getOccupationRowFromSignaturesTable()).toContain('DT_INT64')
      await expect(await detailsHelper.getOccupationRowFromSignaturesTable()).toContain('scalar')
      await expect(await detailsHelper.getOccupationRowFromSignaturesTable()).toContain('NUMERICAL')

      await expect(await detailsHelper.getRelationshipRowFromSignaturesTable()).toContain('DT_INT64')
      await expect(await detailsHelper.getRelationshipRowFromSignaturesTable()).toContain('scalar')
      await expect(await detailsHelper.getRelationshipRowFromSignaturesTable()).toContain('NUMERICAL')

      await expect(await detailsHelper.getRaceRowFromSignaturesTable()).toContain('DT_INT64')
      await expect(await detailsHelper.getRaceRowFromSignaturesTable()).toContain('scalar')
      await expect(await detailsHelper.getRaceRowFromSignaturesTable()).toContain('NUMERICAL')

      await expect(await detailsHelper.getSexRowFromSignaturesTable()).toContain('DT_INT64')
      await expect(await detailsHelper.getSexRowFromSignaturesTable()).toContain('scalar')
      await expect(await detailsHelper.getSexRowFromSignaturesTable()).toContain('NUMERICAL')

      await expect(await detailsHelper.getCapitalGainRowFromSignaturesTable()).toContain('DT_INT64')
      await expect(await detailsHelper.getCapitalGainRowFromSignaturesTable()).toContain('scalar')
      await expect(await detailsHelper.getCapitalGainRowFromSignaturesTable()).toContain('NUMERICAL')

      await expect(await detailsHelper.getCapitalLossRowFromSignaturesTable()).toContain('DT_INT64')
      await expect(await detailsHelper.getCapitalLossRowFromSignaturesTable()).toContain('scalar')
      await expect(await detailsHelper.getCapitalLossRowFromSignaturesTable()).toContain('NUMERICAL')

      await expect(await detailsHelper.getHoursPerWeekRowFromSignaturesTable()).toContain('DT_INT64')
      await expect(await detailsHelper.getHoursPerWeekRowFromSignaturesTable()).toContain('scalar')
      await expect(await detailsHelper.getHoursPerWeekRowFromSignaturesTable()).toContain('NUMERICAL')

      await expect(await detailsHelper.getCountryRowFromSignaturesTable()).toContain('DT_INT64')
      await expect(await detailsHelper.getCountryRowFromSignaturesTable()).toContain('scalar')
      await expect(await detailsHelper.getCountryRowFromSignaturesTable()).toContain('NUMERICAL')

      await expect(await detailsHelper.getClassedRowFromSignaturesTable()).toContain('DT_INT64')
      await expect(await detailsHelper.getClassedRowFromSignaturesTable()).toContain('scalar')
      await expect(await detailsHelper.getClassedRowFromSignaturesTable()).toContain('NUMERICAL')

      await expect(await detailsHelper.getValueRowFromSignaturesTable()).toContain('DT_DOUBLE')
      await expect(await detailsHelper.getValueRowFromSignaturesTable()).toContain('scalar')
      await expect(await detailsHelper.getValueRowFromSignaturesTable()).toContain('NUMERICAL')

      await expect(await detailsHelper.CheckProfileButtonHTMLSignaturesTable()).toEqual(false)

    })

    it('check metadata table data', async () => {
      await expect(await detailsHelper.getBranchRowFromMetadataTable()).toEqual('feature/e2e_test')
      await expect(await detailsHelper.getEmailRowFromMetadataTable()).toEqual('Lisch.batanina@gmail.com')
      await expect(await detailsHelper.getNameRowFromMetadataTable()).toEqual('beardedwhale')
      await expect(await detailsHelper.getDateRowFromMetadataTable()).toContain('Tue Apr 21')
      await expect(await detailsHelper.getShaRowFromMetadataTable()).not.toEqual('')
      await expect(await detailsHelper.getIsDirtyRowFromMetadataTable()).toEqual('True')

    })

    it('check successfully built', async () => {
      await detailsHelper.clickOnShowBuildLogsButton()
      await expect(await detailsHelper.getLogsText()).toContain('Successfully built')
      await expect(await detailsHelper.getLogsText()).toContain('Successfully tagged adult_monitoring_test')

    })

    }
  )

});
