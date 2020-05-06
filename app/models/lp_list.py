import peewee as pw
from config.database import db
from app.models.proc_list import Proc_list

class Lp_list(db.Model):
    proc_list = pw.ForeignKeyField(Proc_list, null=False)
    lp_name = pw.CharField(null=False)
    lp_id = pw.IntegerField(null=True)
    date_start = pw.DateField()
    days = pw.IntegerField(null=False)
    
    class Meta:
        table_name = 'lp_list'
        order_by = ('id')
