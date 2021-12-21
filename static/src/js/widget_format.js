odoo.define('tutorial_javascript.d_format', function (require) {
    "use strict";
    const AbstractField = require('web.AbstractField');
    const FieldRegistry = require('web.field_registry');
    var core = require('web.core');
    var qweb = core.qweb;

    var WidgetD = AbstractField.extend({
        template: 'WidgetFormatTemplate',
        events: { // jquery event
            'keyup #input_int': 'keyup_action',
            'focusout #input_int': 'focusout_action',
            'focusin #input_int': 'focusin_action'
        },
        valueString:function (){
            var strval = this.value.toString();
            return strval.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        to_format: function () {
            var input = $("#input_int").val();
            var myArray = input.split(",");
            console.log(myArray);
            var text = "";
            for (let i = 0; i < myArray.length; i++) {
                text += myArray[i];
            }
            console.log(text);
            return { unformat: text, formated: text.replace(/\B(?=(\d{3})+(?!\d))/g, ",") };
        },
        keyup_action: function () {
            $("#input_int").val(this.to_format().formated);
        },
        focusout_action: function () {
            var val = this.to_format()
            console.log(this);
            this._setValue(val.unformat);
            $("#input_int").val(val.formated);
        },
        focusin_action: function () {
            $("#input_int").val(this.to_format().formated);
        },
        _render: function () {
            this.$el.html($(qweb.render(this.template, { 'widget': this })));
        },
    });

    FieldRegistry.add('d_format', WidgetD);

    return WidgetD;
});