import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  
  
  it('create an instance', () => {
    const pipe = new StrengthPipe();
    expect(pipe).toBeTruthy();
  });

  it('check the strength of the number', () => {
    const pipe = new StrengthPipe();
    let result = pipe.transform(4);
    expect(result).toBe('weak');
  })



});
