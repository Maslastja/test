import os
import importlib
from flask import session, redirect
from functools import wraps


def register_bp(app):
    # print(app.import_name)
    # возможно можно использовать import_name т.к. это название папки
    # приложения, в которой находятся все дополнительные папки и файлы

    for address, dirs, files in os.walk(f'{app.import_name}'):
        for d in dirs:
            try:
                # print(f'ADR {address}.{d}')
                module = importlib.import_module(f'{address}.{d}')
                if hasattr(module, 'bp'):
                    bp = module.bp
                    opt = {}
                    if hasattr(module, 'options'):
                        opt = module.options

                    app.register_blueprint(bp, **opt)
            # except (ImportError, TypeError) as e:
            except (ImportError, TypeError):
                # app.logger.exception(e)
                # print(f'{address}.{d}')
                # if d == 'schedule':
                # module = importlib.import_module(f'{address}.{d}')
                continue


# декоратор ограничения использования функций только авториз. пользователей
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.user:
            return redirect('/')
        return f(*args, **kwargs)
    return decorated_function

# # формат времени для шаблонов jinja2
# def format_datetime(value, format='%d.%m.%Y %H:%M'):
    # if value is None:
    # return ''
    # return value.strftime(format)
