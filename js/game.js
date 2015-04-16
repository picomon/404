$( document ).ready( function () {

	// おまじない
    window._picomon_savedScore = function ( data ) {
    };
    var js = document.createElement( 'script' );
    js.src = 'https://www.picomon.jp/game/get_solt.js';
    var fjs = document.getElementsByTagName( 'script' )[ 0 ];
    fjs.parentNode.insertBefore( js, fjs );

    js.onload = function() {
        __404_picomon_solt__();
    };

	// 選択肢
	var options;

	// ゲーム設定用のオブジェクト
	var setting = {
		debug                           	: false,
		gameWidth                       	: 960, // ゲームの幅
		gameHeight                      	: 640, // ゲームの高さ
		bulletWidht                     	: 16, // 球の幅
		bulletHieht                     	: 16, // 球の高さ
		playerBulletAgility             	: 10, // プレイヤーの玉の速さ
		playerHitpoint                  	: 3, // プレイヤーの初期体力
		maxPlayerHitpoint               	: 10, // プレイヤーのMAX体力
		minPlayerHitpoint               	: 1, // プレイヤーの許容する最少HP
		playerAgility                   	: 5, // プレイヤーの初期素早さ
		maxPlayerAgility                	: 20, // プレイヤーの移動速度の上限
		enemyBulletAgility              	: 10, // 敵の玉の速さ
		enemyAgility                    	: 4, //	敵の速さ
		enemyPower                      	: 1, // 雑魚敵の力
		itemAgility                     	: 4, // アイテムの流れる速さ
		labelFontSize                   	: '20px cursive, arial, sans-serif',
		playerWidth                     	: 32, // プレイヤーの幅
		playerHeight                    	: 32, // プレイヤーの高さ
		enemyTypeOne                    	: 1, // 敵のタイプ
		enemyTypeTwo                    	: 2,
		enemyTypeThreeHead              	: 3,
		enemyTypeThreeHeadRibon         	: 4,
		enemyTypeThreeBody              	: 5,
		enemyTypeThreeBodyRibon         	: 6,
		enemyTypeOneHitpoint            	: 3, // 以下がHitpoint
		enemyTypeTwoHitpoint            	: 5,
		enemyTypeThreeHeadHitpoint      	: 100,
		enemyTypeThreeHeadRibbonHitpoint	: 50,
		enemyTypeThreeBodyHitpoint      	: 100,
		enemyTypeThreeBodyRibbonHitpoint	: 50
	};

	// ゲームの画像用ストア 
	var files = {
		background   	: 'img/background1.png',
		test         	: 'img/chara1.png',
		player       	: 'img/chara2.png',
		bullet       	: 'img/icon0.png',
		boss         	: 'img/bigmonster1.gif',
		title        	: 'img/background.png',
		battle       	: 'img/battle.jpg',
		explosion    	: 'img/effect0.png',
		cure         	: 'img/heal_eff_thumb.png',
		shooter      	: 'img/shooter.png',
		head         	: 'img/mie_1.png',
		body         	: 'img/body.png',
		body_r       	: 'img/ribbon_2.png',
		head_r       	: 'img/ribbon.png',
		twitter      	: 'img/Twitter.png',
		facebook     	: 'img/Facebook.png',
		ranking      	: 'img/Ranking.png',
		startButton  	: 'img/start.png',
		soundButton  	: 'img/sound.png',
		mainSound    	: 'sound/mp3/404game_main.mp3',
		hittedSound  	: 'sound/mp3/404game_hitted.mp3',
		fired        	: 'sound/mp3/404game_bullet_fire.mp3',
		enemyCrashed 	: 'sound/mp3/404game_enemy_crash.mp3',
		getItem      	: 'sound/mp3/404game_item.mp3',
		gameOverSound	: 'sound/mp3/404game_gameover.mp3',
		bossEnter    	: 'sound/mp3/404game_boss_enter.mp3',
		bossCrashed  	: 'sound/mp3/404game_boss_crash.mp3',
	};

	// 各種ポイントの保存庫
	var store = {
		playerHitpoint      	: '', // プレイヤーのヒットポイント
		playerAgility       	: '', // プレイヤーの速さ
		bossHitpoint        	: '', // ボスのヒットポイント
		gamePoint           	: '', // ゲームのポイント
		startTime           	: '', // ゲームの開始時刻
		gameTime            	: '', // ゲームの時間
		currentScene        	: '', // ゲームの現在のシーン
		MajiFlag            	: false, // 最終フラグ(ボスのリボン)
		music               	: false, // ミュージックフラグ
		zakoEnemyCounter    	: 0,
		zakoEnemy2Counter   	: 0,
		bossHeadCounter     	: 0,
		bossHeadRibonCounter	: 0,
		bossBodyCounter     	: 0,
		bossBodyRibonCounter	: 0
	};

	// ゲームの敵やアイテムのインスタンスの保存庫
	var playerArr	= [],
	enemyArr     	= [],
	itemArr      	= [];

	// おまじない
	enchant();

	// デバッグの無効化
	if ( setting.debug == true ) {
		var noop = function(){};
		console.log = noop;
	}

	// ゲーム
	var game = new Core( setting.gameWidth, setting.gameHeight );
	game.fps = 30;
	game.keybind( 32, 'space' );

	// プリリロード
	// TODO: プロパティ名に予約語が入っている
	game.preload(
		files.background,
		files.test,
		files.player,
		files.bullet,
		files.boss,
		files.title,
		files.explosion,
		files.cure,
		files.shooter,
		files.head,
		files.body,
		files.body_r,
		files.head_r,
		files.mainSound,
		files.hittedSound,
		files.fired,
		files.enemyCrashed,
		files.getItem,
		files.gameOverSound,
		files.startButton,
		files.soundButton,
		files.bossEnter,
		files.bossCrashed,
		files.twitter,
		files.facebook,
		files.ranking	
	);
	
	// エクスポート
	window.game = {
		game : game,
		setting  	: setting,
		files    	: files,
		store    	: store,
		playerArr	: playerArr,
		enemyArr 	: enemyArr,
		itemArr  	: itemArr,
	};

});