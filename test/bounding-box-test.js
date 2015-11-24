var tape = require("tape"),
    geoTiles = require("../");

tape("tileToBoundingBox can calculate bounding box for given tile coords", function(test) {

  var bb = geoTiles.tileToBoundingBox(1207, 1539, 12);
  bb = bb.map(function(dd) { return dd.map(function(d) { return d.toFixed(5) }) })

  test.deepEqual(
    bb,
    [ [ '-73.91602', '40.78054' ], [ '-73.82813', '40.71396' ] ]
  );

  test.end();
});
