
// кнопка нажатия часов
function clickbtn_clock() {
	event.stopPropagation();
	var ident_clock = event.target.id.slice(4);
	//console.log(event.target.id.slice(4))  
	$('.clockface-open').each(function(){
		//console.log($(this)[0].id)
		if ($(this)[0].id != ident_clock) {
			let one_row = $(this)[0].id.split('-')[1] == ident_clock .split('-')[1];
       		check_time($('.clockface-open').attr('owner'));
       		//console.log($(this)[0].id)
       		$(this).clockface('hide');
       		if (one_row) {
       			ident_clock = ident_clock .split('-')[0]+'-'+$(this)[0].id.split('-')[1];	
       		}
   		}
    });
	$('#'+ident_clock).clockface('toggle');
}

// кнопка удаления лек преп из списка и информации к нему
function click_del() {
	let owner = event.target.getAttribute('owner');
	$('[class="container"][owner='+owner+']').remove();
	if ($('#row_'+owner).length != 0) {
		$('#row_'+owner).remove();
	}	
	if ($('#lp-list button:last').length != 0) {
		$('#lp-list button:last').addClass('active');
		$('[class="container"][owner='+$('#lp-list button:last')[0].id+']').show();
		add_btn_del_row($('#lp-list button:last')[0].id);
	}
}
 		

// кнопка нажатия времени 1-24
function clickbtn(idtxt) {
	var owner = event.target.getAttribute('owner');
	if ($('[id='+event.target.id+'][owner='+owner+']').hasClass('btn-primary') & owner != 'general' & $('[id=li'+event.target.id.slice(1)+'][owner='+owner+']').length != 0) {
		let t1 = get_hour($('[id=clock_time1-'+event.target.id.slice(1)+'][owner='+owner+']')[0]);
		let t2 = get_hour($('[id=clock_time2-'+event.target.id.slice(1)+'][owner='+owner+']')[0]);
		//console.log(t1);
		//console.log(t2);
		ch_btn_for_change_class(t1, t2, owner, event.target.id.slice(1));
		// for (let k = t1; k < t2+1; k++) {
		// 	$('[id=b'+k+'][owner='+owner+']').toggleClass('btn-default btn-primary');
		// }	
	} else {
		$('[id='+event.target.id+'][owner='+owner+']').toggleClass('btn-default btn-primary');
	}	

	if (owner != 'general') {
		//if ($('#b'+ident).hasClass('btn-primary')) {
		if (! document.querySelector('[id="li'+event.target.id.slice(1)+'"][owner="'+owner+'"]')) {
			if ($('[id='+event.target.id+'][owner='+owner+']').hasClass('btn-primary')) {
				create_list_element(event.target.id.slice(1), owner, event.target.id.slice(1));
			} else {
				// проверить разделение на промежутки
				for (let i = 1; i < 25; i++) {
					if ($('[id=b'+i+'][owner='+owner+']').hasClass('btn-primary')) {
						var valt2 = i;
						while ($('[id=b'+(valt2+1)+'][owner='+owner+']').hasClass('btn-primary')) {
							valt2 ++;
						}
						console.log(i)
						// проверить наличие времени в списке
						if ($('[id=li'+i+'][owner='+owner+']').length != 0) {
							// проверить время окончания промежутка
							let ht2 = get_hour($('[id=clock_time2-'+i+'][owner='+owner+']')[0]);
							if (ht2 != valt2) {
								// замена времени окончания промежутка
								if (valt2 < 10) {
									$('[id=clock_time2-'+i+'][owner='+owner+']')[0].value = '0'+valt2+':'+$('[id=clock_time2-'+i+'][owner='+owner+']')[0].value.split(':')[1];
								} else {
									$('[id=clock_time2-'+i+'][owner='+owner+']')[0].value = valt2+':'+$('[id=clock_time2-'+i+'][owner='+owner+']')[0].value.split(':')[1];
								}
							}
						} else {
							// создать элемент списка
							create_list_element(i, owner, valt2);
						}
						// while (i <= valt2) {
						// 	i++;
						// }
						i = valt2;
					}
				}	

			}
		} else {
			$('[id=li'+event.target.id.slice(1)+'][owner='+owner+']').remove();	

		}
		var k = $('[class=ellist][owner='+owner+']').length;
		
		sort_list(owner);			
		//get_value_schema();
	} else {
		k = count_times();
	}
	$('[id='+idtxt+'][owner='+owner+']')[0].value = k;
}

function checkbox() {
	k = count_times();	
	$('[id="txt"][owner="general"]')[0].value = k;
}

// кнопка нажатия лек преп
function click_lp() {
	$('#btn_del').remove();

	$('#'+event.target.id).addClass('active');
	add_btn_del_row(event.target.id);
	$('[class="container"][owner='+event.target.id+']').show();
	ch_class_lp_btn(event.target.id);
}

// кнопка удаления строки из списка времени приема лек препарата
function click_del_row() {
	$('.clockface-open').each(function(){
		$(this).clockface('hide');
	});	
	var id_row = event.target.id.split('-')[1];
	var owner_row = event.target.getAttribute('owner');

	var t1 = get_hour($('[id="clock_time1-'+id_row+'"][owner="'+owner_row+'"]')[0]);
	var t2 = get_hour($('[id="clock_time2-'+id_row+'"][owner="'+owner_row+'"]')[0]);
	ch_btn_for_change_class(t1, t2, owner_row, id_row);
	$('[id="li'+id_row+'"][owner="'+owner_row+'"]').remove();	
	//sort_list(owner_row);
}

