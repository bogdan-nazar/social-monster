<?php
/*
Plugin Name: Social Monster
Version: 1.0.0
Description: Adds various social features - likes, comments, etc.
Requires at least: 3.2.1
Tested up to: 3.6.1
Plugin URI: http://www.bogdan-nazar.ru/wordpress/my-plugins/social-monster
Author: Bogdan Nazar
Author URI: http://www.bogdan-nazar.ru/
Stable tag: 1.0.0
License: MIT
*/
define("SOCIAL_MONSTER_ON",1,false);
final class social_monster
{
	private $admin				=	array(
		"menuAdded"				=>	false
	);
	private $blogInfo			=	array(
		"name"					=>	"Blog",
		"language"				=>	"en-US",
		"url"					=>	"",
		"version"				=>	"3.2.1",
		"wpurl"					=>	""
	);
	private $clScripts			=	array();
	private $clStyles			=	array();
	private $class				=	__CLASS__;
	private $config				=	array(
		"section-int"			=>array(
		),
		"section-int-def"		=>	array(
			"collapsed"			=>	0,
			"order"				=>	array("int","vk"),
			"state"				=>	1,
			"template"			=>	"default",
			"update"			=>	"manual",
			"wp-template-tm"	=>	300
		),
		"section-share-def"		=>	array(
		),
		"section-vk"			=>array(
		),
		"section-vk-def"		=>	array(
			"apiId"				=>	"3952643",
			"attach"			=>	"*", //graffiti, photo, audio, video, link
			"collapsed"			=>	0,
			"height"			=>	0,
			"element_id"		=>	"vk_comments",
			"limit"				=>	10,
			"norealtime"		=>	0,
			"script"			=>	"//vk.com/js/api/openapi.js?101",
			"state"				=>	1,
			"width"				=>	0, //0 - auto
		)
	);
	private $dirBase			=	"";
	private $dirInc				=	"";
	private $dirRoot			=	"/";
	private $isDashboard		=	false;
	private $name				=	"social-monster";
	private $langLoaded			=	false;
	private $rendered			=	array("com"=>0,"share"=>0);
	private $session			=	array();
	private $title				=	"Social Monster";
	private $version			=	array(1,0,0);

	private function _($id,$render=false)
	{
		if(!$this->langLoaded)
		{
			if($render)
			{
				echo $id;
				return;
			}
			else return $id;
		}
		return social_monster_lang::_($id,$render,$this);
	}

	private function _cfg($section,$param)
	{
		if(!isset($this->config["section-".$section]))return"";
		if(!isset($this->config["section-".$section][$param]))
		{
			if(!isset($this->config["section-".$section."-def"][$param]))return"";
			return $this->config["section-".$section."-def"][$param];
		}
		else return $this->config["section-".$section][$param];
	}

	private function _init()
	{
		if(isset($_SESSTION[$this->class."-stored-data"]))$this->session=unserialize($_SESSTION[$this->class."-stored-data"]);
		add_action("wp_head",array($this,"resourcesLink"));
		add_filter("comments_template",array($this,"_render"));
		//$ya_share=get_option('ya_share');
		//update_option($this->class, ya_share_sanitize((array)$op));
	}

