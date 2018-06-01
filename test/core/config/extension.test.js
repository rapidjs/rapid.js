import { createModel } from '../helpers';

const doc = createModel({
  modelName: 'document',
  extension: 'xml',
});

describe('The extension feature should work', () => {
  it('CRUD works with extension', () => {
    doc.id(23).find();
    expect(doc.debugger.data.lastUrl).toBe('api/document/23.xml');

    doc.id(234).save({});
    expect(doc.debugger.data.lastUrl).toBe('api/document/234/update.xml');

    doc.id(456).destroy();
    expect(doc.debugger.data.lastUrl).toBe('api/document/456/destroy.xml');
  });

  const issue = createModel({
    modelName: 'issue',
    defaultRoute: 'collection',
    extension: 'json',
  });

  it('works with extension', () => {
    issue.get();
    expect(issue.debugger.data.lastUrl).toBe('api/issues.json');

    issue.post();
    expect(issue.debugger.data.lastUrl).toBe('api/issues.json');

    issue.id(234).get();
    expect(issue.debugger.data.lastUrl).toBe('api/issues/234.json');
  });
});
