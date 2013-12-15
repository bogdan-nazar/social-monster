<?php
defined("SOCIAL_MONSTER_ON") || die("Error occured.");
final class social_monster_lang_data
{
	private static $data	=	array(
		"Share with Your friends"=>"Поделитесь с друзьями",
		"Wordpress Comments"=>"Комментарии",
		"Facebook Comments"=>"Комментарии Facebook",
		"VKontakte Comments"=>"Комментарии ВКонтакте"
	);

	public static function getData()
	{
		return self::$data;
	}
}
?>
