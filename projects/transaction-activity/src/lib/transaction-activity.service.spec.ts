import { TestBed } from '@angular/core/testing';

import { TransactionActivityService } from './transaction-activity.service';

describe('TransactionActivityService', () => {
  let service: TransactionActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
