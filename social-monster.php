<?php
/*
Plugin Name: Social Monster
Version: 1.0.2
Description: Adds various social features - likes, comments, etc.
Requires at least: 3.2.1
Tested up to: 4.3.1
Plugin URI: http://www.bogdan-nazar.ru/wordpress/my-plugins/social-monster
Author: Bogdan Nazar
Author URI: http://www.bogdan-nazar.ru/
Stable tag: 1.0.2
License: GPLv2 or later
*/
define("SOCIAL_MONSTER_ON",1,false);
//predefined lang constants
define("SOCIAL_MONSTER_LANG_STATE",0);
define("SOCIAL_MONSTER_LANG_BSV",1);
define("SOCIAL_MONSTER_LANG_BSN",2);
define("SOCIAL_MONSTER_LANG_RSVD",3);
define("SOCIAL_MONSTER_LANG_RSNT",4);
define("SOCIAL_MONSTER_LANG_RERR",5);
define("SOCIAL_MONSTER_LANG_MSHR",6);
define("SOCIAL_MONSTER_LANG_MHLP",7);
define("SOCIAL_MONSTER_LANG_MDON",8);
define("SOCIAL_MONSTER_LANG_MDIS",9);
define("SOCIAL_MONSTER_LANG_MDIS2",10);
define("SOCIAL_MONSTER_LANG_MENA",11);
define("SOCIAL_MONSTER_LANG_MENA2",12);
define("SOCIAL_MONSTER_LANG_TPOS",13);
define("SOCIAL_MONSTER_LANG_STM1",14);
define("SOCIAL_MONSTER_LANG_STM2",15);
define("SOCIAL_MONSTER_LANG_STM3",16);
define("SOCIAL_MONSTER_LANG_STM4",17);
define("SOCIAL_MONSTER_LANG_STM5",18);
define("SOCIAL_MONSTER_LANG_STM6",19);
define("SOCIAL_MONSTER_LANG_STM7",20);
define("SOCIAL_MONSTER_LANG_STM8",21);
define("SOCIAL_MONSTER_LANG_STM9",22);
define("SOCIAL_MONSTER_LANG_STM10",23);
define("SOCIAL_MONSTER_LANG_NSHR",24);
define("SOCIAL_MONSTER_LANG_FBL",25);
define("SOCIAL_MONSTER_LANG_FBD",26);
define("SOCIAL_MONSTER_LANG_BLDISP",27);
define("SOCIAL_MONSTER_LANG_BLDISP1",28);
define("SOCIAL_MONSTER_LANG_BLDISP2",29);
define("SOCIAL_MONSTER_LANG_BLDISP3",30);
define("SOCIAL_MONSTER_LANG_VKAT_GRAFF",31);
define("SOCIAL_MONSTER_LANG_VKAT_PHOTO",32);
define("SOCIAL_MONSTER_LANG_VKAT_AUDIO",33);
define("SOCIAL_MONSTER_LANG_VKAT_VIDEO",34);
define("SOCIAL_MONSTER_LANG_VKAT_LINK",35);
define("SOCIAL_MONSTER_LANG_SUP_STR1",36);
define("SOCIAL_MONSTER_LANG_SUP_STR2",37);
define("SOCIAL_MONSTER_LANG_SUP_STR3",38);
define("SOCIAL_MONSTER_LANG_DON_STR1",39);
define("SOCIAL_MONSTER_LANG_DON_STR2",40);
define("SOCIAL_MONSTER_LANG_SLFB_STR1",41);
define("SOCIAL_MONSTER_LANG_SLFB_STR2",42);
define("SOCIAL_MONSTER_LANG_SLFB_STR3",43);
define("SOCIAL_MONSTER_LANG_SLFB_STR4",44);
define("SOCIAL_MONSTER_LANG_SLFB_STR5",45);
define("SOCIAL_MONSTER_LANG_SLFB_STR6",46);
define("SOCIAL_MONSTER_LANG_SLFB_STR7",47);
define("SOCIAL_MONSTER_LANG_SLFB_STR8",48);
define("SOCIAL_MONSTER_LANG_SLGEN_STR1",49);
define("SOCIAL_MONSTER_LANG_SLSHARE_STR1",50);
define("SOCIAL_MONSTER_LANG_SLSHARE_STR2",51);
define("SOCIAL_MONSTER_LANG_SLSHARE_STR3",52);
define("SOCIAL_MONSTER_LANG_SLVK_STR1",53);
define("SOCIAL_MONSTER_LANG_SLVK_STR2",54);
define("SOCIAL_MONSTER_LANG_SLVK_STR3",55);
define("SOCIAL_MONSTER_LANG_SLVK_STR4",56);
define("SOCIAL_MONSTER_LANG_SLVK_STR5",57);
define("SOCIAL_MONSTER_LANG_SLVK_STR6",58);
define("SOCIAL_MONSTER_LANG_SLVK_STR7",59);
define("SOCIAL_MONSTER_LANG_SLVK_STR8",60);
define("SOCIAL_MONSTER_LANG_SLVK_STR9",61);
define("SOCIAL_MONSTER_LANG_SLVK_STR10",62);
define("SOCIAL_MONSTER_LANG_SLVK_STR11",63);
final class social_monster
{
	private $admin				=	array(
		"menuAdded"				=>	false
	);
	private $blogInfo			=	array(
		"name"					=>	"Blog",
		"language"				=>	"",
		"url"					=>	"",
		"version"				=>	"3.2.1",
		"wpurl"					=>	""
	);
	private $clScripts			=	array();
	private $clStyles			=	array();
	private $class				=	__CLASS__;
	private $config				=	array();
	private $configDef			=	array(//don't use boolean vars in the config, use 0 or 1 instead
		"_version"				=>	"",
		"sections"				=>	array(
			"order"				=>	array("int","vk","fb"),
			"silent-debug"		=>	true,
			"template"			=>	"default",
			"update"			=>	0,
			"wp-template-tm"	=>	300
		),
		"section-fb"			=>	array(
			"appId"				=>	"",
			"collapse"			=>	0,
			"collapsed"			=>	0,
			"colorscheme"		=>	"light", //dark
			"num_posts"			=>	5,
			"order_by"			=>	"reverse_time", //social, time
			"script"			=>	"//connect.facebook.net/en_US/all.js",
			"state"				=>	0,
			"width"				=>	550,
		),
		"section-int"			=>	array(
			"collapse"			=>	0,
			"collapsed"			=>	0,
			"state"				=>	1,
		),
		"section-share"			=>	array(
			"sharethis-items"	=>	"",
			"sharethis-publisher"	=>	"",
			"buttons"			=>	array("facebook","google-plus","linked-in","twitter","vkontakte"),
			"position"			=>	"bottom left",
			"state"				=>	2
		),
		"section-vk"			=>	array(
			"apiId"				=>	"",
			"attach"			=>	"*", //graffiti, photo, audio, video, link
			"collapse"			=>	0,
			"collapsed"			=>	0,
			"height"			=>	0,
			"element_id"		=>	"vk_comments",
			"limit"				=>	10,
			"norealtime"		=>	0,
			"script"			=>	"//vk.com/js/api/openapi.js?101",
			"state"				=>	0,
			"width"				=>	0, //0 - auto
		)
	);
	private $configReloaded		=	false;
	private $dirBase			=	"";
	private $dirInc				=	"";
	private $dirPlug			=	"social-features-for-wp";
	private $dirRoot			=	"/";
	private $isDashboard		=	false;
	private $name				=	"social-monster";
	private $langLoaded			=	false;
	private $presets			=	array(
		"buttons-all"		=>	array("delicious","facebook","google-plus","linked-in","live-journal","mail-ru","moi-krug","odnoklassniki","pinterest","tumblr","twitter","vkontakte","ya-ru"),
		"buttons-titles"	=>	array(
			"delicious"		=>	"Delicious",
			"facebook"		=>	"Facebook",
			"google-plus"	=>	"Google Plus",
			"habrahabr"		=>	"Habrahabr",
			"linked-in"		=>	"LinkedIn",
			"live-journal"	=>	"LiveJournal",
			"mail-ru"		=>	"Mail.Ru",
			"moi-krug"		=>	"Moi Krug",
			"odnoklassniki"	=>	"Odnoklassniki",
			"pinterest"		=>	"Pinterest",
			"tumblr"		=>	"Tumblr",
			"twitter"		=>	"Twitter",
			"vkontakte"		=>	"VKontakte",
			"ya-ru"			=>	"Ya.Ru"
		),
		"titles"			=>	array("int"=>"Wordpress","vk"=>"VKontakte","fb"=>"Facebook"),
		"vk-attach"			=>	array("graffiti","photo","audio","video","link","none")
	);
	private $rendered			=	array("com"=>0,"share"=>0);
	private $session			=	array();
	private $sessionTime		=	0;
	private $sessionTm			=	360;
	private $title				=	"Social Monster";
	private $version			=	array(1,0,1);

