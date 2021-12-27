from odoo import api, fields, models


class dFormatModelTest(models.Model):
    _name = 'd.format'

    name = fields.Char(string='Name')
    currency_id = fields.Many2one(comodel_name='res.currency', string='currency')
    float_field = fields.Float(string='Float')
    monetary_field = fields.Monetary(string='Monetary')
    line_ids = fields.One2many(comodel_name='d.format.line', inverse_name='format_id', string='Format Line')
    
    
class dFormatModelTestLine(models.Model):
    _name = 'd.format.line'

    name = fields.Char(string='Name')
    currency_id = fields.Many2one(comodel_name='res.currency', string='currency')
    float_field = fields.Float(string='Float')
    monetary_field = fields.Monetary(string='Monetary')
    format_id = fields.Many2one(comodel_name='d.format', string='Format')
    