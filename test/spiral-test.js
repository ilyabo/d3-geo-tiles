var tape = require("tape"),
    geoTiles = require("../");



tape("tiles can sort tiles in a spiral", function(test) {

  var tiler = geoTiles()
    .spiral(true)
    .size([200, 200])
    .scale(100000)
    .translate([0, 0]);

  var tiles = tiler();

  test.equal(tiles.length, 9);
  test.deepEqual(
    tiles,
    [
      [ 256, 256, 9 ],
      [ 257, 256, 9 ],
      [ 257, 255, 9 ],
      [ 256, 255, 9 ],
      [ 255, 255, 9 ],
      [ 255, 256, 9 ],
      [ 255, 257, 9 ],
      [ 256, 257, 9 ],
      [ 257, 257, 9 ]
    ]
  );

  test.end();
});



tape("tiles can sort tiles in a spiral for non-square area", function(test) {

  var tiler = geoTiles()
    .spiral(true)
    .size([200, 100])
    .scale(100000)
    .translate([0, 0]);

  var tiles = tiler();

  test.equal(tiles.length, 6);
  test.deepEqual(
    tiles,
    [ [ 256, 256, 9 ], [ 257, 256, 9 ], [ 257, 255, 9 ],
      [ 256, 255, 9 ], [ 255, 255, 9 ], [ 255, 256, 9 ] ]
  );

  test.end();
});


tape("tiles can sort tiles in a spiral, regression: nowhere to go to the right", function(test) {

  var tiler = geoTiles()
    .spiral(true)
    .size([344, 347])
    .scale(1467570.133233822)
    .translate([-34559.566577928046, 220056.17673242575]);

  var tiles = tiler();

  test.equal(tiles.length, 4);
  test.deepEqual(
    tiles,
    [ [ 2145, 1434, 12 ],
      [ 2145, 1433, 12 ],
      [ 2144, 1433, 12 ],
      [ 2144, 1434, 12 ]  ]
  );

  test.end();
});

