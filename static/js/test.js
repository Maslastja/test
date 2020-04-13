 	$(function(){
		$('.clfc').clockface({
				format: 'HH:mm',
				trigger: 'manual'
		});   
     
		$('.toggle-btn').click(function(e){ 
		//alert(123)  
				e.stopPropagation();
				let ident_clock = e.target.id.split('_')[1];
				$('#clock_'+ident_clock).clockface('toggle');
		});
        
		$('#add_lp').click(function(e){ 
			//!!! перед добавлением скорее всего следует делать проверки на заполненность необходимых полей
        	
        	let b = document.createElement('button');
        	let countlist = $('.list-group-item').length;
			b.className = 'list-group-item';
			b.type = 'button';
			b.id = 'lp'+countlist;
			b.innerHTML = $('#lp')[0].value;
			b.setAttribute('onclick', 'click_lp()');
			let sp = document.getElementById('lp-list');
			sp.appendChild(b);
			
			//добавление блока с разбивкой по времени 
			var new_div = document.createElement('div');
			new_div.className = 'col-md-3';	
			new_div.id = 'lp_times_'+countlist;
			new_ol = document.createElement('ol');
			new_ol.id = 'ol_lp_times_'+countlist;
			new_div.appendChild(new_ol);
			document.getElementById('lp-info').appendChild(new_div);
			creatediv('lp_times_'+countlist);
			//new_ol.appendChild(divs);
		
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
		event.stopPropagation();
		let ident_clock = event.target.id.split('_')[1];
		// alert(event.target.innerHTML)  
		$('#clock_'+ident_clock).clockface('toggle');
	}
     		
		function clickbtn(ident, idtxt) {
			change_class_btn(ident, idtxt);

			if ($('#b'+ident).hasClass('btn-primary')) {
				divs = creatediv(ident);
				document.getElementById('bl1').appendChild(divs);
			} else {
				$('#li'+ident).remove();	
			}
			
			sort_list();			
			get_value_schema();
		}
		function change_class_btn(ident, idtxt) { 
			$('#b'+ident).toggleClass('btn-default btn-primary'); 
			var k = 0;			
			for (let i = 1; i < 25; i++) {
				if ($('#b'+i).hasClass('btn-primary')) {
					k ++;
				}
			}
			$('#'+idtxt)[0].value = k;
		}		
		
		function creatediv(id_ol) {
			var btnlist = $('.txt1_btn');
			alert(id_ol)
			for (i in btnlist) {
				//alert(btnlist[i].className)
				//alert($('#b'+id_btn).hasClass('btn-primary'))
				if ($('#'+btnlist[i].id).hasClass('btn-primary')) {
					var l = document.createElement('li');
					ident = Number(i)+1;
					l.id = 'li'+ident;
					l.className = 'ellist';
					l.setAttribute('data-sort', ident);
			
					let d = document.createElement('div');
					d.className = 'form-group row';
					l.appendChild(d);
					
					//let d1 = document.createElement('div');
					//d1.className = 'col-md-1';
					//let s1 = document.createElement('span');
					//s1.innerHTML = 'с'
					//d1.appendChild(s1);
					//d.appendChild(d1);
					
					let t1 = create_time_input(ident, 'time1', 'с ');
					//t1.id = 'time1'+ident;
					//t1.className = 'time';
					//t1.type = 'time';
					//if (ident < 10) {
					//	t1.value = '0'+ident+':00';
					//} else {
					//	t1.value = ident+':00';
					//}
					d.appendChild(t1);
					
					let t2 = create_time_input(ident, 'time2', ' по ');
					//t2.id = 'end'+ident;
					//t2.type = 'time';
					//if (ident < 10) {
					//	t2.value = '0'+ident+':00';
					//} else {
					//	t2.value = ident+':00';
					//}
					d.appendChild(t2);

					//let s3 = document.createElement('span');
					//s3.innerHTML = ' доза  '
					//d.appendChild(s3);

					let doza = document.createElement('input');
					doza.id = 'doza'+ident;
					doza.type = 'text';
					doza.value = document.getElementById('doz').value;
					d.appendChild(doza);
					var ol = document.getElementById('ol_'+id_ol);
					ol.appendChild(l);
				}
				//alert(btnlist[i].className);
			}
			
			
			//return l
		}

		function create_time_input(ident, pref, dop) {
			let el_div = document.createElement('div');
			//el_div.className = 'col-sm-2';
			let el_div_gr = document.createElement('div');
			el_div_gr.className = 'input-group input-group-sm';
			//el_div_gr.innerHTML = 'label for ${pref+ident}>${dop}</label><input id=${pref+ident} class="form-control clfc" type="text"><button>';			
			el_div.appendChild(el_div_gr);
			
			//let el_lb = document.createElement('span');
			//el_lb.setAttribute("for",pref+ident);
			//el_lb.innerHTML = dop;
			//el_div_gr.appendChild(el_lb);

			let el_input = document.createElement('input');
			el_input.id = 'clock_'+pref+'-'+ident;
			el_input.readOnly = true;
			el_input.className = 'form-control clfc';
			el_input.type = 'text';
			if (ident < 10) {
				el_input.value = '0'+ident+':00';
			} else {
				el_input.value = ident+':00';
			}
			el_div_gr.appendChild(el_input);
			
			
			let el_div_btn = document.createElement('div');
			el_div_btn.className = 'input-group-btn';

			let el_btn = document.createElement('button');
			el_btn.className = 'btn btn-default toggle-btn';
			el_btn.type = 'button';
			el_btn.id = 'toggle-btn_'+pref+'-'+ident;
			el_btn.setAttribute('onclick','clickbtn_clock()');
			
			let el_ico = document.createElement('i');
			el_ico.className = 'glyphicon glyphicon-time';
			el_ico.id = 'ico_'+pref+'-'+ident;
			el_btn.appendChild(el_ico);
			el_div_btn.appendChild(el_btn);
			el_div_gr.appendChild(el_div_btn);
			
			return el_div;		

		}	
	
	function check_time() {
		var times = $('.clfc');
		//alert(times)
		for (let i = 0; i < times.length; i++) {
			var hour = '';
			if (times[i].id.split('-')[1] < 10) {
				hour = '0'+times[i].id.split('-')[1];
			} else {
				hour = times[i].id.split('-')[1];
			}
			if (times[i].value.length < 4) {
				if (times[i].value.indexOf(':') == -1) {
					if (times[i].value< 10) {
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
			
			if (times[i].value[0] =='0') {
				if (times[i].value[1] == '0') {
					var hour1 = '24';	
				} else {
					var hour1 = times[i].value[1];	
				}
			} else {
				var hour1 = times[i].value.slice(0,2);			
			}
			// менять id может только time1 (с), условие на несовпадение времени и id + условие что время не дублирует уже созданное время			
			if (times[i].id.indexOf('time1') != -1 & hour1 != times[i].id.split('-')[1]) {
				alert(times[i].id)
				alert(hour1)
				if (! document.getElementById('li'+hour1)) {
					change_id(times[i].id.split('-')[1], hour1);
				} else {
					alert('время приема <'+hour1+' часа> уже указано');
					times[i].value = hour + times[i].value.slice(2); 				
				}
			}
		}
	}
	
	var list_for_change_id = ['li',
									'clock_time1-',
									'toggle-btn_time1-',
									'ico_time1-',
									'clock_time2-',
									'toggle-btn_time2-',
									'ico_time2-',
									'doza'
									];
	
	function change_id(old_id, new_id) {	
		for (i in list_for_change_id) {
			//alert(list_for_change_id[i]+old_id)
			elem = document.getElementById(list_for_change_id[i]+old_id);	
			if (list_for_change_id[i] == 'li') {
				elem.setAttribute('data-sort', new_id);
				$('#li'+old_id).data('sort', new_id);			
			}
			elem.id = list_for_change_id[i]+new_id;
		}
		$('#b'+old_id).removeClass("btn-primary");
		$('#b'+old_id).addClass("btn-default");
		$('#b'+new_id).removeClass("btn-default");	
		$('#b'+new_id).addClass("btn-primary");
		sort_list();
		get_value_schema();
	}
	
	function sort_list() {
			items = $('.ellist');
			arItems = $.makeArray(items);
			arItems .sort(function(a, b) {
				return $(a).data("sort") - $(b).data("sort")
			});
			$(arItems).appendTo("#bl1");	
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
		
		var countlist = $('.list-group-item');
		//alert(times)
		for (let i = 0; i < countlist.length; i++) {
			if (i != event.target.id.slice(2)) {
				$('#lp'+i).removeClass('active');
			}
		}
		
	}
