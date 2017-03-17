import test from 'ava';
import Rapid from './../resources/assets/js/Interface/Rapid/Rapid';

test.todo('that a base url and config will work');


class BaseModel extends Rapid {
    boot () {
        this.baseURL = 'http://myapi.com/api';
    }
}


test('adding a baseURL from an extended base model works', t => {
    var Rapinado = new BaseModel({ modelName: 'Rapinado', debug: true });

    Rapinado.get('apples');

    t.is('http://myapi.com/api/rapinado/apples', Rapinado.debugger.data.lastUrl);

});
