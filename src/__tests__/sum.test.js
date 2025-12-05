describe('smoke suite', () => {
  it('suma básica', () => {
    const sum = (a, b) => a + b;
    expect(sum(2, 3)).toBe(5);
  });
});
