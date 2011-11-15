/**
 * Module dependencies
 */
var _ = require('underscore');

/**
 * Sluggable
 */

function sluggable(options) {
  options = options || {};
  var key        = options.key || 'slug'
    , properties = _.extend({}, { type: String, lowercase: true, trim: true, unique: true }, options.properties)
    , source     = options.source || 'title';
    
  return function sluggable(schema) {
    // create the slug key
    var obj = {};
    obj[key] = properties;
    
    // add slug key to schema
    schema.add(obj);
    
    // set the slug
    schema.path(key).set(function(v) {
      // to lowercase
      v = v.toLowerCase();
      
      // replace special chars
      var from = "àáäâèéëêìíïîòóöôùúüûñç";
      var to   = "aaaaeeeeiiiioooouuuunc";
      for (var i = 0, l = from.length; i < l; i++) {
        v = v.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }
      
      // replace invalid characters
      v = v.replace(/[^a-z0-9]/g, '').replace(/-+/g, '');
      
      // replace whitespaces
      v = v.replace(/\s+/g, '-');
      
      // limit length
      v = v.substr(0, 255);
      
      return v;
    });
  }
};


// Hook into CommonJS module systems
if (typeof module !== 'undefined' && "exports" in module) {
  module.exports = sluggable;
}