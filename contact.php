<?php
include 'wp-load.php';
//проверяем значения полученые при проверке скриптом формы
if (trim($_POST['phone'])=='') {
	echo 'fasle';
}
else {
		$site = $_SERVER['SERVER_NAME'];
		$txtname = trim($_POST['txtname']);

		$calendar = trim($_POST['date']);
		$vrem = trim($_POST['vrem']);
		$txtphone = trim($_POST['phone']);
		$guest = trim($_POST['guest']);

		$txtmessage = trim($_POST['message']);

		// от кого - поменять на свой домен
		$fromMail = 'mail@'.$_SERVER["SERVER_NAME"];
		$fromName = 'NameSendler';

		// Сюда введите Ваш email
		$emailTo = 'redangus01@yandex.ru';

		$subject = 'Бронь';
		$subject = "=?utf-8?b?". base64_encode($subject) ."?=";
		$headers = "From: Заявка на бронирование<$fromMail>\n";
	   $headers .= 'Content-type: text/plain; charset="utf-8"\r\n';
	   $headers .= "MIME-Version: 1.0\r\n";
	   $headers .= "Date: ". date('D, d M Y h:i:s O') ."\r\n";

		// тело письма
		$body = "Получено письмо с сайта ".$site." \n\nИмя: ".$txtname."\nТелефон: ".$txtphone."\nДата: ".$calendar."\nВремя: ".$vrem."\nГостей: ".$guest."\nСообщение: ".$txtmessage;
		mail($emailTo, $subject, $body, $headers );
		
		/* telegram */
		$token = '446075798:AAEMxa1Om5NzeKXNCp1y06x5mXI_snwvMmU';
		$chatId = '-316037261';
		$text = '<b>Заявка на Бронирование</b>%0AИмя: '.$txtname.'%0AТелефон: '.$txtphone.'%0AДата: '.$calendar.'%0AВремя: '.$vrem.'%0AКол-во Гостей: '.$guest.'%0AСообщение: '.$txtmessage;
		//$text = htmlspecialchars($text);
		$parameters = array('chat_id' => $chatId, 'text' => $text);
		$url = 'https://api.telegram.org/bot'.$token.'/sendMessage?chat_id='.$chatId.'&parse_mode=html&text='.$text;
		file_get_contents($url);

		echo 'ok';
}
?>
