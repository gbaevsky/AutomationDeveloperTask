/* File for handeling the download and converting of an Excel file into a JSON format */

/*cy.get("[data-test-id=export-template-btn")
  .should("be.visible")
  .click();*/

//npm install node-xlsx --save-dev

context('Xlsx file', () => {
    it('Read excel file', () => {
      cy.task('readXlsx', { file: 'my-excel.xlsx', sheet: "Sheet1" }).then((rows) => {
        expect(rows.length).to.equal(543)
        // expect(rows[0]["column name"]).to.equal(11060)
      })
    })
  })

// npm install xlsx