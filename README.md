# Zoomable Geo Tiles

This is based on Mike Bostock's [geo tile plugin](https://github.com/d3/d3-plugins/tree/master/geo/tile),
and provides some additional features like spiral tiles ordering and tile coord conversion functions.  


A D3 layout for determining which 256x256 quadtree tiles to display in a rectangular viewport,
based on a scale and translate. This layout can be used to create a simple slippy map, or
render standard map tiles (e.g., MapBox, CloudMade) as a base layer behind a geographic projection. 

# Example usage

    var tiler = geoTiles()
      .size([200, 200])
      .scale(100000)
      .translate([0, 0]);
  
    var tiles = tiler();
    test.equal(tiles.length, 9);
    test.deepEqual(
      tiles.slice(),
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


# More Examples

* [Panning & Zooming](http://bl.ocks.org/mbostock/4132797)
* [Clipping](http://bl.ocks.org/mbostock/4150951)
* [Vector Tiles](http://bl.ocks.org/mbostock/5593150)
* [Raster Tiles & Vector Overlay](http://bl.ocks.org/mbostock/5342063)
