module.exports = {
	/**
	 * 武将牌势力
	 * |string|Group Name|
	 * |:----:|:--------:|
	 * |vtuber|企业|
	 * |clubs|社团|
	 * |wei|魏|
	 * |shu|蜀|
	 * |wu|吴|
	 * |qun|群|
	 * |jin|晋|
	 * |shen|神、特典|
	 * |holo|Hololive|
	 * |nijisanji|虹|
	 * |dotlive|点|
	 * |upd8|U|
	 * |eilene|艾琳|
	 * |paryi|帕里|
	 * |kagura|神楽|
	 * |nori|苔|
	 * |vwp|神椿|
	 * |nanashi|774 inc.|
	 * |VirtuaReal|VirtuaReal|
	 * |psp|psplive|
	 * |asoul|A-SOUL|
	 * |chaos|Chaos Live|
	 * |xuefeng|雪风军团|
	 * |vshojo|Vshojo|
	 * @type {string}
	 */
	group: [
		'wei', 'shu', 'wu', 'qun', 'jin', 'western', 'key', 'shen','painter',
		'holo', 'nijisanji', 'dotlive', 'upd8', 'eilene', 'paryi', 'kagura', 'nori', 'vwp', 'nanashi',
		'VirtuaReal', 'HappyEl', 'psp', 'asoul', 'xuyan', 'chaos', 'xuefeng', 'Providence', 'NetEase', 'Tencent',
		'hunmiao', 'ego', 'lucca', 'RedC', 'MiyaFam',
		'vshojo',
		'vtuber', 'clubs'
	],
	/**
	 * shen势力可选的武将牌势力
	 * 较group去除了企业、社团、三国势力
	 * @type {string}
	 */
	group2: [
		'qun', 'holo', 'nijisanji', 'VirtuaReal', 'HappyEl', 'nori', 'paryi', 'upd8', 'kagura', 'nanashi', 'vwp',
		'psp', 'asoul', 'xuyan', 'chaos', 'xuefeng', 'Providence'
	],
	/**
	 * 势力对应属性
	 * @constant
	 */
	groupnature: {
		painter:'orange',
		shen: 'thunder',
		wei: 'water',
		shu: 'soil',
		wu: 'wood',
		qun: 'metal',
		western: 'thunder',
		key: 'key',
		jin: 'thunder',
		ye: 'thunder',

		holo: 'water',
		upd8: 'metal',
		dotlive: 'wood',
		nijisanji: 'water',
		VirtuaReal: 'thunder',
		HappyEl: 'orange',
		eilene: 'thunder',
		paryi: 'ice',
		kagura: 'ocean',
		nanashi: 'wood',
		psp: 'fire',
		asoul: 'fire',
		nori: 'key',
		vwp: 'key',
		vshojo: 'metal',
		xuyan: 'ice',
		chaos: 'yami',
		xuefeng: 'orange',
		Providence: 'yami',
		NetEase: 'fire',
		hunmiao: 'ocean',
		ego: 'ocean',
		Tencent: 'yami',
		lucca: 'wood',
		RedC: 'fire',
		MiyaFam:'orange',

		vtuber: 'metal',
		clubs: 'ice',
	}
}