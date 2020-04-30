import peewee as pw
from config.database import db


class Proc_list(db.Model):
    pat = pw.IntegerField(null=False)
    his = pw.IntegerField(null=False)
    doc = pw.IntegerField(null=False)
    dep = pw.IntegerField(null=False)
    date_start = pw.DateField()
    
    class Meta:
        table_name = 'proc_list'
        order_by = ('id')
