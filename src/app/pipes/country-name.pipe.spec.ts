import { CountryNamePipe } from './country-name.pipe';

describe('CountryNamePipe', () => {
  it('create an instance', () => {
    const pipe = new CountryNamePipe();
    expect(pipe).toBeTruthy();
  });
});
