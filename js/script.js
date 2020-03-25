jQuery(document).ready(function($){
	$(".phone").mask("+7 (999) 999-9999");
	$('.plus').click(function(){
		var gustPlus = $('.guest').val();
		$('.guest').val(+gustPlus + 1);
		return false;
	});
	$('.minus').click(function(){
		var gustMinus = $('.guest').val();
		if(gustMinus>1){
			$('.guest').val(+gustMinus - 1);
		}
		return false;
	});
	
	$(".bron").submit(function() {
		var str = $(this).serialize();
		$.ajax({
			type: "POST",
			url: "contact.php",
			data: str,
			success: function(msg) {
				if(msg == 'ok') {
					$('.bron').slideUp('slow');
					$('.inform').addClass('good').html('Спасибо за обращение!<br>Наши менеджеры скоро с вами свяжутся.');
				}
				else {
					$('.inform').html('<h5>Ошибка</h5><p>Сообщение не отправлено, убедитесь в правильности заполнение полей</p>');
				}
			}
		});
		return false;
	});
	
	/* CALENDAR */
	window.pickmeup_locale = {
								days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
				daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
				daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
				months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
				monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
				monthsForm: ['нулября', 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
							};

	// Styled inputs
    $('input, select').styler();

	var date = new Date();
    var $input = $('input[name=pickadate]').pickmeup({
        format  : 'Y-m-d',
        hide_on_select: true,
        min: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        locale: window.pickmeup_locale,
        prev: "&larr;",
        next: "&rarr;",
        change: function(date) {
            var set = false;
            $("._booking__date-days option").each(function(i, el) {
                if( $(el).val() == date) {
                    set = true;
                    $(el).attr("selected", "selected");
                } else {
                    $(el).removeAttr("selected");
                };

                if( $(el).data("custom") ) {
                    $(el).remove();
                };
            });

            if( !set ) {
                var date_string = new Date(date);
                date_string = window.pickmeup_locale.days[date_string.getDay()] + ", " + date_string.getDate() + " " + window.pickmeup_locale.monthsForm[date_string.getMonth() + 1].toLowerCase();

                $("._booking__date-days").append(
                    "<option data-custom='true' selected='selected' value='" + date + "'>" + date_string + "</option>"
                );
            };
            $('input, select').trigger('refresh');
        }
    });
    $("._booking__date-calendar_btn").on("click", function() {
        $input.pickmeup('show');
    });
});







	// Фиксированная шапка при скролле
	$("#header").removeClass("default");
	$(window).scroll(function(){
		if ($(this).scrollTop() > 20) {
			$("#header").addClass("default").fadeIn('fast');
		} else {
			$("#header").removeClass("default").fadeIn('fast');
		};
	});

