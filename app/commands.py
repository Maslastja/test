import os
import click
import app.models as models
import subprocess as sp
from flask.cli import AppGroup
from config.database import db as database
from config import settings
from playhouse.db_url import connect, parse


dbase = AppGroup('db')

def check_db():
    db = connect(settings.DATABASE)
    try:
        db.connect()
        # print('database exist')
        return True
    except Exception:
        print("database doesn't exist")
        return False


@dbase.command()
def test():
    """Check exist database"""
    check_db()


@dbase.command()
def shell_db():
    db_type = settings.DATABASE.split(':')[0]
    params = parse(settings.DATABASE)
    if db_type.startswith('postgres'):
        command = 'psql'
    else:
        sp.run(('sqlite3', params['database']))
        return

    env = os.environ.copy()
    command += ' --host={host} --port={port}'.format(**params)
    command = command.format(**params).split()
    if params.get('user'):
        command.append('--user={user}'.format(**params))
        if params.get('password'):
            env['PGPASSWORD'] = params['password']
    command.append(params['database'])
    sp.run(command, env=env)


@dbase.command()
def create_all_tabs():
    """Creating tables in database by all models in app"""
    if check_db():
        ArModels = models.all_models()
        print(ArModels)
        database.database.create_tables(ArModels)


@dbase.command()
@click.argument('name')
def create_table(name):
    """Create table in database"""
    if check_db():
        mod = models.one_model(name)
        if mod is not None:
            mod.create_table()
        else:
            print('таблица не существует')