	private function _($id,$render=false)
	{
		if(!$this->langLoaded)$msg=false;
		else $msg=social_monster_lang::_($id);
		if($msg===false)
		{
			if(is_int($id))
			{
				switch($id)
				{
					case SOCIAL_MONSTER_LANG_STATE:$msg="State";break;
					case SOCIAL_MONSTER_LANG_BSV:$msg="Save";break;
					case SOCIAL_MONSTER_LANG_BSN:$msg="Send";break;
					case SOCIAL_MONSTER_LANG_RSVD:$msg="Saved";break;
					case SOCIAL_MONSTER_LANG_RSNT:$msg="Sent";break;
					case SOCIAL_MONSTER_LANG_RERR:$msg="Error";break;
					case SOCIAL_MONSTER_LANG_MSHR:$msg="Share";break;
					case SOCIAL_MONSTER_LANG_MHLP:$msg="Help";break;
					case SOCIAL_MONSTER_LANG_MDON:$msg="Donate";break;
					case SOCIAL_MONSTER_LANG_MDIS:$msg="Disabled";break;
					case SOCIAL_MONSTER_LANG_MDIS2:$msg="disabled";break;
					case SOCIAL_MONSTER_LANG_MENA:$msg="Enabled";break;
					case SOCIAL_MONSTER_LANG_MENA2:$msg="enabled";break;
					case SOCIAL_MONSTER_LANG_TPOS:$msg="Position";break;
					case SOCIAL_MONSTER_LANG_STM1:$msg="First you must generate the \"ShareThis\" embed code";break;
					case SOCIAL_MONSTER_LANG_STM2:$msg="Follow this link please to perform all required steps";break;
					case SOCIAL_MONSTER_LANG_STM3:$msg="Hint #";break;
					case SOCIAL_MONSTER_LANG_STM4:$msg="on the 1st step select the \"Website\" platform for embedding";break;
					case SOCIAL_MONSTER_LANG_STM5:$msg="on the 2nd step select the \"Button\" style of sharing display";break;
					case SOCIAL_MONSTER_LANG_STM6:$msg="on the 3rd step select the \"Large(32x32)\" chicklet size";break;
					case SOCIAL_MONSTER_LANG_STM7:$msg="do not close \"Code and Instructions\" popup until you have saved results in Wordpress";break;
					case SOCIAL_MONSTER_LANG_STM8:$msg="Paste the \"ShareThis\" HTML from the section 1 of the final popup";break;
					case SOCIAL_MONSTER_LANG_STM9:$msg="see the screenshot on hover";break;
					case SOCIAL_MONSTER_LANG_STM10:$msg="Paste the \"publisher\" value from the section 2 of the final popup";break;
					case SOCIAL_MONSTER_LANG_NSHR:$msg="Note that if you select \"disabled\" state the enetred data will <b>not</b> be saved/updated!";break;
					case SOCIAL_MONSTER_LANG_FBL:$msg="light";break;
					case SOCIAL_MONSTER_LANG_FBD:$msg="dark";break;
					case SOCIAL_MONSTER_LANG_BLDISP:$msg="Display";break;
					case SOCIAL_MONSTER_LANG_BLDISP1:$msg="plain";break;
					case SOCIAL_MONSTER_LANG_BLDISP2:$msg="collapsible";break;
					case SOCIAL_MONSTER_LANG_BLDISP3:$msg="collapsed initially";break;
					case SOCIAL_MONSTER_LANG_VKAT_GRAFF:$msg="graffiti";break;
					case SOCIAL_MONSTER_LANG_VKAT_PHOTO:$msg="photo";break;
					case SOCIAL_MONSTER_LANG_VKAT_AUDIO:$msg="audio";break;
					case SOCIAL_MONSTER_LANG_VKAT_VIDEO:$msg="video";break;
					case SOCIAL_MONSTER_LANG_VKAT_LINK:$msg="link";break;
					case SOCIAL_MONSTER_LANG_SUP_STR1:$msg="If you have any questions, workflow related notes or bug reports, please write me a message using the form below";break;
					case SOCIAL_MONSTER_LANG_SUP_STR2:$msg="I will answer your message as soon as I can";break;
					case SOCIAL_MONSTER_LANG_SUP_STR3:$msg="\"Full description\" field is required only";break;
					case SOCIAL_MONSTER_LANG_DON_STR1:$msg="Please don't delete the authorship info in the file headers. This plugin is free for any use";break;
					case SOCIAL_MONSTER_LANG_DON_STR2:$msg="But if you like this plugin and wish to support my work on it or work on my other WordPress plugins then you may contribute";break;
					/*----- quote " as \\\" in SOCIAL_MONSTER_LANG_SL... messages to be used in json -----*/
					case SOCIAL_MONSTER_LANG_SLFB_STR1:$msg="FB AppID can not be empty. Check this value on Your FB Application settings page.";break;
					case SOCIAL_MONSTER_LANG_SLFB_STR2:$msg="FB AppID must be a numeric value.";break;
					case SOCIAL_MONSTER_LANG_SLFB_STR3:$msg="Link to the FB Javascript SDK can not be empty.";break;
					case SOCIAL_MONSTER_LANG_SLFB_STR4:$msg="Link to the FB Javascript SDK is broken or is not valid anymore.";break;
					case SOCIAL_MONSTER_LANG_SLFB_STR5:$msg="Width value can not be empty.";break;
					case SOCIAL_MONSTER_LANG_SLFB_STR6:$msg="Width value must be a numeric.";break;
					case SOCIAL_MONSTER_LANG_SLFB_STR7:$msg="Number of posts to show can not be an empty value.";break;
					case SOCIAL_MONSTER_LANG_SLFB_STR8:$msg="Number of posts to show must be a numeric value.";break;
					case SOCIAL_MONSTER_LANG_SLGEN_STR1:$msg="Cache revalidation timeout must be a number (of seconds).";break;
					case SOCIAL_MONSTER_LANG_SLSHARE_STR1:$msg="Please select at least one share button.";break;
					case SOCIAL_MONSTER_LANG_SLSHARE_STR2:$msg="ShareThis HTML can not be empty.";break;
					case SOCIAL_MONSTER_LANG_SLSHARE_STR3:$msg="ShareThis publisher value is required.";break;
					case SOCIAL_MONSTER_LANG_SLVK_STR1:$msg="VK ApiID can not be empty. Check this value on Your VK Application settings page.";break;
					case SOCIAL_MONSTER_LANG_SLVK_STR2:$msg="VK ApiID must be a numeric value.";break;
					case SOCIAL_MONSTER_LANG_SLVK_STR3:$msg="Link to the VK Javascript SDK can not be empty.";break;
					case SOCIAL_MONSTER_LANG_SLVK_STR4:$msg="Link to the VK Javascript SDK is broken or is not valid anymore.";break;
					case SOCIAL_MONSTER_LANG_SLVK_STR5:$msg="Width value can not be empty.";break;
					case SOCIAL_MONSTER_LANG_SLVK_STR6:$msg="Width value must be a numeric.";break;
					case SOCIAL_MONSTER_LANG_SLVK_STR7:$msg="Height value can not be empty.";break;
					case SOCIAL_MONSTER_LANG_SLVK_STR8:$msg="Height value must be a numeric.";break;
					case SOCIAL_MONSTER_LANG_SLVK_STR9:$msg="Number of posts to show can not be an empty value.";break;
					case SOCIAL_MONSTER_LANG_SLVK_STR10:$msg="Number of posts to show must be a numeric value.";break;
					case SOCIAL_MONSTER_LANG_SLVK_STR11:$msg="VK Element ID can not be an empty value.";break;
				}
			}
			else $msg=$id;
		}
		if($msg===false)$msg="[unknown msg]";
		if($render)echo $msg;
		else return $msg;
	}

