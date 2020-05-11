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
    	id_lp = get_id_lp();

    	var owner = 'lp_'+id_lp;

    	// создание кнопки лп в левом блоке
    	add_lp_button($('#lp')[0].value, owner);

		// добавление блока с разбивкой по времени 
		add_lp_block(owner);
			
		// очистка ранее заполненных полей перед добавлением
		btngen = $('[class*="btn-primary"][owner="general"]');
		for (let i = 0; i < btngen.length; i++) {
			$('#'+btngen[i].id).removeClass('btn-primary');
			$('#'+btngen[i].id).addClass('btn-default');	
		}
		$('[id="txt"][owner="general"]')[0].value = 0;
		
		//активация последнего добавленного лп
		if ($('#btn_del').length != 0) {
			$('#btn_del').remove();
		}	
		ch_class_lp_btn(owner);
		add_btn_del_row(owner);
	});
	
	  
	$('#save_lp').click(function (e) {
		e.preventDefault();
	//$(".form").submit(function (e) {
		let proc_list = {};
		proc_list.date_start = new Date().toJSON().slice(0,10);;  // предполагается указание даты начала проц листа
		proc_list.dep = 'irk.hosp.11';  // предполагается идентификатор отделения
		proc_list.doc = 123;  // предполагается идентификатор врача
		proc_list.his = 123;  // предполагается идентификатор истории болезни пациента
		proc_list.lp = {};	
		proc_list.pat = 123;  // предполагается идентификатор пациента
		for (let i = 0; i < $('#lp-list button.list-group-item').length; i++) {
			//console.log($('#lp-list button.list-group-item')[i].id)
			owner = $('#lp-list button.list-group-item')[i].id;
			let times = [];
			for (let j = 0; j < $('[class=ellist][owner='+owner+']').length; j++) {
				t=$('[class=ellist][owner='+owner+']')[j].getAttribute('data-sort');
				times.push({doza: $('[id=doza-'+t+'][owner='+owner+']')[0].value,
							method: Number($('[id=inp-meth-'+t+'][owner='+owner+']')[0].value),
							time1: $('[id=clock_time1-'+t+'][owner='+owner+']')[0].value,
							time2: $('[id=clock_time2-'+t+'][owner='+owner+']')[0].value}
							);
			}

			proc_list.lp[i]= {date_start: $('[id=date_start][owner='+owner+']')[0].value,
					days_count: Number($('[id=days_count][owner='+owner+']')[0].value),
					name: $('#lp-list button.list-group-item')[i].innerHTML,
					//id: $('#lp-list button.list-group-item')[i].value,   // в id стоит заложить id лп если будет такая возможность
					
					times: times}
		}		
		
		console.log(JSON.stringify(proc_list) == JSON.stringify(pl));
		//console.log(JSON.stringify(pl));
		// $.ajax({
		//   url: "/lp",
		//   type: "POST",
		//   data: {proc_list: JSON.stringify(proc_list)}
		// }).done(function(resp) {
		// 	$(this).off('submit').submit()
		// 	$(location).attr('href', resp.url);				
		// });
		//$(this).off('submit').submit();
	});

	if (pl != '') {
		load_proc_list(pl);
	}
});

		
		
	

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
	console.log('пройдено');
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
		console.log('here')
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
		if (list_for_change_id[i] == 'li') {
			elem = document.querySelector('[data-sort="'+old_id+'"][owner="'+owner+'"]');
		//alert(elem)	
			elem.setAttribute('data-sort', new_id);
			$('[data-sort="'+old_id+'"][owner="'+owner+'"]').data('sort', new_id);			
		} else {
			elem = document.querySelector('[id="'+list_for_change_id[i]+old_id+'"][owner="'+owner+'"]');
			elem.id = list_for_change_id[i]+new_id;
		}
	}
	$('[id="b'+old_id+'"][owner="'+owner+'"]').removeClass("btn-primary");
	$('[id="b'+old_id+'"][owner="'+owner+'"]').addClass("btn-default");
	$('[id="b'+new_id+'"][owner="'+owner+'"]').removeClass("btn-default");	
	$('[id="b'+new_id+'"][owner="'+owner+'"]').addClass("btn-primary");
	sort_list(owner);
}

function sort_list(owner) {
	items = $('[class*="ellist"][owner='+owner+']');
	arItems = $.makeArray(items);
	arItems .sort(function(a, b) {
		return $(a).data("sort") - $(b).data("sort")
	});
	$(arItems).appendTo('[id=ol][owner='+owner+']');	
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

		rows = $('[class="ellist"][owner="'+owner+'"]');
		for (let k = 0; k < rows.length; k++) {
			var id_row_loop = rows[k].getAttribute('data-sort');
			if (id_row != id_row_loop) {
				//console.log(id_row_loop);
				//console.log(id_row);
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



function get_id_lp() {
	if ($('#lp-list div.row:last').length != 0) {
		var id_lp  = Number($('#lp-list div.row:last')[0].id.split('lp_')[1]) + 1; 
	} else {
		var id_lp  = 0;	
	}
    return id_lp;
}


function load_proc_list(pl) {
	console.log(pl)
	for (el in pl.lp) {
    	id_lp = get_id_lp();

    	var owner = 'lp_'+id_lp;

    	// создание кнопки лп в левом блоке
    	// console.log(pl.lp[el])
    	add_lp_button(pl.lp[el].name, owner, false);
    	// добавление блока с разбивкой по времени 
    	add_lp_block(owner, pl.lp[el])
    	$('.container[owner="'+owner+'"]').hide();

	}
}