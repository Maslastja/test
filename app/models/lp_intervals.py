import peewee as pw
from config.database import db
from app.models.lp_list import Lp_list

class Lp_intervals(db.Model):
    lp = pw.ForeignKeyField(Lp_list, null=False)
    time_start = pw.DateField()
    time_end = pw.DateField()
    doza = pw.CharField(null=False)
    method = pw.IntegerField(null=False)
    
    class Meta:
        table_name = 'lp_intervals'
        order_by = ('id')