	private function _initAdmin()
	{
		add_action("admin_head",array($this,"resourcesLink"));
		add_action("admin_menu",array($this,"_renderAdmin"));
		//register_setting("ya-share-settings","ya_share",array($this,"settings"));
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
	<div class="<?php echo $this->class?>" id="<?php echo $this->name?>-main">
		<div class="title">Social Monster</div>
<?php
		$order=$this->_cfg("int","order");
		if(!is_array($order))return"";
		$l=count($order);
		for($c=0;$c<$l;$c++)
		{
			$sect=$order[$c];
			$state=$this->_cfg($sect,"state");
			$collapsed=$this->_cfg($sect,"collapsed");
			if(!$state)continue;
?>
		<div id="<?php echo $this->name?>-<?php echo ($sect.$this->rendered["com"])?>" style="display:'<?php if($collapsed)echo"none";else echo"block";?>';">
<?php
			switch($sect)
			{
				case "int":
					echo $tpl;
					break;
				case "vk":
					$json=array();
					$apiId=$this->_cfg("vk","apiId");
					if(!$apiId)
					{
						echo "Wrong VK apiId supplied.";
						break;
					}
					$json[]="instNum:".$this->rendered["com"].",apiId:\"".$apiId."\"";
					//attach
					$attach=$this->_cfg("vk","attach");
					if($attach!=$this->config["section-vk-def"]["attach"])$json[]="attach:\"".$attach."\"";
					if(!$attach)$attach=$this->config["section-vk-def"]["attach"];
					//height
					$height=0+$this->_cfg("vk","height");
					if($height!=$this->config["section-vk-def"]["height"])$json[]="height:".$height;
					//element_id
					$element_id=$this->_cfg("vk","element_id");
					if($element_id!=$this->config["section-vk-def"]["element_id"])$json[]="element_id:".$element_id;
					if(!$element_id)$element_id=$this->config["section-vk-def"]["element_id"];
					//limit
					$limit=$this->_cfg("vk","limit");
					if($limit!=$this->config["section-vk-def"]["limit"])$json[]="limit:".$limit;
					if(!$limit)$limit=$this->config["section-vk-def"]["limit"];
					//norealtime
					$norealtime=$this->_cfg("vk","norealtime");
					if($norealtime!=$this->config["section-vk-def"]["norealtime"])$json[]="norealtime:".$norealtime;
					if($norealtime>1)$norealtime=1;
					if($norealtime<0)$norealtime=0;
					//script
					$script=$this->_cfg("vk","script");
					if($script!=$this->config["section-vk-def"]["script"])$json[]="script:\"".$script."\"";
					if(!$script)
					{
						$script=$this->config["section-vk-def"]["script"];
						unset($this->config["section-vk"]["script"]);
					}
					add_action("wp_head",array($this,"resourcesLinkVK"));
					//width
					$width=0+$this->_cfg("vk","width");
					if($width!=$this->config["section-vk-def"]["width"])$json[]="width:".$width;
?>
			<script type="text/javascript"><?php echo ($this->class.".")?>newInstance({type:"<?php echo $sect?>"<?php echo (",".implode(",",$json))?>});</script>
<?php
					break;
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

	public function __construct()
	{
		foreach($this->blogInfo as $key=>$val)$this->blogInfo[$key]=get_bloginfo($key);
		$this->dirBase=str_replace("\\","/",str_replace(basename($_SERVER["SCRIPT_FILENAME"]),"",str_replace($_SERVER["DOCUMENT_ROOT"],"",$_SERVER["SCRIPT_FILENAME"])));
		$this->dirRoot=str_replace("wp-admin","",$this->dirBase);
		$this->dirRoot=str_replace("wp-content","",$this->dirRoot);
		$this->dirRoot=str_replace("wp-includes","",$this->dirRoot);
		$this->dirRoot=str_replace("//","/",$this->dirRoot);
		$this->dirBase=trim($this->dirBase,"/");
		$this->dirInc="wp-content/plugins/".$this->name;
		if($this->dirBase)
		{
			$l=count(explode("/",$this->dirBase));
			$par="";
			for($c=0;$c<$l;$c++)$par.="../";
			$this->dirInc=$par.$this->dirInc;
		}
		$langFile=$this->dirInc."/templates/".$this->config["template"]."/lang.php";
		if(@file_exists($langFile))
		{
			@include($langFile);
			if(@class_exists($this->class."_lang"))$this->langLoaded=true;
		}
		$this->isDashboard=is_admin();
		if(!$this->isDashboard)$this->_init();
		else $this->_initAdmin();
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
						if(($tm-$templateCheck)>$this->config["section-int-def"]["wp-template-tm"])$templateCheck=0;
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
		//settings_fields($this->name."-settings");
?>
		<div class="<?=$this->name?>">
			<div class="dash">
			<form method="post" action="options.php" name="<?php echo $this->name?>-form" id="<?php echo $this->name?>-form" >
				<div class="title-h2"><?php $this->_($this->title." Options",true)?></div>
			</form>
			</div>
		</div>
<?php
	}

	public function _sleep()
	{
		if(count($this->session))$_SESSTION[$this->class."-stored-data"]=serialize($this->session);
	}

	public function blogInfo($key)
	{
		if(isset($this->blogInfo[$key]))return $this->blogInfo[$key];
		return"";
	}

	public function resourcesLink()
	{
		if($this->isDashboard)
		{
?>
		<script type="text/javascript" src="<?php echo($this->dirRoot."wp-content/plugins/".$this->name."/templates/".$this->config["section-int-def"]["template"]."/scripts/".$this->name."-admin.js")?>"></script>
		<link type="text/css" href="<?php echo($this->dirRoot."wp-content/plugins/".$this->name."/templates/".$this->config["section-int-def"]["template"]."/styles/".$this->name."-admin.css")?>" media="all" rel="stylesheet" />
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
		<script type="text/javascript" src="<?php echo($this->dirRoot."wp-content/plugins/".$this->name."/templates/".$this->config["section-int-def"]["template"]."/scripts/".$this->name.".js")?>"></script>
		<link type="text/css" href="<?php echo($this->dirRoot."wp-content/plugins/".$this->name."/templates/".$this->config["section-int-def"]["template"]."/styles/".$this->name.".css")?>" media="all" rel="stylesheet" />
<?php
			}
		}
	}

	public function resourcesLinkVK()
	{
?>
		<script type="text/javascript" src="<?php echo $this->_cfg("vk","script")?>"></script>
		<link type="text/css" href="<?php echo($this->dirRoot."wp-content/plugins/".$this->name."/templates/".$this->config["section-int-def"]["template"]."/styles/vk.css")?>" media="all" rel="stylesheet" />
<?php
	}
}
new social_monster();
?>
