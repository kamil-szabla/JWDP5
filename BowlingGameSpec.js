describe("Bowling game", function () {
  let game;

  beforeEach(function () {
    game = new BowlingGame();
  });

  function rollMany(n, pins) {
    for (let i = 0; i < n; i++) {
      game.roll(pins);
    }
  }

  it("should properly calculate a gutter game", function () {
    rollMany(20, 0);
    expect(game.score()).toEqual(0);
  });

  it("should properly calculate strike", function () {
    rollMany(20, 10);
    expect(game.score()).toBeGreaterThan(10);
  });

  it("should properly calculate spare", function () {
    rollMany(20, 20);
    expect(game.score()).toEqual(400);
  });
});
