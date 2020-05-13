function add_lp_button(val, owner, id_db = null, active=true){
	let div_r_b = document.createElement('div');
	div_r_b.className = 'row';
	div_r_b.id = 'row_'+owner;
	let div_b = document.createElement('div');
	div_b.className = 'col-md-10';
	let b = document.createElement('button');
	if (active) {
		b.className = 'list-group-item active';
	} else {
		b.className = 'list-group-item';
	}
	b.type = 'button';
	b.id = owner;     
	b.innerHTML = val;
	b.setAttribute('onclick', 'click_lp()');
	b.setAttribute('id-db', id_db);
	div_b.appendChild(b);
	div_r_b.appendChild(div_b);
	sp = document.getElementById('lp-list');
	sp.appendChild(div_r_b);
}

function add_lp_block(owner, elem=null) {
	var new_div = document.createElement('div');
	new_div.className = 'container';	
	new_div.setAttribute('owner', owner);

	let div1r = document.createElement('div');
	div1r.className = 'row row-m-t';
	let div1 = document.createElement('div');
	div1.className = 'form-group';
	let txt1 = document.createTextNode('дата начала приема ');
	let sp1 = document.createElement('span');
	sp1.appendChild(txt1);
	div1.appendChild(sp1);
	let d1 = document.createElement('input');
	d1.type = 'date';
	d1.id = 'date_start';
	d1.setAttribute('owner', owner);
	d1.className = 'form-control';
	if (elem == null) {
		d1.value = $('#date-start')[0].value;
	} else {
		d1.value = elem.date_start;
	}	
	d1.setAttribute('required', '');
	div1.appendChild(d1);

	let txt2 = document.createTextNode(' количество дней приема ');
	let sp2 = document.createElement('span');
	sp2.appendChild(txt2);
	div1.appendChild(sp2);

	let count = document.createElement('input');
	count.type = 'number';
	count.id = 'days_count';
	count.setAttribute('owner', owner);
	count.className = 'form-control small';
	if (elem == null) {
		count.value = $('#days-count')[0].value;
	} else {
		count.value = elem.days_count;
	}	
	div1.appendChild(count);
	div1r.appendChild(div1);
	new_div.appendChild(div1r);

	// let div2r = document.createElement('div');
	// div2r.className = 'row row-m-t';
	// let div2 = document.createElement('div');
	// div2.className = 'form-group';
	// let txt3 = document.createTextNode('дата отмены ');
	// let sp3 = document.createElement('span');
	// sp3.appendChild(txt3);
	// div2.appendChild(sp3);
	// let d2 = document.createElement('input');
	// d2.type = 'date';
	// d2.id = 'date_end';
	// d2.setAttribute('owner', 'lp_'+id_lp);
	// d2.className = 'form-control';
	// d2.value = '0001-01-01';
	// d2.setAttribute('required', '');
	// div2.appendChild(d2);
	// let lab2 = document.createElement('label');
	// lab2.for = 'form-group';
	// div2r.appendChild(div2);
	// new_div.appendChild(div2r);

	let div3r = document.createElement('div');
	div3r.className = 'row row-m-t';
	let div3 = document.createElement('div');
	let txt4 = document.createTextNode('время приема:');
	let sp4 = document.createElement('span');
	sp4.appendChild(txt4);
	div3r.appendChild(sp4);
	new_div.appendChild(div3r);

	let div4r = document.createElement('div');
	div4r.className = 'row col-md-9 row-m-t';
	let div4 = document.getElementById('time-box-inp').cloneNode(true);
	let txt_count = div4.querySelector('input');
	txt_count.setAttribute('owner', owner);
	elems_b = div4.querySelectorAll('button.txt_btn');
	for (let i = 0; i < elems_b.length; i++) {
		elems_b[i].setAttribute('owner', owner);
	}
	div4r.appendChild(div4);
	new_div.appendChild(div4r);

	let div5r = document.createElement('div');
	div5r.className = 'row row-m-t';
	new_ol = document.createElement('ol');
	new_ol.id = 'ol';
	new_ol.setAttribute('owner', owner);
	div5r.appendChild(new_ol);
	new_div.appendChild(div5r);

	document.getElementById('lp-info').appendChild(new_div);
	// создание списка временных промежутков
	if (elem == null) {
		create_list(owner);
	} else {
		create_list_bd(elem.times, owner);
	}	
}

function add_btn_del_row(id) {
	let b_del = document.createElement('button');
	b_del.className = 'btn btn-link';
	b_del.id = 'btn_del';
	b_del.type = 'button';
	b_del.setAttribute('owner', id);
	b_del.setAttribute('onclick', 'click_del()');
	b_del.innerHTML = '<i class="glyphicon glyphicon-remove"></i>';

	d = document.getElementById('row_'+id);
	d.appendChild(b_del);

}

