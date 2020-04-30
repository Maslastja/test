$(function(){
	$('.clfc').clockface({
			format: 'HH:mm',
			trigger: 'manual'
	});   
 
	//$('.toggle-btn').click(function(e){ 
	//alert(123)  
	//		e.stopPropagation();
	//		$('.clockface-open').each(function(){
	//			alert(123)
    //           $(this).clockface('hide');
    //        });
	//		let ident_clock = e.target.id.split('_')[1];
	//		let owner = e.target.getAttribute('owner');
	//		$('[id=clock_'+ident_clock+'][owner='+owner+']').clockface('toggle');
	//});
    
	$('#add_lp').click(function(e){ 
		//!!! перед добавлением скорее всего следует делать проверки на заполненность необходимых полей
    	
     	//let countlist = $('.list-group-item').length;
   		//let bgr = $('<div>', {
    	//			class: 'list-group-item btn-group'
    	//		    })
    	//		    .append('<button>', {
    	//		    	class: 'btn btn-default',
    	//		    	type: 'button',
    	//		    	id: 'lp'+countlist,
    	//		    	innerHTML: $('#lp')[0].value,
    	//		    	onclick: 'click_lp()'
    	//		    });
    	//$('#lp-list').append(bgr);
    	if ($('#lp-list div.row:last').length != 0) {
    		var id_lp  = Number($('#lp-list div.row:last')[0].id.split('lp_')[1]) + 1; 
    	} else {
    		var id_lp  = 0;	
    	}

    	var owner = 'lp_'+id_lp;

    	let div_r_b = document.createElement('div');
		div_r_b.className = 'row';
		div_r_b.id = 'row_'+owner;
    	let div_b = document.createElement('div');
		div_b.className = 'col-md-10';
    	let b = document.createElement('button');
		b.className = 'list-group-item active';
		b.type = 'button';
		b.id = 'lp_'+id_lp;     
		b.innerHTML = $('#lp')[0].value;
		b.setAttribute('onclick', 'click_lp()');
		div_b.appendChild(b);
		div_r_b.appendChild(div_b);
		let sp = document.getElementById('lp-list');
		sp.appendChild(div_r_b);

		//добавление блока с разбивкой по времени 
		var new_div = document.createElement('div');
		new_div.className = 'container';	
		new_div.setAttribute('owner', 'lp_'+id_lp);

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
		d1.setAttribute('owner', 'lp_'+id_lp);
		d1.className = 'form-control';
		d1.value = $('#date-start')[0].value;
		d1.setAttribute('required', '');
		div1.appendChild(d1);

		let txt2 = document.createTextNode(' количество дней приема ');
		let sp2 = document.createElement('span');
		sp2.appendChild(txt2);
		div1.appendChild(sp2);

		let count = document.createElement('input');
		count.type = 'number';
		count.id = 'days_count';
		count.setAttribute('owner', 'lp_'+id_lp);
		count.className = 'form-control small';
		count.value = $('#days-count')[0].value; 
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
		txt_count.setAttribute('owner', 'lp_'+id_lp);
		let elems_b = div4.querySelectorAll('button.txt_btn');
		for (let i = 0; i < elems_b.length; i++) {
			elems_b[i].setAttribute('owner', 'lp_'+id_lp);
		}
		div4r.appendChild(div4);
		new_div.appendChild(div4r);

		let div5r = document.createElement('div');
		div5r.className = 'row row-m-t';
		new_ol = document.createElement('ol');
		new_ol.id = 'ol';
		new_ol.setAttribute('owner', 'lp_'+id_lp);
		div5r.appendChild(new_ol);
		new_div.appendChild(div5r);

		document.getElementById('lp-info').appendChild(new_div);
		create_list('lp_'+id_lp);
		
		// очистка ранее заполненных полей перед добавлением
		var btngen = $('[class*="btn-primary"][owner="general"]');
		for (let i = 0; i < btngen.length; i++) {
			$('#'+btngen[i].id).removeClass('btn-primary');
			$('#'+btngen[i].id).addClass('btn-default');	
		}
		$('[id="txt"][owner="general"]')[0].value = 0;
		
		//активация последнего добавленного лп
		if ($('#btn_del').length != 0) {
			$('#btn_del').remove();
		}	
		ch_class_lp_btn('lp_'+id_lp);
		add_btn_del_row('lp_'+id_lp);
	});
	
	  
	$('#save_lp').click(function (e) {
		e.preventDefault();
	//$(".form").submit(function (e) {
		let proc_list = {};
		proc_list.pat = 123;  // предполагается идентификатор пациента
		proc_list.his = 123;  // предполагается идентификатор истории болезни пациента
		proc_list.doc = 123;  // предполагается идентификатор врача
		proc_list.dep = 'irk.hosp.11';  // предполагается идентификатор отделения
		proc_list.date_start = new Date().toJSON().slice(0,10);;  // предполагается указание даты начала проц листа
		proc_list.lp = {};	
		for (let i = 0; i < $('#lp-list button.list-group-item').length; i++) {
			//console.log($('#lp-list button.list-group-item')[i].id)
			owner = $('#lp-list button.list-group-item')[i].id;
			let times = [];
			for (let j = 0; j < $('[class=ellist][owner='+owner+']').length; j++) {
				t=$('[class=ellist][owner='+owner+']')[j].id.slice(2);
				times.push({time1: $('[id=clock_time1-'+t+'][owner='+owner+']')[0].value,
							time2: $('[id=clock_time2-'+t+'][owner='+owner+']')[0].value,
							doza: $('[id=doza-'+t+'][owner='+owner+']')[0].value,
							method: $('[id=inp-meth-'+t+'][owner='+owner+']')[0].value});
			}

			proc_list.lp[i]= {name: $('#lp-list button.list-group-item')[i].innerHTML,
					//id: $('#lp-list button.list-group-item')[i].value,   // в id стоит заложить id лп если будет такая возможность
					date_start: $('[id=date_start][owner='+owner+']')[0].value,
					days_count: $('[id=days_count][owner='+owner+']')[0].value,
					times: times}
		}		
		
		$.ajax({
		  url: "/",
		  type: "POST",
		  data: {proc_list: JSON.stringify(proc_list)}
		});
		$(this).off('submit').submit();
	});
});

		
		
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

