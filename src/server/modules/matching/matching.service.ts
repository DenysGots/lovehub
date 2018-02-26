/**
 * Created by Crofty on 2/19/18.
 */
import {Component} from '@nestjs/common';
@Component()
export class MatchingServiceComponent {
  matchUsers() {
    return [{
      image: 'https://media.gettyimages.com/photos/young-boy-in-a-park-picture-id499760879?b=1&k=6&m=499760879&s=612x612&w=0&h=nUALHJt25IR8yXbpNq4rQi24pUmN8ipjxxdOu2pIckE=',
      name: 'John Doe',
      description: 'Some example text some example text. John Doe is an architect and engineer'
    }];
  }
  private matching(example, list) {
  if (!list) {
    return [];
  }
  return Array.prototype.filter.call(list, function matches(obj) {
    if (!obj) {
      return;
    }
    for (const p in example) {
      if (obj[p] !== example[p]) {
        return;
      }
    }
    return true;
  });
};
}

