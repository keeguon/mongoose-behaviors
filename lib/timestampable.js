/**
 * Timestampable
 */

function timestampable(options) {
  options = options || {};
  var createdAt  = options.createdAt || 'createdAt'
    , modifiedAt = options.modifiedAt || 'modifiedAt';
    
  return function timestampable(schema) {
    // create the timestamp keys
    var obj = {};
    obj[createdAt]  = { type: Date };
    obj[modifiedAt] = { type: Date };
    schema.add(obj);
    
    // set/update timestamps before save
    schema.pre('save', function(next) {
      // set createdAt timestamp
      if (this.isNew && createdAt) {
        this[createdAt] = Date.now();
      }
      
      // set/update modifiedAt timestamp
      if (modifiedAt) {
        this[modifiedAt] = Date.now();
      }
    });
  }
}


// Hook into CommonJS module systems
if (typeof module !== 'undefined' && "exports" in module) {
  module.exports = timestampable;
}