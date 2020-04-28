from flask import render_template, request, redirect, url_for
import json
from datetime import date
from app.models.testtable import Test
from wtfpeewee.orm import model_form
from wtforms.validators import (DataRequired, InputRequired)

inp_method = {1: 'табл.', 2: 'в/в', 3: 'в/м', 4: 'п/к'}

Form = model_form(
    Test,
    field_args={
        'lp': dict(
            label='lec',
            render_kw={'class': 'form-input', 'type': 'text'},
            validators=[DataRequired('значение не заполнено')]),
        'data1': dict(
            label='дата нач приема',
            render_kw={'class': 'form-input', 'type': 'date'},
            validators=[DataRequired('значение не заполнено')]),
        'data2': dict(
            label='дата ок приема',
            render_kw={'class': 'form-input', 'type': 'date'}),
        'schema': dict(
            # label='схема',
            render_kw={'id': 'schema', 'class': 'form-input',
                       'type': 'text', 'style': 'display: none'},
            validators=[DataRequired('не указано вреемя приема')]),
        'dayscount': dict(
            label='kol-vo',
            render_kw={'class': 'form-input', 'type': 'number'},
            validators=[DataRequired('значение не заполнено')]),
    })


def lp_page():
    form = Form(request.form or None)
    # if form.data2.data == '':
    #    form.data2.data = date(1,1,1)
    # print(form.data2.data)
    if request.method == 'POST':
        pass
        # save_el()
        # print(json.loads(request.data))
        #a = json.loads(request.form['schema'])
        # for k in a:
        #    print(a[k]['time1'])
        # redirect(url_for('index.start_page'))
    return render_template('index.html', title='Процедурный лист', form=form,
                           inp_method=inp_method)


def table_page():
    form = Form(request.form or None)
    # if form.data2.data == '':
    #    form.data2.data = date(1,1,1)
    # print(form.data2.data)
    if request.method == 'POST':
        # save_el()
        print(json.loads(request.data))
        #a = json.loads(request.form['schema'])
        # for k in a:
        #    print(a[k]['time1'])
        # redirect(url_for('index.start_page'))
    return render_template('table.html', title='Процедурный лист', form=form)


def analis_page():
    form = Form(request.form or None)
    # if form.data2.data == '':
    #    form.data2.data = date(1,1,1)
    # print(form.data2.data)
    if request.method == 'POST':
        # save_el()
        print(json.loads(request.data))
        #a = json.loads(request.form['schema'])
        # for k in a:
        #    print(a[k]['time1'])
        # redirect(url_for('index.start_page'))
    return render_template('analis.html', title='Процедурный лист', form=form)


def save_el():
    lp = Test(lp=text,
              typenews=form.typenews.data,
              name=form.name.data,
              isactive=form.isactive.data,
              createdate=d,
              changedate=d,
              user=session.user.id)
    news.save()
    redirect(url_for('index.start_page'))
