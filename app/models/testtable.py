import peewee as pw
from config.database import db


class Test(db.Model):
    lp = pw.CharField(null=False)
    data1 = pw.DateField()
    data2 = pw.DateField()
    dayscount = pw.IntegerField(null=False)
    schema = pw.CharField(null=False)

    class Meta:
        table_name = 'testtable'
        order_by = ('id')

    def __str__(self):
        return self.teststr
