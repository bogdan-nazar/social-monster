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
	private $admin			=	array(
		"menuAdded"			=>	false
	);
	private $blogInfo		=	array(
		"name"				=>	"Blog",
		"language"			=>	"en-US",
		"url"				=>	"",
		"version"			=>	"3.2.1",
		"wpurl"				=>	""
	);
	private $clScripts		=	array();
	private $clStyles		=	array();
	private $class			=	__CLASS__;
	private $config			=	array(
		"wp-template-tm"	=>	300,
		"template"			=>	"default",
		"update"			=>	"manual"
	);
	private $dirBase		=	"";
	private $dirInc			=	"";
	private $dirRoot		=	"/";
	private $isDashboard	=	false;
	private $name			=	"social-monster";
	private $langLoaded		=	false;
	private $session		=	array();
	private $title			=	"Social Monster";
	private $varsion		=	array(1,0,0);

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

	private function _init()
	{
		if(isset($_SESSTION[$this->class."-stored-data"]))$this->session=unserialize($_SESSTION[$this->class."-stored-data"]);
		$tm=time();
		if(!isset($this->session["template-last-check"]) || !$this->session["template-last-check"])$this->session["template-last-check"]=$tm;
		else
		{
			if(($tm-$this->session["template-last-check"])>$this->config["wp-template-tm"])$this->session["template-last-check"]=0;
		}
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
				$dir="wp-content/uploads/".$this->class;
				if(!@file_exists($dir))
				{
					@mkdir($dir, 0755, true);
					if(!@file_exists($dir))return $data;
				}
				if(!@file_exists($dir."/comments.php") || (!$this->session["template-last-check"]))
				{
					$tpl=@file_get_contents($data);
					$tpl=trim($tpl);
					$tpl=ltrim($tpl,"\xEF\xBB\xBF");
					$head="<?php defined(\"SOCIAL_MONSTER_ON\") or die(\"Error\");?>
		<!--Social Monster-->
		<div class=\"".$this->class."\">
			";
					$foot="
			Social Monster
			<script type=\"text/javascript\"></script>
		</div>
		<!--/Social Monster-->
";
					@file_put_contents($dir."/comments.php",$head.$tpl.$foot);
					if(!@file_exists($dir."/comments.php"))
					{
						echo"Social Monster render error: can't write file [".$dir."/comments.php], access denied.";
						return $data;
					}
					return $dir."/comments.php";
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
		<script type="text/javascript" src="<?php echo($this->dirRoot."wp-content/plugins/".$this->name."/templates/".$this->config["template"]."/scripts/".$this->name."-admin.js")?>"></script>
		<link type="text/css" href="<?php echo($this->dirRoot."wp-content/plugins/".$this->name."/templates/".$this->config["template"]."/styles/".$this->name."-admin.css")?>" media="all" rel="stylesheet" />
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
		<script type="text/javascript" src="<?php echo($this->dirRoot."wp-content/plugins/".$this->name."/templates/".$this->config["template"]."/scripts/".$this->name.".js")?>"></script>
		<link type="text/css" href="<?php echo($this->dirRoot."wp-content/plugins/".$this->name."/templates/".$this->config["template"]."/styles/".$this->name.".css")?>" media="all" rel="stylesheet" />
	<?php
			}
		}
	}
}
new social_monster();
?>
