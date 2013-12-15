<?php
defined("SOCIAL_MONSTER_ON") || die("Error occured.");
final class social_monster_lang
{
	private static $data		=	array();
	private static $lang		=	"";
	private static $parent		=	false;

	public static function _($id,$parent=false)
	{
		$lang=self::$lang;
		if(is_object($parent))
			if(@method_exists($parent,"blogInfo"))$lang="".$parent->blogInfo("language");
		if(!$lang)
		{
			if(is_int($id))$id=false;
		}
		else
		{
			if(!isset(self::$data[$id]))
			{
				if(is_int($id))$id=false;
			}
			else $id=self::$data[$id];
		}
		return $id;
	}

	public static function getLang($lang,$path)
	{
		self::$lang=$lang;
		if(@file_exists($path."/".$lang.".php"))
		{
			@include($path."/".$lang.".php");
			if(@class_exists("social_monster_lang_data"))
			{
				self::$data=social_monster_lang_data::getData();
				return true;
			}
			else return false;
		}
		else return false;
	}
}
?>