	private function _actionSilentFbCfgSave()
	{
		$res="{res:";
		$state=(isset($_POST[$this->name."-fb-state"])?$_POST[$this->name."-fb-state"]:"");
		if($state=="")
		{
			$res.="false,msg:\"State data can not be empty.\"}";
			die($res);
		}
		$state=0+$state;
		if($state<0)$state=0;
		if($state>1)$state=1;
		if($state==0)
		{
			$this->config["section-fb"]["state"]=0;
			$this->sessionTime=0;
			$data=serialize($this->config);
			update_option($this->name."-config-hash",md5($data));
			update_option($this->name."-config-data",$data);
			die("true");
		}
		$appId=(isset($_POST[$this->name."-fb-appid"])?$_POST[$this->name."-fb-appid"]:"");
		if($appId=="")
		{
			$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLFB_STR1)."\"}";
			die($res);
		}
		if(!preg_match("/^[0-9]*$/",$appId))
		{
			$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLFB_STR2)."\"}";
			die($res);
		}
		$script=(isset($_POST[$this->name."-fb-script"])?$_POST[$this->name."-fb-script"]:"");
		if(!$script)
		{
			$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLFB_STR3)."\"}";
			die($res);
		}
		$file_headers=@get_headers($script);
		if(strpos($file_headers[0],"404")!==false)
		{
			$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLFB_STR4)."\"}";
			die($res);
		}
		$width=(isset($_POST[$this->name."-fb-width"])?$_POST[$this->name."-fb-width"]:"");
		if($width=="")
		{
			$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLFB_STR5)."\"}";
			die($res);
		}
		if(!preg_match("/^[0-9]*$/",$width))
		{
			$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLFB_STR6)."\"}";
			die($res);
		}
		$width=0+$width;
		$num_posts=(isset($_POST[$this->name."-fb-num_posts"])?$_POST[$this->name."-fb-num_posts"]:"");
		if($num_posts=="")
		{
			$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLFB_STR7)."\"}";
			die($res);
		}
		if(!preg_match("/^[0-9]*$/",$num_posts))
		{
			$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLFB_STR8)."\"}";
			die($res);
		}
		$num_posts=0+$num_posts;
		$colorscheme=(isset($_POST[$this->name."-fb-colorscheme"])?$_POST[$this->name."-fb-colorscheme"]:"");
		if($colorscheme=="")
		{
			$res.="false,msg:\"Color Scheme can not be an empty, select one of \"light\" or \"dark\" values.\"}";
			die($res);
		}
		if(!in_array($colorscheme,array("dark","light")))
		{
			$res.="false,msg:\"Color Scheme must be the one of \"light\" or \"dark\" values.\"}";
			die($res);
		}
		$collapse=(isset($_POST[$this->name."-fb-collapse"])?$_POST[$this->name."-fb-collapse"]:"");
		if($collapse==="1")$collapse=1;
		else $collapse=0;
		$collapsed=(isset($_POST[$this->name."-fb-collapsed"])?$_POST[$this->name."-fb-collapsed"]:"");
		if($collapsed==="1")$collapsed=1;
		else $collapsed=0;
		$this->config["section-fb"]["state"]=$state;
		$this->config["section-fb"]["appId"]=$appId;
		$this->config["section-fb"]["script"]=$script;
		$this->config["section-fb"]["width"]=$width;
		$this->config["section-fb"]["num_posts"]=$num_posts;
		$this->config["section-fb"]["colorscheme"]=$colorscheme;
		$this->config["section-fb"]["collapse"]=$collapse;
		$this->config["section-fb"]["collapsed"]=$collapsed;
		$this->sessionTime=0;
		$data=serialize($this->config);
		update_option($this->name."-config-hash",md5($data));
		update_option($this->name."-config-data",$data);
		die("true");
	}

	private function _actionSilentGeneralCfgSave()
	{
		$res="{res:";
		$template=$_POST[$this->name."-template"];
		if(!$template)
		{
			$res.="false,msg:\"Wrong template slug passed.\"}";
			die($res);
		}
		$tdir="../wp-content/plugins/".$this->dirPlug."/templates/".$template;
		if(!@file_exists($tdir))
		{
			$res.="false,msg:\"Template directory does not exist.\"}";
			die($res);
		}
		$cacheTm=$_POST[$this->name."-cache-tm"];
		if(!preg_match("/^[0-9]*$/",$cacheTm))
		{
			$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLGEN_STR1)."\"}";
			die($res);
		}
		$order=$_POST[$this->name."-order"];
		$order=@explode(",",$order);
		if(!is_array($order) || count($order)!=count($this->configDef["sections"]["order"]))
		{
			$res.="false,msg:\"Can't save comments' order positions: count mismatch detected.\"}";
			die($res);
		}
		foreach($order as $ord)
		{
			if(!in_array($ord,$this->configDef["sections"]["order"]))
			{
				$res.="false,msg:\"Can't save comments' order positions: unknown comment slug detected.\"}";
				die($res);
			}
		}
		$update=0+$_POST[$this->name."-update"];
		if($update)
		{
			$res.="false,msg:\"Can't set update mode: not implemented yet.\"}";
			die($res);
		}
		$this->config["sections"]["order"]=array_merge(array(),$order);
		$this->config["sections"]["template"]=$template;
		$this->config["sections"]["update"]=$update;
		$this->config["sections"]["wp-template-tm"]=0+$cacheTm;
		$this->sessionTime=0;
		$data=serialize($this->config);
		update_option($this->name."-config-hash",md5($data));
		update_option($this->name."-config-data",$data);
		die("true");
	}

	private function _actionSilentIntCfgSave()
	{
		$res="{res:";
		$state=(isset($_POST[$this->name."-int-state"])?$_POST[$this->name."-int-state"]:"");
		if($state=="")
		{
			$res.="false,msg:\"State data can not be empty.\"}";
			die($res);
		}
		$state=0+$state;
		if($state<0)$state=0;
		if($state>1)$state=1;
		if($state==0)
		{
			$this->config["section-int"]["state"]=0;
			$this->sessionTime=0;
			$data=serialize($this->config);
			update_option($this->name."-config-hash",md5($data));
			update_option($this->name."-config-data",$data);
			die("true");
		}
		$collapse=(isset($_POST[$this->name."-int-collapse"])?$_POST[$this->name."-int-collapse"]:"");
		if($collapse==="1")$collapse=1;
		else $collapse=0;
		$collapsed=(isset($_POST[$this->name."-int-collapsed"])?$_POST[$this->name."-int-collapsed"]:"");
		if($collapsed==="1")$collapsed=1;
		else $collapsed=0;
		$this->config["section-int"]["state"]=$state;
		$this->config["section-int"]["collapse"]=$collapse;
		$this->config["section-int"]["collapsed"]=$collapsed;
		$this->sessionTime=0;
		$data=serialize($this->config);
		update_option($this->name."-config-hash",md5($data));
		update_option($this->name."-config-data",$data);
		die("true");
	}

	private function _actionSilentShareCfgSave()
	{
		$res="{res:";
		$state=(isset($_POST[$this->name."-share-state"])?$_POST[$this->name."-share-state"]:"");
		if($state=="")
		{
			$res.="false,msg:\"State data can not be empty.\"}";
			die($res);
		}
		$state=0+$state;
		if($state<0)$state=0;
		if($state>2)$state=0;
		if($state==0)
		{
			$this->config["section-share"]["state"]=0;
			$this->sessionTime=0;
			$data=serialize($this->config);
			update_option($this->name."-config-hash",md5($data));
			update_option($this->name."-config-data",$data);
			die("true");
		}
		$position=(isset($_POST[$this->name."-share-position"])?$_POST[$this->name."-share-position"]:"");
		if($position=="")
		{
			$res.="false,msg:\"Share position can not be empty.\"}";
			die($res);
		}
		$position=explode(" ",$position);
		if(count($position)!=2)
		{
			$res.="false,msg:\"Wrong share position passed.\"}";
			die($res);
		}
		if(($position[0]!="top") && ($position[0]!="bottom"))
		{
			$res.="false,msg:\"Wrong share position passed.\"}";
			die($res);
		}
		if(!in_array($position[1],array("left","center","right")))
		{
			$res.="false,msg:\"Wrong share position passed.\"}";
			die($res);
		}
		$position=implode(" ",$position);
		$this->config["section-share"]["position"]=$position;
		if($state==1)
		{
			$buttons=(isset($_POST[$this->name."-share-buttons"])?$_POST[$this->name."-share-buttons"]:"");
			if($buttons=="")
			{
				$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLSHARE_STR1)."\"}";
				die($res);
			}
			$buttons=explode(",",$buttons);
			if(!count($buttons))
			{
				$res.="false,msg:\"List of share buttons is not recognized.\"}";
				die($res);
			}
			$all=$this->presets["buttons-all"];
			$btns=array();
			foreach($buttons as $btn)
				if(in_array($btn,$all))$btns[]=$btn;
			if(!count($btns))
			{
				$res.="false,msg:\"List of share buttons is not recognized.\"}";
				die($res);
			}
			$this->config["section-share"]["state"]=1;
			$this->config["section-share"]["buttons"]=array_merge(array(),$btns);
		}
		if($state==2)
		{
			$at_items=(isset($_POST[$this->name."-share-sharethis-html"])?$_POST[$this->name."-share-sharethis-html"]:"");
			$at_items=trim(stripslashes($at_items));
			$at_items=str_replace("\r\n","",$at_items);
			$at_items=str_replace("\r","",$at_items);
			$at_items=str_replace("\n","",$at_items);
			if($at_items=="")
			{
				$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLSHARE_STR2)."\"}";
				die($res);
			}
			$at_pub=trim((isset($_POST[$this->name."-share-sharethis-publisher"])?$_POST[$this->name."-share-sharethis-publisher"]:""));
			if($at_pub=="")
			{
				$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLSHARE_STR3)."\"}";
				die($res);
			}
			$this->config["section-share"]["state"]=2;
			$this->config["section-share"]["sharethis-items"]=$at_items;
			$this->config["section-share"]["sharethis-publisher"]=$at_pub;
		}
		$this->sessionTime=0;
		$data=serialize($this->config);
		update_option($this->name."-config-hash",md5($data));
		update_option($this->name."-config-data",$data);
		die("true");
	}

	private function _actionSilentSupSend()
	{
		$res="{res:";
		$type=((isset($_POST[$this->name."-sup-type"]) && $_POST[$this->name."-sup-type"])?$_POST[$this->name."-sup-type"]:"question");
		$email=((isset($_POST[$this->name."-sup-email"]) && $_POST[$this->name."-sup-email"])?$_POST[$this->name."-sup-email"]:"[no email]");
		$title=((isset($_POST[$this->name."-sup-title"]) && $_POST[$this->name."-sup-title"])?$_POST[$this->name."-sup-title"]:"[no title]");
		$descr=((isset($_POST[$this->name."-sup-descr"]) && $_POST[$this->name."-sup-descr"])?$_POST[$this->name."-sup-descr"]:"[no description]");
		$descr=str_replace("\r\n","<br />",$descr);
		$descr=str_replace("\n","<br />",$descr);
		$descr=str_replace("\r","<br />",$descr);
		$headers="From: WP Social Monster <robot@".$_SERVER["SERVER_NAME"].">\r\n";
		add_filter("wp_mail_content_type", array($this,"mailCT"));
		if(wp_mail("social-monster@bogdan-nazar.ru","WP Social Monster Help Request [".$type."]","<b>".$title."</b><br />From: ".$email."<br /><br />".$descr,$headers))
		{
			remove_filter("wp_mail_content_type", array($this,"mailCT"));
			die("true");
		}
		else
		{
			remove_filter("wp_mail_content_type", array($this,"mailCT"));
			$res.="false,msg:\"E-mail was not sent. Check if the PHP's \\\"mail()\\\" is configured.\"}";
			die($res);
		}
	}

	private function _actionSilentVkCfgSave()
	{
		$res="{res:";
		$state=(isset($_POST[$this->name."-vk-state"])?$_POST[$this->name."-vk-state"]:"");
		if($state=="")
		{
			$res.="false,msg:\"State data can not be empty.\"}";
			die($res);
		}
		$state=0+$state;
		if($state<0)$state=0;
		if($state>1)$state=1;
		if($state==0)
		{
			$this->config["section-vk"]["state"]=0;
			$this->sessionTime=0;
			$data=serialize($this->config);
			update_option($this->name."-config-hash",md5($data));
			update_option($this->name."-config-data",$data);
			die("true");
		}
		$apiId=(isset($_POST[$this->name."-vk-apiid"])?$_POST[$this->name."-vk-apiid"]:"");
		if($apiId=="")
		{
			$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLVK_STR1)."\"}";
			die($res);
		}
		if(!preg_match("/^[0-9]*$/",$apiId))
		{
			$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLVK_STR2)."\"}";
			die($res);
		}
		$script=(isset($_POST[$this->name."-vk-script"])?$_POST[$this->name."-vk-script"]:"");
		if(!$script)
		{
			$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLVK_STR3)."\"}";
			die($res);
		}
		$file_headers=@get_headers($script);
		if(strpos($file_headers[0],"404")!==false)
		{
			$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLVK_STR4)."\"}";
			die($res);
		}
		$width=(isset($_POST[$this->name."-vk-width"])?$_POST[$this->name."-vk-width"]:"");
		if($width=="")
		{
			$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLVK_STR5)."\"}";
			die($res);
		}
		if(!preg_match("/^[0-9]*$/",$width))
		{
			$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLVK_STR6)."\"}";
			die($res);
		}
		$width=0+$width;
		$height=(isset($_POST[$this->name."-vk-height"])?$_POST[$this->name."-vk-height"]:"");
		if($height=="")
		{
			$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLVK_STR7)."\"}";
			die($res);
		}
		if(!preg_match("/^[0-9]*$/",$height))
		{
			$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLVK_STR8)."\"}";
			die($res);
		}
		$height=0+$height;
		$limit=(isset($_POST[$this->name."-vk-limit"])?$_POST[$this->name."-vk-limit"]:"");
		if($limit=="")
		{
			$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLVK_STR9)."\"}";
			die($res);
		}
		if(!preg_match("/^[0-9]*$/",$limit))
		{
			$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLVK_STR10)."\"}";
			die($res);
		}
		$limit=0+$limit;
		$attach=(isset($_POST[$this->name."-vk-attach"])?$_POST[$this->name."-vk-attach"]:"");
		if($attach=="")
		{
			$res.="false,msg:\"VK attachment types can not be an empty value.\"}";
			die($res);
		}
		if($attach=="none")$attach=0;
		else
		{
			if($attach!=="*")
			{
				$attach=explode(",",$attach);
				$at=array();
				foreach($attach as $val)
				{
					$val=trim($val);
					if($val=="none")
					{
						$attach=0;
						break;
					}
					if($val=="*")
					{
						$attach="*";
						break;
					}
					if(in_array($val,$this->presets["vk-attach"]))$at[]=$val;
				}
				if(!count($at) && is_array($attach))
				{
					$res.="false,msg:\"No valid VK attachment types found.\"}";
					die($res);
				}
				if(!count($at))$attach=0;
				else $attach=implode(",",$at);
			}
		}
		$element_id=(isset($_POST[$this->name."-vk-element_id"])?$_POST[$this->name."-vk-element_id"]:"");
		if($element_id=="")
		{
			$res.="false,msg:\"".$this->_(SOCIAL_MONSTER_LANG_SLVK_STR11)."\"}";
			die($res);
		}
		$norealtime=(isset($_POST[$this->name."-vk-norealtime"])?$_POST[$this->name."-vk-norealtime"]:"");
		if($norealtime=="")
		{
			$res.="false,msg:\"VK Norealtime can not be an empty value.\"}";
			die($res);
		}
		$norealtime=0+$norealtime;
		if($norealtime<0)$norealtime=0;
		if($norealtime>1)$norealtime=1;
		$collapse=(isset($_POST[$this->name."-vk-collapse"])?$_POST[$this->name."-vk-collapse"]:"");
		if($collapse==="1")$collapse=1;
		else $collapse=0;
		$collapsed=(isset($_POST[$this->name."-vk-collapsed"])?$_POST[$this->name."-vk-collapsed"]:"");
		if($collapsed==="1")$collapsed=1;
		else $collapsed=0;
		$this->config["section-vk"]["state"]=$state;
		$this->config["section-vk"]["apiId"]=$apiId;
		$this->config["section-vk"]["script"]=$script;
		$this->config["section-vk"]["width"]=$width;
		$this->config["section-vk"]["height"]=$height;
		$this->config["section-vk"]["limit"]=$limit;
		$this->config["section-vk"]["attach"]=$attach;
		$this->config["section-vk"]["element_id"]=$element_id;
		$this->config["section-vk"]["norealtime"]=$norealtime;
		$this->config["section-vk"]["collapse"]=$collapse;
		$this->config["section-vk"]["collapsed"]=$collapsed;
		$this->sessionTime=0;
		$data=serialize($this->config);
		update_option($this->name."-config-hash",md5($data));
		update_option($this->name."-config-data",$data);
		die("true");
	}

	private function _cfg($section,$param=false,$only_changed=false)
	{
		if(!isset($this->config[$section]))
		{
			if(!isset($this->config["section-".$section]))return"";
			else $section="section-".$section;
		}
		if($param===false)
		{
			if($only_changed)
			{
				if($this->config[$section]===$this->configDef[$section])return false;
			}
			return $this->config[$section];
		}
		if(isset($this->config[$section][$param]))
		{
			$val=$this->config[$section][$param];
			//checking incorrect values
			$def=false;
			switch($section."-".$param)
			{
				case "section-vk-attach":
					if(($val!==0) && ($val!=="*"))
					{
						$ats=explode(",",$val);
						$val=array();
						foreach($ats as $at)
							if(in_array($at,$this->presets["vk-attach"]))$val[]=$at;
						if(!count($val))
						{
							$val="*";
							$this->config[$section][$param]=$val;
							$def=true;
						}
						else $val=implode(",",$val);
					}
					break;
				case "section-vk-norealtime":
					if($val>1)$val=1;
					if($val<0)$val=0;
					$this->config[$section][$param]=$val;
					if(!$val)$def=true;
					break;
				case "section-vk-element_id":
				case "section-vk-limit":
				case "section-vk-script":
				case "section-fb-num_posts":
				case "section-fb-script":
					if(!$val)$def=true;
					break;
				case "section-fb-width":
					if(!preg_match("/^[0-9]*$/","".$val))
					{
						$val=$this->configDef[$section][$param];
						$this->config[$section][$param]=$val;
						$def=true;
					}
					break;
				case "section-fb-order_by":
					if(!in_array($val,array("reverse_time","social","time")))
					{
						$val="reverse_time";
						$this->config[$section][$param]=$val;
						$def=true;
					}
					break;
				case "section-fb-colorscheme":
					if($val!="dark" && ($val!="light"))
					{
						$val="light";
						$this->config[$section][$param]=$val;
						$def=true;
					}
					break;
			}
			if($def)$val=$this->configDef[$section][$param];
			if($only_changed)
			{
				if($def || ($val===$this->configDef[$section][$param]))return false;
			}
			return $val;
		}
		else
		{
			if($only_changed)return false;
			if(!isset($this->configDef[$section][$param]))return"";
			return $this->configDef[$section][$param];
		}
	}

	private function _configJSON($sn)
	{
		$json=array();
		$json[]="instNum:".$this->rendered["com"];
		switch($sn)
		{
			case "fb":
				$appId=$this->_cfg("fb","appId");
				if(!$appId)
				{
					echo "Wrong FB appId supplied.";
					return false;
				}
				$json[]="appId:\"".$appId."\"";
				$val=$this->_cfg("fb","num_posts",true);
				if($val!==false)$json[]="num_posts:".$val;
				$val=$this->_cfg("fb","colorscheme",true);
				if($val!==false)$json[]="colorscheme:\"".$val."\"";
				$val=$this->_cfg("fb","collapse",true);
				if($val!==false)$json[]="collapse:".$val;
				$val=$this->_cfg("fb","collapsed",true);
				if($val!==false)$json[]="collapsed:".$val;
				$val=$this->_cfg("fb","order_by",true);
				if($val!==false)$json[]="order_by:\"".$val."\"";
				$val=$this->_cfg("fb","script",true);
				if($val!==false)$json[]="script:\"".$val."\"";
				$val=$this->_cfg("fb","width",true);
				if($val!==false)$json[]="width:".$val;
				break;
			case "int":
				$val=$this->_cfg("int","collapse",true);
				if($val!==false)$json[]="collapse:".$val;
				$val=$this->_cfg("int","collapsed",true);
				if($val!==false)$json[]="collapsed:".$val;
				break;
			case "vk":
				$apiId=$this->_cfg("vk","apiId");
				if(!$apiId)
				{
					echo "Wrong VK apiId supplied.";
					return false;
				}
				$json[]="apiId:\"".$apiId."\"";
				$val=$this->_cfg("vk","attach",true);
				if($val!==false)$json[]=("attach:".((!$val)?"false":("\"".$val."\"")));
				$val=$this->_cfg("vk","collapse",true);
				if($val!==false)$json[]="collapse:".$val;
				$val=$this->_cfg("vk","collapsed",true);
				if($val!==false)$json[]="collapsed:".$val;
				$val=$this->_cfg("vk","height",true);
				if($val!==false)$json[]="height:".$val;
				$val=$this->_cfg("vk","element_id",true);
				if($val!==false)$json[]="element_id:\"".$val."\"";
				$val=$this->_cfg("vk","limit",true);
				if($val!==false)$json[]="limit:".$val;
				$val=$this->_cfg("vk","norealtime",true);
				if($val!==false)$json[]="norealtime:".$val;
				$val=$this->_cfg("vk","script",true);
				if($val!==false)$json[]="script:\"".$val."\"";
				$val=$this->_cfg("vk","width",true);
				if($val!==false)$json[]="width:".$val;
				break;
		}
		return "{type:\"".$sn."\",".implode(",",$json)."}";
	}

	private function _configNormalize()
	{
		$cfg=array();
		foreach($this->configDef as $sect=>$sub)
		{
			if($sect=="_version")
			{
				$cfg["_version"]=$this->configDef["_version"];
				continue;
			}
			if(!is_array($sub))
			{
				if(!isset($this->config[$sect]))$cfg[$sect]=$sub;
				else $cfg[$sect]=$this->config[$sect];
			}
			else
			{
				foreach($sub as $name=>$val)
				{
					if(!isset($this->config[$sect]) || !isset($this->config[$sect][$name]) || (gettype($this->config[$sect][$name])!=gettype($val)))$cfg[$sect][$name]=$val;
					else $cfg[$sect][$name]=$this->config[$sect][$name];
				}
			}
		}
		$this->config=$cfg;
	}

	private function _init()
	{
		$this->configDef["_version"]=implode(".",$this->version);
		$this->_sessionRead();
		add_action("wp_head",array($this,"resourcesLink"));
		$share=$this->_cfg("share","state");
		if($share)
		{
			add_filter("the_content",array($this,"_render"));
			if($share==2)add_action("wp_head",array($this,"resourcesLinkShareThis"));
		}
		if($this->_cfg("vk","state"))add_action("wp_head",array($this,"resourcesLinkVK"));
		add_filter("comments_template",array($this,"_render"));
		add_action("shutdown",array($this,"_sleep"));
		$lf=$this->dirInc."/lang.php";
		if(@file_exists($lf))
		{
			@include($lf);
			if(@class_exists("social_monster_lang"))
				$this->langLoaded=social_monster_lang::getLang($this->blogInfo["language"],$this->dirInc."/templates/".$this->_cfg("sections","template"));
		}
	}

	private function _initAdmin()
	{
		$this->configDef["_version"]=implode(".",$this->version);
		$this->_sessionRead(true);
		add_action("admin_head",array($this,"resourcesLink"));
		add_action("admin_menu",array($this,"_renderAdmin"));
		add_action("wp_ajax_".$this->class."_action", array($this,"_action_ajax"));
		add_action("shutdown",array($this,"_sleepAdmin"));
		$lf=$this->dirInc."/lang.php";
		if(@file_exists($lf))
		{
			@include($lf);
			if(@class_exists("social_monster_lang"))
				$this->langLoaded=social_monster_lang::getLang($this->blogInfo["language"],$this->dirInc."/dashboard");
		}
	}

	private function _renderComments($tpl_link)
	{
		$this->rendered["com"]++;
		@ob_start();
		$tpl=@file_get_contents($tpl_link);
		if($tpl===false)return"";
		$tpl=trim($tpl);
		$tpl=ltrim($tpl,"\xEF\xBB\xBF");
		$head="<?php defined(\"SOCIAL_MONSTER_ON\") or die(\"Error\");?>";
?>
	<!--Social Monster-->
	<div class="<?php echo $this->name?>" id="<?php echo $this->name?>-main">
<?php
		$order=$this->_cfg("sections","order");
		if(!is_array($order))
		{

			echo"
	</div>
	<!--/Social Monster-->\n";
			$tpl=@ob_get_contents();
			@ob_end_clean();
			return $head."\n".$tpl;
		}
		$l=count($order);
		$t=$this->presets["titles"];
		for($c=0;$c<$l;$c++)
		{
			$sect=$order[$c];
			$state=$this->_cfg($sect,"state");
			if(!$state)continue;
			$collapse=$this->_cfg($sect,"collapse");
			if($collapse)
			{
				$collapsed=$this->_cfg($sect,"collapsed");
				if($collapsed)$collapsed=" style=\"display:none;\"";
			}
			else $collapsed=false;
			$json="";
			if($collapse)
			{
?>
		<div id="<?php echo $this->name?>-<?php echo ($sect.$this->rendered["com"])?>-hide" class="collapse <?php echo $sect?>"><div class="logo"></div><div class="btn"><?php if(isset($t[$sect]))echo $this->_($t[$sect]." Comments");?></div></div>
<?php
			}
?>
		<div id="<?php echo $this->name?>-<?php echo ($sect.$this->rendered["com"])?>" class="comments<?php if($collapse)echo " colpd"?>"<?php if($collapsed)echo $collapsed;?>>
<?php
			switch($sect)
			{
				case "int":
					$json=$this->_configJSON("int");
					echo $tpl;
					break;
				case "vk":
					$json=$this->_configJSON("vk");
					break;
				case "fb":
					$json=$this->_configJSON("fb");
					break;
			}
			if($json)
			{
?>
			<script type="text/javascript"><?php echo ($this->class.".")?>newInstance(<?php echo $json?>);</script>
<?php
			}
?>
		</div>
<?php
		}
?>
	</div>
	<!--/Social Monster-->
<?php
		$tpl=@ob_get_contents();
		@ob_end_clean();
		return $head."\n".$tpl;
	}

	private function _sessionRead($admin=false)
	{
		if(!session_id())session_start();
		$tm=time();
		if(isset($_SESSION[$this->name."-stored-time"]))$this->sessionTime=0+$_SESSION[$this->name."-stored-time"];
		else $this->sessionTime=0;
		if($this->sessionTime)
		{
			if(($tm-$this->sessionTime)>$this->sessionTm)$this->sessionTime=0;
			else
			{
				if(isset($_SESSION[$this->name."-stored-data"]))
				{
					$this->session=@unserialize($_SESSION[$this->name."-stored-data"]);
					if(!is_array($this->session) || (!isset($this->session[$this->name."-config"])) || (!is_array($this->session[$this->name."-config"])))$this->sessionTime=0;
					else
					{
						$cur_hash=md5(serialize($this->session[$this->name."-config"]));
						$prev_hash="".get_option($this->name."-config-hash");
						if($cur_hash!=$prev_hash)$this->sessionTime=0;
					}
				}
				else $this->sessionTime=0;
			}
		}
		$data=false;
		if(!$this->sessionTime)
		{
			$this->config=@unserialize(get_option($this->name."-config-data"));
			if(!is_array($this->config))$this->config=array_merge($this->configDef);
			$data=true;
		}
		if(count($this->session))
		{
			if(
				(isset($this->session[$this->name."-config"]["_version"]) && ($this->session[$this->name."-config"]["_version"]!=$this->configDef["_version"]))
				||
				((!isset($this->session[$this->name."-config"]["_version"]) && count($this->session[$this->name."-config"])))
			)
			{
				$this->sessionTime=0;
				$this->config=$this->session[$this->name."-config"];
				$this->_configNormalize();
				$data=true;
			}
		}
		if($data)
		{
			$data=serialize($this->config);
			update_option($this->name."-config-hash",md5($data));
			update_option($this->name."-config-data",$data);
			$this->configReloaded=true;
		}
		else $this->config=$this->session[$this->name."-config"];
	}

	private function _sessionWrite($admin=false)
	{
		if(!$this->sessionTime)
		{
			$this->session[$this->name."-config"]=$this->config;
			$_SESSION[$this->name."-stored-time"]=time();
			$_SESSION[$this->name."-stored-data"]=serialize($this->session);
		}
	}

	public function __construct()
	{
		foreach($this->blogInfo as $key=>$val)$this->blogInfo[$key]=get_bloginfo($key);
		$this->dirBase=str_replace("\\","/",str_replace(basename($_SERVER["SCRIPT_FILENAME"]),"",str_replace($_SERVER["DOCUMENT_ROOT"],"",$_SERVER["SCRIPT_FILENAME"])));
		$this->dirRoot=str_replace("wp-admin","",$this->dirBase);
		$this->dirRoot=str_replace("wp-content","",$this->dirRoot);
		$this->dirRoot=str_replace("wp-includes","",$this->dirRoot);
		$this->dirRoot=str_replace("//","/",$this->dirRoot);
		$this->dirBase=trim($this->dirBase,"/");
		$ps=explode("/",dirname(__FILE__));
		$this->dirPlug=$ps[count($ps)-1];
		$this->dirInc="wp-content/plugins/".$this->dirPlug;
		if($this->dirBase)
		{
			$rc=0;
			$rp=explode("/",$this->dirRoot);
			foreach($rp as $val)if($val)$rc++;
			$bc=0;
			$bp=explode("/",$this->dirBase);
			foreach($bp as $val)if($val)$bc++;
			$bc=$bc-$rc;
			$par="";
			for($c=0;$c<$bc;$c++)$par.="../";
			$this->dirInc=$par.$this->dirInc;
		}
		$this->isDashboard=is_admin();
		if(!$this->isDashboard)$this->_init();
		else $this->_initAdmin();
	}

	public function _action_ajax()
	{
		if(!isset($_POST[$this->name."-action"]))return;
		$action=$_POST[$this->name."-action"];
		switch($action)
		{
			case $this->name."-general-cfg-save":
				$this->_actionSilentGeneralCfgSave();
				break;
			case $this->name."-share-cfg-save":
				$this->_actionSilentShareCfgSave();
				break;
			case $this->name."-fb-cfg-save":
				$this->_actionSilentFbCfgSave();
				break;
			case $this->name."-int-cfg-save":
				$this->_actionSilentIntCfgSave();
				break;
			case $this->name."-vk-cfg-save":
				$this->_actionSilentVkCfgSave();
				break;
			case $this->name."-sup-send":
				$this->_actionSilentSupSend();
				break;
		}
	}

	public function _render($data)
	{
		$ca=current_filter();
		switch($ca)
		{
			case "comments_template":
				$dir="wp-content/uploads/".$this->name;
				if(!@file_exists($dir))
				{
					@mkdir($dir,0755,true);
					if(!@file_exists($dir))return $data;
				}
				$fcom="";
				$templateCheck=0;
				$tm=time();
				foreach(glob($dir."/comments-*.php") as $file)
				{
					if(strpos($file,"comments-tmp.php")!==false)continue;
					preg_match("/comments-(\d+)\.php$/",$file,$fcom);
					if(count($fcom))
					{
						$templateCheck=0+$fcom[1];
						$fcom="comments-".$templateCheck.".php";
						if(!$this->configReloaded || (($tm-$templateCheck)>$this->configDef["section-int"]["wp-template-tm"]))$templateCheck=0;
						break;
					}
				}
				if((!$fcom || ($fcom && !$templateCheck)) && !file_exists($dir."/comments-tmp.php"))
				{
					if($fcom)
					{
						if(@copy($dir."/".$fcom,$dir."/comments-tmp.php")===false)return $data;
						@chmod($dir."/".$fcom, 0755);
					}
					$comments=$this->_renderComments($data);
					$fcomn="comments-".$tm.".php";
					if(@file_put_contents($dir."/".$fcomn,$comments)===false)
					{
						@unlink($dir."/comments-tmp.php");
						echo"Social Monster render error: can't write file [".$dir."/comments.php], access denied.";
						return $data;
					}
					if($fcom)
					{
						@unlink($dir."/comments-tmp.php");
						@unlink($dir."/".$fcom);
					}
					@chmod($dir."/".$fcomn,0755);
					return $dir."/".$fcomn;
				}
				else
				{
					if($fcom)return $dir."/".$fcom;
					else return $data;
				}
				break;
			case "the_content":
				$this->rendered["share"]++;
				if(!is_singular())
				{
					global $post;
					$link=", link: \"".urlencode(get_permalink($post->ID))."\", ";
					$ptitle="title: \"".urlencode($post->post_title)."\"";
				}
				else
				{
					$link="";
					$ptitle="";
				}
				$exrpt=preg_replace ("!\[/?.*\]!U","",$data);
				$exrpt=strip_tags($exrpt);
				if(strpos($exrpt,"<!--more-->")!==false)
				{
					preg_match("/(.*)<!--more-->/s",$exrpt,$m);
					$exrpt=$m[1];
				}
				$exrpt=str_replace( "\r\n"," ",$exrpt);
				$exrpt=str_replace( "\n"," ",$exrpt);
				$exrpt=str_replace( "\r"," ",$exrpt);
				$exrpt=preg_replace("/s+/"," ",$exrpt);
				$exrpt=trim($exrpt);
				$exrpt=mb_substr($exrpt,0,130,"utf-8");
				$exrpt=preg_replace("/(.*)\s[^\s]*$/s","\\1 ...",$exrpt);
				$state=$this->_cfg("share","state");
				$class=$this->_cfg("share","position");
				$top=(strpos($class,"top ")===0);
				@ob_start();
?>
				<div class="<?php echo $this->name?>"><div id="<?php echo $this->name?>-share<?php echo $this->rendered["share"]?>" class="share <?php echo $class?>"><div class="sh-title"><?php echo $this->_("Share with Your friends");?>:</div><!--
<?
				if($state==1)
				{
					$all=$this->_cfg("share","buttons");
					$titles=$this->presets["buttons-titles"];
					foreach($all as $btn)
					{
						$title=(isset($titles[$btn])?$titles[$btn]:"Button");
						switch($btn)
						{
							case "linked-in":
							case "live-journal":
							case "moi-krug":
							case "tumblr":
							case "ya-ru":
								$tag="a";
								break;
							default:
								$tag="div";
						}
?>
				--><<?php echo $tag?> class="btn <?php echo $btn?>" title="<?php echo $title?>"></<?php echo $tag?>><!--
<?php
					}
				}
				if($state==2)
				{
					echo "-->".$this->_cfg("share","sharethis-items")."<!--";
				}
?>
				--></div></div>
<?php
				if($state==1)
				{
?>
			<script type="text/javascript"><?php echo ($this->class.".")?>newInstance({type: "share", <?php echo ("inst: ".$this->rendered["share"].", ")?>buttons:["<?php echo implode("\",\"",$this->_cfg("share","buttons"))?>"], session: "<?php echo md5(session_id());?>", domain: "<?php echo $_SERVER["SERVER_NAME"]?>", excerpt: "<?php echo $exrpt?>", root: "<?php echo $this->dirRoot?>"<?php echo $link.$ptitle?>});</script>
<?php
				}
				$share=@ob_get_contents();
				@ob_end_clean();
				return ($top?($share.$data):($data.$share));
		}
	}

	public function _renderAdmin()
	{
		if(!$this->admin["menuAdded"])
		{
			$this->admin["menuAdded"]=true;
			add_options_page($this->_($this->title." Options"),$this->title,"manage_options",$this->name."-settings",array($this,"_renderAdmin"));
			return;
		}
?>
		<script type="text/javascript">
			<?php echo ($this->class.".")?>setRoot("<?php echo $this->dirRoot?>");
			<?php echo ($this->class.".")?>setDebug(<?php if($this->_cfg("sections","silent-debug"))echo"true";else echo"false";?>);
		</script>
		<div class="<?=$this->name?>">
			<div class="dash">
			<form method="post" action="options.php" id="<?php echo $this->name?>-form" name="<?php echo $this->name?>-form" enctype="multipart/form-data">
				<input type="hidden" id="<?php echo $this->name?>-action" name="<?php echo $this->name?>-action" value="" />
				<div class="title-h2"><?php $this->_($this->title." Options",true)?></div>
				<table cellpadding="3" cellspacing="0" class="general">
				<tr><td colspan="2"><h3 class="title"><?php echo $this->_("Common settings")?></h3></td></tr>
				<tr>
				<td><div class="fld-title"><?php echo $this->_("Template")?></div></td>
				<td>
					<select id="<?php echo $this->name?>-template">
					<option value="default"<?php echo ($this->_cfg("sections","template")=="default"?" selected=\"selected\"":"")?>>default</option>
					</select>
				</td>
				</tr>
				<tr>
				<td><div class="fld-title"><?php echo $this->_("Cache re-check interval, sec.")?></div></td>
				<td>
					<input type="text" id="<?php echo $this->name?>-wp-template-tm" value="<?php echo $this->_cfg("sections","wp-template-tm")?>" />
				</td>
				</tr>
				<tr>
				<td><div class="fld-title"><?php echo $this->_("Comments order")?></div></td>
				<td>
					<table cellpadding="3" cellspacing="0" id="<?php echo $this->name?>-order">
<?php
		$l=count($this->config["sections"]["order"]);
		for($c=0;$c<$l;$c++)
		{
			if($c==($l-1))$dir="up";
			else $dir="dn";
			$num=$c+1;
			$name="Unknown";
			$tp=$this->config["sections"]["order"][$c];
			switch($tp)
			{
				case "vk":$name=$this->_("VKontakte");break;
				case "fb":$name="Facebook";break;
				case "int":$name="Wordpress";break;
				default:break;
			}
?>
					<tr><td>#<?php echo $num?></td><td><span id="<?php echo $this->name?>-order-name-<?php echo $tp?>"><?php echo $name?></span></td><td><span id="<?php echo $this->name?>-order-btn<?php echo $c?>" class="move <?php echo $dir?>"></span></td></tr>
<?php
		}
?>
					</table>
					<div id="<?php echo $this->name?>-order-data" style="display:none;">[<?php echo ("\"".implode("\",\"",$tp=$this->config["sections"]["order"])."\"");?>]</div>
				</td>
				</tr>
				<tr>
				<td><div class="fld-title"><?php echo $this->_("Plugin update")?></div></td>
				<td>
					<select id="<?php echo $this->name?>-update" title="<?php echo $this->_("Will be implemented in further releases")?>...">
					<option value="0">no update</option>
					</select>
				</td>
				</tr>
				<tr>
				<td colspan="2">
					<input type="button" class="btn-action" id="<?php echo $this->name?>-btn-save-general" value="<?php $this->_(SOCIAL_MONSTER_LANG_BSV,true)?>" /><!--
					--><span class="msg-action" id="<?php echo $this->name?>-msg-save-general" style="display:none;">["<?php echo $this->_(SOCIAL_MONSTER_LANG_RSVD)?>!","<?php echo $this->_(SOCIAL_MONSTER_LANG_RERR)?>!"]</span>
				<td>
				</td>
				</tr>
				</table>
				<h3 class="title"><?php echo $this->_("Detailed settings")?></h3>
<?php
		$dis=$this->_(SOCIAL_MONSTER_LANG_MDIS);
		$dis2=$this->_(SOCIAL_MONSTER_LANG_MDIS2);
		$ena=$this->_(SOCIAL_MONSTER_LANG_MENA);
		$ena2=$this->_(SOCIAL_MONSTER_LANG_MENA2);
?>
				<div class="tab-btns" >
					<div class="line">&nbsp;</div>
					<div class="outer">
						<div class="tab-btn act">
							<div class="icon share<? echo ($this->_cfg("share","state")?"":" off")?>" title="<? echo ($this->_cfg("share","state")?$ena:$dis)?>"></div>
							<span id="<?php echo $this->name?>-tab-btn-share"><?php $this->_(SOCIAL_MONSTER_LANG_MSHR,true)?></span>
						</div>
					</div>
					<div class="outer">
						<div class="tab-btn">
							<div class="icon fb<? echo ($this->_cfg("fb","state")?"":" off")?>" title="<? echo ($this->_cfg("fb","state")?$ena:$dis)?>"></div>
							<span id="<?php echo $this->name?>-tab-btn-fb">Facebook</span>
						</div>
					</div>
					<div class="outer">
						<div class="tab-btn">
							<div class="icon vk<? echo ($this->_cfg("vk","state")?"":" off")?>" title="<? echo ($this->_cfg("vk","state")?$ena:$dis)?>"></div>
							<span id="<?php echo $this->name?>-tab-btn-vk"><?php $this->_("VKontakte",true)?></span>
						</div>
					</div>
					<div class="outer">
						<div class="tab-btn">
							<div class="icon int<? echo ($this->_cfg("int","state")?"":" off")?>" title="<? echo ($this->_cfg("int","state")?$ena:$dis)?>"></div>
							<span id="<?php echo $this->name?>-tab-btn-int">Wordpress</span>
						</div>
					</div>
					<div class="outer">
						<div class="tab-btn">
							<div class="icon sup"></div>
							<span id="<?php echo $this->name?>-tab-btn-sup"><?php $this->_(SOCIAL_MONSTER_LANG_MHLP,true)?></span>
						</div>
					</div>
					<div class="outer">
						<div class="tab-btn">
							<div class="icon don"></div>
							<span id="<?php echo $this->name?>-tab-btn-don"><?php $this->_(SOCIAL_MONSTER_LANG_MDON,true)?></span>
						</div>
					</div>
				</div>
				<div class="tabs">
					<div class="tab" id="<?php echo $this->name?>-tab-share">
						<table cellpadding="3" cellspacing="0" class="tab-share">
						<tr><td style="min-width:250px;height:1px;overflow:hidden;">&nbsp;</td><td></td>
						<tr>
						<td><div class="fld-title"><?php echo $this->_(SOCIAL_MONSTER_LANG_STATE)?></div></td>
						<td>
							<select id="<?php echo $this->name;$state=$this->_cfg("share","state");?>-share-state">
							<option value="0"<?php echo ($state?"":" selected=\"selected\"")?>><?php echo $dis2?></option>
							<option value="1"<?php echo ($state?" selected=\"selected\"":"")?>><?php $this->_("Social Monster tool",true)?></option>
							<option value="2"<?php echo (($state==2)?" selected=\"selected\"":"")?>><?php $this->_("ShareThis js-plugin",true)?></option>
							</select>
						</td>
						</tr>
						<tr>
						<td><div class="fld-title"><?php $this->_(SOCIAL_MONSTER_LANG_TPOS,true)?></div></td>
						<td>
							<select id="<?php echo $this->name; $pos=$this->_cfg("share","position");?>-share-position">
							<option value="top left"<?php echo (($pos=="top left")?" selected=\"selected\"":"")?>><?php $this->_("top left",true)?></option>
							<option value="top center"<?php echo (($pos=="top center")?" selected=\"selected\"":"")?>><?php $this->_("top center",true)?></option>
							<option value="top right"<?php echo (($pos=="top right")?" selected=\"selected\"":"")?>><?php $this->_("top right",true)?></option>
							<option value="bottom left"<?php echo (($pos=="bottom left")?" selected=\"selected\"":"")?>><?php $this->_("bottom left",true)?></option>
							<option value="bottom center"<?php echo (($pos=="bottom center")?" selected=\"selected\"":"")?>><?php $this->_("bottom center",true)?></option>
							<option value="bottom right"<?php echo (($pos=="bottom right")?" selected=\"selected\"":"")?>><?php $this->_("bottom right",true)?></option>
							</select>
						</td>
						</tr>
						<tr id="<?php echo $this->name?>-share-set1-1"<?php echo(($state!=1)?" style=\"display:none;\"":"")?>>
						<td><div class="fld-title"><?php $this->_("Select share buttons by clicking",true)?></div></td>
						<td id="<?php echo $this->name?>-share-buttons-all"><!--
<?php
		$all=$this->presets["buttons-all"];
		$titles=$this->presets["buttons-titles"];
		foreach($all as $btn)
		{
			$title=(isset($titles[$btn])?$titles[$btn]:"Button");
?>
							--><div class="btn <?php echo $btn?>" title="<?php echo $title?>"></div><!--
<?php
		}
?>
						--></td>
						</tr>
						<tr id="<?php echo $this->name?>-share-set1-2"<?php echo(($state!=1)?" style=\"display:none;\"":"")?>>
						<td><div class="fld-title share-sel"><?php $this->_("Selected share buttons",true)?></div></td>
						<td id="<?php echo $this->name?>-share-buttons" class="shsel"><?php $bs=$this->_cfg("share","buttons");if(count($bs))echo implode(",",$bs);?></td>
						</tr>
						<tr id="<?php echo $this->name?>-share-set2-1"<?php echo(($state!=2)?" style=\"display:none;\"":"")?>>
						<td colspan="2">
							<?php $this->_(SOCIAL_MONSTER_LANG_STM1,true)?>.<br />
							<?php $this->_(SOCIAL_MONSTER_LANG_STM2,true)?>: <a href="http://www.sharethis.com/get-sharing-tools/" target="_blank">www.sharethis.com/get-sharing-tools</a><br />
							<br />
							<i><b><?php $this->_(SOCIAL_MONSTER_LANG_STM3,true)?>1</b>: <?php $this->_(SOCIAL_MONSTER_LANG_STM4,true)?>.</i><br />
							<i><b><?php $this->_(SOCIAL_MONSTER_LANG_STM3,true)?>2</b>: <?php $this->_(SOCIAL_MONSTER_LANG_STM5,true)?>.</i><br />
							<i><b><?php $this->_(SOCIAL_MONSTER_LANG_STM3,true)?>3</b>: <?php $this->_(SOCIAL_MONSTER_LANG_STM6,true)?>.</i><br />
							<i><b><?php $this->_(SOCIAL_MONSTER_LANG_STM3,true)?>4</b>: <?php $this->_(SOCIAL_MONSTER_LANG_STM7,true)?>.</i>
						</td>
						</tr>
						<tr id="<?php echo $this->name?>-share-set2-2"<?php echo(($state!=2)?" style=\"display:none;\"":"")?>>
						<td colspan="2">
							<?php $this->_(SOCIAL_MONSTER_LANG_STM8,true)?> <span class="hover"><span class="screen num1"></span><?php $this->_(SOCIAL_MONSTER_LANG_STM9,true)?></span>.
						</td>
						</tr>
						<tr id="<?php echo $this->name?>-share-set2-3"<?php echo(($state!=2)?" style=\"display:none;\"":"")?>>
						<td colspan="2" class="field-2col">
							<textarea id="<?php echo $this->name?>-share-sharethis-html" class="sharethis-html"><?php echo(str_replace("</span>","</span>\r\n",$this->_cfg("share","sharethis-items")))?></textarea>
						</td>
						</tr>
						<tr id="<?php echo $this->name?>-share-set2-4"<?php echo(($state!=2)?" style=\"display:none;\"":"")?>>
						<td colspan="2">
							<?php $this->_(SOCIAL_MONSTER_LANG_STM10,true)?> <span class="hover"><span class="screen num2"></span><?php $this->_(SOCIAL_MONSTER_LANG_STM9,true)?></span>.
						</td>
						</tr>
						<tr id="<?php echo $this->name?>-share-set2-5"<?php echo(($state!=2)?" style=\"display:none;\"":"")?>>
						<td><div class="fld-title">Publisher</div></td>
						<td>
							<input type="text" id="<?php echo $this->name?>-share-sharethis-publisher" class="sharethis-publ" value="<?php echo $this->_cfg("share","sharethis-publisher")?>" />
						</td>
						</tr>
						<tr><td colspan="2" class="field-2col note"><?php $this->_(SOCIAL_MONSTER_LANG_NSHR,true)?></td></tr>
						<tr>
						<td colspan="2" class="btn-save-hld">
							<input type="button" class="btn-action" id="<?php echo $this->name?>-btn-save-share" value="<?php $this->_(SOCIAL_MONSTER_LANG_BSV,true)?>" /><!--
							--><span class="msg-action" id="<?php echo $this->name?>-msg-save-share" style="display:none;">["<?php $this->_(SOCIAL_MONSTER_LANG_RSVD,true)?>!","<?php $this->_(SOCIAL_MONSTER_LANG_RERR,true)?>!"]</span>
						<td>
						</td>
						</tr>
						</table>
					</div>
					<div class="tab" id="<?php echo $this->name?>-tab-fb" style="display:none;">
						<table cellpadding="3" cellspacing="0" class="tab-fb">
						<tr>
						<td><div class="fld-title"><?php $this->_(SOCIAL_MONSTER_LANG_STATE,true)?></div></td>
						<td>
							<select id="<?php echo $this->name?>-fb-state">
							<option value="0"<?php echo ($this->_cfg("fb","state")?"":" selected=\"selected\"")?>><?php echo $dis2?></option>
							<option value="1"<?php echo ($this->_cfg("fb","state")?" selected=\"selected\"":"")?>><?php echo $ena2?></option>
							</select>
						</td>
						</tr>
						<tr>
						<td><div class="fld-title">AppId</div></td>
						<td>
							<input type="text" id="<?php echo $this->name?>-fb-appid" value="<?php echo $this->_cfg("fb","appId")?>" />
						</td>
						</tr>
						<tr>
						<td><div class="fld-title"><?php $this->_("Injected SDK script",true)?></div></td>
						<td>
							<input type="text" id="<?php echo $this->name?>-fb-script" value="<?php echo $this->_cfg("fb","script")?>" />
						</td>
						</tr>
						<tr>
						<td><div class="fld-title"><?php $this->_("Widget width",true)?></div></td>
						<td>
							<input type="text" id="<?php echo $this->name?>-fb-width" value="<?php echo $this->_cfg("fb","width")?>" />
						</td>
						</tr>
						<tr>
						<td><div class="fld-title"><?php $this->_("Initial posts count",true)?></div></td>
						<td>
							<input type="text" id="<?php echo $this->name?>-fb-num_posts" value="<?php echo $this->_cfg("fb","num_posts")?>" /><br />
						</td>
						</tr>
						<tr>
						<td><div class="fld-title"><?php $this->_("Color Scheme",true)?></div></td>
						<td>
							<select id="<?php echo $this->name?>-fb-colorscheme">
							<option value="light"<?php echo ($this->_cfg("fb","colorscheme")=="light"?" selected=\"selected\"":"")?>><?php $this->_(SOCIAL_MONSTER_LANG_FBL,true)?></option>
							<option value="dark"<?php echo ($this->_cfg("fb","colorscheme")=="dark"?" selected=\"selected\"":"")?>><?php $this->_(SOCIAL_MONSTER_LANG_FBD,true)?></option>
							</select>
						</td>
						</tr>
						<tr>
						<td><div class="fld-title"><?php $this->_("Sort order",true)?></div></td>
						<td>
							<select id="<?php echo $this->name?>-fb-order_by">
							<option value="reverse_time"<?php echo ($this->_cfg("fb","order_by")=="reverse_time"?" selected=\"selected\"":"")?>><?php $this->_("by time (reversed)",true)?></option>
							<option value="time"<?php echo ($this->_cfg("fb","order_by")=="time"?" selected=\"selected\"":"")?>><?php $this->_("by time",true)?></option>
							<option value="social"<?php echo ($this->_cfg("fb","order_by")=="social"?" selected=\"selected\"":"")?>><?php $this->_("by popularity",true)?></option>
							</select>
						</td>
						</tr>
						<tr>
						<td><div class="fld-title"><?php $this->_(SOCIAL_MONSTER_LANG_BLDISP,true)?></div></td>
						<td>
							<select id="<?php echo $this->name?>-fb-collapse">
							<option value="none"<?php echo ($this->_cfg("fb","collapse")?"":" selected=\"selected\"")?>><?php $this->_(SOCIAL_MONSTER_LANG_BLDISP1,true)?></option>
							<option value="1"<?php echo ($this->_cfg("fb","collapse")?" selected=\"selected\"":"")?>><?php $this->_(SOCIAL_MONSTER_LANG_BLDISP2,true)?></option>
							</select><br />
							<label<?php echo ($this->_cfg("fb","collapse")?"":" style=\"visibility:hidden;\"")?>><input type="checkbox" id="<?php echo $this->name?>-fb-collapsed"<?php echo ($this->_cfg("fb","collapsed")?" checked=\"checked\"":"")?>> <?php $this->_(SOCIAL_MONSTER_LANG_BLDISP3,true)?></label>
						</td>
						</tr>
						<tr><td colspan="2" class="field-2col note"><?php $this->_(SOCIAL_MONSTER_LANG_NSHR,true)?></td></tr>
						<tr>
						<td colspan="2" class="btn-save-hld">
							<input type="button" class="btn-action" id="<?php echo $this->name?>-btn-save-fb" value="<?php $this->_(SOCIAL_MONSTER_LANG_BSV,true)?>" /><!--
							--><span class="msg-action" id="<?php echo $this->name?>-msg-save-fb" style="display:none;">["<?php $this->_(SOCIAL_MONSTER_LANG_RSVD,true)?>!","<?php $this->_(SOCIAL_MONSTER_LANG_RERR,true)?>!"]</span>
						<td>
						</td>
						</tr>
						</table>
					</div>
					<div class="tab" id="<?php echo $this->name?>-tab-vk" style="display:none;">
						<table cellpadding="3" cellspacing="0" class="tab-vk">
						<tr>
						<td><div class="fld-title"><?php $this->_(SOCIAL_MONSTER_LANG_STATE,true)?></div></td>
						<td>
							<select id="<?php echo $this->name?>-vk-state">
							<option value="0"<?php echo ($this->_cfg("vk","state")?"":" selected=\"selected\"")?>><?php echo $dis2?></option>
							<option value="1"<?php echo ($this->_cfg("vk","state")?" selected=\"selected\"":"")?>><?php echo $ena2?></option>
							</select>
						</td>
						</tr>
						<tr>
						<td><div class="fld-title">ApiId</div></td>
						<td>
							<input type="text" id="<?php echo $this->name?>-vk-apiid" value="<?php echo $this->_cfg("vk","apiId")?>" />
						</td>
						</tr>
						<tr>
						<td><div class="fld-title"><?php $this->_("Injected SDK script",true)?></div></td>
						<td>
							<input type="text" id="<?php echo $this->name?>-vk-script" value="<?php echo $this->_cfg("vk","script")?>" />
						</td>
						</tr>
						<tr>
						<td><div class="fld-title"><?php $this->_("Widget width",true)?></div></td>
						<td>
							<input type="text" id="<?php echo $this->name?>-vk-width" value="<?php echo $this->_cfg("vk","width")?>" /><br />
							<i><?php $this->_("use 0 (zero) to set to auto",true)?></i>
						</td>
						</tr>
						<tr>
						<td><div class="fld-title"><?php $this->_("Widget height",true)?></div></td>
						<td>
							<input type="text" id="<?php echo $this->name?>-vk-height" value="<?php echo $this->_cfg("vk","height")?>" /><br />
							<i><?php $this->_("use 0 (zero) to set to auto",true)?></i>
						</td>
						</tr>
						<tr>
						<td><div class="fld-title"><?php $this->_("Initial posts count",true)?></div></td>
						<td>
							<input type="text" id="<?php echo $this->name?>-vk-limit" value="<?php echo $this->_cfg("vk","limit")?>" /><br />
						</td>
						</tr>
						<tr>
						<td><div class="fld-title"><?php $this->_("Attachment types",true)?></div></td>
						<td>
							<select id="<?php echo $this->name?>-vk-attach"><?php $at=$this->_cfg("vk","attach");?>
							<option value="*"<?php echo ($at==="*"?" selected=\"selected\"":"")?>><?php $this->_("allow all",true)?></option>
							<option value="select"<?php echo ($at!=="*"?" selected=\"selected\"":"")?>><?php $this->_("select below",true)?></option>
							</select><br />
							<div id="<?php echo $this->name?>-vk-attach-more" <?php echo ($at==="*"?" style=\"display:none;\"":"")?>>
								<label class="vk-attach"><input type="checkbox" id="<?php echo $this->name?>-vk-attach-graffiti"<?php echo ((strpos($at,"graffiti")===false)?"":" checked=\"checked\"")?>> <?php $this->_(SOCIAL_MONSTER_LANG_VKAT_GRAFF,true)?></label>
								<label class="vk-attach"><input type="checkbox" id="<?php echo $this->name?>-vk-attach-photo"<?php echo ((strpos($at,"photo")===false)?"":" checked=\"checked\"")?>> <?php $this->_(SOCIAL_MONSTER_LANG_VKAT_PHOTO,true)?></label>
								<label class="vk-attach"><input type="checkbox" id="<?php echo $this->name?>-vk-attach-audio"<?php echo ((strpos($at,"audio")===false)?"":" checked=\"checked\"")?>> <?php $this->_(SOCIAL_MONSTER_LANG_VKAT_AUDIO,true)?></label>
								<label class="vk-attach"><input type="checkbox" id="<?php echo $this->name?>-vk-attach-video"<?php echo ((strpos($at,"video")===false)?"":" checked=\"checked\"")?>> <?php $this->_(SOCIAL_MONSTER_LANG_VKAT_VIDEO,true)?></label>
								<label class="vk-attach"><input type="checkbox" id="<?php echo $this->name?>-vk-attach-link"<?php echo ((strpos($at,"link")===false)?"":" checked=\"checked\"")?>> <?php $this->_(SOCIAL_MONSTER_LANG_VKAT_LINK,true)?></label>
							</div>
						</td>
						</tr>
						<tr>
						<td><div class="fld-title"><?php $this->_("Widget container id",true)?></div></td>
						<td>
							<input type="text" id="<?php echo $this->name?>-vk-element_id" value="<?php echo $this->_cfg("vk","element_id")?>" /><br />
						</td>
						</tr>
						<tr>
						<td><div class="fld-title"><?php $this->_("Real-time updates",true)?></div></td>
						<td>
							<select id="<?php echo $this->name?>-vk-norealtime">
							<option value="0"<?php echo ($this->_cfg("vk","norealtime")?" selected=\"selected\"":"")?>><?php echo $dis2?></option>
							<option value="1"<?php echo ($this->_cfg("vk","norealtime")?"":" selected=\"selected\"")?>><?php echo $ena2?></option>
							</select>
						</td>
						</tr>
						<tr>
						<td><div class="fld-title"><?php $this->_(SOCIAL_MONSTER_LANG_BLDISP,true)?></div></td>
						<td>
							<select id="<?php echo $this->name?>-vk-collapse">
							<option value="none"<?php echo ($this->_cfg("vk","collapse")?"":" selected=\"selected\"")?>><?php $this->_(SOCIAL_MONSTER_LANG_BLDISP1,true)?></option>
							<option value="1"<?php echo ($this->_cfg("vk","collapse")?" selected=\"selected\"":"")?>><?php $this->_(SOCIAL_MONSTER_LANG_BLDISP2,true)?></option>
							</select><br />
							<label<?php echo ($this->_cfg("vk","collapse")?"":" style=\"visibility:hidden;\"")?>><input type="checkbox" id="<?php echo $this->name?>-vk-collapsed"<?php echo ($this->_cfg("vk","collapsed")?" checked=\"checked\"":"")?>> <?php $this->_(SOCIAL_MONSTER_LANG_BLDISP3,true)?></label>
						</td>
						</tr>
						<tr><td colspan="2" class="field-2col note"><?php $this->_(SOCIAL_MONSTER_LANG_NSHR,true)?></td></tr>
						<tr>
						<td colspan="2" class="btn-save-hld">
							<input type="button" class="btn-action" id="<?php echo $this->name?>-btn-save-vk" value="<?php $this->_(SOCIAL_MONSTER_LANG_BSV,true)?>" /><!--
							--><span class="msg-action" id="<?php echo $this->name?>-msg-save-vk" style="display:none;">["<?php $this->_(SOCIAL_MONSTER_LANG_RSVD,true)?>!","<?php $this->_(SOCIAL_MONSTER_LANG_RERR,true)?>!"]</span>
						<td>
						</td>
						</tr>
						</table>
					</div>
					<div class="tab" id="<?php echo $this->name?>-tab-int" style="display:none;">
						<table cellpadding="3" cellspacing="0" class="tab-int">
						<tr>
						<td><div class="fld-title"><?php $this->_(SOCIAL_MONSTER_LANG_STATE,true)?></div></td>
						<td>
							<select id="<?php echo $this->name?>-int-state">
							<option value="0"<?php echo ($this->_cfg("int","state")?"":" selected=\"selected\"")?>><?php echo $dis2?></option>
							<option value="1"<?php echo ($this->_cfg("int","state")?" selected=\"selected\"":"")?>><?php echo $ena2?></option>
							</select>
						</td>
						</tr>
						<tr>
						<td><div class="fld-title"><?php $this->_(SOCIAL_MONSTER_LANG_BLDISP,true)?></div></td>
						<td>
							<select id="<?php echo $this->name?>-int-collapse">
							<option value="none"<?php echo ($this->_cfg("int","collapse")?"":" selected=\"selected\"")?>><?php $this->_(SOCIAL_MONSTER_LANG_BLDISP1,true)?></option>
							<option value="1"<?php echo ($this->_cfg("int","collapse")?" selected=\"selected\"":"")?>><?php $this->_(SOCIAL_MONSTER_LANG_BLDISP2,true)?></option>
							</select><br />
							<label<?php echo ($this->_cfg("int","collapse")?"":" style=\"visibility:hidden;\"")?>><input type="checkbox" id="<?php echo $this->name?>-int-collapsed"<?php echo ($this->_cfg("int","collapsed")?" checked=\"checked\"":"")?>> <?php $this->_(SOCIAL_MONSTER_LANG_BLDISP3,true)?></label>
						</td>
						</tr>
						<tr><td colspan="2" class="field-2col note"><?php $this->_(SOCIAL_MONSTER_LANG_NSHR,true)?></td></tr>
						<tr>
						<td colspan="2" class="btn-save-hld">
							<input type="button" class="btn-action" id="<?php echo $this->name?>-btn-save-int" value="<?php $this->_(SOCIAL_MONSTER_LANG_BSV,true)?>" /><!--
							--><span class="msg-action" id="<?php echo $this->name?>-msg-save-int" style="display:none;">["<?php $this->_(SOCIAL_MONSTER_LANG_RSVD,true)?>!","<?php $this->_(SOCIAL_MONSTER_LANG_RERR,true)?>!"]</span>
						<td>
						</td>
						</tr>
						</table>
					</div>
					<div class="tab tab-sup" id="<?php echo $this->name?>-tab-sup" style="display:none;">
						<?php $this->_(SOCIAL_MONSTER_LANG_SUP_STR1,true)?>.<br />
						<?php $this->_(SOCIAL_MONSTER_LANG_SUP_STR2,true)?>.<br />
						<i>(<?php $this->_(SOCIAL_MONSTER_LANG_SUP_STR3,true)?>)</i><br />
						<br /><br />
						<?php $this->_("Select the type of a message",true)?>:<br />
						<select id="<?php echo $this->name?>-sup-type">
							<option value="question"><?php $this->_("just a question",true)?></option>
							<option value="propose"><?php $this->_("improvement proposal",true)?></option>
							<option value="bugreport"><?php $this->_("bug report",true)?></option>
						</select>
						<br />
						<br />
						<?php $this->_("E-mail for answer",true)?>:<br />
						<input id="<?php echo $this->name?>-sup-email" type="text" value="" /><br />
						<br />
						<?php $this->_("Short description/title",true)?>:<br />
						<input id="<?php echo $this->name?>-sup-title" type="text" value="" /><br />
						<br />
						<?php $this->_("Full description",true)?>:<br /><textarea id="<?php echo $this->name?>-sup-descr"></textarea><br />
						<br />
						<input type="button" class="btn-action" id="<?php echo $this->name?>-btn-save-sup" value="<?php $this->_(SOCIAL_MONSTER_LANG_BSN,true)?>" /><!--
						--><span class="msg-action" id="<?php echo $this->name?>-msg-save-sup" style="display:none;">["<?php $this->_(SOCIAL_MONSTER_LANG_RSNT,true)?>!","<?php $this->_(SOCIAL_MONSTER_LANG_RERR,true)?>!"]</span>
					</div>
					<div class="tab tab-don" id="<?php echo $this->name?>-tab-don" style="display:none;">
						<div style="font-size:16px;"><?php $this->_(SOCIAL_MONSTER_LANG_DON_STR1,true)?>.</div><br />
						<?php $this->_(SOCIAL_MONSTER_LANG_DON_STR2,true)?> :).<br />
						<br />
						<div class="pay-way">
							<div class="pay-btn paypal">PayPal</div>
							<i><?php $this->_("Target account",true)?>: <b>me@bogdan-nazar.ru</b></i><br />
							<a href="https://www.paypal.com/cgi-bin/webscr?cmd=%5fsend%2dmoney&nav=1" target="_blank"><?php $this->_("navigate to PayPal transfer page",true)?></a>
						</div>
						<br /><br />
						<div class="pay-way">
							<div class="pay-btn yandex">Yandex Money</div>
							<iframe frameborder="0" allowtransparency="true" scrolling="no" src="https://money.yandex.ru/embed/donate.xml?uid=4100175358935&amp;default-sum=10&amp;targets=%D0%B4%D0%BE%D0%B1%D1%80%D0%BE%D0%B2%D0%BE%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F+%D0%BF%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B0+%D0%BF%D0%BB%D0%B0%D0%B3%D0%B8%D0%BD%D0%B0+WP&amp;project-name=&amp;project-site=&amp;button-text=05&amp;hint=" width="450" height="78"></iframe><br />
							<i><?php $this->_("Target wallet",true)?>: <b>4100175358935</b></i><br />
							<a href="https://money.yandex.ru/" target="_blank"><?php $this->_("navigate to Yandex Money transfer page",true)?></a>
						</div>
						<br /><br />
						<div class="pay-way">
							<div class="pay-btn qiwi">Qiwi Eggs</div>
							<i><?php $this->_("Select \"Отправить\" option and enter this e-mail",true)?>: <b>me@bogdan-nazar.ru</b></i><br />
							<a href="https://w.qiwi.com/eggs/buy/form.action" target="_blank"><?php $this->_("navigate to Qiwi Wallet transfer page",true)?></a>
						</div>
					</div>
				</div>
			</form>
			</div>
		</div>
<?php
	}

	public function _sleep()
	{
		$this->_sessionWrite();
	}

	public function _sleepAdmin()
	{
		$this->_sessionWrite(true);
	}

	public function blogInfo($key)
	{
		if(isset($this->blogInfo[$key]))return $this->blogInfo[$key];
		return"";
	}

	public function mailCT()
	{
		return"text/html";
	}

	public function resourcesLink()
	{
		if($this->isDashboard)
		{
?>
		<script type="text/javascript" src="<?php echo($this->dirRoot."wp-content/plugins/".$this->dirPlug."/dashboard/scripts/".$this->name.".js?ver=".implode(".",$this->version))?>"></script>
		<script type="text/javascript" src="<?php echo($this->dirRoot."wp-content/plugins/".$this->dirPlug."/dashboard/scripts/popup.js?ver=".implode(".",$this->version))?>"></script>
		<link type="text/css" href="<?php echo($this->dirRoot."wp-content/plugins/".$this->dirPlug."/dashboard/styles/".$this->name.".css?ver=".implode(".",$this->version))?>" media="all" rel="stylesheet" />
		<link type="text/css" href="<?php echo($this->dirRoot."wp-content/plugins/".$this->dirPlug."/dashboard/styles/popup.css?ver=".implode(".",$this->version))?>" media="all" rel="stylesheet" />
<?php
		}
		else
		{
			$ca=current_filter();
			switch($ca)
			{
				case "admin_head":
					break;
				default:
?>
		<script type="text/javascript" src="<?php echo($this->dirRoot."wp-content/plugins/".$this->dirPlug."/templates/".$this->configDef["sections"]["template"]."/scripts/".$this->name.".js?ver=".implode(".",$this->version))?>"></script>
		<link type="text/css" href="<?php echo($this->dirRoot."wp-content/plugins/".$this->dirPlug."/templates/".$this->configDef["sections"]["template"]."/styles/".$this->name.".css?ver=".implode(".",$this->version))?>" media="all" rel="stylesheet" />
<?php
			}
		}
	}

	public function resourcesLinkShareThis()
	{
?>
		<script type="text/javascript">var switchTo5x=true;</script>
		<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
		<script type="text/javascript">stLight.options({publisher: "<?php echo $this->_cfg("share","sharethis-publisher")?>", doNotHash: true, doNotCopy: true, hashAddressBar: false});</script>
<?php
	}

	public function resourcesLinkVK()
	{
?>
		<script type="text/javascript" src="<?php echo $this->_cfg("vk","script")?>"></script>
<?php
	}
}
new social_monster();
?>
