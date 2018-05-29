// @ts-check
export function UrlMixin(Rapid) {
  /**
   * Set the URL params
   *
   * @param {Array} urlParams
   * @param {Boolean} prepend
   * @param {Boolean} overwrite
   * @return {Rapid}
   */
  Rapid.prototype.setUrlParams = function setUrlParams(
    urlParams = [],
    prepend = false,
    overwrite = false,
  ) {
    this.urlParams = this.urlParams || [];

    if (!Array.isArray(urlParams)) {
      urlParams = [urlParams];
    }

    if (overwrite) {
      this.urlParams = urlParams;

      return this;
    }

    if (prepend) {
      this.urlParams = urlParams.concat(this.urlParams);
    } else {
      this.urlParams = this.urlParams.concat(urlParams);
    }

    return this;
  };

  /**
   * Set the URL params normally
   *
   * @param {array} params
   * @return {this}
   */
  Rapid.prototype.url = function url(...params) {
    this.setUrlParams(...params);

    return this;
  };

  /**
   * Set the URL params, but prepending
   *
   * @param {Array} params
   * @return {this}
   */
  Rapid.prototype.prepend = function prepend(params) {
    this.setUrlParams(params, true);

    return this;
  };

  /**
   * Set the URL params, but appending them
   *
   * @param {Array} params
   * @return {this}
   */
  Rapid.prototype.append = function append(params) {
    this.setUrlParams(params);

    return this;
  };
}
