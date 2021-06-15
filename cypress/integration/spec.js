beforeEach(() => {
    cy.visit('http://the-internet.herokuapp.com')
    cy.log('Visiting the Home Page')
  })

describe('Home Page', function () {
    it('Visits the Home Page', function () {
        cy.visit('http://the-internet.herokuapp.com')
    })
})

describe('Checkboxes Page', function () {
    it('Visit Checkboxes Page and for each box change to the opposite state then validate changes', function () {
      cy.contains('Checkboxes').click()

      cy.url().should('eq', 'http://the-internet.herokuapp.com/checkboxes')

      cy.contains('checkbox 1')
      cy.get('[type="checkbox"]').first().check()
      //cy.get('[type="checkbox"]').check()
      cy.get('[type="checkbox"]').first().should('be.checked')
      
      cy.contains('checkbox 2')
      cy.get('[type="checkbox"]').last().uncheck()
      cy.get('[type="checkbox"]').last().should('not.be.checked')

      cy.log('Valid checkbox states')
    })
  })

describe('Basic Auth Page', function () {
    it('Visit Basic Auth Page and check functionality with correct credentials', function () {
        cy.contains('Basic Auth (user and pass: admin)').click()
        
        cy.visit('http://the-internet.herokuapp.com/basic_auth', {
            auth: {
                username: 'admin',
                password: 'admin'
            }
        })

        cy.url().should('eq', 'http://the-internet.herokuapp.com/basic_auth')
        cy.contains('Congratulations! You must have the proper credentials.')
        cy.log('login successful')

    })
})

describe('Frames Page', function () {
    it('Visits Frames Page, then iFrame Page and writes my name ["Glenn"] inside the text paragraph', function () {
        cy.contains('Frames').click()
        cy.url().should('eq', 'http://the-internet.herokuapp.com/frames')

        cy.contains('iFrame').click()
        cy.url().should('eq', 'http://the-internet.herokuapp.com/iframe')
        cy.contains('An iFrame containing the TinyMCE WYSIWYG Editor')

        cy.getFrame().clear().type('Glenn')
        cy.getFrame().contains('Glenn')
        cy.log('Name correctly written in textbox - passes')

    })
})

describe('Dynamic Loading Page', function () {
    it('Visits Dynamic Loading Page, then proceeds to the Example 2 Link where the buttom [start] is clicked and ensures the result ["Hello World!"] appears as expected', function () {
        cy.contains('Dynamic Loading').click()
        cy.url().should('eq', 'http://the-internet.herokuapp.com/dynamic_loading')

        cy.contains('Example 2: Element rendered after the fact').click()
        cy.url().should('eq', 'http://the-internet.herokuapp.com/dynamic_loading/2')

        //cy.get('.btn').click()
        cy.contains('Start').click()
        cy.contains('Hello World!')

        cy.log('The string [Hello World!] appears on the webpage as expected')
    })
})

describe('JQueryUI Menu Page', function () {
    it('Visits the JQueryUI Menus Page, then proceeds to click on the menu item [Enabled], followed by [Downloads] and lastly [Excel] before ensuring the excel file [menu.xls] was downloaded successfully and its tax value printed', function () {
        cy.contains('JQuery UI Menus').click()
        cy.url().should('eq', 'http://the-internet.herokuapp.com/jqueryui/menu')

        cy.contains('Enabled').click()
        cy.contains('Downloads').click()
        
        //start excel download

        /*cy.contains('Excel').click()

        //need to install package -> npm install node-xlsx --save-dev
        cy.wait(2000)
        
    
        cy.parseXlsx("/Users/user/Desktop/AutomationDeveloperTask/cypress/downloads/menu.xls").then(
            jsonData => {
              // finally we write the assertion rule to check if that data matches the data we expected the excel file to have.
              expect(jsonData[0].data[0]).to.eqls(data);
            })
        
        if (window.Cypress) {
            setTimeout(() => location.reload(), 3000);
        }*/
        
        const id= "ui-id-8" 
        const href= "/download/jqueryui/menu/menu.xls"
        
        const data = [
            "id",
            "number of items",
            "subtotal",
            "tax",
            "total"
        ]

        document.getElementById('download-file').onclick = function(event) {
            // In test, prevent the browser from actually downloading the file.
            if (window.Cypress) {
              event.preventDefault();
            }
            setupFileOverWebSockets('ABCDEFGH');
        }

        cy.contains('Excel').click().then((anchor) => {
            const url = anchor.prop('href');
            cy.request(url).then(        
                cy.parseXlsx("/Users/user/Desktop/AutomationDeveloperTask/cypress/downloads/menu.xls").then(
                    jsonData => {
                    expect(jsonData[0].data[0]).to.eqls(data);
                }));
          });
    })
})