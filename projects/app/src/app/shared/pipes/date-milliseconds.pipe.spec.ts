import { DateMillisecondsPipe } from './date-milliseconds.pipe';

describe('DateMillisecondsPipe', () => {
  it('create an instance', () => {
    const pipe = new DateMillisecondsPipe();
    expect(pipe).toBeTruthy();
  });
});
