import os

DATABASE = os.getenv('DATABASE_URL')
SECRET_KEY = os.urandom(24)
