from flask import render_template, request, redirect, url_for, jsonify
import json
from datetime import date
from app.models.proc_list import Proc_list
from app.models.lp_list import Lp_list
from app.models.lp_intervals import Lp_intervals
from wtfpeewee.orm import model_form
from wtforms.validators import (DataRequired, InputRequired)

inp_method = {1: 'табл.', 2: 'в/в', 3: 'в/м', 4: 'п/к'}

# Form = model_form(
#     Proc_list,
#     field_args={
#         'lp': dict(
#             label='lec',
#             render_kw={'class': 'form-input', 'type': 'text'},
#             validators=[DataRequired('значение не заполнено')]),
#         'data1': dict(
#             label='дата нач приема',
#             render_kw={'class': 'form-input', 'type': 'date'},
#             validators=[DataRequired('значение не заполнено')]),
#         'data2': dict(
#             label='дата ок приема',
#             render_kw={'class': 'form-input', 'type': 'date'}),
#         'schema': dict(
#             # label='схема',
#             render_kw={'id': 'schema', 'class': 'form-input',
#                        'type': 'text', 'style': 'display: none'},
#             validators=[DataRequired('не указано вреемя приема')]),
#         'dayscount': dict(
#             label='kol-vo',
#             render_kw={'class': 'form-input', 'type': 'number'},
#             validators=[DataRequired('значение не заполнено')]),
#     })


def start_page():
    # form = Form(request.form or None)
    # if form.data2.data == '':
    #    form.data2.data = date(1,1,1)
    # print(form.data2.data)
    id_pat = 123
    his = 123
    lists = get_pl_by_pat(id_pat, his)
    if request.method == 'POST':
        return redirect(url_for('index.lp_page'))
    return render_template('index.html', title='Процедурный лист', lists=lists)


def lp_page():
    pl=''
    id = request.args.get('id')
    if (request.method == 'GET') and id:
        # получение данных по проц листу
        pl = get_pl_by_id(id)
        #pl = json.dumps({'pl': pl})
        # print(pl)
    # form = Form(request.form or None)
    # if form.data2.data == '':
    #    form.data2.data = date(1,1,1)
    # print(form.data2.data)
    if request.method == 'POST':
        # pass
        # print(request.form)
        proc_list = json.loads(request.form['proc_list'])
        print(proc_list)
        
        id = save_el(proc_list)
       # print(a['lp'])
        # or k in a['lp']:
        #    print(a['lp'][k])
        return jsonify({'url': url_for('index.lp_page', id=id)})
    return render_template('proc_list.html', title='Процедурный лист',
                           inp_method=inp_method, today=date.today(),
                           pl=pl)


def table_page():
    if request.method == 'POST':
        pass
    return render_template('table.html', title='Процедурный лист')


def analis_page():
    if request.method == 'POST':
        pass
    return render_template('analis.html', title='Процедурный лист')


def pr_list():
    # form = Form(request.form or None)
    # if form.data2.data == '':
    #    form.data2.data = date(1,1,1)
    # print(form.data2.data)
    if request.method == 'POST':
        pass
        # save_el()
        #print(json.loads(request.data))
        #a = json.loads(request.form['schema'])
        # for k in a:
        #    print(a[k]['time1'])
        # redirect(url_for('index.start_page'))
    return render_template('pr_list.html', title='Процедурный лист')


def save_el(proc_list):
    if proc_list['id'] != 'null':
        (Proc_list
         .update(pat=proc_list['pat'],
                 his=proc_list['his'],
                 date_start=proc_list['date_start'],
                 doc=proc_list['doc'],
                 dep=proc_list['dep'])
         .where(Proc_list.id == proc_list['id'])
         .execute())
        el = proc_list['id']
    else:    
        el = Proc_list(pat=proc_list['pat'],
                       his=proc_list['his'],
                       date_start=proc_list['date_start'],
                       doc=proc_list['doc'],
                       dep=proc_list['dep'])
        el.save()

    if proc_list['id'] == 'null': #временное ограничение на запись уже сущ проц листа
        for elem in proc_list['lp']:
            lp = proc_list['lp'][elem]
            # new_el_lp = Lp_list(proc_list=new_el,
            #                     lp_name=lp['name'],
            #                     lp_id=lp['id'],
            #                     date_start=lp['date_start'],
            #                     days=lp['days_count'])
            new_el_lp = Lp_list(proc_list=el,
                                lp_name=lp['name'],
                                date_start=lp['date_start'],
                                days=lp['days_count'])
            new_el_lp.save()

            for t in lp['times']:
                new_el_t = Lp_intervals(lp=new_el_lp,
                                time_start=t['time1'],
                                time_end=t['time2'],
                                doza=t['doza'],
                                method=t['method'])
                new_el_t.save()

    return el


def get_pl_by_id(id):
    query = (Proc_list
            .select()
            .where(Proc_list.id == id)
            .namedtuples())
    for elem in query:
        pl = {
                'id': elem.id,
                'pat': elem.pat,
                'his': elem.his,
                'doc': elem.doc,
                'dep': elem.dep,
                'date_start': elem.date_start.strftime('%Y-%m-%d'),
                'lp': get_lp_by_pl_id(id)
                }  
    return pl 


def get_lp_by_pl_id(id):
    query = (Lp_list
            .select()
            .where(Lp_list.proc_list == id)
            .order_by(Lp_list.id)
            .namedtuples())
    
    lp = {}
    i = 0
    for elem in query:
        lp[i] = {
                 'id': elem.id,
                 'name': elem.lp_name,
                 'date_start': elem.date_start.strftime('%Y-%m-%d'),
                 'days_count': elem.days,
                 'times': get_times(elem.id)
                 }
        i = i+1

    return lp


def get_times(id):
    query_t = (Lp_intervals
            .select()
            .where(Lp_intervals.lp == id)
            .order_by(Lp_intervals.id)
            .namedtuples())

    times = []
    # i = 0
    for elem in query_t:
        # i = i+1
        times.append({
                    'id': elem.id,
                    'time1': elem.time_start,
                    'time2': elem.time_end,
                    'doza': elem.doza,
                    'method': elem.method
                    })

    return times


def get_pl_by_pat(id_pat, his):
    query = (Proc_list
            .select()
            .where((Proc_list.pat == id_pat) &
                   (Proc_list.his == his))
            .namedtuples())
    pl = []
    for elem in query:
        pl.append({
            'id': elem.id,
            'doc': elem.doc,
            'dep': elem.dep,
            'date_start': elem.date_start.strftime('%Y-%m-%d')
            })
    # print(pl)
    return pl
