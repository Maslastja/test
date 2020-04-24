
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
	$('#'+owner).remove();
	if ($('#lp-list button:last').length != 0) {
		$('#lp-list button:last').addClass('active');
		$('[class="container"][owner='+$('#lp-list button:last')[0].id+']').show();
		ch_class_lp_btn($('#lp-list button:last')[0].id);
	}
}
 		

// кнопка нажатия времени 1-24
function clickbtn(idtxt) {
	var owner = event.target.getAttribute('owner');
	if ($('[id='+event.target.id+'][owner='+owner+']').hasClass('btn-primary') & owner != 'general' & $('[id=li'+event.target.id.slice(1)+'][owner='+owner+']').length != 0) {
		let t1 = get_hour($('[id=clock_time1-'+event.target.id.slice(1)+'][owner='+owner+']')[0]);
		let t2 = get_hour($('[id=clock_time2-'+event.target.id.slice(1)+'][owner='+owner+']')[0]);
		console.log(t1);
		console.log(t2);
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
				create_list_element(event.target.id.slice(1), owner);
			}
		} else {
			$('[id=li'+event.target.id.slice(1)+'][owner='+owner+']').remove();	
		}
		var k = $('[class=ellist][owner='+owner+']').length;
		
		sort_list(owner);			
		//get_value_schema();
	} else {
		var k = 0;
		for (let i = 1; i < 25; i++) {
			if ($('[id=b'+i+'][owner='+owner+']').hasClass('btn-primary')) {
				k ++;
			}
		}

	}
	$('[id='+idtxt+'][owner='+owner+']')[0].value = k;
}

// кнопка нажатия лек преп
function click_lp() {
	$('#'+event.target.id).addClass('active');
	$('[class="container"][owner='+event.target.id+']').show();
	ch_class_lp_btn(event.target.id);
}

// кнопка удаления строки из списка времени приема лек препарата
function click_del_row() {
	var id_row = event.target.id.split('-')[1];
	var owner_row = event.target.getAttribute('owner');

	var t1 = get_hour($('[id="clock_time1-'+id_row+'"][owner="'+owner_row+'"]')[0]);
	var t2 = get_hour($('[id="clock_time2-'+id_row+'"][owner="'+owner_row+'"]')[0]);
	ch_btn_for_change_class(t1, t2, owner_row, id_row);
	$('[id="li'+id_row+'"][owner="'+owner_row+'"]').remove();	
	//sort_list(owner_row);
}

