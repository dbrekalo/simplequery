var assert = require('chai').assert;
var $ = require('../src/utils');

describe('Utils', function() {

    it('isEmptyObject checks if object is empty', function() {

        assert.isTrue($.isEmptyObject({}));
        assert.isFalse($.isEmptyObject({foo: 'bar'}));

    });

    it('isNumeric checks if argument is numeric', function() {

        assert.isTrue($.isNumeric('-10'));
        assert.isTrue($.isNumeric('0'));
        assert.isTrue($.isNumeric(0xFF));
        assert.isTrue($.isNumeric('0xFF'));
        assert.isTrue($.isNumeric('8e5'));
        assert.isTrue($.isNumeric('3.1415'));
        assert.isTrue($.isNumeric(+10));

        assert.isFalse($.isNumeric('-0x42'));
        assert.isFalse($.isNumeric('7.2acdgs'));
        assert.isFalse($.isNumeric(''));
        assert.isFalse($.isNumeric({}));
        assert.isFalse($.isNumeric(NaN));
        assert.isFalse($.isNumeric(null));
        assert.isFalse($.isNumeric(true));
        assert.isFalse($.isNumeric(Infinity));
        assert.isFalse($.isNumeric(undefined));

    });

    it('contains checks if container contains element', function() {

        var container = document.createElement('div');

        container.innerHTML = '<div><div><span></span></div></div>';

        assert.isTrue($.contains(container, $(container).find('span').get(0)));
        assert.isFalse($.contains(container, $('<span></span>').get(0)));

    });

    it('param creates a serialized representation', function() {

        assert.equal($.param({foo: 'bar'}), 'foo=bar');
        assert.equal($.param({foo: 'b a r'}), 'foo=b%20a%20r');
        assert.equal($.param({foo: 'foo', bar: 'bar'}), 'foo=foo&bar=bar');
        assert.equal($.param([{name: 'foo', value: 'bar'}]), 'foo=bar');

    });

    it('serializeArray and serialize creates a representation of form element values', function() {

        var $el = $(
            '<form>'+
                '<input type="text" name="input" value="inputValue" />' +
                '<input disabled type="text" name="disabledInput" value="disabledInputValue" />' +
                '<textarea name="textarea">textareaValue</textarea>' +
                '<input type="checkbox" name="checkbox" value="checkboxValue" checked />' +
                '<input type="radio" name="radio" value="radioValue" checked />' +
                '<input type="radio" name="radio" value="secondRadioValue" />' +
                '<select name="selectOne">'+
                    '<option value="selectValue"></option>'+
                    '<option selected value="secondSelectValue"></option>'+
                '</select>' +
                '<select name="selectMultiple" multiple>'+
                    '<option selected value="selectValue"></option>'+
                    '<option selected value="secondSelectValue"></option>'+
                '</select>' +
            '</form>'
        );

        var expectedData = [
            {name: 'input', value: 'inputValue'},
            {name: 'textarea', value: 'textareaValue'},
            {name: 'checkbox', value: 'checkboxValue'},
            {name: 'radio', value: 'radioValue'},
            {name: 'selectOne', value: 'secondSelectValue'},
            {name: 'selectMultiple', value: ['selectValue', 'secondSelectValue']}
        ];

        assert.deepEqual($el.serializeArray(), expectedData);
        assert.equal($el.serialize(), $.param(expectedData));

        assert.deepEqual($(
            '<input type="text" name="input" value="inputValue" />'
        ).serializeArray(), [{name: 'input', value: 'inputValue'}]);

    });

    it('parseJSON delegates to JSON.parse', function() {

        assert.deepEqual($.parseJSON('{"foo": "bar"}'), {foo: 'bar'});

    });

});
