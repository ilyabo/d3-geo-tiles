var tape = require("tape"),
    geoTiles = require("../");

tape("tiles can produce a list of tiles", function(test) {

  var tiler = geoTiles()
    .size([200, 200])
    .scale(100000)
    .translate([0, 0]);

  var tiles = tiler().tiles;

  test.equal(tiles.length, 9);
  test.deepEqual(
    tiles,
    [
      [ 255, 255, 9 ],
      [ 256, 255, 9 ],
      [ 257, 255, 9 ],
      [ 255, 256, 9 ],
      [ 256, 256, 9 ],
      [ 257, 256, 9 ],
      [ 255, 257, 9 ],
      [ 256, 257, 9 ],
      [ 257, 257, 9 ]
    ]
  );

  test.end();
});



tape("tiles can produce a list of tiles for non-square", function(test) {

  var tiler = geoTiles()
    .size([200, 100])
    .scale(100000)
    .translate([0, 0]);

  var tiles = tiler().tiles;

  test.equal(tiles.length, 6);
  test.deepEqual(
    tiles,
    [ [ 255, 255, 9 ], [ 256, 255, 9 ], [ 257, 255, 9 ],
      [ 255, 256, 9 ], [ 256, 256, 9 ], [ 257, 256, 9 ] ]
  );

  test.end();
});