function create_list_element(ident, owner, valt2) {
	var l = document.createElement('li');
	l.id = 'li'+ident;
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

	// let el_div = document.createElement('div');
	// el_div.className = 'input-group col-md-2';
	let doza = document.createElement('input');
	doza.id = 'doza-'+ident;
	doza.setAttribute('owner', owner);
	doza.type = 'text';
	doza.className = 'small';
	doza.value = document.getElementById('doz').value;
	d.appendChild(doza);
	//d.appendChild(el_div);

	let txt4 = document.createTextNode(' способ ввода ');
	let sp4 = document.createElement('span');
	sp4.appendChild(txt4);
	d.appendChild(sp4);

	let inp = document.getElementById('inp-meth').cloneNode(true);
	inp.id = 'inp-meth-'+ident;
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

	var ol = document.querySelector('[id=ol][owner='+owner+']');
	ol.appendChild(l);

}

function create_time_input(ident, value_time, pref, owner) {
	let el_div = document.createElement('div');
	el_div.className = 'input-group col-md-2';

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

function check_time(owner) {
	//var owner = event.target.getAttribute('owner');
	var times = $('[class*="clfc"][owner='+owner+']');
	//alert(times)
	for (let i = 0; i < times.length; i++) {
		var id_time = times[i].id.split('-')[1];
		var hour = '';
		if (id_time < 10) {
			hour = '0'+id_time;
		} else {
			hour = id_time;
		}
		if (times[i].value.length < 4) {
			if (times[i].value.indexOf(':') == -1) {
				if (times[i].value < 10) {
					hour = '0'+times[i].value;
				} else {
					hour = times[i].value;
				}
				times[i].value = hour+':00';
			} else {
				times[i].value = hour+times[i].value;
			}
		} else if (times[i].value.length == 4) {
			times[i].value = '0'+times[i].value;
		}	
		
		if (times[i].value[0] == '0') {
			if (times[i].value[1] == '0') {
				var hour1 = '24';	
			} else {
				var hour1 = times[i].value[1];	
			}
		} else {
			var hour1 = times[i].value.slice(0,2);			
		}
		// менять id может только time1 (с), условие на несовпадение времени и id + условие что время не дублирует уже созданное время			
		if (times[i].id.indexOf('time1') != -1 & hour1 != id_time) {
			//alert(times[i].id)
			//alert(hour1)
			let idsrc = times[i].id.split('-')[0]+'-'+hour1;
			if (! document.querySelector('[id='+idsrc+'][owner='+owner+']')) {
				change_id(id_time, hour1, owner);
				id_time = hour1;
			} else {
				alert('время приема <'+hour1+' ч.> уже указано');
				times[i].value = hour + times[i].value.slice(2); 				
			}
		}

	}
	// отрисовка промежутков при различии т1 и т2
	check_intervals(owner);
}

var list_for_change_id = ['li',
							'clock_time1-',
							'btn_clock_time1-',
							'clock_time2-',
							'btn_clock_time2-',
							'b_del-',
							'doza-',
							'inp-meth-'
							];

function check_intervals(owner) {
	var array_prim_btn = [];
	for (let i = 0; i < $('[class="ellist"][owner='+owner+']').length; i++) {
		var id_time = $('[class="ellist"][owner='+owner+']')[i].getAttribute('data-sort');
		var h1 = get_hour($('[id="clock_time1-'+id_time+'"][owner='+owner+']')[0]);
		var h2 = get_hour($('[id="clock_time2-'+id_time+'"][owner='+owner+']')[0]);
		if (h1 == 0) {
			h1 = 24;
		}
		if (h2 == 0) {
			h2 = 24;
		}
		if (h1==h2 || h1 < h2) {
			for (let k = h1; k < h2+1; k++) {
				array_prim_btn.push(k);	
			}
		}
	} 
	for (let i = 1; i < 25; i++) {
		if (array_prim_btn.indexOf(i) != -1) {
			$('[id="b'+i+'"][owner="'+owner+'"]').removeClass("btn-default");
			$('[id="b'+i+'"][owner="'+owner+'"]').addClass("btn-primary");
		} else {
			$('[id="b'+i+'"][owner="'+owner+'"]').removeClass("btn-primary");
			$('[id="b'+i+'"][owner="'+owner+'"]').addClass("btn-default");
		}	
	}
}

function get_hour(elem) {
	return Number(elem.value.split(':')[0]);	
}

function change_id(old_id, new_id, owner) {	
	for (i in list_for_change_id) {
		//alert('[id="'+list_for_change_id[i]+old_id+'"][owner="'+owner+'"]')
		elem = document.querySelector('[id="'+list_for_change_id[i]+old_id+'"][owner="'+owner+'"]');
		//alert(elem)	
		if (list_for_change_id[i] == 'li') {
			elem.setAttribute('data-sort', new_id);
			$('[id="li'+old_id+'"][owner="'+owner+'"]').data('sort', new_id);			
		}
		elem.id = list_for_change_id[i]+new_id;
	}
	$('[id="b'+old_id+'"][owner="'+owner+'"]').removeClass("btn-primary");
	$('[id="b'+old_id+'"][owner="'+owner+'"]').addClass("btn-default");
	$('[id="b'+new_id+'"][owner="'+owner+'"]').removeClass("btn-default");	
	$('[id="b'+new_id+'"][owner="'+owner+'"]').addClass("btn-primary");
	sort_list(owner);
	//get_value_schema();
}

function sort_list(owner) {
	items = $('[class*="ellist"][owner='+owner+']');
	arItems = $.makeArray(items);
	arItems .sort(function(a, b) {
		return $(a).data("sort") - $(b).data("sort")
	});
	$(arItems).appendTo('[id=ol][owner='+owner+']');	
}

function get_value_schema() {
	let teststr = {};			
	for (let i = 1; i < 25; i++) {		
		if (document.getElementById('li'+i)) {
			teststr[i] = {'time1': $('#clock_time1-'+i)[0].value, 'time2': $('#clock_time2-'+i)[0].value, 'd': $('#doza'+i)[0].value}
		}
	}
	
	document.getElementById('schema').value = JSON.stringify(teststr);
}


function ch_class_lp_btn(id) {
	//console.log('id '+id);
	var countlist = $('.list-group-item');
	for (let i = 0; i < countlist.length; i++) {
	//	console.log('id i ' +countlist[i].id);
		if (countlist[i].id != id) {
			$('#'+countlist[i].id).removeClass('active');
			$('[class="container"][owner='+countlist[i].id+']').hide();
		} 
	}

}


function ch_btn_for_change_class(t1, t2, owner, id_row) {
	for (let i = t1; i < t2+1; i++) {
		var can_def = true;

		var rows = $('[class="ellist"][owner="'+owner+'"]');
		for (let k = 0; k < rows.length; k++) {
			var id_row_loop = rows[k].getAttribute('data-sort');
			if (id_row != id_row_loop) {
				// console.log(id_row_loop);
				// console.log(id_row);
				let t1r = get_hour($('[id="clock_time1-'+id_row_loop+'"][owner="'+owner+'"]')[0]);
				let t2r = get_hour($('[id="clock_time2-'+id_row_loop+'"][owner="'+owner+'"]')[0]);
				// console.log(t1r)
				// console.log(t2r)
				// console.log(i)
				if (i >= t1r & i <= t2r ) {
					can_def = false;
				}	
			}
		}
		if (can_def) {
			$('[id="b'+i+'"][owner="'+owner+'"]').removeClass('btn-primary');
			$('[id="b'+i+'"][owner="'+owner+'"]').addClass('btn-default');
		}
	}

}

function count_times(owner = 'general') {
	var k = 0;
	for (let i = 1; i < 25; i++) {
		if ($('[id=b'+i+'][owner='+owner+']').hasClass('btn-primary')) {
		 	if (! $('#comb_time')[0].checked) {
				k ++;
			} else {
				k ++;
				while ($('[id=b'+(i+1)+'][owner='+owner+']').hasClass('btn-primary')) {
					i++;
				}
			}
		}	
	}
	return k;
}

function add_btn_del_row(id) {
	let b_del = document.createElement('button');
	b_del.className = 'btn btn-link';
	b_del.id = 'btn_del';
	b_del.type = 'button';
	b_del.setAttribute('owner', id);
	b_del.setAttribute('onclick', 'click_del()');
	b_del.innerHTML = '<i class="glyphicon glyphicon-remove"></i>';

	let d = document.getElementById('row_'+id);
	d.appendChild(b_del);

}