var tape = require("tape"),
    geoTiles = require("../");

tape("tileToBoundingBox can calculate bounding box for given tile coords", function(test) {

  var bb = geoTiles.tileToBoundingBox(1207, 1539, 12);
  test.deepEqual(
    bb,
    [ [ -73.916015625, 40.78054143186031 ], [ -73.828125, 40.71395582628604 ] ]
  );

  test.end();
});
