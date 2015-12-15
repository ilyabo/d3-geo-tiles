var tiles = function() {
  var size = [960, 500],
      scale = 256,
      translate = [size[0] / 2, size[1] / 2],
      zoomDelta = 0,
      spiral = false;

  function geoTiles() {
    var t = geoTiles.transform(),
        tiles = [],
        cols = range(Math.max(0, Math.floor(-t.translate[0])), Math.max(0, Math.ceil(size[0] / t.scale - t.translate[0]))),
        rows = range(Math.max(0, Math.floor(-t.translate[1])), Math.max(0, Math.ceil(size[1] / t.scale - t.translate[1])));

    if (spiral) {
      spiralOrder(cols, rows, function(x, y) {
        tiles.push([x, y, t.z]);
      });
    } else {
      rows.forEach(function(y) {
        cols.forEach(function(x) {
          tiles.push([x, y, t.z]);
        });
      });
    }

    return tiles;
  }

  geoTiles.transform = function() {
    var z = Math.max(Math.log(scale) / Math.LN2 - 8, 0),
        z0 = Math.round(z + zoomDelta),
        k = Math.pow(2, z - z0 + 8),
        origin = [(translate[0] - scale / 2) / k, (translate[1] - scale / 2) / k];
    return {
      z: z0,
      scale: k,
      translate: origin 
    };
  };

  geoTiles.size = function(_) {
    if (!arguments.length) return size;
    size = _;
    return geoTiles;
  };

  geoTiles.scale = function(_) {
    if (!arguments.length) return scale;
    scale = _;
    return geoTiles;
  };

  geoTiles.translate = function(_) {
    if (!arguments.length) return translate;
    translate = _;
    return geoTiles;
  };

  geoTiles.zoomDelta = function(_) {
    if (!arguments.length) return zoomDelta;
    zoomDelta = +_;
    return geoTiles;
  };

  geoTiles.spiral = function(_) {
    if (!arguments.length) return spiral;
    spiral = (_ ? true : false);
    return geoTiles;
  };

  return geoTiles;
};



// Utility functions


function spiralOrder(cols, rows, callback) {
  // http://stackoverflow.com/questions/398299/looping-in-a-spiral
  var nx = cols.length, ny = rows.length,
      mx = ~~(nx/2), my = ~~(ny/2),
      x = y = 0,
      dx = 0, dy = -1,
      i, n = Math.max(nx, ny),
      c, r, t;

  for (i = 0; i < n * (n + 1); i++) {
    c = x + mx; r = -y + my;
    if (c >= 0  &&  c < nx  &&  r >= 0  &&  r < ny) {
      callback(cols[c], rows[r]);
    }
    if ((x === y)  ||  (x < 0  &&  x === -y)  ||  (x > 0  &&  x === 1-y)) {
      t = dx;
      dx = -dy;
      dy = t;
    }

    x += dx; y += dy;
  }
}




// Tile coorinates
// http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#ECMAScript_.28JavaScript.2FActionScript.2C_etc..29

// coords -> tile
function long2tile(lon, zoom) {
  return (Math.floor((lon+180)/360*Math.pow(2,zoom)));
}

function lat2tile(lat, zoom)  {
  return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)));
}


// tile -> bounding box
function tile2long(x, z) {
 return (x/Math.pow(2,z)*360-180);
}

function tile2lat(y, z) {
 var n = Math.PI-2*Math.PI*y/Math.pow(2,z);
 return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
}





tiles.locationToTile = function(lat, lon, zoom) {
  return {
    x: long2tile(lon, zoom),
    y: lat2tile(lon, zoom),
    z: zoom
  };
};

tiles.tileToBoundingBox = function(x, y, z) {
  return [
    [tile2long(x, z), tile2lat(y, z)],
    [tile2long(x + 1, z), tile2lat(y + 1, z)]
  ];
};


function range(a, b) {
  var i, values = [];
  for (i = a; i < b; i++) values.push(i);
  return values;
}


module.exports = tiles;