function create_list(owner) {
	for (let i = 1; i < 25; i++) {
		if ($('[id=b'+i+'][owner='+owner+']').hasClass('btn-primary')) {
			ident = i;
			if ($('#comb_time')[0].checked) {
				while ($('[id=b'+(i+1)+'][owner='+owner+']').hasClass('btn-primary')) {
					i++;
				}
			}
			create_list_element(ident, owner, i);
		}
	}
}

function create_list_bd(times, owner) {
	for (t in times) {
		h1 = Number(times[t].time1.split(':')[0]);
		h2 = Number(times[t].time2.split(':')[0]);

		if (h1 == h2) {
			$('[id=b'+h1+'][owner='+owner+']').addClass('btn-primary');
		} else {
			for (let i = h1; i < h2+1; i++) {
				$('[id=b'+i+'][owner='+owner+']').addClass('btn-primary');
			}
		}
		create_list_element(h1, owner, h2, times[t].doza, times[t].method, times[t].id);
	}
}


function create_list_element(ident, owner, valt2, doz=null, meth=null, id_db='') {
	let l = document.createElement('li');
	l.id = id_db;
	l.setAttribute('owner', owner);
	l.className = 'ellist';
	l.setAttribute('data-sort', ident);
	
	let d = document.createElement('div');
	d.className = 'form-group row-m-t';
	l.appendChild(d);
		
	let txt1 = document.createTextNode('c ');
	let sp1 = document.createElement('span');
	sp1.appendChild(txt1);
	d.appendChild(sp1);

	let t1 = create_time_input(ident, ident, 'time1', owner);
	d.appendChild(t1);
			
	let txt2 = document.createTextNode(' по ');
	let sp2 = document.createElement('span');
	sp2.appendChild(txt2);
	d.appendChild(sp2);	


	let t2 = create_time_input(ident, valt2, 'time2', owner);
	d.appendChild(t2);

	let txt3 = document.createTextNode(' доза ');
	let sp3 = document.createElement('span');
	sp3.appendChild(txt3);
	d.appendChild(sp3);

	let doza = document.createElement('input');
	doza.id = 'doza-'+ident;
	doza.setAttribute('owner', owner);
	doza.type = 'text';
	doza.className = 'small';
	doza.value = (doz == null) ? document.getElementById('doz').value : doz;
	d.appendChild(doza);

	let txt4 = document.createTextNode(' способ ввода ');
	let sp4 = document.createElement('span');
	sp4.appendChild(txt4);
	d.appendChild(sp4);

	let inp = document.getElementById('inp-meth').cloneNode(true);
	inp.id = 'inp-meth-'+ident;
	inp.value = document.getElementById('inp-meth').value;
	if (meth != null) {
		inp.value = meth;
	}	
	inp.setAttribute('owner', owner);
	d.appendChild(inp);
	
	let b_del = document.createElement('button');
	b_del.className = 'btn btn-link';
	b_del.id = 'b_del-'+ident;
	b_del.type = 'button';
	b_del.setAttribute('owner', owner);
	b_del.setAttribute('onclick', 'click_del_row()');
	b_del.innerHTML = '<i class="glyphicon glyphicon-remove"></i>';
	d.appendChild(b_del);

	ol = document.querySelector('[id=ol][owner='+owner+']');
	ol.appendChild(l);

}

function create_time_input(ident, value_time, pref, owner) {
	let el_div = document.createElement('div');
	el_div.className = 'input-group input-group-sm col-md-2';

	let el_input = document.createElement('input');
	el_input.id = 'clock_'+pref+'-'+ident;
	el_input.setAttribute('owner', owner);
	el_input.readOnly = true;
	el_input.className = 'form-control clfc';
	el_input.type = 'text';
	if (value_time < 10) {
		el_input.value = '0'+value_time+':00';
	} else {
		el_input.value = value_time+':00';
	}
	el_div.appendChild(el_input);
	
	
	let el_div_btn = document.createElement('div');
	el_div_btn.className = 'input-group-btn';

	let el_btn = document.createElement('button');
	el_btn.className = 'btn btn-default toggle-btn';
	el_btn.type = 'button';
	el_btn.id = 'btn_clock_'+pref+'-'+ident;
	el_btn.setAttribute('owner', owner);
	el_btn.setAttribute('onclick','clickbtn_clock()');
	
	let el_ico = document.createElement('i');
	el_ico.className = 'glyphicon glyphicon-time';
	el_ico.setAttribute('owner', owner);
	el_btn.appendChild(el_ico);
	el_div_btn.appendChild(el_btn);
	el_div.appendChild(el_div_btn);
	
	return el_div;		

}