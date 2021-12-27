odoo.define('d_format.WidgetD', function (require) {
    "use strict";
    const AbstractField = require('web.AbstractField');
    const FieldRegistry = require('web.field_registry');
    var session = require('web.session');
    var core = require('web.core');
    var qweb = core.qweb;

    var WidgetD = AbstractField.extend({
        template: 'WidgetFormatTemplate',
        supportedFieldTypes: ['float', 'monetary'],
        resetOnAnyFieldChange: true,
        events: { // jquery event
            'keyup #input_int': 'keyup_action',
            'focusout #input_int': 'focusout_action',
            'focusin #input_int': 'focusin_action'
        },
        show_currency_symbol: false,
        init: function () {
            this._super.apply(this, arguments);
            this._setCurrency();
            if (this.nodeOptions.show_currency_symbol) {
                this.show_currency_symbol = this.nodeOptions.show_currency_symbol;
            }
            this.formatOptions.currency = this.currency;
        },
        _setCurrency: function () {
            var currencyField = this.nodeOptions.currency_field || this.field.currency_field || 'currency_id';
            var currencyID = this.record.data[currencyField] && this.record.data[currencyField].res_id;
            this.currency = session.get_currency(currencyID);
            this.formatOptions.currency = this.currency; // _formatValue() uses formatOptions
        },
        valueString: function () {
            var strval = this.value.toString();
            return strval.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        to_format: function () {
            var input = this.$el.find("#input_int").val();
            var myArray = input.split(",");
            var text = "";
            for (let i = 0; i < myArray.length; i++) {
                text += myArray[i];
            }
            return { unformat: text, formated: text.replace(/\B(?=(\d{3})+(?!\d))/g, ",") };
        },
        keyup_action: function () {
            this.$el.find("#input_int").val(this.to_format().formated);
        },
        focusout_action: function () {
            var val = this.to_format()
            this._setValue(val.unformat);
            this.$el.find("#input_int").val(val.formated);
        },
        focusin_action: function () {
            this.$el.find("#input_int").val(this.to_format().formated);
        },
        _render: function () {
            this.$el.html($(qweb.render(this.template, { 'widget': this })));
        },
        _reset: function () {
            this._super.apply(this, arguments);
            this._setCurrency();
        },
    });

    FieldRegistry.add('d_format', WidgetD);

    return WidgetD;
});
