import os
from flask import Flask, render_template, request, redirect, session
from werkzeug.exceptions import NotFound
from config.database import db
from app.utils import register_bp
# from app.auth import MySessionInterface
# from app.sessions import MyDatabaseSessionInterface


def create_app():
    app = Flask('app', root_path=os.getcwd(),
                static_folder='static',
                template_folder='app/templates')
    app.config.from_object('config.settings')
    db.init_app(app)
    register_bp(app)
    if not app.debug:
        logapp(app)

#    app.session_interface = MySessionInterface()
    # app.jinja_env.filters['formatdatetime'] = format_datetime

    @app.before_request
    def before_request():
        # print(session)
        bp = request.blueprint or request.endpoint
        if bp in ('auth', 'static'):
            return
        if bp == 'admin' and not session.user:
            return redirect('/')

    if not app.debug:
        @app.errorhandler(Exception)
        def handle_error(e):
            if type(e) == NotFound:
                code = 404
            else:
                code = 500
            return render_template(f'{str(code)}.html'), code

    return app
