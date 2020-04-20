 	$(function(){
		$('.clfc').clockface({
				format: 'HH:mm',
				trigger: 'manual'
		});   
     
		$('.toggle-btn').click(function(e){ 
		alert(123)  
				e.stopPropagation();
				$('.clockface-open').each(function(){
					alert(123)
                    $(this).clockface('hide');
                });
				let ident_clock = e.target.id.split('_')[1];
				let owner = e.target.getAttribute('owner');
				$('[id=clock_'+ident_clock+'][owner='+owner+']').clockface('toggle');
		});
        
		$('#add_lp').click(function(e){ 
			//!!! перед добавлением скорее всего следует делать проверки на заполненность необходимых полей
        	
         	let countlist = $('.list-group-item').length;
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
        	
        	let b = document.createElement('button');
			b.className = 'list-group-item active';
			b.type = 'button';
			b.id = 'lp_'+countlist;     //возможно вместо countlist стоит указывать id лек преп
			b.innerHTML = $('#lp')[0].value;
			b.setAttribute('onclick', 'click_lp()');
			let sp = document.getElementById('lp-list');
			sp.appendChild(b);
			
			//добавление блока с разбивкой по времени 
			var new_div = document.createElement('div');
			new_div.className = 'container';	
			//new_div.id = 'lp_times_'+countlist;
			new_div.setAttribute('owner', 'lp_'+countlist);

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
			count.className = 'form-control small';
			count.value = $('#days-count')[0].value; 
			div1.appendChild(count);
			div1r.appendChild(div1);
			new_div.appendChild(div1r);

			let div2r = document.createElement('div');
			div2r.className = 'row row-m-t';
			let div2 = document.createElement('div');
			div2.className = 'form-group';
			let txt3 = document.createTextNode('дата отмены ');
			let sp3 = document.createElement('span');
			sp3.appendChild(txt3);
			div2.appendChild(sp3);
			let d2 = document.createElement('input');
			d2.type = 'date';
			d2.className = 'form-control';
			d2.value = '0001-01-01';
			d2.setAttribute('required', '');
			div2.appendChild(d2);
			let lab2 = document.createElement('label');
			lab2.for = 'form-group';
			div2r.appendChild(div2);
			new_div.appendChild(div2r);

			let div3r = document.createElement('div');
			div3r.className = 'row row-m-t';
			let div3 = document.createElement('div');
			let txt4 = document.createTextNode('время приема:');
			let sp4 = document.createElement('span');
			sp4.appendChild(txt4);
			div3r.appendChild(sp4);
			new_div.appendChild(div3r);

			let div4r = document.createElement('div');
			div4r.className = 'row  col-md-9 row-m-t';
			let div4 = document.getElementById('time-box-inp').cloneNode(true);
			//div4.id = 'lp_times_'+countlist+'-'+div4.id;
			//div4.setAttribute('owner', 'lp_'+countlist);
			let txt_count = div4.querySelector('input');
			txt_count.setAttribute('owner', 'lp_'+countlist);
			let elems_b = div4.querySelectorAll('button.txt_btn');
			for (let i = 0; i < elems_b.length; i++) {
				//elems_b[i].id = 'lp_times_'+countlist+'-'+elems_b[i].id;
				elems_b[i].setAttribute('owner', 'lp_'+countlist);
			}
			div4r.appendChild(div4);
			new_div.appendChild(div4r);

			new_ol = document.createElement('ol');
			new_ol.id = 'ol';
			new_ol.setAttribute('owner', 'lp_'+countlist);
			new_div.appendChild(new_ol);

			document.getElementById('lp-info').appendChild(new_div);
			create_list('lp_'+countlist);

			var btngen = $('[class*="btn-primary"][owner="general"]');
			for (let i = 0; i < btngen.length; i++) {
				$('#'+btngen[i].id).removeClass('btn-primary');
				$('#'+btngen[i].id).addClass('btn-default');	
			}
			ch_class_lp_btn(countlist);
		});
		
 	  
		$(".form").submit(function (e) {
				//alert($("#textinput").val()); //0
				//$("#textinput").val('new value');
				//alert($("#textinput").val()); //new value

				//return true; //отправляете ваш submit
				if ($('#lp')[0].value == '123') {
					var xhr = new XMLHttpRequest();
					var url = "/";
					xhr.open("POST", url, true);
					xhr.setRequestHeader("Content-Type", "application/json");
					xhr.onreadystatechange = function () {
						if (xhr.readyState === 4 && xhr.status === 200) {
							var json = JSON.parse(xhr.responseText);
							console.log(json.email + ", " + json.password);
						}
					};
			
			let teststr = {};			
			for (let i = 1; i < 25; i++) {		
				if (document.getElementById('li'+i)) {
					teststr[i] = {'time1': $('#clock_time1-'+i)[0].value, 'time2': $('#clock_time2-'+i)[0].value, 'd': $('#doza'+i)[0].value}
				}
			}
			
					var data = JSON.stringify(teststr);
					xhr.send(data);
				}
				e.preventDefault();
		});
	});
    
	function clickbtn_clock() {
		$('.clockface-open').each(function(){
           check_time($('.clockface-open').attr('owner'));
           $(this).clockface('hide');
        });
		event.stopPropagation();
		//let ident_clock = event.target.id.split('-')[1];
		let ident_clock = event.target.id.slice(4);
		//alert(event.target.id.slice(4))  
		$('#'+ident_clock).clockface('toggle');
	}
     		
	
	function clickbtn(idtxt) {
		var owner = event.target.getAttribute('owner');
		change_class_btn(idtxt, owner);

		if (owner != 'general') {
			//if ($('#b'+ident).hasClass('btn-primary')) {
			if (! document.querySelector('[id="li'+event.target.id.slice(1)+'"][owner="'+owner+'"]')) {
				create_list_element(event.target.id.slice(1), owner);
			} else {
				$('[id=li'+event.target.id.slice(1)+'][owner='+owner+']').remove();	
			}
			
			sort_list(owner);			
			//get_value_schema();
		}
	}
		
	function change_class_btn(idtxt, owner) { 
		$('[id='+event.target.id+'][owner='+owner+']').toggleClass('btn-default btn-primary');
		var k = 0;	
		for (let i = 1; i < 25; i++) {
			if ($('[id=b'+i+'][owner='+owner+']').hasClass('btn-primary')) {
				k ++;
			}
		}
		$('[id='+idtxt+'][owner='+owner+']')[0].value = k;

	}		
		
		function create_list(owner) {
			var btnlist = $('[owner="'+owner+'"][class*="txt_btn"]');
			for (i in btnlist) {
				//alert(btnlist[i])
				//alert($('#b'+id_btn).hasClass('btn-primary'))
				if ($('#'+btnlist[i].id).hasClass('btn-primary')) {
					ident = Number(i)+1;
					create_list_element(ident, owner);
				}
			}
		}

		function create_list_element(ident, owner) {
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

			let t1 = create_time_input(ident, 'time1', owner);
			d.appendChild(t1);
					
			let txt2 = document.createTextNode(' по ');
			let sp2 = document.createElement('span');
			sp2.appendChild(txt2);
			d.appendChild(sp2);	

			let t2 = create_time_input(ident, 'time2', owner);
			d.appendChild(t2);

			let txt3 = document.createTextNode(' доза ');
			let sp3 = document.createElement('span');
			sp3.appendChild(txt3);
			d.appendChild(sp3);

			let el_div = document.createElement('div');
			el_div.className = 'input-group col-md-2';
			let doza = document.createElement('input');
			doza.id = 'doza-'+ident;
			doza.setAttribute('owner', owner);
			doza.type = 'text';
			doza.className = 'small';
			doza.value = document.getElementById('doz').value;
			el_div.appendChild(doza);
			d.appendChild(el_div);
			var ol = document.querySelector('[id=ol][owner='+owner+']');
			ol.appendChild(l);

		}

		function create_time_input(ident, pref, owner) {
			let el_div = document.createElement('div');
			el_div.className = 'input-group col-md-2';

			let el_input = document.createElement('input');
			el_input.id = 'clock_'+pref+'-'+ident;
			el_input.setAttribute('owner', owner);
			el_input.readOnly = true;
			el_input.className = 'form-control clfc';
			el_input.type = 'text';
			if (ident < 10) {
				el_input.value = '0'+ident+':00';
			} else {
				el_input.value = ident+':00';
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
			el_ico.id = 'ico_clock_'+pref+'-'+ident;
			el_ico.setAttribute('owner', owner);
			el_ico.setAttribute('onclick','clickbtn_clock()');
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
									'ico_clock_time1-',
									'clock_time2-',
									'btn_clock_time2-',
									'ico_clock_time2-',
									'doza-'
									];
	
	function check_intervals(owner) {
		var array_prim_btn = [];
		for (let i = 0; i < $('[class="ellist"][owner='+owner+']').length; i++) {
			var id_time = $('[class="ellist"][owner='+owner+']')[i].getAttribute('data-sort');
			var h1 = Number($('[id="clock_time1-'+id_time+'"][owner='+owner+']')[0].value.split(':')[0]);
			var h2 = Number($('[id="clock_time2-'+id_time+'"][owner='+owner+']')[0].value.split(':')[0]);
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
	
	function click_lp() {
		$('#'+event.target.id).addClass('active');
		$('[class="container"][owner='+event.target.id+']').show();
		//ev_btn = document.getElementById(event.target.id);
		//new_btn = document.createElement('button');
		//new_btn.type = 'button';
		//new_i = document.createElement('i');
		//new_i.className = 'glyphicon glyphicon-remove';
		//new_btn.appendChild(new_i);
		//ev_btn.appendChild(new_btn);
		ch_class_lp_btn(Number(event.target.id.split('_')[1]));
		
	}

	function ch_class_lp_btn(id) {
		var countlist = $('.list-group-item');
		for (let i = 0; i < countlist.length; i++) {
			if (i != id) {
				$('#lp_'+i).removeClass('active');
				$('[class="container"][owner=lp_'+i+']').hide();
			} 
		}

	}