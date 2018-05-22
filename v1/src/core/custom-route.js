class CustomRoute {
  constructor (route = {}, config = {}) {
    // setup the default route object
    this.route = Object.assign({
      url: '',
      type: 'get',
      name: '',
    }, route);

    // setup the default config
    this.config = Object.assign({
      routeParams: {},
    }, config);
  }

  /**
   * This replaces any interpolated params with items passed in via the routeParams object
   *
   * @return {String}
   */
  replaceURLParams () {
    let url = this.rawURL;

    // only do this if we have route params && params to replace
    if (this.urlParams.length && Object.keys(this.config.routeParams).length !== 0) {
      // replace each occurrence of the param with the value passed in
      this.urlParams.forEach((param) => {
        url = url.replace(`{${param}}`, this.config.routeParams[param]);
      });
    }

    return url;
  }

  /**
   * Check if the url has interpolated {} in them
   *
   * @return {Array}
   */
  get urlParams () {
    // eslint-disable-next-line
        let params = this.rawURL.match(/{\s*[\w\.]+\s*}/g);

    // if we have params, strip off the {}
    if (params !== null) {
      return params.map(x =>
        // eslint-disable-next-line
                 x.match(/[\w\.]+/)[0]);
    }

    return [];
  }

  /**
   * Returns the properly prepared URL
   *
   * @return {String}
   */
  get url () {
    return this.replaceURLParams();
  }

  /**
   * Returns the raw url from the route which would
   * contain any interpolations
   *
   * @return {String}
   */
  get rawURL () {
    return this.route.url;
  }

  /**
   * Returns the route name
   *
   * @return {String}
   */
  get name () {
    return this.route.name;
  }

  /**
   * Returns the request type
   *
   * @return {String}
   */
  get type () {
    return this.route.type;
  }
}

export default CustomRoute;
