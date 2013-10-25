<?php
defined("SOCIAL_MONSTER_ON") || die("Error occured.");
final class social_monster_lang {
	private static $data	=	array(
		"ru-RU"				=>	array(
			"Social Monster Options"=>"Настройки Social Monster"
		)
	);

	public static function _($id,$render=false,$parent=false)
	{
		$lang="en-US";
		if(is_object($parent))
		{
			if(@method_exists($parent,"blogInfo"))
			{
				$lang=$parent->blogInfo("language");
				if(!$lang)$lang="en-US";
			}
		}
		if($lang!="en-US")
		{
			if(isset(self::$data[$lang]) && isset(self::$data[$lang][$id]))$id=self::$data[$lang][$id];
		}
		if(is_int($id))$id="Unknown message";
		if($render)echo $id;
		else return $id;
	}
}
?>
