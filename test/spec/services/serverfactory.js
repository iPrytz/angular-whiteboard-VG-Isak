'use strict';

describe('Service: serverFactory', function () {

  // load the service's module
  beforeEach(module('whiteboardApp'));

  // instantiate service
  var serverFactory;
  beforeEach(inject(function (_serverFactory_) {
    serverFactory = _serverFactory_;
  }));

  it('should do something', function () {
    expect(!!serverFactory).toBe(true);
  });

});
