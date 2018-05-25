import { buildFormattedRoute, formatRoute, generateRoute } from '../../src/utils/routes';

describe('Route Utils', () => {
  describe('buildFormattedRoute', () => {
    it('should pluralize the collection modelName and keep the modelName singular', () => {
      const config = {
        modelName: 'image',
      };

      const expected = {
        model: 'image',
        collection: 'images',
        any: '',
      };

      expect(buildFormattedRoute(config)).toEqual(expected);
    });

    it('should pluralize the collection modelName and keep the modelName singular regardless of casing', () => {
      const config = {
        modelName: 'LargeModel',
      };

      const expected = {
        model: 'LargeModel',
        collection: 'LargeModels',
        any: '',
      };

      expect(buildFormattedRoute(config)).toEqual(expected);
    });
  });

  describe('formatRoute', () => {
    it('should format a route with kebab-case', () => {
      expect(formatRoute('simpleroute')).toEqual('simpleroute');
      expect(formatRoute('aKebabCaseRoute')).toEqual('a-kebab-case-route');
      expect(formatRoute('OneMoreOne')).toEqual('one-more-one');
    });

    it('should replace the default delimiter with a custom one', () => {
      expect(formatRoute('aKebabCaseRoute', '_')).toEqual('a_kebab_case_route');
      expect(formatRoute('OneMoreOne', '~')).toEqual('one~more~one');
    });
  });

  describe('generateRoute', () => {
    it('should generate a proper model and collection', () => {
      const config = {
        modelName: 'fooBar',
        routes: {
          model: '',
          collection: '',
          any: '',
        },
      };

      expect(generateRoute('model', config)).toEqual('foo-bar');
      expect(generateRoute('collection', config)).toEqual('foo-bars');
    });

    it('will ignore the modelName if routes are overridden', () => {
      const config = {
        modelName: 'fooBar',
        routes: {
          model: 'chimichanga',
          collection: 'foos',
          any: '',
        },
      };

      expect(generateRoute('model', config)).toEqual('chimichanga');
      expect(generateRoute('collection', config)).toEqual('foos');
    });

    it('will keep the casing if caseSensitive is set to true', () => {
      const config = {
        modelName: 'oneLastFooBar',
        routes: {
          model: '',
          collection: '',
          any: '',
        },
        caseSensitive: true,
      };

      expect(generateRoute('model', config)).toEqual('oneLastFooBar');
      expect(generateRoute('collection', config)).toEqual('oneLastFooBars');
    });
  });
});
