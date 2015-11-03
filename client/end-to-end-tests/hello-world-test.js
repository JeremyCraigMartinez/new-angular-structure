// spec.js
describe('Protractor Demo App', function() {
  it('should have a title', function() {
    browser.get('http://localhost:9000/');

    expect(browser.getTitle()).toEqual('AngularJS: UI-Router Quick Start');
  });
});
