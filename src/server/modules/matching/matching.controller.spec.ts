import { MatchingController } from './matching.controller';
import {MatchingServiceComponent} from './matching.service';

describe('matching.controller', function() {

  it('root get', () => {

    const matchingController = new MatchingController(new MatchingServiceComponent());

    expect(matchingController.matching()).toEqual([{
      message: 'Hello World!'
    }]);
  });
});
