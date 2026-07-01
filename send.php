<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $webAppUrl = 'https://script.google.com/macros/s/AKfycbyC2t568Tun7lzKKpFPzpRPxpdNMR3WyBR1FE_Bygoh1Tu26-M8ZA0nXH0HUsTJCCZn4A/exec';

    // Важно! Имена ключей должны совпадать с заголовками в таблице
    $postData = [
        'Имя' => $_POST['name'] ?? '',
        'Присутствие' => $_POST['attendance'] ?? '',
        'Гостей' => $_POST['guests'] ?? '',
        'Пожелания' => $_POST['wishes'] ?? '',
    ];

    $ch = curl_init($webAppUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    echo $response; // Вернет ответ от скрипта ("success" или ошибку)
}
?>