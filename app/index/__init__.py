from flask import Blueprint
from . import views

bp = Blueprint('index', __name__, template_folder='templates')

bp.add_url_rule('/', view_func=views.start_page, methods=['GET', 'POST'])

bp.add_url_rule('/lp', view_func=views.lp_page, methods=['GET', 'POST'])
bp.add_url_rule('/table', view_func=views.table_page, methods=['GET', 'POST'])
bp.add_url_rule('/analis', view_func=views.analis_page, methods=['GET', 'POST'])
