/**
 * @module ember-flexberry-geolocation
 */

import Ember from 'ember';

/**
 * Service for geolocation.
 *
 * @class Geolocation
 * @extends Ember.Service
 * @public
 */
export default Ember.Service.extend({
  /**
   * Gets current location.
   *
   * @method getCurrentPosition
   * @return Ember.RSVP.Promise
   */
  getCurrentPosition(options) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this._getGeolocation().getCurrentPosition(resolve, reject, options);
    });
  },

  /**
   * Watchs current location.
   * Returns current position when a change in position is detected.
   *
   * @method watchPosition
   * @return {Integer} Identifier of the watcher.
   */
  watchPosition(resolve, reject, options) {
    return this._getGeolocation().watchPosition(resolve, reject, options);
  },

  /**
   * Current geolocation source.
   *
   * @private
   */
  _geolocation: undefined,

  /**
   * Gets current geolocation source using DI or standard `navigator.geolocation`.
   *
   * @private
   */
  _getGeolocation() {
    if (this._geolocation !== undefined) {
      return this._geolocation;
    }

    let source = this.get('flexberry-geolocation-source');

    if (!source && navigator && navigator.geolocation) {
      source = navigator.geolocation;
    }

    if (!source) {
      throw new Error('Geolocation source is not defined.');
    }

    return this._geolocation = source;
  }
});
